'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import MagneticElement from '../MagneticElement';

export default function WhyRaizzify() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.bento-item',
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 75%",
          }
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="py-32 bg-[#F2F5FF] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-8 relative z-10">
        <h2 className="text-4xl md:text-6xl font-display font-bold text-text mb-4">Why Raizzify.</h2>
        <p className="text-xl text-muted mb-16 max-w-2xl">The architecture is only as good as the minds that designed it. We refuse everything short of absolute excellence.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[minmax(250px,auto)]">
          
          <div className="bento-item col-span-1 md:col-span-2 row-span-2 bg-[#FFFFFF] p-10 rounded-3xl border border-gray-100 flex flex-col justify-between group hover:border-[#0055FF] hover:shadow-xl transition-all duration-500 overflow-hidden relative">
            <div className="absolute -right-20 -bottom-20 w-96 h-96 bg-[#0055FF]/[0.03] rounded-full blur-3xl pointer-events-none group-hover:bg-[#0055FF]/[0.05] transition-colors duration-500"/>
            <div>
              <div className="text-xs font-bold text-[#0055FF] uppercase tracking-widest mb-6">The Talent</div>
              <h3 className="text-4xl font-display font-bold text-text mb-6 leading-tight">Engineered by <br /> IITians & ISBians.</h3>
              <p className="text-muted leading-relaxed max-w-md text-lg">You are not outsourcing to a generic agency. You are arming yourself with an elite strike team trained at India's most ruthless academic institutions. We architect scale.</p>
            </div>
          </div>
          
          <div className="bento-item col-span-1 border border-blue-50 bg-[#F8FAFF] p-10 rounded-3xl flex flex-col justify-end group hover:border-[#0055FF] hover:shadow-xl transition-all duration-500 relative overflow-hidden">
            <div className="absolute top-8 right-8 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm">
              <svg className="w-5 h-5 text-[#0055FF]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
              </svg>
            </div>
            <h3 className="text-2xl font-display font-bold text-text mb-3">Fort Knox Security</h3>
            <p className="text-muted text-sm leading-relaxed">Military-grade encryption and unbreachable payment gateways.</p>
          </div>
          
          <div className="bento-item col-span-1 border border-gray-100 bg-[#FFFFFF] p-10 rounded-3xl flex flex-col justify-end group hover:border-[#0055FF] hover:shadow-xl transition-all duration-500">
            <h3 className="text-2xl font-display font-bold text-text mb-3">End-to-End Control</h3>
            <p className="text-muted text-sm leading-relaxed">From WhatsApp funnels to native apps. All managed in one unified operational spine.</p>
          </div>
          
          <div className="bento-item col-span-1 md:col-span-3 bg-[#0055FF] p-10 md:p-14 rounded-3xl flex flex-col md:flex-row items-center justify-between group overflow-hidden relative">
            <div className="absolute right-0 top-0 bottom-0 w-1/2 bg-gradient-to-l from-white/10 to-transparent pointer-events-none"/>
            <div className="absolute w-64 h-64 bg-white/10 rounded-full blur-3xl -top-10 -left-10 pointer-events-none" />
            
            <div className="relative z-10 mb-8 md:mb-0">
              <h3 className="text-3xl md:text-5xl font-display font-bold text-white mb-3">Forged in India.</h3>
              <p className="text-blue-100 text-xl font-medium">Built to dominate globally.</p>
            </div>
            
            <MagneticElement intensity={0.2} className="relative z-10 w-full md:w-auto">
              <button className="w-full bg-white text-text px-10 py-5 rounded-full font-bold text-base hover:bg-gray-50 transition-colors duration-300 shadow-xl">
                Experience The Platform
              </button>
            </MagneticElement>
          </div>
        </div>
      </div>
    </section>
  );
}
