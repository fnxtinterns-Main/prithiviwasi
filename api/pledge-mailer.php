<?php
declare(strict_types=1);

/*
 * Prithviwasi Pledge Welcome Mailer & Official Certificate Generator
 * File: api/pledge-mailer.php
 */

use Dompdf\Dompdf;
use Dompdf\Options;
use PHPMailer\PHPMailer\Exception as MailException;
use PHPMailer\PHPMailer\PHPMailer;

require_once dirname(__DIR__) . '/vendor/autoload.php';
require_once __DIR__ . '/config.php';

/**
 * Escape text before inserting it into HTML.
 */
function pledgeMailEscape(string $value): string
{
    return htmlspecialchars(
        $value,
        ENT_QUOTES | ENT_SUBSTITUTE,
        'UTF-8'
    );
}

/**
 * Format registration ID into a clean, prestigious, official format (e.g. PW-2026-84920).
 */
function formatPrettyRegistrationId(string $id, ?string $date = null): string
{
    $id = trim($id);
    if ($id === '') {
        $year = $date ? date('Y', strtotime($date)) : date('Y');
        return sprintf('PW-%s-%05d', $year, random_int(10000, 99999));
    }

    // Already pretty format (e.g. PW-2026-84920)
    if (preg_match('/^PW-\d{4}-[A-Z0-9]{4,8}$/i', $id)) {
        return strtoupper($id);
    }

    // Legacy UUID format: convert to clean PW-YYYY-XXXXX
    if (preg_match('/^[a-f0-9-]{36}$/i', $id)) {
        $year = $date ? date('Y', strtotime($date)) : date('Y');
        $hashPart = strtoupper(substr(md5($id), 0, 5));
        return sprintf('PW-%s-%s', $year, $hashPart);
    }

    return $id;
}

/**
 * Helper to get base64 encoded data of an asset file.
 */
function getAssetBase64(string $filename): string
{
    $candidates = [
        dirname(__DIR__) . '/assets/' . $filename,
        dirname(__DIR__) . '/public/assets/' . $filename,
        __DIR__ . '/../assets/' . $filename,
    ];

    foreach ($candidates as $path) {
        if (is_file($path) && is_readable($path)) {
            $data = file_get_contents($path);
            if ($data !== false) {
                return base64_encode($data);
            }
        }
    }

    return '';
}

/**
 * Generate a high-resolution PDF pledge certificate matching the official organization format.
 * Features:
 * - Top Left: Prithviwasi Logo
 * - Top Right: Agents of Change Logo
 * - Center: Organization Name & Trust Deed
 * - Center Background: Watermark (confined to middle area)
 * - Signatures: Founder & President + General Secretary with official seals
 */
