"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { createPortal } from "react-dom";
import { Maximize2, X } from "lucide-react";

type ExpandableImageProps = {
  src: string;
  alt: string;
  sizes: string;
  className?: string;
  openLabel: string;
  closeLabel: string;
};

export function ExpandableImage({
  src,
  alt,
  sizes,
  className,
  openLabel,
  closeLabel
}: ExpandableImageProps) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  const lightbox = open
    ? createPortal(
        <div
          className="fixed inset-0 z-[9999] flex h-dvh w-dvw items-center justify-center bg-night/96 p-0 backdrop-blur-md"
          role="dialog"
          aria-modal="true"
          aria-label={alt}
          onClick={() => setOpen(false)}
        >
          <button
            type="button"
            className="absolute right-4 top-4 z-10 rounded-md border border-white/15 bg-night/80 p-3 text-soft shadow-lg transition hover:border-lantern/50 hover:text-lantern"
            aria-label={closeLabel}
            onClick={() => setOpen(false)}
          >
            <X aria-hidden="true" size={22} />
          </button>
          <figure
            className="animate-[fadeIn_240ms_ease-out] h-dvh w-dvw"
            onClick={(event) => event.stopPropagation()}
          >
            <Image
              src={src}
              alt={alt}
              fill
              sizes="100vw"
              className="object-contain p-2 sm:p-4"
            />
            <figcaption className="sr-only">{alt}</figcaption>
          </figure>
        </div>,
        document.body
      )
    : null;

  return (
    <>
      <button
        type="button"
        className={[
          "group relative block w-full overflow-hidden text-left",
          className
        ]
          .filter(Boolean)
          .join(" ")}
        aria-label={openLabel}
        onClick={() => setOpen(true)}
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          className="object-contain transition duration-300 group-hover:scale-[1.01]"
        />
        <span className="absolute right-3 top-3 inline-flex items-center gap-2 rounded-md border border-white/15 bg-night/85 px-3 py-2 text-xs font-bold uppercase tracking-[0.14em] text-soft shadow-lg backdrop-blur transition group-hover:border-lantern/50 group-hover:text-lantern">
          <Maximize2 aria-hidden="true" size={14} />
          {openLabel}
        </span>
      </button>

      {lightbox}
    </>
  );
}
