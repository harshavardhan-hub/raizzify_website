'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const STATS = [
  { value: 1.2, suffix: "M+", label: "Messages Automated", decimal: true },
  { value: 450, suffix: "k+", label: "Tickets Processed", decimal: false },
  { value: 99.9, suffix: "%", label: "Uptime Reliability", decimal: true },
  { value: 8, suffix: "x", label: "Average ROI Scaled", decimal: false },
];

export default function StatsRow() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const counters = gsap.utils.toArray('.stat-number') as HTMLElement[];
      
      counters.forEach((counter, i) => {
        const targetValue = STATS[i].value;
        const isDecimal = STATS[i].decimal;
        
        gsap.to(counter, {
          innerHTML: targetValue,
          duration: 2.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
          },
          snap: { innerHTML: isDecimal ? 0.1 : 1 },
          onUpdate() {
            // Need to handle decimal formatting carefully
            if (isDecimal) {
              counter.innerHTML = Number(counter.innerHTML).toFixed(1);
            } else {
              counter.innerHTML = Math.round(Number(counter.innerHTML)).toString();
            }
          }
        });
      });
      
      gsap.fromTo(
        '.stat-card',
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.15,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
          }
        }
      );
    }, containerRef);
    
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="py-24 bg-[#F2F6FF] border-t border-blue-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mx-auto justify-items-center">
          {STATS.map((stat, i) => (
            <div key={i} className="stat-card flex flex-col items-center justify-center text-center">
              <div className="flex items-baseline mb-2">
                <span className="stat-number text-5xl md:text-7xl font-display font-bold text-accent tracking-tighter">0</span>
                <span className="text-4xl md:text-5xl font-display font-bold text-accent ml-1">{stat.suffix}</span>
              </div>
              <span className="text-sm font-semibold text-muted uppercase tracking-widest">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
