"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { EASE_OUT } from "@/lib/motion";

interface FaqItem {
  q: string;
  a: string;
}

const faqs: FaqItem[] = [
  {
    q: "¿Qué incluye la experiencia?",
    a: "Degustación de 5 vinos selectos, una tabla de quesos y embutidos premium, la guía de un sommelier experto durante toda la velada y un certificado de participación.",
  },
  {
    q: "¿Cuánto dura la cata?",
    a: "La experiencia completa dura aproximadamente 2 horas, pensadas para disfrutar sin apuro cada copa y cada maridaje.",
  },
  {
    q: "¿Necesito experiencia previa en vinos?",
    a: "Para nada. La cata está diseñada para todos los niveles: te acompañamos paso a paso, ya sea tu primera degustación o seas un entusiasta del vino.",
  },
  {
    q: "¿Puedo regalar la experiencia?",
    a: "Sí. Es un regalo ideal para aniversarios, cumpleaños o fechas especiales. Escribinos por WhatsApp y coordinamos una gift card a nombre de quien quieras sorprender.",
  },
  {
    q: "¿Hay opciones sin alcohol o para celíacos?",
    a: "Sí. Avisanos al reservar (en el campo de notas) sobre alergias, intolerancias o preferencias y adaptamos los maridajes para que todos disfruten.",
  },
  {
    q: "¿Cuál es la política de cancelación?",
    a: "Podés reprogramar tu reserva sin costo avisando con al menos 48 horas de anticipación. Ante cualquier imprevisto, escribinos y buscamos la mejor solución.",
  },
  {
    q: "¿Dónde es y hay estacionamiento?",
    a: "La cata se realiza en nuestra bodega en el corazón de Tandil. Al confirmar tu reserva te enviamos la dirección exacta y las indicaciones para llegar y estacionar.",
  },
];

const FAQ = () => {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section
      id="faq"
      className="relative overflow-hidden bg-wine-dark px-6 py-24 md:px-8 md:py-32"
    >
      <div className="pointer-events-none absolute inset-0 opacity-30">
        <div className="absolute left-1/4 top-1/3 h-96 w-96 rounded-full bg-wine-secondary/10 blur-[130px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: EASE_OUT }}
          className="mb-16 text-center"
        >
          <span className="mb-4 block text-sm font-medium uppercase tracking-[0.3em] text-wine-primary">
            Preguntas Frecuentes
          </span>
          <h2 className="text-balance text-4xl font-serif font-bold text-white md:text-5xl">
            Todo lo que <span className="italic text-wine-primary">querés saber</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-text-secondary">
            Resolvé tus dudas antes de reservar tu lugar en la velada.
          </p>
        </motion.div>

        <div className="space-y-3">
          {faqs.map((item, i) => {
            const isOpen = open === i;
            return (
              <motion.div
                key={item.q}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.05, ease: EASE_OUT }}
                className="glass-card overflow-hidden rounded-2xl"
              >
                <button
                  type="button"
                  id={`faq-trigger-${i}`}
                  aria-expanded={isOpen}
                  aria-controls={`faq-panel-${i}`}
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-4 p-6 text-left cursor-pointer"
                >
                  <span className="font-serif text-lg font-semibold text-white">
                    {item.q}
                  </span>
                  <Plus
                    className={cn(
                      "h-5 w-5 shrink-0 text-wine-primary transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)]",
                      isOpen && "rotate-45"
                    )}
                    aria-hidden="true"
                  />
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="content"
                      id={`faq-panel-${i}`}
                      role="region"
                      aria-labelledby={`faq-trigger-${i}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: EASE_OUT }}
                      className="overflow-hidden"
                    >
                      <p className="px-6 pb-6 leading-relaxed text-text-secondary">
                        {item.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
