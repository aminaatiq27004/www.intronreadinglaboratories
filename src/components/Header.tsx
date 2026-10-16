import React from 'react';
import { ExternalLink, Globe, UploadCloud } from 'lucide-react';

interface HeaderProps {
  activeView: 'home' | 'catalog' | 'app' | 'induction';
  onNavigate: (view: 'home' | 'catalog' | 'app' | 'induction', appId?: string) => void;
  selectedAppId?: string;
}

export const Header: React.FC<HeaderProps> = ({
  activeView,
  onNavigate,
  selectedAppId,
}) => {
  return (
    <header className="sticky top-0 z-50 bg-slate-950/90 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        
        {/* Zone 1: Single text element wordmark in display face */}
        <button 
          onClick={() => onNavigate('home')} 
          className="text-left group flex items-center gap-2.5 whitespace-nowrap shrink-0 hover:opacity-90 transition-opacity"
        >
          <div className="w-7 h-7 rounded bg-cyan-950 border border-cyan-500/40 flex items-center justify-center text-cyan-400 font-mono text-xs font-bold shadow-sm">
            IRL
          </div>
          <span className="text-base sm:text-lg font-bold tracking-tight text-white whitespace-nowrap shrink-0">
            Intron Reading Labs
          </span>
        </button>

        {/* Zone 2: Navigation with Ultra Triplet Codon Theory featured as core work */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-400">
          <button
            onClick={() => onNavigate('app', 'ultra-triplet-codon')}
            className={`transition-all whitespace-nowrap shrink-0 flex items-center gap-1.5 py-1 px-2.5 rounded-md ${
              activeView === 'app' && selectedAppId === 'ultra-triplet-codon'
                ? 'bg-cyan-950/80 text-cyan-300 border border-cyan-500/40 font-bold shadow-sm'
                : 'text-cyan-400/90 hover:text-cyan-300 font-semibold'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span>Ultra Triplet Core (UTCT)</span>
          </button>

          <button
            onClick={() => onNavigate('app', 'horizon-chat')}
            className={`transition-all whitespace-nowrap shrink-0 flex items-center gap-1.5 py-1 px-2.5 rounded-md ${
              activeView === 'app' && selectedAppId === 'horizon-chat'
                ? 'bg-purple-950/80 text-purple-300 border border-purple-500/40 font-bold shadow-sm'
                : 'text-purple-300 hover:text-purple-200 font-semibold'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Global Chatbot</span>
          </button>

          <button
            onClick={() => onNavigate('app', 'splice-sense')}
            className={`transition-colors whitespace-nowrap shrink-0 hover:text-white ${
              activeView === 'app' && selectedAppId === 'splice-sense' ? 'text-cyan-400 font-semibold' : ''
            }`}
          >
            SpliceSense
          </button>

          <button
            onClick={() => onNavigate('app', 'biolex-reader')}
            className={`transition-colors whitespace-nowrap shrink-0 hover:text-white ${
              activeView === 'app' && selectedAppId === 'biolex-reader' ? 'text-cyan-400 font-semibold' : ''
            }`}
          >
            BioLex Reader
          </button>

          <button
            onClick={() => onNavigate('catalog')}
            className={`transition-colors whitespace-nowrap shrink-0 hover:text-white ${
              activeView === 'catalog' ? 'text-cyan-400 font-semibold' : ''
            }`}
          >
            Apps Suite (7)
          </button>

          <button
            onClick={() => onNavigate('induction')}
            className={`transition-colors whitespace-nowrap shrink-0 hover:text-white flex items-center gap-1.5 ${
              activeView === 'induction' ? 'text-cyan-400 font-semibold' : ''
            }`}
          >
            <span>Vercel Hub</span>
          </button>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-3 shrink-0">
          <a
            href="https://intron-reading-labs.ai.studio"
            target="_blank"
            rel="noreferrer"
            className="hidden lg:flex items-center gap-1.5 text-xs font-mono text-slate-300 hover:text-cyan-300 transition-colors py-1.5 px-2.5 rounded border border-slate-800 bg-slate-900/80"
            title="Open intron-reading-labs.ai.studio"
          >
            <Globe className="w-3.5 h-3.5 text-cyan-400" />
            <span className="truncate max-w-[170px]">intron-reading-labs.ai.studio</span>
            <ExternalLink className="w-3 h-3 text-slate-500" />
          </a>

          <button
            onClick={() => onNavigate('induction')}
            className="px-3.5 py-2 text-xs font-medium text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-lg transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 shadow-sm font-sans"
          >
            <UploadCloud className="w-3.5 h-3.5" />
            <span>Induct to Live Site</span>
          </button>
        </div>

      </div>
    </header>
  );
};
