"use client";

import { motion } from "framer-motion";
import { Calendar, Users, ArrowRight, Wine } from "lucide-react";
import { cn } from "@/lib/utils";
import { EASE_OUT } from "@/lib/motion";
import { sessions, SELECT_SESSION_EVENT } from "@/lib/sessions";

const UpcomingDates = () => {
  const handleReserve = (id: string) => {
    window.dispatchEvent(
      new CustomEvent(SELECT_SESSION_EVENT, { detail: id })
    );
    document
      .getElementById("reserva")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section
      id="fechas"
      className="relative py-24 md:py-32 px-6 md:px-8 bg-wine-dark overflow-hidden"
    >
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-wine-primary/10 rounded-full blur-[130px]" />
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="text-wine-primary uppercase tracking-[0.3em] text-sm font-medium mb-4 block">
            Agenda
          </span>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4 text-balance">
            Próximas <span className="italic text-wine-primary">fechas</span>
          </h2>
          <p className="text-text-secondary text-lg max-w-xl mx-auto">
            Elegí tu velada. Los cupos son limitados y se agotan rápido.
          </p>
        </motion.div>

        <div className="space-y-4">
          {sessions.map((s, index) => {
            const isLow = s.spots <= 6;
            const soldOut = s.spots <= 0;
            return (
              <motion.div
                key={s.id}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.08, ease: EASE_OUT }}
                className="glass-card rounded-2xl p-6 flex flex-col sm:flex-row items-center gap-6"
              >
                {/* Date block */}
                <div className="flex-shrink-0 w-20 h-20 rounded-xl bg-gradient-to-br from-wine-secondary to-wine-primary flex flex-col items-center justify-center text-white">
                  <span className="text-3xl font-serif font-bold leading-none">
                    {s.day}
                  </span>
                  <span className="text-xs uppercase tracking-wider mt-1">
                    {s.month}
                  </span>
                </div>

                {/* Info */}
                <div className="flex-1 text-center sm:text-left">
                  <h3 className="text-xl font-serif font-bold text-white mb-1">
                    {s.title}
                  </h3>
                  <div className="flex flex-wrap items-center justify-center sm:justify-start gap-x-4 gap-y-1 text-sm text-text-secondary">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-4 h-4 text-wine-primary" aria-hidden="true" />
                      {s.weekday} · {s.time}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Wine className="w-4 h-4 text-wine-primary" aria-hidden="true" />
                      {s.price} <span className="text-text-secondary/70">por persona</span>
                    </span>
                    <span
                      className={cn(
                        "flex items-center gap-1.5 font-medium",
                        soldOut
                          ? "text-text-secondary"
                          : isLow
                          ? "text-wine-accent"
                          : "text-text-secondary"
                      )}
                    >
                      <Users className="w-4 h-4" aria-hidden="true" />
                      {soldOut
                        ? "Agotado"
                        : isLow
                        ? `¡Últimos ${s.spots} lugares!`
                        : `${s.spots} lugares disponibles`}
                    </span>
                  </div>
                </div>

                {/* CTA */}
                <button
                  type="button"
                  onClick={() => !soldOut && handleReserve(s.id)}
                  disabled={soldOut}
                  className={cn(
                    "group inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-[box-shadow,transform] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] cursor-pointer flex-shrink-0",
                    soldOut
                      ? "bg-white/5 text-text-secondary cursor-not-allowed"
                      : "bg-gradient-to-r from-wine-secondary to-wine-primary text-white hover:shadow-lg hover:shadow-wine-primary/40 active:scale-[0.98]"
                  )}
                >
                  {soldOut ? "Sin cupos" : "Reservar"}
                  {!soldOut && (
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  )}
                </button>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default UpcomingDates;
