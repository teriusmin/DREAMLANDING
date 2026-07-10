import React from 'react';
import { Wifi, Tv, Smartphone, Star, Zap, ShoppingCart, HelpCircle } from 'lucide-react';

interface ProductsProps {
  onSelectProduct: (productName: string) => void;
}

export default function Products({ onSelectProduct }: ProductsProps) {
  const ktProducts = [
    {
      speed: '100M',
      title: 'KT 슬림 인터넷',
      description: '웹서핑 및 간단한 동영상 시청에 적합한 경제적인 기본 요금제',
      price: '22,000원',
      tags: ['가성비 원천', 'AI WiFi 필수지원', 'TV 결합 추천']
    },
    {
      speed: '500M',
      title: 'KT 에센스 인터넷',
      description: '대용량 파일 다운로드, 끊김 없는 고화질 스트리밍 및 온라인 게이밍 추천',
      price: '33,000원',
      tags: ['가장 대중적', 'AI WiFi 무상 임대', '모바일 결합 시 초특가'],
      popular: true
    },
    {
      speed: '1G',
      title: 'KT 기가 프리미엄',
      description: '크리에이터, 주식 거래, 끊김 없는 라이브 스트리밍 전문 기가 인터넷',
      price: '38,500원',
      tags: ['최고 속도 보장', '가족 결합 극대화', '대용량 업로드 특화']
    }
  ];

  const handleProductSelect = (productName: string) => {
    onSelectProduct(productName);
    const target = document.getElementById('consultation-form-section');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section className="py-16 sm:py-24 bg-white" id="products-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-flex items-center px-3 py-1 rounded-full bg-slate-100 text-slate-800 text-xs font-bold tracking-wider mb-3">
            BEST SUBSCRIPTION PLANS
          </span>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900 font-display">
            통신사 맞춤 대표 상품 추천
          </h2>
          <p className="text-slate-500 text-sm sm:text-base mt-2">
            KT 및 KT스카이라이프의 베스트셀러 결합 상품을 합리적인 요금으로 만나보세요.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          
          {/* KT Products Column */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3 mb-6">
              <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-kt-red/10 border border-kt-red/20 text-kt-red font-black text-sm">
                KT
              </span>
              <div>
                <h3 className="text-xl font-bold text-slate-950 font-display">KT 올레 기가인터넷</h3>
                <p className="text-xs text-slate-500">대한민국 1등 커버리지 및 부동의 1위 가입자 점유율</p>
              </div>
            </div>

            <div className="space-y-4">
              {ktProducts.map((product, idx) => (
                <div 
                  key={idx}
                  className={`relative bg-slate-50 rounded-2xl p-6 border transition-all ${
                    product.popular 
                      ? 'border-kt-red shadow-md bg-white' 
                      : 'border-slate-200/60 hover:border-slate-300'
                  }`}
                  id={`kt-product-${idx}`}
                >
                  {product.popular && (
                    <span className="absolute -top-3 left-6 inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full bg-kt-red text-[10px] font-extrabold text-white uppercase tracking-wider">
                      <Star className="w-2.5 h-2.5 fill-current" />
                      <span>추천 상품</span>
                    </span>
                  )}

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <span className="text-xs font-bold text-kt-red bg-kt-red/10 px-2 py-0.5 rounded">
                          {product.speed}
                        </span>
                        <h4 className="text-lg font-bold text-slate-900 font-display">{product.title}</h4>
                      </div>
                      <p className="text-xs sm:text-sm text-slate-500 max-w-sm">{product.description}</p>
                      
                      {/* Tags */}
                      <div className="flex flex-wrap gap-1.5 pt-1.5">
                        {product.tags.map((tag, tIdx) => (
                          <span key={tIdx} className="inline-flex text-[10px] sm:text-xs font-medium text-slate-600 bg-slate-100 px-2 py-0.5 rounded-md">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="text-left sm:text-right flex flex-row sm:flex-col justify-between sm:justify-center items-center sm:items-end shrink-0 gap-4">
                      <div>
                        <div className="text-xs text-slate-400 font-medium">3년 약정 기준(VAT 포함)</div>
                        <div className="text-xl font-black text-slate-900 font-display">{product.price}</div>
                      </div>
                      <button
                        onClick={() => handleProductSelect(`KT 인터넷 (${product.speed} ${product.title})`)}
                        className={`px-5 py-2 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
                          product.popular
                            ? 'bg-kt-red text-white hover:bg-red-600'
                            : 'bg-slate-900 text-white hover:bg-slate-800'
                        }`}
                        id={`btn-kt-product-cta-${idx}`}
                      >
                        상담받기
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* KT Skylife Column */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3 mb-6">
              <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-sky-500/10 border border-sky-500/20 text-sky-500 font-black text-sm">
                SKY
              </span>
              <div>
                <h3 className="text-xl font-bold text-slate-950 font-display">KT스카이라이프 가성비 인터넷</h3>
                <p className="text-xs text-slate-500">KT망 그대로 속도는 똑같이, 요금은 파격적으로 알뜰하게</p>
              </div>
            </div>

            {/* Skylife Big Promo Card */}
            <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-8 text-white relative overflow-hidden shadow-xl border border-slate-700/30 flex flex-col justify-between h-full min-h-[460px]">
              <div className="absolute -top-16 -right-16 w-48 h-48 bg-sky-400/20 rounded-full blur-2xl"></div>
              
              <div className="space-y-5 relative">
                <span className="text-xs font-black tracking-widest text-sky-400 uppercase">SUPER COST-EFFECTIVE</span>
                <h4 className="text-2xl sm:text-3xl font-black font-display leading-tight">
                  KT망 100% 그대로<br />요금만 최대 30% 다이어트
                </h4>
                
                <ul className="space-y-3.5 pt-2">
                  <li className="flex items-start space-x-2.5">
                    <span className="w-5 h-5 rounded-full bg-sky-500/20 text-sky-300 flex items-center justify-center text-xs font-extrabold shrink-0 mt-0.5">✓</span>
                    <span className="text-sm font-medium text-slate-200">KT 기가 인프라 100% 공동 활용으로 끊김 없는 고품질 제공</span>
                  </li>
                  <li className="flex items-start space-x-2.5">
                    <span className="w-5 h-5 rounded-full bg-sky-500/20 text-sky-300 flex items-center justify-center text-xs font-extrabold shrink-0 mt-0.5">✓</span>
                    <span className="text-sm font-medium text-slate-200">불필요한 거품을 제거하여 월 1만원대의 초합리적인 기본 요금</span>
                  </li>
                  <li className="flex items-start space-x-2.5">
                    <span className="w-5 h-5 rounded-full bg-sky-500/20 text-sky-300 flex items-center justify-center text-xs font-extrabold shrink-0 mt-0.5">✓</span>
                    <span className="text-sm font-medium text-slate-200">인터넷 + TV 결합 시 스카이라이프 단독 현금 및 가은품 추가 매칭</span>
                  </li>
                </ul>
              </div>

              {/* Skylife Action Details */}
              <div className="mt-8 pt-6 border-t border-slate-800 relative">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <div className="text-xs text-slate-400 font-semibold mb-1">인터넷 + TV 결합 초특가 요금</div>
                    <div className="text-2xl sm:text-3xl font-black text-white font-display tracking-tight">
                      월 <span className="text-sky-300 font-black">25,300원</span>~
                    </div>
                  </div>
                  <button
                    onClick={() => handleProductSelect('KT 스카이라이프 (인터넷+TV 결합)')}
                    className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-sky-400 hover:bg-sky-500 active:bg-sky-600 text-slate-950 font-black text-sm tracking-wide transition-all shadow-lg hover:shadow-sky-400/20 cursor-pointer shrink-0 text-center"
                    id="btn-skylife-main-cta"
                  >
                    무료상담 신청하기
                  </button>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
