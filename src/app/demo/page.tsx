"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import {
  ShieldAlert,
  Sparkles,
  Anchor,
  Shuffle,
  ArrowRight,
  Quote,
} from "lucide-react";
import { PersonaId } from "@/types/council";
import { PERSONA_PORTRAITS } from "@/lib/personaPortraits";

const personas: {
  id: PersonaId;
  label: string;
  Icon: typeof ShieldAlert;
  color: string;
  bgOpacity: string;
}[] = [
  {
    id: "skeptic",
    label: "VITARKA",
    Icon: ShieldAlert,
    color: "#DC2626",
    bgOpacity: "bg-[#DC2626]/10",
  },
  {
    id: "optimist",
    label: "ASHA",
    Icon: Sparkles,
    color: "#16A34A",
    bgOpacity: "bg-[#16A34A]/10",
  },
  {
    id: "pragmatist",
    label: "YUKTI",
    Icon: Anchor,
    color: "#CA8A04",
    bgOpacity: "bg-[#CA8A04]/10",
  },
  {
    id: "devils-advocate",
    label: "VIPAKSHA",
    Icon: Shuffle,
    color: "#2563EB",
    bgOpacity: "bg-[#2563EB]/10",
  },
];

function PrashnaModal({
  isOpen,
  onDismiss,
  onProceed,
}: {
  isOpen: boolean;
  onDismiss: () => void;
  onProceed: () => void;
}) {
  const modalRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (isOpen && modalRef.current && backdropRef.current) {
      gsap.fromTo(backdropRef.current, { opacity: 0 }, { opacity: 1, duration: 0.2 });
      gsap.fromTo(
        modalRef.current,
        { y: 16, opacity: 0, scale: 0.97 },
        { y: 0, opacity: 1, scale: 1, duration: 0.35, ease: "power3.out" },
      );
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      ref={backdropRef}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[#0F0C08]/40 backdrop-blur-md"
      onClick={onDismiss}
      aria-modal="true"
      role="dialog"
      aria-labelledby="prashna-title"
    >
      <div
        ref={modalRef}
        className="w-full max-w-[440px] mx-4 bg-white rounded-2xl overflow-hidden shadow-[0_24px_64px_rgba(0,0,0,0.12),0_0_0_1px_rgba(26,21,16,0.04)]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="px-6 pt-6 pb-4 border-b border-[#E8E3DC]/80">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-[#D97706]" />
            <span id="prashna-title" className="text-[10px] font-semibold tracking-[0.18em] text-[#767676] uppercase">
              Vipaksha asks
            </span>
          </div>
          <p className="mt-4 text-[20px] font-[family-name:var(--font-lora)] italic text-[#1A1510] leading-[1.4] flex gap-2">
            <Quote className="w-4 h-4 text-[#D97706]/50 shrink-0 mt-1" />
            Before the Sabha convenes — are you asking the right question?
          </p>
          <p className="mt-2 text-[13px] text-[#767676]">
            Reframe your decision if needed, or proceed.
          </p>
        </div>
        <div className="px-6 py-4 flex gap-3">
          <button
            onClick={onDismiss}
            className="flex-1 px-4 py-2.5 rounded-full border border-[#E8E3DC] text-[13px] font-medium text-[#3D3830] hover:bg-[#F5F2EC] transition-colors duration-200"
          >
            Reframe
          </button>
          <button
            onClick={onProceed}
            className="flex-1 px-4 py-2.5 rounded-full bg-[#1A1510] text-white text-[13px] font-medium hover:bg-[#9B1C1C] transition-colors duration-200 flex items-center justify-center gap-2"
          >
            Proceed to Sabha <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default function InputScreen() {
  const router = useRouter();
  const [question, setQuestion] = useState("");
  const [context, setContext] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isPrashnaVisible, setIsPrashnaVisible] = useState(false);
  const [hasShownPrashna, setHasShownPrashna] = useState(false);
  const [hoveredPersona, setHoveredPersona] = useState<PersonaId | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const navbarRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (question.length > 20 && !hasShownPrashna && !isPrashnaVisible) {
      if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
      typingTimeoutRef.current = setTimeout(() => {
        setIsPrashnaVisible(true);
        setHasShownPrashna(true);
      }, 2500);
    }
    return () => {
      if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
    };
  }, [question, hasShownPrashna, isPrashnaVisible]);

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.fromTo(navbarRef.current, { y: -20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 })
        .fromTo(heroRef.current, { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 }, "-=0.4")
        .fromTo(cardRef.current, { y: 32, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 }, "-=0.5")
        .fromTo(".gs-persona-pill", { y: 8, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.06, duration: 0.5 }, "-=0.4");
    },
    { scope: containerRef },
  );

  const handleSubmit = () => {
    if (!question.trim() || isSubmitting) return;
    setIsSubmitting(true);
    gsap.to(containerRef.current, {
      opacity: 0,
      duration: 0.4,
      ease: "power2.in",
      onComplete: () => {
        sessionStorage.setItem(
          "Varant_session",
          JSON.stringify({ question: question.trim(), context: context.trim() }),
        );
        router.push("/council");
      },
    });
  };

  return (
    <div ref={containerRef} className="min-h-screen overflow-x-hidden font-sans bg-[#FAF9F7]">
      <div className="varant-mesh-grad" />
      <div className="varant-grain-overlay" aria-hidden="true" />

      {/* Nav — clean, disciplined */}
      <div className="fixed top-6 left-0 right-0 z-[90] flex justify-center pointer-events-none px-4">
        <nav
          ref={navbarRef}
          className="flex items-center bg-white/90 backdrop-blur-xl border border-[#E8E3DC]/80 rounded-full px-6 py-2.5 shadow-[0_1px 3px rgba(0,0,0,0.04)] w-fit pointer-events-auto"
        >
          <h1 className="text-[16px] font-semibold tracking-[-0.01em] text-[#1A1510]">
            <span className="bg-[linear-gradient(135deg,#D97706_0%,#9B1C1C_50%,#1E3A8A_100%)] bg-clip-text text-transparent">v</span>
            arant
          </h1>
        </nav>
      </div>

      <main className="pt-32 pb-24 px-5 sm:px-6 flex flex-col items-center relative">
        {/* Portrait preview — geometric, subtle */}
        <div
          className="absolute top-[64px] left-1/2 -translate-x-1/2 pointer-events-none z-0 w-full max-w-[800px] h-[320px] flex justify-center items-end opacity-[0.28]"
          aria-hidden="true"
        >
          {personas.map((p) => (
            <pre
              key={p.id}
              className={`absolute bottom-0 transition-all duration-600 font-[family-name:var(--font-mono)] text-[7px] leading-[1.05] select-none ${
                hoveredPersona === p.id ? "opacity-100 translate-y-0 scale-105" : "opacity-0 translate-y-6 scale-100"
              }`}
              style={{ color: p.color }}
            >
              {PERSONA_PORTRAITS[p.id]}
            </pre>
          ))}
        </div>

        {/* Hero — grounded, familiar, modern */}
        <div ref={heroRef} className="w-full max-w-[600px] mb-12 relative z-10 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 mb-5">
            <span className="h-px w-6 bg-[linear-gradient(90deg,transparent,#D97706_40%,#9B1C1C_60%,transparent)] opacity-70" />
            <span className="text-[10px] font-semibold tracking-[0.2em] text-[#767676] uppercase">
              सभा · The Sabha
            </span>
            <span className="h-px w-6 bg-[linear-gradient(90deg,transparent,#9B1C1C_40%,#1E3A8A_60%,transparent)] opacity-70" />
          </div>
          <h2 className="text-[clamp(44px,8vw,72px)] font-normal text-[#1A1510] leading-[1.05] tracking-[-0.025em]">
            What bet can&apos;t
            <br />
            you undo?
          </h2>
          <p className="mt-4 text-[14px] text-[#767676] max-w-[380px] leading-[1.6]">
            Convene your Sabha. Hear every voice. Render your verdict.
          </p>
        </div>

        {/* Input — gateway, threshold between thought and action */}
        <div ref={cardRef} className="w-full max-w-[560px] relative z-10">
          <div
            className="varant-input-card rounded-2xl overflow-hidden transition-all duration-300 focus-within:shadow-[0_8px_32px_rgba(217,119,6,0.08),0_0_0_1px_rgba(217,119,6,0.12)]"
            style={{
              boxShadow: "0 2px 16px rgba(0,0,0,0.04), 0 0 0 1px rgba(26,21,16,0.04)",
            }}
          >
            <div className="relative">
              <textarea
                value={question}
                onChange={(e) => {
                  setQuestion(e.target.value);
                  e.target.style.height = "auto";
                  e.target.style.height = `${e.target.scrollHeight}px`;
                }}
                placeholder="Your binary choice or critical decision..."
                className="w-full bg-transparent px-6 pt-6 pb-4 text-[17px] font-[family-name:var(--font-lora)] italic text-[#1A1510] placeholder:text-[#B8B0A8] focus:outline-none resize-none min-h-[100px] leading-[1.6]"
                aria-label="Your decision question"
              />
              <div className="mx-6 h-px bg-[linear-gradient(90deg,transparent,rgba(217,119,6,0.12)_30%,rgba(155,28,28,0.1)_70%,transparent)]" />
              <textarea
                value={context}
                onChange={(e) => {
                  setContext(e.target.value);
                  e.target.style.height = "auto";
                  e.target.style.height = `${e.target.scrollHeight}px`;
                }}
                placeholder="Add context — constraints, goals, risks..."
                className="w-full bg-transparent px-6 py-4 text-[14px] text-[#3D3830] placeholder:text-[#B8B0A8] focus:outline-none resize-none min-h-[64px] leading-[1.55]"
                aria-label="Additional context"
              />
            </div>

            <div className="bg-[#F9F8F6]/60 border-t border-[#E8E3DC]/80 px-5 py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-[10px] font-semibold text-[#767676] tracking-[0.12em] uppercase">
                <span className="inline-flex gap-0.5">
                  {[1, 2, 3].map((i) => (
                    <span key={i} className="w-1.5 h-1.5 rounded-full bg-[#B8B0A8]/60" />
                  ))}
                </span>
                Sabha deliberation · 3 rounds
              </div>
              <button
                onClick={handleSubmit}
                disabled={!question.trim() || isSubmitting}
                className="bg-[#1A1510] text-white px-5 py-2.5 rounded-full text-[13px] font-medium hover:bg-[#9B1C1C] disabled:bg-[#D5CEC6] disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center gap-2 min-h-[44px]"
              >
                Begin your Vichar
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Persona pills — geometric, disciplined */}
          <div className="mt-7 flex flex-wrap justify-center gap-2">
            {personas.map((p) => {
              const Icon = p.Icon;
              const isHovered = hoveredPersona === p.id;
              return (
                <button
                  key={p.label}
                  type="button"
                  className={`gs-persona-pill flex items-center gap-2 rounded-full px-3.5 py-2 transition-all duration-250 cursor-pointer border ${
                    isHovered ? "border-[#1A1510]/10 bg-white" : "border-[#E8E3DC] bg-white/80 hover:bg-white"
                  }`}
                  style={{
                    backgroundColor: isHovered ? `${p.color}12` : undefined,
                    borderColor: isHovered ? `${p.color}40` : undefined,
                  }}
                  onMouseEnter={() => setHoveredPersona(p.id)}
                  onMouseLeave={() => setHoveredPersona(null)}
                  aria-label={`Hover to preview ${p.label}`}
                >
                  <div
                    className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${p.bgOpacity}`}
                    style={{ color: p.color }}
                  >
                    <Icon className="w-3 h-3" strokeWidth={2} />
                  </div>
                  <span className="text-[10px] font-semibold tracking-[0.08em] text-[#3D3830] uppercase">
                    {p.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <footer className="fixed bottom-5 left-0 right-0 text-center pointer-events-none">
          <span className="text-[9px] font-medium tracking-[0.2em] text-[#B8B0A8] uppercase">
            न्याय · तर्क · निर्णय — from the land that invented logic
          </span>
        </footer>
      </main>

      <PrashnaModal
        isOpen={isPrashnaVisible}
        onDismiss={() => setIsPrashnaVisible(false)}
        onProceed={handleSubmit}
      />
    </div>
  );
}
