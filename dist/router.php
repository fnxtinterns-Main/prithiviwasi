<?php
// Localhost development router for PHP built-in server (php -S localhost:8000 router.php)
$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);

// Serve existing static file directly
if ($uri !== '/' && file_exists(__DIR__ . $uri)) {
    return false;
}

// Route API endpoints
if (str_starts_with($uri, '/api/pledges') || str_starts_with($uri, '/api/pledge-register')) {
    require __DIR__ . '/api/pledge-register.php';
    exit;
}

if (str_starts_with($uri, '/api/donation-receipt')) {
    require __DIR__ . '/api/donation-receipt.php';
    exit;
}

if (str_starts_with($uri, '/api/certificate')) {
    require __DIR__ . '/api/certificate.php';
    exit;
}

// Single Page Application fallback to index.html
require __DIR__ . '/index.html';
