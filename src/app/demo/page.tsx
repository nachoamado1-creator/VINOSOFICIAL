"use client";

import { useRef, useState, useEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
} from "framer-motion";

/* ------------------------------------------------------------------ */
/* COPA COMPAÑERA — fija en una esquina, se llena con TODO el scroll    */
/* ------------------------------------------------------------------ */
function CompanionGlass() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const targetTime = useRef(0);
  const [duration, setDuration] = useState(0);
  const [ready, setReady] = useState(false);
  const [pct, setPct] = useState(0);

  // Progreso de scroll de toda la página (sin target = documento completo)
  const { scrollYProgress } = useScroll();
  const fillWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  useMotionValueEvent(scrollYProgress, "change", (p) => {
    if (duration) targetTime.current = Math.min(p, 0.999) * duration;
    setPct(Math.round(p * 100));
  });

  const onMeta = () => {
    const v = videoRef.current;
    if (!v) return;
    setDuration(v.duration);
    v.play().then(() => v.pause()).catch(() => {});
    setReady(true);
  };

  useEffect(() => {
    if (!ready) return;
    let raf = 0;
    const tick = () => {
      const v = videoRef.current;
      if (v) {
        const cur = v.currentTime;
        const diff = targetTime.current - cur;
        if (Math.abs(diff) > 0.01) v.currentTime = cur + diff * 0.2;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [ready]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.4 }}
      className="fixed bottom-5 right-5 z-50 flex flex-col items-center pointer-events-none select-none"
    >
      <div className="relative w-[120px] h-[170px] md:w-[150px] md:h-[210px]">
        <video
          ref={videoRef}
          src="/copa.mp4"
          muted
          playsInline
          preload="auto"
          onLoadedMetadata={onMeta}
          className="w-full h-full object-contain"
          style={{
            mixBlendMode: "screen",
            filter: "contrast(1.2) brightness(0.95)",
            // difumina los bordes del rectángulo para que no se vea la "caja"
            WebkitMaskImage:
              "radial-gradient(ellipse 68% 80% at 50% 50%, #000 55%, transparent 100%)",
            maskImage:
              "radial-gradient(ellipse 68% 80% at 50% 50%, #000 55%, transparent 100%)",
          }}
        />
      </div>

      {/* Etiqueta + progreso de llenado */}
      <div className="mt-1 w-[120px] md:w-[150px] text-center">
        <div className="h-[3px] w-full rounded-full bg-white/15 overflow-hidden">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-wine-secondary to-wine-primary"
            style={{ width: fillWidth }}
          />
        </div>
        <p className="mt-2 text-[10px] uppercase tracking-[0.25em] text-text-secondary">
          {pct >= 99 ? "¡Salud!" : `Sirviendo ${pct}%`}
        </p>
      </div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/* Secciones de relleno para dar largo de scroll                       */
/* ------------------------------------------------------------------ */
function Section({
  kicker,
  title,
  text,
  tone = "dark",
}: {
  kicker: string;
  title: React.ReactNode;
  text: string;
  tone?: "dark" | "darker";
}) {
  return (
    <section
      className={`min-h-screen flex items-center justify-center px-6 ${
        tone === "darker" ? "bg-wine-darker" : "bg-wine-dark"
      }`}
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7 }}
        className="max-w-2xl text-center"
      >
        <span className="text-wine-primary uppercase tracking-[0.3em] text-sm mb-4 block">
          {kicker}
        </span>
        <h2 className="text-4xl md:text-6xl font-serif font-bold text-white mb-6 text-balance">
          {title}
        </h2>
        <p className="text-text-secondary text-lg leading-relaxed">{text}</p>
      </motion.div>
    </section>
  );
}

export default function DemoPage() {
  return (
    <main className="bg-wine-dark text-white">
      <CompanionGlass />

      <Section
        kicker="Tandil, Argentina"
        title={
          <>
            Cada copa, <span className="italic text-wine-primary">una historia</span>
          </>
        }
        text="Mirá la copa abajo a la derecha: te va a acompañar mientras recorrés la página y se irá sirviendo a medida que bajás. Scrolleá."
      />
      <Section
        kicker="La experiencia"
        title={<>Una velada para los <span className="italic text-wine-primary">sentidos</span></>}
        text="Cinco vinos selectos, maridajes pensados y un sommelier que convierte cada sorbo en un relato. Dos horas que no vas a olvidar."
        tone="darker"
      />
      <Section
        kicker="La selección"
        title={<>De la viña a tu <span className="italic text-wine-primary">copa</span></>}
        text="Malbec de altura, Cabernet de guarda y etiquetas que rara vez se consiguen. Cada uno con su momento en la cata."
      />
      <Section
        kicker="El lugar"
        title={<>Un espacio <span className="italic text-wine-primary">íntimo</span></>}
        text="Luz cálida, mesa servida y el silencio justo para escuchar lo que cada vino tiene para contar."
        tone="darker"
      />
      <Section
        kicker="Reservá"
        title={<>Tu copa ya está <span className="italic text-wine-primary">servida</span></>}
        text="Llegaste al fondo y la copa se llenó con vos. Cupos limitados: asegurá tu lugar."
      />
    </main>
  );
}
