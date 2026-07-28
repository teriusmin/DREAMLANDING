import React from 'react';
import { motion } from 'motion/react';
import { CheckCircle2, Gift, ChevronRight, Sparkles } from 'lucide-react';

export default function Hero() {
  const scrollToForm = (e: React.MouseEvent) => {
    e.preventDefault();
    const target = document.getElementById('consultation-form-section');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const bullets = [
    'KT 공식 가입센터',
    'KT스카이라이프 전문 상담',
    '설치 후 빠른 사은품 지급',
    '전국 설치 가능'
  ];

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-red-950 py-16 sm:py-24 text-white" id="hero-section">
      {/* Background patterns */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ED1C24_1px,transparent_1px)] [background-size:16px_16px]"></div>
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-kt-red/20 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Hero Left Content */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-kt-red/15 border border-kt-red/30 text-kt-red text-sm font-bold tracking-wide"
            >
              <Sparkles className="w-4 h-4 animate-pulse" />
              <span>(주)드림텔레콤 공식 가입 대리점</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight font-display leading-tight"
            >
              <span className="block text-slate-100">KT / KT스카이라이프</span>
              <span className="block mt-2 text-kt-red">인터넷 가입 공식 센터</span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-block bg-gradient-to-r from-red-600 to-amber-500 p-[2px] rounded-2xl shadow-xl animate-none"
            >
              <div className="bg-slate-900 rounded-[14px] px-4.5 py-3 sm:px-6 sm:py-4 text-center sm:text-left">
                <div className="text-slate-400 text-xs sm:text-sm font-semibold tracking-wider uppercase mb-1">
                  드림텔레콤 단독 혜택 제공
                </div>
                <div className="text-[14px] xs:text-base sm:text-3xl md:text-4xl font-extrabold text-white flex flex-row flex-nowrap items-center justify-center sm:justify-start gap-1 sm:gap-2 whitespace-nowrap">
                  <span>💰 기본</span>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-amber-400 to-red-400 font-black">
                    45만원
                  </span>
                  <span className="text-white">+</span>
                  <span className="text-red-400 border-b-2 border-red-500 pb-0.5 font-black text-[17px] xs:text-xl sm:text-4xl md:text-5xl animate-pulse">
                    비밀지원금
                  </span>
                  <span>지급</span>
                </div>
              </div>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto lg:mx-0 font-medium"
            >
              인터넷 가입하고 전국 대리점 중 가장 많은 혜택과 ☆ 설치 당일 현금 입금 사은품을 챙겨가세요!
            </motion.p>

            {/* Bullets Grid */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3.5 max-w-lg mx-auto lg:mx-0 pt-4"
            >
              {bullets.map((bullet, idx) => (
                <div key={idx} className="flex items-center space-x-2 bg-slate-800/40 border border-slate-700/30 rounded-xl p-3 hover:bg-slate-800/60 transition-colors">
                  <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-kt-red shrink-0" />
                  <span className="text-xs sm:text-sm font-bold text-slate-200 leading-tight whitespace-nowrap">{bullet}</span>
                </div>
              ))}
            </motion.div>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="pt-4 sm:pt-6"
            >
              <button
                onClick={scrollToForm}
                className="glow-btn inline-flex items-center justify-center w-full sm:w-auto px-6 sm:px-8 py-3.5 sm:py-4 rounded-2xl bg-cta-orange text-white font-black text-base sm:text-lg lg:text-xl transition-all cursor-pointer group shadow-lg shadow-orange-500/20"
                id="hero-cta-btn"
              >
                <span>🔵 무료 상담 신청하기</span>
                <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 ml-1.5 sm:ml-2 group-hover:translate-x-1.5 transition-transform" />
              </button>
            </motion.div>
          </div>

          {/* Hero Right Visual Cards */}
          <div className="lg:col-span-5 relative flex flex-col sm:flex-row lg:flex-col items-center justify-center lg:items-end gap-6 sm:gap-6 lg:gap-6 w-full">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative w-full max-w-md sm:max-w-[340px] lg:max-w-md bg-white/5 backdrop-blur-md rounded-3xl p-5 sm:p-6 border border-white/10 shadow-2xl space-y-4 sm:space-y-5 shrink-0"
            >
              <div className="absolute top-4 right-4 bg-yellow-400 text-slate-900 font-extrabold text-[10px] px-2.5 py-1 rounded-full uppercase tracking-wider flex items-center space-x-1">
                <Gift className="w-3 h-3" />
                <span>BEST VALUE</span>
              </div>

              <div className="space-y-1">
                <span className="text-xs font-bold text-red-400 uppercase tracking-widest">DREAM TELECOM BENEFITS</span>
                <h3 className="text-lg sm:text-xl font-bold text-white font-display">인터넷 + TV 결합 최고 보장</h3>
              </div>

              {/* Reward Visual Graphic */}
              <div className="bg-gradient-to-br from-slate-800 to-slate-950 rounded-2xl p-4 sm:p-5 border border-slate-700/30 space-y-3 sm:space-y-4">
                <div className="flex flex-wrap justify-between items-center text-xs sm:text-sm text-slate-400 font-semibold gap-2">
                  <span>가입 즉시 증정 사은품</span>
                  <span className="text-base sm:text-xl font-black text-red-400 bg-red-950/60 border border-red-500/40 px-3 py-1 rounded-lg animate-pulse shadow-sm">
                    ⚡ 당일 현금 지급 원칙
                  </span>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between items-center bg-slate-900/80 rounded-xl p-2.5 sm:p-3 border border-slate-800">
                    <span className="text-xs sm:text-sm font-medium text-slate-300">현금 사은품</span>
                    <span className="text-sm sm:text-base font-black text-yellow-300">기본 45만원</span>
                  </div>
                  <div className="flex justify-between items-center bg-slate-900/80 rounded-xl p-2.5 sm:p-3 border border-slate-800">
                    <span className="text-xs sm:text-sm font-medium text-slate-300">추가 지원 혜택</span>
                    <span className="text-sm sm:text-base font-black text-red-400">+ 비밀지원금</span>
                  </div>
                </div>
              </div>

              {/* Minimal Trust Indicator */}
              <div className="flex items-center justify-between text-[11px] sm:text-xs text-slate-400 pt-1">
                <div className="flex items-center space-x-1">
                  <span className="text-emerald-400">●</span>
                  <span>100% 당일 가입승인</span>
                </div>
                <div className="flex items-center space-x-1">
                  <span className="text-yellow-400">★</span>
                  <span>평균 평점 4.9점</span>
                </div>
              </div>
            </motion.div>

            {/* Integrated YouTube Shorts Smartphone Mockup */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="relative w-full max-w-[280px] sm:max-w-[240px] lg:max-w-[280px] bg-slate-950 p-2 sm:p-2.5 rounded-[36px] shadow-2xl border border-white/10 ring-4 ring-white/5 shrink-0"
            >
              {/* Top Speaker Decorator */}
              <div className="absolute top-4 left-1/2 -translate-x-1/2 w-12 h-1 rounded-full bg-slate-800 z-10"></div>
              
              {/* Pulsing Live Badge */}
              <div className="absolute top-7 right-6 z-10 flex items-center space-x-1 px-1.5 py-0.5 rounded bg-red-600/90 text-[9px] font-bold text-white tracking-wider animate-pulse shadow">
                <span className="w-1 h-1 rounded-full bg-white"></span>
                <span>LIVE</span>
              </div>

              {/* Inner Smartphone Screen Container */}
              <div className="relative aspect-[9/16] w-full overflow-hidden rounded-[26px] bg-slate-900 shadow-inner">
                <iframe
                  id="hero-youtube-player-shorts"
                  className="absolute top-0 left-0 w-full h-full"
                  src="https://www.youtube.com/embed/-P4FnNkRJ6E?autoplay=1&mute=1&loop=1&playlist=-P4FnNkRJ6E&controls=1&rel=0"
                  title="드림텔레콤 유튜브 쇼츠"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                ></iframe>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
