"use client";

import { useEffect } from "react";
import { GridBackdrop } from "@/features/landing/components/GridBackdrop";
import { Header } from "@/features/landing/components/Header";
import { Hero } from "@/features/landing/components/Hero";
import { ProblemStatement } from "@/features/landing/components/ProblemStatement";
import { Pipeline } from "@/features/landing/components/Pipeline";
import { Engine } from "@/features/landing/components/Engine";
import { StackGrid } from "@/features/landing/components/StackGrid";
import { SecurityStrip } from "@/features/landing/components/SecurityStrip";
import { Pricing } from "@/features/landing/components/Pricing";
import { FinalCta } from "@/features/landing/components/FinalCta";
import { Footer } from "@/features/landing/components/Footer";

export default function Home() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const reveals = document.querySelectorAll(".reveal");

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      reveals.forEach((el) => el.classList.add("in"));
      return;
    }

    if (!("IntersectionObserver" in window)) {
      reveals.forEach((el) => el.classList.add("in"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
    );

    reveals.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div className='mergelens-page relative min-h-screen bg-ml-bg text-ml-text selection:bg-ml-accent selection:text-white font-manrope'>
      <GridBackdrop />
      <Header />
      <main id='top' className='relative z-1 flex flex-col'>
        <Hero />
        <ProblemStatement />
        <Pipeline />
        <Engine />
        <StackGrid />
        <SecurityStrip />
        <Pricing />
        <FinalCta />
      </main>
      <Footer />
    </div>
  );
}
