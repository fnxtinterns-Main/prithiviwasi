<?php
declare(strict_types=1);

/*
 * PRITHVIWASI - Production PHP Configuration for Hostinger
 * File: api/config.php
 */

/**
 * Direct configuration fallbacks for Hostinger Webmail & Database
 */
const DEFAULT_CONFIG = [
    'DB_HOST' => 'localhost',
    'DB_PORT' => '3306',
    'DB_NAME' => '',
    'DB_USER' => '',
    'DB_PASSWORD' => '',
    
    // Hostinger Webmail SMTP Settings
    'SMTP_HOST' => 'smtp.hostinger.com',
    'SMTP_PORT' => '465',
    'SMTP_SECURE' => 'ssl', // 'ssl' (port 465) or 'tls' (port 587)
    'SMTP_USER' => 'contact@prithviwasi.org',
    'SMTP_PASS' => '', // Put your Hostinger webmail password here or in .env
    
    // Sender Branding
    'MAIL_FROM' => 'contact@prithviwasi.org',
    'MAIL_FROM_NAME' => 'PRITHVIWASI – Prithviwasi Seva Aur Sudhar Sangathan',
    'ORG_CONTACT_EMAIL' => 'contact@prithviwasi.org',
    'WEBSITE_URL' => 'https://prithviwasi.org/'
];

/**
 * Parse an .env file safely.
 */
function loadProjectEnvFile(string $path): array
{
    if (!is_file($path) || !is_readable($path)) {
        return [];
    }

    $values = [];
    $lines = file($path, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES) ?: [];

    foreach ($lines as $line) {
        $line = trim($line);
        if ($line === '' || str_starts_with($line, '#')) {
            continue;
        }

        if (str_starts_with($line, 'export ')) {
            $line = trim(substr($line, 7));
        }

        if (!str_contains($line, '=')) {
            continue;
        }

        [$key, $value] = explode('=', $line, 2);
        $key = trim($key);
        $value = trim($value);

        if (
            strlen($value) >= 2 &&
            (
                (str_starts_with($value, '"') && str_ends_with($value, '"')) ||
                (str_starts_with($value, "'") && str_ends_with($value, "'"))
            )
        ) {
            $value = substr($value, 1, -1);
        }

        if ($key !== '') {
            $values[$key] = $value;
        }
    }

    return $values;
}

/**
 * Locate and read environment variables across Hostinger / local directory structures.
 */
function projectEnv(): array
{
    static $env = null;

    if ($env !== null) {
        return $env;
    }

    // Check possible .env file locations
    $possiblePaths = [
        __DIR__ . DIRECTORY_SEPARATOR . '.env',
        dirname(__DIR__) . DIRECTORY_SEPARATOR . '.env',
        dirname(__DIR__) . DIRECTORY_SEPARATOR . 'server' . DIRECTORY_SEPARATOR . '.env',
    ];

    $loaded = [];
    foreach ($possiblePaths as $path) {
        if (is_file($path) && is_readable($path)) {
            $loaded = loadProjectEnvFile($path);
            if (!empty($loaded)) {
                break;
            }
        }
    }

    // Merge with defaults and system environment
    $merged = DEFAULT_CONFIG;
    foreach ($loaded as $k => $v) {
        $merged[$k] = $v;
    }

    foreach ($merged as $key => $value) {
        $sysVal = getenv($key);
        if ($sysVal !== false && $sysVal !== '') {
            $merged[$key] = $sysVal;
        }
        if (isset($_ENV[$key]) && $_ENV[$key] !== '') {
            $merged[$key] = $_ENV[$key];
        }
    }

    $env = $merged;
    return $env;
}

/**
 * Retrieve a single configuration value.
 */
function projectEnvValue(string $key, string $default = ''): string
{
    $env = projectEnv();
    return (string) ($env[$key] ?? $default);
}

/**
 * Returns the singleton PDO MySQL connection if configured, or null for fallback.
 */
function database(): ?PDO
{
    static $pdo = null;

    if ($pdo instanceof PDO) {
        return $pdo;
    }

    $env = projectEnv();

    $host = $env['DB_HOST'] ?? 'localhost';
    $port = (int) ($env['DB_PORT'] ?? 3306);
    $name = trim((string) ($env['DB_NAME'] ?? ''));
    $user = trim((string) ($env['DB_USER'] ?? ''));
    $pass = (string) ($env['DB_PASSWORD'] ?? '');

    // If database credentials are not configured, return null gracefully (file storage fallback)
    if ($name === '' || $user === '') {
        return null;
    }

    try {
        $dsn = sprintf('mysql:host=%s;port=%d;dbname=%s;charset=utf8mb4', $host, $port, $name);

        $pdo = new PDO(
            $dsn,
            $user,
            $pass,
            [
                PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                PDO::ATTR_EMULATE_PREPARES => false,
                PDO::ATTR_STRINGIFY_FETCHES => false,
                PDO::ATTR_TIMEOUT => 3,
            ]
        );

        // Ensure pledge_registrations table exists
        $pdo->exec("
            CREATE TABLE IF NOT EXISTS `pledge_registrations` (
                `id` BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
                `registration_id` CHAR(36) NOT NULL UNIQUE,
                `idempotency_key` VARCHAR(100) NOT NULL UNIQUE,
                `full_name` VARCHAR(150) NOT NULL,
                `email` VARCHAR(254) NOT NULL,
                `language` ENUM('en', 'hi') NOT NULL DEFAULT 'hi',
                `registered_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
                `email_status` ENUM('pending', 'sent', 'failed') NOT NULL DEFAULT 'pending',
                `email_sent_at` TIMESTAMP NULL DEFAULT NULL,
                `last_error` TEXT NULL,
                INDEX idx_pledge_email (email)
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
        ");

        return $pdo;
    } catch (Throwable $e) {
        error_log('Database connection notice: ' . $e->getMessage());
        return null;
    }
}
