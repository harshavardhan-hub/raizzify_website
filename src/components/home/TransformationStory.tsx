'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import Image from 'next/image';

export default function TransformationStory() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(min-width: 768px)", () => {
        const scenes = gsap.utils.toArray('.story-scene') as HTMLElement[];
        if (!scenes.length) return;
        
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "+=250%",
            pin: true,
            scrub: 1,
          }
        });

        // Scene 1 fades out, Scene 2 fades in
        tl.to(scenes[0], { opacity: 0, duration: 1 })
          .to(scenes[1], { opacity: 1, duration: 1 }, "<")
          // Scene 2 fades out, Scene 3 fades in
          .to(scenes[1], { opacity: 0, duration: 1 })
          .to(scenes[2], { opacity: 1, duration: 1 }, "<");


      });

      mm.add("(max-width: 767px)", () => {
        const scenes = gsap.utils.toArray('.story-scene') as HTMLElement[];
        scenes.forEach((scene: HTMLElement) => {
          gsap.fromTo(scene,
            { opacity: 0, y: 50 },
            {
              opacity: 1,
              y: 0,
              duration: 1,
              ease: "power3.out",
              scrollTrigger: {
                trigger: scene,
                start: "top 80%",
              }
            }
          );
        });
      });

      return () => mm.revert();
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="md:h-screen w-full relative overflow-hidden bg-base flex flex-col md:block">
      
      {/* SCENE 1: Before Raizzify */}
      <div className="story-scene relative md:absolute inset-0 z-10 bg-[#FAFAFA] flex items-center justify-center opacity-100 py-24 md:py-0">
        <div className="max-w-7xl mx-auto px-8 w-full flex flex-col md:flex-row items-center gap-16">
          <div className="flex-1 scene-content">
            <div className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-6">Scene 1 — The Pain</div>
            <h2 className="text-5xl md:text-6xl font-display font-bold text-text mb-6">
              Struggling with chaos.
            </h2>
            <p className="text-xl text-muted leading-relaxed">
              Before Raizzify, your growth was bottlenecked by manual outreach, disjointed tools, and endless operational overhead. Customers slipped through the cracks. Revenues stagnated.
            </p>
          </div>
          <div className="flex-1 scene-content relative h-[50vh] w-full rounded-3xl overflow-hidden shadow-2xl border border-gray-200">
            <img src="/images/scene_before_raizzify.webp" alt="Struggling chaotic business" className="absolute inset-0 w-full h-full object-cover" />
          </div>
        </div>
      </div>

      {/* SCENE 2: Raizzify In Action */}
      <div className="story-scene relative md:absolute inset-0 z-20 bg-[#F2F5FF] flex items-center justify-center md:opacity-0 py-24 md:py-0">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0055FF]/[0.02] to-transparent" />
        <div className="max-w-7xl mx-auto px-8 w-full flex flex-col md:flex-row-reverse items-center gap-16 relative z-10">
          <div className="flex-1 scene-content">
            <div className="text-sm font-bold text-accent uppercase tracking-widest mb-6 border border-accent/20 bg-accent/5 inline-block px-4 py-2 rounded-full">Scene 2 — The Solution</div>
            <h2 className="text-5xl md:text-6xl font-display font-bold text-text mb-6">
              Deploying absolute automation.
            </h2>
            <p className="text-xl text-muted leading-relaxed">
              The engine fires up. Seamless WhatsApp funnels trigger instantly, tickets sell autonomously, and products deploy at warp speed. Everything connects in a unified, unbreachable architecture.
            </p>
          </div>
          <div className="flex-1 scene-content relative h-[50vh] w-full rounded-3xl overflow-hidden shadow-2xl shadow-accent/20 border border-accent/10">
            <img src="/images/scene_in_action.webp" alt="Raizzify automation in action" className="absolute inset-0 w-full h-full object-cover" />
          </div>
        </div>
      </div>

      {/* SCENE 3: After Raizzify */}
      <div className="story-scene relative md:absolute inset-0 z-30 bg-[#FFFFFF] flex items-center justify-center md:opacity-0 py-24 md:py-0">
        <div className="absolute top-0 right-0 w-[50vw] h-[50vw] bg-accent/5 rounded-full blur-3xl translate-x-1/4 -translate-y-1/4 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-8 w-full flex flex-col md:flex-row items-center gap-16 relative z-10">
          <div className="flex-1 scene-content">
            <div className="text-sm font-bold text-black uppercase tracking-widest mb-6">Scene 3 — The Outcome</div>
            <h2 className="text-5xl md:text-6xl font-display font-bold text-text mb-6">
              Unrivaled scale. <span className="text-accent italic">Zero friction.</span>
            </h2>
            <p className="text-xl text-muted leading-relaxed">
              Revenue compound exponentially. Events sell out before you even lift a finger. You no longer run a business—you command an impenetrable digital empire.
            </p>
          </div>
          <div className="flex-1 scene-content relative h-[50vh] w-full rounded-3xl overflow-hidden shadow-2xl shadow-accent/10 border border-gray-100">
            <img src="/images/scene_after_raizzify.webp" alt="Success after Raizzify" className="absolute inset-0 w-full h-full object-cover" />
          </div>
        </div>
      </div>

    </section>
  );
}
