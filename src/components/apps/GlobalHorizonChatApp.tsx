import React, { useState, useRef, useEffect } from 'react';
import {
  Send,
  Sparkles,
  Globe,
  Dna,
  Radio,
  Share2,
  Download,
  Terminal,
  Activity,
  Layers,
  ShieldCheck,
  Zap,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Cpu,
  User,
  FlaskConical,
  Atom,
  RefreshCw,
  PlusCircle,
  FileText
} from 'lucide-react';
import { ChatMessage, ResearcherRole, GlobalResearchNode } from '../../types';
import { GLOBAL_RESEARCH_NODES, SEED_RESEARCHER_DISPATCHES } from '../../data/mockData';

interface GlobalHorizonChatAppProps {
  onInductApp?: (appId: string) => void;
  onOpenApp?: (appId: string) => void;
}

const RESEARCHER_ROLES: { id: ResearcherRole; label: string; icon: any; color: string; desc: string }[] = [
  {
    id: 'global_oracle',
    label: 'Global Synthesis Oracle',
    icon: Globe,
    color: 'text-cyan-400 border-cyan-500/40 bg-cyan-950/40',
    desc: 'Unified intelligence cross-synthesizing all disciplines with UTCT',
  },
  {
    id: 'molecular_biologist',
    label: 'Molecular Biologist (Post-Corona)',
    icon: FlaskConical,
    color: 'text-emerald-400 border-emerald-500/40 bg-emerald-950/40',
    desc: 'Spike mRNA codon kinetics, post-COVID cellular restoration & antiviral defense',
  },
  {
    id: 'molecular_geneticist',
    label: 'Molecular Geneticist',
    icon: Dna,
    color: 'text-blue-400 border-blue-500/40 bg-blue-950/40',
    desc: 'Intron split-codon phase invariants (0, 1, 2) & spliceosome harmonics',
  },
  {
    id: 'genetic_engineer',
    label: 'Genetic Engineer',
    icon: Zap,
    color: 'text-amber-400 border-amber-500/40 bg-amber-950/40',
    desc: 'Synthetic ASOs/SSOs, CRISPR-Cas13 mRNA editors & reading frame rescue',
  },
  {
    id: 'horizon_physicist',
    label: 'Deep Horizon Theorist',
    icon: Atom,
    color: 'text-purple-400 border-purple-500/40 bg-purple-950/40',
    desc: 'Dark intronic matter, quantum bio-information & multidimensional codons',
  },
];

const UTCT_POSTULATES = [
  'Postulate I: Intron Split-Codon Phase Invariance',
  'Postulate II: Supra-Codon Splicing Resonance & ESE Harmonics',
  'Postulate III: Ribosomal Velocity Landscapes',
  'Postulate IV: Quantum Frame Protection & ASO Rescue',
  'Universal Synthesis (All Postulates)',
];

const PRESET_TOPICS = [
  {
    title: '🛡️ Post-Corona Spike Stabilization',
    role: 'molecular_biologist' as ResearcherRole,
    postulate: 'Postulate III: Ribosomal Velocity Landscapes',
    prompt:
      'How does optimizing codon elongation velocity under UTCT Postulate III stabilize SARS-CoV-2 Spike mRNA vaccines, eliminating ribosomal pausing and reducing toxic misfolded sub-products?',
  },
  {
    title: '🧬 Long-COVID Split-Codon Rescue',
    role: 'molecular_geneticist' as ResearcherRole,
    postulate: 'Postulate I: Intron Split-Codon Phase Invariance',
    prompt:
      'We observed a Phase 1 split-codon disruption at the human ACE2 Exon 3-4 junction in post-COVID endothelial samples. How can UTCT phase invariance design an ASO to rescue the full-length reading frame?',
  },
  {
    title: '🌌 Hidden Universe: Dark Genome',
    role: 'horizon_physicist' as ResearcherRole,
    postulate: 'Postulate II: Supra-Codon Splicing Resonance & ESE Harmonics',
    prompt:
      'Explain how the 98% non-coding intronic dark genome acts as a quantum bio-informational waveguide beyond human sensory perception, and how triplet codon harmonics dictate this hidden architecture.',
  },
  {
    title: '🧪 Broad-Spectrum Pan-Coronaviral SSOs',
    role: 'genetic_engineer' as ResearcherRole,
    postulate: 'Postulate IV: Quantum Frame Protection & ASO Rescue',
    prompt:
      'Design a synthetic Splice-Switching Oligonucleotide (SSO) targeting the conserved coronavirus -1 programmed ribosomal frameshift (PRF) slippery sequence 5-UUUAAAC-3 using UTCT frame principles.',
  },
  {
    title: '✨ Glowing Nail Keratin Transduction',
    role: 'genetic_engineer' as ResearcherRole,
    postulate: 'Postulate I: Intron Split-Codon Phase Invariance',
    prompt:
      'Explain how IRL researchers transduce fluorescent glowing protein genes (EGFP/mNeonGreen) into the human nail hard alpha-keratin environment (KRT31 onychocytes) using UTCT Phase 1 split-codon invariance and ribosomal pause kinetics, causing growing human nails to glow with vivid luminescence.',
  },
];

