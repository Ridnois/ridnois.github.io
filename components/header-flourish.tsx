"use client";

import { usePrefersReducedMotion } from "@/lib/use-reduced-motion";

export function HeaderFlourish() {
  const prefersReducedMotion = usePrefersReducedMotion();

  return (
    <svg
      aria-hidden
      width="132"
      height="30"
      viewBox="0 0 132 30"
      fill="none"
      className="pointer-events-none absolute -bottom-2 left-0 hidden opacity-90 sm:block"
    >
      <defs>
        <linearGradient
          id="ridnois-flourish-gradient"
          gradientUnits="userSpaceOnUse"
          x1="0"
          y1="0"
          x2="132"
          y2="0"
        >
          <stop offset="0%" stopColor="#3a0409" />
          <stop offset="35%" stopColor="var(--brand)" />
          <stop offset="65%" stopColor="var(--brand-2)" />
          <stop offset="100%" stopColor="#3a0409" />
        </linearGradient>
      </defs>
      <path
        d="M2 18 C 18 4, 30 30, 46 16 C 58 5, 72 26, 86 15 C 96 7, 108 22, 130 12"
        stroke="url(#ridnois-flourish-gradient)"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeDasharray="46 210"
      >
        {!prefersReducedMotion && (
          <animate
            attributeName="stroke-dashoffset"
            from="0"
            to="-256"
            dur="4.5s"
            repeatCount="indefinite"
          />
        )}
      </path>
    </svg>
  );
}
