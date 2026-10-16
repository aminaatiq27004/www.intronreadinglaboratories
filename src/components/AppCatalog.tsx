import React, { useState } from 'react';
import { LAB_APPS } from '../data/mockData';
import { AppCategory, LabApp } from '../types';
import { ArrowRight, CheckCircle2, Dna, FileText, Layers, UploadCloud } from 'lucide-react';

interface AppCatalogProps {
  onOpenApp: (appId: string) => void;
  onOpenInduction: () => void;
}

export const AppCatalog: React.FC<AppCatalogProps> = ({ onOpenApp, onOpenInduction }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Core Theory', 'Global Network', 'Genomics', 'Literature Lab', 'Cognitive Reading', 'Bioinformatics'];

  const filteredApps = selectedCategory === 'All'
    ? LAB_APPS
    : LAB_APPS.filter(app => app.category === selectedCategory);

  return (
    <div className="space-y-8">
      
      {/* Category header & segmented controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="text-xs font-mono uppercase text-cyan-400 font-bold flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span>RESEARCH SUITE & COMPUTATIONAL LABS</span>
          </div>
          <h2 className="text-2xl font-bold text-white tracking-tight mt-1">
            Applications & Theoretical Research Workbenches
          </h2>
          <p className="text-sm text-slate-400 mt-1">
            Anchored by the Ultra Triplet Codon Theory (UTCT) — exploring splicing mechanics, cognitive reading, and genomic therapeutics.
          </p>
        </div>

        {/* Filter buttons */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-900 rounded-lg border border-slate-800">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 text-xs font-medium rounded transition-colors ${
                selectedCategory === cat
                  ? 'bg-cyan-400 text-slate-950 font-bold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Flagship Core Theory Framework Callout */}
      {(selectedCategory === 'All' || selectedCategory === 'Core Theory') && (
        <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-cyan-950/40 border border-cyan-500/40 rounded-xl p-6 sm:p-7 space-y-4 shadow-xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div className="space-y-1">
              <span className="text-[11px] font-mono font-bold text-cyan-400 uppercase tracking-wider px-2 py-0.5 rounded bg-cyan-950 border border-cyan-500/40">
                CORE WORK UNDER RESEARCH
              </span>
              <h3 className="text-xl font-bold text-white tracking-tight mt-2">
                Ultra Triplet Codon Theory (UTCT): The Central Scientific Axis
              </h3>
            </div>
            <button
              onClick={() => onOpenApp('ultra-triplet-codon')}
              className="py-2.5 px-4 text-xs font-bold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-lg transition-colors flex items-center gap-2 whitespace-nowrap self-start md:self-auto shadow-md shadow-cyan-500/20"
            >
              <span>Launch UTCT Core Engine</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-4xl">
            In classical genetics, the 64-codon table is treated as a simple translation dictionary. Under the <strong>Ultra Triplet Codon Theory</strong> developed at Intron Reading Labs, codons possess supra-translational harmonic resonance: dictating exact intron-exon junction phase invariance (Phases 0, 1, 2), spliceosome snRNP recruitment affinities, and cotranslational pause kinetics. All 5 companion tools below serve as empirical testbeds, literature portals, and clinical models verifying this central paradigm.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5 pt-1 text-[11px] font-mono">
            <div className="p-2.5 rounded bg-slate-950 border border-slate-800">
              <span className="text-cyan-400 font-bold block">SpliceSense</span>
              <span className="text-slate-400 text-[10px]">Phase & Motif Test</span>
            </div>
            <div className="p-2.5 rounded bg-slate-950 border border-slate-800">
              <span className="text-cyan-400 font-bold block">BioLex Reader</span>
              <span className="text-slate-400 text-[10px]">UTCT Paper & Claims</span>
            </div>
            <div className="p-2.5 rounded bg-slate-950 border border-slate-800">
              <span className="text-cyan-400 font-bold block">IsoformMapper</span>
              <span className="text-slate-400 text-[10px]">Phase Symmetry Shift</span>
            </div>
            <div className="p-2.5 rounded bg-slate-950 border border-slate-800">
              <span className="text-cyan-400 font-bold block">Cadence Lab</span>
              <span className="text-slate-400 text-[10px]">3-Token Saccade Homology</span>
            </div>
            <div className="p-2.5 rounded bg-slate-950 border border-slate-800 col-span-2 sm:col-span-1">
              <span className="text-cyan-400 font-bold block">BioGraph Explorer</span>
              <span className="text-slate-400 text-[10px]">Corpus Milestone Tree</span>
            </div>
          </div>
        </div>
      )}

      {/* Grid of Apps */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredApps.map((app) => (
          <div
            key={app.id}
            className={`bg-slate-900 border rounded-xl overflow-hidden flex flex-col justify-between hover:border-slate-700 transition-all duration-300 group ${
              app.isCoreTheory ? 'border-cyan-500/50 shadow-lg shadow-cyan-950/40 ring-1 ring-cyan-500/20' : 'border-slate-800'
            }`}
          >
            {/* Visual Header / Image if available */}
            {app.image ? (
              <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-950">
                <img
                  src={app.image}
                  alt={app.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />
                <div className="absolute top-3 left-3 text-[11px] font-mono text-cyan-400 bg-slate-950/80 px-2 py-0.5 rounded border border-slate-800 backdrop-blur-sm flex items-center gap-1.5">
                  {app.isCoreTheory && <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />}
                  <span>{app.category}</span>
                </div>
              </div>
            ) : (
              <div className="p-5 border-b border-slate-800 bg-slate-950/40 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded bg-cyan-950 border border-cyan-500/40 flex items-center justify-center text-cyan-400 font-mono text-xs font-bold">
                    {app.name.slice(0, 2).toUpperCase()}
                  </div>
                  <span className="text-xs font-mono text-cyan-400">{app.category}</span>
                </div>
                <span className="text-xs font-mono text-slate-400">{app.version}</span>
              </div>
            )}

            {/* Content Body */}
            <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
              
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
                  <span>{app.routeSlug}</span>
                  <span className="text-emerald-400 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>Vercel Synced</span>
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
                  {app.name}
                </h3>
                
                <p className="text-xs text-slate-400 leading-relaxed line-clamp-3">
                  {app.description}
                </p>

                {/* UTCT Scientific Role Tag */}
                <div className="pt-2">
                  <div className="text-[11px] font-mono px-2.5 py-1.5 rounded-lg bg-slate-950 border border-cyan-500/30 text-slate-300 flex items-center gap-1.5">
                    <span className="text-cyan-400 font-bold shrink-0 text-[10px] uppercase">UTCT Role:</span>
                    <span className="truncate text-[10px] text-cyan-200">
                      {app.id === 'ultra-triplet-codon' && 'Flagship Theoretical Ground Truth & 64-Codon Harmonic Engine'}
                      {app.id === 'horizon-chat' && 'Worldwide Researcher Synthesis & Post-Corona Uplift AI Conduit'}
                      {app.id === 'splice-sense' && 'Empirical Verification of Postulate I (Phase) & Postulate II (ESE)'}
                      {app.id === 'biolex-reader' && '3-Token Cognitive Parsing & UTCT Nature Publication Claims'}
                      {app.id === 'isoform-viewer' && 'Alternative Splicing Phase Symmetry & Frame Integrity Model'}
                      {app.id === 'cadence-lab' && 'Cognitive Saccade Homology to Ribosomal 3-Token Pacing'}
                      {app.id === 'citation-graph' && 'Historical Genomic Timeline Rooted in 2026 UTCT Discovery'}
                    </span>
                  </div>
                </div>

                {/* Highlights List */}
                <div className="pt-2 space-y-1.5 border-t border-slate-800/80">
                  {app.highlights.slice(0, 3).map((item, idx) => (
                    <div key={idx} className="text-[11px] text-slate-400 flex items-center gap-1.5 truncate">
                      <span className="w-1 h-1 rounded-full bg-cyan-400 shrink-0" />
                      <span className="truncate">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-slate-800 flex items-center gap-2">
                <button
                  onClick={() => onOpenApp(app.id)}
                  className="flex-1 py-2 px-3 text-xs font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-lg transition-colors flex items-center justify-center gap-1.5 shadow-sm"
                >
                  <span>Launch Application</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={onOpenInduction}
                  className="p-2 text-slate-400 hover:text-white rounded-lg bg-slate-950 border border-slate-800 hover:border-slate-700 transition-colors"
                  title="Induct / Export to GitHub"
                >
                  <UploadCloud className="w-4 h-4 text-cyan-400" />
                </button>
              </div>

            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
