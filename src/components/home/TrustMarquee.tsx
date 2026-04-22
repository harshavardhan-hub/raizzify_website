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
  "High-Performance Tech",
  "Premium Design"
];

const MARQUEE_ITEMS_2 = [...MARQUEE_ITEMS].reverse();

export default function TrustMarquee() {
  const row1Ref = useRef<HTMLDivElement>(null);
  const row2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!row1Ref.current || !row2Ref.current) return;

    // Use faster speeds on mobile, but reduced overall speed
    const isMobile = window.innerWidth < 768;
    const duration1 = isMobile ? 35 : 70;
    const duration2 = isMobile ? 40 : 80;

    const ctx = gsap.context(() => {
      // Row 1 goes left
      gsap.to(row1Ref.current, {
        xPercent: -50,
        ease: "none",
        duration: duration1,
        repeat: -1,
      });

      // Row 2 goes right (starts at -50% and moves to 0)
      gsap.fromTo(row2Ref.current, {
        xPercent: -50,
      }, {
        xPercent: 0,
        ease: "none",
        duration: duration2,
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
      <div className="absolute inset-y-0 left-0 w-16 md:w-32 bg-gradient-to-r from-surface to-transparent z-10" />
      <div className="absolute inset-y-0 right-0 w-16 md:w-32 bg-gradient-to-l from-surface to-transparent z-10" />
      
      <div className="flex flex-col space-y-8">
        <div className="flex w-max relative" ref={row1Ref}>
          {MARQUEE_ITEMS.map((item, i) => <ItemRender key={"r1-a-"+i} text={item} />)}
          {MARQUEE_ITEMS.map((item, i) => <ItemRender key={"r1-b-"+i} text={item} />)}
          {MARQUEE_ITEMS.map((item, i) => <ItemRender key={"r1-c-"+i} text={item} />)}
          {MARQUEE_ITEMS.map((item, i) => <ItemRender key={"r1-d-"+i} text={item} />)}
        </div>
        
        <div className="flex w-max relative" ref={row2Ref}>
          {MARQUEE_ITEMS_2.map((item, i) => <ItemRender key={"r2-a-"+i} text={item} />)}
          {MARQUEE_ITEMS_2.map((item, i) => <ItemRender key={"r2-b-"+i} text={item} />)}
          {MARQUEE_ITEMS_2.map((item, i) => <ItemRender key={"r2-c-"+i} text={item} />)}
          {MARQUEE_ITEMS_2.map((item, i) => <ItemRender key={"r2-d-"+i} text={item} />)}
        </div>
      </div>
    </section>
  );
}
