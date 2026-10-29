<?php
declare(strict_types=1);

/*
 * PRITHVIWASI - Pledge Submission & Email Trigger Endpoint (Hostinger PHP)
 * File: api/pledge-register.php
 */

require_once __DIR__ . '/config.php';
require_once __DIR__ . '/pledge-mailer.php';

header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS, GET');
header('Access-Control-Allow-Headers: Content-Type, Idempotency-Key, Authorization');

function respond(int $status, array $data): never
{
    http_response_code($status);
    echo json_encode(
        $data,
        JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES
    );
    exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    respond(200, [
        'status' => 'ok',
        'message' => 'PRITHVIWASI PHP API is running.'
    ]);
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('Allow: POST, OPTIONS, GET');
    respond(405, [
        'success' => false,
        'message' => 'Only POST requests are allowed.'
    ]);
}

try {
    $rawBody = file_get_contents('php://input');

    $input = [];
    if (!empty($rawBody)) {
        $input = json_decode($rawBody, true);
    }
    if (empty($input) && !empty($_POST)) {
        $input = $_POST;
    }

    if (!is_array($input)) {
        respond(400, [
            'success' => false,
            'message' => 'Invalid request payload.'
        ]);
    }

    $name = trim((string)($input['name'] ?? $input['full_name'] ?? ''));
    $email = trim((string)($input['email'] ?? ''));
    $language = (string)($input['language'] ?? 'hi');
    $role = trim((string)($input['role'] ?? 'Dedicated Citizen'));

    $idempotencyKey = trim((string)($_SERVER['HTTP_IDEMPOTENCY_KEY'] ?? ''));
    if ($idempotencyKey === '') {
        $idempotencyKey = trim((string)($input['idempotency_key'] ?? $input['idempotencyKey'] ?? ''));
    }

    // Fallback idempotency key
    if ($idempotencyKey === '') {
        $idempotencyKey = 'pledge-' . substr(md5(strtolower($email)), 0, 16) . '-' . time();
    }

    // 1. Validation
    if ($name === '' || strlen($name) < 2 || strlen($name) > 200 || preg_match('/[\x00-\x1F\x7F]/', $name)) {
        respond(422, [
            'success' => false,
            'message' => 'Please enter a valid full name.'
        ]);
    }

    if (!filter_var($email, FILTER_VALIDATE_EMAIL) || strlen($email) > 254 || preg_match('/[\r\n]/', $email)) {
        respond(422, [
            'success' => false,
            'message' => 'Please enter a valid email address.'
        ]);
    }

    if (!in_array($language, ['en', 'hi'], true)) {
        $language = 'hi';
    }

    $pdo = database();

    // 2. Check for duplicate request with same idempotency key
    $find = $pdo->prepare(
        'SELECT id, registration_id, full_name, email, language, registered_at, email_status
         FROM pledge_registrations
         WHERE idempotency_key = :idempotency_key
         LIMIT 1'
    );
    $find->execute(['idempotency_key' => $idempotencyKey]);
    $existing = $find->fetch(PDO::FETCH_ASSOC);

    if ($existing) {
        $sent = ($existing['email_status'] === 'sent');
        $displayId = function_exists('formatPrettyRegistrationId')
            ? formatPrettyRegistrationId($existing['registration_id'], $existing['registered_at'])
            : $existing['registration_id'];

        respond(200, [
            'success' => true,
            'duplicate_request' => true,
            'duplicateRequest' => true,
            'email_sent' => $sent,
            'emailSent' => $sent,
            'message' => 'This pledge is already registered.',
            'registration' => [
                'id' => $displayId,
                'name' => $existing['full_name'],
                'email' => $existing['email'],
                'language' => $existing['language'],
                'registered_at' => $existing['registered_at'],
                'timestamp' => $existing['registered_at'],
                'emailStatus' => $existing['email_status']
            ]
        ]);
    }

    // 3. Generate pretty, official registration ID: e.g. PW-2026-84920
    $year = date('Y');
    do {
        $registrationId = sprintf('PW-%s-%05d', $year, random_int(10000, 99999));
        $check = $pdo->prepare('SELECT id FROM pledge_registrations WHERE registration_id = :reg_id LIMIT 1');
        $check->execute(['reg_id' => $registrationId]);
    } while ($check->fetchColumn());

    // 4. Save registration in MySQL FIRST (status: pending)
    $insert = $pdo->prepare(
        'INSERT INTO pledge_registrations
            (registration_id, idempotency_key, full_name, email, language, email_status)
         VALUES
            (:registration_id, :idempotency_key, :full_name, :email, :language, "pending")'
    );

    try {
        $insert->execute([
            'registration_id' => $registrationId,
            'idempotency_key' => $idempotencyKey,
            'full_name' => $name,
            'email' => $email,
            'language' => $language
        ]);
    } catch (PDOException $e) {
        if ($e->getCode() === '23000') {
            $find->execute(['idempotency_key' => $idempotencyKey]);
            $existing = $find->fetch(PDO::FETCH_ASSOC);
            if ($existing) {
                $sent = ($existing['email_status'] === 'sent');
                respond(200, [
                    'success' => true,
                    'duplicate_request' => true,
                    'duplicateRequest' => true,
                    'email_sent' => $sent,
                    'emailSent' => $sent,
                    'message' => 'This request was already registered.',
                    'registration' => [
                        'id' => $existing['registration_id'],
                        'name' => $existing['full_name'],
                        'email' => $existing['email'],
                        'language' => $existing['language'],
                        'registered_at' => $existing['registered_at'],
                        'timestamp' => $existing['registered_at'],
                        'emailStatus' => $existing['email_status']
                    ]
                ]);
            }
        }
        throw $e;
    }

    // Retrieve saved record with authoritative timestamp and auto-increment ID
    $find->execute(['idempotency_key' => $idempotencyKey]);
    $registration = $find->fetch(PDO::FETCH_ASSOC);

    if (!$registration) {
        respond(500, [
            'success' => false,
            'message' => 'Registration could not be verified in database.'
        ]);
    }

    // 5. Send welcome email and PDF attachment automatically
    $emailSent = sendPledgeWelcomeEmail($pdo, $registration);

    // Refresh record status
    $find->execute(['idempotency_key' => $idempotencyKey]);
    $registration = $find->fetch(PDO::FETCH_ASSOC) ?: $registration;

    respond(201, [
        'success' => true,
        'duplicate_request' => false,
        'duplicateRequest' => false,
        'email_sent' => $emailSent,
        'emailSent' => $emailSent,
        'message' => $emailSent
            ? 'Thank you! Your pledge is registered and a personalized certificate has been sent to your email.'
            : 'Pledge registered successfully. (Email will be sent once SMTP credentials are confirmed).',
        'registration' => [
            'id' => $registration['registration_id'],
            'name' => $registration['full_name'],
            'email' => $registration['email'],
            'language' => $registration['language'],
            'registered_at' => $registration['registered_at'],
            'timestamp' => $registration['registered_at'],
            'emailStatus' => $registration['email_status']
        ]
    ]);

} catch (Throwable $e) {
    error_log('Pledge registration error: ' . $e->getMessage());
    respond(500, [
        'success' => false,
        'message' => 'Registration could not be completed: ' . $e->getMessage()
    ]);
}
