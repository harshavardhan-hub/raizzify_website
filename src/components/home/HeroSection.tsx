'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import Image from 'next/image';
import MagneticElement from '../MagneticElement';

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      // Animate the image in
      tl.fromTo(
        imageRef.current,
        { opacity: 0, scale: 1.05, filter: 'blur(10px)' },
        { opacity: 1, scale: 1, filter: 'blur(0px)', duration: 1.5, ease: 'power3.out' }
      );

      // Animate the words manually
      tl.fromTo(
        '.hero-line',
        { y: 120, opacity: 0, rotateZ: 2, scale: 0.95 },
        {
          y: 0,
          opacity: 1,
          rotateZ: 0,
          scale: 1,
          duration: 1.2,
          stagger: 0.1,
          ease: 'power4.out',
        },
        "-=1.0"
      )
      .fromTo(
        subRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out' },
        "-=0.9"
      )
      .fromTo(
        ctaRef.current?.children || [],
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: 'power3.out' },
        "-=0.7"
      );

      // Hero Parallax on Scroll
      gsap.to(titleRef.current, {
        y: 100,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        }
      });
      
      gsap.to(imageRef.current, {
        y: 150,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        }
      });
      
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative min-h-[100vh] w-full flex items-center pt-24 pb-20 overflow-hidden bg-white">
      
      {/* Background Image Setup (Bright & Normal) */}
      <div ref={imageRef} className="absolute inset-0 z-0 origin-center will-change-transform">
        <Image 
          src="/images/bg-hero.webp" 
          alt="Raizzify Premium Background" 
          fill
          priority
          sizes="100vw"
          className="object-cover sm:object-right object-center" 
        />
        {/* Extremely subtle protective gradient solely to ensure text legibility, without creating a 'white shade' */}
        <div className="absolute inset-0 bg-gradient-to-r from-white/40 to-transparent z-10" />
      </div>
      
      {/* Container - constrained and pushed more to the left visually */}
      <div className="max-w-[1440px] mx-auto w-full flex flex-col items-start justify-center relative z-20 px-6 sm:px-10 lg:px-16">
        <div className="flex flex-col items-start w-full relative pt-10 md:pt-0">
          
          <h1 ref={titleRef} className="text-4xl sm:text-5xl md:text-6xl lg:text-[5.5rem] font-bold leading-[1.1] md:leading-[1.05] tracking-tight text-black mb-6 break-words w-full">
            <div className="overflow-hidden p-1 -ml-1"><div className="hero-line">Engineering</div></div>
            <div className="overflow-hidden p-1 -ml-1 flex items-center gap-4">
              <div className="hero-line">Market</div>
            </div>
            <div className="overflow-hidden p-1 -ml-1"><div className="hero-line opacity-90">Dominance.</div></div>
          </h1>
          
          <p ref={subRef} className="text-base sm:text-lg md:text-xl text-gray-600 max-w-xl mb-10 leading-relaxed font-body">
            Equip your business with AI-driven conversational commerce, flawless event ticketing, and elite product architecture built by top IIT & ISB minds.
          </p>
          
          {/* Re-organized CTA, strictly using absolute colors to prevent text disappearing */}
          <div ref={ctaRef} className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto pt-2 relative z-30">
            <MagneticElement intensity={0.3} className="w-full sm:w-auto">
              <button className="w-full sm:w-auto bg-[#0A0A0A] !text-white px-8 py-3.5 sm:py-4 rounded-full font-semibold hover:bg-black transition-all duration-300 shadow-md text-sm sm:text-base tracking-wide">
                Start Building
              </button>
            </MagneticElement>
            
            <MagneticElement intensity={0.2} className="w-full sm:w-auto">
              <button className="w-full sm:w-auto bg-white border-2 border-gray-200 !text-black px-8 py-3.5 sm:py-4 rounded-full font-semibold hover:border-black transition-all duration-300 shadow-sm text-sm sm:text-base tracking-wide">
                View Solutions
              </button>
            </MagneticElement>

            <MagneticElement intensity={0.2} className="w-full sm:w-auto sm:ml-2">
              <button className="w-full sm:w-auto bg-transparent border-b-2 border-transparent hover:border-black !text-black px-4 py-3 font-semibold transition-colors duration-300 text-xs uppercase tracking-widest">
                Contact Strategy
              </button>
            </MagneticElement>
          </div>

        </div>
      </div>
    </section>
  );
}
