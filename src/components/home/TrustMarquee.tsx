'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const MARQUEE_ITEMS = [
  "IITians & ISBians", 
  "Secure Payments", 
  "Event Management", 
  "WhatsApp Business", 
  "App Development", 
  "Startup Advisory",
  "IITians & ISBians", 
  "Secure Payments", 
  "Event Management", 
  "WhatsApp Business", 
  "App Development", 
  "Startup Advisory"
];

export default function TrustMarquee() {
  const row1Ref = useRef<HTMLDivElement>(null);
  const row2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!row1Ref.current || !row2Ref.current) return;

    // We clone the items entirely so it repeats smoothly
    // Wait, the items array already has duplicates, but GSAP handle smooth infinitely scrolling
    // by moving x from 0 to -50%
    const ctx = gsap.context(() => {
      gsap.to(row1Ref.current, {
        xPercent: -50,
        ease: "none",
        duration: 20,
        repeat: -1,
      });

      gsap.fromTo(row2Ref.current, {
        xPercent: -50,
      }, {
        xPercent: 0,
        ease: "none",
        duration: 25, // slightly different speed
        repeat: -1,
      });
    });

    return () => ctx.revert();
  }, []);

  const ItemRender = ({ text }: { text: string }) => (
    <div className="flex items-center space-x-4 px-8">
      <span className="w-2 h-2 rounded-full bg-accent" />
      <span className="text-2xl md:text-4xl font-display font-semibold text-text whitespace-nowrap uppercase tracking-wider">
        {text}
      </span>
    </div>
  );

  return (
    <section className="py-24 bg-surface border-y border-gray-100 overflow-hidden relative" data-aos="fade-up">
      <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-surface to-transparent z-10" />
      <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-surface to-transparent z-10" />
      
      <div className="flex flex-col space-y-8">
        <div className="flex w-[200vw] relative" ref={row1Ref}>
          {MARQUEE_ITEMS.map((item, i) => <ItemRender key={"r1-"+i} text={item} />)}
          {MARQUEE_ITEMS.map((item, i) => <ItemRender key={"r1b-"+i} text={item} />)}
        </div>
        
        <div className="flex w-[200vw] relative" ref={row2Ref}>
          {MARQUEE_ITEMS.map((item, i) => <ItemRender key={"r2-"+i} text={item} />)}
          {MARQUEE_ITEMS.map((item, i) => <ItemRender key={"r2b-"+i} text={item} />)}
        </div>
      </div>
    </section>
  );
}
