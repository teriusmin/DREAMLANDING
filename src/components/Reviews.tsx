import React from 'react';
import { Star, MessageSquare, Quote } from 'lucide-react';

export default function Reviews() {
  const reviews = [
    {
      stars: 5,
      content: '상담도 진짜 친절하게 조목조목 알려주시고, 타사 해지 시점까지 완벽하게 맞춰 추천해 주셨어요! 약속대로 설치 당일 저녁에 사은품 현금 바로 입금 받았습니다.',
      author: '김○태 (서울)'
    },
    {
      stars: 5,
      content: '기존에 타 통신사 쓰고 만료되어 결합할인 찾던 중 드림텔레콤에서 요금 추천해줘서 결합으로 묶었어요. 확실히 비밀지원금까지 얹어주셔서 혜택이 제일 컸네요.',
      author: '박○희 (부산)'
    },
    {
      stars: 5,
      content: '인터넷이랑 TV 같이 결합 설치했는데 접수하고 바로 다음날 오전에 기사님 오셔서 완벽히 세팅 완료해 주셨습니다. 상담부터 개통까지 친절하고 믿음이 가요.',
      author: '이○준 (경기)'
    }
  ];

  return (
    <section className="py-16 sm:py-24 bg-white" id="reviews-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <span className="inline-flex items-center px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-bold tracking-wider mb-3">
            CUSTOMER STORIES
          </span>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900 font-display">
            실시간 고객 가입 생생 후기
          </h2>
          <p className="text-slate-500 text-sm sm:text-base mt-2">
            직접 드림텔레콤에서 인터넷을 설계하고 가입하신 소중한 고객들의 실제 목소리입니다.
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((rev, idx) => (
            <div 
              key={idx}
              className="bg-slate-50 border border-slate-200/60 rounded-3xl p-6 sm:p-8 flex flex-col justify-between relative hover:shadow-xl hover:bg-white hover:border-slate-300 transition-all duration-300"
              id={`review-card-${idx}`}
            >
              <Quote className="absolute top-6 right-6 w-10 h-10 text-slate-200/80 shrink-0 pointer-events-none" />

              <div className="space-y-4">
                {/* Stars */}
                <div className="flex items-center space-x-1">
                  {[...Array(rev.stars)].map((_, sIdx) => (
                    <Star key={sIdx} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>

                {/* Content */}
                <p className="text-sm sm:text-base text-slate-600 font-medium leading-relaxed italic">
                  "{rev.content}"
                </p>
              </div>

              {/* Author */}
              <div className="flex items-center space-x-3 pt-6 mt-6 border-t border-slate-200/50">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-900 text-slate-200 text-xs font-bold">
                  {rev.author[0]}
                </div>
                <div>
                  <span className="text-xs sm:text-sm font-bold text-slate-900">{rev.author}</span>
                  <span className="block text-[10px] text-slate-400 font-semibold">실제 가입인증 고객</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
