import React from 'react';
import { ArrowRight, Code2, Cpu, Dna, FileText, Sparkles, UploadCloud } from 'lucide-react';

interface HeroSectionProps {
  onOpenApp: (appId: string) => void;
  onOpenInduction: () => void;
  onBrowseCatalog: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenApp,
  onOpenInduction,
  onBrowseCatalog
}) => {
  return (
    <section className="relative overflow-hidden border-b border-slate-800 bg-slate-950">
      
      {/* Visual stage with measured contrast scrim */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Editorial & Value Proposition */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Domain & Station Label without pill box */}
            <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-cyan-400">
              <span className="font-bold">CORE RESEARCH PARADIGM</span>
              <span className="text-slate-600">/</span>
              <span>ULTRA TRIPLET CODON THEORY (UTCT)</span>
              <span className="text-slate-600">/</span>
              <a
                href="https://intron-reading-labs.ai.studio"
                target="_blank"
                rel="noreferrer"
                className="text-cyan-300 hover:underline"
              >
                intron-reading-labs.ai.studio
              </a>
            </div>

            {/* Display Headline with text-wrap: balance */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-[1.15]" style={{ textWrap: 'balance' }}>
              Ultra Triplet Codon Theory: Decoding Pre-mRNA Splicing & Genomic Translation
            </h1>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl">
              The foundational molecular and theoretical breakthrough establishing that triplet codons encode multi-layered supra-translational signals: governing pre-mRNA splicing kinetics, split-codon phase invariants (Phases 0, 1, 2), ribosomal elongation velocities, and high-bandwidth cognitive reading.
            </p>

            {/* Action buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => onOpenApp('ultra-triplet-codon')}
                className="px-5 py-2.5 text-sm font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-lg transition-colors flex items-center gap-2 shadow-sm whitespace-nowrap shrink-0"
              >
                <Cpu className="w-4 h-4" />
                <span>Launch Ultra Triplet Engine</span>
              </button>

              <button
                onClick={() => onOpenApp('horizon-chat')}
                className="px-4 py-2.5 text-sm font-semibold text-purple-200 bg-purple-950/70 hover:bg-purple-900 border border-purple-500/40 rounded-lg transition-colors flex items-center gap-2 whitespace-nowrap shrink-0 shadow-sm"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Global Researcher Chat</span>
              </button>

              <button
                onClick={() => onOpenApp('splice-sense')}
                className="px-4 py-2.5 text-sm font-medium text-slate-200 bg-slate-900 hover:bg-slate-800 border border-slate-700 rounded-lg transition-colors flex items-center gap-2 whitespace-nowrap shrink-0"
              >
                <Dna className="w-4 h-4 text-cyan-400" />
                <span>SpliceSense Studio</span>
              </button>

              <button
                onClick={onOpenInduction}
                className="px-4 py-2.5 text-sm font-medium text-slate-400 hover:text-white transition-colors flex items-center gap-1.5 whitespace-nowrap shrink-0"
              >
                <UploadCloud className="w-3.5 h-3.5 text-cyan-400" />
                <span>Induct to Vercel</span>
              </button>
            </div>

            {/* Deployment badge context */}
            <div className="pt-2 flex items-center gap-4 text-xs text-slate-400 font-mono">
              <span className="flex items-center gap-1.5">
                <Code2 className="w-3.5 h-3.5 text-slate-400" />
                <span>UTCT Theoretical Core</span>
              </span>
              <span>·</span>
              <span>Phase 0/1/2 Invariant Engine</span>
              <span>·</span>
              <span>7 Modules & Global Mesh</span>
            </div>

          </div>

          {/* Right Column: High-Fidelity Laboratory Image with Scrim */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-xl overflow-hidden border border-slate-800 bg-slate-900 shadow-2xl aspect-[16/10] lg:aspect-[4/3] group">
              <img
                src="/src/assets/images/hero_intron_laboratory_1791923358033.jpg"
                alt="Intron Reading Labs molecular genetics and computational workstations"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500"
              />
              {/* Measured contrast scrim */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent pointer-events-none" />
              
              {/* Quiet overlay label */}
              <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs text-slate-300 font-mono">
                <div>
                  <span className="text-cyan-400 font-bold">UTCT CORE BENCH</span>
                  <span className="text-slate-400 ml-2">Ultra Triplet Molecular Laboratory</span>
                </div>
                <span className="text-slate-400">v4.0.1</span>
              </div>
            </div>
          </div>

        </div>

        {/* Full-width 4-column metric strip below the hero */}
        <div className="mt-12 pt-8 border-t border-slate-800/80 grid grid-cols-2 md:grid-cols-4 gap-6">
          
          <button
            onClick={() => onOpenApp('ultra-triplet-codon')}
            className="text-left group/item p-3 -m-3 rounded-xl hover:bg-slate-900/60 transition-colors border border-transparent hover:border-slate-800"
          >
            <div className="text-xs uppercase tracking-wider font-mono text-slate-400 group-hover/item:text-cyan-400 flex items-center justify-between">
              <span>Postulate I: Phase Invariance</span>
              <ArrowRight className="w-3 h-3 opacity-0 group-hover/item:opacity-100 transition-opacity" />
            </div>
            <div className="text-2xl font-mono font-bold text-white mt-1 tabular-nums group-hover/item:text-cyan-300">
              Phases 0 · 1 · 2
            </div>
            <div className="text-xs text-slate-400 mt-0.5">
              Intron Split-Codon Preservation
            </div>
          </button>

          <button
            onClick={() => onOpenApp('ultra-triplet-codon')}
            className="text-left group/item p-3 -m-3 rounded-xl hover:bg-slate-900/60 transition-colors border border-transparent hover:border-slate-800"
          >
            <div className="text-xs uppercase tracking-wider font-mono text-slate-400 group-hover/item:text-emerald-400 flex items-center justify-between">
              <span>Postulate II: Splicing Resonance</span>
              <ArrowRight className="w-3 h-3 opacity-0 group-hover/item:opacity-100 transition-opacity" />
            </div>
            <div className="text-2xl font-mono font-bold text-white mt-1 tabular-nums group-hover/item:text-emerald-300">
              64-Codon ESE / ESS
            </div>
            <div className="text-xs text-slate-400 mt-0.5">
              SRSF1 & U1 snRNP Harmonic Affinities
            </div>
          </button>

          <button
            onClick={() => onOpenApp('ultra-triplet-codon')}
            className="text-left group/item p-3 -m-3 rounded-xl hover:bg-slate-900/60 transition-colors border border-transparent hover:border-slate-800"
          >
            <div className="text-xs uppercase tracking-wider font-mono text-slate-400 group-hover/item:text-amber-400 flex items-center justify-between">
              <span>Postulate III: Ribosomal Pacing</span>
              <ArrowRight className="w-3 h-3 opacity-0 group-hover/item:opacity-100 transition-opacity" />
            </div>
            <div className="text-2xl font-mono font-bold text-white mt-1 tabular-nums group-hover/item:text-amber-300">
              15 – 95 <span className="text-xs font-normal text-slate-400">a.u.</span>
            </div>
            <div className="text-xs text-slate-400 mt-0.5">
              Cotranslational Pause Landscapes
            </div>
          </button>

          <div className="p-3 -m-3">
            <div className="text-xs uppercase tracking-wider font-mono text-slate-400">
              Live Core Deployment
            </div>
            <div className="text-lg font-mono font-bold text-cyan-400 mt-1 truncate">
              intron-reading-labs.ai.studio
            </div>
            <div className="text-xs text-slate-400 mt-0.5 truncate">
              & www.intronreadinglabs.com
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
