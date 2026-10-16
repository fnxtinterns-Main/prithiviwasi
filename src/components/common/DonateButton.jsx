import React from 'react';
import { useModal } from '../../context/ModalContext';
import { Heart } from 'lucide-react';

export default function DonateButton() {
  const { openDonateModal } = useModal();

  return (
    <div className="fixed bottom-6 right-6 z-40">
      <button
        onClick={openDonateModal}
        className="group flex items-center gap-2.5 px-5 py-3.5 bg-gradient-to-r from-emerald-700 via-green-600 to-emerald-700 text-white rounded-full shadow-2xl hover:shadow-emerald-900/40 hover:scale-105 active:scale-95 transition-all duration-300 border-2 border-emerald-300/40 cursor-pointer"
        aria-label="Open donation modal"
      >
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-rose-500"></span>
        </span>
        <Heart className="w-4 h-4 text-rose-300 fill-rose-300 group-hover:scale-110 transition-transform" />
        <span className="font-bold text-sm tracking-wide">Donate / सहयोग</span>
      </button>
    </div>
  );
}
