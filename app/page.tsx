"use client";
import FloatingIcons from "@/components/FloatingIcons";
import { Highlighter } from "@/components/ui/highlighter"
import { ShinyButton } from "@/components/ui/shiny-button"
import { useState } from "react";
import AuditForm from "@/components/AuditForm";

export default function Home() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  return (
    <div className="min-h-full relative z-50">
      <section id="audit-form" className="max-w-full mx-auto px-6 pb-20">
        {
          isDialogOpen && (
            <div
              className="fixed inset-0 z-999 flex items-center justify-center p-4 w-full"
              onClick={() => setIsDialogOpen(false)} 
            >
              <div className="w-3xl" onClick={e => e.stopPropagation()}>
                <AuditForm onClose={() => setIsDialogOpen(false)} />
              </div>
            </div>
          )
        }
      </section>
      <section className="grid-background flex flex-col items-center justify-center text-center px-6 py-20 min-h-[60vh]">

        <div className="badge">
          <span className="badge-dot" />
          FREE AUDIT — No signup required
        </div>

        <h1 className="text-5xl font-extrabold leading-tight max-w-2xl mb-3">
          Are you{" "}
          <Highlighter action="highlight" color="#bbf7d0">
            overpaying
          </Highlighter>{" "}
          for AI tools?
        </h1>

        <p className="text-gray-500 text-base max-w-xl mb-8 leading-relaxed">
          Enter your current AI stack and get an instant breakdown of where
          you&apos;re wasting money and exactly what to switch.
        </p>


        <ShinyButton onClick={() => setIsDialogOpen((prev) => !prev)}>
          Audit My AI Spend →
        </ShinyButton>

        <div className="flex gap-5 mt-6 flex-wrap justify-center">
          {["Takes 2 minutes", "No login needed", "Real pricing data"].map(t => (
            <span key={t} className="text-xs text-gray-400 flex items-center gap-1">
              ✓ {t}
            </span>
          ))}
        </div>

        <div className="absolute overflow-hidden flex flex-col items-center min-h-full w-4/5 top-1/12 pointer-events-none">
          <FloatingIcons />
        </div>

      </section>
    </div>
  );
}
