import React, { useEffect, useState } from 'react';
import { useModal } from '../../context/ModalContext';
import { X, Heart, Shield, Copy, Check, QrCode, Building, Award } from 'lucide-react';

export default function DonationModal() {
  const { isDonateModalOpen, closeDonateModal } = useModal();
  const [selectedAmount, setSelectedAmount] = useState('1100');
  const [copiedKey, setCopiedKey] = useState(null);

  useEffect(() => {
    if (isDonateModalOpen) {
      document.body.style.overflow = 'hidden';
      const handleKeyDown = (e) => {
        if (e.key === 'Escape') closeDonateModal();
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = '';
        window.removeEventListener('keydown', handleKeyDown);
      };
    } else {
      document.body.style.overflow = '';
    }
  }, [isDonateModalOpen, closeDonateModal]);

  if (!isDonateModalOpen) return null;

  const handleCopy = (text, key) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const amounts = ['500', '1100', '2100', '5100', '11000'];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) closeDonateModal();
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="donation-modal-title"
    >
      <div className="relative w-full max-w-xl bg-white rounded-2xl shadow-2xl overflow-hidden border border-emerald-100 animate-in zoom-in-95 duration-200">
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-[#0b5e34] via-[#094b2a] to-[#0b5e34] text-white p-6 relative border-b-4 border-b-[#ea580c]">
          <button
            onClick={closeDonateModal}
            className="absolute top-4 right-4 p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-full transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 mb-1.5">
            <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-xs font-semibold bg-orange-500/20 text-orange-200 border border-orange-400/35">
              <Heart className="w-3.5 h-3.5 text-rose-300 fill-rose-300" />
              Manav Kalyan & Prakriti Seva
            </span>
          </div>

          <h2 id="donation-modal-title" className="text-2xl font-black tracking-tight text-white font-serif">
            Support Our Mission
          </h2>
          <p className="text-emerald-100/90 text-sm mt-1">
            Every contribution directly funds tree planting, tribal children education, and village healthcare.
          </p>
        </div>

        {/* Modal Body */}
        <div className="p-6 max-h-[75vh] overflow-y-auto space-y-6">
          {/* Quick Amount Selector */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
              Select Contribution Amount (₹ INR)
            </label>
            <div className="grid grid-cols-5 gap-2">
              {amounts.map((amt) => (
                <button
                  key={amt}
                  type="button"
                  onClick={() => setSelectedAmount(amt)}
                  className={`py-2 px-3 rounded-xl text-sm font-bold border transition-all cursor-pointer ${
                    selectedAmount === amt
                      ? 'bg-emerald-700 text-white border-emerald-700 shadow-md ring-2 ring-emerald-300'
                      : 'bg-gray-50 text-gray-800 border-gray-200 hover:bg-gray-100'
                  }`}
                >
                  ₹{amt}
                </button>
              ))}
            </div>
          </div>

          {/* UPI Donation Box */}
          <div className="p-4 rounded-xl bg-emerald-50/70 border border-emerald-200">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <QrCode className="w-5 h-5 text-emerald-700" />
                <span className="font-bold text-sm text-emerald-950">Direct UPI Transfer</span>
              </div>
              <span className="text-xs bg-emerald-200/70 text-emerald-900 font-semibold px-2 py-0.5 rounded">
                Instant & 0% Fee
              </span>
            </div>

            <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-emerald-200">
              <div>
                <p className="text-xs text-gray-500 font-medium">Official Trust VPA / UPI ID</p>
                <p className="font-mono font-bold text-gray-900 text-sm">prithiviwasi@sbi</p>
              </div>
              <button
                onClick={() => handleCopy('prithiviwasi@sbi', 'upi')}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-emerald-100 hover:bg-emerald-200 text-emerald-800 rounded-md transition-colors cursor-pointer"
              >
                {copiedKey === 'upi' ? <Check className="w-3.5 h-3.5 text-green-700" /> : <Copy className="w-3.5 h-3.5" />}
                {copiedKey === 'upi' ? 'Copied!' : 'Copy UPI'}
              </button>
            </div>
          </div>

          {/* Bank Account Details */}
          <div className="p-4 rounded-xl bg-gray-50 border border-gray-200 space-y-2.5">
            <div className="flex items-center gap-2 mb-1">
              <Building className="w-5 h-5 text-gray-700" />
              <span className="font-bold text-sm text-gray-900">Direct Bank Transfer (NEFT / RTGS / IMPS)</span>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-2.5 bg-white rounded-lg border border-gray-200">
                <span className="text-gray-500 block">Account Name</span>
                <span className="font-bold text-gray-900">Prithiviwasi Seva aur Sudhar Sangathan</span>
              </div>
              <div className="p-2.5 bg-white rounded-lg border border-gray-200">
                <span className="text-gray-500 block">Bank & Branch</span>
                <span className="font-bold text-gray-900">State Bank of India, Ranchi Main</span>
              </div>
              <div className="p-2.5 bg-white rounded-lg border border-gray-200">
                <span className="text-gray-500 block">Account Number</span>
                <div className="flex items-center justify-between">
                  <span className="font-mono font-bold text-gray-900">32109876543</span>
                  <button
                    onClick={() => handleCopy('32109876543', 'acc')}
                    className="text-emerald-700 hover:text-emerald-900 p-1 cursor-pointer"
                    title="Copy Account Number"
                  >
                    {copiedKey === 'acc' ? <Check className="w-3 h-3 text-green-600" /> : <Copy className="w-3 h-3" />}
                  </button>
                </div>
              </div>
              <div className="p-2.5 bg-white rounded-lg border border-gray-200">
                <span className="text-gray-500 block">IFSC Code</span>
                <div className="flex items-center justify-between">
                  <span className="font-mono font-bold text-gray-900">SBIN0000167</span>
                  <button
                    onClick={() => handleCopy('SBIN0000167', 'ifsc')}
                    className="text-emerald-700 hover:text-emerald-900 p-1 cursor-pointer"
                    title="Copy IFSC Code"
                  >
                    {copiedKey === 'ifsc' ? <Check className="w-3 h-3 text-green-600" /> : <Copy className="w-3 h-3" />}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Tax Exemption Notice */}
          <div className="flex items-start gap-3 p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs">
            <Award className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold">Tax Exemption Available</p>
              <p className="mt-0.5 text-amber-800">
                Donations are eligible for tax deduction benefits under statutory charitable trust guidelines. Official receipts are issued for every donation.
              </p>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="bg-gray-50 p-4 border-t border-gray-200 flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-xs text-gray-500">
            <Shield className="w-4 h-4 text-emerald-600" />
            <span>100% Transparent Trust Operations</span>
          </div>
          <button
            onClick={closeDonateModal}
            className="px-5 py-2 text-sm font-semibold bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl transition-colors cursor-pointer shadow-sm"
          >
            Done / Close
          </button>
        </div>
      </div>
    </div>
  );
}
