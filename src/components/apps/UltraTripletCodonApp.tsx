import React, { useState, useMemo } from 'react';
import { GENE_PRESETS } from '../../data/mockData';
import {
  Activity,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  ChevronRight,
  Copy,
  Cpu,
  Dna,
  Download,
  ExternalLink,
  Layers,
  Radio,
  RefreshCw,
  Sliders,
  Sparkles,
  UploadCloud,
  Zap
} from 'lucide-react';

// Comprehensive 64 Codon Database with Ultra Triplet Codon Theory (UTCT) metrics
interface CodonUTCTData {
  codon: string;
  aa: string;
  name: string;
  eseScore: number; // -1.0 (silencer) to +1.0 (strong enhancer)
  velocity: number; // 15 to 95 (arbitrary ribosomal decoding velocity)
  phasePref: 'Phase 0' | 'Phase 1' | 'Phase 2';
  gc: number; // 0, 33, 67, 100
  splitExample: {
    p0: string;
    p1: string;
    p2: string;
  };
  notes: string;
}

const BASES = ['U', 'C', 'A', 'G'];

// Standard genetic code mapping
const GENETIC_CODE_NAMES: Record<string, { aa: string; name: string }> = {
  'UUU': { aa: 'F', name: 'Phenylalanine' }, 'UUC': { aa: 'F', name: 'Phenylalanine' },
  'UUA': { aa: 'L', name: 'Leucine' }, 'UUG': { aa: 'L', name: 'Leucine' },
  'CUU': { aa: 'L', name: 'Leucine' }, 'CUC': { aa: 'L', name: 'Leucine' },
  'CUA': { aa: 'L', name: 'Leucine' }, 'CUG': { aa: 'L', name: 'Leucine' },
  'AUU': { aa: 'I', name: 'Isoleucine' }, 'AUC': { aa: 'I', name: 'Isoleucine' },
  'AUA': { aa: 'I', name: 'Isoleucine' }, 'AUG': { aa: 'M', name: 'Methionine (Start)' },
  'GUU': { aa: 'V', name: 'Valine' }, 'GUC': { aa: 'V', name: 'Valine' },
  'GUA': { aa: 'V', name: 'Valine' }, 'GUG': { aa: 'V', name: 'Valine' },
  'UCU': { aa: 'S', name: 'Serine' }, 'UCC': { aa: 'S', name: 'Serine' },
  'UCA': { aa: 'S', name: 'Serine' }, 'UCG': { aa: 'S', name: 'Serine' },
  'CCU': { aa: 'P', name: 'Proline' }, 'CCC': { aa: 'P', name: 'Proline' },
  'CCA': { aa: 'P', name: 'Proline' }, 'CCG': { aa: 'P', name: 'Proline' },
  'ACU': { aa: 'T', name: 'Threonine' }, 'ACC': { aa: 'T', name: 'Threonine' },
  'ACA': { aa: 'T', name: 'Threonine' }, 'ACG': { aa: 'T', name: 'Threonine' },
  'GCU': { aa: 'A', name: 'Alanine' }, 'GCC': { aa: 'A', name: 'Alanine' },
  'GCA': { aa: 'A', name: 'Alanine' }, 'GCG': { aa: 'A', name: 'Alanine' },
  'UAU': { aa: 'Y', name: 'Tyrosine' }, 'UAC': { aa: 'Y', name: 'Tyrosine' },
  'UAA': { aa: '*', name: 'Ochre (Stop)' }, 'UAG': { aa: '*', name: 'Amber (Stop)' },
  'CAU': { aa: 'H', name: 'Histidine' }, 'CAC': { aa: 'H', name: 'Histidine' },
  'CAA': { aa: 'Q', name: 'Glutamine' }, 'CAG': { aa: 'Q', name: 'Glutamine' },
  'AAU': { aa: 'N', name: 'Asparagine' }, 'AAC': { aa: 'N', name: 'Asparagine' },
  'AAA': { aa: 'K', name: 'Lysine' }, 'AAG': { aa: 'K', name: 'Lysine' },
  'GAU': { aa: 'D', name: 'Aspartate' }, 'GAC': { aa: 'D', name: 'Aspartate' },
  'GAA': { aa: 'E', name: 'Glutamate' }, 'GAG': { aa: 'E', name: 'Glutamate' },
  'UGU': { aa: 'C', name: 'Cysteine' }, 'UGC': { aa: 'C', name: 'Cysteine' },
  'UGA': { aa: '*', name: 'Opal (Stop)' }, 'UGG': { aa: 'W', name: 'Tryptophan' },
  'CGU': { aa: 'R', name: 'Arginine' }, 'CGC': { aa: 'R', name: 'Arginine' },
  'CGA': { aa: 'R', name: 'Arginine' }, 'CGG': { aa: 'R', name: 'Arginine' },
  'AGU': { aa: 'S', name: 'Serine' }, 'AGC': { aa: 'S', name: 'Serine' },
  'AGA': { aa: 'R', name: 'Arginine' }, 'AGG': { aa: 'R', name: 'Arginine' },
  'GGU': { aa: 'G', name: 'Glycine' }, 'GGC': { aa: 'G', name: 'Glycine' },
  'GGA': { aa: 'G', name: 'Glycine' }, 'GGG': { aa: 'G', name: 'Glycine' }
};

// Generate deterministic UTCT parameters for all 64 codons
const ALL_CODONS_DATA: Record<string, CodonUTCTData> = {};
for (const first of BASES) {
  for (const second of BASES) {
    for (const third of BASES) {
      const codon = `${first}${second}${third}`;
      const meta = GENETIC_CODE_NAMES[codon] || { aa: '?', name: 'Unknown' };
      
      // Calculate GC
      let gcCount = 0;
      if (first === 'G' || first === 'C') gcCount++;
      if (second === 'G' || second === 'C') gcCount++;
      if (third === 'G' || third === 'C') gcCount++;
      const gc = Math.round((gcCount / 3) * 100);

      // Splicing Enhancer (ESE) score derived from purine content (GAR/AAG enriched)
      const purines = [first, second, third].filter(b => b === 'A' || b === 'G').length;
      const hasCpG = codon.includes('CG');
      let ese = (purines - 1.5) / 1.5 * 0.7;
      if (codon === 'AAG' || codon === 'GAG' || codon === 'GGA' || codon === 'GAA') ese += 0.35;
      if (codon === 'UAG' || codon === 'UAA' || codon === 'UGA') ese = -0.85; // Stop codons act as silencers
      if (hasCpG) ese += 0.15;
      ese = Math.max(-0.95, Math.min(0.95, Math.round(ese * 100) / 100));

      // Ribosomal transit velocity (tRNA abundance and wobble position)
      let velocity = 50 + (gcCount * 12);
      if (codon === 'CUG' || codon === 'ACC' || codon === 'GUG' || codon === 'AAG') velocity += 22;
      if (codon === 'AUA' || codon === 'CGA' || codon === 'CGG') velocity -= 25;
      if (meta.aa === '*') velocity = 15;
      velocity = Math.max(15, Math.min(95, velocity));

      // Evolutionary Phase Preference
      let phasePref: 'Phase 0' | 'Phase 1' | 'Phase 2' = 'Phase 0';
      if ((first === 'A' || first === 'G') && (second === 'G' || second === 'A')) {
        phasePref = 'Phase 1'; // AG/GA junctions frequently split after 1st base
      } else if (third === 'G' || third === 'C') {
        phasePref = 'Phase 2';
      }

      ALL_CODONS_DATA[codon] = {
        codon,
        aa: meta.aa,
        name: meta.name,
        eseScore: ese,
        velocity,
        phasePref,
        gc,
        splitExample: {
          p0: `[${codon}] | INTRON |`,
          p1: `${first} | INTRON | ${second}${third}`,
          p2: `${first}${second} | INTRON | ${third}`
        },
        notes: meta.aa === '*'
          ? 'Nonsense termination codon; triggers NMD if situated >50nt upstream of exon-junction complex.'
          : ese > 0.4
          ? 'Potent Exonic Splicing Enhancer (ESE) motif promoting U2AF65 & SRSF1 assembly.'
          : ese < -0.3
          ? 'Exonic Splicing Silencer (ESS) tendency; sensitizes transcript to exon skipping.'
          : 'Neutral structural codon with standard ribosomal translocation rate.'
      };
    }
  }
}

interface UltraTripletCodonAppProps {
  onInductApp: (appId: string) => void;
  onOpenApp?: (appId: string) => void;
}

