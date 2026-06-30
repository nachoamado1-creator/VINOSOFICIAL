"use client";

import { motion } from "framer-motion";
import { Mail, Phone, Instagram, Facebook, MessageCircle, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-wine-deeper border-t border-white/10 py-16 md:py-20">
      <div className="max-w-6xl mx-auto px-6 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12"
        >
          {/* Brand */}
          <div>
            <h3 className="text-white font-serif font-bold text-2xl mb-4">
              Vinoteca Tandil
            </h3>
            <p className="text-text-secondary leading-relaxed mb-4">
              Experiencia premium de cata de vinos en el corazón de Tandil,
              Argentina.
            </p>
            <div className="flex items-center gap-2 text-text-secondary text-sm">
              <MapPin className="w-4 h-4 text-wine-primary" aria-hidden="true" />
              Tandil, Buenos Aires, Argentina
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-serif font-bold text-lg mb-4">
              Contacto
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="mailto:info@vinotecatandil.com"
                  className="flex items-center gap-3 text-text-secondary hover:text-wine-primary transition-colors group cursor-pointer"
                >
                  <Mail
                    className="w-4 h-4 group-hover:scale-110 transition-transform"
                    aria-hidden="true"
                  />
                  info@vinotecatandil.com
                </a>
              </li>
              <li>
                <a
                  href="tel:+542494000000"
                  className="flex items-center gap-3 text-text-secondary hover:text-wine-primary transition-colors group cursor-pointer"
                >
                  <Phone
                    className="w-4 h-4 group-hover:scale-110 transition-transform"
                    aria-hidden="true"
                  />
                  +54 9 249 400 0000
                </a>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="text-white font-serif font-bold text-lg mb-4">
              Síguenos
            </h3>
            <div className="flex gap-3">
              {[
                { Icon: Instagram, label: "Instagram", href: "#" },
                { Icon: Facebook, label: "Facebook", href: "#" },
                { Icon: MessageCircle, label: "WhatsApp", href: "#" },
              ].map(({ Icon, label, href }) => (
                <motion.a
                  key={label}
                  href={href}
                  aria-label={label}
                  whileHover={{ y: -4 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-11 h-11 inline-flex items-center justify-center rounded-full bg-white/5 border border-white/10 text-text-secondary hover:text-wine-primary hover:border-wine-primary/50 hover:bg-wine-primary/10 transition-colors duration-200 cursor-pointer"
                >
                  <Icon className="w-5 h-5" aria-hidden="true" />
                </motion.a>
              ))}
            </div>
          </div>
        </motion.div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-text-secondary text-sm text-center md:text-left">
            © {new Date().getFullYear()} Vinoteca Tandil. Todos los derechos
            reservados.
          </p>
          <div className="flex gap-6 text-sm">
            <a
              href="#"
              className="text-text-secondary hover:text-wine-primary transition-colors cursor-pointer"
            >
              Privacidad
            </a>
            <a
              href="#"
              className="text-text-secondary hover:text-wine-primary transition-colors cursor-pointer"
            >
              Términos
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
