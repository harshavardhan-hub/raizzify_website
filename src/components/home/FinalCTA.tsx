'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import MagneticElement from '../MagneticElement';
import { useModal } from '../ModalContext';

export default function FinalCTA() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { openModal } = useModal();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.cta-element',
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
    <section ref={containerRef} id="contact" className="py-40 bg-[#F4F7FF] border-t border-blue-50 flex flex-col items-center justify-center relative overflow-hidden" data-aos="fade-in">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,85,255,0.03)_0%,transparent_70%)] pointer-events-none" />
      
      <div className="max-w-5xl mx-auto px-8 text-center relative z-10">
        <h2 className="cta-element text-5xl md:text-7xl lg:text-8xl font-display font-black text-text tracking-tight mb-8 leading-[1.05]">
          Stop Competing. <br /> <span className="text-accent underline decoration-8 underline-offset-[16px]">Start Dominating.</span>
        </h2>
        
        <p className="cta-element text-xl md:text-2xl text-muted font-body max-w-4xl mx-auto mb-16 leading-relaxed">
          The infrastructure used by India's top 1% startups is now accessible to you. <br className="hidden md:block" /> Do not wait for your competitors to deploy first.
        </p>

        <div className="cta-element flex flex-col sm:flex-row items-center justify-center gap-6">
          <MagneticElement intensity={0.25}>
            <button onClick={openModal} className="w-full sm:w-auto bg-text text-white px-12 py-5 rounded-full font-bold text-lg hover:bg-accent transition-colors duration-300 shadow-xl shadow-accent/10 hover:shadow-accent/40 hover:-translate-y-1 transform">
              Deploy Your Infrastructure
            </button>
          </MagneticElement>
          
          <MagneticElement intensity={0.15}>
            <button onClick={openModal} className="w-full sm:w-auto flex items-center justify-center px-8 py-5 rounded-full font-bold text-lg text-text bg-base border border-gray-200 hover:border-accent hover:text-accent transition-all duration-300">
              <svg className="w-6 h-6 mr-3" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
              </svg>
              Chat on WhatsApp
            </button>
          </MagneticElement>
        </div>
      </div>
    </section>
  );
}
