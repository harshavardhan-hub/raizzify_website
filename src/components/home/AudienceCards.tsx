'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import MagneticElement from '../MagneticElement';

const AUDIENCES = [
  {
    title: "Are you a Business Owner?",
    role: "Business Leaders",
    desc: "You refuse to plateau. You need infrastructure that actively hunts growth—automating conversations, qualifying leads, and closing sales on WhatsApp while you sleep at the helm.",
    alignment: "self-start",
  },
  {
    title: "Looking for an Event Ticketing Platform?",
    role: "Event Organizers",
    desc: "We manage complete online ticketing for your events. From handling secure, frictionless payments to instantly delivering digital tickets, we ensure a flawless experience for your attendees.",
    alignment: "self-center",
  },
  {
    title: "Do you want to Build a Tech Product?",
    role: "Startup Founders",
    desc: "We are an elite team that designs and builds cutting-edge products. With state-of-the-art websites and advanced features, we help you beat the competition and stay at the top.",
    alignment: "self-end",
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
        <h2 className="text-sm font-bold text-accent tracking-widest uppercase mb-16 text-center">Are You One Of These?</h2>        
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
                    <div className="text-xs font-bold text-muted uppercase tracking-wider mb-2">{aud.role}</div>
                    <h3 className={`text-2xl font-display font-bold text-text mb-4 transition-colors ${i === 0 ? 'group-hover:text-pink-600' : i === 1 ? 'group-hover:text-blue-600' : 'group-hover:text-purple-600'}`}>{aud.title}</h3>
                    <p className="text-muted leading-relaxed">{aud.desc}</p>
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
