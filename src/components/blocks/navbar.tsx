"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Wine } from "lucide-react";
import { cn } from "@/lib/utils";
import { EASE_OUT } from "@/lib/motion";

const links = [
  { label: "El Lugar", href: "#lugar" },
  { label: "Reseñas", href: "#testimonios" },
  { label: "Fechas", href: "#fechas" },
  { label: "Preguntas", href: "#faq" },
];

const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const [active, setActive] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  // Show the navbar once the user is past the scroll-driven hero
  useEffect(() => {
    const onScroll = () =>
      setVisible(window.scrollY > window.innerHeight * 0.5);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Scroll-spy: highlight the section currently in view
  useEffect(() => {
    const ids = [...links.map((l) => l.href.slice(1)), "reserva"];
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(`#${entry.target.id}`);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  const goTo = (href: string) => {
    setMenuOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4, ease: EASE_OUT }}
          className="fixed top-4 left-4 right-4 z-50 mx-auto max-w-5xl"
        >
          <nav className="flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-wine-dark/70 px-4 py-3 shadow-lg shadow-black/30 backdrop-blur-xl md:px-6">
            <button
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="flex items-center gap-2 text-white cursor-pointer"
              aria-label="Volver al inicio"
            >
              <Wine className="h-5 w-5 text-wine-primary" aria-hidden="true" />
              <span className="font-serif font-bold tracking-tight">
                Vinos Oficial
              </span>
            </button>

            <div className="hidden items-center gap-1 md:flex">
              {links.map((link) => (
                <button
                  key={link.href}
                  type="button"
                  onClick={() => goTo(link.href)}
                  className={cn(
                    "rounded-lg px-3 py-2 text-sm font-medium transition-colors duration-200 cursor-pointer",
                    active === link.href
                      ? "text-wine-primary"
                      : "text-text-secondary hover:text-white"
                  )}
                >
                  {link.label}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => goTo("#reserva")}
                className="hidden rounded-lg bg-gradient-to-r from-wine-secondary to-wine-primary px-4 py-2 text-sm font-semibold text-white transition-[box-shadow,transform] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] hover:shadow-lg hover:shadow-wine-primary/40 active:scale-[0.98] cursor-pointer sm:inline-flex"
              >
                Reservar
              </button>
              <button
                type="button"
                onClick={() => setMenuOpen((v) => !v)}
                aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
                aria-expanded={menuOpen}
                className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 text-white transition-colors duration-200 hover:bg-white/5 cursor-pointer md:hidden"
              >
                {menuOpen ? (
                  <X className="h-5 w-5" aria-hidden="true" />
                ) : (
                  <Menu className="h-5 w-5" aria-hidden="true" />
                )}
              </button>
            </div>
          </nav>

          <AnimatePresence>
            {menuOpen && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2, ease: EASE_OUT }}
                className="mt-2 rounded-2xl border border-white/10 bg-wine-dark/90 p-2 backdrop-blur-xl md:hidden"
              >
                {links.map((link) => (
                  <button
                    key={link.href}
                    type="button"
                    onClick={() => goTo(link.href)}
                    className={cn(
                      "block w-full rounded-lg px-4 py-3 text-left text-sm font-medium transition-colors duration-200 cursor-pointer",
                      active === link.href
                        ? "bg-white/5 text-wine-primary"
                        : "text-text-secondary hover:bg-white/5 hover:text-white"
                    )}
                  >
                    {link.label}
                  </button>
                ))}
                <button
                  type="button"
                  onClick={() => goTo("#reserva")}
                  className="mt-1 block w-full rounded-lg bg-gradient-to-r from-wine-secondary to-wine-primary px-4 py-3 text-center text-sm font-semibold text-white transition-transform duration-200 active:scale-[0.98] cursor-pointer"
                >
                  Reservar
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.header>
      )}
    </AnimatePresence>
  );
};

export default Navbar;
