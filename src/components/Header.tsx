import React from 'react';
import { Smartphone } from 'lucide-react';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-sm" id="header-main">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-3 h-14 sm:h-20">
          {/* Logo Brand */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            <span className="text-lg sm:text-2xl font-black tracking-tight font-display flex items-center select-none shrink-0">
              <span className="text-slate-950 mr-1 font-bold text-xs sm:text-lg">(주)</span>
              <span className="bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500 bg-clip-text text-transparent font-black drop-shadow-[0_1px_1px_rgba(0,0,0,0.01)]">
                드림텔레콤
              </span>
            </span>
            
            {/* Badges - Hidden on very small screens, visible on sm: */}
            <div className="hidden xs:flex items-center space-x-1 sm:space-x-1.5 shrink-0">
              <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] sm:text-xs font-bold bg-kt-red/10 text-kt-red whitespace-nowrap">
                KT 공식
              </span>
              <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] sm:text-xs font-bold bg-sky-50 text-sky-600 border border-sky-100 whitespace-nowrap">
                Skylife 전문
              </span>
            </div>
          </div>

          {/* Quick Info - Unified Single Row */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            {/* Emergency Number - Hidden on small mobile, shown on sm: */}
            <a
              href="tel:010-2924-8009"
              className="hidden sm:flex items-center space-x-1.5 text-slate-600 hover:text-kt-red transition-colors text-xs font-bold shrink-0"
              id="header-emergency-link"
            >
              <span className="bg-red-50 text-red-500 border border-red-200/50 rounded px-1.5 py-0.5 text-[10px] font-black tracking-tight shrink-0">긴급설치</span>
              <span className="text-slate-800 font-extrabold">010-2924-8009</span>
            </a>

            {/* Main Phone Link */}
            <a
              href="tel:1551-7897"
              className="flex items-center space-x-1.5 bg-kt-red/10 hover:bg-kt-red/20 text-kt-red px-2.5 py-1 rounded-full font-black sm:font-extrabold transition-all text-[11px] sm:text-xs shrink-0"
              id="header-phone-link"
            >
              <Smartphone className="w-3.5 h-3.5 shrink-0 animate-bounce" />
              <span>상담 1551-7897</span>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}

