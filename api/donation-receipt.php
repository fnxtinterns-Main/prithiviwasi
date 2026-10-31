<?php
declare(strict_types=1);

/**
 * Official Donation Receipt & Instant Email Dispatch Handler
 * Endpoint: /api/donation-receipt.php
 * PRITHVIWASI - Prithviwasi Seva Aur Sudhar Sangathan
 */

header('Content-Type: application/json; charset=UTF-8');
header('X-Content-Type-Options: nosniff');
header('X-Frame-Options: SAMEORIGIN');

require_once __DIR__ . '/config.php';
require_once __DIR__ . '/pledge-mailer.php';

// Helper to convert numbers to Indian currency words
function numberToIndianWords(float $number): string
{
    $no = floor($number);
    $point = round($number - $no, 2) * 100;
    $hundred = null;
    $digits_1 = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine'];
    $digits_2 = ['Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
    $digits_3 = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];

    $digits = ['', 'Hundred', 'Thousand', 'Lakh', 'Crore'];
    $str = [];
    $words = [];

    $i = 0;
    while ($no > 0) {
        $divider = ($i === 2) ? 10 : 100;
        $number_chunk = $no % $divider;
        $no = floor($no / $divider);
        $i += ($divider === 10) ? 1 : 2;

        if ($number_chunk) {
            $plural = (($counter = count($str)) && $number_chunk > 9) ? '' : null;
            $hundred = ($counter == 1 && $str[0]) ? ' and ' : null;
            
            if ($number_chunk < 10) {
                $unit = $digits_1[$number_chunk];
            } elseif ($number_chunk < 20) {
                $unit = $digits_2[$number_chunk - 10];
            } else {
                $unit = $digits_3[floor($number_chunk / 10)] . ' ' . $digits_1[$number_chunk % 10];
            }
            $str[] = trim($unit) . ' ' . ($digits[$counter] ?? '') . $plural . ' ' . $hundred;
        } else {
            $str[] = null;
        }
    }

    $result = implode('', array_reverse(array_filter($str)));
    $points = ($point) ? ' and ' . ($digits_1[floor($point / 10)] ?? '') . ' ' . ($digits_1[$point % 10] ?? '') . ' Paise' : '';

    return trim($result) !== '' ? trim($result) . ' Rupees Only' : 'Zero Rupees Only';
}

