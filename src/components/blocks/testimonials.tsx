"use client";

import { motion } from "framer-motion";
import { TestimonialsColumn, type Testimonial } from "./testimonials-column";

const testimonials: Testimonial[] = [
  {
    text: "Una experiencia inolvidable. El sommelier nos guió por cada vino con una pasión que se contagia. Volveríamos mil veces.",
    name: "Martina Gómez",
    role: "Buenos Aires",
    initials: "MG",
  },
  {
    text: "El ambiente, los maridajes y la atención fueron impecables. Reservé para mi aniversario y superó todas las expectativas.",
    name: "Lucas Fernández",
    role: "Tandil",
    initials: "LF",
  },
  {
    text: "Nunca había entendido tanto sobre vinos en solo dos horas. Una velada elegante, íntima y deliciosa de principio a fin.",
    name: "Carolina Ruiz",
    role: "Mar del Plata",
    initials: "CR",
  },
  {
    text: "Los maridajes fueron una revelación. Cada copa contaba una historia y el lugar tiene una calidez que te hace quedarte horas.",
    name: "Tomás Aguirre",
    role: "La Plata",
    initials: "TA",
  },
  {
    text: "Fui sin saber nada de vinos y salí enamorada. La atención personalizada y la selección de etiquetas son de otro nivel.",
    name: "Valentina Díaz",
    role: "Rosario",
    initials: "VD",
  },
  {
    text: "El mejor plan para una noche distinta. Vinos excepcionales, un sommelier que sabe contar y un espacio precioso en Tandil.",
    name: "Joaquín Méndez",
    role: "Córdoba",
    initials: "JM",
  },
  {
    text: "Reservamos en grupo y todos quedamos fascinados. Profesionalismo, buen gusto y vinos que no encontrás en cualquier lado.",
    name: "Sofía Romero",
    role: "Bahía Blanca",
    initials: "SR",
  },
  {
    text: "Cada detalle está cuidado al extremo. Desde la copa hasta la luz del lugar. Una cata que se siente como un ritual.",
    name: "Nicolás Vega",
    role: "Mendoza",
    initials: "NV",
  },
  {
    text: "Volví por tercera vez y siempre descubro algo nuevo. La pasión que ponen por el vino se nota en cada momento.",
    name: "Florencia Castro",
    role: "Tandil",
    initials: "FC",
  },
];

const firstColumn = testimonials.slice(0, 3);
const secondColumn = testimonials.slice(3, 6);
const thirdColumn = testimonials.slice(6, 9);

const Testimonials = () => {
  return (
    <section
      id="testimonios"
      className="relative py-24 md:py-32 px-6 md:px-8 bg-wine-dark overflow-hidden"
    >
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[40rem] h-[40rem] bg-wine-secondary/10 rounded-full blur-[140px]" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="text-wine-primary uppercase tracking-[0.3em] text-sm font-medium mb-4 block">
            Lo que dicen
          </span>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4 text-balance">
            Experiencias que <span className="italic text-wine-primary">enamoran</span>
          </h2>
          <p className="text-text-secondary text-lg max-w-xl mx-auto">
            Más de 500 personas ya vivieron nuestra cata. Esto es lo que cuentan.
          </p>
        </motion.div>

        <div className="relative flex justify-center gap-6 max-h-[640px] overflow-hidden [mask-image:linear-gradient(to_bottom,transparent,black_15%,black_85%,transparent)]">
          <TestimonialsColumn testimonials={firstColumn} duration={18} />
          <TestimonialsColumn
            testimonials={secondColumn}
            className="hidden md:block"
            duration={24}
          />
          <TestimonialsColumn
            testimonials={thirdColumn}
            className="hidden lg:block"
            duration={20}
          />
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
