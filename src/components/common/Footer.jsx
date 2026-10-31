import React from 'react';
import { Link } from 'react-router-dom';
import { useModal } from '../../context/ModalContext';
import { Heart, ShieldCheck, Mail, MapPin, Phone, ArrowUpRight, Sparkles, Building2, CheckCircle2 } from 'lucide-react';

export default function Footer() {
  const { openRegModal, openDonateModal } = useModal();

  return (
    <footer className="bg-[#07381f] text-white pt-20 sm:pt-24 pb-12 sm:pb-16 border-t-4 border-[#ea580c] relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Main Footer Grid with Generous Spacing */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 pb-16 border-b border-emerald-800/60">
          
          {/* Column 1: Organization Overview (4 cols) */}
          <div className="lg:col-span-4 space-y-5">
            <div className="flex items-center gap-3.5">
              <img
                src="/assets/logo.png"
                alt="Prithiviwasi Logo"
                className="w-14 h-14 object-contain rounded-2xl bg-white p-1.5 shadow-md"
              />
              <div>
                <h3 className="text-2xl font-black tracking-wider text-white font-serif">PRITHVIWASI</h3>
                <p className="text-xs text-amber-300 font-bold tracking-wide">पृथ्वीवासी सेवा और सुधार संगठन</p>
                <span className="inline-block text-[11px] font-bold text-emerald-300 mt-0.5">
                  पब्लिक चैरिटेबल ट्रस्ट • स्थापना २००६
                </span>
              </div>
            </div>

            <p className="text-emerald-100/90 text-sm leading-relaxed max-w-sm">
              Dedicated to holistic human development (Manav Kalyan), forest education, cattle protection, and environmental revival since 2006.
              Registered under the Indian Trusts Act in Ranchi, Jharkhand (Trust Deed No. <strong>19317/2344</strong>).
            </p>

            <div className="pt-2">
              <button
                onClick={() => openRegModal('prithiviwasi')}
                className="inline-flex items-center gap-2 text-xs font-bold px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-emerald-100 border border-emerald-400/40 shadow-sm transition-all cursor-pointer"
              >
                <ShieldCheck className="w-4 h-4 text-amber-300" />
                <span>Verify Trust Deed (19317/2344) ↗</span>
              </button>
            </div>
          </div>

          {/* Column 2: Navigation Links (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-wider text-emerald-300 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              Navigation
            </h4>
            <ul className="space-y-3 text-sm text-emerald-100/90">
              <li>
                <Link to="/" className="hover:text-amber-300 hover:underline transition-colors block">
                  Landing Portal (मुख्य प्रवेश)
                </Link>
              </li>
              <li>
                <Link to="/who" className="hover:text-amber-300 hover:underline transition-colors block">
                  Who We Are (परिचय एवं इतिहास)
                </Link>
              </li>
              <li>
                <Link to="/pledge" className="hover:text-amber-300 hover:underline transition-colors block">
                  Pledge (पर्यावरण संकल्प)
                </Link>
              </li>
              <li>
                <Link to="/what" className="hover:text-amber-300 hover:underline transition-colors block">
                  What We Do (कार्य क्षेत्र)
                </Link>
              </li>
              <li>
                <Link to="/why" className="hover:text-amber-300 hover:underline transition-colors block">
                  Why It Matters (उद्देश्य)
                </Link>
              </li>
              <li>
                <Link to="/how" className="hover:text-amber-300 hover:underline transition-colors block">
                  How You Can Help (सहयोग मार्ग)
                </Link>
              </li>
              <li>
                <Link to="/partners" className="hover:text-amber-300 hover:underline transition-colors block">
                  Alliance Partners (सहयोगी)
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Registered Offices & Locations (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-wider text-emerald-300 flex items-center gap-2">
              <Building2 className="w-4 h-4 text-amber-400" />
              Official Offices
            </h4>

            {/* Main Head Office */}
            <div className="p-4 rounded-2xl bg-emerald-950/60 border border-emerald-800/80 space-y-1.5">
              <div className="flex items-center gap-2 text-amber-300 text-xs font-bold uppercase tracking-wider">
                <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>Main Head Office</span>
              </div>
              <p className="text-xs sm:text-sm text-white font-medium leading-relaxed">
                LIG/R156, Sai Bhawan, Harmu Housing Colony, Ranchi, Jharkhand – 834002
              </p>
            </div>

            {/* City / Admin Office */}
            <div className="p-4 rounded-2xl bg-emerald-950/60 border border-emerald-800/80 space-y-1.5">
              <div className="flex items-center gap-2 text-emerald-300 text-xs font-bold uppercase tracking-wider">
                <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Administrative Office</span>
              </div>
              <p className="text-xs sm:text-sm text-white font-medium leading-relaxed">
                505, Mahabir Tower, Main Road, Ranchi, Jharkhand – 834001
              </p>
            </div>
          </div>

          {/* Column 4: Phone Numbers & Direct Email (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-wider text-emerald-300 flex items-center gap-2">
              <Phone className="w-4 h-4 text-amber-400" />
              Contact & Inquiries
            </h4>

            {/* Phone Numbers List */}
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-300 block">
                Official Helpline & Mobile:
              </span>
              <div className="grid grid-cols-2 gap-2 text-xs sm:text-sm font-semibold">
                <a
                  href="tel:9471527107"
                  className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white flex items-center gap-1.5 transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-amber-300" />
                  <span>9471527107</span>
                </a>
                <a
                  href="tel:9284023833"
                  className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white flex items-center gap-1.5 transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-amber-300" />
                  <span>9284023833</span>
                </a>
                <a
                  href="tel:06512241346"
                  className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white flex items-center gap-1.5 transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-amber-300" />
                  <span>0651-2241346</span>
                </a>
                <a
                  href="tel:9801506511"
                  className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white flex items-center gap-1.5 transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-amber-300" />
                  <span>9801506511</span>
                </a>
              </div>
            </div>

            {/* Emails */}
            <div className="space-y-1.5 pt-2">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-300 block">
                Official Correspondence:
              </span>
              <a
                href="mailto:prithviwasisewa@gmail.com"
                className="text-xs sm:text-sm text-emerald-100 hover:text-amber-300 transition-colors flex items-center gap-2"
              >
                <Mail className="w-3.5 h-3.5 text-amber-300 shrink-0" />
                <span>prithviwasisewa@gmail.com</span>
              </a>
              <a
                href="mailto:contact@prithviwasi.org"
                className="text-xs sm:text-sm text-emerald-100 hover:text-amber-300 transition-colors flex items-center gap-2"
              >
                <Mail className="w-3.5 h-3.5 text-amber-300 shrink-0" />
                <span>contact@prithviwasi.org</span>
              </a>
            </div>

            {/* Donate Button in Footer */}
            <div className="pt-2">
              <Link
                to="/donate"
                className="w-full py-3 px-4 bg-gradient-to-r from-[#ea580c] to-amber-600 hover:from-orange-600 hover:to-amber-500 text-white rounded-xl text-sm font-bold shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Heart className="w-4 h-4 text-rose-200 fill-rose-200" />
                <span>Support Manav Kalyan / दान सहयोग</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Banner with High-Dignity Copyright & Mantras */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-emerald-200/80">
          <div>
            © {new Date().getFullYear()} Prithiviwasi Seva aur Sudhar Sangathan (Trust Reg. No. 19317/2344, Ranchi, Jharkhand). All Rights Reserved.
          </div>
          <div className="flex items-center gap-3 text-amber-300 font-semibold font-serif text-xs sm:text-sm">
            <span>संघे शक्ति कलियुगे</span>
            <span>•</span>
            <span>सेवा ही संकल्प, सुधार ही हमारा लक्ष्य</span>
            <span>•</span>
            <span>मानव कल्याण एवं प्रकृति वंदन</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
