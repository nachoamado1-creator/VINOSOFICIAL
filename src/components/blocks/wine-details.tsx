"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Wine, Utensils, GraduationCap, Award } from "lucide-react";
import { EASE_OUT, fadeInUp } from "@/lib/motion";

const gallery = [
  { src: "/VINO2.png", label: "Cabernet Sauvignon" },
  { src: "/VINO3.png", label: "Grand Vin de Bordeaux" },
  { src: "/VINO4.png", label: "Malbec Gran Reserva" },
  { src: "/VINO9.png", label: "Pinot Noir de Altura" },
  { src: "/VINO10.png", label: "Blend Gran Corte" },
];

const includes = [
  {
    icon: Wine,
    title: "Degustación de 5 vinos selectos",
    description: "Etiquetas de autor elegidas por nuestro sommelier.",
  },
  {
    icon: Utensils,
    title: "Tabla de quesos y embutidos premium",
    description: "Maridajes pensados para acompañar cada copa.",
  },
  {
    icon: GraduationCap,
    title: "Guía experto sommelier",
    description: "Te acompaña y guía en cada paso de la cata.",
  },
  {
    icon: Award,
    title: "Certificado de participación",
    description: "Un recuerdo de tu velada en el corazón de Tandil.",
  },
];

const WineDetails = () => {
  return (
    <section className="max-w-5xl mx-auto w-full">
      <div className="space-y-20">
        {/* Sección 1: La Experiencia + lo que incluye */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Texto */}
          <motion.div {...fadeInUp} className="text-center lg:text-left">
            <span className="text-wine-primary uppercase tracking-[0.3em] text-sm font-medium mb-4 block">
              Bienvenido
            </span>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-6 text-balance">
              La Experiencia
            </h2>
            <p className="text-lg md:text-xl text-text-secondary leading-relaxed">
              Sumergete en una experiencia sensorial única en Tandil. Nuestras
              cavas de vino más exquisitas te esperan en una velada que
              despertará todos tus sentidos.
            </p>
            <p className="mt-6 text-wine-primary font-serif text-lg italic">
              Esto es todo lo que vas a vivir:
            </p>
          </motion.div>

          {/* Lo que incluye */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {includes.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.08,
                    ease: EASE_OUT,
                  }}
                  whileHover={{ y: -6 }}
                  className="glass-card rounded-2xl p-6 hover:border-wine-primary/70 transition-colors duration-300 group"
                >
                  <div className="w-12 h-12 rounded-xl bg-wine-primary/10 flex items-center justify-center mb-4 group-hover:bg-wine-primary/20 transition-colors">
                    <Icon
                      className="w-6 h-6 text-wine-primary group-hover:text-wine-accent transition-colors"
                      aria-hidden="true"
                    />
                  </div>
                  <h3 className="text-white font-serif font-semibold text-base leading-snug mb-2">
                    {item.title}
                  </h3>
                  <p className="text-text-secondary text-sm leading-relaxed">
                    {item.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Sección 2: Nuestros Vinos */}
        <motion.div {...fadeInUp}>
          <div className="text-center mb-10">
            <span className="text-wine-primary uppercase tracking-[0.3em] text-sm font-medium mb-4 block">
              La Selección
            </span>
            <h3 className="text-3xl md:text-4xl font-serif font-bold text-white text-balance">
              Nuestros Vinos
            </h3>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {gallery.map((wine, index) => (
              <motion.div
                key={wine.src}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: index * 0.08, ease: EASE_OUT }}
                whileHover={{ y: -8 }}
                className="group relative overflow-hidden rounded-xl border border-wine-primary/30 bg-white/5"
              >
                <div className="relative aspect-[3/4] w-full overflow-hidden">
                  <Image
                    src={wine.src}
                    alt={wine.label}
                    fill
                    sizes="(max-width: 1024px) 50vw, 25vw"
                    className="object-cover transition-transform duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] [@media(hover:hover)]:group-hover:scale-[1.05]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                </div>
                <p className="absolute bottom-0 left-0 right-0 p-4 text-white font-serif font-semibold text-sm md:text-base [text-shadow:0_2px_12px_rgba(0,0,0,0.9)]">
                  {wine.label}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default WineDetails;
