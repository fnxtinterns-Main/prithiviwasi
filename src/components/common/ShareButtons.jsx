import React, { useState } from 'react';
import { Share2, Check, Copy, Printer, MessageCircle, Send, ExternalLink } from 'lucide-react';

export default function ShareButtons({
  pledgeRecord,
  title = 'Prithiviwasi Environmental Protection Pledge',
  url = typeof window !== 'undefined' ? window.location.origin + '/pledge' : 'https://prithiviwasi.org/pledge',
}) {
  const [copied, setCopied] = useState(false);

  const participantName = pledgeRecord?.name || 'A responsible citizen';
  const certId = pledgeRecord?.id ? `PW-PLG-${pledgeRecord.id}` : 'Verified Citizen';

  const shareText = `🌱 I have proudly taken the National Environmental Protection Pledge with Prithiviwasi Trust (Certificate #${certId}) to protect Mother Earth, conserve forests, and foster sustainable communities. Join this movement for our future generations: ${url}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(shareText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text: shareText,
          url,
        });
      } catch (err) {
        console.log('Share dismissed');
      }
    } else {
      handleCopy();
    }
  };

  const handlePrint = () => {
    window.print();
  };

  // Social URLs
  const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}`;
  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`;
  const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
  const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${encodeURIComponent(shareText)}`;

  return (
    <div className="w-full bg-emerald-50/70 border border-emerald-200 rounded-2xl p-5 shadow-xs my-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
        <div>
          <h4 className="text-sm font-bold text-emerald-950 flex items-center gap-2">
            <Share2 className="w-4 h-4 text-emerald-700" />
            <span>Share Your Pledge & Inspire Others</span>
          </h4>
          <p className="text-xs text-emerald-800/80 mt-0.5">
            Encourage your friends, colleagues, and family to take the 10-line environmental oath.
          </p>
        </div>

        {/* Native Mobile Share Button */}
        {typeof navigator !== 'undefined' && navigator.share && (
          <button
            type="button"
            onClick={handleNativeShare}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-xs font-bold transition-colors cursor-pointer shadow-xs shrink-0"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>Share via Device</span>
          </button>
        )}
      </div>

      {/* Social Icons Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-2">
        {/* WhatsApp */}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-green-600 hover:bg-green-700 text-white text-xs font-bold transition-all shadow-xs cursor-pointer hover:scale-102"
          title="Share on WhatsApp"
        >
          <MessageCircle className="w-3.5 h-3.5" />
          <span>WhatsApp</span>
        </a>

        {/* Twitter / X */}
        <a
          href={twitterUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-gray-900 hover:bg-black text-white text-xs font-bold transition-all shadow-xs cursor-pointer hover:scale-102"
          title="Share on X / Twitter"
        >
          <span className="font-mono text-xs">𝕏</span>
          <span>Post</span>
        </a>

        {/* LinkedIn */}
        <a
          href={linkedInUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-blue-700 hover:bg-blue-800 text-white text-xs font-bold transition-all shadow-xs cursor-pointer hover:scale-102"
          title="Share on LinkedIn"
        >
          <ExternalLink className="w-3.5 h-3.5" />
          <span>LinkedIn</span>
        </a>

        {/* Facebook */}
        <a
          href={facebookUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all shadow-xs cursor-pointer hover:scale-102"
          title="Share on Facebook"
        >
          <Send className="w-3.5 h-3.5" />
          <span>Facebook</span>
        </a>

        {/* Copy Link */}
        <button
          type="button"
          onClick={handleCopy}
          className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-white hover:bg-gray-100 text-gray-800 border border-gray-300 text-xs font-bold transition-all shadow-xs cursor-pointer"
          title="Copy Pledge Link"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-green-600" /> : <Copy className="w-3.5 h-3.5" />}
          <span>{copied ? 'Copied!' : 'Copy Link'}</span>
        </button>

        {/* Print / Save Certificate */}
        <button
          type="button"
          onClick={handlePrint}
          className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-emerald-100 hover:bg-emerald-200 text-emerald-900 border border-emerald-300 text-xs font-bold transition-all shadow-xs cursor-pointer"
          title="Print or Save Certificate as PDF"
        >
          <Printer className="w-3.5 h-3.5" />
          <span>Print / PDF</span>
        </button>
      </div>
    </div>
  );
}