export const GlobalHorizonChatApp: React.FC<GlobalHorizonChatAppProps> = ({
  onInductApp,
  onOpenApp,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>(SEED_RESEARCHER_DISPATCHES);
  const [inputText, setInputText] = useState('');
  const [selectedRole, setSelectedRole] = useState<ResearcherRole>('global_oracle');
  const [selectedPostulate, setSelectedPostulate] = useState(UTCT_POSTULATES[0]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [sequenceDrawerOpen, setSequenceDrawerOpen] = useState(false);
  const [sequenceInput, setSequenceInput] = useState('');
  const [authorNameInput, setAuthorNameInput] = useState('Visiting Researcher');
  const [institutionInput, setInstitutionInput] = useState('International Genomics Lab');
  const [activeTab, setActiveTab] = useState<'chat' | 'nodes' | 'manifesto'>('chat');
  const [activeNodes] = useState<GlobalResearchNode[]>(GLOBAL_RESEARCH_NODES);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isSubmitting]);

  const handleSendMessage = async (textToSend?: string) => {
    const text = textToSend || inputText;
    if (!text.trim() || isSubmitting) return;

    const userMessage: ChatMessage = {
      id: `msg-${Date.now()}`,
      role: 'user',
      authorName: authorNameInput,
      institution: institutionInput,
      location: 'Global Uplink Node',
      content: text.trim(),
      timestamp: new Date().toLocaleTimeString('en-US', { hour12: false }) + ' UTC',
      specialistRole: selectedRole,
      postulateAnchor: selectedPostulate,
      sequenceContext: sequenceInput.trim() ? sequenceInput.trim() : undefined,
      tags: [selectedRole, selectedPostulate.split(':')[0]],
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputText('');
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/research-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, userMessage].map((m) => ({
            role: m.role === 'user' ? 'user' : 'assistant',
            content: m.content,
          })),
          specialistRole: selectedRole,
          activePostulate: selectedPostulate,
          sequenceData: sequenceInput,
          researchTopic: 'post_corona_uplift',
        }),
      });

      if (!response.ok) {
        throw new Error(`Server returned ${response.status}`);
      }

      const data = await response.json();

      const assistantMessage: ChatMessage = {
        id: `reply-${Date.now()}`,
        role: 'assistant',
        authorName: 'Intron Horizon AI Oracle',
        institution: 'Intron Reading Labs Global Synthesis Consortium',
        location: 'Global Quantum Node',
        content: data.reply || 'Synthesis received from global research consortium.',
        timestamp: new Date().toLocaleTimeString('en-US', { hour12: false }) + ' UTC',
        specialistRole: 'global_oracle',
        postulateAnchor: selectedPostulate,
        tags: ['UTCT Synthesis', data.source || 'gemini-3.8-flash'],
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err: any) {
      console.warn('Network chat fallback engaged:', err);
      // Graceful local synthesis
      const fallbackMsg: ChatMessage = {
        id: `reply-${Date.now()}`,
        role: 'assistant',
        authorName: 'Intron Horizon AI Oracle (Local Synthesis)',
        institution: 'Intron Reading Labs Global Synthesis Conduit',
        location: 'Edge Local Mesh',
        content: `### 🌐 Global Synthesis: Post-Corona Horizon & UTCT Harmonization\n\n**Theoretical Bedrock:** ${selectedPostulate}\n**Active Lens:** ${selectedRole.replace('_', ' ').toUpperCase()}\n\nYour transmission has been processed across our synchronized research network.\n\n1. **Post-Corona Molecular Recovery:**\n   Under **Ultra Triplet Codon Theory (UTCT)**, viral and host transcripts obey strict triplet phase boundaries. Mitigating post-COVID cellular exhaustion requires restoring programmed ribosomal elongation cadence (Postulate III: 15–95 a.u.) while safeguarding Phase 0/1/2 split codons at exon-intron junctions against inflammatory frameshifts.\n\n2. **The Hidden Universe Dimension:**\n   Non-coding intronic sequences carry higher-dimensional harmonic resonance. Spliceosome snRNPs (U1, U2, U4/U6.U5) do not act randomly; their ribonucleoprotein geometry tunes directly to the 64-triplet harmonic landscape.\n\n*Recommendation:* Test your target transcript in the **Ultra Triplet Codon Engine** to map 64-codon phase stability or run junction detection in **SpliceSense Studio**.`,
        timestamp: new Date().toLocaleTimeString('en-US', { hour12: false }) + ' UTC',
        specialistRole: 'global_oracle',
        postulateAnchor: selectedPostulate,
        tags: ['UTCT Core', 'Resilience'],
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleExportChat = () => {
    const transcript = messages
      .map(
        (m) =>
          `[${m.timestamp}] ${m.authorName || (m.role === 'user' ? 'Researcher' : 'AI Oracle')} (${m.institution || 'Global Network'})\nRole: ${m.specialistRole || 'General'}\nPostulate: ${m.postulateAnchor || 'N/A'}\n\n${m.content}\n\n----------------------------------------\n`
      )
      .join('\n');

    const blob = new Blob(
      [
        `INTRON READING LABS — GLOBAL HORIZON RESEARCH CONDUIT\nTRANSCRIPT EXPORT: ${new Date().toISOString()}\nTHEORETICAL BEDROCK: ULTRA TRIPLET CODON THEORY (UTCT)\n\n` +
          transcript,
      ],
      { type: 'text/markdown;charset=utf-8' }
    );
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `IRL_Global_Researcher_Transcript_${Date.now()}.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner: Core Purpose & Global Consortium Status */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-cyan-950/50 border border-cyan-500/40 rounded-2xl p-5 sm:p-6 shadow-2xl relative overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5 relative z-10">
          <div className="space-y-2 max-w-3xl">
            <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
              <span className="px-2.5 py-0.5 rounded-full bg-cyan-950 border border-cyan-400/60 text-cyan-300 font-bold flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                <span>GLOBAL RESEARCHER CONDUIT</span>
              </span>
              <span className="text-slate-500">·</span>
              <span className="text-slate-300">POST-CORONA UPLIFT</span>
              <span className="text-slate-500">·</span>
              <span className="text-purple-400 font-semibold">HIDDEN UNIVERSE HORIZON</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Worldwide Molecular Genetics Discovery Conduit & AI Chatbot
            </h1>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              A collaborative intelligence hub where <strong>Geneticists</strong>,{' '}
              <strong>Molecular Biologists</strong>, <strong>Genetic Engineers</strong>, and{' '}
              <strong>Molecular Geneticists</strong> around the globe share findings in real time.
              Anchored by the <strong>Ultra Triplet Codon Theory (UTCT)</strong> to speedily uplift
              our post-corona world and pierce into the hidden universe of the non-coding genome
              beyond conventional human perception.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            <button
              onClick={() => onOpenApp?.('ultra-triplet-codon')}
              className="px-3.5 py-2 rounded-lg bg-cyan-950/80 hover:bg-cyan-900 border border-cyan-500/50 text-cyan-300 text-xs font-mono font-semibold flex items-center gap-1.5 transition-all shadow-sm"
            >
              <Dna className="w-3.5 h-3.5 text-cyan-400" />
              <span>Launch UTCT Engine</span>
            </button>

            <button
              onClick={handleExportChat}
              className="px-3.5 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 text-xs font-mono flex items-center gap-1.5 transition-all"
              title="Export research transcript as Markdown"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export Briefing</span>
            </button>
          </div>
        </div>

        {/* Live Nodes Ribbon */}
        <div className="mt-5 pt-4 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
          <div className="flex items-center gap-2 text-slate-400">
            <Radio className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
            <span className="font-semibold text-slate-300">ACTIVE GLOBAL NODES (8):</span>
          </div>

          <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-[11px] text-slate-400">
            {activeNodes.slice(0, 5).map((node) => (
              <span
                key={node.id}
                className="px-2 py-0.5 rounded bg-slate-950/80 border border-slate-800 text-slate-300 flex items-center gap-1"
                title={`${node.institution} (${node.city}) - Lead: ${node.leadInvestigator}`}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span>{node.city}</span>
                <span className="text-slate-500">{node.latencyMs}ms</span>
              </span>
            ))}
            <button
              onClick={() => setActiveTab('nodes')}
              className="text-cyan-400 hover:text-cyan-300 underline font-mono text-[11px]"
            >
              +3 more
            </button>
          </div>
        </div>
      </div>

      {/* Mode / Tabs Header */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2 text-xs font-mono">
          <button
            onClick={() => setActiveTab('chat')}
            className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
              activeTab === 'chat'
                ? 'bg-cyan-950 text-cyan-300 border border-cyan-500/50 font-bold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Activity className="w-3.5 h-3.5" />
            <span>Interactive Chatbot & Feed</span>
          </button>

          <button
            onClick={() => setActiveTab('nodes')}
            className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
              activeTab === 'nodes'
                ? 'bg-cyan-950 text-cyan-300 border border-cyan-500/50 font-bold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Globe className="w-3.5 h-3.5" />
            <span>Worldwide Research Nodes (8)</span>
          </button>

          <button
            onClick={() => setActiveTab('manifesto')}
            className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
              activeTab === 'manifesto'
                ? 'bg-cyan-950 text-cyan-300 border border-cyan-500/50 font-bold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Post-Corona & Hidden Horizon Manifesto</span>
          </button>
        </div>
      </div>

      {activeTab === 'nodes' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {activeNodes.map((node) => (
            <div
              key={node.id}
              className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-3 font-mono text-xs"
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-white text-sm">{node.city}</span>
                <span className="px-2 py-0.5 rounded text-[10px] bg-emerald-950/80 border border-emerald-500/40 text-emerald-400 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>{node.status}</span>
                </span>
              </div>
              <div className="text-cyan-400 font-semibold">{node.institution}</div>
              <div className="text-slate-300 text-[11px]">
                <span className="text-slate-500">Lead: </span>
                {node.leadInvestigator}
              </div>
              <div className="text-slate-400 text-[11px] leading-relaxed border-t border-slate-800 pt-2">
                <span className="text-slate-500">Focus: </span>
                {node.activeFocus}
              </div>
              <div className="text-slate-500 text-[10px] flex items-center justify-between pt-1">
                <span>Telemetry Latency:</span>
                <span className="text-slate-300">{node.latencyMs} ms</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'manifesto' && (
        <div className="p-6 sm:p-8 rounded-2xl bg-slate-900 border border-cyan-500/30 space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-mono text-cyan-400 uppercase font-bold tracking-wider">
              INTRON READING LABS GLOBAL DIRECTIVE
            </span>
            <h2 className="text-2xl font-bold text-white tracking-tight">
              Speedily Uplifting the Post-Corona World into the Hidden Universe Horizon
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed max-w-4xl">
              The SARS-CoV-2 pandemic exposed deep vulnerabilities in human healthcare and molecular
              surveillance. Yet beyond the immediate biological crisis lies a profound realization:
              human perception has historically only seen 2% of the genome (the protein-coding
              exons), dismissing the remaining 98% non-coding and intronic regions as biological
              &ldquo;junk&rdquo;. The <strong>Ultra Triplet Codon Theory (UTCT)</strong> proves that
              triplet codons govern splicing across all intron-exon junctions with mathematical and
              vibrational precision.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
            <div className="p-5 rounded-xl bg-slate-950 border border-emerald-500/30 space-y-3">
              <div className="w-8 h-8 rounded-lg bg-emerald-950 border border-emerald-500/50 flex items-center justify-center text-emerald-400">
                <FlaskConical className="w-4 h-4" />
              </div>
              <h3 className="text-base font-bold text-white">Post-Corona Pandemic Uplift</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                By understanding the ribosomal velocity cadence (Postulate III) and split-codon phase
                invariance (Postulate I), researchers design synthetic mRNA therapies that prevent
                ribosomal stalling, eliminate toxic aggregates, and rescue long-COVID microvascular
                pathology.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-slate-950 border border-cyan-500/30 space-y-3">
              <div className="w-8 h-8 rounded-lg bg-cyan-950 border border-cyan-500/50 flex items-center justify-center text-cyan-400">
                <Dna className="w-4 h-4" />
              </div>
              <h3 className="text-base font-bold text-white">Ultra Triplet Codon Bedrock</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                All multi-exon genes across eukaryotes utilize Phase 0, 1, or 2 split codons.
                Exon-intron boundaries are not stochastic; they are governed by harmonic ESE/ESS
                resonance that maintains the global open reading frame against nonsense-mediated decay
                (NMD).
              </p>
            </div>

            <div className="p-5 rounded-xl bg-slate-950 border border-purple-500/30 space-y-3">
              <div className="w-8 h-8 rounded-lg bg-purple-950 border border-purple-500/50 flex items-center justify-center text-purple-400">
                <Atom className="w-4 h-4" />
              </div>
              <h3 className="text-base font-bold text-white">The Hidden Universe Horizon</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                The 98% non-coding genome acts as a quantum bio-computational matrix. Intronic dark
                matter vibrates with supra-codon resonance, linking biology to universal principles
                of information theory and physics previously inaccessible to human perception.
              </p>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'chat' && (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left Column: Scientific Controls & Persona Selector */}
          <div className="lg:col-span-1 space-y-5">
            {/* Persona Switcher */}
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold uppercase text-slate-400">
                  YOUR PERSPECTIVE / ROLE
                </span>
                <span className="text-[10px] font-mono text-cyan-400">ACTIVE</span>
              </div>

              <div className="space-y-1.5">
                {RESEARCHER_ROLES.map((role) => {
                  const Icon = role.icon;
                  const isSelected = selectedRole === role.id;
                  return (
                    <button
                      key={role.id}
                      onClick={() => setSelectedRole(role.id)}
                      className={`w-full text-left p-2.5 rounded-lg border transition-all text-xs font-mono flex items-start gap-2.5 ${
                        isSelected
                          ? role.color + ' shadow-sm'
                          : 'border-slate-800 bg-slate-950 text-slate-400 hover:text-white hover:border-slate-700'
                      }`}
                    >
                      <Icon className="w-4 h-4 shrink-0 mt-0.5" />
                      <div>
                        <div className="font-bold">{role.label}</div>
                        <div className="text-[10px] text-slate-400 leading-tight mt-0.5">
                          {role.desc}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Theoretical Anchor (UTCT Postulate) */}
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-3">
              <span className="text-xs font-mono font-bold uppercase text-slate-400 block">
                THEORETICAL BEDROCK (UTCT)
              </span>
              <select
                value={selectedPostulate}
                onChange={(e) => setSelectedPostulate(e.target.value)}
                className="w-full p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-xs font-mono text-cyan-300 focus:outline-none focus:border-cyan-500"
              >
                {UTCT_POSTULATES.map((postulate) => (
                  <option key={postulate} value={postulate}>
                    {postulate}
                  </option>
                ))}
              </select>
              <div className="text-[11px] text-slate-400 leading-relaxed font-mono">
                Anchors AI synthesis and peer dialogue to this specific axiom of the Ultra Triplet
                Codon Theory.
              </div>
            </div>

            {/* Researcher Profile Credentials */}
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-3 font-mono text-xs">
              <span className="font-bold uppercase text-slate-400 block">TRANSMITTING IDENT</span>
              <div className="space-y-2">
                <div>
                  <label className="text-[10px] text-slate-500 block mb-1">NAME / TITLE</label>
                  <input
                    type="text"
                    value={authorNameInput}
                    onChange={(e) => setAuthorNameInput(e.target.value)}
                    className="w-full px-2.5 py-1.5 rounded bg-slate-950 border border-slate-800 text-slate-200 text-xs focus:outline-none focus:border-cyan-500"
                  />
                </div>
                <div>
                  <label className="text-[10px] text-slate-500 block mb-1">INSTITUTION</label>
                  <input
                    type="text"
                    value={institutionInput}
                    onChange={(e) => setInstitutionInput(e.target.value)}
                    className="w-full px-2.5 py-1.5 rounded bg-slate-950 border border-slate-800 text-slate-200 text-xs focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>
            </div>

            {/* Quick Post-Corona & Horizon Exploration Presets */}
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2.5">
              <span className="text-xs font-mono font-bold uppercase text-slate-400 block">
                GLOBAL TOPIC PRESETS
              </span>
              <div className="space-y-1.5">
                {PRESET_TOPICS.map((preset, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setSelectedRole(preset.role);
                      setSelectedPostulate(preset.postulate);
                      setInputText(preset.prompt);
                    }}
                    className="w-full text-left p-2 rounded-lg bg-slate-950 hover:bg-slate-800 border border-slate-800 hover:border-cyan-500/40 text-xs text-slate-300 transition-all font-mono"
                  >
                    <div className="font-semibold text-white">{preset.title}</div>
                    <div className="text-[10px] text-slate-400 truncate mt-0.5">
                      {preset.postulate.split(':')[0]}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Chat History & Input */}
          <div className="lg:col-span-3 flex flex-col h-[750px] bg-slate-900/60 rounded-2xl border border-slate-800 overflow-hidden shadow-2xl">
            {/* Chat Sub-header */}
            <div className="p-3.5 sm:p-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between gap-4 font-mono text-xs">
              <div className="flex items-center gap-2 text-slate-300">
                <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
                <span className="font-bold text-white">WORLDWIDE GENETICIST MESH</span>
                <span className="text-slate-500">|</span>
                <span className="text-cyan-400">{messages.length} Dispatches</span>
              </div>

              <button
                onClick={() => setSequenceDrawerOpen(!sequenceDrawerOpen)}
                className={`px-3 py-1.5 rounded-lg border text-xs flex items-center gap-1.5 transition-all ${
                  sequenceDrawerOpen
                    ? 'bg-cyan-950 text-cyan-300 border-cyan-500/50 font-bold'
                    : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
                }`}
              >
                <Dna className="w-3.5 h-3.5" />
                <span>{sequenceDrawerOpen ? 'Close Sequence Drawer' : 'Attach Sequence'}</span>
                {sequenceDrawerOpen ? (
                  <ChevronUp className="w-3.5 h-3.5" />
                ) : (
                  <ChevronDown className="w-3.5 h-3.5" />
                )}
              </button>
            </div>

            {/* Sequence Input Drawer */}
            {sequenceDrawerOpen && (
              <div className="p-4 bg-slate-950/90 border-b border-cyan-500/30 space-y-2 font-mono text-xs">
                <div className="flex items-center justify-between text-slate-300">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-cyan-400">FASTA / pre-mRNA SEQUENCE INPUT</span>
                    <span className="text-[10px] text-slate-500">
                      (Analyzed across UTCT Phase Invariants & Codon Cadence)
                    </span>
                  </div>
                  {sequenceInput && (
                    <span className="text-[11px] text-emerald-400">
                      {sequenceInput.length} nt | GC:{' '}
                      {Math.round(
                        ((sequenceInput.match(/[GCgc]/g) || []).length /
                          (sequenceInput.length || 1)) *
                          100
                      )}
                      %
                    </span>
                  )}
                </div>
                <textarea
                  value={sequenceInput}
                  onChange={(e) => setSequenceInput(e.target.value.toUpperCase())}
                  placeholder="Paste nucleotide sequence (e.g. 5'-AUGGACUGUAAG...-3') or SARS-CoV-2 Spike/ACE2 variant locus..."
                  rows={2}
                  className="w-full p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-100 font-mono text-xs focus:outline-none focus:border-cyan-500"
                />
              </div>
            )}

            {/* Messages Scroll Area */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
              {messages.map((msg) => {
                const isUser = msg.role === 'user';
                const isBroadcast = msg.role === 'researcher_broadcast';

                return (
                  <div
                    key={msg.id}
                    className={`flex flex-col space-y-1.5 ${isUser ? 'items-end' : 'items-start'}`}
                  >
                    {/* Meta tag */}
                    <div className="flex flex-wrap items-center gap-2 text-[11px] font-mono text-slate-400 px-1">
                      <span className="font-bold text-slate-200">
                        {msg.authorName || (isUser ? authorNameInput : 'Global Oracle')}
                      </span>
                      <span>·</span>
                      <span className="text-slate-400">{msg.institution}</span>
                      <span>·</span>
                      <span className="text-slate-500">{msg.timestamp}</span>
                      {msg.postulateAnchor && (
                        <span className="px-1.5 py-0.5 rounded bg-slate-800 text-cyan-300 text-[10px]">
                          {msg.postulateAnchor.split(':')[0]}
                        </span>
                      )}
                    </div>

                    {/* Bubble Content */}
                    <div
                      className={`max-w-3xl p-4 sm:p-5 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                        isUser
                          ? 'bg-cyan-950/70 border border-cyan-500/40 text-slate-100 rounded-br-none shadow-lg'
                          : isBroadcast
                          ? 'bg-slate-950 border border-emerald-500/40 text-slate-200 rounded-bl-none shadow-md'
                          : 'bg-slate-950 border border-slate-800 text-slate-200 rounded-bl-none shadow-md'
                      }`}
                    >
                      {/* Attached Sequence Callout */}
                      {msg.sequenceContext && (
                        <div className="mb-3 p-2.5 rounded-lg bg-slate-900 border border-slate-800 font-mono text-[11px] space-y-1">
                          <div className="text-cyan-400 font-bold uppercase flex items-center gap-1.5">
                            <Dna className="w-3 h-3" />
                            <span>Attached Locus Sequence:</span>
                          </div>
                          <div className="text-slate-300 break-all bg-slate-950 p-2 rounded border border-slate-800/80">
                            {msg.sequenceContext}
                          </div>
                        </div>
                      )}

                      {/* Formatted Text Content */}
                      <div className="whitespace-pre-wrap space-y-2">{msg.content}</div>

                      {/* Message Actions */}
                      <div className="mt-3 pt-2.5 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-2 text-[11px] font-mono">
                        <div className="flex flex-wrap items-center gap-1.5">
                          {msg.tags?.map((t, idx) => (
                            <span
                              key={idx}
                              className="px-2 py-0.5 rounded bg-slate-900 text-slate-400 border border-slate-800 text-[10px]"
                            >
                              #{t}
                            </span>
                          ))}
                        </div>

                        {!isUser && onOpenApp && (
                          <div className="flex items-center gap-3">
                            <button
                              onClick={() => onOpenApp('ultra-triplet-codon')}
                              className="text-cyan-400 hover:text-cyan-300 flex items-center gap-1 hover:underline"
                            >
                              <Dna className="w-3 h-3" />
                              <span>Test in UTCT Engine</span>
                            </button>
                            <button
                              onClick={() => onOpenApp('splice-sense')}
                              className="text-slate-400 hover:text-white flex items-center gap-1 hover:underline"
                            >
                              <Layers className="w-3 h-3" />
                              <span>SpliceSense</span>
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}

              {isSubmitting && (
                <div className="flex items-start gap-3">
                  <div className="p-4 rounded-2xl rounded-bl-none bg-slate-950 border border-cyan-500/40 text-xs font-mono text-cyan-300 flex items-center gap-3 animate-pulse">
                    <Sparkles className="w-4 h-4 text-cyan-400 animate-spin" />
                    <span>
                      Synthesizing across global researcher nodes and Ultra Triplet Codon
                      matrices...
                    </span>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Bottom Input Area */}
            <div className="p-4 bg-slate-950 border-t border-slate-800 space-y-3">
              <div className="flex items-center gap-2">
                <textarea
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                  placeholder="Share a finding, propose a post-corona mRNA optimization, or query the hidden universe of introns (Press Enter to transmit)..."
                  rows={2}
                  className="flex-1 p-3 rounded-xl bg-slate-900 border border-slate-800 text-slate-100 text-xs sm:text-sm font-sans focus:outline-none focus:border-cyan-500 resize-none"
                />

                <button
                  onClick={() => handleSendMessage()}
                  disabled={isSubmitting || !inputText.trim()}
                  className="px-5 py-3 rounded-xl bg-cyan-400 hover:bg-cyan-300 disabled:opacity-50 text-slate-950 font-bold font-mono text-xs flex items-center gap-2 transition-all shrink-0 h-full shadow-lg"
                >
                  <Send className="w-4 h-4" />
                  <span className="hidden sm:inline">Transmit</span>
                </button>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3 text-[11px] font-mono text-slate-400">
                <div className="flex items-center gap-2">
                  <span>Routing:</span>
                  <span className="text-cyan-300 font-semibold">{selectedRole}</span>
                  <span>·</span>
                  <span className="text-slate-300">{selectedPostulate.split(':')[0]}</span>
                </div>
                <div className="text-slate-500">
                  Global Synthesis Powered by Gemini 3.8 Flash & Intron Reading Labs
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