function generatePledgeCertificate(array $record): string
{
    $name = pledgeMailEscape(
        trim((string) ($record['full_name'] ?? $record['name'] ?? 'Dedicated Citizen'))
    );

    $rawRegId = (string) ($record['registration_id'] ?? $record['id'] ?? '');
    $dateValue = $record['registered_at'] ?? null;
    $date = $dateValue ? date('d F Y', strtotime((string) $dateValue)) : date('d F Y');

    $registrationId = pledgeMailEscape(formatPrettyRegistrationId($rawRegId, (string)$dateValue));
    $date = pledgeMailEscape($date);

    $logoBase64 = getAssetBase64('logo.png');
    $aocBase64 = getAssetBase64('agents_of_change_logo.jpg');
    $watermarkBase64 = getAssetBase64('logo_watermark.png');
    $sigPresBase64 = getAssetBase64('sig_pres_trans.png');
    $sigSecBase64 = getAssetBase64('sig_sec_trans.png');
    $leafBase64 = getAssetBase64('cert_leaf_trans.png');
    $ornamentBase64 = getAssetBase64('cert_ornament.png');

    $logoHtml = $logoBase64 !== ''
        ? '<img class="top-logo-img" src="data:image/png;base64,' . $logoBase64 . '" alt="PRITHVIWASI" />'
        : '';

    $aocHtml = $aocBase64 !== ''
        ? '<img class="top-aoc-img" src="data:image/jpeg;base64,' . $aocBase64 . '" alt="Agents of Change" />'
        : '';

    $watermarkHtml = $watermarkBase64 !== ''
        ? '<div class="watermark-container"><img class="watermark-img" src="data:image/png;base64,' . $watermarkBase64 . '" /></div>'
        : '';

    $leafHtml = $leafBase64 !== ''
        ? '<img class="leaf-icon" src="data:image/png;base64,' . $leafBase64 . '" />'
        : '<span style="color:#15803d; font-weight:bold; margin-right:5px;">&#9828;</span>';

    $sigPresHtml = '<div style="height:36px;"></div>';
    $sigSecHtml = '<div style="height:36px;"></div>';

    $ornamentHtml = $ornamentBase64 !== ''
        ? '<div class="bottom-ornament"><img class="ornament-img" src="data:image/png;base64,' . $ornamentBase64 . '" /></div>'
        : '';

    $html = <<<HTML
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<style>
    @page {
        margin: 8px;
        size: A4 portrait;
    }
    * {
        box-sizing: border-box;
    }
    body {
        font-family: 'DejaVu Sans', sans-serif;
        margin: 0;
        padding: 0;
        background-color: #ffffff;
        color: #111827;
        -webkit-print-color-adjust: exact;
    }
    .cert-outer-frame {
        border: 3.5px solid #14532d;
        padding: 3px;
        position: relative;
    }
    .cert-inner-frame {
        border: 1.5px solid #c28b2e;
        padding: 12px 18px 8px 18px;
        position: relative;
        background-color: #fcfdfa;
    }
    /* Corner decorative brackets */
    .corner {
        position: absolute;
        width: 12px;
        height: 12px;
        border: 1.5px solid #14532d;
    }
    .tl { top: -1px; left: -1px; border-right: none; border-bottom: none; }
    .tr { top: -1px; right: -1px; border-left: none; border-bottom: none; }
    .bl { bottom: -1px; left: -1px; border-right: none; border-top: none; }
    .br { bottom: -1px; right: -1px; border-left: none; border-top: none; }

    /* Watermark restricted to middle area (does not reach signatures) */
    .watermark-container {
        position: absolute;
        top: 210px;
        left: 50%;
        margin-left: -130px;
        width: 260px;
        height: 260px;
        text-align: center;
        z-index: 1;
        opacity: 0.75;
    }
    .watermark-img {
        width: 240px;
        height: auto;
    }

    .cert-content {
        position: relative;
        z-index: 2;
        text-align: center;
    }

    /* Top Logos Header Table */
    .header-table {
        width: 100%;
        border-collapse: collapse;
        margin-bottom: 4px;
    }
    .header-logo-left {
        width: 60px;
        text-align: left;
        vertical-align: middle;
    }
    .header-center {
        text-align: center;
        vertical-align: middle;
        padding: 0 4px;
    }
    .header-logo-right {
        width: 60px;
        text-align: right;
        vertical-align: middle;
    }
    .top-logo-img {
        height: 48px;
        width: auto;
        vertical-align: middle;
    }
    .top-aoc-img {
        height: 48px;
        width: auto;
        border-radius: 24px;
        vertical-align: middle;
    }

    .org-title {
        font-size: 17px;
        font-weight: bold;
        color: #14532d;
        letter-spacing: 0.5px;
        margin: 0 0 2px 0;
        text-transform: uppercase;
        line-height: 1.2;
    }
    .org-subtitle {
        font-size: 8px;
        color: #1e293b;
        font-weight: bold;
        margin: 0;
        letter-spacing: 0.2px;
        line-height: 1.2;
    }

    /* Main Title */
    .cert-title-1 {
        font-family: 'DejaVu Serif', serif;
        font-size: 20px;
        font-weight: bold;
        color: #0b3b24;
        letter-spacing: 1px;
        margin: 4px 0 0 0;
        line-height: 1.15;
    }
    .cert-title-2 {
        font-family: 'DejaVu Serif', serif;
        font-size: 20px;
        font-weight: bold;
        color: #0b3b24;
        letter-spacing: 1px;
        margin: 1px 0 6px 0;
        line-height: 1.15;
    }

    .presented-to {
        font-size: 11.5px;
        color: #374151;
        font-weight: normal;
        margin: 0 0 3px 0;
    }

    .recipient-name {
        font-size: 25px;
        font-weight: bold;
        color: #000000;
        margin: 0 0 2px 0;
        letter-spacing: 0.5px;
    }

    .divider-wrap {
        margin: 0 auto 6px auto;
        width: 220px;
        text-align: center;
    }
    .divider-line {
        border-top: 1px solid #d1d5db;
        display: inline-block;
        width: 85px;
        vertical-align: middle;
    }
    .diamond-box {
        display: inline-block;
        width: 6px;
        height: 6px;
        background-color: #c28b2e;
        transform: rotate(45deg);
        margin: 0 6px;
        vertical-align: middle;
    }

    .pledge-intro {
        font-size: 11px;
        font-weight: bold;
        color: #111827;
        margin: 0 0 8px 0;
    }

    /* Bullet points */
    .pledge-list {
        text-align: left;
        margin: 0 auto 8px auto;
        width: 96%;
    }
    .pledge-item {
        font-size: 9.5px;
        color: #111827;
        line-height: 1.35;
        margin-bottom: 3.5px;
    }
    .leaf-icon {
        width: 11px;
        height: 11px;
        vertical-align: -1px;
        margin-right: 5px;
    }
    .dot-bullet {
        display: inline-block;
        width: 5px;
        height: 5px;
        background-color: #14532d;
        border-radius: 50%;
        vertical-align: middle;
        margin-right: 8px;
        margin-left: 3px;
    }

    /* Mission & details */
    .mission-pillars {
        font-size: 10px;
        font-weight: bold;
        color: #0b5e34;
        margin: 6px 0 3px 0;
        letter-spacing: 0.5px;
    }

    .meta-details {
        font-size: 9px;
        color: #1f2937;
        font-weight: 500;
        margin: 0 0 4px 0;
    }

    .cert-motto {
        font-family: 'DejaVu Serif', serif;
        font-style: italic;
        font-size: 10.5px;
        color: #0e4429;
        margin: 0 0 8px 0;
    }

    /* Signatures table */
    .sig-table {
        width: 100%;
        margin-top: 4px;
        border-collapse: collapse;
    }
    .sig-td {
        width: 50%;
        text-align: center;
        vertical-align: bottom;
        padding: 0 15px;
    }
    .sig-img {
        height: 32px;
        margin-bottom: -3px;
    }
    .sig-line {
        border-top: 1px solid #14532d;
        width: 140px;
        margin: 0 auto 3px auto;
    }
    .sig-role {
        font-size: 10px;
        font-weight: bold;
        color: #111827;
    }

    .bottom-ornament {
        margin-top: 3px;
        text-align: center;
    }
    .ornament-img {
        height: 10px;
    }
</style>
</head>
<body>

<div class="cert-outer-frame">
    <div class="cert-inner-frame">
        <div class="corner tl"></div>
        <div class="corner tr"></div>
        <div class="corner bl"></div>
        <div class="corner br"></div>

        {$watermarkHtml}

        <div class="cert-content">
            <table class="header-table">
                <tr>
                    <td class="header-logo-left">
                        {$logoHtml}
                    </td>
                    <td class="header-center">
                        <div class="org-title">PRITHVIWASI SEVA AUR SUDHAR SANGATHAN</div>
                        <div class="org-subtitle">Registered Trust Reg. No. 19317/2344 Ranchi, Jharkhand | https://prithviwasi.org/</div>
                    </td>
                    <td class="header-logo-right">
                        {$aocHtml}
                    </td>
                </tr>
            </table>

            <div class="cert-title-1">CERTIFICATE OF</div>
            <div class="cert-title-2">ENVIRONMENTAL PLEDGE</div>

            <div class="presented-to">This official certificate is proudly presented to</div>
            <div class="recipient-name">{$name}</div>

            <div class="divider-wrap">
                <span class="divider-line"></span><span class="diamond-box"></span><span class="divider-line"></span>
            </div>

            <div class="pledge-intro">I pledge to protect Mother Earth with complete sincerity and responsibility.</div>

            <div class="pledge-list">
                <div class="pledge-item">{$leafHtml}<strong>I will nurture nature and conserve natural resources.</strong></div>
                <div class="pledge-item"><span class="dot-bullet"></span><strong>I will always respect natural resources such as water, air, soil and forests.</strong></div>
                <div class="pledge-item"><span class="dot-bullet"></span><strong>I will reduce waste and make cleanliness a part of my life.</strong></div>
                <div class="pledge-item">{$leafHtml}<strong>I will avoid the unnecessary use of plastic and adopt environmentally friendly alternatives.</strong></div>
                <div class="pledge-item">{$leafHtml}<strong>I will protect trees and plants and encourage others to plant more trees.</strong></div>
                <div class="pledge-item"><span class="dot-bullet"></span><strong>I will respect all living beings and contribute to the protection of biodiversity.</strong></div>
                <div class="pledge-item">{$leafHtml}<strong>As a Prithviwasi, I pledge to take positive action for environmental protection and sustainability.</strong></div>
                <div class="pledge-item">{$leafHtml}<strong>I will remain aware and also spread environmental awareness among my family, friends and society.</strong></div>
                <div class="pledge-item">{$leafHtml}<strong>I will live a responsible and conscious life and contribute towards creating a green, clean and safe future for generations to come.</strong></div>
            </div>

            <div class="mission-pillars">Mission Soil | Mission Water | Mission Green | Mission Solar | SDG 2030</div>
            <div class="meta-details">Registration ID: <strong>{$registrationId}</strong> | Registration Date: <strong>{$date}</strong></div>

            <div class="cert-motto">&quot;One Earth, One Responsibility, One Collective Future&quot;</div>

            <table class="sig-table">
                <tr>
                    <td class="sig-td">
                        {$sigPresHtml}
                        <div class="sig-line"></div>
                        <span class="sig-role">Founder &amp; President</span>
                    </td>
                    <td class="sig-td">
                        {$sigSecHtml}
                        <div class="sig-line"></div>
                        <span class="sig-role">General Secretary</span>
                    </td>
                </tr>
            </table>

            {$ornamentHtml}
        </div>
    </div>
</div>

</body>
</html>
HTML;

    $options = new Options();
    $options->set('isRemoteEnabled', true);
    $options->set('defaultFont', 'DejaVu Sans');

    $pdf = new Dompdf($options);
    $pdf->loadHtml($html, 'UTF-8');
    $pdf->setPaper('A4', 'portrait');
    $pdf->render();

    return $pdf->output();
}

