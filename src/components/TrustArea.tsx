import React from 'react';
import { ShieldCheck, Award, Zap, HeartHandshake, PiggyBank } from 'lucide-react';

export default function TrustArea() {
  const points = [
    {
      icon: <ShieldCheck className="w-8 h-8 text-kt-red" />,
      title: 'KT 공식 상담',
      description: 'KT 본사 공식 협력 가입센터로서 투명하고 정확한 1:1 맞춤형 공식 상품 계약만을 중개합니다.'
    },
    {
      icon: <Award className="w-8 h-8 text-sky-500" />,
      title: 'KT스카이라이프 전문',
      description: '고객님의 통신 패턴에 맞는 가장 합리적이고 가성비 높은 KT스카이라이프 전용 셋톱 및 요금을 컨설팅해 드립니다.'
    },
    {
      icon: <Zap className="w-8 h-8 text-amber-500" />,
      title: '전국 당일 상담',
      description: '전국 어디든 상담 신청 즉시 전문 매니저가 당일 신속 배정되어 신속하게 맞춤 상담을 개시합니다.'
    },
    {
      icon: <HeartHandshake className="w-8 h-8 text-red-500" />,
      title: '친절한 전문 상담원',
      description: '전문 교육을 수료한 특화 카운셀러들이 결합 혜택, 가입 제휴 할인 혜택을 막힘없이 풀어드립니다.'
    },
    {
      icon: <PiggyBank className="w-8 h-8 text-emerald-500" />,
      title: '고객 맞춤 요금 추천',
      description: '쓸데없는 부가서비스 및 과충전된 기가 속도를 배제하고, 고객님 실생활 맞춤 최저 요금제를 매칭합니다.'
    }
  ];

  return (
    <section className="py-16 sm:py-24 bg-white" id="trust-area-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <h2 className="text-sm font-extrabold text-kt-red uppercase tracking-widest mb-3">TRUST & QUALITY</h2>
          <p className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900 font-display break-keep">
            왜 드림텔레콤에서 가입해야 할까요?
          </p>
          <div className="w-12 h-1 bg-kt-red mx-auto mt-4 rounded"></div>
        </div>

        {/* Five Points Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {points.map((point, idx) => (
            <div 
              key={idx} 
              className="group flex flex-col items-center text-center p-6 bg-slate-50 rounded-2xl border border-slate-100 transition-all hover:bg-white hover:shadow-xl hover:border-slate-200/80 hover:-translate-y-1 duration-300"
              id={`trust-point-${idx}`}
            >
              {/* Icon Container */}
              <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-white shadow-sm border border-slate-100 mb-5 group-hover:scale-110 group-hover:shadow-md transition-all duration-300">
                {point.icon}
              </div>

              {/* Text */}
              <h3 className="text-lg font-bold text-slate-900 mb-2.5 font-display">
                {point.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 font-medium leading-relaxed">
                {point.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
