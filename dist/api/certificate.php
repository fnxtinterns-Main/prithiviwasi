<?php
declare(strict_types=1);

/*
 * PRITHVIWASI - Certificate Download Endpoint
 * File: api/certificate.php
 */

require_once __DIR__ . '/config.php';
require_once __DIR__ . '/pledge-mailer.php';

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    http_response_code(405);
    exit('Method not allowed');
}

$registrationId = trim((string)($_GET['registration_id'] ?? ''));

if (!preg_match('/^(PW-\d{4}-[A-Z0-9]{4,8}|[a-f0-9-]{36})$/i', $registrationId)) {
    http_response_code(400);
    exit('Invalid registration ID format.');
}

try {
    $pdo = database();

    $stmt = $pdo->prepare(
        'SELECT id, registration_id, full_name, email, language, registered_at
         FROM pledge_registrations
         WHERE registration_id = :registration_id
         LIMIT 1'
    );

    $stmt->execute(['registration_id' => $registrationId]);
    $record = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$record) {
        http_response_code(404);
        exit('Registration not found.');
    }

    $pdfBytes = generatePledgeCertificate($record);
    $prettyId = formatPrettyRegistrationId($record['registration_id'], (string)$record['registered_at']);
    $safeId = preg_replace('/[^A-Za-z0-9_-]/', '_', $prettyId);
    $filename = 'PRITHVIWASI_Pledge_Certificate_' . $safeId . '.pdf';

    header('Content-Type: application/pdf');
    header('Content-Disposition: inline; filename="' . $filename . '"');
    header('Content-Length: ' . strlen($pdfBytes));
    header('Cache-Control: public, max-age=86400');

    echo $pdfBytes;
    exit;
} catch (\Throwable $e) {
    http_response_code(500);
    error_log('Certificate generation failed: ' . $e->getMessage());
    echo 'Unable to generate certificate. Please try again later.';
    exit;
}
