"use client";

import React from "react";
import { motion } from "framer-motion";

export interface Testimonial {
  text: string;
  name: string;
  role: string;
  initials: string;
}

export const TestimonialsColumn = (props: {
  className?: string;
  testimonials: Testimonial[];
  duration?: number;
}) => {
  return (
    <div className={props.className}>
      <motion.div
        animate={{
          translateY: "-50%",
        }}
        transition={{
          duration: props.duration || 10,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop",
        }}
        className="flex flex-col gap-6 pb-6"
      >
        {[...new Array(2).fill(0)].map((_, index) => (
          <React.Fragment key={index}>
            {props.testimonials.map(({ text, name, role, initials }, i) => (
              <div
                className="glass-card p-8 rounded-3xl max-w-xs w-full"
                key={i}
              >
                <p className="text-text-secondary leading-relaxed">
                  &ldquo;{text}&rdquo;
                </p>
                <div className="flex items-center gap-3 mt-5">
                  <div className="h-10 w-10 rounded-full bg-gradient-to-br from-wine-secondary to-wine-primary flex items-center justify-center text-white font-serif font-bold text-xs flex-shrink-0">
                    {initials}
                  </div>
                  <div className="flex flex-col">
                    <div className="font-medium tracking-tight leading-5 text-white">
                      {name}
                    </div>
                    <div className="leading-5 text-text-secondary tracking-tight">
                      {role}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </React.Fragment>
        ))}
      </motion.div>
    </div>
  );
};