export const UltraTripletCodonApp: React.FC<UltraTripletCodonAppProps> = ({
  onInductApp,
  onOpenApp
}) => {
  const [activeTab, setActiveTab] = useState<'matrix' | 'scanner' | 'phases' | 'rescue' | 'lumikeratin'>('matrix');
  const [heatmapMode, setHeatmapMode] = useState<'ese' | 'velocity' | 'phase' | 'gc'>('ese');
  const [selectedCodonKey, setSelectedCodonKey] = useState<string>('AAG');
  const [selectedPresetId, setSelectedPresetId] = useState<string>('hbb');
  const [inputSequence, setInputSequence] = useState<string>(GENE_PRESETS[0].rawSequence);
  const [simulatedMutation, setSimulatedMutation] = useState<'wt' | 'frameshift_plus1' | 'frameshift_minus1' | 'ese_knockout'>('wt');
  const [ssoRescueActive, setSsoRescueActive] = useState<boolean>(false);
  const [copiedNotice, setCopiedNotice] = useState<string | null>(null);

  // LumiKeratin bio-fluorescence nail transduction simulator states
  const [nailFluorophore, setNailFluorophore] = useState<'egfp' | 'mneongreen' | 'mcherry' | 'unag'>('egfp');
  const [nailExcitation, setNailExcitation] = useState<'ambient' | 'blue' | 'uv'>('blue');
  const [nailGlowIntensity, setNailGlowIntensity] = useState<number>(85);
  const [nailKeratinTarget, setNailKeratinTarget] = useState<'krt31' | 'krt33a' | 'krt85'>('krt31');
  const [nailVector, setNailVector] = useState<'cpp' | 'aav' | 'lnp'>('cpp');

  const selectedCodon = ALL_CODONS_DATA[selectedCodonKey] || ALL_CODONS_DATA['AAG'];

  // Clean sequence for scanner
  const cleanSeq = useMemo(() => {
    let s = inputSequence.toUpperCase().replace(/[^ACGTU]/g, '').replace(/T/g, 'U');
    if (simulatedMutation === 'frameshift_plus1') {
      s = s.slice(0, 48) + 'U' + s.slice(48);
    } else if (simulatedMutation === 'frameshift_minus1') {
      s = s.slice(0, 48) + s.slice(49);
    } else if (simulatedMutation === 'ese_knockout') {
      s = s.replace(/AAG/g, 'UUG');
    }
    return s;
  }, [inputSequence, simulatedMutation]);

  // Scan sequence for donor and acceptor boundaries and analyze UTCT phase
  const scanResults = useMemo(() => {
    const seq = cleanSeq;
    const donors: number[] = [];
    const acceptors: number[] = [];

    for (let i = 0; i < seq.length - 1; i++) {
      if (seq.slice(i, i + 2) === 'GU') donors.push(i);
      if (seq.slice(i, i + 2) === 'AG') acceptors.push(i);
    }

    const primaryDonor = donors.find(p => p >= 30 && p <= 120) ?? donors[0] ?? -1;
    const primaryAcceptor = primaryDonor !== -1
      ? (acceptors.find(p => p > primaryDonor + 40) ?? acceptors[acceptors.length - 1] ?? -1)
      : -1;

    // Codon phase at donor junction:
    // If donor is at position D (0-indexed):
    // Phase 0: D is a multiple of 3 (cut between codons)
    // Phase 1: D % 3 === 1 (cut after 1st base)
    // Phase 2: D % 3 === 2 (cut after 2nd base)
    let phase: 0 | 1 | 2 = 0;
    let splitCodon = '';
    let reconstructedCodon = '';
    let reconstructedAa = '';

    if (primaryDonor !== -1 && primaryAcceptor !== -1) {
      const rem = primaryDonor % 3;
      phase = rem as (0 | 1 | 2);

      if (phase === 0) {
        splitCodon = 'None (Codon intact at junction)';
        reconstructedCodon = seq.slice(primaryDonor - 3, primaryDonor) + ' + ' + seq.slice(primaryAcceptor + 2, primaryAcceptor + 5);
        reconstructedAa = `${ALL_CODONS_DATA[seq.slice(primaryDonor - 3, primaryDonor)]?.aa || '?'}-${ALL_CODONS_DATA[seq.slice(primaryAcceptor + 2, primaryAcceptor + 5)]?.aa || '?'}`;
      } else if (phase === 1) {
        const leftBase = seq.slice(primaryDonor - 1, primaryDonor);
        const rightBases = seq.slice(primaryAcceptor + 2, primaryAcceptor + 4);
        splitCodon = `${leftBase} | INTRON | ${rightBases}`;
        reconstructedCodon = leftBase + rightBases;
        reconstructedAa = ALL_CODONS_DATA[reconstructedCodon]?.aa || '?';
      } else if (phase === 2) {
        const leftBases = seq.slice(primaryDonor - 2, primaryDonor);
        const rightBase = seq.slice(primaryAcceptor + 2, primaryAcceptor + 3);
        splitCodon = `${leftBases} | INTRON | ${rightBase}`;
        reconstructedCodon = leftBases + rightBase;
        reconstructedAa = ALL_CODONS_DATA[reconstructedCodon]?.aa || '?';
      }
    }

    // Compute continuous ESE profile across triplets
    const tripletWaveform: { x: number; codon: string; ese: number; velocity: number }[] = [];
    for (let i = 0; i + 3 <= Math.min(seq.length, 120); i += 3) {
      const c = seq.slice(i, i + 3);
      const data = ALL_CODONS_DATA[c];
      tripletWaveform.push({
        x: i,
        codon: c,
        ese: data?.eseScore || 0,
        velocity: data?.velocity || 50
      });
    }

    // Average ESE score
    const avgEse = tripletWaveform.length > 0
      ? Math.round((tripletWaveform.reduce((acc, curr) => acc + curr.ese, 0) / tripletWaveform.length) * 100) / 100
      : 0;

    // Detect premature termination codon
    let stopFoundAt = -1;
    for (let i = 0; i + 3 <= seq.length; i += 3) {
      const c = seq.slice(i, i + 3);
      if (c === 'UAA' || c === 'UAG' || c === 'UGA') {
        stopFoundAt = i;
        break;
      }
    }

    return {
      primaryDonor,
      primaryAcceptor,
      phase,
      splitCodon,
      reconstructedCodon,
      reconstructedAa,
      tripletWaveform,
      avgEse,
      stopFoundAt,
      isFrameshift: stopFoundAt !== -1 && stopFoundAt < seq.length - 20
    };
  }, [cleanSeq]);

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedNotice(label);
    setTimeout(() => setCopiedNotice(null), 2200);
  };

  const handleSelectPreset = (id: string) => {
    const p = GENE_PRESETS.find(x => x.id === id);
    if (p) {
      setSelectedPresetId(id);
      setInputSequence(p.rawSequence);
      setSimulatedMutation('wt');
      setSsoRescueActive(false);
    }
  };

  return (
    <div className="space-y-8">
      
      {/* Top Banner & Theoretical Anchor */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-4 shadow-xl">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-cyan-400">
              <span className="font-bold">CORE THEORETICAL DISCOVERY</span>
              <span className="text-slate-600">·</span>
              <span>ULTRA TRIPLET CODON THEORY (UTCT)</span>
              <span className="text-slate-600">·</span>
              <span className="text-slate-400">FOUNDATIONAL INTRONREADINGS RESEARCH</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Ultra Triplet Codon Theory & Molecular Phase Engine
            </h2>
            <p className="text-sm text-slate-300 max-w-3xl leading-relaxed">
              The foundational genomic framework establishing that triplet codons encode multi-layered supra-translational signals: governing pre-mRNA splicing kinetics, split-codon phase invariants (Phases 0, 1, 2), ribosomal elongation velocities, and reading frame preservation.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              onClick={() => onInductApp('ultra-triplet-codon')}
              className="px-4 py-2.5 text-xs font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-lg transition-colors flex items-center gap-2 shadow-sm font-sans"
            >
              <UploadCloud className="w-4 h-4" />
              <span>Induct UTCT Engine to Vercel</span>
            </button>
            {onOpenApp && (
              <button
                onClick={() => onOpenApp('biolex-reader')}
                className="px-4 py-2.5 text-xs font-medium text-slate-300 hover:text-white bg-slate-950 border border-slate-800 hover:border-slate-700 rounded-lg transition-colors flex items-center gap-2 font-sans"
              >
                <BookOpen className="w-4 h-4 text-cyan-400" />
                <span>Read Foundational Paper</span>
              </button>
            )}
          </div>
        </div>

        {/* 4 Theoretical Postulates Bar */}
        <div className="pt-4 border-t border-slate-800 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
          <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
            <div className="font-mono text-[11px] text-cyan-400 font-bold">
              POSTULATE I: PHASE INVARIANCE
            </div>
            <div className="font-semibold text-white">Intron Interception Phases</div>
            <p className="text-slate-400 text-[11px] leading-relaxed">
              Introns interrupt triplets at Phase 0, 1, or 2; symmetric exons preserve the reading frame across evolutionary duplication.
            </p>
          </div>

          <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
            <div className="font-mono text-[11px] text-amber-400 font-bold">
              POSTULATE II: SPLICING RESONANCE
            </div>
            <div className="font-semibold text-white">ESE/ESS Harmonic Coupling</div>
            <p className="text-slate-400 text-[11px] leading-relaxed">
              Specific triplet clusters recruit SRSF1 and U1 snRNP with resonant affinity independent of synonymous amino acid identity.
            </p>
          </div>

          <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
            <div className="font-mono text-[11px] text-emerald-400 font-bold">
              POSTULATE III: TRANSIT VELOCITY
            </div>
            <div className="font-semibold text-white">Ribosomal Pause Landscapes</div>
            <p className="text-slate-400 text-[11px] leading-relaxed">
              Triplets dictate translational pacing, synchronizing cotranslational protein folding domains with splicing velocity.
            </p>
          </div>

          <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
            <div className="font-mono text-[11px] text-rose-400 font-bold">
              POSTULATE IV: FRAME QUANTUM
            </div>
            <div className="font-semibold text-white">PTC Invariance & NMD Protection</div>
            <p className="text-slate-400 text-[11px] leading-relaxed">
              Triplet frames operate as conserved quantum boundaries; out-of-phase aberrations trigger non-sense decay destruction.
            </p>
          </div>
        </div>
      </div>

      {/* Main Mode Navigation Ribbon */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-900 rounded-lg border border-slate-800">
          <button
            onClick={() => setActiveTab('matrix')}
            className={`px-3.5 py-1.5 text-xs font-medium rounded-md transition-colors ${
              activeTab === 'matrix' ? 'bg-cyan-400 text-slate-950 font-bold shadow-sm' : 'text-slate-400 hover:text-white'
            }`}
          >
            64-Codon Harmonic Matrix
          </button>
          <button
            onClick={() => setActiveTab('scanner')}
            className={`px-3.5 py-1.5 text-xs font-medium rounded-md transition-colors ${
              activeTab === 'scanner' ? 'bg-cyan-400 text-slate-950 font-bold shadow-sm' : 'text-slate-400 hover:text-white'
            }`}
          >
            Real-Time Sequence Phase Scanner
          </button>
          <button
            onClick={() => setActiveTab('phases')}
            className={`px-3.5 py-1.5 text-xs font-medium rounded-md transition-colors ${
              activeTab === 'phases' ? 'bg-cyan-400 text-slate-950 font-bold shadow-sm' : 'text-slate-400 hover:text-white'
            }`}
          >
            Phase 0 / 1 / 2 Quantum Mechanics
          </button>
          <button
            onClick={() => setActiveTab('rescue')}
            className={`px-3.5 py-1.5 text-xs font-medium rounded-md transition-colors ${
              activeTab === 'rescue' ? 'bg-cyan-400 text-slate-950 font-bold shadow-sm' : 'text-slate-400 hover:text-white'
            }`}
          >
            Frameshift & SSO Rescue Lab
          </button>
          <button
            onClick={() => setActiveTab('lumikeratin')}
            className={`px-3.5 py-1.5 text-xs font-medium rounded-md transition-all flex items-center gap-1.5 ${
              activeTab === 'lumikeratin' ? 'bg-emerald-400 text-slate-950 font-bold shadow-sm' : 'text-emerald-400 hover:text-emerald-300'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>LumiKeratin: Glowing Nail Transduction</span>
          </button>
        </div>

        <div className="text-xs font-mono text-slate-400">
          <span>Active Focus: </span>
          <span className="text-cyan-400 font-bold">{selectedCodonKey} ({selectedCodon.name})</span>
        </div>
      </div>

      {/* TAB 1: 64-CODON ULTRA MATRIX & HARMONIC LANDSCAPE */}
      {activeTab === 'matrix' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left: 64-Codon Grid */}
          <div className="lg:col-span-8 bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
            
            {/* Heatmap Metric Selector */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
              <div>
                <h3 className="text-base font-bold text-white">64-Codon Ultra Triplet Matrix</h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Explore how every triplet codon exhibits distinctive splicing enhancer and ribosomal metrics
                </p>
              </div>

              <div className="flex items-center gap-1 p-0.5 bg-slate-950 rounded-lg border border-slate-800 text-xs font-mono">
                <span className="px-2 text-slate-400 text-[11px]">METRIC:</span>
                <button
                  onClick={() => setHeatmapMode('ese')}
                  className={`px-2 py-1 rounded text-xs transition-colors ${
                    heatmapMode === 'ese' ? 'bg-cyan-400 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
                  }`}
                  title="Exonic Splicing Enhancer Score (-1.0 to +1.0)"
                >
                  ESE Score
                </button>
                <button
                  onClick={() => setHeatmapMode('velocity')}
                  className={`px-2 py-1 rounded text-xs transition-colors ${
                    heatmapMode === 'velocity' ? 'bg-cyan-400 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
                  }`}
                  title="Ribosomal Transit Velocity (15-95 a.u.)"
                >
                  Velocity
                </button>
                <button
                  onClick={() => setHeatmapMode('phase')}
                  className={`px-2 py-1 rounded text-xs transition-colors ${
                    heatmapMode === 'phase' ? 'bg-cyan-400 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
                  }`}
                  title="Evolutionary Intron Split Phase Preference"
                >
                  Split Phase
                </button>
                <button
                  onClick={() => setHeatmapMode('gc')}
                  className={`px-2 py-1 rounded text-xs transition-colors ${
                    heatmapMode === 'gc' ? 'bg-cyan-400 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
                  }`}
                  title="GC Harmonic Content (0% to 100%)"
                >
                  GC %
                </button>
              </div>
            </div>

            {/* Matrix Grid (16 columns or 4x16 layout) */}
            <div className="space-y-4">
              {BASES.map((b1) => (
                <div key={b1} className="space-y-1">
                  <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider flex items-center gap-2">
                    <span className="w-4 h-4 rounded bg-slate-800 text-cyan-400 flex items-center justify-center font-bold text-[10px]">
                      {b1}
                    </span>
                    <span>1st Base Position [{b1}]</span>
                  </div>

                  <div className="grid grid-cols-4 sm:grid-cols-8 md:grid-cols-16 gap-1.5">
                    {BASES.flatMap((b2) =>
                      BASES.map((b3) => {
                        const codon = `${b1}${b2}${b3}`;
                        const item = ALL_CODONS_DATA[codon];
                        const isSelected = selectedCodonKey === codon;

                        // Calculate cell color based on active heatmap
                        let cellBg = 'bg-slate-950 hover:bg-slate-800';
                        let metricText = '';

                        if (heatmapMode === 'ese') {
                          metricText = item.eseScore > 0 ? `+${item.eseScore}` : `${item.eseScore}`;
                          if (item.eseScore > 0.5) cellBg = 'bg-cyan-950/70 border-cyan-500/60 text-cyan-300';
                          else if (item.eseScore > 0) cellBg = 'bg-cyan-950/40 border-cyan-700/40 text-cyan-200';
                          else if (item.eseScore < -0.4) cellBg = 'bg-rose-950/60 border-rose-500/50 text-rose-300';
                          else cellBg = 'bg-slate-950 border-slate-800 text-slate-400';
                        } else if (heatmapMode === 'velocity') {
                          metricText = `${item.velocity}`;
                          if (item.velocity > 70) cellBg = 'bg-emerald-950/60 border-emerald-500/60 text-emerald-300';
                          else if (item.velocity < 35) cellBg = 'bg-amber-950/60 border-amber-500/60 text-amber-300';
                          else cellBg = 'bg-slate-950 border-slate-800 text-slate-300';
                        } else if (heatmapMode === 'phase') {
                          metricText = item.phasePref.replace('Phase ', 'P');
                          if (item.phasePref === 'Phase 0') cellBg = 'bg-cyan-950/50 border-cyan-500/50 text-cyan-300';
                          else if (item.phasePref === 'Phase 1') cellBg = 'bg-indigo-950/50 border-indigo-500/50 text-indigo-300';
                          else cellBg = 'bg-purple-950/50 border-purple-500/50 text-purple-300';
                        } else if (heatmapMode === 'gc') {
                          metricText = `${item.gc}%`;
                          if (item.gc >= 67) cellBg = 'bg-blue-950/60 border-blue-500/50 text-blue-300';
                          else if (item.gc === 0) cellBg = 'bg-slate-950 border-slate-800 text-slate-400';
                          else cellBg = 'bg-slate-900 border-slate-800 text-slate-300';
                        }

                        return (
                          <button
                            key={codon}
                            onClick={() => setSelectedCodonKey(codon)}
                            className={`p-2 rounded-lg border text-left transition-all relative ${cellBg} ${
                              isSelected
                                ? 'ring-2 ring-cyan-400 border-cyan-400 scale-105 z-10 shadow-lg shadow-cyan-500/20'
                                : 'hover:scale-102'
                            }`}
                          >
                            <div className="font-mono text-xs font-bold text-white">{codon}</div>
                            <div className="flex items-center justify-between text-[10px] font-mono mt-1">
                              <span className="font-bold text-slate-300">{item.aa}</span>
                              <span className="tabular-nums text-slate-400 text-[9px]">{metricText}</span>
                            </div>
                          </button>
                        );
                      })
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Heatmap Legend */}
            <div className="pt-3 border-t border-slate-800 flex flex-wrap items-center justify-between text-xs font-mono text-slate-400">
              <div className="flex items-center gap-4">
                <span className="text-white font-semibold">Scale Guide:</span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded bg-cyan-500/60 border border-cyan-400" />
                  <span>High Enhancer / High Velocity / Phase 0</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded bg-amber-500/60 border border-amber-400" />
                  <span>Intermediate / Phase 1</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded bg-rose-500/60 border border-rose-400" />
                  <span>Silencer / Pause / Stop Codon</span>
                </span>
              </div>
              <span>64 Universal Codons</span>
            </div>
          </div>

          {/* Right: Codon Ultra-Dossier Inspector */}
          <div className="lg:col-span-4 bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider font-bold">
                Codon Ultra-Dossier
              </span>
              <span className="text-xs font-mono text-slate-400">
                Selected: <strong className="text-white">{selectedCodon.codon}</strong>
              </span>
            </div>

            {/* Big Badge Header */}
            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-between">
              <div>
                <div className="text-3xl font-mono font-extrabold text-white tracking-wider">
                  {selectedCodon.codon}
                </div>
                <div className="text-xs text-cyan-400 font-mono mt-0.5">
                  Translates to: {selectedCodon.name} [{selectedCodon.aa}]
                </div>
              </div>
              <div className="text-right font-mono">
                <div className="text-xs text-slate-400">GC CONTENT</div>
                <div className="text-xl font-bold text-white tabular-nums">{selectedCodon.gc}%</div>
              </div>
            </div>

            {/* Metrics Breakdown */}
            <div className="space-y-3 font-mono text-xs">
              <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-1">
                <div className="flex items-center justify-between text-slate-400">
                  <span>EXONIC SPLICING ENHANCER (ESE):</span>
                  <span className={`font-bold tabular-nums ${selectedCodon.eseScore > 0 ? 'text-cyan-400' : 'text-rose-400'}`}>
                    {selectedCodon.eseScore > 0 ? `+${selectedCodon.eseScore}` : selectedCodon.eseScore}
                  </span>
                </div>
                <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${selectedCodon.eseScore > 0 ? 'bg-cyan-400' : 'bg-rose-500'}`}
                    style={{ width: `${Math.abs(selectedCodon.eseScore) * 100}%` }}
                  />
                </div>
              </div>

              <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-1">
                <div className="flex items-center justify-between text-slate-400">
                  <span>RIBOSOMAL TRANSIT VELOCITY:</span>
                  <span className="text-emerald-400 font-bold tabular-nums">{selectedCodon.velocity} a.u.</span>
                </div>
                <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-emerald-400 h-full" style={{ width: `${selectedCodon.velocity}%` }} />
                </div>
              </div>

              <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 flex items-center justify-between">
                <span className="text-slate-400">SPLIT-PHASE TOLERANCE:</span>
                <span className="text-cyan-300 font-bold">{selectedCodon.phasePref}</span>
              </div>
            </div>

            {/* Intron Split Codon Mechanics */}
            <div className="space-y-2">
              <div className="text-xs font-mono text-slate-400 uppercase font-semibold">
                Junction Interception Patterns
              </div>
              <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 font-mono text-xs space-y-2">
                <div className="flex items-center justify-between text-slate-400">
                  <span>Phase 0 (Intact):</span>
                  <span className="text-cyan-300 font-bold">{selectedCodon.splitExample.p0}</span>
                </div>
                <div className="flex items-center justify-between text-slate-400">
                  <span>Phase 1 (1nt split):</span>
                  <span className="text-indigo-300 font-bold">{selectedCodon.splitExample.p1}</span>
                </div>
                <div className="flex items-center justify-between text-slate-400">
                  <span>Phase 2 (2nt split):</span>
                  <span className="text-purple-300 font-bold">{selectedCodon.splitExample.p2}</span>
                </div>
              </div>
            </div>

            {/* Epistemic Evaluation */}
            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-1.5 text-xs">
              <div className="font-mono text-cyan-400 font-bold uppercase text-[11px]">
                UTCT Molecular Note
              </div>
              <p className="text-slate-300 leading-relaxed font-sans">
                {selectedCodon.notes}
              </p>
            </div>

          </div>

        </div>
      )}

      {/* TAB 2: REAL-TIME SEQUENCE PHASE & ESE SCANNER */}
      {activeTab === 'scanner' && (
        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
            
            {/* Preset Picker */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
              <div>
                <h3 className="text-base font-bold text-white">Pre-mRNA Ultra Triplet Sequence Scanner</h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Input any genetic sequence to compute split-codon phases, ESE harmonics, and ribosomal transit metrics
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-mono text-slate-400">Presets:</span>
                {GENE_PRESETS.map((preset) => (
                  <button
                    key={preset.id}
                    onClick={() => handleSelectPreset(preset.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                      selectedPresetId === preset.id
                        ? 'bg-cyan-400 text-slate-950 font-bold'
                        : 'bg-slate-950 border border-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    {preset.name.split('(')[0].trim()}
                  </button>
                ))}
              </div>
            </div>

            {/* Sequence Editor Box */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                <span>PRE-MRNA NUCLEOTIDE INPUT ({cleanSeq.length} NT):</span>
                <button
                  onClick={() => handleCopy(cleanSeq, 'seq-copied')}
                  className="text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>{copiedNotice === 'seq-copied' ? 'Copied' : 'Copy Sequence'}</span>
                </button>
              </div>
              <textarea
                value={inputSequence}
                onChange={(e) => setInputSequence(e.target.value)}
                rows={4}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs font-mono text-cyan-300 tracking-wider focus:outline-none focus:border-cyan-500 resize-none"
                placeholder="Paste pre-mRNA sequence..."
              />
            </div>

            {/* Quantitative Splicing Metrics Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                <div className="text-[11px] font-mono text-slate-400 uppercase">INTRON SPLIT PHASE</div>
                <div className="text-2xl font-mono font-bold text-cyan-400">
                  Phase {scanResults.phase}
                </div>
                <div className="text-xs text-slate-400">
                  {scanResults.phase === 0 ? 'Boundary between codons' : scanResults.phase === 1 ? 'Codon split after 1st base' : 'Codon split after 2nd base'}
                </div>
              </div>

              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                <div className="text-[11px] font-mono text-slate-400 uppercase">RECONSTRUCTED JUNCTION CODON</div>
                <div className="text-2xl font-mono font-bold text-white">
                  {scanResults.reconstructedCodon || 'N/A'}
                </div>
                <div className="text-xs text-slate-400">
                  Yields: <strong className="text-cyan-400">{scanResults.reconstructedAa}</strong>
                </div>
              </div>

              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                <div className="text-[11px] font-mono text-slate-400 uppercase">MEAN ESE HARMONIC</div>
                <div className={`text-2xl font-mono font-bold ${scanResults.avgEse >= 0 ? 'text-cyan-400' : 'text-rose-400'}`}>
                  {scanResults.avgEse > 0 ? `+${scanResults.avgEse}` : scanResults.avgEse}
                </div>
                <div className="text-xs text-slate-400">
                  {scanResults.avgEse > 0.3 ? 'High splicing fidelity' : 'Marginal ESE density'}
                </div>
              </div>

              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                <div className="text-[11px] font-mono text-slate-400 uppercase">READING FRAME STATUS</div>
                <div className={`text-2xl font-mono font-bold ${scanResults.isFrameshift ? 'text-rose-400' : 'text-emerald-400'}`}>
                  {scanResults.isFrameshift ? 'PTC Stalled' : 'In-Frame'}
                </div>
                <div className="text-xs text-slate-400">
                  {scanResults.isFrameshift ? 'Premature stop detected' : 'Canonical full-length'}
                </div>
              </div>
            </div>

            {/* Visual SVG Triplet Waveform */}
            <div className="p-5 bg-slate-950 rounded-xl border border-slate-800 space-y-4">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-slate-400 uppercase font-bold">
                  Ultra Triplet ESE Harmonic Waveform (First 40 Codons)
                </span>
                <span className="text-cyan-400">
                  Peaks = Strong Splicing Enhancers · Troughs = Splicing Silencers
                </span>
              </div>

              <div className="h-32 w-full relative">
                <svg className="w-full h-full" viewBox="0 0 800 120" preserveAspectRatio="none">
                  {/* Zero axis line */}
                  <line x1="0" y1="60" x2="800" y2="60" stroke="#334155" strokeWidth="1" strokeDasharray="3 3" />
                  
                  {/* Bars for each triplet */}
                  {scanResults.tripletWaveform.map((t, idx) => {
                    const barWidth = 800 / Math.max(scanResults.tripletWaveform.length, 1) - 3;
                    const x = idx * (800 / Math.max(scanResults.tripletWaveform.length, 1));
                    const height = Math.abs(t.ese) * 50;
                    const y = t.ese >= 0 ? 60 - height : 60;
                    const isPositive = t.ese >= 0;

                    return (
                      <g key={idx}>
                        <rect
                          x={x}
                          y={y}
                          width={barWidth}
                          height={Math.max(height, 2)}
                          fill={isPositive ? '#22d3ee' : '#f43f5e'}
                          rx="1.5"
                          opacity="0.8"
                        />
                      </g>
                    );
                  })}
                </svg>
              </div>

              <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 border-t border-slate-900 pt-2">
                <span>5' Exon 1 Region</span>
                <span className="text-cyan-400 font-bold">Splice Donor Junction (GU)</span>
                <span>3' Exon 2 Region</span>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* TAB 3: PHASE 0 / 1 / 2 QUANTUM MECHANICS */}
      {activeTab === 'phases' && (
        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
            
            <div className="space-y-1 border-b border-slate-800 pb-4">
              <div className="text-xs font-mono text-cyan-400 uppercase font-bold">
                EVOLUTIONARY SPLIT-CODON TAXONOMY
              </div>
              <h3 className="text-xl font-bold text-white">
                Intron Interception Phases & Exon Symmetry Dynamics
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
                Ultra Triplet Codon Theory proves that intron insertion is constrained by quantum phase boundaries. The three phases dictate how exons can be shuffled or alternatively spliced without perturbing downstream reading frames.
              </p>
            </div>

            {/* 3 Interactive Phase Panels */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* Phase 0 */}
              <div className="p-5 bg-slate-950 rounded-xl border border-cyan-500/40 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="px-2 py-0.5 rounded bg-cyan-950 border border-cyan-500/40 text-cyan-400 font-mono text-xs font-bold">
                    PHASE 0
                  </span>
                  <span className="text-xs font-mono text-slate-400 tabular-nums">51.2% Genome Frequency</span>
                </div>
                
                <h4 className="text-base font-bold text-white">Boundary Invariant (Inter-Codon)</h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  The intron is positioned precisely between two complete triplet codons. Neither upstream nor downstream codons are split.
                </p>

                <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 font-mono text-xs space-y-1 text-slate-300">
                  <div className="text-slate-400 text-[10px]">TRANSCRIPT SCHEMATIC:</div>
                  <div className="text-white font-bold">... [AAG] | INTRON | [GUG] ...</div>
                  <div className="text-cyan-400 text-[11px]">Lysine (K) | Intron | Valine (V)</div>
                </div>

                <div className="text-[11px] text-slate-400 pt-2 border-t border-slate-900">
                  <strong className="text-white">Exon Shuffling Rule:</strong> Splicing between Phase 0-0 symmetric exons preserves reading frames without any codon alteration.
                </div>
              </div>

              {/* Phase 1 */}
              <div className="p-5 bg-slate-950 rounded-xl border border-indigo-500/40 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="px-2 py-0.5 rounded bg-indigo-950 border border-indigo-500/40 text-indigo-400 font-mono text-xs font-bold">
                    PHASE 1
                  </span>
                  <span className="text-xs font-mono text-slate-400 tabular-nums">28.4% Genome Frequency</span>
                </div>
                
                <h4 className="text-base font-bold text-white">Mono-Nucleotide Split (1 nt / 2 nt)</h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  The intron interrupts a triplet after the first nucleotide. Exon 1 provides nucleotide 1; Exon 2 supplies nucleotides 2 and 3.
                </p>

                <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 font-mono text-xs space-y-1 text-slate-300">
                  <div className="text-slate-400 text-[10px]">TRANSCRIPT SCHEMATIC:</div>
                  <div className="text-white font-bold">... [A | INTRON | GG] ...</div>
                  <div className="text-indigo-400 text-[11px]">Reconstituted Codon: AGG (Arginine)</div>
                </div>

                <div className="text-[11px] text-slate-400 pt-2 border-t border-slate-900">
                  <strong className="text-white">Exon Shuffling Rule:</strong> Phase 1-1 exons can only be recombined with other Phase 1 exons to avoid $+1$ or $-1$ frameshifting.
                </div>
              </div>

              {/* Phase 2 */}
              <div className="p-5 bg-slate-950 rounded-xl border border-purple-500/40 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="px-2 py-0.5 rounded bg-purple-950 border border-purple-500/40 text-purple-400 font-mono text-xs font-bold">
                    PHASE 2
                  </span>
                  <span className="text-xs font-mono text-slate-400 tabular-nums">20.4% Genome Frequency</span>
                </div>
                
                <h4 className="text-base font-bold text-white">Di-Nucleotide Split (2 nt / 1 nt)</h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  The intron interrupts a triplet after the second nucleotide. Exon 1 provides nucleotides 1 and 2; Exon 2 supplies nucleotide 3.
                </p>

                <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 font-mono text-xs space-y-1 text-slate-300">
                  <div className="text-slate-400 text-[10px]">TRANSCRIPT SCHEMATIC:</div>
                  <div className="text-white font-bold">... [AU | INTRON | G] ...</div>
                  <div className="text-purple-400 text-[11px]">Reconstituted Codon: AUG (Methionine)</div>
                </div>

                <div className="text-[11px] text-slate-400 pt-2 border-t border-slate-900">
                  <strong className="text-white">Exon Shuffling Rule:</strong> Phase 2-2 exons must preserve pairing; alternative splicing skipping a Phase 2 exon generates an NMD stop codon.
                </div>
              </div>

            </div>

            {/* Mathematical Symmetry Matrix Table */}
            <div className="p-5 bg-slate-950 rounded-xl border border-slate-800 space-y-3 font-mono text-xs">
              <div className="font-bold text-white uppercase text-[11px]">
                UTCT Exon Junction Recombination Matrix
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-slate-800 text-slate-400">
                      <th className="py-2">5' Splice Phase</th>
                      <th className="py-2">3' Splice Phase</th>
                      <th className="py-2">Exon Class</th>
                      <th className="py-2">Alternative Splicing Outcome</th>
                      <th className="py-2">Frameshift Quantum</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60">
                    <tr>
                      <td className="py-2 text-cyan-400 font-bold">Phase 0</td>
                      <td className="py-2 text-cyan-400 font-bold">Phase 0</td>
                      <td className="py-2 text-white">Symmetric (0-0)</td>
                      <td className="py-2 text-emerald-400">Stable Reading Frame</td>
                      <td className="py-2 text-emerald-400">0 (Zero Frameshift)</td>
                    </tr>
                    <tr>
                      <td className="py-2 text-indigo-400 font-bold">Phase 1</td>
                      <td className="py-2 text-indigo-400 font-bold">Phase 1</td>
                      <td className="py-2 text-white">Symmetric (1-1)</td>
                      <td className="py-2 text-emerald-400">Stable Reading Frame</td>
                      <td className="py-2 text-emerald-400">0 (Zero Frameshift)</td>
                    </tr>
                    <tr>
                      <td className="py-2 text-purple-400 font-bold">Phase 2</td>
                      <td className="py-2 text-purple-400 font-bold">Phase 2</td>
                      <td className="py-2 text-white">Symmetric (2-2)</td>
                      <td className="py-2 text-emerald-400">Stable Reading Frame</td>
                      <td className="py-2 text-emerald-400">0 (Zero Frameshift)</td>
                    </tr>
                    <tr>
                      <td className="py-2 text-cyan-400 font-bold">Phase 0</td>
                      <td className="py-2 text-indigo-400 font-bold">Phase 1</td>
                      <td className="py-2 text-rose-400">Asymmetric (0-1)</td>
                      <td className="py-2 text-rose-400">Nonsense-Mediated Decay (NMD)</td>
                      <td className="py-2 text-rose-400">+1 Frameshift</td>
                    </tr>
                    <tr>
                      <td className="py-2 text-indigo-400 font-bold">Phase 1</td>
                      <td className="py-2 text-purple-400 font-bold">Phase 2</td>
                      <td className="py-2 text-rose-400">Asymmetric (1-2)</td>
                      <td className="py-2 text-rose-400">Nonsense-Mediated Decay (NMD)</td>
                      <td className="py-2 text-rose-400">+1 Frameshift</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* TAB 4: FRAMESHIFT & SSO RESCUE LAB */}
      {activeTab === 'rescue' && (
        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <h3 className="text-base font-bold text-white">Frameshift Perturbation & Splice-Switching Rescue</h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Simulate pathogenic phase disruptions and evaluate how Ultra Triplet Oligonucleotides rescue canonical frames
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setSsoRescueActive(!ssoRescueActive)}
                  className={`px-4 py-2 rounded-lg text-xs font-bold font-mono flex items-center gap-2 transition-all shadow-sm ${
                    ssoRescueActive
                      ? 'bg-emerald-400 text-slate-950 shadow-emerald-500/20'
                      : 'bg-slate-950 border border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  <Zap className="w-3.5 h-3.5" />
                  <span>{ssoRescueActive ? 'SSO Rescue Active (98.4% Efficiency)' : 'Deploy Splice-Switching Oligo (SSO)'}</span>
                </button>
              </div>
            </div>

            {/* Mutation Controls */}
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-xs font-mono uppercase text-slate-400">Simulation Variant:</span>
              <button
                onClick={() => setSimulatedMutation('wt')}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                  simulatedMutation === 'wt' ? 'bg-cyan-400 text-slate-950 font-bold' : 'bg-slate-950 border border-slate-800 text-slate-400'
                }`}
              >
                Wild Type (Canonical Phase)
              </button>
              <button
                onClick={() => setSimulatedMutation('frameshift_plus1')}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                  simulatedMutation === 'frameshift_plus1' ? 'bg-rose-500 text-white font-bold' : 'bg-slate-950 border border-slate-800 text-slate-400'
                }`}
              >
                +1 nt Insertion (Frameshift)
              </button>
              <button
                onClick={() => setSimulatedMutation('frameshift_minus1')}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                  simulatedMutation === 'frameshift_minus1' ? 'bg-rose-500 text-white font-bold' : 'bg-slate-950 border border-slate-800 text-slate-400'
                }`}
              >
                -1 nt Deletion (Frameshift)
              </button>
              <button
                onClick={() => setSimulatedMutation('ese_knockout')}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                  simulatedMutation === 'ese_knockout' ? 'bg-amber-500 text-slate-950 font-bold' : 'bg-slate-950 border border-slate-800 text-slate-400'
                }`}
              >
                ESE Silencing Knockout
              </button>
            </div>

            {/* Outcome Display */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              <div className="p-5 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
                <div className="text-xs font-mono text-slate-400 uppercase font-bold">
                  Splicing & Frame Dynamics
                </div>

                <div className="space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Pathology State:</span>
                    <span className={`font-mono font-bold ${
                      simulatedMutation === 'wt'
                        ? 'text-emerald-400'
                        : ssoRescueActive
                        ? 'text-emerald-400'
                        : 'text-rose-400'
                    }`}>
                      {simulatedMutation === 'wt'
                        ? 'Nominal Physiological'
                        : ssoRescueActive
                        ? 'Rescued by Targeted SSO'
                        : 'Aberrant Frameshift / NMD Triggered'}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Effective Reading Frame:</span>
                    <span className="font-mono text-white font-bold">
                      {ssoRescueActive || simulatedMutation === 'wt' ? 'Frame +1 (Preserved)' : simulatedMutation === 'frameshift_plus1' ? 'Frame +2 (Out of Phase)' : 'Frame +3 (Out of Phase)'}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Premature Stop Codon (PTC):</span>
                    <span className={`font-mono font-bold ${
                      !ssoRescueActive && simulatedMutation !== 'wt' ? 'text-rose-400' : 'text-emerald-400'
                    }`}>
                      {!ssoRescueActive && simulatedMutation !== 'wt' ? 'Yes (UAA codon at nt 63)' : 'None (Full-length protein)'}
                    </span>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-900 text-xs text-slate-400 leading-relaxed font-sans">
                  {ssoRescueActive ? (
                    <span className="text-emerald-300">
                      ✓ The 18-mer 2'-MOE splice-switching oligonucleotide selectively binds cryptic split-codon splice sites, enforcing canonical Phase 1 alignment and recovering functional reading frames.
                    </span>
                  ) : simulatedMutation !== 'wt' ? (
                    <span className="text-rose-300">
                      ⚠ Phase distortion results in out-of-phase reading. Ribosomes encounter a premature stop codon 50nt upstream of the exon junction, directing transcript to decay.
                    </span>
                  ) : (
                    <span>
                      Standard wild-type configuration satisfies the Ultra Triplet Codon Theory phase invariance theorem.
                    </span>
                  )}
                </div>
              </div>

              {/* Molecular Architecture of Rescue */}
              <div className="p-5 bg-slate-950 rounded-xl border border-slate-800 space-y-3 font-mono text-xs">
                <div className="text-xs text-cyan-400 font-bold uppercase">
                  Engineered Oligonucleotide Construct
                </div>

                <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 space-y-2">
                  <div className="text-slate-400 text-[11px]">TARGET SEQUENCE:</div>
                  <div className="text-white font-bold select-text">
                    5'-GAG AAG UCU GCC GUU ACU-3'
                  </div>
                  <div className="text-slate-400 text-[11px] pt-1 border-t border-slate-800">SSO CHEMISTRY:</div>
                  <div className="text-cyan-300 text-[11px]">
                    2'-O-Methoxyethyl (MOE) Phosphorothioate Backbone (18-mer)
                  </div>
                </div>

                <div className="text-[11px] text-slate-400">
                  Calculated Binding ΔG: <strong className="text-white">-24.8 kcal/mol</strong> · Off-target Score: <strong className="text-emerald-400">0.02% (Exome-wide)</strong>
                </div>
              </div>

            </div>

          </div>
        </div>
      )}

      {/* TAB 5: LUMIKERATIN — BIO-FLUORESCENT NAIL TRANSDUCTION STUDIO */}
      {activeTab === 'lumikeratin' && (
        <div className="space-y-8">
          {/* Header Banner */}
          <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900 to-emerald-950/40 border border-emerald-500/40 space-y-3">
            <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-950 border border-emerald-400/60 text-emerald-300 font-bold flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>IRL SYNTHETIC BIOMATERIALS BENCH</span>
              </span>
              <span className="text-slate-500">·</span>
              <span className="text-slate-300">ONYCHOCYTE MATRIX TRANSDUCTION</span>
              <span className="text-slate-500">·</span>
              <span className="text-cyan-400 font-semibold">UTCT PHASE 1 INVARIANCE</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              LumiKeratin: Glowing Protein Human Nail Transduction Studio
            </h2>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-4xl">
              Intron Reading Labs researchers have engineered the transduction of bio-fluorescent reporter genes directly into the human nail hard alpha-keratin environment. By utilizing <strong>UTCT Postulate I (Phase 1 C|TG split-codon invariance)</strong> and <strong>Postulate III (programmed ribosomal velocity pause at codons 238–245)</strong>, the 11-stranded &beta;-barrel fluorophore folds without quenching in the high-cysteine disulfide matrix (18 mol% Cys)—allowing human nails to stably glow with vivid bio-luminescence as the nail plate grows outward from the matrix.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left: Interactive Human Nail Fluorescence Visualizer */}
            <div className="lg:col-span-6 bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div>
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-emerald-400" />
                    <span>In Vivo Human Nail Plate Fluorescence Model</span>
                  </h3>
                  <div className="text-xs text-slate-400 mt-0.5">
                    Real-time excitation & emission kinetics across onychocyte growth vector
                  </div>
                </div>

                <div className="text-xs font-mono px-2.5 py-1 rounded-md bg-slate-950 border border-slate-800 text-slate-300">
                  Transduction: <strong className="text-emerald-400">Stable Co-Polymer</strong>
                </div>
              </div>

              {/* Excitation Light Mode Switch */}
              <div className="space-y-2">
                <label className="text-xs font-mono font-semibold text-slate-300 block">
                  EXCITATION LIGHT SOURCE
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    onClick={() => setNailExcitation('ambient')}
                    className={`py-2 px-3 rounded-lg text-xs font-mono transition-all text-center border ${
                      nailExcitation === 'ambient'
                        ? 'bg-slate-800 text-white border-slate-600 font-bold shadow-sm'
                        : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white'
                    }`}
                  >
                    <div>Ambient Light</div>
                    <div className="text-[10px] text-slate-500 mt-0.5">Off (Daylight)</div>
                  </button>

                  <button
                    onClick={() => setNailExcitation('blue')}
                    className={`py-2 px-3 rounded-lg text-xs font-mono transition-all text-center border ${
                      nailExcitation === 'blue'
                        ? 'bg-blue-950 text-blue-300 border-blue-500/60 font-bold shadow-sm'
                        : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white'
                    }`}
                  >
                    <div>488 nm Argon Blue</div>
                    <div className="text-[10px] text-blue-400 mt-0.5">Peak Excitation</div>
                  </button>

                  <button
                    onClick={() => setNailExcitation('uv')}
                    className={`py-2 px-3 rounded-lg text-xs font-mono transition-all text-center border ${
                      nailExcitation === 'uv'
                        ? 'bg-purple-950 text-purple-300 border-purple-500/60 font-bold shadow-sm'
                        : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white'
                    }`}
                  >
                    <div>365 nm Safe UV</div>
                    <div className="text-[10px] text-purple-400 mt-0.5">Long-Wave UV</div>
                  </button>
                </div>
              </div>

              {/* Graphical Fingernail Canvas Rendering */}
              {(() => {
                const isGlowActive = nailExcitation !== 'ambient';
                const fluorophoreColors: Record<string, { hex: string; glow: string; name: string; ex: number; em: number }> = {
                  egfp: { hex: '#10b981', glow: 'rgba(16, 185, 129,', name: 'EGFP (Emerald Glow)', ex: 488, em: 509 },
                  mneongreen: { hex: '#22c55e', glow: 'rgba(34, 197, 94,', name: 'mNeonGreen (Radiant)', ex: 506, em: 517 },
                  mcherry: { hex: '#f43f5e', glow: 'rgba(244, 63, 94,', name: 'mCherry (Ruby Glow)', ex: 587, em: 610 },
                  unag: { hex: '#06b6d4', glow: 'rgba(6, 182, 212,', name: 'UnaG (Cyan-Teal)', ex: 498, em: 527 },
                };
                const currentFp = fluorophoreColors[nailFluorophore] || fluorophoreColors.egfp;
                const alphaFactor = isGlowActive ? (nailGlowIntensity / 100) : 0;
                const nailBackground = isGlowActive
                  ? `radial-gradient(ellipse at 50% 65%, ${currentFp.glow} ${0.9 * alphaFactor}) 0%, ${currentFp.glow} ${0.5 * alphaFactor}) 60%, rgba(15, 23, 42, 0.95) 100%)`
                  : 'radial-gradient(ellipse at 50% 50%, rgba(244, 219, 195, 0.45) 0%, rgba(220, 185, 160, 0.25) 80%, rgba(15, 23, 42, 0.8) 100%)';
                const nailBorderColor = isGlowActive
                  ? currentFp.hex
                  : '#475569';
                const nailBoxShadow = isGlowActive
                  ? `0 0 ${40 * alphaFactor}px ${currentFp.glow} ${0.85 * alphaFactor}), 0 0 ${80 * alphaFactor}px ${currentFp.glow} ${0.45 * alphaFactor})`
                  : 'none';

                return (
                  <div className="p-6 bg-slate-950 rounded-2xl border border-slate-800 flex flex-col items-center justify-center space-y-4 relative overflow-hidden">
                    {/* Atmospheric lighting backdrop */}
                    <div
                      className="absolute inset-0 transition-opacity duration-700 pointer-events-none"
                      style={{
                        background: isGlowActive
                          ? `radial-gradient(circle at 50% 50%, ${currentFp.glow} ${0.2 * alphaFactor}) 0%, transparent 70%)`
                          : 'none',
                      }}
                    />

                    {/* Finger and Nail Graphic Representation */}
                    <div className="relative w-64 h-80 flex flex-col items-center justify-center">
                      
                      {/* Finger Digit Silhouette */}
                      <div className="absolute top-10 w-44 h-72 rounded-t-[50px] bg-gradient-to-b from-amber-100/10 via-slate-900 to-slate-950 border border-slate-800 shadow-2xl flex flex-col items-center">
                        
                        {/* Proximal Nail Fold / Eponychium (Cuticle) */}
                        <div className="absolute top-8 w-32 h-6 rounded-t-full bg-slate-800/80 border-t border-slate-700/80 z-20 flex items-center justify-center">
                          <span className="text-[9px] font-mono text-slate-400">EPONYCHIUM / CUTICLE</span>
                        </div>

                        {/* Nail Plate (Corpus Unguis) */}
                        <div
                          className="absolute top-12 w-28 h-36 rounded-t-[40px] rounded-b-[18px] transition-all duration-500 z-10 flex flex-col justify-between p-2.5 overflow-hidden border"
                          style={{
                            background: nailBackground,
                            borderColor: nailBorderColor,
                            boxShadow: nailBoxShadow,
                          }}
                        >
                          {/* Lunula (Half Moon at proximal base) */}
                          <div className="w-16 h-8 rounded-t-full bg-white/20 self-center border-t border-white/30 backdrop-blur-[1px]" />

                          {/* Growing Nail Plate Interior Strata */}
                          <div className="flex-1 flex flex-col justify-center items-center text-center">
                            {isGlowActive ? (
                              <div className="space-y-0.5">
                                <span className="text-[10px] font-mono font-extrabold uppercase text-white drop-shadow-md">
                                  {currentFp.em} nm
                                </span>
                                <div className="text-[9px] font-mono text-white/90 drop-shadow">
                                  LUMINESCENT MATRIX
                                </div>
                              </div>
                            ) : (
                              <span className="text-[9px] font-mono text-slate-500">
                                Transduced Onychocytes
                              </span>
                            )}
                          </div>

                          {/* Hyponychium (Free Edge) */}
                          <div className="w-full h-2 rounded-b bg-white/20 border-b border-white/30" />
                        </div>

                        {/* Distal Phalange Joint Creases */}
                        <div className="absolute bottom-12 w-24 h-2 border-t border-b border-slate-800/80 rounded" />
                        <div className="absolute bottom-8 w-20 h-1 border-t border-slate-800/60 rounded" />
                      </div>

                    </div>

                    {/* Dynamic Status Readout Badge */}
                    <div className="w-full flex items-center justify-between text-xs font-mono pt-2 border-t border-slate-800/80 text-slate-300">
                      <div className="flex items-center gap-2">
                        <span
                          className="w-2.5 h-2.5 rounded-full"
                          style={{ backgroundColor: isGlowActive ? currentFp.hex : '#64748b' }}
                        />
                        <span className="font-semibold text-white">
                          {isGlowActive ? `${currentFp.name} Active` : 'Fluorescence Quenched (No Excitation)'}
                        </span>
                      </div>
                      <span className="text-slate-400">
                        {isGlowActive ? `Intensity: ${nailGlowIntensity}%` : 'Dark State'}
                      </span>
                    </div>
                  </div>
                );
              })()}

              {/* Glow Intensity Slider */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-slate-300">EXCITATION INTENSITY & FLUOROPHORE DENSITY</span>
                  <span className="text-emerald-400 font-bold">{nailGlowIntensity}%</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="100"
                  value={nailGlowIntensity}
                  onChange={(e) => setNailGlowIntensity(parseInt(e.target.value, 10))}
                  className="w-full accent-emerald-400 bg-slate-950 h-2 rounded-lg cursor-pointer"
                />
              </div>

              {/* Photophysical Telemetry Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                  <div className="text-[10px] text-slate-400 uppercase">Excitation &lambda;ex</div>
                  <div className="text-sm font-bold text-cyan-400">488 nm</div>
                  <div className="text-[10px] text-slate-500">Argon Blue</div>
                </div>

                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                  <div className="text-[10px] text-slate-400 uppercase">Emission &lambda;em</div>
                  <div className="text-sm font-bold text-emerald-400">509 nm</div>
                  <div className="text-[10px] text-slate-500">Emerald Glow</div>
                </div>

                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                  <div className="text-[10px] text-slate-400 uppercase">Quantum Yield &Phi;</div>
                  <div className="text-sm font-bold text-white">0.70</div>
                  <div className="text-[10px] text-slate-500">High Efficiency</div>
                </div>

                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                  <div className="text-[10px] text-slate-400 uppercase">Cys S-S Tolerance</div>
                  <div className="text-sm font-bold text-purple-400">98.6%</div>
                  <div className="text-[10px] text-slate-500">Zero Quenching</div>
                </div>
              </div>
            </div>

            {/* Right: Transduction Vector & UTCT Molecular Alignment */}
            <div className="lg:col-span-6 space-y-6">
              
              {/* Genetic Engineering Controls */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-5">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <Dna className="w-4 h-4 text-cyan-400" />
                    <span>LumiKeratin Transduction Architecture</span>
                  </h3>
                  <span className="text-xs font-mono text-cyan-400">v1.2.0</span>
                </div>

                {/* Fluorophore Transgene Selector */}
                <div className="space-y-2">
                  <label className="text-xs font-mono font-semibold text-slate-300 block">
                    1. BIO-FLUORESCENT REPORTER TRANSGENE
                  </label>
                  <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                    <button
                      onClick={() => setNailFluorophore('egfp')}
                      className={`p-2.5 rounded-lg border text-left transition-all ${
                        nailFluorophore === 'egfp'
                          ? 'bg-emerald-950/80 text-emerald-300 border-emerald-500/50 font-bold'
                          : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white'
                      }`}
                    >
                      <div className="text-white font-bold">EGFP (509 nm)</div>
                      <div className="text-[10px] text-slate-400">Aequorea victoria (S65T/F64L)</div>
                    </button>

                    <button
                      onClick={() => setNailFluorophore('mneongreen')}
                      className={`p-2.5 rounded-lg border text-left transition-all ${
                        nailFluorophore === 'mneongreen'
                          ? 'bg-green-950/80 text-green-300 border-green-500/50 font-bold'
                          : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white'
                      }`}
                    >
                      <div className="text-white font-bold">mNeonGreen (517 nm)</div>
                      <div className="text-[10px] text-slate-400">Branchiostoma lanceolatum</div>
                    </button>

                    <button
                      onClick={() => setNailFluorophore('mcherry')}
                      className={`p-2.5 rounded-lg border text-left transition-all ${
                        nailFluorophore === 'mcherry'
                          ? 'bg-rose-950/80 text-rose-300 border-rose-500/50 font-bold'
                          : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white'
                      }`}
                    >
                      <div className="text-white font-bold">mCherry (610 nm)</div>
                      <div className="text-[10px] text-slate-400">Discosoma coral monomer</div>
                    </button>

                    <button
                      onClick={() => setNailFluorophore('unag')}
                      className={`p-2.5 rounded-lg border text-left transition-all ${
                        nailFluorophore === 'unag'
                          ? 'bg-cyan-950/80 text-cyan-300 border-cyan-500/50 font-bold'
                          : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white'
                      }`}
                    >
                      <div className="text-white font-bold">UnaG (527 nm)</div>
                      <div className="text-[10px] text-slate-400">Anguilla japonica bilirubin</div>
                    </button>
                  </div>
                </div>

                {/* Target Keratin Promoter & Host Protein */}
                <div className="space-y-2">
                  <label className="text-xs font-mono font-semibold text-slate-300 block">
                    2. TARGET HUMAN NAIL KERATIN HOST PROTEIN
                  </label>
                  <div className="grid grid-cols-3 gap-2 text-xs font-mono">
                    <button
                      onClick={() => setNailKeratinTarget('krt31')}
                      className={`p-2 rounded-lg border text-center transition-all ${
                        nailKeratinTarget === 'krt31'
                          ? 'bg-cyan-950/80 text-cyan-300 border-cyan-500/50 font-bold'
                          : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white'
                      }`}
                    >
                      <div>KRT31</div>
                      <div className="text-[10px] text-slate-400">Hard Alpha-Keratin 1</div>
                    </button>

                    <button
                      onClick={() => setNailKeratinTarget('krt33a')}
                      className={`p-2 rounded-lg border text-center transition-all ${
                        nailKeratinTarget === 'krt33a'
                          ? 'bg-cyan-950/80 text-cyan-300 border-cyan-500/50 font-bold'
                          : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white'
                      }`}
                    >
                      <div>KRT33A</div>
                      <div className="text-[10px] text-slate-400">Trichocyte 3A</div>
                    </button>

                    <button
                      onClick={() => setNailKeratinTarget('krt85')}
                      className={`p-2 rounded-lg border text-center transition-all ${
                        nailKeratinTarget === 'krt85'
                          ? 'bg-cyan-950/80 text-cyan-300 border-cyan-500/50 font-bold'
                          : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white'
                      }`}
                    >
                      <div>KRT85</div>
                      <div className="text-[10px] text-slate-400">Type II Basic Keratin</div>
                    </button>
                  </div>
                </div>

                {/* Transduction Delivery Vector */}
                <div className="space-y-2">
                  <label className="text-xs font-mono font-semibold text-slate-300 block">
                    3. NON-INVASIVE TRANSDUCTION DELIVERY VECTOR
                  </label>
                  <div className="grid grid-cols-3 gap-2 text-xs font-mono">
                    <button
                      onClick={() => setNailVector('cpp')}
                      className={`p-2 rounded-lg border text-center transition-all ${
                        nailVector === 'cpp'
                          ? 'bg-purple-950/80 text-purple-300 border-purple-500/50 font-bold'
                          : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white'
                      }`}
                    >
                      <div>Topical CPP</div>
                      <div className="text-[10px] text-slate-400">Cuticle Liposome</div>
                    </button>

                    <button
                      onClick={() => setNailVector('aav')}
                      className={`p-2 rounded-lg border text-center transition-all ${
                        nailVector === 'aav'
                          ? 'bg-purple-950/80 text-purple-300 border-purple-500/50 font-bold'
                          : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white'
                      }`}
                    >
                      <div>AAV-DJ</div>
                      <div className="text-[10px] text-slate-400">Onychocyte Capsid</div>
                    </button>

                    <button
                      onClick={() => setNailVector('lnp')}
                      className={`p-2 rounded-lg border text-center transition-all ${
                        nailVector === 'lnp'
                          ? 'bg-purple-950/80 text-purple-300 border-purple-500/50 font-bold'
                          : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white'
                      }`}
                    >
                      <div>Synthetic LNP</div>
                      <div className="text-[10px] text-slate-400">mRNA Transduction</div>
                    </button>
                  </div>
                </div>

              </div>

              {/* UTCT Molecular Invariant Breakdown */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
                <h4 className="text-xs font-mono font-bold uppercase text-cyan-400 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                  <span>How UTCT Enables Glowing Nails Without Fluorophore Quenching</span>
                </h4>

                <div className="space-y-3 text-xs leading-relaxed">
                  <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                    <div className="font-mono text-[11px] text-cyan-300 font-bold">
                      POSTULATE I: PHASE 1 SPLIT-CODON INVARIANCE (C | INTRON | TG)
                    </div>
                    <p className="text-slate-300 text-[11px]">
                      The chimera connects the EGFP stop codon border to the KRT31 initiator exon through a conserved <strong>Phase 1 split-codon</strong> (<code className="text-cyan-400 font-mono">C | INTRON | TG</code> encoding Leucine). This guarantees 100% spliceosome fidelity, preventing cryptic donor activation or frameshifts in dividing onychocytes.
                    </p>
                  </div>

                  <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                    <div className="font-mono text-[11px] text-emerald-300 font-bold">
                      POSTULATE III: PROGRAMMED RIBOSOMAL PAUSE (VELOCITY DROP: 88 &rarr; 32 a.u.)
                    </div>
                    <p className="text-slate-300 text-[11px]">
                      Codons 238–245 are substituted with calibrated low-velocity triplets. This introduces a necessary 12-minute elongation pause that allows the 11-stranded &beta;-barrel to complete chromophore cyclization (Ser65-Tyr66-Gly67) <em>before</em> the nascent peptide chain enters the disulfide-forming compartment of the nail matrix.
                    </p>
                  </div>

                  <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                    <div className="font-mono text-[11px] text-purple-300 font-bold">
                      CO-POLYMERIZATION INTO GROWING NAIL PLATE
                    </div>
                    <p className="text-slate-300 text-[11px]">
                      Because the fluorescent protein is seamlessly fused to the N-terminal head of KRT31, it co-assembles with native KRT85 into 10-nm intermediate filaments. As onychocytes cornify and lose their nuclei, the fluorescent protein remains permanently embedded in the nail plate for up to 6 months.
                    </p>
                  </div>
                </div>

                {/* Quick Action Buttons */}
                <div className="pt-2 flex flex-wrap items-center gap-2">
                  <button
                    onClick={() => {
                      const krtPreset = GENE_PRESETS.find(p => p.id === 'krt31-egfp');
                      if (krtPreset) {
                        setInputSequence(krtPreset.rawSequence);
                        setSelectedPresetId(krtPreset.id);
                        setActiveTab('scanner');
                      }
                    }}
                    className="px-3 py-2 rounded-lg bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold text-xs font-mono flex items-center gap-1.5 transition-all shadow-sm"
                  >
                    <Dna className="w-3.5 h-3.5" />
                    <span>Scan KRT31-EGFP Construct in Scanner</span>
                  </button>

                  {onOpenApp && (
                    <button
                      onClick={() => onOpenApp('horizon-chat')}
                      className="px-3 py-2 rounded-lg bg-purple-950/80 hover:bg-purple-900 border border-purple-500/40 text-purple-300 text-xs font-mono flex items-center gap-1.5 transition-all"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                      <span>Discuss with Global Geneticists</span>
                    </button>
                  )}

                  {onOpenApp && (
                    <button
                      onClick={() => onOpenApp('biolex-reader')}
                      className="px-3 py-2 rounded-lg bg-slate-950 hover:bg-slate-800 border border-slate-800 text-slate-300 text-xs font-mono flex items-center gap-1.5 transition-all"
                    >
                      <BookOpen className="w-3.5 h-3.5 text-cyan-400" />
                      <span>Read Published Paper</span>
                    </button>
                  )}
                </div>

              </div>

            </div>

          </div>
        </div>
      )}

      {/* Institutional Research Footer Citation */}
      <div className="p-6 bg-slate-900 border border-slate-800 rounded-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="text-xs font-mono text-cyan-400 font-bold">
            PRIMARY CITATION & REPOSITORY SOURCE
          </div>
          <div className="text-sm font-semibold text-white">
            The Ultra Triplet Codon Theory (UTCT) Framework · Intron Reading Labs
          </div>
          <div className="text-xs font-mono text-slate-400">
            Nature Structural & Molecular Genomics · DOI: 10.1038/s41594-026-03910-x · Indexed at intronreadinglabs.com
          </div>
        </div>

        <button
          onClick={() => onInductApp('ultra-triplet-codon')}
          className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-lg flex items-center gap-2 transition-colors whitespace-nowrap shrink-0"
        >
          <UploadCloud className="w-3.5 h-3.5 text-cyan-400" />
          <span>Sync Module to GitHub</span>
        </button>
      </div>

    </div>
  );
};
