"use client";
import { HeroHighlightDemo } from "@/components/ui/heroHighlightDemo";
import ProductGrid from "@/pages/products";

import { ColourfulTextDemo } from "@/components/ui/colourfulTextDemo";
import { WobbleCardDemo } from "../components/ui/wobbleCardDemo";

export default function Home() {
  return (
    <>
      <HeroHighlightDemo />

      <ColourfulTextDemo />

      <WobbleCardDemo />

      <ProductGrid />
    </>
  );
}
