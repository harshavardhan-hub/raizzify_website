'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import MagneticElement from '../MagneticElement';

const AUDIENCES = [
  {
    items: [
      {
        title: "Complete Product Design (UI/UX)",
        desc: "Not just development — experience that users love.",
      },
      {
        title: "Industry-Grade Tech Architecture",
        desc: "Built for scale, speed, and real-world usage.",
      }
    ]
  },
  {
    items: [
      {
        title: "End-to-End Development",
        desc: "From idea → design → development → deployment.",
      },
      {
        title: "WhatsApp + Automation Integrations",
        desc: "Built for today’s user behavior.",
      }
    ]
  },
  {
    items: [
      {
        title: "Guidance From IITians & ISBians",
        desc: "Strategy + execution — not just coding.",
      },
      {
        title: "Long-Term Tech Partner — Not One-Time Vendor",
        desc: "",
      }
    ]
  }
];

export default function AudienceCards() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        cardRefs.current,
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.2,
          ease: "power3.out",
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
    <section ref={containerRef} className="py-32 bg-[#FFFFFF] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-8">
        <h2 className="text-sm font-bold text-accent tracking-widest uppercase mb-8 text-center">Are You One Of These?</h2>        
        
        <div className="flex flex-col md:flex-row md:flex-wrap justify-center items-center gap-3 md:gap-4 mb-20 max-w-5xl mx-auto w-full">
          {[
            "A Founder with a Startup Idea, but no Tech Team",
            "A Business Owner wanting to scale Digitally",
            "Someone tired of Freelancers & Broken Projects",
            "A Company needing Scalable Tech — not just Code"
          ].map((text, i) => (
            <div key={i} style={{ color: '#0f172a', backgroundColor: '#f8fafc' }} className="w-full md:w-auto border border-gray-300 rounded-xl md:rounded-full px-5 py-3 md:px-6 md:py-3 text-sm md:text-base font-semibold shadow-sm hover:shadow-md hover:border-accent/50 transition-all flex items-center cursor-default">
              <span className="mr-3 md:mr-2 text-lg md:text-base shrink-0">👉</span> 
              <span className="!text-[#0f172a]">{text}</span>
            </div>
          ))}
        </div>

        <div className="flex flex-col space-y-12 md:space-y-0 md:grid md:grid-cols-3 gap-8">
          {AUDIENCES.map((aud, i) => (
            <div 
              key={i} 
              ref={(el) => { cardRefs.current[i] = el; }}
              className={`w-full md:mt-[${i * 4}rem]`} 
              style={{ marginTop: typeof window !== 'undefined' && window.innerWidth >= 768 ? `${i * 3}rem` : '0' }}
            >
              <MagneticElement intensity={0.05} className="h-full">
                <div className={`group h-full ${i === 0 ? 'bg-[#FDF2F8]' : i === 1 ? 'bg-[#EFF6FF]' : 'bg-[#F5F3FF]'} p-10 rounded-2xl border border-white hover:border-accent shadow-sm hover:shadow-xl hover:shadow-accent/5 transition-all duration-500 cursor-pointer flex flex-col justify-between`}>
                  <div>
                    {aud.items.map((item, idx) => (
                      <div key={idx} className={idx > 0 ? "mt-8" : ""}>
                        <h3 className={`text-xl font-display font-bold text-text mb-2 flex items-start transition-colors ${i === 0 ? 'group-hover:text-pink-600' : i === 1 ? 'group-hover:text-blue-600' : 'group-hover:text-purple-600'}`}>
                          <span className="mr-2 mt-0.5">✔</span>
                          <span className="leading-tight">{item.title}</span>
                        </h3>
                        {item.desc && <p className="text-muted leading-relaxed ml-7">{item.desc}</p>}
                      </div>
                    ))}
                  </div>
                  <div className="mt-8">
                    <span className={`text-sm font-semibold flex items-center ${i === 0 ? 'text-pink-600' : i === 1 ? 'text-blue-600' : 'text-purple-600'}`}>
                      Explore Advantage 
                      <svg className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </span>
                  </div>
                </div>
              </MagneticElement>
            </div>
          ))}
        </div>


      </div>
    </section>
  );
}
