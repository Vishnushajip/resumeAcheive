"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const stats = [
  { value: "50K+", label: "Resumes Created" },
  { value: "95%", label: "ATS Success Rate" },
  { value: "2M+", label: "Job Applications" },
  { value: "4.9★", label: "User Rating" },
];

export function StatsSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".stat-item", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 90%",
        },
        scale: 0.9,
        opacity: 0,
        duration: 0.5,
        stagger: 0.1,
        ease: "back.out(1.2)",
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="stats-section py-20 bg-gradient-to-r from-purple-600 to-blue-600"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-10 text-center text-white">
          {stats.map(({ value, label }, i) => (
            <div key={i} className="stat-item">
              <div className="text-5xl font-extrabold mb-2">{value}</div>
              <div className="text-purple-100 font-medium text-lg">{label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
