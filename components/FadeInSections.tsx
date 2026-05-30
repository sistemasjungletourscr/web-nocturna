"use client";

import {
  Children,
  type CSSProperties,
  type ReactNode,
  useEffect,
  useRef
} from "react";

type FadeInSectionsProps = {
  children: ReactNode;
  className?: string;
  as?: "main" | "div";
};

export function FadeInSections({
  children,
  className,
  as = "main"
}: FadeInSectionsProps) {
  const containerRef = useRef<HTMLElement | null>(null);
  const sections = Children.toArray(children);
  const setContainerRef = (element: HTMLElement | null) => {
    containerRef.current = element;
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const sectionElements = Array.from(container.children).filter(
      (child): child is HTMLElement => child instanceof HTMLElement
    );

    if (sectionElements.length === 0) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    function showAllSections() {
      sectionElements.forEach((section) => {
        section.dataset.fadeVisible = "true";
      });
    }

    container.dataset.fadeReady = "true";

    if (reduceMotion.matches || !("IntersectionObserver" in window)) {
      showAllSections();
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          const section = entry.target as HTMLElement;
          section.dataset.fadeVisible = "true";
          observer.unobserve(section);
        });
      },
      {
        rootMargin: "0px 0px -12% 0px",
        threshold: 0.18
      }
    );

    sectionElements.forEach((section) => observer.observe(section));

    return () => {
      observer.disconnect();
    };
  }, []);

  const fadeChildren = (
    <>
      {sections.map((child, index) => (
        <div
          key={index}
          className="fade-in-section"
          style={{ "--fade-in-order": String(index) } as CSSProperties}
        >
          {child}
        </div>
      ))}
    </>
  );
  const containerClassName = ["fade-in-sections", className]
    .filter(Boolean)
    .join(" ");

  if (as === "div") {
    return (
      <div ref={setContainerRef} className={containerClassName}>
        {fadeChildren}
      </div>
    );
  }

  return (
    <main ref={setContainerRef} className={containerClassName}>
      {fadeChildren}
    </main>
  );
}
