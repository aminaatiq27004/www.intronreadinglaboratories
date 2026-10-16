import React, { useState, useEffect, useRef, useMemo } from 'react';
import { RESEARCH_PAPERS } from '../../data/mockData';
import { ResearchPaper } from '../../types';
import { BookOpen, Check, Copy, Download, Pause, Play, RotateCcw, SkipBack, SkipForward, Sparkles, UploadCloud } from 'lucide-react';

interface BioLexReaderAppProps {
  onInductApp: (appId: string) => void;
  onOpenApp?: (appId: string) => void;
}

export const BioLexReaderApp: React.FC<BioLexReaderAppProps> = ({ onInductApp, onOpenApp }) => {
  const [selectedPaperId, setSelectedPaperId] = useState<string>(RESEARCH_PAPERS[0].id);
  const [wpm, setWpm] = useState<number>(380);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentWordIndex, setCurrentWordIndex] = useState<number>(0);
  const [readerMode, setReaderMode] = useState<'rsvp' | 'bionic' | 'structured'>('rsvp');
  const [notes, setNotes] = useState<string[]>([]);
  const [newNote, setNewNote] = useState<string>('');
  const timerRef = useRef<number | null>(null);

  const activePaper = useMemo(() => {
    return RESEARCH_PAPERS.find(p => p.id === selectedPaperId) || RESEARCH_PAPERS[0];
  }, [selectedPaperId]);

  // Tokenize full text into words
  const words = useMemo(() => {
    return activePaper.fullText.split(/\s+/).filter(w => w.length > 0);
  }, [activePaper]);

  // Reset index when changing paper
  useEffect(() => {
    setCurrentWordIndex(0);
    setIsPlaying(false);
  }, [selectedPaperId]);

  // RSVP Interval timer
  useEffect(() => {
    if (isPlaying) {
      const intervalMs = Math.round((60 / wpm) * 1000);
      timerRef.current = window.setInterval(() => {
        setCurrentWordIndex((prev) => {
          if (prev >= words.length - 1) {
            setIsPlaying(false);
            return prev;
          }
          return prev + 1;
        });
      }, intervalMs);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, wpm, words.length]);

  const currentWord = words[currentWordIndex] || '';

  // Calculate Optimal Recognition Point (ORP) for RSVP
  const { prefix, orpChar, suffix } = useMemo(() => {
    if (!currentWord) return { prefix: '', orpChar: '', suffix: '' };
    const len = currentWord.length;
    let orpIndex = 0;
    if (len <= 1) orpIndex = 0;
    else if (len <= 5) orpIndex = 1;
    else if (len <= 9) orpIndex = 2;
    else orpIndex = 3;

    return {
      prefix: currentWord.slice(0, orpIndex),
      orpChar: currentWord[orpIndex] || '',
      suffix: currentWord.slice(orpIndex + 1)
    };
  }, [currentWord]);

  // Bionic reading formatter
  const renderBionicWord = (word: string, index: number) => {
    const splitPoint = Math.ceil(word.length / 2);
    const boldPart = word.slice(0, splitPoint);
    const lightPart = word.slice(splitPoint);
    return (
      <span key={index} className="mr-1.5 inline-block">
        <strong className="text-white font-bold">{boldPart}</strong>
        <span className="text-slate-400 font-normal">{lightPart}</span>
      </span>
    );
  };

  const handleAddNote = () => {
    if (!newNote.trim()) return;
    setNotes(prev => [...prev, `${activePaper.title.slice(0, 30)}...: ${newNote.trim()}`]);
    setNewNote('');
  };

  const progressPercent = Math.round(((currentWordIndex + 1) / words.length) * 100);

  return (
    <div className="space-y-8">
      
      {/* Header Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
            <span>COGNITIVE READING LAB</span>
            <span>·</span>
            <span>BIOLEX READER v3.1.2</span>
            <span>·</span>
            <span>INTRONREADINGS RESEARCH</span>
          </div>
          <h2 className="text-2xl font-bold text-white tracking-tight">
            Scientific Literature Reader & RSVP Analyzer
          </h2>
          <p className="text-sm text-slate-300 max-w-2xl">
            High-bandwidth cognitive reading engine for biomedical and genomics manuscripts. Eliminates ocular fatigue with Optimal Recognition Point (ORP) fixation and Bionic typography.
          </p>
        </div>

        <button
          onClick={() => onInductApp('biolex-reader')}
          className="px-4 py-2 text-xs font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-lg transition-colors flex items-center gap-1.5 shadow-sm whitespace-nowrap"
        >
          <UploadCloud className="w-3.5 h-3.5" />
          <span>Induct to intronreadinglabs.com</span>
        </button>
      </div>

      {/* Paper Switcher & Mode Ribbon */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        
        <div className="lg:col-span-8 flex flex-col sm:flex-row items-start sm:items-center gap-3">
          <label className="text-xs font-mono uppercase text-slate-400 whitespace-nowrap">
            Selected Manuscript:
          </label>
          <select
            value={selectedPaperId}
            onChange={(e) => setSelectedPaperId(e.target.value)}
            className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500 truncate font-sans"
          >
            {RESEARCH_PAPERS.map((paper) => (
              <option key={paper.id} value={paper.id}>
                {paper.title} ({paper.journal}, {paper.year})
              </option>
            ))}
          </select>
        </div>

        <div className="lg:col-span-4 flex items-center justify-end gap-1.5 p-1 bg-slate-900 rounded-lg border border-slate-800">
          <button
            onClick={() => setReaderMode('rsvp')}
            className={`px-3 py-1.5 text-xs font-medium rounded transition-colors ${
              readerMode === 'rsvp'
                ? 'bg-cyan-400 text-slate-950 font-bold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            RSVP Focus
          </button>
          <button
            onClick={() => setReaderMode('bionic')}
            className={`px-3 py-1.5 text-xs font-medium rounded transition-colors ${
              readerMode === 'bionic'
                ? 'bg-cyan-400 text-slate-950 font-bold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Bionic Type
          </button>
          <button
            onClick={() => setReaderMode('structured')}
            className={`px-3 py-1.5 text-xs font-medium rounded transition-colors ${
              readerMode === 'structured'
                ? 'bg-cyan-400 text-slate-950 font-bold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Paper Claims
          </button>
        </div>

      </div>

      {/* Flagship Research Paper Callout when UTCT manuscript is active */}
      {activePaper.id === 'paper-utct' && (
        <div className="p-4 sm:p-5 rounded-xl bg-gradient-to-r from-slate-900 via-slate-900 to-cyan-950/40 border border-cyan-500/40 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-lg">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-[10px] font-mono uppercase text-cyan-400 font-bold">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              <span>CORE THEORETICAL MANUSCRIPT · INTRON READING LABS</span>
            </div>
            <div className="text-sm font-bold text-white">
              The Ultra Triplet Codon Theory (Nature Structural & Molecular Genomics, 2026)
            </div>
            <p className="text-xs text-slate-300">
              Establishes the 4 fundamental postulates governing split-codon phases (0, 1, 2), ESE harmonics, and ribosomal transit velocities.
            </p>
          </div>
          {onOpenApp && (
            <button
              onClick={() => onOpenApp('ultra-triplet-codon')}
              className="py-2 px-3.5 bg-cyan-400 hover:bg-cyan-300 text-slate-950 rounded-lg text-xs font-bold font-mono flex items-center gap-1.5 whitespace-nowrap shadow-sm shrink-0"
            >
              <span>Test Hypotheses in UTCT Engine</span>
              <BookOpen className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      )}

      {/* Main View Area based on Selected Mode */}
      {readerMode === 'rsvp' && (
        <div className="space-y-6">
          
          {/* RSVP Stage Viewport */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 sm:p-12 text-center relative overflow-hidden shadow-2xl">
            
            {/* Top guide markers */}
            <div className="flex items-center justify-center gap-1 mb-8 opacity-40">
              <div className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
              <div className="w-12 h-0.5 bg-cyan-500/50" />
              <div className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
            </div>

            {/* Centered Word Box with ORP alignment */}
            <div className="min-h-[140px] flex items-center justify-center select-none font-mono">
              <div className="text-4xl sm:text-6xl md:text-7xl tracking-normal flex items-baseline">
                {/* Prefix */}
                <span className="text-slate-400 text-right w-[4ch] inline-block font-medium">
                  {prefix}
                </span>
                {/* ORP Fixation Target Letter */}
                <span className="text-cyan-400 font-extrabold mx-0.5 relative inline-block">
                  {orpChar}
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                </span>
                {/* Suffix */}
                <span className="text-slate-200 text-left w-[10ch] inline-block font-medium">
                  {suffix}
                </span>
              </div>
            </div>

            {/* Bottom guide markers */}
            <div className="flex items-center justify-center gap-1 mt-8 opacity-40">
              <div className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
              <div className="w-12 h-0.5 bg-cyan-500/50" />
              <div className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
            </div>

            {/* Scrub Bar */}
            <div className="mt-8 max-w-xl mx-auto space-y-2">
              <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                <span>WORD {currentWordIndex + 1} OF {words.length}</span>
                <span className="text-cyan-400 tabular-nums">{progressPercent}% COMPLETED</span>
              </div>
              <input
                type="range"
                min={0}
                max={words.length - 1}
                value={currentWordIndex}
                onChange={(e) => setCurrentWordIndex(Number(e.target.value))}
                className="w-full accent-cyan-400 cursor-pointer h-1.5 bg-slate-800 rounded-lg"
              />
            </div>

            {/* Playback Controls */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <button
                onClick={() => setCurrentWordIndex(Math.max(0, currentWordIndex - 25))}
                className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
                title="Rewind 25 words"
              >
                <SkipBack className="w-4 h-4" />
              </button>

              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="px-6 py-3 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold transition-all flex items-center gap-2 shadow-lg shadow-cyan-950/50"
              >
                {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                <span className="font-sans text-sm">{isPlaying ? 'Pause Reading' : 'Start RSVP Stream'}</span>
              </button>

              <button
                onClick={() => setCurrentWordIndex(Math.min(words.length - 1, currentWordIndex + 25))}
                className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
                title="Advance 25 words"
              >
                <SkipForward className="w-4 h-4" />
              </button>

              <button
                onClick={() => {
                  setIsPlaying(false);
                  setCurrentWordIndex(0);
                }}
                className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
                title="Reset to beginning"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>

            {/* WPM Pacing Slider */}
            <div className="mt-8 pt-6 border-t border-slate-800/80 max-w-md mx-auto flex items-center justify-center gap-4 text-xs font-mono">
              <span className="text-slate-400">READING SPEED:</span>
              <input
                type="range"
                min={180}
                max={850}
                step={20}
                value={wpm}
                onChange={(e) => setWpm(Number(e.target.value))}
                className="w-48 accent-cyan-400"
              />
              <span className="text-cyan-400 font-bold text-sm tabular-nums w-16 text-right">
                {wpm} WPM
              </span>
            </div>

          </div>

        </div>
      )}

      {readerMode === 'bionic' && (
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-8 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div>
              <h3 className="text-lg font-bold text-white">{activePaper.title}</h3>
              <div className="text-xs text-slate-400 mt-1 font-mono">
                {activePaper.authors} · {activePaper.journal} ({activePaper.year})
              </div>
            </div>
            <div className="text-xs font-mono text-cyan-400">
              BIONIC MODE ACTIVE
            </div>
          </div>

          <div className="text-sm sm:text-base leading-loose text-slate-300 font-sans max-w-4xl space-y-4">
            {activePaper.fullText.split('\n\n').map((paragraph, pIdx) => (
              <p key={pIdx}>
                {paragraph.split(' ').map((word, wIdx) => renderBionicWord(word, wIdx))}
              </p>
            ))}
          </div>
        </div>
      )}

      {readerMode === 'structured' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          <div className="lg:col-span-7 space-y-5">
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-4">
              <div className="text-xs uppercase font-mono tracking-wider text-cyan-400">
                Core Research Hypothesis
              </div>
              <p className="text-sm sm:text-base text-white leading-relaxed font-medium">
                "{activePaper.hypothesis}"
              </p>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-4">
              <div className="text-xs uppercase font-mono tracking-wider text-slate-300">
                Key Experimental Findings
              </div>
              <ul className="space-y-3 text-xs sm:text-sm text-slate-300">
                {activePaper.keyFindings.map((finding, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-2 shrink-0" />
                    <span>{finding}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-3">
              <div className="text-xs uppercase font-mono tracking-wider text-slate-300">
                Abstract Synthesis
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {activePaper.abstract}
              </p>
            </div>
          </div>

          <div className="lg:col-span-5 space-y-5">
            {/* Manuscript Metadata */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-3 font-mono text-xs">
              <div className="text-slate-300 uppercase tracking-wider font-semibold">
                Citation Specifications
              </div>
              <div className="space-y-2 pt-1">
                <div className="flex justify-between border-b border-slate-800/80 pb-2">
                  <span className="text-slate-400">DOI Reference:</span>
                  <span className="text-cyan-400">{activePaper.doi}</span>
                </div>
                <div className="flex justify-between border-b border-slate-800/80 pb-2">
                  <span className="text-slate-400">Journal:</span>
                  <span className="text-white">{activePaper.journal}</span>
                </div>
                <div className="flex justify-between border-b border-slate-800/80 pb-2">
                  <span className="text-slate-400">Domain:</span>
                  <span className="text-slate-300">{activePaper.category}</span>
                </div>
                <div className="flex justify-between pb-1">
                  <span className="text-slate-400">Read Time:</span>
                  <span className="text-white tabular-nums">{activePaper.readTimeMin} minutes</span>
                </div>
              </div>
            </div>

            {/* Interactive Notes Notebook */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-3">
              <div className="text-xs uppercase font-mono tracking-wider text-slate-300">
                Investigator Annotations
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newNote}
                  onChange={(e) => setNewNote(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleAddNote()}
                  placeholder="Record observation or claim note..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
                />
                <button
                  onClick={handleAddNote}
                  className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-white rounded-lg"
                >
                  Save
                </button>
              </div>

              <div className="space-y-2 max-h-48 overflow-y-auto pt-2">
                {notes.length === 0 ? (
                  <div className="text-xs text-slate-400 text-center py-4">
                    No annotations recorded yet. Enter notes above to save observations.
                  </div>
                ) : (
                  notes.map((note, idx) => (
                    <div key={idx} className="p-2.5 rounded bg-slate-950 border border-slate-800 text-xs text-slate-300">
                      {note}
                    </div>
                  ))
                )}
              </div>
            </div>

          </div>

        </div>
      )}

    </div>
  );
};
