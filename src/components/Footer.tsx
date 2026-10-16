import React from 'react';
import { ExternalLink, Github, Globe } from 'lucide-react';

interface FooterProps {
  onNavigateToInduction: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigateToInduction }) => {
  return (
    <footer className="bg-slate-950 border-t border-slate-800 text-slate-400 text-sm mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded bg-cyan-950 border border-cyan-500/40 flex items-center justify-center text-cyan-400 font-mono text-[10px] font-bold">
                IRL
              </div>
              <span className="font-semibold text-white tracking-tight text-base">
                Intron Reading Labs
              </span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed max-w-md">
              Specialized research laboratory building next-generation RNA/DNA splicing analyzers, open reading frame translators, and high-velocity cognitive paper reading technologies for genomics investigators.
            </p>
            <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400 font-mono pt-1">
              <a
                href="https://intron-reading-labs.ai.studio"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1 text-cyan-400 hover:underline"
              >
                <Globe className="w-3.5 h-3.5" />
                <span>intron-reading-labs.ai.studio</span>
              </a>
              <span>·</span>
              <span>www.intronreadinglabs.com</span>
              <span>·</span>
              <span>Vercel Edge</span>
            </div>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-wider font-semibold text-slate-200 mb-3">
              Research Applications
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <span className="hover:text-white transition-colors cursor-pointer">
                  SpliceSense Splicing Studio
                </span>
              </li>
              <li>
                <span className="hover:text-white transition-colors cursor-pointer">
                  BioLex Literature Reader
                </span>
              </li>
              <li>
                <span className="hover:text-white transition-colors cursor-pointer">
                  IsoformMapper Transcript Modeler
                </span>
              </li>
              <li>
                <span className="hover:text-white transition-colors cursor-pointer">
                  Cadence Cognitive Trainer
                </span>
              </li>
              <li>
                <span className="hover:text-white transition-colors cursor-pointer">
                  BioGraph Citation Explorer
                </span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-wider font-semibold text-slate-200 mb-3">
              Deployment & Repo
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button 
                  onClick={onNavigateToInduction}
                  className="hover:text-cyan-400 transition-colors text-left"
                >
                  Induction & Sync Center
                </button>
              </li>
              <li>
                <button 
                  onClick={onNavigateToInduction}
                  className="hover:text-cyan-400 transition-colors text-left"
                >
                  Vercel DNS & CNAME Guide
                </button>
              </li>
              <li>
                <button 
                  onClick={onNavigateToInduction}
                  className="hover:text-cyan-400 transition-colors text-left"
                >
                  GitHub Repository Export
                </button>
              </li>
              <li>
                <button 
                  onClick={onNavigateToInduction}
                  className="hover:text-cyan-400 transition-colors text-left"
                >
                  Embeddable App Snippets
                </button>
              </li>
            </ul>
          </div>

        </div>

        <div className="mt-10 pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <div>
            © 2026 Intron Reading Labs · <a href="https://intron-reading-labs.ai.studio" className="text-slate-300 hover:text-cyan-300">intron-reading-labs.ai.studio</a> & <a href="https://www.intronreadinglabs.com" className="text-slate-300 hover:text-cyan-300">www.intronreadinglabs.com</a>.
          </div>
          <div className="flex items-center gap-4 font-mono">
            <span>Branch: main</span>
            <span>·</span>
            <span>Edge: sfo1</span>
            <span>·</span>
            <span className="text-cyan-400">DNS Configured</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
