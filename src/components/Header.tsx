import React from 'react';
import { Smartphone } from 'lucide-react';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-100 shadow-sm" id="header-main">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-3.5 sm:py-0 h-auto sm:h-20">
          {/* Logo Brand */}
          <div className="flex flex-col sm:flex-row sm:items-center space-y-1.5 sm:space-y-0 sm:space-x-3">
            <div className="flex items-center space-x-1.5 sm:space-x-2">
              <span className="text-xl sm:text-2xl font-black tracking-tight font-display flex items-center select-none">
                <span className="text-slate-900 mr-1.5 font-bold">(주)</span>
                <span className="bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500 bg-clip-text text-transparent font-extrabold drop-shadow-[0_1px_1px_rgba(0,0,0,0.02)]">
                  드림텔레콤
                </span>
              </span>
            </div>
            <div className="flex items-center space-x-1.5">
              <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-bold bg-kt-red/10 text-kt-red">
                KT 공식 가입센터
              </span>
              <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-bold bg-sky-50 text-sky-600 border border-sky-100">
                KT Skylife 전문
              </span>
            </div>
          </div>

          {/* Quick Info */}
          <div className="flex flex-col items-end justify-center space-y-1 text-right">
            <a
              href="tel:1551-7897"
              className="flex items-center space-x-1.5 text-slate-800 font-extrabold hover:text-kt-red transition-colors text-xs sm:text-sm"
              id="header-phone-link"
            >
              <Smartphone className="w-3.5 h-3.5 text-kt-red shrink-0" />
              <span>전화상담 1551-7897</span>
            </a>
            <a
              href="tel:010-2924-8009"
              className="flex items-center space-x-1.5 text-slate-600 hover:text-kt-red transition-colors text-[10px] sm:text-xs font-bold"
              id="header-emergency-link"
            >
              <span className="bg-red-50 text-red-500 border border-red-200/50 rounded px-1.5 py-0.5 text-[9px] sm:text-[10px] font-black tracking-tight shrink-0">긴급설치 지원</span>
              <span className="text-slate-800 font-extrabold">010-2924-8009</span>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}

