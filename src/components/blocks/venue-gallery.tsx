"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import {
  motion,
  AnimatePresence,
  useReducedMotion,
} from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { EASE_OUT } from "@/lib/motion";

interface Slide {
  src: string;
  caption: string;
}

const slides: Slide[] = [
  { src: "/venue/foto1.png", caption: "Brindis entre las sierras" },
  { src: "/venue/foto2.png", caption: "Atardeceres en Tandil" },
  { src: "/venue/foto3.png", caption: "Nuestra cava" },
  { src: "/venue/foto4.png", caption: "Servicio de autor" },
  { src: "/venue/foto5.png", caption: "Mesas para compartir" },
  { src: "/venue/foto6.png", caption: "El placer de descubrir" },
];

const AUTOPLAY_MS = 5000;

const variants = {
  enter: (dir: number) => ({ x: dir > 0 ? "100%" : "-100%", opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir > 0 ? "-100%" : "100%", opacity: 0 }),
};

const VenueGallery = () => {
  const reduceMotion = useReducedMotion();
  const [[index, direction], setState] = useState<[number, number]>([0, 0]);

  const paginate = useCallback((dir: number) => {
    setState(([prev]) => [(prev + dir + slides.length) % slides.length, dir]);
  }, []);

  const goTo = (i: number) =>
    setState(([prev]) => [i, i > prev ? 1 : -1]);

  // Auto-advance every 5s; manual navigation resets the timer
  useEffect(() => {
    const id = setInterval(() => paginate(1), AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [paginate, index]);

  const current = slides[index];

  return (
    <section
      id="lugar"
      className="relative py-24 md:py-32 px-6 md:px-8 bg-gradient-to-b from-wine-dark via-wine-darker/30 to-wine-dark overflow-hidden"
    >
      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: EASE_OUT }}
          className="text-center mb-16"
        >
          <span className="text-wine-primary uppercase tracking-[0.3em] text-sm font-medium mb-4 block">
            El Lugar
          </span>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4 text-balance">
            Viví la <span className="italic text-wine-primary">experiencia</span>
          </h2>
          <p className="text-text-secondary text-lg max-w-xl mx-auto">
            Un espacio pensado para los sentidos, en el corazón de Tandil.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, ease: EASE_OUT }}
          className="group relative mx-auto max-w-4xl"
          role="region"
          aria-roledescription="carrusel"
          aria-label="Galería del lugar"
        >
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-wine-primary/20 bg-wine-darker">
            <AnimatePresence initial={false} custom={direction}>
              <motion.div
                key={index}
                custom={direction}
                variants={reduceMotion ? undefined : variants}
                initial={reduceMotion ? { opacity: 0 } : "enter"}
                animate={reduceMotion ? { opacity: 1 } : "center"}
                exit={reduceMotion ? { opacity: 0 } : "exit"}
                transition={{
                  x: { duration: 0.6, ease: EASE_OUT },
                  opacity: { duration: 0.4 },
                }}
                className="absolute inset-0"
              >
                {/* Photo fills the 4:3 frame exactly — no padding on the sides */}
                <Image
                  src={current.src}
                  alt={current.caption}
                  fill
                  sizes="(max-width: 768px) 100vw, 60vw"
                  className="object-cover"
                />
                <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/80 to-transparent" />
                <p className="absolute bottom-0 left-0 right-0 p-6 text-white font-serif font-semibold text-lg md:text-xl [text-shadow:0_2px_12px_rgba(0,0,0,0.9)]">
                  {current.caption}
                </p>
              </motion.div>
            </AnimatePresence>

            <button
              type="button"
              onClick={() => paginate(-1)}
              aria-label="Foto anterior"
              className="absolute left-3 top-1/2 z-10 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-black/40 text-white backdrop-blur-sm transition-colors duration-200 hover:bg-black/60 active:scale-95 cursor-pointer"
            >
              <ChevronLeft className="h-5 w-5" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => paginate(1)}
              aria-label="Foto siguiente"
              className="absolute right-3 top-1/2 z-10 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-black/40 text-white backdrop-blur-sm transition-colors duration-200 hover:bg-black/60 active:scale-95 cursor-pointer"
            >
              <ChevronRight className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>

          <div className="mt-5 flex items-center justify-center gap-2">
            {slides.map((s, i) => (
              <button
                key={s.src}
                type="button"
                onClick={() => goTo(i)}
                aria-label={`Ir a la foto ${i + 1}: ${s.caption}`}
                aria-current={i === index}
                className={cn(
                  "h-2 rounded-full transition-all duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] cursor-pointer",
                  i === index
                    ? "w-6 bg-wine-primary"
                    : "w-2 bg-white/25 hover:bg-white/50"
                )}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default VenueGallery;
