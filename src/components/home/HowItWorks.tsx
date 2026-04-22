'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Globe, Users, Magnet, Tag, MessageCircle, Repeat, Layers } from 'lucide-react';

const STEPS = [
  {
    title: "Get Your Own Smart Business Website",
    desc: "No coding. No hassle. Your digital identity live in minutes.",
    icon: Globe
  },
  {
    title: "Tap Into a Shared Customer Network",
    desc: "Your business gets promoted across other local businesses automatically.",
    icon: Users
  },
  {
    title: "Bring More Customers Without Spending on Ads",
    desc: "Organic growth powered by real nearby traffic — not expensive ads.",
    icon: Magnet
  },
  {
    title: "Run Offers, Coupons & Events From One Link",
    desc: "One platform to manage everything your customers need.",
    icon: Tag
  },
  {
    title: "WhatsApp Marketing That Actually Works",
    desc: "Reach customers directly where they respond — not ignore.",
    icon: MessageCircle
  },
  {
    title: "Turn Every Customer Into Repeat Business",
    desc: "Feedback, offers & engagement — all automated.",
    icon: Repeat
  },
  {
    title: "Be Part of a Business Ecosystem",
    desc: "Not alone anymore — grow together with nearby businesses.",
    icon: Layers
  }
];

export default function HowItWorks() {
  const containerRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    if (!pathRef.current || !containerRef.current) return;

    // Determine total length of the SVG path
    const pathLength = pathRef.current.getTotalLength();
    
    // Set up the dash array and offset to hide the line initially
    gsap.set(pathRef.current, {
      strokeDasharray: pathLength,
      strokeDashoffset: pathLength,
    });

    const ctx = gsap.context(() => {
      // Draw line progressively based on scroll
      gsap.to(pathRef.current, {
        strokeDashoffset: 0,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top center",
          end: "bottom center",
          scrub: true, // Perfect sync
        }
      });
      
      // We can also stagger fade the step content
      gsap.utils.toArray('.step-card').forEach((step: any, index) => {
        gsap.fromTo(step, 
          { opacity: 0, x: index % 2 === 0 ? 50 : -50 },
          { 
            opacity: 1, 
            x: 0, 
            duration: 1, 
            ease: "power3.out",
            scrollTrigger: {
              trigger: step,
              start: "top 75%",
            }
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="py-32 bg-[#FAFAF9] relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-8 relative">
        <div className="text-center mb-24 relative z-10">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-text mb-6">Turn Your Local Business Into a Customer Magnet</h2>
          <p className="text-xl text-muted max-w-2xl mx-auto">
            Everything you need to grow — customers, marketing, and visibility — in one simple platform.
          </p>
        </div>
        
        {/* The SVG Line that connects steps */}
        <div className="absolute left-[2.2rem] md:left-1/2 top-[16rem] bottom-16 w-1 md:-ml-0.5 z-0">
          <svg className="h-full w-full" preserveAspectRatio="none" viewBox="0 0 4 1000" fill="none" xmlns="http://www.w3.org/2000/svg">
            <line x1="2" y1="0" x2="2" y2="1000" stroke="#E5E7EB" strokeWidth="4" />
            <path 
              ref={pathRef}
              d="M2 0 V 1000" 
              stroke="var(--color-accent)" 
              strokeWidth="4" 
              className="drop-shadow-[0_0_10px_rgba(0,85,255,0.8)]"
            />
          </svg>
        </div>

        <div className="flex flex-col space-y-24 relative z-10">
          {STEPS.map((step, index) => {
            const Icon = step.icon;
            const isEven = index % 2 === 0;
            return (
              <div key={index} className={`step-card w-full flex flex-col md:flex-row items-start ${isEven ? 'md:flex-row-reverse' : ''}`}>
                {/* Responsive spacing for desktop alternating grid */}
                <div className="hidden md:block md:w-1/2" />
                
                {/* The Custom Node Matrix Dot */}
                <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 w-16 h-16 bg-surface border-4 border-gray-100 rounded-full flex items-center justify-center shadow-lg group hover:border-accent transition-colors duration-300 z-20">
                  <Icon className="w-6 h-6 text-text group-hover:text-accent transition-colors" />
                </div>
                
                <div className={`w-full md:w-1/2 pl-24 md:pl-0 ${isEven ? 'md:pr-16 text-left md:text-right' : 'md:pl-16 text-left'}`}>
                  <div className="bg-white p-8 rounded-2xl border border-gray-100 hover:border-accent/40 shadow-md hover:shadow-lg transition-all duration-300 w-full relative group">
                    <span
                      className={`absolute -top-4 text-3xl md:text-6xl font-bold text-accent/10 font-display pointer-events-none transition-transform group-hover:scale-110 ${isEven ? 'step-num-left' : 'step-num-right'}`}
                    >
                      0{index + 1}
                    </span>
                    <h3 className="text-2xl font-display font-bold text-text mb-3 relative z-10">{step.title}</h3>
                    <p className="text-muted leading-relaxed relative z-10">{step.desc}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
