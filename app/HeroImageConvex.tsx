"use client";
import { useQuery } from "convex/react";
import { api } from "../convex/_generated/api";

export default function HeroImageConvex() {
  const heroImage = useQuery(api.heroImages.getHeroImage);
  return (
    <div className="relative w-full h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden">
      {heroImage?.imageUrl ? (
        <img
          src={heroImage.imageUrl}
          alt="Hero image"
          className="absolute inset-0 w-full h-full object-cover object-center"
          style={{ zIndex: 0 }}
        />
      ) : (
        <div className="absolute inset-0 w-full h-full bg-gray-800 animate-pulse" />
      )}
    </div>
  );
}
