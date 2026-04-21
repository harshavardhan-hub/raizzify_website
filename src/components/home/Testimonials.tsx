'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const REVIEWS = [
  {
    name: "Aarav Sharma",
    role: "CEO, NexaTech",
    text: "We were losing 40% of our leads due to slow follow-ups. Raizzify's automated WhatsApp infrastructure literally resurrected our sales pipeline natively. Best engineering partners we've hired.",
    image: "/testimonial_1.png"
  },
  {
    name: "Priya Desai",
    role: "Founder, Zenith Events",
    text: "I used to lose sleep over payment gateways failing during peak ticket drops. Out of nowhere, Raizzify's ticketing platform handled an 8,000 user spike without breaking a sweat.",
    image: "/testimonial_2.png"
  },
  {
    name: "Rohan Gupta",
    role: "Director, Elevate Summit",
    text: "You don't hire Raizzify to build an app, you hire them to architect a monopoly. The speed at which they deployed our cross-platform infrastructure was profoundly terrifying.",
    image: "/testimonial_3.png"
  },
  {
    name: "Sneha Reddy",
    role: "CTO, VentureScale",
    text: "The sheer elegance of their code is only outmatched by their understanding of actual business leverage. If you want a product built correctly the first time, this is the team.",
    image: "/testimonial_4.png"
  }
];

export default function Testimonials() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check if desktop, since horizontal scroll can be clunky on pure mobile
    const mql = window.matchMedia("(min-width: 768px)");
    
    // We only create the horizontal pin on larger screens. On mobile, they just stack naturally.
    const ctx = gsap.context(() => {
      if (mql.matches && containerRef.current && trackRef.current) {
        // Calculate the distance to translate X
        const totalWidth = trackRef.current.scrollWidth;
        const viewportWidth = window.innerWidth;
        const distanceToScroll = totalWidth - viewportWidth + 100; // padding

        gsap.to(trackRef.current, {
          x: -distanceToScroll,
          ease: "power2.inOut",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: () => `+=${distanceToScroll}`,
            pin: true,
            scrub: 1.5,
            invalidateOnRefresh: true,
          }
        });
      } else {
        // Simple fade up on mobile
        gsap.fromTo('.test-card', 
          { y: 50, opacity: 0 }, 
          { y: 0, opacity: 1, duration: 1, stagger: 0.2, scrollTrigger: { trigger: containerRef.current, start: "top 80%" } }
        );
      }
    }, containerRef);
    
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="bg-[#FFFFFF] py-20 md:py-0 md:h-screen flex items-center overflow-hidden">
      <div className="w-full">
        <div className="px-6 md:px-12 xl:px-24 mb-10 md:mb-16">
          <h2 className="text-3xl md:text-6xl font-display font-bold text-text">The Verdict.</h2>
          <div className="w-12 md:w-16 h-1 mt-4 md:mt-6 bg-accent" />
        </div>
        
        {/* Track */}
        <div 
          ref={trackRef} 
          className="flex flex-col md:flex-row gap-6 md:gap-8 px-6 md:px-12 xl:px-24 pb-12 w-full md:w-fit"
        >
          {REVIEWS.map((review, i) => (
            <div 
              key={i} 
              className="test-card w-full md:w-[450px] lg:w-[500px] flex-shrink-0 bg-base border border-gray-100 p-8 md:p-10 rounded-2xl relative shadow-sm group hover:shadow-xl hover:border-accent transition-all duration-300"
            >
              {/* Giant abstract quote mark */}
              <div className="absolute top-2 right-4 md:top-6 md:right-8 text-7xl md:text-8xl text-accent/10 md:text-accent/5 font-display font-black pointer-events-none group-hover:-translate-y-2 group-hover:text-accent/10 transition-all duration-300">&quot;</div>
              
              <p className="text-base md:text-lg text-text leading-relaxed font-medium mb-6 md:mb-8 relative z-10">&quot;{review.text}&quot;</p>
              
              <div className="flex items-center space-x-4 md:space-x-5 relative z-10">
                <div className="w-12 h-12 md:w-14 md:h-14 rounded-full overflow-hidden border-2 border-transparent group-hover:border-accent transition-colors duration-300 flex-shrink-0">
                  <img src={review.image} alt={review.name} className="w-full h-full object-cover" />
                </div>
                <div>
                  <h4 className="font-bold text-text font-display text-sm md:text-base">{review.name}</h4>
                  <p className="text-[10px] md:text-xs text-muted uppercase tracking-wider font-semibold">{review.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
