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

if (!function_exists('respond')) {
    function respond(int $status, array $data): never
    {
        http_response_code($status);
        echo json_encode(
            $data,
            JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES
        );
        exit;
    }
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

    $year = date('Y');
    // If client supplied a valid registration ID or numeric suffix, use it; otherwise generate unique official ID
    $clientRegId = trim((string)($input['registration_id'] ?? $input['id'] ?? ''));
    if ($clientRegId !== '' && preg_match('/^[A-Za-z0-9_-]{4,64}$/', $clientRegId)) {
        $registrationId = str_starts_with($clientRegId, 'PW-') ? $clientRegId : sprintf('PW-%s-%s', $year, $clientRegId);
    } else {
        $registrationId = sprintf('PW-%s-%05d', $year, random_int(10000, 99999));
    }
    $registeredAt = date('Y-m-d H:i:s');

    $pdo = database();

    // 2. Database Available: Save to MySQL
    if ($pdo instanceof PDO) {
        // Fast duplicate check by email address: A user cannot pledge twice!
        $findEmail = $pdo->prepare(
            'SELECT id, registration_id, full_name, email, language, registered_at, email_status
             FROM pledge_registrations
             WHERE email = :email
             LIMIT 1'
        );
        $findEmail->execute(['email' => strtolower($email)]);
        $existing = $findEmail->fetch(PDO::FETCH_ASSOC);

        if (!$existing) {
            // Also check by registration_id
            $findReg = $pdo->prepare(
                'SELECT id, registration_id, full_name, email, language, registered_at, email_status
                 FROM pledge_registrations
                 WHERE registration_id = :reg_id
                 LIMIT 1'
            );
            $findReg->execute(['reg_id' => $registrationId]);
            $existing = $findReg->fetch(PDO::FETCH_ASSOC);
        }

        if ($existing) {
            $sent = ($existing['email_status'] === 'sent');
            $displayId = formatPrettyRegistrationId($existing['registration_id'], $existing['registered_at']);
            $msg = ($language === 'hi')
                ? 'आप इस ईमेल से पहले ही संकल्प ले चुके हैं! आपका संकल्प प्रमाण पत्र पहले ही जारी हो चुका है।'
                : 'You have already taken the pledge with this email! Your certificate has already been issued.';

            respond(200, [
                'success' => true,
                'already_registered' => true,
                'alreadyRegistered' => true,
                'duplicate_request' => true,
                'duplicateRequest' => true,
                'email_sent' => $sent,
                'emailSent' => $sent,
                'message' => $msg,
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

        // Ensure registrationId is strictly unique in DB
        while (true) {
            $check = $pdo->prepare('SELECT id FROM pledge_registrations WHERE registration_id = :reg_id LIMIT 1');
            $check->execute(['reg_id' => $registrationId]);
            if (!$check->fetchColumn()) {
                break;
            }
            $registrationId = sprintf('PW-%s-%05d', $year, random_int(10000, 99999));
        }

        $insert = $pdo->prepare(
            'INSERT INTO pledge_registrations
                (registration_id, full_name, email, language, email_status)
             VALUES
                (:registration_id, :full_name, :email, :language, "pending")'
        );

        try {
            $insert->execute([
                'registration_id' => $registrationId,
                'full_name' => $name,
                'email' => $email,
                'language' => $language
            ]);
        } catch (PDOException $e) {
            if ($e->getCode() === '23000') {
                $find->execute(['reg_id' => $registrationId]);
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

        $registration = [
            'registration_id' => $registrationId,
            'full_name' => $name,
            'email' => $email,
            'language' => $language,
            'registered_at' => $registeredAt,
            'email_status' => 'pending'
        ];

        // Send welcome email
        $emailSent = sendPledgeWelcomeEmail($pdo, $registration);
        $registration['email_status'] = $emailSent ? 'sent' : 'pending';

        respond(201, [
            'success' => true,
            'duplicate_request' => false,
            'duplicateRequest' => false,
            'email_sent' => $emailSent,
            'emailSent' => $emailSent,
            'message' => $emailSent
                ? 'Thank you! Your pledge is registered and a welcome certificate has been sent to your email.'
                : 'Pledge registered successfully.',
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
    }

    // 3. Database Fallback (File Storage): Works instantly without MySQL provisioning
    $dataFile = __DIR__ . '/pledges_data.json';
    $existingData = [];
    if (file_exists($dataFile)) {
        $existingData = json_decode((string)file_get_contents($dataFile), true) ?: [];
    }

    // Check duplicate by email or registration_id
    foreach ($existingData as $item) {
        if (strcasecmp($item['email'] ?? '', $email) === 0 || ($item['registration_id'] ?? '') === $registrationId) {
            $sent = ($item['email_status'] ?? '') === 'sent';
            $msg = ($language === 'hi')
                ? 'आप इस ईमेल से पहले ही संकल्प ले चुके हैं! आपका संकल्प प्रमाण पत्र पहले ही जारी हो चुका है।'
                : 'You have already taken the pledge with this email! Your certificate has already been issued.';

            respond(200, [
                'success' => true,
                'already_registered' => true,
                'alreadyRegistered' => true,
                'duplicate_request' => true,
                'duplicateRequest' => true,
                'email_sent' => $sent,
                'emailSent' => $sent,
                'message' => $msg,
                'registration' => [
                    'id' => $item['registration_id'],
                    'name' => $item['full_name'],
                    'email' => $item['email'],
                    'language' => $item['language'],
                    'registered_at' => $item['registered_at'],
                    'timestamp' => $item['registered_at'],
                    'emailStatus' => $item['email_status']
                ]
            ]);
        }
    }

    $registration = [
        'registration_id' => $registrationId,
        'full_name' => $name,
        'email' => $email,
        'language' => $language,
        'role' => $role,
        'registered_at' => $registeredAt,
        'email_status' => 'pending'
    ];

    // Send welcome email directly
    $emailSent = sendPledgeWelcomeEmail(null, $registration);
    $registration['email_status'] = $emailSent ? 'sent' : 'failed';

    $existingData[] = $registration;
    @file_put_contents($dataFile, json_encode($existingData, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));

    respond(201, [
        'success' => true,
        'duplicate_request' => false,
        'duplicateRequest' => false,
        'email_sent' => $emailSent,
        'emailSent' => $emailSent,
        'message' => $emailSent
            ? 'Thank you! Your pledge is registered and a welcome certificate has been sent to your email.'
            : 'Pledge registered successfully.',
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
