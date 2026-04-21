'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import MagneticElement from '../MagneticElement';

const INDUSTRIES = [
  { name: 'College Events & Fests', copy: 'Fueling campus mania with crash-proof ticketing systems.', img: '/images/ind_college_events.webp', size: 'large' },
  { name: 'Startups & Founders', copy: 'Rapid deployment for hyper-growth companies.', img: '/images/ind_startups.webp', size: 'small' },
  { name: 'Local Business Owners', copy: 'Turning foot traffic into loyal digital cohorts.', img: '/images/ind_local_business.webp', size: 'small' },
  { name: 'Retail & E-commerce', copy: 'Automated conversion engines over WhatsApp.', img: '/images/ind_retail_ecommerce.webp', size: 'medium' },
  { name: 'Sports & Fitness', copy: 'Streamlining member lifecycle and class bookings.', img: '/images/ind_sports.webp', size: 'medium' },
  { name: 'Restaurants & Hospitality', copy: 'Table management, direct delivery, zero commission platforms.', img: '/images/ind_restaurants.webp', size: 'small' },
  { name: 'Entertainment & Music', copy: 'Selling out stadiums before the soundcheck.', img: '/images/ind_entertainment.webp', size: 'small' },
  { name: 'Non-profits & Communities', copy: 'Uniting missions with secure scalable infrastructure.', img: '/images/ind_nonprofits.webp', size: 'large' },
];

export default function IndustriesWeServe() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.industry-card',
        { y: 100, opacity: 0, scale: 0.95 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1,
          stagger: 0.1,
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

  // Map sizes to Tailwind columns
  const getSizeClasses = (size: string) => {
    switch(size) {
      case 'large': return 'col-span-1 md:col-span-8 md:row-span-2 h-[250px] md:h-[450px]'; // 8 units wide
      case 'medium': return 'col-span-1 md:col-span-6 h-[250px] md:h-[400px]'; // 6 units wide
      case 'small': return 'col-span-1 md:col-span-4 h-[250px] md:h-[350px]'; // 4 units wide
      default: return 'col-span-1 md:col-span-4 h-[250px] md:h-[350px]';
    }
  };

  return (
    <section ref={containerRef} className="py-40 bg-zinc-950 text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(0,85,255,0.15)_0%,transparent_50%)] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-8 relative z-10">
        <h2 className="text-5xl md:text-7xl font-display font-medium mb-4 text-center">Architecting across <span className="text-accent italic font-bold">industries.</span></h2>
        <p className="text-xl text-zinc-400 mb-20 text-center max-w-3xl mx-auto">
          We don't just build software. We forge dominating technological infrastructure for businesses that refuse to lose.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6 auto-rows-auto">
          {INDUSTRIES.map((ind, idx) => (
            <MagneticElement key={idx} intensity={0.05} className={`${getSizeClasses(ind.size)} w-full industry-card`}>
              <div className={`w-full h-full rounded-3xl overflow-hidden relative group cursor-pointer border border-white/10 hover:border-accent transition-colors duration-500`}>
                <div className="absolute inset-0 bg-blue-500/10 opacity-0 md:group-hover:opacity-100 transition-opacity duration-500 mix-blend-overlay z-10" />
                <img src={ind.img} alt={ind.name} className="absolute inset-0 w-full h-full object-cover md:group-hover:scale-105 transition-transform duration-700 ease-out" />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/90 via-zinc-950/40 to-transparent z-10" />
                
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 z-20 md:translate-y-4 md:group-hover:translate-y-0 transition-transform duration-500">
                  <h3 className="text-xl md:text-3xl font-display font-bold text-white mb-2 md:group-hover:text-accent transition-colors duration-300">{ind.name}</h3>
                  <p className="text-zinc-300 text-sm md:text-base transform md:opacity-0 md:group-hover:opacity-100 transition-all duration-500 delay-100">{ind.copy}</p>
                </div>
              </div>
            </MagneticElement>
          ))}
        </div>
      </div>
    </section>
  );
}