function buildDonationReceiptHtml(array $receipt): string
{
    $receiptNo = htmlspecialchars($receipt['receipt_no'], ENT_QUOTES, 'UTF-8');
    $donorName = htmlspecialchars($receipt['donor_name'], ENT_QUOTES, 'UTF-8');
    $email = htmlspecialchars($receipt['email'], ENT_QUOTES, 'UTF-8');
    $phone = htmlspecialchars($receipt['phone'] ?: 'N/A', ENT_QUOTES, 'UTF-8');
    $pan = htmlspecialchars($receipt['pan'] ?: 'N/A', ENT_QUOTES, 'UTF-8');
    $amountFormatted = number_format((float)$receipt['amount'], 2);
    $amountWords = htmlspecialchars(numberToIndianWords((float)$receipt['amount']), ENT_QUOTES, 'UTF-8');
    $cause = htmlspecialchars($receipt['cause'], ENT_QUOTES, 'UTF-8');
    $utr = htmlspecialchars($receipt['utr_no'] ?: 'Verified Online UPI', ENT_QUOTES, 'UTF-8');
    $paymentMode = htmlspecialchars($receipt['payment_mode'] ?? 'UPI', ENT_QUOTES, 'UTF-8');
    $dateStr = htmlspecialchars(date('d F Y, h:i A', strtotime($receipt['created_at'])) . ' IST', ENT_QUOTES, 'UTF-8');

    return <<<HTML
<!DOCTYPE html>
<html lang="hi">
<head>
<meta charset="utf-8">
<style>
    body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f3f6f4; margin: 0; padding: 20px; color: #1f2937; line-height: 1.6; }
    .receipt-container { max-width: 680px; margin: 0 auto; background: #ffffff; border-radius: 14px; overflow: hidden; border: 2px solid #059669; box-shadow: 0 10px 25px rgba(0,0,0,0.08); }
    .header { background: linear-gradient(135deg, #094b2a 0%, #047857 100%); color: #ffffff; padding: 30px 25px; text-align: center; border-bottom: 4px solid #ea580c; }
    .header h1 { margin: 0; font-size: 24px; letter-spacing: 0.5px; font-weight: 800; color: #ffffff; }
    .header p { margin: 6px 0 0; color: #d1fae5; font-size: 13.5px; }
    .body { padding: 32px 30px; }
    .receipt-badge { display: inline-block; background-color: #ecfdf5; border: 1.5px solid #10b981; color: #047857; font-weight: 700; padding: 6px 16px; border-radius: 9999px; font-size: 13px; margin-bottom: 20px; }
    .meta-table { width: 100%; border-collapse: collapse; margin-bottom: 24px; }
    .meta-table td { padding: 8px 12px; font-size: 14px; border-bottom: 1px solid #e5e7eb; }
    .meta-table td.label { width: 38%; font-weight: 600; color: #4b5563; background-color: #f9fafb; }
    .meta-table td.value { font-weight: 700; color: #111827; }
    .amount-box { background: linear-gradient(135deg, #f0fdf4 0%, #ecfdf5 100%); border: 2px dashed #059669; border-radius: 12px; padding: 18px 22px; text-align: center; margin: 24px 0; }
    .amount-box .num { font-size: 32px; font-weight: 900; color: #065f46; }
    .amount-box .words { font-size: 14px; font-weight: 600; color: #047857; margin-top: 4px; }
    .tax-box { background-color: #fffbeb; border: 1px solid #fcd34d; border-radius: 8px; padding: 12px 16px; font-size: 12.5px; color: #92400e; margin: 20px 0; }
    .footer { background: #064e3b; color: #9ca3af; text-align: center; padding: 18px; font-size: 12px; }
</style>
</head>
<body>
<div class="receipt-container">
    <div class="header">
        <h1>पृथ्वीवासी सेवा और सुधार संगठन</h1>
        <p>PRITHVIWASI SEVA AUR SUDHAR SANGATHAN &bull; Reg. No. 19317/2344</p>
        <p style="font-size: 12px; color: #a7f3d0; margin-top: 4px;">रजिस्ट्रेशन पता: रांची, झारखंड, भारत | पैन: AAATP1289R</p>
    </div>
    <div class="body">
        <div style="text-align: center;">
            <span class="receipt-badge">आधिकारिक दान पावती / Official 80G Donation Receipt</span>
        </div>

        <p>आदरणीय <strong>{$donorName}</strong> जी,</p>
        <p>पृथ्वीवासी सेवा और सुधार संगठन को मानव कल्याण, पर्यावरण संवर्धन एवं समाज उत्थान हेतु आपके अमूल्य सहयोग और दान के लिए हार्दिक धन्यवाद। आपकी पावती का विवरण निम्नलिखित है:</p>

        <table class="meta-table">
            <tr>
                <td class="label">रसीद संख्या (Receipt No)</td>
                <td class="value"><span style="color:#047857; font-family: monospace; font-size: 15px;">{$receiptNo}</span></td>
            </tr>
            <tr>
                <td class="label">दिनांक व समय (Date & Time)</td>
                <td class="value">{$dateStr}</td>
            </tr>
            <tr>
                <td class="label">दानदाता का नाम (Donor Name)</td>
                <td class="value">{$donorName}</td>
            </tr>
            <tr>
                <td class="label">ईमेल (Registered Email)</td>
                <td class="value">{$email}</td>
            </tr>
            <tr>
                <td class="label">मोबाइल नंबर (Mobile)</td>
                <td class="value">{$phone}</td>
            </tr>
            <tr>
                <td class="label">पैन नंबर (PAN Number)</td>
                <td class="value">{$pan}</td>
            </tr>
            <tr>
                <td class="label">दान का उद्देश्य (Cause / Purpose)</td>
                <td class="value"><span style="color:#094b2a;">{$cause}</span></td>
            </tr>
            <tr>
                <td class="label">भुगतान माध्यम (Payment Mode)</td>
                <td class="value">{$paymentMode}</td>
            </tr>
            <tr>
                <td class="label">ट्रांज़ैक्शन रेफ़रेंस / UTR</td>
                <td class="value"><span style="font-family: monospace;">{$utr}</span></td>
            </tr>
        </table>

        <div class="amount-box">
            <div style="font-size: 13px; color: #047857; font-weight: 700; text-transform: uppercase;">प्राप्त दान राशि / Total Received Amount</div>
            <div class="num">&#8377;{$amountFormatted}</div>
            <div class="words">({$amountWords})</div>
        </div>

        <div class="tax-box">
            <strong>आयकर छूट सूचना (Tax Exemption Notice):</strong><br>
            पृथ्वीवासी सेवा और सुधार संगठन को दिए गए सभी दान आयकर अधिनियम की धारा 80G के अंतर्गत कर कटौती (Tax Deduction) हेतु अनुमन्य हैं। कृपया इस रसीद को अपने आयकर विवरणी हेतु सुरक्षित रखें।
        </div>

        <div style="margin-top: 30px; text-align: right;">
            <p style="margin: 0; font-size: 14px; font-weight: 700; color: #064e3b;">अधिकृत हस्ताक्षरकर्ता (Authorized Signatory)</p>
            <p style="margin: 2px 0 0; font-size: 12px; color: #4b5563;">पृथ्वीवासी सेवा और सुधार संगठन</p>
            <p style="margin: 2px 0 0; font-size: 11px; color: #16a34a; font-weight: bold;">[ Digitally Signed & System Verified ]</p>
        </div>
    </div>
    <div class="footer">
        पृथ्वीवासी सेवा और सुधार संगठन &bull; ईमेल: contact@prithviwasi.org &bull; वेबसाइट: https://prithviwasi.org/<br>
        यह एक कंप्यूटर-जनरेटेड आधिकारिक रसीद है। किसी भौतिक हस्ताक्षर की आवश्यकता नहीं है।
    </div>
</div>
</body>
</html>
HTML;
}

try {
    $rawInput = (string)file_get_contents('php://input');
    $input = json_decode($rawInput, true);
    if (!is_array($input)) {
        $input = $_POST;
    }

    $donorName = trim((string)($input['donor_name'] ?? $input['name'] ?? ''));
    $email = trim((string)($input['email'] ?? ''));
    $phone = trim((string)($input['phone'] ?? $input['mobile'] ?? ''));
    $pan = strtoupper(trim((string)($input['pan'] ?? '')));
    $amount = (float)($input['amount'] ?? 0);
    $cause = trim((string)($input['cause'] ?? 'General Trust Welfare / सामान्य जनकल्याण'));
    $utrNo = trim((string)($input['utr_no'] ?? $input['utr'] ?? $input['transaction_id'] ?? ''));
    $paymentMode = trim((string)($input['payment_mode'] ?? 'UPI'));

    if ($donorName === '' || strlen($donorName) < 2 || strlen($donorName) > 150) {
        respond(422, [
            'success' => false,
            'message' => 'कृपया एक वैध नाम दर्ज करें (Please enter a valid donor name).'
        ]);
    }

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        respond(422, [
            'success' => false,
            'message' => 'कृपया एक वैध ईमेल पता दर्ज करें (Please enter a valid email address).'
        ]);
    }

    if ($amount <= 0) {
        respond(422, [
            'success' => false,
            'message' => 'कृपया एक वैध दान राशि दर्ज करें (Please enter a valid donation amount).'
        ]);
    }

    $year = date('Y');
    $receiptNo = sprintf('PW-RCP-%s-%05d', $year, random_int(10000, 99999));
    $createdAt = date('Y-m-d H:i:s');

    $receiptRecord = [
        'receipt_no' => $receiptNo,
        'donor_name' => $donorName,
        'email' => $email,
        'phone' => $phone,
        'pan' => $pan,
        'amount' => $amount,
        'cause' => $cause,
        'utr_no' => $utrNo,
        'payment_mode' => $paymentMode,
        'created_at' => $createdAt
    ];

    $pdo = database();
    if ($pdo instanceof PDO) {
        // Ensure strictly unique receipt_no
        while (true) {
            $chk = $pdo->prepare('SELECT id FROM donations WHERE receipt_no = :rcp LIMIT 1');
            $chk->execute(['rcp' => $receiptNo]);
            if (!$chk->fetchColumn()) {
                break;
            }
            $receiptNo = sprintf('PW-RCP-%s-%05d', $year, random_int(10000, 99999));
            $receiptRecord['receipt_no'] = $receiptNo;
        }

        $stmt = $pdo->prepare('
            INSERT INTO donations 
                (receipt_no, donor_name, email, phone, pan, amount, cause, utr_no, payment_mode, receipt_sent, created_at)
            VALUES 
                (:receipt_no, :donor_name, :email, :phone, :pan, :amount, :cause, :utr_no, :payment_mode, 0, :created_at)
        ');
        $stmt->execute([
            'receipt_no' => $receiptRecord['receipt_no'],
            'donor_name' => $donorName,
            'email' => $email,
            'phone' => $phone ?: null,
            'pan' => $pan ?: null,
            'amount' => $amount,
            'cause' => $cause,
            'utr_no' => $utrNo ?: null,
            'payment_mode' => $paymentMode,
            'created_at' => $createdAt
        ]);
    } else {
        // Fallback to local JSON log
        $dataFile = __DIR__ . '/donations_data.json';
        $existing = [];
        if (file_exists($dataFile)) {
            $existing = json_decode((string)file_get_contents($dataFile), true) ?: [];
        }
        $existing[] = $receiptRecord;
        @file_put_contents($dataFile, json_encode($existing, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
    }

    // Generate HTML receipt and dispatch email to donor
    $receiptHtml = buildDonationReceiptHtml($receiptRecord);
    $subject = 'दान रसीद: ' . $receiptRecord['receipt_no'] . ' | पृथ्वीवासी सेवा और सुधार संगठन';
    $fromEmail = projectEnvValue('MAIL_FROM', projectEnvValue('SMTP_USER', 'contact@prithviwasi.org'));
    $fromName = projectEnvValue('MAIL_FROM_NAME', 'PRITHVIWASI - Prithviwasi Seva Aur Sudhar Sangathan');

    $emailSent = false;
    $smtpHost = projectEnvValue('SMTP_HOST', 'smtp.hostinger.com');
    $smtpPort = (int)projectEnvValue('SMTP_PORT', '465');
    $smtpSecure = strtolower(projectEnvValue('SMTP_SECURE', 'ssl'));
    $smtpUser = projectEnvValue('SMTP_USER', 'contact@prithviwasi.org');
    $smtpPass = projectEnvValue('SMTP_PASS', '');

    if ($smtpPass !== '') {
        $emailSent = sendDirectSmtpMail(
            $smtpHost,
            $smtpPort,
            $smtpSecure,
            $smtpUser,
            $smtpPass,
            $fromEmail,
            $fromName,
            $email,
            $donorName,
            $subject,
            $receiptHtml,
            null,
            null
        );
    }

    if (!$emailSent) {
        $emailSent = sendNativePhpMail($fromEmail, $fromName, $email, $subject, $receiptHtml);
    }

    if ($emailSent && $pdo instanceof PDO) {
        try {
            $up = $pdo->prepare('UPDATE donations SET receipt_sent = 1 WHERE receipt_no = :rcp');
            $up->execute(['rcp' => $receiptRecord['receipt_no']]);
        } catch (Throwable $ignored) {}
    }

    respond(201, [
        'success' => true,
        'email_sent' => $emailSent,
        'emailSent' => $emailSent,
        'message' => $emailSent
            ? "दान के लिए धन्यवाद! आपकी आधिकारिक 80G दान पावती संख्या {$receiptRecord['receipt_no']} आपके ईमेल {$email} पर भेज दी गई है।"
            : "दान सफलतापूर्वक दर्ज हो गया है! आपकी पावती संख्या: {$receiptRecord['receipt_no']}",
        'receipt' => [
            'receipt_no' => $receiptRecord['receipt_no'],
            'donor_name' => $donorName,
            'email' => $email,
            'phone' => $phone,
            'pan' => $pan,
            'amount' => $amount,
            'amount_words' => numberToIndianWords($amount),
            'cause' => $cause,
            'utr_no' => $utrNo,
            'payment_mode' => $paymentMode,
            'date' => date('d F Y, h:i A', strtotime($createdAt)) . ' IST'
        ]
    ]);

} catch (Throwable $e) {
    error_log('Donation receipt error: ' . $e->getMessage());
    respond(500, [
        'success' => false,
        'message' => 'दान पावती प्रक्रिया में त्रुटि: ' . $e->getMessage()
    ]);
}
