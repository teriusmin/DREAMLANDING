import React from 'react';
import { Gift, Home, Smartphone, Check, HelpCircle } from 'lucide-react';

export default function Benefits() {
  const scrollToForm = () => {
    const target = document.getElementById('consultation-form-section');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const targets = [
    {
      title: '신규 가입',
      icon: <Gift className="w-5 h-5 text-kt-red" />,
      desc: '처음 인터넷을 개설하거나 결합 할인 혜택을 극대화하고 싶으신 고객님'
    },
    {
      title: '이사 / 분가',
      icon: <Home className="w-5 h-5 text-amber-500" />,
      desc: '새로운 입주지에서 빠른 설치 등록과 요금 절감을 고민하시는 고객님'
    },
    {
      title: '통신사 변경',
      icon: <Smartphone className="w-5 h-5 text-sky-500" />,
      desc: '기존 통신사 만료 후 최대 보조금 혜택을 챙기며 번호 이동을 하실 분'
    },
    {
      title: '재약정 상담',
      icon: <HelpCircle className="w-5 h-5 text-emerald-500" />,
      desc: '타사 이동 대비 현재 약정을 유지하며 맞춤 해지 방어 혜택을 조율하고 싶으신 분'
    }
  ];

  return (
    <section className="py-16 sm:py-24 bg-slate-50" id="benefits-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <span className="inline-flex items-center px-3 py-1 rounded-full bg-kt-red/10 text-kt-red text-xs font-bold tracking-wider mb-3">
            GIFT & BENEFIT
          </span>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900 font-display">
            🎁 드림텔레콤 인터넷 가입 혜택
          </h2>
          <p className="text-slate-500 text-sm sm:text-base mt-2">
            설치 완료 후 즉시 지급되는 압도적인 혜택을 보장합니다.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Main Benefit Highlight Card */}
          <div className="lg:col-span-5 bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-8 text-white flex flex-col justify-between shadow-xl border border-slate-700/30">
            <div className="space-y-4">
              <span className="text-xs font-bold tracking-widest text-red-400 uppercase">MAXIMUM BENEFIT</span>
              <h3 className="text-2xl sm:text-3xl font-black font-display leading-snug">
                오직 드림텔레콤에서만<br />제공하는 특급 지원 혜택
              </h3>
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                정직하고 투명하게 법정 최고 한도 현금 혜택을 지급하고, 추가적인 비밀 수수료 리워드 혜택까지 한도 끝까지 얹어드립니다.
              </p>
            </div>

            {/* Giant Numbers */}
            <div className="my-8 space-y-3 bg-slate-950/50 rounded-2xl p-4 sm:p-5 border border-slate-700/20">
              <div className="flex flex-row justify-between items-center gap-2">
                <span className="text-xs sm:text-sm text-slate-400 font-medium whitespace-nowrap">최대 지원금</span>
                <span className="text-2xl sm:text-4xl font-black text-yellow-300 font-display tracking-tight whitespace-nowrap">
                  420,000원
                </span>
              </div>
              <div className="h-px bg-slate-800"></div>
              <div className="flex flex-row justify-between items-center gap-2">
                <span className="text-xs sm:text-sm text-slate-400 font-medium whitespace-nowrap">단독 비밀 혜택</span>
                <span className="text-lg sm:text-2xl font-black text-red-500 font-display animate-pulse whitespace-nowrap">
                  + 비밀지원금
                </span>
              </div>
            </div>

            <button 
              onClick={scrollToForm}
              className="w-full py-4 rounded-xl bg-kt-red hover:bg-red-600 active:bg-red-700 text-white font-black text-base tracking-wide transition-all shadow-lg hover:shadow-red-600/20 cursor-pointer"
              id="benefit-main-cta"
            >
              지금 혜택 문의하기
            </button>
          </div>

          {/* Recommends for list (Bento items) */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <h4 className="text-lg font-bold text-slate-900 font-display flex items-center">
                <span className="w-1.5 h-6 bg-kt-red rounded-full mr-2.5"></span>
                이런 분들에게 강력하게 추천합니다!
              </h4>
              <p className="text-slate-500 text-xs sm:text-sm">
                통신 요금도 아끼고 목돈 리워드까지 한 번에 받아갈 수 있는 최고의 찬스입니다.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {targets.map((item, idx) => (
                <div 
                  key={idx} 
                  className="bg-white p-5 rounded-2xl border border-slate-200/60 shadow-sm flex flex-col space-y-3 hover:border-slate-300 hover:shadow-md transition-all duration-300"
                  id={`benefit-target-${idx}`}
                >
                  <div className="flex items-center space-x-2.5">
                    <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-slate-50 border border-slate-100">
                      {item.icon}
                    </div>
                    <span className="text-base font-bold text-slate-900 font-display">{item.title}</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-500 font-medium leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* Micro bullet checkmarks */}
            <div className="bg-slate-100 border border-slate-200/40 rounded-2xl p-4.5 grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="flex items-center space-x-2 text-xs font-bold text-slate-700">
                <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>정직한 요금 컨설팅</span>
              </div>
              <div className="flex items-center space-x-2 text-xs font-bold text-slate-700">
                <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>당일 현금 사은품 약속</span>
              </div>
              <div className="flex items-center space-x-2 text-xs font-bold text-slate-700">
                <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>추가 가맹 결합 제휴할인</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
