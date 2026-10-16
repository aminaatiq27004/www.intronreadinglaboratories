/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HeroSection } from './components/HeroSection';
import { AppCatalog } from './components/AppCatalog';
import { UltraTripletCodonApp } from './components/apps/UltraTripletCodonApp';
import { SpliceSenseApp } from './components/apps/SpliceSenseApp';
import { BioLexReaderApp } from './components/apps/BioLexReaderApp';
import { IsoformVisualizerApp } from './components/apps/IsoformVisualizerApp';
import { ReadingCadenceApp } from './components/apps/ReadingCadenceApp';
import { KnowledgeGraphApp } from './components/apps/KnowledgeGraphApp';
import { GlobalHorizonChatApp } from './components/apps/GlobalHorizonChatApp';
import { InductionCenter } from './components/induction/InductionCenter';
import { ArrowLeft, ArrowRight, Cpu, Dna, FileText, Layers, Sparkles, UploadCloud, Zap } from 'lucide-react';
import { LAB_APPS } from './data/mockData';

export default function App() {
  const [activeView, setActiveView] = useState<'home' | 'catalog' | 'app' | 'induction'>('home');
  const [selectedAppId, setSelectedAppId] = useState<string>('ultra-triplet-codon');

  const handleNavigate = (view: 'home' | 'catalog' | 'app' | 'induction', appId?: string) => {
    setActiveView(view);
    if (appId) {
      setSelectedAppId(appId);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentAppMeta = LAB_APPS.find(a => a.id === selectedAppId);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-cyan-500/30 selection:text-cyan-200">
      
      {/* Top Bar Contract Navigation */}
      <Header
        activeView={activeView}
        selectedAppId={selectedAppId}
        onNavigate={handleNavigate}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        
        {/* Home View */}
        {activeView === 'home' && (
          <div className="space-y-16">
            <HeroSection
              onOpenApp={(appId) => handleNavigate('app', appId)}
              onOpenInduction={() => handleNavigate('induction')}
              onBrowseCatalog={() => handleNavigate('catalog')}
            />

            {/* Featured Applications Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-800 pb-4">
                <div>
                  <div className="text-xs font-mono uppercase text-cyan-400 font-bold">
                    CORE THEORETICAL WORK & SUITE OVERVIEW
                  </div>
                  <h2 className="text-2xl font-bold text-white tracking-tight mt-1">
                    Research Modules & Theoretical Applications
                  </h2>
                </div>
                <button
                  onClick={() => handleNavigate('catalog')}
                  className="text-xs font-mono text-cyan-400 hover:text-cyan-300 flex items-center gap-1.5"
                >
                  <span>Explore all 6 tools</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* CORE WORK SPOTLIGHT: Ultra Triplet Codon Engine */}
              <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 border border-cyan-500/40 rounded-2xl p-6 sm:p-8 space-y-6 shadow-2xl relative overflow-hidden">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                  <div className="space-y-3 max-w-3xl">
                    <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-cyan-400">
                      <span className="px-2 py-0.5 rounded bg-cyan-950 border border-cyan-500/50 font-bold text-cyan-300">
                        FOUNDATIONAL RESEARCH
                      </span>
                      <span>·</span>
                      <span>ULTRA TRIPLET CODON THEORY (UTCT)</span>
                      <span>·</span>
                      <span className="text-slate-400">v4.0.1</span>
                    </div>

                    <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                      Ultra Triplet Codon Engine
                    </h3>

                    <p className="text-sm text-slate-300 leading-relaxed">
                      The core scientific foundation of Intron Reading Labs. Evaluates how triplet codons dictate pre-mRNA splicing mechanics across intron-exon junctions: mapping Phase 0, 1, and 2 split codons, Exonic Splicing Enhancer (ESE) harmonics, ribosomal elongation velocity, and reading frame preservation.
                    </p>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 text-xs font-mono">
                      <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
                        <div className="text-slate-400 text-[10px]">SPLIT PHASES</div>
                        <div className="text-cyan-400 font-bold">Phases 0 · 1 · 2</div>
                      </div>
                      <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
                        <div className="text-slate-400 text-[10px]">ESE HARMONICS</div>
                        <div className="text-emerald-400 font-bold">64 Codons Mapped</div>
                      </div>
                      <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
                        <div className="text-slate-400 text-[10px]">RESCUE SSO</div>
                        <div className="text-amber-400 font-bold">98.4% Frame Yield</div>
                      </div>
                      <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
                        <div className="text-slate-400 text-[10px]">DEPLOYMENT</div>
                        <div className="text-white font-bold">Active & Live</div>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row lg:flex-col gap-3 shrink-0">
                    <button
                      onClick={() => handleNavigate('app', 'ultra-triplet-codon')}
                      className="py-3 px-6 text-xs font-bold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-lg transition-colors flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/20 whitespace-nowrap"
                    >
                      <Cpu className="w-4 h-4" />
                      <span>Launch Core Engine</span>
                    </button>
                    <button
                      onClick={() => handleNavigate('app', 'biolex-reader')}
                      className="py-3 px-5 bg-slate-950 border border-slate-800 hover:border-slate-700 text-slate-200 rounded-lg text-xs font-mono flex items-center justify-center gap-2 whitespace-nowrap"
                    >
                      <FileText className="w-3.5 h-3.5 text-cyan-400" />
                      <span>Read UTCT Paper</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* GLOBAL RESEARCHER CHATBOT SPOTLIGHT: Post-Corona Uplift & Hidden Universe */}
              <div className="bg-gradient-to-r from-slate-900 via-purple-950/20 to-slate-900 border border-purple-500/40 rounded-2xl p-6 sm:p-7 space-y-5 shadow-xl relative overflow-hidden">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                  <div className="space-y-2.5 max-w-3xl">
                    <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
                      <span className="px-2.5 py-0.5 rounded-full bg-purple-950 border border-purple-400/60 text-purple-300 font-bold flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        <span>GLOBAL SCIENTIFIC CONDUIT & CHATBOT</span>
                      </span>
                      <span className="text-slate-500">·</span>
                      <span className="text-slate-300">GENETICISTS & MOLECULAR BIOLOGISTS</span>
                      <span className="text-slate-500">·</span>
                      <span className="text-cyan-400 font-semibold">POST-CORONA RESILIENCE</span>
                    </div>

                    <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                      Worldwide Molecular Genetics Discovery Conduit
                    </h3>

                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      Connect directly with Geneticists, Molecular Biologists, Genetic Engineers, and Molecular Geneticists worldwide. Share lab findings in real time, leverage the <strong>Ultra Triplet Codon Theory (UTCT)</strong> to speedily uplift post-corona pandemic resilience (spike mRNA stabilization, long-COVID cellular repair, pan-coronaviral SSOs), and journey into the hidden universe of the non-coding intronic dark genome beyond human perceptions.
                    </p>

                    <div className="flex flex-wrap items-center gap-2 pt-1 text-[11px] font-mono text-slate-400">
                      <span className="px-2 py-0.5 rounded bg-slate-950 border border-slate-800 text-slate-300">8 Active Global Nodes</span>
                      <span className="px-2 py-0.5 rounded bg-slate-950 border border-slate-800 text-slate-300">Gemini 3.8 Flash Synthesis</span>
                      <span className="px-2 py-0.5 rounded bg-slate-950 border border-slate-800 text-slate-300">Phase Invariance Diagnostics</span>
                    </div>
                  </div>

                  <div className="flex flex-row lg:flex-col items-center sm:items-stretch gap-3 shrink-0">
                    <button
                      onClick={() => handleNavigate('app', 'horizon-chat')}
                      className="py-3 px-6 text-xs font-semibold text-slate-950 bg-purple-400 hover:bg-purple-300 rounded-lg transition-all flex items-center justify-center gap-2 whitespace-nowrap shadow-md font-mono"
                    >
                      <Sparkles className="w-4 h-4" />
                      <span>Open Global Chatbot</span>
                    </button>
                    <button
                      onClick={() => handleNavigate('app', 'ultra-triplet-codon')}
                      className="py-2.5 px-4 bg-slate-950 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white rounded-lg text-xs font-mono flex items-center justify-center gap-1.5 whitespace-nowrap"
                    >
                      <Dna className="w-3.5 h-3.5 text-cyan-400" />
                      <span>UTCT Engine</span>
                    </button>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Feature 1: SpliceSense Studio */}
                <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden hover:border-slate-700 transition-all flex flex-col justify-between group">
                  <div className="relative aspect-[16/9] w-full bg-slate-950 overflow-hidden">
                    <img
                      src="/src/assets/images/app_genomic_splicing_1791923357800.jpg"
                      alt="SpliceSense Splicing Studio"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                    <div className="absolute top-3 left-3 text-xs font-mono text-cyan-400 bg-slate-950/80 px-2 py-0.5 rounded border border-slate-800 backdrop-blur-sm">
                      Genomics
                    </div>
                  </div>

                  <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                        <span>/apps/splice-sense</span>
                        <span className="text-slate-400">v2.4.0</span>
                      </div>
                      <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                        SpliceSense Studio
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                        RNA Intron-Exon Splicing & Reading Frame Studio. Real-time sequence analyzer identifying 5' GU donor and 3' AG acceptor consensus motifs, triple-frame codon translation, and alternative splicing variants.
                      </p>
                    </div>

                    <div className="pt-4 border-t border-slate-800 flex items-center gap-3">
                      <button
                        onClick={() => handleNavigate('app', 'splice-sense')}
                        className="flex-1 py-2.5 px-4 text-xs font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-lg transition-colors flex items-center justify-center gap-2"
                      >
                        <Dna className="w-3.5 h-3.5" />
                        <span>Launch SpliceSense</span>
                      </button>
                      <button
                        onClick={() => handleNavigate('induction')}
                        className="py-2.5 px-3 bg-slate-950 border border-slate-800 hover:border-slate-700 text-slate-300 rounded-lg text-xs font-mono"
                        title="Induct to Vercel"
                      >
                        Induct
                      </button>
                    </div>
                  </div>
                </div>

                {/* Feature 2: BioLex Reader */}
                <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden hover:border-slate-700 transition-all flex flex-col justify-between group">
                  <div className="relative aspect-[16/9] w-full bg-slate-950 overflow-hidden">
                    <img
                      src="/src/assets/images/app_literature_reader_1791923357946.jpg"
                      alt="BioLex Literature Reader"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                    <div className="absolute top-3 left-3 text-xs font-mono text-cyan-400 bg-slate-950/80 px-2 py-0.5 rounded border border-slate-800 backdrop-blur-sm">
                      Literature Lab
                    </div>
                  </div>

                  <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                        <span>/apps/biolex-reader</span>
                        <span className="text-slate-400">v3.1.2</span>
                      </div>
                      <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                        BioLex Literature Reader
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                        High-bandwidth cognitive paper reader with Rapid Serial Visual Presentation (RSVP 150-900 WPM), Optimal Recognition Point (ORP) fixation markers, and automated hypothesis claim extraction.
                      </p>
                    </div>

                    <div className="pt-4 border-t border-slate-800 flex items-center gap-3">
                      <button
                        onClick={() => handleNavigate('app', 'biolex-reader')}
                        className="flex-1 py-2.5 px-4 text-xs font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-lg transition-colors flex items-center justify-center gap-2"
                      >
                        <FileText className="w-3.5 h-3.5" />
                        <span>Launch BioLex Reader</span>
                      </button>
                      <button
                        onClick={() => handleNavigate('induction')}
                        className="py-2.5 px-3 bg-slate-950 border border-slate-800 hover:border-slate-700 text-slate-300 rounded-lg text-xs font-mono"
                        title="Induct to Vercel"
                      >
                        Induct
                      </button>
                    </div>
                  </div>
                </div>

              </div>

              {/* THEORETICAL FRAMEWORK MATRIX: The Core Role of UTCT Across All Research */}
              <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-800 pb-4">
                  <div>
                    <div className="text-xs font-mono uppercase text-cyan-400 font-bold flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                      <span>THEORETICAL FOUNDATION & SCIENTIFIC ARCHITECTURE</span>
                    </div>
                    <h3 className="text-2xl font-bold text-white tracking-tight mt-1">
                      How Ultra Triplet Codon Theory Drives All Research Modules
                    </h3>
                  </div>
                  <button
                    onClick={() => handleNavigate('app', 'ultra-triplet-codon')}
                    className="text-xs font-mono text-cyan-400 hover:text-cyan-300 flex items-center gap-1.5"
                  >
                    <span>Launch Flagship Engine</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <p className="text-sm text-slate-300 leading-relaxed max-w-4xl">
                  Under classical genetics, codons are treated as isolated triplets mapping directly to amino acids. At Intron Reading Labs, our research demonstrates that eukaryotic pre-mRNA processing is governed by an overarching harmonic field: <strong>The Ultra Triplet Codon Theory (UTCT)</strong>. Every tool in our suite is an empirical laboratory instrument testing, applying, or clinically operationalizing this core paradigm:
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2.5 flex flex-col justify-between">
                    <div>
                      <div className="text-[10px] font-mono text-cyan-400 font-bold uppercase">POSTULATE I</div>
                      <h4 className="text-sm font-bold text-white mt-0.5">Split-Codon Phase Invariance</h4>
                      <p className="text-xs text-slate-400 leading-relaxed mt-1">
                        Introns divide coding exons at discrete phase boundaries (Phase 0, 1, 2) to protect frame invariance during exon duplication and skipping.
                      </p>
                    </div>
                    <button
                      onClick={() => handleNavigate('app', 'splice-sense')}
                      className="pt-2 text-xs font-mono text-cyan-400 hover:text-cyan-300 flex items-center gap-1 border-t border-slate-800/80"
                    >
                      <span>Verified in SpliceSense</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2.5 flex flex-col justify-between">
                    <div>
                      <div className="text-[10px] font-mono text-emerald-400 font-bold uppercase">POSTULATE II</div>
                      <h4 className="text-sm font-bold text-white mt-0.5">Supra-Codon ESE Resonance</h4>
                      <p className="text-xs text-slate-400 leading-relaxed mt-1">
                        Exonic Splicing Enhancers (ESEs) are harmonic purine triplets (GAR/AAG) that recruit U1 snRNP and SRSF1 spliceosome complexes.
                      </p>
                    </div>
                    <button
                      onClick={() => handleNavigate('app', 'ultra-triplet-codon')}
                      className="pt-2 text-xs font-mono text-emerald-400 hover:text-emerald-300 flex items-center gap-1 border-t border-slate-800/80"
                    >
                      <span>Mapped across 64 Codons</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2.5 flex flex-col justify-between">
                    <div>
                      <div className="text-[10px] font-mono text-amber-400 font-bold uppercase">POSTULATE III</div>
                      <h4 className="text-sm font-bold text-white mt-0.5">Ribosomal Velocity Landscapes</h4>
                      <p className="text-xs text-slate-400 leading-relaxed mt-1">
                        Triplet codon decoding rates (15–95 a.u.) program programmed cotranslational pause kinetics essential for protein folding domains.
                      </p>
                    </div>
                    <button
                      onClick={() => handleNavigate('app', 'cadence-lab')}
                      className="pt-2 text-xs font-mono text-amber-400 hover:text-amber-300 flex items-center gap-1 border-t border-slate-800/80"
                    >
                      <span>Trained in Cadence Lab</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2.5 flex flex-col justify-between">
                    <div>
                      <div className="text-[10px] font-mono text-purple-400 font-bold uppercase">POSTULATE IV</div>
                      <h4 className="text-sm font-bold text-white mt-0.5">Quantum Frame & ASO Rescue</h4>
                      <p className="text-xs text-slate-400 leading-relaxed mt-1">
                        Preserving the triplet reading frame prevents nonsense-mediated decay (NMD). Synthetic SSOs correct pathogenic frameshifts.
                      </p>
                    </div>
                    <button
                      onClick={() => handleNavigate('app', 'isoform-viewer')}
                      className="pt-2 text-xs font-mono text-purple-400 hover:text-purple-300 flex items-center gap-1 border-t border-slate-800/80"
                    >
                      <span>Simulated in IsoformMapper</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Callout to Induction Center */}
              <div className="p-8 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                <div className="space-y-2">
                  <div className="text-xs font-mono uppercase text-cyan-400">
                    VERCEL & GITHUB REPOSITORY SYNC
                  </div>
                  <h3 className="text-xl font-bold text-white">
                    Ready to induct your work to www.intronreadinglabs.com?
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
                    Access the complete induction console: verify your domain DNS CNAME records, inspect the generated `vercel.json` and build scripts, or copy the exact git commands to push to your repository.
                  </p>
                </div>

                <button
                  onClick={() => handleNavigate('induction')}
                  className="px-5 py-3 text-xs font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-lg transition-colors flex items-center gap-2 whitespace-nowrap shrink-0 shadow-sm"
                >
                  <UploadCloud className="w-4 h-4" />
                  <span>Open Induction Center</span>
                </button>
              </div>

            </div>
          </div>
        )}

        {/* Catalog View */}
        {activeView === 'catalog' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <AppCatalog
              onOpenApp={(appId) => handleNavigate('app', appId)}
              onOpenInduction={() => handleNavigate('induction')}
            />
          </div>
        )}

        {/* Single App View */}
        {activeView === 'app' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-6">
            
            {/* Breadcrumb Navigation */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <button
                onClick={() => handleNavigate('catalog')}
                className="flex items-center gap-2 text-xs font-mono text-slate-400 hover:text-white transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Return to Apps Catalog</span>
              </button>

              <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
                <span className="text-cyan-400">{currentAppMeta?.category}</span>
                <span>/</span>
                <span className="text-white font-semibold">{currentAppMeta?.name}</span>
              </div>
            </div>

            {/* App Render */}
            {selectedAppId === 'ultra-triplet-codon' && (
              <UltraTripletCodonApp
                onInductApp={() => handleNavigate('induction')}
                onOpenApp={(appId) => handleNavigate('app', appId)}
              />
            )}
            {selectedAppId === 'horizon-chat' && (
              <GlobalHorizonChatApp
                onInductApp={() => handleNavigate('induction')}
                onOpenApp={(appId) => handleNavigate('app', appId)}
              />
            )}
            {selectedAppId === 'splice-sense' && (
              <SpliceSenseApp
                onInductApp={() => handleNavigate('induction')}
                onOpenUtct={() => handleNavigate('app', 'ultra-triplet-codon')}
              />
            )}
            {selectedAppId === 'biolex-reader' && (
              <BioLexReaderApp
                onInductApp={() => handleNavigate('induction')}
                onOpenApp={(appId) => handleNavigate('app', appId)}
              />
            )}
            {selectedAppId === 'isoform-viewer' && (
              <IsoformVisualizerApp
                onInductApp={() => handleNavigate('induction')}
                onOpenApp={(appId) => handleNavigate('app', appId)}
              />
            )}
            {selectedAppId === 'cadence-lab' && (
              <ReadingCadenceApp
                onInductApp={() => handleNavigate('induction')}
                onOpenApp={(appId) => handleNavigate('app', appId)}
              />
            )}
            {selectedAppId === 'citation-graph' && (
              <KnowledgeGraphApp
                onInductApp={() => handleNavigate('induction')}
                onOpenApp={(appId) => handleNavigate('app', appId)}
              />
            )}

          </div>
        )}

        {/* Induction View */}
        {activeView === 'induction' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <InductionCenter onOpenApp={(appId) => handleNavigate('app', appId)} />
          </div>
        )}

      </main>

      {/* Institutional Footer */}
      <Footer onNavigateToInduction={() => handleNavigate('induction')} />

    </div>
  );
}
