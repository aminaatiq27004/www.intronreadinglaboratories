import React, { useState, useEffect, useRef } from 'react';
import { Award, CheckCircle2, Play, Pause, RotateCcw, UploadCloud, XCircle } from 'lucide-react';

const DRILL_PRESETS = [
  {
    id: 'utct_homology',
    title: 'UTCT Postulate III: Ribosomal-Cognitive 3-Token Triplet Homology',
    text: `The Ultra Triplet Codon Theory establishes that ribosomal translation across eukaryotic pre-mRNA proceeds in quantized three-nucleotide steps. Human ocular saccades and foveal fixations exhibit an identical biophysical resonance when parsing dense literature: chunking academic terminology into three-token rhythmic visual quanta eliminates backward saccadic regressions and achieves optimal cognitive throughput.`
  },
  {
    id: 'spliceosome_canonical',
    title: 'Canonical Spliceosome Mechanics Drill',
    text: `Pre-messenger RNA splicing is executed by the dynamic spliceosome machinery. The spliceosome specifically recognizes the five-prime GU donor and three-prime AG acceptor dinucleotides. Intron excision occurs through two consecutive transesterification reactions, generating a free lariat intermediate and joining the coding exons into mature messenger RNA. Alternative splicing enables a single genetic locus to generate multiple distinct protein isoforms.`
  }
];

const QUIZ_QUESTIONS = [
  {
    question: 'According to UTCT Postulate III, what biological process is functionally homologous to 3-token cognitive reading chunking?',
    options: ['Ribosomal 3-nucleotide triplet translocation', 'DNA replication polymerase stalling', 'Mitochondrial cristae respiration', 'Centrosome spindle fiber elongation'],
    correctIndex: 0
  },
  {
    question: 'What canonical dinucleotide sequence defines the 5\' splice donor junction?',
    options: ['GU (or GT in DNA)', 'AG', 'AUG', 'UAA'],
    correctIndex: 0
  },
  {
    question: 'How many transesterification reactions occur during pre-mRNA splicing?',
    options: ['One reaction', 'Two consecutive reactions', 'Three simultaneous reactions', 'Four coupled cycles'],
    correctIndex: 1
  }
];

interface ReadingCadenceAppProps {
  onInductApp: (appId: string) => void;
  onOpenApp?: (appId: string) => void;
}

