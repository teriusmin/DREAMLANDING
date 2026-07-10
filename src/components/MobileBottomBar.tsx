import React from 'react';
import { Phone, FileText } from 'lucide-react';

export default function MobileBottomBar() {
  const scrollToForm = (e: React.MouseEvent) => {
    e.preventDefault();
    const target = document.getElementById('consultation-form-section');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-t border-slate-100 shadow-[0_-8px_30px_rgba(0,0,0,0.08)] px-4 py-3 flex items-center gap-3">
      {/* Phone Call Button */}
      <a
        href="tel:010-2924-8009"
        className="flex-1 flex items-center justify-center space-x-2 bg-slate-950 active:bg-slate-900 text-white font-extrabold text-xs sm:text-sm py-3.5 rounded-xl border border-slate-800 transition-colors cursor-pointer text-center"
        id="mobile-bottom-call-btn"
      >
        <Phone className="w-4 h-4 text-kt-red shrink-0 fill-current" />
        <span>전화 바로상담</span>
      </a>

      {/* Consultation Form Jump Button */}
      <button
        onClick={scrollToForm}
        className="flex-1 flex items-center justify-center space-x-2 bg-cta-orange active:bg-orange-600 text-white font-black text-xs sm:text-sm py-3.5 rounded-xl shadow-lg shadow-orange-500/20 transition-all cursor-pointer"
        id="mobile-bottom-form-btn"
      >
        <FileText className="w-4 h-4 shrink-0" />
        <span>10초 견적신청</span>
      </button>
    </div>
  );
}
