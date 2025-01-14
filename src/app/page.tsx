"use client";

import Hero from "@/components/Hero";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-svh">
      <Hero />
      <Footer />
    </main>
  );
}
