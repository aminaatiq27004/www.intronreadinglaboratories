import React, { useState, useMemo } from 'react';
import { GENE_PRESETS } from '../../data/mockData';
import { ArrowRight, CheckCircle2, ChevronRight, Copy, Dna, Download, Play, RefreshCw, Sparkles, UploadCloud } from 'lucide-react';

const GENETIC_CODE: Record<string, string> = {
  'UUU': 'F', 'UUC': 'F', 'UUA': 'L', 'UUG': 'L',
  'CUU': 'L', 'CUC': 'L', 'CUA': 'L', 'CUG': 'L',
  'AUU': 'I', 'AUC': 'I', 'AUA': 'I', 'AUG': 'M',
  'GUU': 'V', 'GUC': 'V', 'GUA': 'V', 'GUG': 'V',
  'UCU': 'S', 'UCC': 'S', 'UCA': 'S', 'UCG': 'S',
  'CCU': 'P', 'CCC': 'P', 'CCA': 'P', 'CCG': 'P',
  'ACU': 'T', 'ACC': 'T', 'ACA': 'T', 'ACG': 'T',
  'GCU': 'A', 'GCC': 'A', 'GCA': 'A', 'GCG': 'A',
  'UAU': 'Y', 'UAC': 'Y', 'UAA': '*', 'UAG': '*',
  'CAU': 'H', 'CAC': 'H', 'CAA': 'Q', 'CAG': 'Q',
  'AAU': 'N', 'AAC': 'N', 'AAA': 'K', 'AAG': 'K',
  'GAU': 'D', 'GAC': 'D', 'GAA': 'E', 'GAG': 'E',
  'UGU': 'C', 'UGC': 'C', 'UGA': '*', 'UGG': 'W',
  'CGU': 'R', 'CGC': 'R', 'CGA': 'R', 'CGG': 'R',
  'AGU': 'S', 'AGC': 'S', 'AGA': 'R', 'AGG': 'R',
  'GGU': 'G', 'GGC': 'G', 'GGA': 'G', 'GGG': 'G'
};

const AMINO_ACID_NAMES: Record<string, string> = {
  'A': 'Ala', 'R': 'Arg', 'N': 'Asn', 'D': 'Asp', 'C': 'Cys',
  'E': 'Glu', 'Q': 'Gln', 'G': 'Gly', 'H': 'His', 'I': 'Ile',
  'L': 'Leu', 'K': 'Lys', 'M': 'Met (Start)', 'F': 'Phe', 'P': 'Pro',
  'S': 'Ser', 'T': 'Thr', 'W': 'Trp', 'Y': 'Tyr', 'V': 'Val', '*': 'STOP'
};

interface SpliceSenseAppProps {
  onInductApp: (appId: string) => void;
  onOpenUtct?: () => void;
}

