import React from 'react';
import { Smartphone, Shield, ArrowUp, Award } from 'lucide-react';

export default function Footer() {
  const scrollToForm = () => {
    const target = document.getElementById('consultation-form-section');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 text-slate-400" id="footer-section">
      
      {/* Footer CTA Section */}
      <div className="border-b border-slate-900 bg-slate-900/40 py-16 text-center relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-80 h-80 bg-kt-red/10 rounded-full blur-3xl"></div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative space-y-6">
          <h3 className="text-lg xs:text-xl sm:text-3xl font-black text-white font-display break-keep">
            아직도 가입을 고민하고 계시나요?
          </h3>
          <div className="text-lg sm:text-xl font-bold text-slate-300">
            기본 <span className="text-yellow-300 font-extrabold text-xl sm:text-2xl">45만원</span> + <span className="text-red-400 font-black text-2xl sm:text-3.5xl animate-pulse">비밀지원금</span>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 font-semibold max-w-md mx-auto leading-relaxed">
            지금 부담없이 무료 상담 서비스만 신청하셔도 전문 플래너가 맞춤형 최저 견적 요금을 제안해 드립니다.
          </p>
          <div className="pt-3 space-y-2">
            <button
              onClick={scrollToForm}
              className="glow-btn px-8 py-4 rounded-xl bg-cta-orange text-white font-black text-base sm:text-lg transition-all flex items-center justify-center space-x-2 mx-auto cursor-pointer"
              id="footer-cta-btn"
            >
              <span>📞 무료 상담 신청하기</span>
            </button>
            <div className="flex items-center justify-center space-x-2 text-xs sm:text-sm font-bold text-slate-300 pt-1">
              <span className="bg-kt-red/20 text-red-400 px-2.5 py-0.5 rounded-lg text-[11px] sm:text-xs font-black border border-red-500/10">긴급 설치 지원</span>
              <a href="tel:010-2924-8009" className="text-white hover:text-kt-red transition-colors text-sm sm:text-base tracking-wide font-black">010-2924-8009</a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Contents */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-b border-slate-900 pb-8">
          <div>
            <div className="text-lg font-black text-white font-display flex items-center">
              <span className="text-kt-red mr-1 font-extrabold">(주)드림텔레콤</span>
            </div>
            <p className="text-xs text-slate-500 mt-1.5 font-medium">KT / KT스카이라이프 유무선 공식 가입점</p>
          </div>

          <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-xs font-bold text-slate-400">
            <a href="#header-main" onClick={scrollToTop} className="hover:text-white transition-colors">홈으로</a>
            <a href="#trust-area-section" className="hover:text-white transition-colors">왜 드림텔레콤인가</a>
            <a href="#products-section" className="hover:text-white transition-colors">추천 상품</a>
            <a href="#consultation-form-section" className="hover:text-white transition-colors">무료상담</a>
            <button 
              onClick={() => alert('개인정보처리방침에 의거하여, 고객님의 소중한 신청 정보는 상담 완료 즉시 폐기됩니다.')}
              className="hover:text-white transition-colors cursor-pointer text-left font-bold"
            >
              개인정보처리방침
            </button>
          </div>
        </div>

        {/* Company meta details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start text-xs font-medium text-slate-500 leading-relaxed">
          <div className="space-y-2">
          </div>

          <div className="space-y-4 md:text-right flex flex-col md:items-end justify-between h-full">
            <div className="flex items-center space-x-2 text-slate-400 text-xs font-bold">
              <Shield className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>보안인증 SSL 데이터 암호화 전송 적용 완료</span>
            </div>
            
            <div className="space-y-1">
              <div>Copyright © Dream Telecom. All Rights Reserved.</div>
              <div className="text-[10px] text-slate-600">
                본 웹사이트는 KT 및 KT스카이라이프 유선인터넷 공식 대리점 영업 센터 가입 페이지로, 허가되지 않은 무단 전재 및 재배포를 금지합니다.
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Floating Scroll to Top button */}
      <button
        onClick={scrollToTop}
        className="fixed bottom-24 md:bottom-6 right-6 z-40 bg-slate-900/80 hover:bg-slate-900 text-white p-3 rounded-full border border-slate-800 shadow-xl backdrop-blur-md hover:scale-105 transition-all cursor-pointer group"
        id="btn-scroll-top"
        title="맨 위로 이동"
      >
        <ArrowUp className="w-5 h-5 group-hover:-translate-y-0.5 transition-transform" />
      </button>

    </footer>
  );
}
