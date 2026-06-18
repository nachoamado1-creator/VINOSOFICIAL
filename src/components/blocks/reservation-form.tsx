"use client";

import { useState, useEffect, FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Wine, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { sessions, SELECT_SESSION_EVENT } from "@/lib/sessions";

interface FormData {
  name: string;
  email: string;
  phone: string;
  people: number;
  date: string;
  notes: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  date?: string;
}

const firstAvailable = sessions.find((s) => s.spots > 0) ?? sessions[0];

const initialFormData: FormData = {
  name: "",
  email: "",
  phone: "",
  people: 1,
  date: firstAvailable.id,
  notes: "",
};

const ReservationForm = () => {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // The "date" field holds the selected session id — spots come from that cata
  const selectedSession =
    sessions.find((s) => s.id === formData.date) ?? firstAvailable;
  const spotsLeft = selectedSession.spots;

  // Pre-select the cata when the user clicks "Reservar" on a session card
  useEffect(() => {
    const handler = (e: Event) => {
      const id = (e as CustomEvent<string>).detail;
      if (sessions.some((s) => s.id === id)) {
        setFormData((prev) => ({ ...prev, date: id }));
        setErrors((prev) => ({ ...prev, date: undefined }));
      }
    };
    window.addEventListener(SELECT_SESSION_EVENT, handler);
    return () => window.removeEventListener(SELECT_SESSION_EVENT, handler);
  }, []);

  const validateEmail = (email: string): boolean =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const validatePhone = (phone: string): boolean =>
    /^(\+?54)?\s?9?\s?\d{2,4}\s?\d{6,8}$/.test(phone.replace(/\s/g, ""));

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim() || formData.name.trim().length < 2) {
      newErrors.name = "Por favor ingresa tu nombre completo";
    }
    if (!validateEmail(formData.email)) {
      newErrors.email = "Email inválido";
    }
    if (!validatePhone(formData.phone)) {
      newErrors.phone = "Teléfono inválido (formato argentino)";
    }
    if (!sessions.some((s) => s.id === formData.date)) {
      newErrors.date = "Selecciona una cata";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setIsSubmitted(true);

    setTimeout(() => {
      setIsSubmitted(false);
      setFormData(initialFormData);
    }, 4000);
  };

  const handleChange = (field: keyof FormData, value: string | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const inputClass = (hasError?: boolean) =>
    cn(
      "w-full bg-white/5 border rounded-lg px-4 py-3 text-white placeholder-gray-500",
      "focus:outline-none focus:ring-2 focus:ring-wine-primary/50 transition-[border-color,box-shadow] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)]",
      hasError
        ? "border-red-500/70 focus:border-red-500"
        : "border-white/10 focus:border-wine-primary"
    );

  return (
    <section
      id="reserva"
      className="relative py-24 md:py-32 px-6 md:px-8 bg-gradient-to-b from-wine-dark via-wine-darker/40 to-wine-dark overflow-hidden"
    >
      {/* Decorative background */}
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-wine-secondary/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-wine-primary/20 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-2xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <span className="text-wine-primary uppercase tracking-[0.3em] text-sm font-medium mb-4 block">
            Reserva Ahora
          </span>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4 text-balance">
            Reserva tu Lugar
          </h2>
          <p className="text-text-secondary text-lg max-w-md mx-auto">
            Solo{" "}
            <motion.span
              key={spotsLeft}
              initial={{ scale: 1.3, color: "#e94560" }}
              animate={{ scale: 1, color: "#d4547a" }}
              className="font-bold text-wine-primary"
            >
              {spotsLeft} lugares
            </motion.span>{" "}
            disponibles. Asegurá tu participación en esta velada única.
          </p>
        </motion.div>

        <AnimatePresence mode="wait">
          {isSubmitted ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="glass-card p-12 rounded-2xl text-center"
            >
              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2, type: "spring", duration: 0.5, bounce: 0.35 }}
                className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-wine-primary/20 mb-6"
              >
                <CheckCircle2 className="w-10 h-10 text-wine-primary" />
              </motion.div>
              <h3 className="text-2xl font-serif font-bold text-white mb-3">
                ¡Reserva confirmada!
              </h3>
              <p className="text-text-secondary">
                Te contactaremos por email en las próximas 24 horas con los
                detalles de tu experiencia.
              </p>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
              onSubmit={handleSubmit}
              className="glass-card p-8 md:p-10 rounded-2xl space-y-6"
              noValidate
            >
              {/* Nombre */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-white text-sm font-medium mb-2"
                >
                  Nombre Completo
                </label>
                <input
                  id="name"
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  className={inputClass(!!errors.name)}
                  placeholder="Tu nombre"
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? "name-error" : undefined}
                />
                {errors.name && (
                  <p
                    id="name-error"
                    className="mt-2 text-sm text-red-400 flex items-center gap-1"
                  >
                    <AlertCircle className="w-4 h-4" />
                    {errors.name}
                  </p>
                )}
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-white text-sm font-medium mb-2"
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  className={inputClass(!!errors.email)}
                  placeholder="tu@email.com"
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? "email-error" : undefined}
                />
                {errors.email && (
                  <p
                    id="email-error"
                    className="mt-2 text-sm text-red-400 flex items-center gap-1"
                  >
                    <AlertCircle className="w-4 h-4" />
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Teléfono */}
              <div>
                <label
                  htmlFor="phone"
                  className="block text-white text-sm font-medium mb-2"
                >
                  Teléfono
                </label>
                <input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleChange("phone", e.target.value)}
                  className={inputClass(!!errors.phone)}
                  placeholder="+54 9 249 ..."
                  aria-invalid={!!errors.phone}
                  aria-describedby={errors.phone ? "phone-error" : undefined}
                />
                {errors.phone && (
                  <p
                    id="phone-error"
                    className="mt-2 text-sm text-red-400 flex items-center gap-1"
                  >
                    <AlertCircle className="w-4 h-4" />
                    {errors.phone}
                  </p>
                )}
              </div>

              {/* Personas + Fecha */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="people"
                    className="block text-white text-sm font-medium mb-2"
                  >
                    Cantidad de Personas
                  </label>
                  <select
                    id="people"
                    value={formData.people}
                    onChange={(e) =>
                      handleChange("people", Number(e.target.value))
                    }
                    className={inputClass()}
                  >
                    {Array.from({ length: 20 }, (_, i) => (
                      <option
                        key={i + 1}
                        value={i + 1}
                        className="bg-wine-dark"
                      >
                        {i + 1} {i === 0 ? "persona" : "personas"}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="date"
                    className="block text-white text-sm font-medium mb-2"
                  >
                    Cata
                  </label>
                  <select
                    id="date"
                    value={formData.date}
                    onChange={(e) => handleChange("date", e.target.value)}
                    className={cn(inputClass(!!errors.date), "[color-scheme:dark]")}
                    aria-invalid={!!errors.date}
                    aria-describedby={errors.date ? "date-error" : undefined}
                  >
                    {sessions.map((s) => (
                      <option
                        key={s.id}
                        value={s.id}
                        disabled={s.spots <= 0}
                        className="bg-wine-dark"
                      >
                        {s.day} {s.month} · {s.title}
                        {s.spots <= 0 ? " (Agotado)" : ""}
                      </option>
                    ))}
                  </select>
                  {errors.date && (
                    <p
                      id="date-error"
                      className="mt-2 text-sm text-red-400 flex items-center gap-1"
                    >
                      <AlertCircle className="w-4 h-4" />
                      {errors.date}
                    </p>
                  )}
                </div>
              </div>

              {/* Notas */}
              <div>
                <label
                  htmlFor="notes"
                  className="block text-white text-sm font-medium mb-2"
                >
                  Notas Adicionales
                </label>
                <textarea
                  id="notes"
                  value={formData.notes}
                  onChange={(e) => handleChange("notes", e.target.value)}
                  className={cn(inputClass(), "resize-none")}
                  placeholder="Alergias, preferencias, ocasión especial..."
                  rows={4}
                />
              </div>

              {/* Submit button */}
              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={cn(
                  "relative w-full bg-gradient-to-r from-wine-secondary via-wine-primary to-wine-accent",
                  "text-white font-semibold py-4 rounded-lg cursor-pointer",
                  "hover:shadow-lg hover:shadow-wine-primary/50 transition-shadow duration-300",
                  "disabled:opacity-70 disabled:cursor-not-allowed",
                  "flex items-center justify-center gap-2 group overflow-hidden"
                )}
              >
                <AnimatePresence mode="wait">
                  {isSubmitting ? (
                    <motion.span
                      key="loading"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center gap-2"
                    >
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Confirmando...
                    </motion.span>
                  ) : (
                    <motion.span
                      key="default"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center gap-2"
                    >
                      <Wine className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                      Confirmar Reserva
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>

              <p className="text-xs text-text-secondary text-center">
                Al reservar aceptas nuestros términos y condiciones. Te enviaremos
                la confirmación por email.
              </p>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default ReservationForm;
