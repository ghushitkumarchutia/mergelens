"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  GithubIcon,
  Menu01Icon,
  Cancel01Icon,
} from "@hugeicons/core-free-icons";
import { ModeToggle } from "@/components/ui/mode-toggle";

interface NavItem {
  readonly label: string;
  readonly href: string;
}

const NAV_ITEMS: readonly NavItem[] = [
  { label: "Pipeline", href: "#pipeline" },
  { label: "RAG Engine", href: "#engine" },
  { label: "Stack", href: "#stack" },
  { label: "Security", href: "#security" },
  { label: "Pricing", href: "#pricing" },
] as const;

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 10);
          ticking = false;
        });
        ticking = true;
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize, { passive: true });
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMobileMenuOpen(false);
      }
    };

    if (mobileMenuOpen) {
      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
    }
  }, [mobileMenuOpen]);

  const closeMobileMenu = useCallback(() => {
    setMobileMenuOpen(false);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-100 transition-all duration-300 ease-out ${
        isScrolled || mobileMenuOpen
          ? "bg-[#fafaf8]/80 dark:bg-[#0a0a0b]/75 backdrop-blur-[14px] backdrop-saturate-[1.4] shadow-sm"
          : "bg-transparent shadow-none"
      }`}
    >
      <div className='max-w-300 mx-auto flex items-center justify-between py-2.5 md:py-4 px-5 md:px-8 relative'>
        <Link
          href='#top'
          className='flex items-center gap-1.5 font-syne font-semibold text-base md:text-lg text-ml-text hover:opacity-90 transition-opacity select-none'
          onClick={closeMobileMenu}
        >
          <Image
            src='/icons/logo.svg'
            alt='MergeLens'
            width={24}
            height={24}
            className='w-5.5 md:w-6 h-5.5 md:h-6 object-contain shrink-0'
            priority
          />
          <span>MergeLens</span>
        </Link>

        <nav
          id='mobile-nav-menu'
          aria-label='Main Navigation'
          className={`${
            mobileMenuOpen
              ? "absolute top-full left-0 right-0 flex flex-col items-stretch bg-[#fafaf8]/95 dark:bg-[#0a0a0b]/95 backdrop-blur-[14px] backdrop-saturate-[1.4] border-b border-ml-border p-2 gap-0 shadow-lg"
              : "hidden md:flex"
          } md:static md:flex-row md:items-center md:gap-0.5 md:bg-transparent md:border-none md:p-0`}
        >
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={closeMobileMenu}
              className={`px-3.5 py-2 md:py-2 text-[13.5px] font-manrope font-medium text-ml-text-muted hover:text-ml-text transition-colors duration-150 ${
                mobileMenuOpen
                  ? "py-3 text-left border-b border-ml-border last:border-b-0"
                  : ""
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className='flex items-center gap-1.5'>
          <ModeToggle />
          <Link
            href='/sign-in'
            className='inline-flex h-7.5 md:h-8.5 items-center justify-center gap-2 rounded-none bg-ml-text px-4 text-[14px] md:text-sm font-manrope font-medium leading-none text-ml-bg transition-all duration-150 hover:bg-ml-text/90 dark:hover:bg-white active:scale-[0.97] active:opacity-90 select-none ml-2 md:ml-0 border border-transparent'
          >
            <HugeiconsIcon
              icon={GithubIcon}
              strokeWidth={1.8}
              className='md:w-3.75 md:h-3.75 w-3.5 h-3.5 shrink-0'
            />
            <span className='leading-none -mt-0.5'>Sign in</span>
          </Link>

          <button
            className='flex md:hidden w-8.25 h-8.25 md:w-9 md:h-9 border border-ml-border items-center justify-center text-ml-text transition-all duration-150 hover:bg-ml-surface active:scale-[0.97] active:opacity-90 select-none ml-2'
            aria-label='Toggle navigation menu'
            aria-expanded={mobileMenuOpen}
            aria-controls='mobile-nav-menu'
            onClick={() => setMobileMenuOpen((prev) => !prev)}
          >
            <HugeiconsIcon
              icon={mobileMenuOpen ? Cancel01Icon : Menu01Icon}
              strokeWidth={1.5}
              className='w-4 h-4 md:w-4.5 md:h-4.5'
            />
          </button>
        </div>
      </div>
    </header>
  );
}