/**
 * Send the welcome email and update the registration status.
 * Automatically dispatches in Hindi if language is 'hi', or English if 'en'.
 * Includes full anti-spam RFC-compliant headers for maximum inbox delivery.
 */
function sendPledgeWelcomeEmail(PDO $pdo, array $record): bool
{
    $recordId = (int) ($record['id'] ?? 0);
    $regUuid = (string) ($record['registration_id'] ?? '');
    $idToUpdate = $recordId > 0 ? $recordId : $regUuid;

    $email = trim((string) ($record['email'] ?? ''));
    $name = trim((string) ($record['full_name'] ?? ''));
    $language = strtolower(trim((string) ($record['language'] ?? 'hi')));

    if (
        (empty($recordId) && empty($regUuid)) ||
        $name === '' ||
        !filter_var($email, FILTER_VALIDATE_EMAIL)
    ) {
        error_log('Pledge mailer: invalid registration data.');
        return false;
    }

    $smtpHost = projectEnvValue('SMTP_HOST', 'smtp.gmail.com');
    $smtpPort = (int) projectEnvValue('SMTP_PORT', '465');
    $smtpSecure = strtolower(projectEnvValue('SMTP_SECURE', 'ssl'));
    
    $smtpUsername = projectEnvValue('SMTP_USER', projectEnvValue('SMTP_USERNAME', 'tiwarisachin9886@gmail.com'));
    $smtpPassword = projectEnvValue('SMTP_PASS', projectEnvValue('SMTP_PASSWORD', ''));
    
    $fromEmail = projectEnvValue(
        'MAIL_FROM',
        projectEnvValue('SMTP_FROM_EMAIL', $smtpUsername)
    );
    $fromName = projectEnvValue(
        'MAIL_FROM_NAME',
        projectEnvValue('SMTP_FROM_NAME', 'PRITHVIWASI - Prithviwasi Seva Aur Sudhar Sangathan')
    );
    $replyTo = projectEnvValue('ORG_CONTACT_EMAIL', 'contact@prithviwasi.org');

    if (
        $smtpHost === '' ||
        $smtpUsername === '' ||
        $smtpPassword === '' ||
        !filter_var($fromEmail, FILTER_VALIDATE_EMAIL) ||
        $smtpPort < 1 ||
        $smtpPort > 65535
    ) {
        $error = 'SMTP configuration is missing or invalid.';
        updatePledgeEmailStatus($pdo, $idToUpdate, 'failed', $error);
        error_log('Pledge mailer: ' . $error);
        return false;
    }

    $mail = new PHPMailer(true);

    try {
        $mail->isSMTP();
        $mail->Host = $smtpHost;
        $mail->Port = $smtpPort;
        $mail->SMTPAuth = true;
        $mail->Username = $smtpUsername;
        $mail->Password = $smtpPassword;
        $mail->Timeout = 20;
        $mail->CharSet = 'UTF-8';
        $mail->Encoding = 'base64';

        if ($smtpSecure === 'ssl' || $smtpPort === 465) {
            $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
        } elseif ($smtpSecure === 'tls' || $smtpPort === 587) {
            $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        } else {
            $mail->SMTPSecure = '';
            $mail->SMTPAutoTLS = false;
        }

        $mail->setFrom($fromEmail, $fromName);
        $mail->addAddress($email, $name);
        $mail->addReplyTo($replyTo, $fromName);

        $regDate = (string) ($record['registered_at'] ?? date('Y-m-d H:i:s'));
        $prettyRegId = formatPrettyRegistrationId($regUuid, $regDate);
        $safeId = preg_replace('/[^A-Za-z0-9_-]/', '_', $prettyRegId);

        // Anti-Spam & Deliverability Headers
        $mail->MessageID = sprintf('<pledge.%s.%d@prithviwasi.org>', $safeId, time());
        $mail->addCustomHeader('Auto-Submitted', 'auto-generated');
        $mail->addCustomHeader('X-Auto-Response-Suppress', 'OOF, AutoReply');
        $mail->addCustomHeader('List-Unsubscribe', '<mailto:contact@prithviwasi.org?subject=unsubscribe>');
        $mail->addCustomHeader('X-Report-Abuse-To', 'contact@prithviwasi.org');

        // Language-specific Subject & Email Body
        if ($language === 'hi') {
            $mail->Subject = 'पर्यावरण संरक्षण प्रतिज्ञा में शामिल होने के लिए धन्यवाद | पृथ्वीवासी परिवार में आपका स्वागत है';
            $mail->Body = buildPledgeWelcomeBodyHindi($name, $prettyRegId, $regDate);
            $mail->AltBody = buildPledgeWelcomeAltBodyHindi($name, $prettyRegId, $regDate);
        } else {
            $mail->Subject = 'Thank You for Taking the Pledge | Welcome to PRITHVIWASI';
            $mail->Body = buildPledgeWelcomeBodyEnglish($name, $prettyRegId, $regDate);
            $mail->AltBody = buildPledgeWelcomeAltBodyEnglish($name, $prettyRegId, $regDate);
        }
        $mail->isHTML(true);

        // Generate high-resolution PDF certificate matching user design
        $pdfBytes = generatePledgeCertificate($record);
        $filename = 'PRITHVIWASI_Pledge_Certificate_' . $safeId . '.pdf';

        $mail->addStringAttachment(
            $pdfBytes,
            $filename,
            'base64',
            'application/pdf'
        );

        $mail->send();

        updatePledgeEmailStatus($pdo, $idToUpdate, 'sent', null);
        return true;
    } catch (\Throwable $exception) {
        $error = substr($exception->getMessage(), 0, 1000);
        updatePledgeEmailStatus($pdo, $idToUpdate, 'failed', $error);
        error_log('Pledge welcome email failed: ' . $error);
        return false;
    }
}

