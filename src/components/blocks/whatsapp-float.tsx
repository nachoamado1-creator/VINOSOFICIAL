"use client";

import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";

const WhatsAppFloat = () => {
  const phoneNumber = "5492494000000";
  const message = encodeURIComponent(
    "Hola! Me gustaría obtener más información sobre la Cata de Vinos Experiencia."
  );
  const href = `https://wa.me/${phoneNumber}?text=${message}`;

  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Consultar por WhatsApp"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 2, type: "spring", duration: 0.5, bounce: 0.3 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      className="fixed bottom-6 right-6 z-50 w-14 h-14 md:w-16 md:h-16 rounded-full bg-gradient-to-br from-wine-secondary to-wine-primary shadow-lg shadow-wine-primary/40 flex items-center justify-center cursor-pointer animate-pulse-glow group"
    >
      <MessageCircle
        className="w-6 h-6 md:w-7 md:h-7 text-white group-hover:rotate-12 transition-transform"
        aria-hidden="true"
      />
      <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-wine-accent flex items-center justify-center text-[10px] font-bold text-white">
        1
      </span>
    </motion.a>
  );
};

export default WhatsAppFloat;
