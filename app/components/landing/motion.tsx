"use client";

import { useEffect, useState, type ElementType, type ReactNode } from "react";

export function FadeIn({
  children,
  delay = 0,
  duration = 1000,
  className = "",
  as: Tag = "div",
}: {
  children: ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
  as?: ElementType;
}) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timeout = window.setTimeout(() => setVisible(true), delay);
    return () => window.clearTimeout(timeout);
  }, [delay]);

  return (
    <Tag
      className={`fade-in ${visible ? "is-visible" : ""} ${className}`}
      style={{ transitionDuration: `${duration}ms` }}
    >
      {children}
    </Tag>
  );
}

const CHARACTER_DELAY = 30;
const INITIAL_DELAY = 200;

export function AnimatedHeading({
  lines,
  className = "",
  ariaLabel,
}: {
  lines: string[];
  className?: string;
  ariaLabel: string;
}) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      requestAnimationFrame(() => setVisible(true));
    });

    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <h1 className={className} style={{ letterSpacing: "-0.04em" }} aria-label={ariaLabel}>
      {lines.map((line, lineIndex) => (
        <span className="block" key={lineIndex}>
          {Array.from(line).map((character, characterIndex) => {
            const delay =
              INITIAL_DELAY + lineIndex * line.length * CHARACTER_DELAY + characterIndex * CHARACTER_DELAY;

            return (
              <span
                key={characterIndex}
                className={`animated-character ${visible ? "is-visible" : ""}`}
                style={{ transitionDelay: `${delay}ms` }}
              >
                {character === " " ? " " : character}
              </span>
            );
          })}
        </span>
      ))}
    </h1>
  );
}