export const SpliceSenseApp: React.FC<SpliceSenseAppProps> = ({ onInductApp, onOpenUtct }) => {
  const [selectedPresetId, setSelectedPresetId] = useState<string>('hbb');
  const [rawSequence, setRawSequence] = useState<string>(GENE_PRESETS[0].rawSequence);
  const [splicingMode, setSplicingMode] = useState<'canonical' | 'exon_skipping' | 'intron_retention' | 'cryptic_site'>('canonical');
  const [activeFrame, setActiveFrame] = useState<number>(1);
  const [copiedNotification, setCopiedNotification] = useState<string | null>(null);

  // Clean sequence (DNA/RNA)
  const cleanSeq = useMemo(() => {
    return rawSequence.toUpperCase().replace(/[^ACGTU]/g, '').replace(/T/g, 'U');
  }, [rawSequence]);

  // Nucleotide analysis
  const metrics = useMemo(() => {
    const total = cleanSeq.length || 1;
    let a = 0, c = 0, g = 0, u = 0;
    for (const char of cleanSeq) {
      if (char === 'A') a++;
      else if (char === 'C') c++;
      else if (char === 'G') g++;
      else if (char === 'U') u++;
    }
    const gcPercent = Math.round(((g + c) / total) * 1000) / 10;
    return { total: cleanSeq.length, a, c, g, u, gcPercent };
  }, [cleanSeq]);

  // Splice site detection (Donor GU and Acceptor AG)
  const spliceSites = useMemo(() => {
    const donors: number[] = [];
    const acceptors: number[] = [];

    // Search for GU (donor) and AG (acceptor)
    for (let i = 0; i < cleanSeq.length - 1; i++) {
      if (cleanSeq.slice(i, i + 2) === 'GU') {
        donors.push(i);
      }
      if (cleanSeq.slice(i, i + 2) === 'AG') {
        acceptors.push(i);
      }
    }

    // Default primary donor: first GU located after 40nt, or first found
    const primaryDonor = donors.find(pos => pos >= 30 && pos <= 120) ?? donors[0] ?? -1;
    // Primary acceptor: AG located after donor + 30nt
    const primaryAcceptor = primaryDonor !== -1
      ? (acceptors.find(pos => pos > primaryDonor + 40) ?? acceptors[acceptors.length - 1] ?? -1)
      : -1;

    return {
      donors,
      acceptors,
      primaryDonor,
      primaryAcceptor
    };
  }, [cleanSeq]);

  // Splicing structure calculation
  const matureTranscript = useMemo(() => {
    const { primaryDonor, primaryAcceptor } = spliceSites;
    if (primaryDonor === -1 || primaryAcceptor === -1 || primaryAcceptor <= primaryDonor) {
      return {
        exon1: cleanSeq,
        intron: '',
        exon2: '',
        matureRNA: cleanSeq,
        consequence: 'No standard GU..AG intron boundary recognized in sequence.',
        frameShift: false
      };
    }

    const exon1 = cleanSeq.slice(0, primaryDonor);
    const intron = cleanSeq.slice(primaryDonor, primaryAcceptor + 2); // Includes GU ... AG
    const exon2 = cleanSeq.slice(primaryAcceptor + 2);

    let matureRNA = '';
    let consequence = '';
    let frameShift = false;

    if (splicingMode === 'canonical') {
      matureRNA = exon1 + exon2;
      const lenDelta = intron.length;
      consequence = `Canonical splicing: Intron removed (${lenDelta} nt excised). Exon 1 (${exon1.length} nt) joined directly to Exon 2 (${exon2.length} nt).`;
      frameShift = (exon1.length % 3) !== 0 && ((exon1.length + exon2.length) % 3) !== 0;
    } else if (splicingMode === 'exon_skipping') {
      matureRNA = exon1;
      consequence = `Exon Skipping Mode: Downstream Exon 2 excluded. Transcript truncated to ${exon1.length} nt.`;
      frameShift = true;
    } else if (splicingMode === 'intron_retention') {
      matureRNA = exon1 + intron + exon2;
      consequence = `Intron Retention: Spliceosome skipped excision; full ${intron.length} nt intron retained in mature transcript.`;
      frameShift = (intron.length % 3) !== 0;
    } else if (splicingMode === 'cryptic_site') {
      // Aberrant 16nt cryptic site usage
      const crypticCut = Math.min(primaryDonor + 24, cleanSeq.length - 20);
      const aberrantIntron = cleanSeq.slice(crypticCut, primaryAcceptor + 2);
      matureRNA = cleanSeq.slice(0, crypticCut) + exon2;
      consequence = `Cryptic Splice Site: Aberrant cleavage 24nt downstream of canonical GU creates pseudo-exon extension.`;
      frameShift = true;
    }

    return {
      exon1,
      intron,
      exon2,
      matureRNA,
      consequence,
      frameShift
    };
  }, [cleanSeq, spliceSites, splicingMode]);

  // Translation of mature transcript
  const translation = useMemo(() => {
    const seq = matureTranscript.matureRNA;
    const offset = activeFrame - 1;
    const codons: string[] = [];
    const aminoAcids: string[] = [];
    let startFound = false;
    let stopFound = false;

    for (let i = offset; i + 3 <= seq.length; i += 3) {
      const codon = seq.slice(i, i + 3);
      codons.push(codon);
      const aa = GENETIC_CODE[codon] || '?';
      aminoAcids.push(aa);
      if (codon === 'AUG') startFound = true;
      if (aa === '*') stopFound = true;
    }

    const peptideStr = aminoAcids.join('');
    const hasPtc = stopFound && codons.length > 5 && codons[codons.length - 1] !== 'UAA' && codons[codons.length - 1] !== 'UAG' && codons[codons.length - 1] !== 'UGA';

    return {
      codons,
      aminoAcids,
      peptideStr,
      startFound,
      stopFound,
      hasPtc
    };
  }, [matureTranscript.matureRNA, activeFrame]);

  // Ultra Triplet Codon Theory (UTCT) Phase & Splicing Analysis
  const utctAnalysis = useMemo(() => {
    const { primaryDonor, primaryAcceptor } = spliceSites;
    if (primaryDonor === -1 || primaryAcceptor === -1) {
      return {
        phase: 0 as 0 | 1 | 2,
        phaseName: 'Phase 0 (Unsplit)',
        splitDescription: 'No standard intron boundary detected.',
        reconstructedCodon: 'N/A',
        reconstructedAa: 'N/A',
        eseHarmonic: 0.5
      };
    }

    const phase = (primaryDonor % 3) as 0 | 1 | 2;
    let splitDescription = '';
    let reconstructedCodon = '';
    let reconstructedAa = '';

    if (phase === 0) {
      splitDescription = 'Phase 0: Intron cuts cleanly between codons. Both adjacent codons remain intact.';
      const c1 = cleanSeq.slice(primaryDonor - 3, primaryDonor);
      const c2 = cleanSeq.slice(primaryAcceptor + 2, primaryAcceptor + 5);
      reconstructedCodon = `${c1} | ${c2}`;
      reconstructedAa = `${GENETIC_CODE[c1] || '?'}-${GENETIC_CODE[c2] || '?'}`;
    } else if (phase === 1) {
      const b1 = cleanSeq.slice(primaryDonor - 1, primaryDonor);
      const b23 = cleanSeq.slice(primaryAcceptor + 2, primaryAcceptor + 4);
      splitDescription = `Phase 1: 1nt left of donor (${b1}) joins 2nt right of acceptor (${b23}).`;
      reconstructedCodon = b1 + b23;
      reconstructedAa = GENETIC_CODE[reconstructedCodon] || '?';
    } else if (phase === 2) {
      const b12 = cleanSeq.slice(primaryDonor - 2, primaryDonor);
      const b3 = cleanSeq.slice(primaryAcceptor + 2, primaryAcceptor + 3);
      splitDescription = `Phase 2: 2nt left of donor (${b12}) joins 1nt right of acceptor (${b3}).`;
      reconstructedCodon = b12 + b3;
      reconstructedAa = GENETIC_CODE[reconstructedCodon] || '?';
    }

    // ESE density at donor proximity (first 18nt upstream of donor)
    const upstreamExon = cleanSeq.slice(Math.max(0, primaryDonor - 18), primaryDonor);
    let purines = 0;
    for (const char of upstreamExon) {
      if (char === 'A' || char === 'G') purines++;
    }
    const eseHarmonic = upstreamExon.length > 0 ? Math.round((purines / upstreamExon.length) * 100) / 100 : 0.5;

    return {
      phase,
      phaseName: `Phase ${phase}`,
      splitDescription,
      reconstructedCodon,
      reconstructedAa,
      eseHarmonic
    };
  }, [cleanSeq, spliceSites]);

  const handleSelectPreset = (presetId: string) => {
    const preset = GENE_PRESETS.find(p => p.id === presetId);
    if (preset) {
      setSelectedPresetId(presetId);
      setRawSequence(preset.rawSequence);
    }
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedNotification(label);
    setTimeout(() => setCopiedNotification(null), 2500);
  };

  return (
    <div className="space-y-8">
      
      {/* Top Banner & Context */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
            <span>STUDIO CONSOLE</span>
            <span>·</span>
            <span>SPLICESENSE v2.4.0</span>
            <span>·</span>
            <span>INTRON & EXON COMPUTATION</span>
          </div>
          <h2 className="text-2xl font-bold text-white tracking-tight">
            RNA Intron Splicing & Reading Frame Studio
          </h2>
          <p className="text-sm text-slate-300 max-w-2xl">
            Simulate pre-mRNA transesterification reactions, evaluate 5' GU donor and 3' AG acceptor consensus motifs, and inspect open reading frame translation.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => onInductApp('splice-sense')}
            className="px-4 py-2 text-xs font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-lg transition-colors flex items-center gap-1.5 shadow-sm whitespace-nowrap"
          >
            <UploadCloud className="w-3.5 h-3.5" />
            <span>Induct to intronreadinglabs.com</span>
          </button>
        </div>
      </div>

      {/* Preset Gene Loaders */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4">
        <div className="text-xs font-mono uppercase text-slate-400 mb-3 flex items-center justify-between">
          <span>Select Curated Genomic Presets</span>
          <span className="text-slate-400">Homo Sapiens & Synthetic Constructs</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
          {GENE_PRESETS.map((preset) => (
            <button
              key={preset.id}
              onClick={() => handleSelectPreset(preset.id)}
              className={`text-left p-3 rounded-lg border transition-all ${
                selectedPresetId === preset.id
                  ? 'bg-slate-800 border-cyan-500/60 shadow-sm text-white'
                  : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
              }`}
            >
              <div className="font-semibold text-xs text-white truncate">
                {preset.name.split('—')[0]}
              </div>
              <div className="text-[11px] text-slate-400 truncate mt-0.5">
                {preset.organism}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Main Console Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Sequence Editor & Splicing Modes */}
        <div className="lg:col-span-5 space-y-5">
          
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-xs uppercase font-mono tracking-wider text-slate-300">
                Pre-mRNA Sequence Input (5' → 3')
              </label>
              <span className="text-xs font-mono text-cyan-400 tabular-nums">
                {metrics.total} nt
              </span>
            </div>

            <textarea
              value={rawSequence}
              onChange={(e) => {
                setRawSequence(e.target.value);
                setSelectedPresetId('custom');
              }}
              rows={6}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 font-mono text-xs text-cyan-300 tracking-wide focus:outline-none focus:border-cyan-500 resize-none"
              placeholder="Paste genomic DNA or RNA sequence (A, C, G, T, U)..."
            />

            {/* Nucleotide Metrics Strip */}
            <div className="grid grid-cols-4 gap-2 pt-1 border-t border-slate-800/80 text-center font-mono">
              <div className="bg-slate-950/80 p-2 rounded border border-slate-800">
                <div className="text-[10px] text-slate-400">GC CONTENT</div>
                <div className="text-sm font-bold text-white tabular-nums">{metrics.gcPercent}%</div>
              </div>
              <div className="bg-slate-950/80 p-2 rounded border border-slate-800">
                <div className="text-[10px] text-slate-400">ADENINE (A)</div>
                <div className="text-sm font-bold text-slate-300 tabular-nums">{metrics.a}</div>
              </div>
              <div className="bg-slate-950/80 p-2 rounded border border-slate-800">
                <div className="text-[10px] text-slate-400">URACIL (U)</div>
                <div className="text-sm font-bold text-slate-300 tabular-nums">{metrics.u}</div>
              </div>
              <div className="bg-slate-950/80 p-2 rounded border border-slate-800">
                <div className="text-[10px] text-slate-400">G + C BASES</div>
                <div className="text-sm font-bold text-cyan-400 tabular-nums">{metrics.g + metrics.c}</div>
              </div>
            </div>
          </div>

          {/* Splicing Mode Controller */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-3">
            <div className="text-xs uppercase font-mono tracking-wider text-slate-300">
              Alternative Splicing Simulator
            </div>
            
            <div className="space-y-2">
              {[
                { id: 'canonical', label: 'Canonical Exon Splicing (Constitutive)', desc: 'Excision of intervening intron; joining Exon 1 to Exon 2.' },
                { id: 'exon_skipping', label: 'Exon 2 Skipping (Exclusion)', desc: 'Spliceosome bypasses Exon 2, resulting in transcript truncation.' },
                { id: 'intron_retention', label: 'Intron Retention (Unexcised)', desc: 'Failure of spliceosome excision; full intron remains translated.' },
                { id: 'cryptic_site', label: 'Cryptic Splice Activation (Mutation)', desc: 'Aberrant cleavage site leads to pseudo-exon extension.' }
              ].map((mode) => (
                <button
                  key={mode.id}
                  onClick={() => setSplicingMode(mode.id as any)}
                  className={`w-full text-left p-3 rounded-lg border transition-all ${
                    splicingMode === mode.id
                      ? 'bg-slate-800 border-cyan-500/60 text-white'
                      : 'bg-slate-950/60 border-slate-800/80 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                  }`}
                >
                  <div className="font-semibold text-xs text-white">
                    {mode.label}
                  </div>
                  <div className="text-[11px] text-slate-400 mt-0.5">
                    {mode.desc}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Splice Junction Coordinates */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-3 text-xs font-mono">
            <div className="uppercase tracking-wider text-slate-300">
              Splice Junction Detection
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between p-2 rounded bg-slate-950 border border-slate-800">
                <span className="text-emerald-400">5' Splice Donor (GU):</span>
                <span className="text-white tabular-nums">
                  {spliceSites.primaryDonor !== -1 ? `Position ${spliceSites.primaryDonor} nt` : 'Not detected'}
                </span>
              </div>
              <div className="flex items-center justify-between p-2 rounded bg-slate-950 border border-slate-800">
                <span className="text-amber-400">3' Splice Acceptor (AG):</span>
                <span className="text-white tabular-nums">
                  {spliceSites.primaryAcceptor !== -1 ? `Position ${spliceSites.primaryAcceptor} nt` : 'Not detected'}
                </span>
              </div>
              <div className="flex items-center justify-between p-2 rounded bg-slate-950 border border-slate-800">
                <span className="text-slate-400">Total Potential GU Motifs:</span>
                <span className="text-slate-300 tabular-nums">{spliceSites.donors.length}</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded bg-slate-950 border border-slate-800">
                <span className="text-slate-400">Total Potential AG Motifs:</span>
                <span className="text-slate-300 tabular-nums">{spliceSites.acceptors.length}</span>
              </div>
            </div>
          </div>

        </div>

        {/* Right Column: Interactive Diagram & Translation Result */}
        <div className="lg:col-span-7 space-y-5">
          
          {/* Transcript Architecture Diagram */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4">
            <div className="flex items-center justify-between">
              <div className="text-xs uppercase font-mono tracking-wider text-slate-300">
                Transcript Architecture
              </div>
              <div className="text-xs text-slate-400 font-mono">
                5' Cap → Exon 1 → Intron 1 → Exon 2 → 3' Poly-A
              </div>
            </div>

            {/* Visual Exon/Intron schematic */}
            <div className="p-4 rounded-lg bg-slate-950 border border-slate-800 space-y-3">
              <div className="flex items-center h-10 w-full gap-1">
                
                {/* Exon 1 */}
                <div 
                  className="h-full bg-cyan-950/70 border border-cyan-500/50 rounded flex items-center justify-center text-xs font-mono font-bold text-cyan-300 px-2 truncate"
                  style={{ flex: matureTranscript.exon1.length || 1 }}
                  title={`Exon 1: ${matureTranscript.exon1.length} nt`}
                >
                  Exon 1 ({matureTranscript.exon1.length} nt)
                </div>

                {/* Intron 1 (or excised line) */}
                {splicingMode !== 'intron_retention' ? (
                  <div 
                    className="h-2 border-b-2 border-dashed border-amber-500/60 relative flex items-center justify-center"
                    style={{ flex: matureTranscript.intron.length || 1 }}
                    title={`Intron 1: Excised (${matureTranscript.intron.length} nt)`}
                  >
                    <span className="absolute -top-3 text-[10px] font-mono text-amber-400/80 bg-slate-950 px-1">
                      Excised Intron ({matureTranscript.intron.length} nt)
                    </span>
                  </div>
                ) : (
                  <div 
                    className="h-full bg-amber-950/70 border border-amber-500/50 rounded flex items-center justify-center text-xs font-mono font-bold text-amber-300 px-2 truncate"
                    style={{ flex: matureTranscript.intron.length || 1 }}
                    title={`Retained Intron: ${matureTranscript.intron.length} nt`}
                  >
                    Retained Intron ({matureTranscript.intron.length} nt)
                  </div>
                )}

                {/* Exon 2 */}
                {splicingMode !== 'exon_skipping' && (
                  <div 
                    className="h-full bg-cyan-950/70 border border-cyan-500/50 rounded flex items-center justify-center text-xs font-mono font-bold text-cyan-300 px-2 truncate"
                    style={{ flex: matureTranscript.exon2.length || 1 }}
                    title={`Exon 2: ${matureTranscript.exon2.length} nt`}
                  >
                    Exon 2 ({matureTranscript.exon2.length} nt)
                  </div>
                )}

              </div>

              <div className="text-xs text-slate-300 leading-relaxed font-mono">
                {matureTranscript.consequence}
              </div>
            </div>

            {/* Reading Frame Selector */}
            <div className="pt-2 flex items-center justify-between">
              <span className="text-xs font-mono uppercase text-slate-400">
                Open Reading Frame (ORF):
              </span>
              <div className="flex items-center gap-1.5 p-1 bg-slate-950 rounded-lg border border-slate-800">
                {[1, 2, 3].map((frame) => (
                  <button
                    key={frame}
                    onClick={() => setActiveFrame(frame)}
                    className={`px-3 py-1 text-xs font-mono font-medium rounded transition-colors ${
                      activeFrame === frame
                        ? 'bg-cyan-400 text-slate-950 font-bold'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Frame +{frame}
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Mature mRNA Sequence Display */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-3">
            <div className="flex items-center justify-between">
              <div className="text-xs uppercase font-mono tracking-wider text-slate-300">
                Spliced Mature mRNA ({matureTranscript.matureRNA.length} nt)
              </div>
              <button
                onClick={() => copyToClipboard(matureTranscript.matureRNA, 'mRNA Sequence')}
                className="text-xs font-mono text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
              >
                <Copy className="w-3.5 h-3.5" />
                <span>Copy RNA</span>
              </button>
            </div>

            <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 font-mono text-xs text-slate-300 break-all leading-relaxed max-h-36 overflow-y-auto">
              {matureTranscript.matureRNA.match(/.{1,3}/g)?.map((triplet, idx) => (
                <span
                  key={idx}
                  className={`mr-1 px-0.5 rounded ${
                    triplet === 'AUG'
                      ? 'bg-emerald-500/30 text-emerald-300 font-bold'
                      : triplet === 'UAA' || triplet === 'UAG' || triplet === 'UGA'
                      ? 'bg-rose-500/30 text-rose-300 font-bold'
                      : 'text-slate-300'
                  }`}
                  title={`Codon ${idx + 1}: ${triplet}`}
                >
                  {triplet}
                </span>
              ))}
            </div>
          </div>

          {/* Translated Peptide & Translation Status */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4">
            <div className="flex items-center justify-between">
              <div className="text-xs uppercase font-mono tracking-wider text-slate-300">
                Predicted Peptide Translation ({translation.codons.length} Amino Acids)
              </div>
              <button
                onClick={() => copyToClipboard(translation.peptideStr, 'Peptide')}
                className="text-xs font-mono text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
              >
                <Copy className="w-3.5 h-3.5" />
                <span>Copy Peptide</span>
              </button>
            </div>

            <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 font-mono text-xs text-cyan-300 tracking-wider break-all max-h-28 overflow-y-auto">
              {translation.peptideStr || 'No translation available in current frame.'}
            </div>

            {/* Translation Assessment Banner */}
            <div className="grid grid-cols-2 gap-3 text-xs font-mono">
              <div className="p-2.5 rounded bg-slate-950 border border-slate-800 flex items-center gap-2">
                <CheckCircle2 className={`w-4 h-4 ${translation.startFound ? 'text-emerald-400' : 'text-slate-500'}`} />
                <span className={translation.startFound ? 'text-white' : 'text-slate-400'}>
                  {translation.startFound ? 'Start Codon (AUG) Present' : 'No Initiator AUG'}
                </span>
              </div>
              <div className="p-2.5 rounded bg-slate-950 border border-slate-800 flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${translation.hasPtc ? 'bg-rose-400' : 'bg-emerald-400'}`} />
                <span className={translation.hasPtc ? 'text-rose-400' : 'text-emerald-400'}>
                  {translation.hasPtc ? 'Premature Termination (PTC)' : 'Canonical Frame Maintained'}
                </span>
              </div>
            </div>

            {copiedNotification && (
              <div className="text-xs font-mono text-emerald-400 pt-1 text-center">
                ✓ {copiedNotification} copied to clipboard
              </div>
            )}

          </div>

          {/* Ultra Triplet Codon Theory (UTCT) Phase Inspector Card */}
          <div className="bg-slate-900 border border-cyan-500/30 rounded-xl p-5 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider">
                  Ultra Triplet Codon Theory (UTCT) Phase Analysis
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950 border border-cyan-500/40 text-cyan-300 font-bold">
                  {utctAnalysis.phaseName}
                </span>
              </div>
              {onOpenUtct && (
                <button
                  onClick={onOpenUtct}
                  className="text-xs font-mono text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
                >
                  <span>Open Full UTCT Engine</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono text-xs">
              <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-1">
                <div className="text-[10px] text-slate-400">INTRON SPLIT PHASE</div>
                <div className="text-lg font-bold text-white">{utctAnalysis.phaseName}</div>
                <div className="text-[11px] text-slate-400">
                  {utctAnalysis.phase === 0 ? 'Inter-codon boundary' : utctAnalysis.phase === 1 ? '1 nt / 2 nt split' : '2 nt / 1 nt split'}
                </div>
              </div>

              <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-1">
                <div className="text-[10px] text-slate-400">RECONSTRUCTED JUNCTION CODON</div>
                <div className="text-lg font-bold text-cyan-400">{utctAnalysis.reconstructedCodon}</div>
                <div className="text-[11px] text-slate-400">
                  Residue: <strong className="text-white">{utctAnalysis.reconstructedAa}</strong>
                </div>
              </div>

              <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-1">
                <div className="text-[10px] text-slate-400">ESE HARMONIC DENSITY</div>
                <div className="text-lg font-bold text-emerald-400">{Math.round(utctAnalysis.eseHarmonic * 100)}%</div>
                <div className="text-[11px] text-slate-400">Purine enhancer ratio</div>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed font-sans bg-slate-950 p-3 rounded-lg border border-slate-800">
              {utctAnalysis.splitDescription} Under the Ultra Triplet Codon Theory, maintaining split-codon phase symmetry across Exon 1 and Exon 2 guarantees reading frame invariance and shields the transcript from premature stop codon degradation.
            </p>
          </div>

        </div>

      </div>

    </div>
  );
};
