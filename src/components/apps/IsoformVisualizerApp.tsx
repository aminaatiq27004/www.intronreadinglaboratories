import React, { useState } from 'react';
import { ArrowRight, CheckCircle, Info, Layers, RefreshCw, UploadCloud } from 'lucide-react';

interface IsoformConfig {
  id: string;
  name: string;
  type: string;
  structure: string;
  description: string;
  transcriptLength: number;
  readingFrame: 'In-Frame' | 'Frameshift' | 'Nonsense-Mediated Decay';
  expressionPercent: number;
  utctPhaseEffect: string;
}

const ISOFORMS: IsoformConfig[] = [
  {
    id: 'iso-1',
    name: 'Isoform Alpha (Canonical)',
    type: 'Constitutive Exon Inclusion',
    structure: 'Exon 1 (142bp) ➔ Exon 2 (186bp) ➔ Exon 3 (210bp)',
    description: 'Full-length wild-type transcript yielding the catalytic isoform.',
    transcriptLength: 538,
    readingFrame: 'In-Frame',
    expressionPercent: 68,
    utctPhaseEffect: 'Phase 0-0 Invariant: Full canonical triplet reading frame preserved across all junctions.'
  },
  {
    id: 'iso-2',
    name: 'Isoform Beta (Exon 2 Skipped)',
    type: 'Cassette Exon Exclusion',
    structure: 'Exon 1 (142bp) ➔ [Exon 2 Skipped] ➔ Exon 3 (210bp)',
    description: 'Alternative skipping of cassette Exon 2, deleting the transactivation domain.',
    transcriptLength: 352,
    readingFrame: 'In-Frame',
    expressionPercent: 21,
    utctPhaseEffect: 'Phase 1-1 Invariant: Exon 2 (186nt = 62 exact codons) skipping preserves Phase symmetry.'
  },
  {
    id: 'iso-3',
    name: 'Isoform Gamma (Intron 1 Retained)',
    type: 'Intron Retention',
    structure: 'Exon 1 (142bp) ➔ Retained Intron 1 (315bp) ➔ Exon 2 ➔ Exon 3',
    description: 'Incomplete splicing retains Intron 1, introducing an in-frame premature stop codon.',
    transcriptLength: 853,
    readingFrame: 'Nonsense-Mediated Decay',
    expressionPercent: 8,
    utctPhaseEffect: 'Phase Destruction: Retained intron introduces premature termination codon (PTC) at codon 58.'
  },
  {
    id: 'iso-4',
    name: 'Isoform Delta (Alternative 5\' Site)',
    type: 'Alternative Splice Donor',
    structure: 'Exon 1b (+45bp) ➔ Exon 2 (186bp) ➔ Exon 3 (210bp)',
    description: 'Activation of a cryptic 5\' splice donor inside Intron 1, extending Exon 1.',
    transcriptLength: 583,
    readingFrame: 'Frameshift',
    expressionPercent: 3,
    utctPhaseEffect: 'Phase 2 Shift: +45nt aberrant insertion alters downstream codon phase, inducing frameshift.'
  }
];

interface IsoformVisualizerAppProps {
  onInductApp: (appId: string) => void;
  onOpenApp?: (appId: string) => void;
}

