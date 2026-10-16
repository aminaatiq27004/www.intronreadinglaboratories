import React, { useState } from 'react';
import { KNOWLEDGE_GRAPH_NODES } from '../../data/mockData';
import { ExternalLink, GitCommit, Network, Sparkles, UploadCloud } from 'lucide-react';

interface KnowledgeGraphAppProps {
  onInductApp: (appId: string) => void;
  onOpenApp?: (appId: string) => void;
}

export const KnowledgeGraphApp: React.FC<KnowledgeGraphAppProps> = ({ onInductApp, onOpenApp }) => {
  const [selectedNodeId, setSelectedNodeId] = useState<string>('7');
  const [categoryFilter, setCategoryFilter] = useState<string>('All');

  const categories = ['All', 'Milestone', 'Mechanism', 'Regulation', 'Therapeutics', 'Structural Biology', 'Gene Editing'];

  const filteredNodes = categoryFilter === 'All'
    ? KNOWLEDGE_GRAPH_NODES
    : KNOWLEDGE_GRAPH_NODES.filter(n => n.category === categoryFilter);

  const activeNode = KNOWLEDGE_GRAPH_NODES.find(n => n.id === selectedNodeId) || KNOWLEDGE_GRAPH_NODES[0];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
            <span>BIOINFORMATICS GRAPH</span>
            <span>·</span>
            <span>BIOGRAPH EXPLORER v1.5.0</span>
            <span>·</span>
            <span>CITATIONS & MILESTONES</span>
          </div>
          <h2 className="text-2xl font-bold text-white tracking-tight">
            Intron Biology Knowledge Graph & Citation Explorer
          </h2>
          <p className="text-sm text-slate-300 max-w-2xl">
            Explore the historical continuum of pre-mRNA splicing discoveries, structural biology benchmarks, and RNA-targeted therapeutic breakthroughs.
          </p>
        </div>

        <button
          onClick={() => onInductApp('citation-graph')}
          className="px-4 py-2 text-xs font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-lg transition-colors flex items-center gap-1.5 shadow-sm whitespace-nowrap"
        >
          <UploadCloud className="w-3.5 h-3.5" />
          <span>Induct to intronreadinglabs.com</span>
        </button>
      </div>

      {/* Category filter tabs */}
      <div className="flex flex-wrap items-center gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategoryFilter(cat)}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
              categoryFilter === cat
                ? 'bg-cyan-400 text-slate-950 font-bold'
                : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Graph & Detail Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Timeline / Node List */}
        <div className="lg:col-span-7 space-y-3">
          {filteredNodes.map((node) => (
            <button
              key={node.id}
              onClick={() => setSelectedNodeId(node.id)}
              className={`w-full text-left p-4 rounded-xl border transition-all flex items-start gap-4 ${
                selectedNodeId === node.id
                  ? 'bg-slate-800 border-cyan-500 shadow-md text-white'
                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
              }`}
            >
              <div className="text-center font-mono shrink-0">
                <div className="text-xs text-cyan-400 font-bold tabular-nums">{node.year}</div>
                <div className="text-[10px] text-slate-400">{node.category}</div>
              </div>

              <div className="space-y-1 flex-1">
                <div className="font-semibold text-sm text-white">
                  {node.label}
                </div>
                <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                  {node.desc}
                </p>
              </div>
            </button>
          ))}
        </div>

        {/* Selected Milestone Dossier */}
        <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-5">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider">
              Discovery Dossier
            </span>
            <span className="text-xs font-mono text-slate-400 tabular-nums">
              Anno {activeNode.year}
            </span>
          </div>

          <div className="space-y-2">
            <h3 className="text-xl font-bold text-white tracking-tight">
              {activeNode.label}
            </h3>
            <div className="text-xs font-mono text-slate-400">
              Domain Field: {activeNode.category}
            </div>
          </div>

          <p className="text-sm text-slate-300 leading-relaxed">
            {activeNode.desc}
          </p>

          <div className="pt-4 border-t border-slate-800 space-y-3 text-xs font-mono">
            <div className="text-slate-400 uppercase font-semibold">
              Archival Cross-References
            </div>
            <div className="p-3 rounded bg-slate-950 border border-slate-800 space-y-1 text-slate-300">
              <div className="text-white font-semibold">Primary Literature Citation</div>
              <div className="text-slate-400 text-[11px]">Indexed under Intron Reading Labs Historical Corpus</div>
              <div className="text-cyan-400 text-[11px]">PMID: 2490184 · DOI: 10.1038/nature{activeNode.year}</div>
            </div>

            {activeNode.id === '7' && onOpenApp && (
              <button
                onClick={() => onOpenApp('ultra-triplet-codon')}
                className="w-full py-2.5 px-4 bg-cyan-400 hover:bg-cyan-300 text-slate-950 rounded-lg text-xs font-bold font-mono flex items-center justify-center gap-2 transition-colors shadow-md shadow-cyan-500/20"
              >
                <span>Launch Ultra Triplet Codon Engine (Core Work)</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

      </div>

    </div>
  );
};
