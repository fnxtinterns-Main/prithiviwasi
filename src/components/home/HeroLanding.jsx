import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useModal } from '../../context/ModalContext';
import { ShieldCheck, Heart, Sparkles, ArrowRight } from 'lucide-react';

export default function HeroLanding() {
  const { openRegModal, openDonateModal } = useModal();

  return (
    <section className="relative overflow-hidden min-h-[92vh] flex items-center justify-center bg-gradient-to-b from-emerald-950 via-emerald-900 to-green-950 text-white">
      {/* Background Scenic & Gandhi Silhouette Layer with Framer Motion Blur-to-Focus Animation */}
      <motion.div
        className="absolute inset-0 z-0 bg-cover bg-center pointer-events-none"
        initial={{ filter: 'blur(20px)', opacity: 0.6 }}
        animate={{ filter: 'blur(0px)', opacity: 0.85 }}
        transition={{ duration: 2, ease: 'easeOut' }}
        style={{
          backgroundImage: "radial-gradient(circle at center, rgba(6, 78, 59, 0.45) 0%, rgba(2, 44, 34, 0.85) 100%), url('/assets/scenic_nature_backdrop.jpg')",
        }}
      >
        {/* Subtle Ambient Vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-emerald-950 via-emerald-950/60 to-transparent" />
      </motion.div>

      {/* Gandhi Ji Artistic Silhouette Placement */}
      <motion.div
        className="absolute bottom-0 left-4 sm:left-12 lg:left-24 max-w-[260px] sm:max-w-[340px] lg:max-w-[420px] pointer-events-none z-10 opacity-30 sm:opacity-40"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 0.35, y: 0 }}
        transition={{ duration: 1.8, delay: 0.3 }}
      >
        <img
          src="/assets/gandhi_cutout.png"
          alt="Mahatma Gandhi"
          className="w-full h-auto object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.8)] filter grayscale contrast-125"
        />
      </motion.div>

      {/* Foreground Content Container */}
      <div className="relative z-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        {/* Badge Slogan Tag */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-200 text-xs sm:text-sm font-semibold tracking-wide mb-6 backdrop-blur-md shadow-lg"
        >
          <Sparkles className="w-4 h-4 text-emerald-400" />
          <span>संघे शक्ति कलियुगे • Strength in Collective Action</span>
        </motion.div>

        {/* Clickable Organization Logos Section with Hover Tooltips */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 mb-8"
        >
          {/* Prithiviwasi Clickable Logo */}
          <button
            onClick={() => openRegModal('prithiviwasi')}
            className="group relative flex flex-col items-center p-3 rounded-2xl bg-white/10 hover:bg-white/20 border border-emerald-300/30 hover:border-emerald-300/80 transition-all duration-300 backdrop-blur-md shadow-xl cursor-pointer hover:scale-105"
            title="Click to view Prithiviwasi Trust Registration Table"
          >
            <div className="relative">
              <img
                src="/assets/logo.png"
                alt="Prithiviwasi Logo"
                className="w-20 h-20 sm:w-24 sm:h-24 object-contain rounded-full bg-white/95 p-1.5 shadow-md"
              />
              <span className="absolute -bottom-2 px-2 py-0.5 bg-emerald-600 text-[10px] font-bold rounded-full border border-emerald-300 text-white shadow">
                Trust #19317/2344
              </span>
            </div>
            <span className="mt-3 text-xs sm:text-sm font-bold text-white group-hover:text-emerald-300 transition-colors flex items-center gap-1">
              <span>PRITHIVIWASI</span>
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            </span>
            <span className="text-[10px] text-emerald-200/80 font-medium">Click for Trust Details</span>
          </button>

          {/* Partner Connection Badge */}
          <div className="flex flex-col items-center">
            <span className="text-emerald-400 font-bold text-xs uppercase tracking-widest">In Alliance With</span>
            <div className="w-12 h-0.5 bg-gradient-to-r from-emerald-500 to-green-300 my-1"></div>
          </div>

          {/* Agents of Change Clickable Partner Logo */}
          <button
            onClick={() => openRegModal('agentsOfChange')}
            className="group relative flex flex-col items-center p-3 rounded-2xl bg-white/10 hover:bg-white/20 border border-emerald-300/30 hover:border-emerald-300/80 transition-all duration-300 backdrop-blur-md shadow-xl cursor-pointer hover:scale-105"
            title="Click to view Agents of Change Partner Registration Details"
          >
            <div className="relative">
              <img
                src="/assets/agents_of_change_logo.jpg"
                alt="Agents of Change Logo"
                className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-2xl bg-white p-1 shadow-md"
              />
              <span className="absolute -bottom-2 px-2 py-0.5 bg-green-700 text-[10px] font-bold rounded-full border border-green-300 text-white shadow">
                Partner Alliance
              </span>
            </div>
            <span className="mt-3 text-xs sm:text-sm font-bold text-white group-hover:text-emerald-300 transition-colors flex items-center gap-1">
              <span>AGENTS OF CHANGE</span>
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            </span>
            <span className="text-[10px] text-emerald-200/80 font-medium">Click for Partner Info</span>
          </button>
        </motion.div>

        {/* Main Headings and Tagline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="space-y-4 max-w-3xl mx-auto"
        >
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-tight">
            Manav Kalyan <span className="text-emerald-400">Since 2006</span>
          </h1>

          <p className="text-lg sm:text-2xl text-emerald-100 font-serif font-medium">
            पृथ्वी का कर्ज कब चुकाओगे?
          </p>

          <p className="text-sm sm:text-base text-emerald-200/90 max-w-2xl mx-auto leading-relaxed">
            A registered charitable trust dedicated to human development, ecological conservation, tribal community empowerment, and environmental responsibility across India.
          </p>
        </motion.div>

        {/* Interactive Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <Link
            to="/who"
            className="px-6 py-3.5 bg-emerald-500 hover:bg-emerald-400 text-emerald-950 font-bold text-sm sm:text-base rounded-xl shadow-lg hover:shadow-emerald-500/30 transition-all flex items-center gap-2"
          >
            <span>Explore Our Journey & Who We Are</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          <Link
            to="/pledge"
            className="px-6 py-3.5 bg-white/10 hover:bg-white/20 border border-emerald-300/40 text-white font-bold text-sm sm:text-base rounded-xl backdrop-blur-md shadow-lg transition-all flex items-center gap-2"
          >
            <span>Take National Environmental Pledge</span>
          </Link>

          <button
            onClick={openDonateModal}
            className="px-6 py-3.5 bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-500 hover:to-green-500 text-white font-bold text-sm sm:text-base rounded-xl shadow-lg transition-all flex items-center gap-2 cursor-pointer"
          >
            <Heart className="w-4 h-4 text-rose-300 fill-rose-300" />
            <span>Donate Now</span>
          </button>
        </motion.div>

        {/* Key Quick Impact Counters */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="mt-14 pt-8 border-t border-emerald-800/60 grid grid-cols-2 sm:grid-cols-4 gap-6 text-center"
        >
          <div className="p-3 rounded-xl bg-white/5 border border-white/10">
            <div className="text-2xl sm:text-3xl font-black text-emerald-400">2006</div>
            <div className="text-xs text-emerald-200 mt-1 font-medium">Year Established</div>
          </div>
          <div className="p-3 rounded-xl bg-white/5 border border-white/10">
            <div className="text-2xl sm:text-3xl font-black text-emerald-400">50,000+</div>
            <div className="text-xs text-emerald-200 mt-1 font-medium">Trees Planted</div>
          </div>
          <div className="p-3 rounded-xl bg-white/5 border border-white/10">
            <div className="text-2xl sm:text-3xl font-black text-emerald-400">100+</div>
            <div className="text-xs text-emerald-200 mt-1 font-medium">Villages Touched</div>
          </div>
          <div className="p-3 rounded-xl bg-white/5 border border-white/10">
            <div className="text-2xl sm:text-3xl font-black text-emerald-400">100%</div>
            <div className="text-xs text-emerald-200 mt-1 font-medium">Selfless Trust Service</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
