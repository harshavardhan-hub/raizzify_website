'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import gsap from 'gsap';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowUpRight } from 'lucide-react';

const PATHWAYS = [
  {
    id: 'business',
    number: '01',
    question: 'Are you a Business Owner?',
    buttonLabel: 'Scale Now',
    href: '/business-connect',
    theme: 'dark', // bg-black text-white
  },
  {
    id: 'events',
    number: '02',
    question: 'Are you looking for an Event Ticketing Platform?',
    buttonLabel: 'Launch Event',
    href: '/events',
    theme: 'accent', // bg-accent text-white
  },
  {
    id: 'build',
    number: '03',
    question: 'Do you want to Build a Tech Product?',
    buttonLabel: 'Start Building',
    href: '/build',
    theme: 'light', // bg-base text-text border
  }
];

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const panelsRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      // Entrance animation for header
      tl.fromTo(
        '.hero-title-word',
        { y: 100, opacity: 0, rotateZ: 3 },
        { y: 0, opacity: 1, rotateZ: 0, duration: 1.2, stagger: 0.1, ease: 'power4.out' }
      )
      .fromTo(
        '.hero-sub',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out' },
        "-=0.8"
      )
      // Entrance animation for panels
      .fromTo(
        '.hero-panel',
        { y: 100, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, stagger: 0.15, ease: 'power4.out' },
        "-=0.9"
      );

    }, containerRef);

    return () => ctx.revert();
  }, []);

  const getThemeClasses = (theme: string, isHovered: boolean) => {
    switch (theme) {
      case 'dark':
        return `bg-[#0A0A0A] text-white ${isHovered ? 'shadow-[0_0_40px_rgba(0,0,0,0.3)]' : ''}`;
      case 'accent':
        return `bg-[#0055FF] text-white ${isHovered ? 'shadow-[0_0_40px_rgba(0,85,255,0.4)]' : ''}`;
      case 'light':
        return `bg-[#FAFAFA] text-[#111827] border border-gray-200 ${isHovered ? 'shadow-[0_0_40px_rgba(0,0,0,0.08)] border-gray-300' : ''}`;
      default:
        return 'bg-white text-black';
    }
  };

  const getButtonClasses = (theme: string) => {
    switch (theme) {
      case 'dark':
        return 'bg-white text-black hover:bg-gray-100';
      case 'accent':
        return 'bg-white text-[#0055FF] hover:bg-gray-100';
      case 'light':
        return 'bg-[#111827] text-white hover:bg-black';
      default:
        return 'bg-black text-white';
    }
  };

  return (
    <section ref={containerRef} className="relative min-h-[100dvh] w-full flex flex-col pt-28 pb-8 lg:pb-12 overflow-hidden bg-white px-4 sm:px-6 lg:px-8">
      
      {/* Top Header Area */}
      <div ref={headerRef} className="flex flex-col items-center justify-center text-center w-full max-w-7xl xl:max-w-[90rem] mx-auto z-20 mb-10 lg:mb-16 shrink-0 pt-4">
        <h1 className="text-4xl sm:text-5xl md:text-5xl lg:text-6xl xl:text-[4rem] font-bold leading-[1.1] tracking-tight text-black mb-6 w-full flex flex-wrap justify-center gap-x-3 sm:gap-x-4 overflow-hidden">
          <span className="overflow-hidden pb-2"><div className="hero-title-word">Raizzify</div></span>
          <span className="overflow-hidden pb-2"><div className="hero-title-word">team</div></span>
          <span className="overflow-hidden pb-2"><div className="hero-title-word">of</div></span>
          <span className="overflow-hidden pb-2"><div className="hero-title-word text-gray-400">IITians</div></span>
          <span className="overflow-hidden pb-2"><div className="hero-title-word text-gray-400">&amp;</div></span>
          <span className="overflow-hidden pb-2"><div className="hero-title-word text-gray-400">ISBians.</div></span>
          <span className="w-full hidden md:block" />
          <span className="overflow-hidden pb-2"><div className="hero-title-word">Architecting</div></span>
          <span className="overflow-hidden pb-2"><div className="hero-title-word">your</div></span>
          <span className="overflow-hidden pb-2"><div className="hero-title-word">digital</div></span>
          <span className="overflow-hidden pb-2"><div className="hero-title-word text-[#0055FF]">empire.</div></span>
        </h1>
        <p className="hero-sub text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl leading-relaxed font-body">
          Tell us what you want to achieve, and we'll handle the heavy lifting.
        </p>
      </div>

      {/* Panels Area */}
      <div 
        ref={panelsRef}
        className="w-full max-w-[1440px] mx-auto flex-1 flex flex-col lg:flex-row gap-4 lg:gap-4 z-20"
        onMouseLeave={() => setHoveredIndex(null)}
      >
        {PATHWAYS.map((path, index) => {
          const isHovered = hoveredIndex === index;
          const isAnotherHovered = hoveredIndex !== null && hoveredIndex !== index;
          
          return (
            <motion.div
              key={path.id}
              className={`hero-panel relative flex flex-col justify-between rounded-3xl p-6 sm:p-8 md:p-10 transition-all duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)] overflow-hidden cursor-pointer group ${getThemeClasses(path.theme, isHovered)}`}
              onClick={() => router.push(path.href)}
              onMouseEnter={() => setHoveredIndex(index)}
              style={{
                flex: typeof window !== 'undefined' && window.innerWidth >= 1024
                  ? isHovered ? 2.5 : isAnotherHovered ? 0.8 : 1
                  : 1, // On mobile/tablet, flex is simply 1 (handled by h-auto or h-full)
              }}
              // Fallback classes for smaller screens
              // Mobile: h-[220px] fixed height to fit all 3 nicely or min-h-[200px]
              // Tablet: h-[250px]
              // Desktop: min-h-[400px] flex-grow handles width
              initial={false}
            >
              {/* Background accent shapes (Optional, simple gradient wash) */}
              <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none bg-gradient-to-br ${
                path.theme === 'dark' ? 'from-white/5 to-transparent' :
                path.theme === 'accent' ? 'from-white/10 to-transparent' :
                'from-black/5 to-transparent'
              }`} />

              {/* Number Top Left */}
              <div className="flex justify-between items-start w-full relative z-10">
                <span className={`text-4xl md:text-5xl font-display font-bold tracking-tighter opacity-80 transition-transform duration-500 group-hover:scale-105 group-hover:-translate-y-1 ${
                  path.theme === 'light' ? 'text-gray-300' : 'text-white/30'
                }`}>
                  {path.number}
                </span>
                
                {/* Mobile/Tablet arrow indicator */}
                <div className={`lg:hidden p-3 rounded-full ${getButtonClasses(path.theme)}`}>
                  <ArrowRight size={18} strokeWidth={2.5} />
                </div>
              </div>

              {/* Bottom Content */}
              <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 relative z-10 mt-auto pt-8">
                <h2 className={`text-2xl sm:text-3xl md:text-4xl font-semibold leading-tight font-display transition-all duration-500 w-full ${isHovered ? 'lg:w-[70%]' : 'lg:w-full'}`}>
                  {path.question}
                </h2>
                
                {/* Desktop Action Button (Reveals or shifts on hover) */}
                <div className={`hidden lg:flex items-center shrink-0 transition-all duration-500 ease-out ${
                  isHovered ? 'opacity-100 translate-y-0 translate-x-0' : 'opacity-0 translate-y-4 lg:translate-y-0 lg:translate-x-4 lg:opacity-0'
                }`}>
                  <div className={`flex items-center gap-2 px-6 py-4 rounded-full font-semibold text-sm uppercase tracking-wide transition-transform duration-300 hover:scale-105 ${getButtonClasses(path.theme)}`}>
                    {path.buttonLabel}
                    <ArrowUpRight size={18} strokeWidth={2.5} />
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

