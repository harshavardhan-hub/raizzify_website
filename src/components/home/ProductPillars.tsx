'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const SCENES = [
  {
    title: "1. WhatsApp Business Connect",
    subheadline: "Deploy AI-driven conversational commerce across India's largest messaging network. Automate support, blast targeted campaigns, and scale revenue effortlessly.",
    cta: "Automate Now",
    image: "/scene_whatsapp.png",
    bgClass: "bg-surface"
  },
  {
    title: "2. Event Booking & Ticketing",
    subheadline: "A premium, frictionless ticketing experience. Sponsor coupons, secure payment gateways, and real-time analytics to manage your legendary events.",
    cta: "Start Booking",
    image: "/scene_events.png",
    bgClass: "bg-base"
  },
  {
    title: "3. Build With Raizzify",
    subheadline: "Elite product engineering by IITians and ISBians. We don't just build apps and websites—we forge tech strategies that dominate markets.",
    cta: "Hire The Elite",
    image: "/scene_build.png",
    bgClass: "bg-surface"
  }
];

export default function ProductPillars() {
  const containerRef = useRef<HTMLDivElement>(null);
  const slidesRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    // Check if on mobile to possibly disable the massive pin if needed, 
    // but user requested "pinned for 300vh". Let's apply it globally, but carefully.
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=300%",
          pin: true,
          scrub: 1,
        }
      });

      // Initially, slide 0 is visible. Slide 1 and 2 are opacity 0.
      // We reveal slide 1 using a premium curtain wipe over slide 0
      tl.to(slidesRef.current[0], { scale: 0.95, duration: 1 }, 0)
        .fromTo(slidesRef.current[1], { clipPath: 'inset(100% 0% 0% 0%)', opacity: 1 }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1, ease: "power2.inOut" }, 0)
        
        // Then slide 2 wipes over slide 1
        .to(slidesRef.current[1], { scale: 0.95, duration: 1 }, 1)
        .fromTo(slidesRef.current[2], { clipPath: 'inset(100% 0% 0% 0%)', opacity: 1 }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1, ease: "power2.inOut" }, 1);
        
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} id="features" className="relative h-screen w-full overflow-hidden bg-black">
      {SCENES.map((scene, i) => (
        <div 
          key={i}
          ref={(el) => { if (el) slidesRef.current[i] = el; }}
          className={`absolute inset-0 w-full h-full flex items-center justify-center ${i === 0 ? 'bg-[#0B1121]' : i === 1 ? 'bg-[#18181B]' : 'bg-[#0F172A]'} px-8 pt-28 pb-12 md:py-0 opacity-${i === 0 ? '100' : '0'}`}
          style={{ zIndex: i }}
        >
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-6">
                {scene.title}
              </h2>
              <p className="text-lg md:text-xl text-gray-300 mb-8 leading-relaxed">
                {scene.subheadline}
              </p>
              <button className="bg-accent text-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-text transition-colors duration-300">
                {scene.cta}
              </button>
            </div>
            
            <div className="relative w-full aspect-square flex justify-center items-center">
               <img 
                 src={scene.image} 
                 alt={scene.title} 
                 className="w-[60%] md:w-[75%] h-[60%] md:h-[75%] object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-500"
               />
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}
