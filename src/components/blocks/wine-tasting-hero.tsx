"use client";

import ScrollExpandMedia from "@/components/ui/scroll-expansion-hero";
import WineDetails from "./wine-details";

const WineTastingHero = () => {
  return (
    <ScrollExpandMedia
      mediaType="image"
      mediaSrc="/VINO7.png"
      bgImageSrc="/VINO5.png"
      title="Cata de Vinos Experiencia"
      subtitle="Descubre la esencia de Tandil, copa a copa, en una bodega donde cada etiqueta cuenta su propia historia."
      date="Tandil, Argentina"
      textBlend={false}
    >
      <WineDetails />
    </ScrollExpandMedia>
  );
};

export default WineTastingHero;