export const ReadingCadenceApp: React.FC<ReadingCadenceAppProps> = ({ onInductApp, onOpenApp }) => {
  const [selectedDrillId, setSelectedDrillId] = useState<string>('utct_homology');
  const [chunkSize, setChunkSize] = useState<number>(3); // Default to 3 for Triplet Codon Homology!
  const [paceBpm, setPaceBpm] = useState<number>(140);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [activeChunkIndex, setActiveChunkIndex] = useState<number>(0);
  const [quizAnswers, setQuizAnswers] = useState<Record<number, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState<boolean>(false);
  const timerRef = useRef<number | null>(null);

  const activeDrill = DRILL_PRESETS.find(d => d.id === selectedDrillId) || DRILL_PRESETS[0];
  const rawWords = activeDrill.text.split(' ');
  
  // Group words into chunks
  const chunks: string[] = [];
  for (let i = 0; i < rawWords.length; i += chunkSize) {
    chunks.push(rawWords.slice(i, i + chunkSize).join(' '));
  }

  useEffect(() => {
    if (isPlaying) {
      const intervalMs = Math.round((60 / paceBpm) * 1000);
      timerRef.current = window.setInterval(() => {
        setActiveChunkIndex((prev) => {
          if (prev >= chunks.length - 1) {
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
  }, [isPlaying, paceBpm, chunks.length]);

  const handleSelectQuiz = (qIndex: number, optionIndex: number) => {
    if (quizSubmitted) return;
    setQuizAnswers(prev => ({ ...prev, [qIndex]: optionIndex }));
  };

  const calculateScore = () => {
    let correct = 0;
    QUIZ_QUESTIONS.forEach((q, idx) => {
      if (quizAnswers[idx] === q.correctIndex) correct++;
    });
    return correct;
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
            <span>COGNITIVE TRAINING</span>
            <span>·</span>
            <span>CADENCE LAB v2.0.5</span>
            <span>·</span>
            <span>SACCADIC PACING ENGINE</span>
          </div>
          <h2 className="text-2xl font-bold text-white tracking-tight">
            Scientific Reading Cadence & Saccade Guide
          </h2>
          <p className="text-sm text-slate-300 max-w-2xl">
            Train rhythmic eye movements and expand perceptual visual span when reading dense biomedical terminology.
          </p>
        </div>

        <button
          onClick={() => onInductApp('cadence-lab')}
          className="px-4 py-2 text-xs font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-lg transition-colors flex items-center gap-1.5 shadow-sm whitespace-nowrap"
        >
          <UploadCloud className="w-3.5 h-3.5" />
          <span>Induct to intronreadinglabs.com</span>
        </button>
      </div>

      {/* Main Training Console */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
        
        {/* Controls Ribbon */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800">
          
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="px-4 py-2 rounded-lg bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold text-xs flex items-center gap-2"
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              <span>{isPlaying ? 'Pause Pacer' : 'Start Saccade Pacer'}</span>
            </button>
            <button
              onClick={() => {
                setIsPlaying(false);
                setActiveChunkIndex(0);
              }}
              className="p-2 rounded-lg bg-slate-950 border border-slate-800 text-slate-400 hover:text-white"
              title="Reset"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-xs font-mono">
            <div className="flex items-center gap-2">
              <span className="text-slate-400">DRILL:</span>
              <select
                value={selectedDrillId}
                onChange={(e) => {
                  setSelectedDrillId(e.target.value);
                  setActiveChunkIndex(0);
                  setIsPlaying(false);
                }}
                className="bg-slate-950 border border-slate-800 text-white rounded px-2.5 py-1 text-xs focus:outline-none focus:border-cyan-500"
              >
                {DRILL_PRESETS.map(d => (
                  <option key={d.id} value={d.id}>{d.title}</option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-slate-400">CHUNK SIZE:</span>
              <div className="flex bg-slate-950 rounded border border-slate-800 p-0.5">
                {[1, 2, 3].map(size => (
                  <button
                    key={size}
                    onClick={() => {
                      setChunkSize(size);
                      setActiveChunkIndex(0);
                    }}
                    className={`px-2.5 py-0.5 rounded text-xs ${chunkSize === size ? 'bg-cyan-400 text-slate-950 font-bold' : 'text-slate-400'}`}
                    title={size === 3 ? 'UTCT Triplet Homology Quantum' : undefined}
                  >
                    {size}w {size === 3 && '★'}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-slate-400">METRONOME:</span>
              <input
                type="range"
                min={80}
                max={260}
                step={10}
                value={paceBpm}
                onChange={(e) => setPaceBpm(Number(e.target.value))}
                className="w-24 accent-cyan-400"
              />
              <span className="text-cyan-400 font-bold tabular-nums w-12 text-right">{paceBpm} BPM</span>
            </div>
          </div>

        </div>

        {/* Pacing Visualizer Stage */}
        <div className="p-8 bg-slate-950 rounded-xl border border-slate-800 min-h-[160px] flex items-center justify-center">
          <div className="text-lg sm:text-2xl leading-relaxed text-slate-500 font-sans max-w-3xl text-center select-none flex flex-wrap justify-center gap-x-2 gap-y-1">
            {chunks.map((chunk, idx) => (
              <span
                key={idx}
                className={`transition-all duration-150 px-1.5 py-0.5 rounded ${
                  idx === activeChunkIndex
                    ? 'bg-cyan-400 text-slate-950 font-bold scale-105 shadow-md shadow-cyan-500/20'
                    : idx < activeChunkIndex
                    ? 'text-slate-300'
                    : 'text-slate-600'
                }`}
              >
                {chunk}
              </span>
            ))}
          </div>
        </div>

      </div>

      {/* Comprehension Verification Rubric */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-6">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div>
            <h3 className="text-base font-bold text-white">Comprehension Retention Check</h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Verify cognitive retention following high-speed saccadic pacing.
            </p>
          </div>
          {quizSubmitted && (
            <div className="text-xs font-mono px-3 py-1 bg-cyan-950 border border-cyan-500/40 text-cyan-300 rounded font-bold">
              Score: {calculateScore()} / {QUIZ_QUESTIONS.length} Correct
            </div>
          )}
        </div>

        <div className="space-y-4">
          {QUIZ_QUESTIONS.map((q, qIdx) => (
            <div key={qIdx} className="p-4 bg-slate-950 rounded-lg border border-slate-800 space-y-2">
              <div className="text-xs font-semibold text-white">
                {qIdx + 1}. {q.question}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                {q.options.map((option, optIdx) => {
                  const isSelected = quizAnswers[qIdx] === optIdx;
                  const isCorrect = q.correctIndex === optIdx;
                  let btnStyle = 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700';

                  if (quizSubmitted) {
                    if (isCorrect) btnStyle = 'bg-emerald-950/60 border-emerald-500 text-emerald-300 font-semibold';
                    else if (isSelected && !isCorrect) btnStyle = 'bg-rose-950/60 border-rose-500 text-rose-300';
                  } else if (isSelected) {
                    btnStyle = 'bg-cyan-950/60 border-cyan-500 text-cyan-300 font-semibold';
                  }

                  return (
                    <button
                      key={optIdx}
                      onClick={() => handleSelectQuiz(qIdx, optIdx)}
                      className={`text-left p-2.5 rounded text-xs border transition-all ${btnStyle}`}
                    >
                      {option}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-end gap-3 pt-2">
          {!quizSubmitted ? (
            <button
              onClick={() => setQuizSubmitted(true)}
              className="px-4 py-2 bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold text-xs rounded-lg transition-colors"
            >
              Submit Retention Answers
            </button>
          ) : (
            <button
              onClick={() => {
                setQuizAnswers({});
                setQuizSubmitted(false);
              }}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white font-medium text-xs rounded-lg transition-colors"
            >
              Reset Quiz
            </button>
          )}
        </div>

      </div>

      {onOpenApp && (
        <div className="p-4 rounded-xl bg-slate-900 border border-cyan-500/30 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-slate-300">
            <strong className="text-cyan-400">UTCT Postulate III Biomechanical Axis:</strong> Experience the molecular counterpart of this 3-token saccade engine in the Ultra Triplet Codon Engine.
          </div>
          <button
            onClick={() => onOpenApp('ultra-triplet-codon')}
            className="py-1.5 px-3 rounded bg-cyan-400 hover:bg-cyan-300 text-slate-950 text-xs font-bold font-mono whitespace-nowrap"
          >
            Launch UTCT Molecular Engine ➔
          </button>
        </div>
      )}

    </div>
  );
};
