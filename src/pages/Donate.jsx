import React, { useState, useEffect, useMemo } from 'react';
import QRCode from 'qrcode';
import { useLanguage } from '../context/LanguageContext';
import { 
  Heart, 
  QrCode, 
  Building, 
  Copy, 
  Check, 
  ShieldCheck, 
  Award, 
  Printer, 
  RefreshCw, 
  CheckCircle2, 
  ArrowRight,
  Sparkles,
  DollarSign
} from 'lucide-react';

export default function Donate() {
  const { isHindi } = useLanguage();

  // Selected or custom amount state
  const [selectedAmount, setSelectedAmount] = useState('1100');
  const [customAmount, setCustomAmount] = useState('');
  const [cause, setCause] = useState('Gaushala Seva / गौशाला एवं गोवंश सेवा');

  // Form fields
  const [donorName, setDonorName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [pan, setPan] = useState('');
  const [utrNo, setUtrNo] = useState('');

  // UI state
  const [qrDataUrl, setQrDataUrl] = useState('');
  const [copiedKey, setCopiedKey] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [receiptResult, setReceiptResult] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  // Pre-set amounts
  const presetAmounts = ['200', '500', '1100', '2100', '5100', '11000'];

  // Current active amount
  const activeAmount = useMemo(() => {
    if (customAmount && Number(customAmount) > 0) {
      return Number(customAmount);
    }
    return Number(selectedAmount) || 1100;
  }, [customAmount, selectedAmount]);

  // Unique transaction reference that changes per donation / amount
  const transactionRef = useMemo(() => {
    const timestamp = Date.now().toString().slice(-6);
    return `PW-DON-${timestamp}`;
  }, [activeAmount, cause]);

  // Generate dynamic UPI URL and QR Code
  // The account remains State Bank of India: prithiviwasi@sbi
  // but the QR code dynamically updates with exact amount, note, and unique ref!
  useEffect(() => {
    const upiString = `upi://pay?pa=prithiviwasi@sbi&pn=Prithviwasi%20Seva%20Sansthan&am=${activeAmount}&tr=${transactionRef}&tn=Donation%20${encodeURIComponent(cause)}&cu=INR`;
    
    QRCode.toDataURL(upiString, {
      width: 280,
      margin: 1.5,
      color: {
        dark: '#064e3b',
        light: '#ffffff'
      },
      errorCorrectionLevel: 'H'
    })
      .then((url) => setQrDataUrl(url))
      .catch((err) => console.error('QR code generation error:', err));
  }, [activeAmount, cause, transactionRef]);

  const handleCopy = (text, key) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handlePresetSelect = (amt) => {
    setSelectedAmount(amt);
    setCustomAmount('');
  };

  const handleCustomAmountChange = (e) => {
    const val = e.target.value.replace(/[^0-9]/g, '');
    setCustomAmount(val);
    if (val) {
      setSelectedAmount('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (!donorName.trim() || donorName.trim().length < 2) {
      setErrorMessage(isHindi ? 'कृपया अपना पूरा नाम दर्ज करें।' : 'Please enter your full name.');
      return;
    }

    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setErrorMessage(isHindi ? 'कृपया एक वैध ईमेल पता दर्ज करें।' : 'Please enter a valid email address.');
      return;
    }

    if (activeAmount <= 0) {
      setErrorMessage(isHindi ? 'कृपया एक वैध दान राशि चुनें या दर्ज करें।' : 'Please enter a valid donation amount.');
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch('/api/donation-receipt.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify({
          donor_name: donorName.trim(),
          email: email.trim(),
          phone: phone.trim(),
          pan: pan.trim().toUpperCase(),
          amount: activeAmount,
          cause,
          utr_no: utrNo.trim(),
          payment_mode: 'UPI'
        })
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setReceiptResult(data.receipt);
        // Scroll to receipt
        window.scrollTo({ top: 300, behavior: 'smooth' });
      } else {
        setErrorMessage(data.message || (isHindi ? 'रसीद जनरेट करने में त्रुटि आई।' : 'Failed to generate receipt.'));
      }
    } catch (err) {
      console.error(err);
      setErrorMessage(isHindi ? 'नेटवर्क त्रुटि। कृपया पुनः प्रयास करें।' : 'Network error. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f4f7f5] py-8 sm:py-12 px-3 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        
        {/* Page Top Banner */}
        <div className="text-center mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-100 text-emerald-800 text-xs sm:text-sm font-bold border border-emerald-300 shadow-sm mb-3">
            <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
            <span>{isHindi ? 'पावन सहयोग एवं लोक कल्याण' : 'Official Trust Donation & 80G Tax Exemption'}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-emerald-950 font-serif tracking-tight">
            {isHindi ? 'पृथ्वीवासी पावन सेवा सहयोग' : 'Support PRITHVIWASI Mission'}
          </h1>
          <p className="mt-2.5 text-sm sm:text-base text-gray-700 max-w-2xl mx-auto">
            {isHindi 
              ? 'गौ-संरक्षण, पर्यावरण संवर्धन, जनजातीय बाल शिक्षा एवं असहाय मानवता की सेवा में आपका प्रत्येक रुपया सीधे जीवन बदलता है।' 
              : 'Every contribution directly empowers tree planting, indigenous cattle shelter, tribal education, and free healthcare.'}
          </p>
          <div className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-900 bg-emerald-50 px-3 py-1 rounded-md border border-emerald-200">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>{isHindi ? 'आयकर धारा 80G के अंतर्गत कर कटौती अनुमन्य' : '80G Tax Exemption Eligible | Instant Email Receipt'}</span>
          </div>
        </div>

        {/* If Receipt is Generated: Show High-Res Printable Receipt Card */}
        {receiptResult ? (
          <div className="bg-white rounded-3xl shadow-2xl border-2 border-emerald-500 overflow-hidden mb-12 animate-in zoom-in-95 duration-300">
            <div className="bg-gradient-to-r from-[#094b2a] via-[#047857] to-[#094b2a] text-white p-6 sm:p-8 text-center border-b-4 border-b-[#ea580c]">
              <div className="inline-flex p-3 bg-white/10 rounded-full mb-3">
                <CheckCircle2 className="w-10 h-10 text-emerald-300" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-black font-serif">
                {isHindi ? 'दान सफलतापूर्वक स्वीकार हुआ एवं रसीद प्रेषित!' : 'Donation Acknowledged & Receipt Dispatched!'}
              </h2>
              <p className="text-emerald-100 text-sm mt-1">
                {isHindi ? `आधिकारिक दान पावती आपके ईमेल ${receiptResult.email} पर तुरंत भेज दी गई है।` : `An official 80G tax receipt has been sent to ${receiptResult.email}.`}
              </p>
            </div>

            <div className="p-6 sm:p-10 space-y-6">
              {/* Receipt Meta Cluster */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-50 p-6 rounded-2xl border border-gray-200 text-sm">
                <div>
                  <span className="text-gray-500 block text-xs">{isHindi ? 'रसीद संख्या (Receipt No)' : 'Receipt Number'}</span>
                  <span className="font-mono font-bold text-emerald-800 text-base">{receiptResult.receipt_no}</span>
                </div>
                <div>
                  <span className="text-gray-500 block text-xs">{isHindi ? 'दिनांक व समय' : 'Date & Time'}</span>
                  <span className="font-bold text-gray-900">{receiptResult.date}</span>
                </div>
                <div>
                  <span className="text-gray-500 block text-xs">{isHindi ? 'दानदाता का नाम' : 'Donor Name'}</span>
                  <span className="font-bold text-gray-900 text-base">{receiptResult.donor_name}</span>
                </div>
                <div>
                  <span className="text-gray-500 block text-xs">{isHindi ? 'पंजीकृत ईमेल' : 'Registered Email'}</span>
                  <span className="font-bold text-gray-900">{receiptResult.email}</span>
                </div>
                <div>
                  <span className="text-gray-500 block text-xs">{isHindi ? 'दान का उद्देश्य' : 'Designated Cause'}</span>
                  <span className="font-bold text-emerald-900">{receiptResult.cause}</span>
                </div>
                <div>
                  <span className="text-gray-500 block text-xs">{isHindi ? 'भुगतान रेफ़रेंस / UTR' : 'UTR / Payment Ref'}</span>
                  <span className="font-mono font-bold text-gray-900">{receiptResult.utr_no || 'Verified UPI Online'}</span>
                </div>
              </div>

              {/* Amount Highlight */}
              <div className="p-6 bg-gradient-to-br from-emerald-50 to-green-100/70 border-2 border-emerald-400 rounded-2xl text-center">
                <p className="text-xs font-bold uppercase tracking-wider text-emerald-800">
                  {isHindi ? 'कुल प्राप्त दान राशि' : 'Total Contribution Amount'}
                </p>
                <p className="text-4xl sm:text-5xl font-black text-emerald-950 mt-1">
                  ₹{Number(receiptResult.amount).toLocaleString('en-IN')}
                </p>
                <p className="text-sm font-semibold text-emerald-800 mt-1">
                  ({receiptResult.amount_words})
                </p>
              </div>

              {/* Actions */}
              <div className="flex flex-wrap items-center justify-center gap-4 pt-4 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold shadow-lg transition-all cursor-pointer"
                >
                  <Printer className="w-5 h-5" />
                  <span>{isHindi ? 'रसीद प्रिंट / डाउनलोड करें' : 'Print / Save Receipt'}</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setReceiptResult(null);
                    setCustomAmount('');
                    setUtrNo('');
                  }}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold transition-all cursor-pointer"
                >
                  <RefreshCw className="w-5 h-5" />
                  <span>{isHindi ? 'अन्य दान करें' : 'Make Another Contribution'}</span>
                </button>
              </div>
            </div>
          </div>
        ) : null}

        {/* Main 2-Column Donation Interface */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Form & Amount Controls (7 Cols) */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-gray-200 space-y-6">
            
            {/* Step 1: Cause Selection */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-emerald-900 mb-2">
                1. {isHindi ? 'सेवा का उद्देश्य चुनें (Select Cause)' : 'Select Designated Cause'}
              </label>
              <select
                value={cause}
                onChange={(e) => setCause(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 font-semibold text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-gray-50/50"
              >
                <option value="Gaushala Seva / गौशाला एवं गोवंश सेवा">🐄 गौशाला एवं गोवंश सेवा (Cow Sanctuary & Fodder)</option>
                <option value="Tribal Education / सुदूर ग्रामीण व वनवासी बाल शिक्षा">🎒 सुदूर ग्रामीण व वनवासी बाल शिक्षा (Tribal Child Education)</option>
                <option value="Tree Plantation / सामूहिक वृक्षारोपण एवं पर्यावरण रक्षा">🌱 सामूहिक वृक्षारोपण एवं पर्यावरण रक्षा (Mass Afforestation)</option>
                <option value="Elderly Medical / वृद्धजन व असहाय सेवा">🩺 वृद्धजन सेवा व निःशुल्क आरोग्य शिविर (Senior Healthcare)</option>
                <option value="General Trust Welfare / सामान्य जनकल्याण कोष">🌍 सामान्य जनकल्याण कोष (General Welfare Fund)</option>
              </select>
            </div>

            {/* Step 2: Amount Selector */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-emerald-900 mb-2">
                2. {isHindi ? 'दान राशि चुनें या दर्ज करें (Select or Enter Amount ₹)' : 'Select Contribution Amount (₹ INR)'}
              </label>
              
              {/* Preset Buttons */}
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 mb-3">
                {presetAmounts.map((amt) => (
                  <button
                    key={amt}
                    type="button"
                    onClick={() => handlePresetSelect(amt)}
                    className={`py-2.5 px-2 rounded-xl text-sm font-bold border transition-all cursor-pointer ${
                      selectedAmount === amt && !customAmount
                        ? 'bg-emerald-700 text-white border-emerald-700 shadow-md ring-2 ring-emerald-300'
                        : 'bg-gray-50 text-gray-800 border-gray-200 hover:bg-gray-100'
                    }`}
                  >
                    ₹{Number(amt).toLocaleString('en-IN')}
                  </button>
                ))}
              </div>

              {/* Custom Amount Input Box */}
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-500 font-bold text-lg">
                  ₹
                </span>
                <input
                  type="text"
                  inputMode="numeric"
                  placeholder={isHindi ? 'या कोई भी मनपसंद राशि यहां टाइप करें (Custom Amount)' : 'Or type any custom amount here...'}
                  value={customAmount}
                  onChange={handleCustomAmountChange}
                  className="w-full pl-9 pr-4 py-3 rounded-xl border border-gray-300 font-bold text-base text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
                />
              </div>
              <p className="text-xs text-gray-500 mt-1.5">
                {isHindi ? 'आप अपनी इच्छानुसार कोई भी राशि (₹1 से लेकर कितनी भी) दे सकते हैं।' : 'You can contribute any custom amount as per your wish.'}
              </p>
            </div>

            {/* Step 3: Donor Details Form */}
            <form onSubmit={handleSubmit} className="space-y-4 pt-4 border-t border-gray-200">
              <label className="block text-xs font-bold uppercase tracking-wider text-emerald-900">
                3. {isHindi ? 'दानदाता विवरण (Official Donor Details for 80G Receipt)' : 'Donor Details for Automated Receipt'}
              </label>

              {errorMessage && (
                <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-semibold">
                  {errorMessage}
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  {isHindi ? 'पूरा नाम (Full Name) *' : 'Full Name *'}
                </label>
                <input
                  type="text"
                  required
                  placeholder={isHindi ? 'उदा. सचिन तिवारी' : 'e.g. Ramesh Kumar'}
                  value={donorName}
                  onChange={(e) => setDonorName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    {isHindi ? 'ईमेल पता (Email - रसीद इसी पर पहुंचेगी) *' : 'Email Address (Receipt recipient) *'}
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    {isHindi ? 'मोबाइल नंबर (Mobile Phone)' : 'Mobile Phone'}
                  </label>
                  <input
                    type="tel"
                    placeholder="+91 98765 43210"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    {isHindi ? 'पैन नंबर (PAN - 80G छूट हेतु, वैकल्पिक)' : 'PAN Card (Optional for 80G tax benefit)'}
                  </label>
                  <input
                    type="text"
                    maxLength={10}
                    placeholder="ABCDE1234F"
                    value={pan}
                    onChange={(e) => setPan(e.target.value.toUpperCase())}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    {isHindi ? 'UPI UTR / रेफ़रेंस संख्या (वैकल्पिक)' : 'UTR / Transaction Reference (Optional)'}
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 430129849201"
                    value={utrNo}
                    onChange={(e) => setUtrNo(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-[#0b5e34] via-[#094b2a] to-[#0b5e34] hover:from-[#094b2a] hover:to-[#047857] text-white font-black text-base shadow-lg shadow-emerald-900/20 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed border-b-4 border-b-[#ea580c]"
              >
                {isSubmitting ? (
                  <>
                    <RefreshCw className="w-5 h-5 animate-spin" />
                    <span>{isHindi ? 'रसीद तैयार व ईमेल भेजी जा रही है...' : 'Generating & Emailing Receipt...'}</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5 text-amber-300" />
                    <span>
                      {isHindi 
                        ? `₹${activeAmount.toLocaleString('en-IN')} का सहयोग दर्ज करें एवं ईमेल रसीद पाएं` 
                        : `Submit ₹${activeAmount.toLocaleString('en-IN')} & Get Instant Email Receipt`}
                    </span>
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Right Column: Dynamic QR Code & Bank Accounts (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Dynamic QR Card */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 shadow-xl border-2 border-emerald-500 text-center relative overflow-hidden">
              <div className="absolute top-0 right-0 left-0 h-2 bg-gradient-to-r from-emerald-600 via-amber-500 to-emerald-600"></div>
              
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs font-bold mb-3">
                <QrCode className="w-3.5 h-3.5 text-emerald-700" />
                <span>{isHindi ? 'डायनामिक UPI QR कोड' : 'Live Dynamic UPI QR'}</span>
              </div>

              <h3 className="text-lg font-bold text-gray-900">
                {isHindi ? 'स्कैन करें और तुरंत भुगतान करें' : 'Scan to Pay with Any UPI App'}
              </h3>
              <p className="text-xs text-gray-600 mt-0.5">
                Google Pay &bull; PhonePe &bull; Paytm &bull; BHIM &bull; Cred
              </p>

              {/* Dynamic QR Display */}
              <div className="mt-4 p-4 bg-emerald-50/60 rounded-2xl border border-emerald-200 inline-block shadow-inner">
                {qrDataUrl ? (
                  <img
                    src={qrDataUrl}
                    alt="Dynamic Trust UPI QR Code"
                    className="w-56 h-56 mx-auto rounded-xl shadow-md border-2 border-white"
                  />
                ) : (
                  <div className="w-56 h-56 flex items-center justify-center text-gray-400">
                    <RefreshCw className="w-8 h-8 animate-spin" />
                  </div>
                )}
                
                {/* Dynamic Amount Badge */}
                <div className="mt-2.5 inline-flex items-center gap-1 text-emerald-950 font-black text-sm bg-white px-3 py-1 rounded-full shadow-sm border border-emerald-200">
                  <span>{isHindi ? 'सटीक राशि:' : 'Exact Amount:'}</span>
                  <span className="text-emerald-700 font-mono">₹{activeAmount.toLocaleString('en-IN')}</span>
                </div>
              </div>

              {/* Copy UPI ID */}
              <div className="mt-4 p-3 bg-gray-50 rounded-xl border border-gray-200 flex items-center justify-between text-left">
                <div>
                  <span className="text-[11px] text-gray-500 font-medium block">
                    {isHindi ? 'ट्रस्ट आधिकारिक UPI ID' : 'Official Trust UPI ID'}
                  </span>
                  <span className="font-mono font-bold text-gray-900 text-sm">prithiviwasi@sbi</span>
                </div>
                <button
                  type="button"
                  onClick={() => handleCopy('prithiviwasi@sbi', 'upi')}
                  className="flex items-center gap-1 px-3 py-1.5 text-xs font-bold rounded-lg bg-emerald-100 hover:bg-emerald-200 text-emerald-800 transition-colors cursor-pointer"
                >
                  {copiedKey === 'upi' ? <Check className="w-3.5 h-3.5 text-green-700" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedKey === 'upi' ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
            </div>

            {/* Direct Bank Transfer Details */}
            <div className="bg-white rounded-3xl p-6 shadow-xl border border-gray-200 space-y-4">
              <div className="flex items-center gap-2">
                <Building className="w-5 h-5 text-emerald-700" />
                <h4 className="font-bold text-sm text-gray-900">
                  {isHindi ? 'बैंक खाता विवरण (NEFT / RTGS / IMPS)' : 'Direct Bank Account Details'}
                </h4>
              </div>

              <div className="space-y-2 text-xs">
                <div className="p-2.5 bg-gray-50 rounded-lg border border-gray-200">
                  <span className="text-gray-500 block">{isHindi ? 'खाते का नाम' : 'Account Name'}</span>
                  <span className="font-bold text-gray-900">Prithiviwasi Seva aur Sudhar Sangathan</span>
                </div>
                <div className="p-2.5 bg-gray-50 rounded-lg border border-gray-200">
                  <span className="text-gray-500 block">{isHindi ? 'बैंक एवं शाखा' : 'Bank & Branch'}</span>
                  <span className="font-bold text-gray-900">State Bank of India, Ranchi Main</span>
                </div>
                <div className="p-2.5 bg-gray-50 rounded-lg border border-gray-200 flex items-center justify-between">
                  <div>
                    <span className="text-gray-500 block">{isHindi ? 'खाता संख्या' : 'Account Number'}</span>
                    <span className="font-mono font-bold text-gray-900 text-sm">32109876543</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleCopy('32109876543', 'acc')}
                    className="p-1.5 text-emerald-700 hover:text-emerald-900 rounded cursor-pointer"
                    title="Copy Account Number"
                  >
                    {copiedKey === 'acc' ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
                <div className="p-2.5 bg-gray-50 rounded-lg border border-gray-200 flex items-center justify-between">
                  <div>
                    <span className="text-gray-500 block">{isHindi ? 'IFSC कोड' : 'IFSC Code'}</span>
                    <span className="font-mono font-bold text-gray-900 text-sm">SBIN0000167</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleCopy('SBIN0000167', 'ifsc')}
                    className="p-1.5 text-emerald-700 hover:text-emerald-900 rounded cursor-pointer"
                    title="Copy IFSC"
                  >
                    {copiedKey === 'ifsc' ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-amber-900 text-[11px] leading-relaxed flex items-start gap-2">
                <Award className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                <span>
                  {isHindi
                    ? 'सभी दान ट्रस्ट पंजीकरण 19317/2344 के तहत आयकर छूट हेतु मान्य हैं। हर दान की औपचारिक पावती ईमेल पर भेजी जाती है।'
                    : 'Donations are 80G tax-exempt under statutory guidelines. Official receipts are issued instantly.'}
                </span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
