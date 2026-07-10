import React from 'react';
import { Play, Sparkles, VolumeX, Flame } from 'lucide-react';

export default function YoutubeSection() {
  return (
    <section className="py-16 sm:py-24 bg-gradient-to-b from-white to-slate-50 border-y border-slate-100" id="youtube-section">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-50 text-red-600 text-xs font-bold tracking-wider mb-3">
            <Flame className="w-3.5 h-3.5 text-red-500 animate-pulse" />
            <span>드림텔레콤 공식 유튜브 쇼츠</span>
          </span>
          <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-slate-900 font-display">
            📺 드림텔레콤 실제 담당자 인터뷰 쇼츠 영상
          </h2>
          <p className="text-slate-500 text-sm sm:text-base mt-2">
            실제 가입을 진행하는 담당자의 생생한 목소리로 가입 혜택과 신뢰할 수 있는 가이드를 확인해보세요!
          </p>
        </div>

        {/* Centered Smartphone-styled Shorts Frame */}
        <div className="relative mx-auto max-w-[340px] bg-slate-950 p-3 sm:p-4 rounded-[40px] shadow-2xl border border-slate-200/60 ring-8 ring-slate-900/5">
          {/* Speaker / Ear Piece Decorator */}
          <div className="absolute top-5 left-1/2 -translate-x-1/2 w-16 h-1.5 rounded-full bg-slate-800 z-10"></div>
          
          {/* Inner Screen */}
          <div className="relative aspect-[9/16] w-full overflow-hidden rounded-[28px] bg-slate-900 shadow-inner">
            <iframe
              id="youtube-player-shorts"
              className="absolute top-0 left-0 w-full h-full"
              src="https://www.youtube.com/embed/-P4FnNkRJ6E?autoplay=1&mute=1&loop=1&playlist=-P4FnNkRJ6E&controls=1&rel=0"
              title="드림텔레콤 유튜브 쇼츠"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
          </div>
        </div>

        {/* Informative Floating Notes beneath the video */}
        <div className="mt-8 sm:mt-12 flex flex-col sm:flex-row items-center justify-between gap-4 px-5 py-4 bg-white border border-slate-200/60 rounded-2xl shadow-sm text-center sm:text-left">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-orange-50 rounded-xl text-orange-600 shrink-0">
              <VolumeX className="w-4 h-4 animate-bounce" />
            </div>
            <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
              브라우저 보안 규정상 최초 재생 시 무음(Mute) 상태로 시작됩니다. 영상 내부의 소리(스피커) 버튼을 눌러 소리를 켜주세요!
            </p>
          </div>
          <a
            href="#consultation-form-section"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('consultation-form-section')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-slate-900 text-white text-xs font-bold rounded-xl hover:bg-slate-800 transition-all shrink-0 shadow-sm"
          >
            <Play className="w-3 h-3 fill-current" />
            <span>쇼츠 시청 후 10초 견적 받기</span>
          </a>
        </div>

      </div>
    </section>
  );
}