/**
 * Update the email delivery status.
 */
function updatePledgeEmailStatus(
    PDO $pdo,
    $idOrRegId,
    string $status,
    ?string $error
): void {
    try {
        $stmt = $pdo->prepare(
            "UPDATE pledge_registrations
             SET email_status = :status,
                 email_sent_at = :sent_at,
                 last_error = :error
             WHERE id = :id_int OR registration_id = :reg_id"
        );

        $stmt->execute([
            ':status' => $status,
            ':sent_at' => $status === 'sent' ? date('Y-m-d H:i:s') : null,
            ':error' => $error,
            ':id_int' => is_numeric($idOrRegId) ? (int)$idOrRegId : 0,
            ':reg_id' => (string)$idOrRegId,
        ]);
    } catch (\Throwable $exception) {
        error_log('Could not update pledge email status: ' . $exception->getMessage());
    }
}

/**
 * Full Hindi welcome email HTML with all 14 About points.
 */
function buildPledgeWelcomeBodyHindi(
    string $name,
    string $registrationId,
    string $registeredAt
): string {
    $nameHtml = pledgeMailEscape($name);
    $idHtml = pledgeMailEscape($registrationId);
    $dateHtml = pledgeMailEscape(date('d F Y, h:i A', strtotime($registeredAt)) . ' IST');

    return <<<HTML
<!DOCTYPE html>
<html lang="hi">
<head>
<meta charset="utf-8">
<style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; line-height: 1.7; color: #1e293b; background-color: #f1f5f3; margin: 0; padding: 20px; }
    .container { max-width: 620px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; border: 1px solid #e2e8f0; }
    .header { background: linear-gradient(135deg, #094b2a 0%, #14532d 100%); padding: 32px 24px; text-align: center; color: #ffffff; border-bottom: 4px solid #ea580c; }
    .content { padding: 30px 28px; }
    h2 { color: #14532d; font-size: 20px; margin-top: 0; }
    .points-box { background-color: #f8faf8; border: 1px solid #e2ece5; border-radius: 8px; padding: 18px 20px; margin: 18px 0; font-size: 13.5px; }
    .points-box ol { margin: 0; padding-left: 20px; }
    .points-box li { margin-bottom: 8px; }
    .support-box { background-color: #fffbf7; border: 1px solid #fed7aa; border-radius: 8px; padding: 18px 20px; margin: 18px 0; font-size: 13.5px; }
    .support-box ul { margin: 0; padding-left: 20px; }
    .support-box li { margin-bottom: 6px; }
    .card { background: #f0fdf4; border: 1.5px solid #86efac; border-radius: 10px; padding: 16px 20px; margin: 20px 0; }
    .footer { background: #0f351f; padding: 20px; text-align: center; color: #94a3b8; font-size: 12px; }
</style>
</head>
<body>
<div class="container">
    <div class="header">
        <h1 style="margin: 0; font-size: 22px; color: #ffffff;">PRITHVIWASI</h1>
        <p style="margin: 5px 0 0; color: #dcfce7; font-size: 13px;">पृथ्वीवासी सेवा और सुधार संगठन</p>
    </div>
    <div class="content">
        <h2>पृथ्वीवासी में आपका स्वागत है — एक बेहतर कल के लिए एकजुट 🌍</h2>
        <p><strong>आदरणीय {$nameHtml} जी,</strong></p>
        <p><strong>पृथ्वीवासी सेवा और सुधार संगठन (PRITHVIWASI)</strong> की ओर से सादर प्रणाम एवं हार्दिक अभिनंदन!</p>
        <p>धरती माता की रक्षा करने और एक स्वस्थ, हरित एवं सुरक्षित भविष्य के निर्माण में योगदान देने हेतु पावन राष्ट्रीय पर्यावरण संरक्षण संकल्प लेने के लिए आपका बहुत-बहुत धन्यवाद। आपका यह संकल्प प्रकृति, मानवता और पर्यावरण का सम्मान करने वाले एक जागरूक समाज के निर्माण की दिशा में एक ऐतिहासिक कदम है।</p>

        <h3 style="color:#14532d; margin-top: 24px;">पृथ्वीवासी के बारे में (About PRITHVIWASI)</h3>
        <div class="points-box">
            <ol>
                <li><strong>पृथ्वीवासी सेवा और सुधार संगठन (PRITHVIWASI)</strong> सेवा, सामाजिक सुधार, पर्यावरण जागरूकता और सभी के लिए एक बेहतर भविष्य के निर्माण को समर्पित एक राष्ट्रव्यापी संगठन है।</li>
                <li>हमारा व्यापक दृष्टिकोण लोगों को पर्यावरण संरक्षण, मानव कल्याण और सतत सामुदायिक विकास के लिए एकजुट होकर कार्य करने हेतु प्रेरित करना है।</li>
                <li>हम वर्तमान और आने वाली पीढ़ियों के सुरक्षित जीवन के लिए <strong>जल, वायु, मिट्टी, वन और जैव विविधता</strong> के संरक्षण के प्रति जन-जागरूकता को बढ़ावा देते हैं।</li>
                <li><strong>मिशन सॉइल (Mission Soil):</strong> मृदा संरक्षण, भूमि के जिम्मेदार उपयोग, भूमि पुनरुद्धार और स्वस्थ मृदा पारिस्थितिकी तंत्र के महत्व पर जागरूकता फैलाना।</li>
                <li><strong>मिशन वॉटर (Mission Water):</strong> जल संरक्षण, जल के विवेकपूर्ण उपयोग और समुदायों तथा भावी पीढ़ियों के लिए जल स्रोतों की सुरक्षा को बढ़ावा देना।</li>
                <li><strong>मिशन ग्रीन (Mission Green):</strong> सघन वृक्षारोपण, हरियाली संवर्धन, जैव विविधता संरक्षण और प्रकृति की रक्षा के लिए कार्य करना।</li>
                <li><strong>मिशन सोलर (Mission Solar):</strong> सौर ऊर्जा, नवीकरणीय ऊर्जा और स्वच्छ ऊर्जा विकल्पों के उपयोग को प्रोत्साहित करना।</li>
                <li>हमारा दृष्टिकोण संयुक्त राष्ट्र के <strong>सतत विकास लक्ष्यों (SDGs 2030)</strong> के अनुरूप है, जिसमें अच्छा स्वास्थ्य, गुणवत्तापूर्ण शिक्षा, लैंगिक समानता, पर्यावरणीय स्थिरता और समावेशी विकास शामिल हैं।</li>
                <li>हमारा मानना है कि एक मजबूत समाज के लिए स्वास्थ्य और कल्याण अनिवार्य है, इसलिए हम <strong>मानसिक स्वास्थ्य, निवारक स्वास्थ्य जांच और रोग निवारण जागरूकता</strong> को बढ़ावा देते हैं।</li>
                <li>हमारा विश्वास है कि शिक्षा, जागरूकता, समान अवसर और सामुदायिक भागीदारी से ही एक जिम्मेदार और समावेशी समाज का निर्माण हो सकता है।</li>
                <li>हम झारखंड सहित विभिन्न क्षेत्रों में सतत ग्रामीण विकास, पारिस्थितिक संतुलन और पर्यावरण सुधार में योगदान देने के लिए प्रतिबद्ध हैं।</li>
                <li>हमारा मानना है कि वास्तविक और स्थायी परिवर्तन तब शुरू होता है जब व्यक्ति, परिवार, समुदाय और संस्थाएं साझा जिम्मेदारी के साथ आगे आती हैं।</li>
                <li>जागरूकता और जन-भागीदारी के माध्यम से हम नागरिकों को पर्यावरण-अनुकूल आदतें अपनाने, कचरा कम करने, एकल-उपयोग प्लास्टिक का त्याग करने और प्राकृतिक संसाधनों की रक्षा करने के लिए प्रेरित करते हैं।</li>
                <li>हमारा दीर्घकालिक लक्ष्य एक ऐसे भविष्य का निर्माण करना है जहाँ पर्यावरण संरक्षण, समाज कल्याण, जन-स्वास्थ्य और सतत विकास एक साथ मिलकर आगे बढ़ें।</li>
            </ol>
        </div>

        <h3 style="color:#9a3412; margin-top: 24px;">आप पृथ्वीवासी का सहयोग कैसे कर सकते हैं?</h3>
        <p>आप इन सरल लेकिन प्रभावशाली कार्यों के माध्यम से इस पावन अभियान में अपना योगदान दे सकते हैं:</p>
        <div class="support-box">
            <ul>
                <li>दैनिक जीवन में जल और बिजली की बचत करें।</li>
                <li>अपने आस-पास स्वच्छता रखें और कचरे को कम करें।</li>
                <li>एकल-उपयोग प्लास्टिक (Single-Use Plastic) के अनावश्यक उपयोग से बचें।</li>
                <li>वृक्षारोपण और पौधों की देखभाल में सक्रिय सहयोग करें।</li>
                <li>मिट्टी, जल, हरियाली और सौर ऊर्जा के संरक्षण की जानकारी दूसरों से साझा करें।</li>
                <li>अपने परिवार, मित्रों और समाज को पर्यावरण के प्रति जागरूक करें।</li>
                <li>संगठन द्वारा आयोजित सामाजिक व पर्यावरणीय अभियानों में स्वेच्छा से भाग लें।</li>
                <li>स्वास्थ्य जागरूकता, निवारक स्वास्थ्य और मानसिक कल्याण को बढ़ावा दें।</li>
                <li>पर्यावरण और समाज सुधार की पहलों को बेहतर बनाने हेतु अपने सकारात्मक सुझाव साझा करें।</li>
                <li>संगठन की नवीनतम गतिविधियों और कार्यक्रमों की जानकारी के लिए हमारी आधिकारिक वेबसाइट से जुड़े रहें।</li>
            </ul>
        </div>

        <h3 style="color:#14532d; margin-top: 24px;">आपकी प्रतिज्ञा ही परिवर्तन की शुरुआत है</h3>
        <p>आदरणीय {$nameHtml} जी, इस साझा संकल्प का हिस्सा बनने के लिए पुनः धन्यवाद। एक प्रतिज्ञा तभी सार्थक होती है जब वह हमारे दैनिक आचरण, निर्णयों और प्रकृति के प्रति हमारे व्यवहार में दिखाई दे।</p>

        <div class="card">
            <p style="margin: 4px 0;"><strong>आपकी पंजीकरण संख्या (Registration ID):</strong> {$idHtml}</p>
            <p style="margin: 4px 0;"><strong>पंजीकरण तिथि (Registration Date):</strong> {$dateHtml}</p>
            <p style="margin: 4px 0; color: #15803d;"><strong>स्थिति:</strong> आधिकारिक रूप से सत्यापित एवं सक्रिय ✅</p>
        </div>

        <p style="font-weight: 500;">📄 आपका व्यक्तिगत <strong>पर्यावरण संरक्षण प्रतिज्ञा प्रमाण पत्र (Pledge Certificate PDF)</strong> इस ईमेल के साथ संलग्न (Attached) है।</p>
        <p>हम आपको एक ऐसे भविष्य के निर्माण में सतत सहयोग के लिए आमंत्रित करते हैं जो हम सभी के लिए अधिक स्वच्छ, स्वस्थ, हरित और सुरक्षित हो।</p>
        <p style="font-weight: bold; color: #14532d;">आइए मिलकर अपनी धरती की रक्षा करें, अपने समाज को सशक्त बनाएं और एक बेहतर कल का निर्माण करें।</p>

        <p style="margin-top: 25px;">
            सादर धन्यवाद एवं शुभकामनाएं,<br>
            <strong>टीम पृथ्वीवासी (Team PRITHVIWASI)</strong><br>
            पृथ्वीवासी सेवा और सुधार संगठन<br>
            वेबसाइट: <a href="https://prithviwasi.org/" style="color:#16a34a;">https://prithviwasi.org/</a><br>
            संगठन ईमेल: <a href="mailto:contact@prithviwasi.org" style="color:#16a34a;">contact@prithviwasi.org</a>
        </p>
        <p style="text-align: center; font-style: italic; color: #047857; margin-top: 20px;">
            &ldquo;One Earth, One Responsibility, One Collective Future&rdquo;<br>
            &ldquo;एक पृथ्वी, एक जिम्मेदारी, एक सामूहिक भविष्य&rdquo;
        </p>
    </div>
    <div class="footer">
        पृथ्वीवासी सेवा और सुधार संगठन (PRITHVIWASI) &bull; रांची, झारखंड, भारत &bull; ट्रस्ट पंजीकरण संख्या: 19317/2344
    </div>
</div>
</body>
</html>
HTML;
}

/**
 * Full Hindi plain text fallback.
 */
function buildPledgeWelcomeAltBodyHindi(
    string $name,
    string $registrationId,
    string $registeredAt
): string {
    $dateStr = date('d F Y, h:i A', strtotime($registeredAt)) . ' IST';
    return <<<TEXT
पृथ्वीवासी में आपका स्वागत है — एक बेहतर कल के लिए एकजुट 🌍

आदरणीय {$name} जी,

पृथ्वीवासी सेवा और सुधार संगठन (PRITHVIWASI) की ओर से सादर प्रणाम एवं हार्दिक अभिनंदन!

धरती माता की रक्षा करने और एक स्वस्थ, हरित एवं सुरक्षित भविष्य के निर्माण में योगदान देने हेतु पावन राष्ट्रीय पर्यावरण संरक्षण संकल्प लेने के लिए आपका बहुत-बहुत धन्यवाद।

आपकी पंजीकरण संख्या (Registration ID): {$registrationId}
पंजीकरण तिथि: {$dateStr}
स्थिति: आधिकारिक रूप से सत्यापित एवं सक्रिय

आपका आधिकारिक पर्यावरण संरक्षण प्रतिज्ञा प्रमाण पत्र (PDF) इस ईमेल के साथ संलग्न है।

सादर धन्यवाद एवं शुभकामनाएं,
टीम पृथ्वीवासी (PRITHVIWASI)
वेबसाइट: https://prithviwasi.org/
ईमेल: contact@prithviwasi.org
TEXT;
}

/**
 * Full English welcome email HTML with all 14 About points.
 */
function buildPledgeWelcomeBodyEnglish(
    string $name,
    string $registrationId,
    string $registeredAt
): string {
    $nameHtml = pledgeMailEscape($name);
    $idHtml = pledgeMailEscape($registrationId);
    $dateHtml = pledgeMailEscape(date('d F Y, h:i A', strtotime($registeredAt)) . ' IST');

    return <<<HTML
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; line-height: 1.65; color: #1e293b; background-color: #f1f5f3; margin: 0; padding: 20px; }
    .container { max-width: 620px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; border: 1px solid #e2e8f0; }
    .header { background: linear-gradient(135deg, #094b2a 0%, #14532d 100%); padding: 32px 24px; text-align: center; color: #ffffff; border-bottom: 4px solid #ea580c; }
    .content { padding: 30px 28px; }
    h2 { color: #14532d; font-size: 20px; margin-top: 0; }
    .points-box { background-color: #f8faf8; border: 1px solid #e2ece5; border-radius: 8px; padding: 18px 20px; margin: 18px 0; font-size: 13.5px; }
    .points-box ol { margin: 0; padding-left: 20px; }
    .points-box li { margin-bottom: 8px; }
    .support-box { background-color: #fffbf7; border: 1px solid #fed7aa; border-radius: 8px; padding: 18px 20px; margin: 18px 0; font-size: 13.5px; }
    .support-box ul { margin: 0; padding-left: 20px; }
    .support-box li { margin-bottom: 6px; }
    .card { background: #f0fdf4; border: 1.5px solid #86efac; border-radius: 10px; padding: 16px 20px; margin: 20px 0; }
    .footer { background: #0f351f; padding: 20px; text-align: center; color: #94a3b8; font-size: 12px; }
</style>
</head>
<body>
<div class="container">
    <div class="header">
        <h1 style="margin: 0; font-size: 22px; color: #ffffff;">PRITHVIWASI</h1>
        <p style="margin: 5px 0 0; color: #dcfce7; font-size: 13px;">Prithviwasi Seva Aur Sudhar Sangathan</p>
    </div>
    <div class="content">
        <h2>Welcome to PRITHVIWASI — Together for a Better Tomorrow 🌍</h2>
        <p><strong>Dear {$nameHtml},</strong></p>
        <p>Warm greetings from <strong>Prithviwasi Seva Aur Sudhar Sangathan (PRITHVIWASI)!</strong></p>
        <p>Thank you for taking the pledge to protect Mother Earth and contribute towards a healthier, greener, and more sustainable future. Your commitment represents an important step towards building a society that respects nature, humanity, and the environment.</p>

        <h3 style="color:#14532d; margin-top: 24px;">About PRITHVIWASI</h3>
        <div class="points-box">
            <ol>
                <li><strong>Prithviwasi Seva Aur Sudhar Sangathan (PRITHVIWASI)</strong> is an organization focused on service, social improvement, environmental awareness, and the vision of a better future for all.</li>
                <li>Our broader vision is to encourage people to work together for environmental protection, human well-being, and sustainable community development.</li>
                <li>We aim to promote awareness about the conservation of <strong>water, air, soil, forests, and biodiversity</strong>, recognizing their importance for present and future generations.</li>
                <li><strong>Mission Soil</strong> focuses on spreading awareness about soil conservation, responsible land use, land restoration, and the importance of maintaining healthy soil ecosystems.</li>
                <li><strong>Mission Water</strong> encourages water conservation, responsible water usage, and awareness about protecting water resources for communities and future generations.</li>
                <li><strong>Mission Green</strong> promotes environmental responsibility, tree plantation awareness, green surroundings, biodiversity conservation, and the protection of nature.</li>
                <li><strong>Mission Solar</strong> promotes awareness of solar energy, renewable energy, and cleaner alternatives that can contribute to a more sustainable future.</li>
                <li>Our vision is aligned with the broader aspirations of the <strong>United Nations Sustainable Development Goals (SDGs) for 2030</strong>, including good health, quality education, gender equality, environmental sustainability, and inclusive development.</li>
                <li>We recognize that health and well-being are essential for a stronger society, and our vision includes promoting <strong>mental wellness, preventive health checkups, healthcare awareness, and disease prevention</strong>.</li>
                <li>We believe that access to education, awareness, equal opportunities, and community participation can help build a more inclusive and responsible society.</li>
                <li>We aspire to contribute towards sustainable rural development, ecological restoration, and environmental improvement in Jharkhand, including areas facing environmental challenges.</li>
                <li>We believe that meaningful change begins when individuals, families, communities, and organizations work together with a shared sense of responsibility.</li>
                <li>Through awareness and community participation, we encourage people to adopt environmentally responsible habits, reduce waste, avoid unnecessary single-use plastics, conserve natural resources, and protect trees and wildlife.</li>
                <li>Our long-term vision is to support a future where environmental protection, social welfare, public well-being, and sustainable development go hand in hand.</li>
            </ol>
        </div>

        <h3 style="color:#9a3412; margin-top: 24px;">How Can You Support PRITHVIWASI?</h3>
        <p>You can contribute to this vision through simple but meaningful actions:</p>
        <div class="support-box">
            <ul>
                <li>Save water and electricity in your daily life.</li>
                <li>Keep your surroundings clean and reduce waste.</li>
                <li>Avoid unnecessary single-use plastics.</li>
                <li>Support tree plantation and biodiversity conservation.</li>
                <li>Share awareness about soil, water, greenery, and renewable energy.</li>
                <li>Encourage friends, family members, and your community to take environmental responsibility.</li>
                <li>Participate in relevant community activities and initiatives when opportunities are announced.</li>
                <li>Promote health awareness, preventive healthcare, mental wellness, and inclusive development.</li>
                <li>Share constructive ideas and suggestions that can help improve our environmental and social initiatives.</li>
                <li>Follow our official website for information about our organization and its initiatives.</li>
            </ul>
        </div>

        <h3 style="color:#14532d; margin-top: 24px;">Your Pledge Is the Beginning</h3>
        <p>Dear {$nameHtml}, thank you for becoming part of this shared commitment. A pledge becomes meaningful when it is reflected in our everyday actions, decisions, and treatment of the natural world.</p>

        <div class="card">
            <p style="margin: 4px 0;"><strong>Your Registration ID:</strong> {$idHtml}</p>
            <p style="margin: 4px 0;"><strong>Registration Date:</strong> {$dateHtml}</p>
            <p style="margin: 4px 0; color: #15803d;"><strong>Status:</strong> Officially Verified & Active ✅</p>
        </div>

        <p style="font-weight: 500;">📄 Your personalized <strong>Pledge Certificate PDF</strong> is attached to this email for your records.</p>
        <p>We invite you to continue supporting a future that is cleaner, healthier, greener, and more sustainable for everyone.</p>
        <p style="font-weight: bold; color: #14532d;">Together, let us protect our planet, strengthen our communities, and work towards a better tomorrow.</p>

        <p style="margin-top: 25px;">
            With regards,<br>
            <strong>Team PRITHVIWASI</strong><br>
            Prithviwasi Seva Aur Sudhar Sangathan<br>
            Website: <a href="https://prithviwasi.org/" style="color:#16a34a;">https://prithviwasi.org/</a><br>
            Organization contact: <a href="mailto:contact@prithviwasi.org" style="color:#16a34a;">contact@prithviwasi.org</a>
        </p>
        <p style="text-align: center; font-style: italic; color: #047857; margin-top: 20px;">
            &ldquo;One Earth, One Responsibility, One Collective Future.&rdquo;
        </p>
    </div>
    <div class="footer">
        Prithviwasi Seva Aur Sudhar Sangathan (PRITHVIWASI) &bull; Ranchi, Jharkhand, India &bull; Trust Reg. No. 19317/2344
    </div>
</div>
</body>
</html>
HTML;
}

/**
 * Full English plain text fallback.
 */
function buildPledgeWelcomeAltBodyEnglish(
    string $name,
    string $registrationId,
    string $registeredAt
): string {
    $dateStr = date('d F Y, h:i A', strtotime($registeredAt)) . ' IST';
    return <<<TEXT
Welcome to PRITHVIWASI — Together for a Better Tomorrow 🌍

Dear {$name},

Warm greetings from Prithviwasi Seva Aur Sudhar Sangathan (PRITHVIWASI)!

Thank you for taking the pledge to protect Mother Earth and contribute towards a healthier, greener, and more sustainable future.

Your Registration ID: {$registrationId}
Registration Date: {$dateStr}
Status: Officially Verified & Active

Your personalized pledge certificate (PDF) is attached to this email.

With regards,
Team PRITHVIWASI
Website: https://prithviwasi.org/
Email: contact@prithviwasi.org
TEXT;
}