export const IsoformVisualizerApp: React.FC<IsoformVisualizerAppProps> = ({ onInductApp, onOpenApp }) => {
  const [selectedIsoformId, setSelectedIsoformId] = useState<string>('iso-1');
  const [branchPointDistance, setBranchPointDistance] = useState<number>(28);

  const currentIsoform = ISOFORMS.find(i => i.id === selectedIsoformId) || ISOFORMS[0];

  return (
    <div className="space-y-8">
      
      {/* Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
            <span>TRANSCRIPT ARCHITECTURE</span>
            <span>·</span>
            <span>ISOFORMMAPPER v1.8.0</span>
            <span>·</span>
            <span>ALTERNATIVE SPLICING MODEL</span>
          </div>
          <h2 className="text-2xl font-bold text-white tracking-tight">
            Alternative Splicing & Transcript Isoform Simulator
          </h2>
          <p className="text-sm text-slate-300 max-w-2xl">
            Model cassette exon exclusion, intron retention events, and branch point adenosine positions across competing pre-mRNA transcript variants.
          </p>
        </div>

        <button
          onClick={() => onInductApp('isoform-viewer')}
          className="px-4 py-2 text-xs font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-lg transition-colors flex items-center gap-1.5 shadow-sm whitespace-nowrap"
        >
          <UploadCloud className="w-3.5 h-3.5" />
          <span>Induct to intronreadinglabs.com</span>
        </button>
      </div>

      {/* Isoform Selector Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {ISOFORMS.map((iso) => (
          <button
            key={iso.id}
            onClick={() => setSelectedIsoformId(iso.id)}
            className={`text-left p-4 rounded-xl border transition-all ${
              selectedIsoformId === iso.id
                ? 'bg-slate-800 border-cyan-500 shadow-md text-white'
                : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
            }`}
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-[11px] font-mono text-cyan-400">{iso.type}</span>
              <span className="text-[11px] font-mono text-slate-400 tabular-nums">{iso.expressionPercent}%</span>
            </div>
            <div className="font-bold text-sm text-white">{iso.name}</div>
            <div className="text-xs text-slate-400 mt-2 font-mono tabular-nums">
              Length: {iso.transcriptLength} bp
            </div>
          </button>
        ))}
      </div>

      {/* Main Diagram Area */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-8">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
          <div>
            <h3 className="text-lg font-bold text-white">{currentIsoform.name}</h3>
            <div className="text-xs text-slate-400 font-mono mt-1">
              {currentIsoform.structure}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className={`text-xs font-mono px-3 py-1 rounded border ${
              currentIsoform.readingFrame === 'In-Frame'
                ? 'bg-emerald-950/60 border-emerald-500/50 text-emerald-400'
                : currentIsoform.readingFrame === 'Frameshift'
                ? 'bg-amber-950/60 border-amber-500/50 text-amber-400'
                : 'bg-rose-950/60 border-rose-500/50 text-rose-400'
            }`}>
              {currentIsoform.readingFrame}
            </span>
          </div>
        </div>

        {/* Ultra Triplet Codon Phase Callout */}
        <div className="p-3.5 bg-slate-950 rounded-xl border border-cyan-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs font-mono">
          <div className="flex items-center gap-2">
            <span className="text-cyan-400 font-bold uppercase text-[11px] shrink-0">UTCT PHASE ANALYSIS:</span>
            <span className="text-slate-300 font-sans">{currentIsoform.utctPhaseEffect}</span>
          </div>
          {onOpenApp && (
            <button
              onClick={() => onOpenApp('ultra-triplet-codon')}
              className="py-1 px-2.5 rounded bg-cyan-950 border border-cyan-500/40 text-cyan-300 hover:text-white hover:border-cyan-400 transition-colors text-[11px] shrink-0 font-bold"
            >
              Simulate in UTCT Engine ➔
            </button>
          )}
        </div>

        {/* Visual Pre-mRNA & Splicing Arc Canvas */}
        <div className="p-6 bg-slate-950 rounded-xl border border-slate-800 space-y-6">
          <div className="text-xs font-mono text-slate-400 uppercase">
            Transcript Schematic & Spliceosome Arcs
          </div>

          <div className="relative pt-12 pb-6">
            
            {/* Splicing Junction Arcs (SVG) */}
            <svg className="w-full h-16 absolute top-0 left-0 pointer-events-none" viewBox="0 0 1000 60" preserveAspectRatio="none">
              {currentIsoform.id === 'iso-1' && (
                <>
                  <path d="M 200,55 Q 320,5 440,55" fill="none" stroke="#22d3ee" strokeWidth="2.5" strokeDasharray="4 2" />
                  <path d="M 560,55 Q 680,5 800,55" fill="none" stroke="#22d3ee" strokeWidth="2.5" strokeDasharray="4 2" />
                </>
              )}
              {currentIsoform.id === 'iso-2' && (
                <path d="M 200,55 Q 500,-15 800,55" fill="none" stroke="#f59e0b" strokeWidth="3" />
              )}
              {currentIsoform.id === 'iso-3' && (
                <path d="M 560,55 Q 680,10 800,55" fill="none" stroke="#f43f5e" strokeWidth="2" strokeDasharray="2 2" />
              )}
              {currentIsoform.id === 'iso-4' && (
                <>
                  <path d="M 260,55 Q 350,10 440,55" fill="none" stroke="#38bdf8" strokeWidth="2.5" />
                  <path d="M 560,55 Q 680,5 800,55" fill="none" stroke="#22d3ee" strokeWidth="2.5" strokeDasharray="4 2" />
                </>
              )}
            </svg>

            {/* Gene Blocks */}
            <div className="flex items-center gap-2 w-full">
              {/* Exon 1 */}
              <div className="flex-[2] h-12 bg-cyan-950/80 border border-cyan-500 rounded flex items-center justify-center font-mono text-xs font-bold text-cyan-300">
                Exon 1 (142bp)
              </div>

              {/* Intron 1 or connector */}
              {currentIsoform.id === 'iso-3' ? (
                <div className="flex-[3] h-12 bg-rose-950/80 border border-rose-500/80 rounded flex items-center justify-center font-mono text-xs font-bold text-rose-300">
                  Retained Intron 1 (315bp)
                </div>
              ) : (
                <div className="flex-[3] h-2 bg-slate-800 relative flex items-center justify-center">
                  <span className="text-[10px] font-mono text-slate-400 absolute -bottom-5">
                    Intron 1 (315bp)
                  </span>
                </div>
              )}

              {/* Exon 2 */}
              {currentIsoform.id !== 'iso-2' ? (
                <div className="flex-[2.5] h-12 bg-cyan-950/80 border border-cyan-500 rounded flex items-center justify-center font-mono text-xs font-bold text-cyan-300">
                  Exon 2 (186bp)
                </div>
              ) : (
                <div className="flex-[2.5] h-12 border-2 border-dashed border-amber-500/40 rounded flex items-center justify-center font-mono text-xs text-amber-400/60">
                  Exon 2 (Skipped)
                </div>
              )}

              {/* Intron 2 */}
              <div className="flex-[3] h-2 bg-slate-800 relative flex items-center justify-center">
                <span className="text-[10px] font-mono text-slate-400 absolute -bottom-5">
                  Intron 2 (410bp)
                </span>
              </div>

              {/* Exon 3 */}
              <div className="flex-[3] h-12 bg-cyan-950/80 border border-cyan-500 rounded flex items-center justify-center font-mono text-xs font-bold text-cyan-300">
                Exon 3 (210bp)
              </div>
            </div>

          </div>

          <div className="pt-2 text-xs text-slate-300 leading-relaxed">
            {currentIsoform.description}
          </div>
        </div>

        {/* Branch Point Control */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
          
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-slate-300 uppercase">Branch Site 'A' Distance to 3' AG:</span>
              <span className="text-cyan-400 font-bold tabular-nums">{branchPointDistance} nt</span>
            </div>
            <input
              type="range"
              min={18}
              max={45}
              value={branchPointDistance}
              onChange={(e) => setBranchPointDistance(Number(e.target.value))}
              className="w-full accent-cyan-400"
            />
            <p className="text-[11px] text-slate-400 leading-normal">
              Optimal branch point adenosine is located 20-35 nucleotides upstream of the 3' AG splice acceptor. Deviations outside this window impede U2 snRNP binding.
            </p>
          </div>

          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2 font-mono text-xs">
            <div className="text-slate-300 uppercase font-semibold">Phenotypic Outcome</div>
            <div className="flex justify-between border-b border-slate-900 pb-1.5">
              <span className="text-slate-400">Mature Length:</span>
              <span className="text-white tabular-nums">{currentIsoform.transcriptLength} nucleotides</span>
            </div>
            <div className="flex justify-between border-b border-slate-900 pb-1.5">
              <span className="text-slate-400">Cellular Abundance:</span>
              <span className="text-cyan-400 tabular-nums">{currentIsoform.expressionPercent}% total pool</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">NMD Trigger:</span>
              <span className={currentIsoform.readingFrame.includes('Nonsense') ? 'text-rose-400' : 'text-emerald-400'}>
                {currentIsoform.readingFrame.includes('Nonsense') ? 'Yes (Degraded)' : 'No (Translated)'}
              </span>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
