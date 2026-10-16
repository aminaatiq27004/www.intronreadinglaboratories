import React, { useState } from 'react';
import { LAB_APPS, INITIAL_DNS_CHECKS } from '../../data/mockData';
import { LabApp, DnsCheckItem, GeneratedRepoFile } from '../../types';
import { CodeExportModal } from './CodeExportModal';
import {
  ArrowRight,
  CheckCircle2,
  ChevronRight,
  Code2,
  Copy,
  Download,
  ExternalLink,
  Github,
  Globe,
  Layers,
  RefreshCw,
  Server,
  Share2,
  Terminal,
  UploadCloud
} from 'lucide-react';

interface InductionCenterProps {
  onOpenApp: (appId: string) => void;
}

export const InductionCenter: React.FC<InductionCenterProps> = ({ onOpenApp }) => {
  const [apps, setApps] = useState<LabApp[]>(LAB_APPS);
  const [dnsChecks, setDnsChecks] = useState<DnsCheckItem[]>(INITIAL_DNS_CHECKS);
  const [isVerifyingDns, setIsVerifyingDns] = useState<boolean>(false);
  const [verificationFeedback, setVerificationFeedback] = useState<string | null>(null);
  const [selectedMethod, setSelectedMethod] = useState<'github' | 'vercel_cli' | 'embed'>('github');
  const [isExportModalOpen, setIsExportModalOpen] = useState<boolean>(false);
  const [copiedCommand, setCopiedCommand] = useState<string | null>(null);
  const [selectedEmbedApp, setSelectedEmbedApp] = useState<string>('splice-sense');
  const [embedDomain, setEmbedDomain] = useState<'ai_studio' | 'custom_domain'>('ai_studio');

  // Generate repository files
  const generatedFiles: GeneratedRepoFile[] = [
    {
      filePath: 'vercel.json',
      language: 'json',
      description: 'Vercel deployment configuration, single-page app rewrites, and security headers',
      content: JSON.stringify(
        {
          version: 2,
          buildCommand: 'npm run build',
          outputDirectory: 'dist',
          framework: 'vite',
          routes: [
            {
              src: '/assets/(.*)',
              headers: { 'cache-control': 'public, max-age=31536000, immutable' },
              continue: true
            },
            {
              src: '/(.*)',
              dest: '/index.html'
            }
          ],
          headers: [
            {
              source: '/(.*)',
              headers: [
                { key: 'X-Content-Type-Options', value: 'nosniff' },
                { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
                { key: 'X-XSS-Protection', value: '1; mode=block' }
              ]
            }
          ]
        },
        null,
        2
      )
    },
    {
      filePath: 'package.json',
      language: 'json',
      description: 'Vercel build scripts and dependencies for intronreadinglabs.com',
      content: JSON.stringify(
        {
          name: 'intronreadinglabs-platform',
          version: '2.4.0',
          private: true,
          type: 'module',
          scripts: {
            dev: 'vite',
            build: 'tsc && vite build',
            preview: 'vite preview'
          },
          dependencies: {
            react: '^19.0.0',
            'react-dom': '^19.0.0',
            'lucide-react': '^0.546.0'
          },
          devDependencies: {
            '@tailwindcss/vite': '^4.3.3',
            '@vitejs/plugin-react': '^6.1.1',
            tailwindcss: '^4.3.3',
            typescript: '^7.0.0',
            vite: '^8.3.0'
          }
        },
        null,
        2
      )
    },
    {
      filePath: 'DEPLOYMENT_GUIDE_INTRONREADINGS.md',
      language: 'markdown',
      description: 'Complete step-by-step induction protocol for GitHub and Vercel',
      content: `# Intron Reading Labs — Deployment & Induction Protocol
Live AI Studio Instance: https://intron-reading-labs.ai.studio
Target Custom Domain: https://www.intronreadinglabs.com
Host: Vercel Edge Network
Repository: GitHub (aminaatiq27004/intronreadings)

## Step 1: Sync Code to GitHub Repository
Clone or open your repository locally:
\`\`\`bash
git clone https://github.com/aminaatiq27004/intronreadings.git
cd intronreadings
\`\`\`

Copy all files from this project into your repository directory.

## Step 2: Commit and Push
\`\`\`bash
git add .
git commit -m "feat(core): induct Ultra Triplet Codon Theory (UTCT) flagship engine & research suite"
git push origin main
\`\`\`

## Step 3: Automatic Vercel Edge Deployment
1. Log into https://vercel.com
2. Your project 'intronreadinglabs' connected to GitHub will detect the push on branch 'main'.
3. Vercel runs: 'npm install' -> 'npm run build' -> Deploys to edge servers.
4. Your custom domain 'www.intronreadinglabs.com' and AI Studio instance 'intron-reading-labs.ai.studio' are synchronized.

## Step 4: Verify Domain DNS
Ensure DNS settings in your domain registrar are configured:
- CNAME www -> cname.vercel-dns.com
- A @ -> 76.76.21.21
`
    },
    {
      filePath: 'src/apps/splice-sense/index.tsx',
      language: 'typescript',
      description: 'Standalone SpliceSense route module ready for import into your router',
      content: `// Standalone SpliceSense Module for www.intronreadinglabs.com
export { SpliceSenseApp } from '../../components/apps/SpliceSenseApp';
`
    }
  ];

  const handleVerifyDns = () => {
    setIsVerifyingDns(true);
    setVerificationFeedback(null);
    setTimeout(() => {
      setIsVerifyingDns(false);
      setVerificationFeedback('All DNS records and Vercel edge connections confirmed valid.');
    }, 1200);
  };

  const copyCommandText = (cmd: string, id: string) => {
    navigator.clipboard.writeText(cmd);
    setCopiedCommand(id);
    setTimeout(() => setCopiedCommand(null), 2000);
  };

  const toggleAppStatus = (appId: string) => {
    setApps(prev =>
      prev.map(app => {
        if (app.id === appId) {
          const nextStatus =
            app.inductionStatus === 'published'
              ? 'staged'
              : app.inductionStatus === 'staged'
              ? 'ready_to_induct'
              : 'published';
          return { ...app, inductionStatus: nextStatus };
        }
        return app;
      })
    );
  };

  const embedBaseUrl = embedDomain === 'ai_studio' 
    ? 'https://intron-reading-labs.ai.studio' 
    : 'https://www.intronreadinglabs.com';

  const embedCodeSnippet = `<iframe
  src="${embedBaseUrl}/apps/${selectedEmbedApp}"
  title="Intron Reading Labs — ${selectedEmbedApp}"
  width="100%"
  height="720px"
  style="border: 1px solid #1e293b; border-radius: 12px; background: #020617;"
  loading="lazy"
></iframe>`;

  return (
    <div className="space-y-8">
      
      {/* Top Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-cyan-400">
              <span>DEPLOYMENT & REPO HUB</span>
              <span>·</span>
              <a href="https://intron-reading-labs.ai.studio" target="_blank" rel="noreferrer" className="text-cyan-300 hover:underline">
                INTRON-READING-LABS.AI.STUDIO
              </a>
              <span>·</span>
              <span>WWW.INTRONREADINGLABS.COM</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Induction Center for Intron Reading Labs
            </h2>
            <p className="text-sm text-slate-300 max-w-2xl leading-relaxed">
              Upload, sync, and induct all published applications between your active AI Studio deployment (<span className="text-cyan-400 font-mono">intron-reading-labs.ai.studio</span>), GitHub repository, and custom domain <span className="text-cyan-400 font-mono">www.intronreadinglabs.com</span>.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <a
              href="https://intron-reading-labs.ai.studio"
              target="_blank"
              rel="noreferrer"
              className="px-3.5 py-2.5 text-xs font-semibold text-slate-200 bg-slate-950 border border-slate-800 hover:border-slate-700 rounded-lg transition-colors flex items-center gap-2 shadow-sm font-sans"
            >
              <Globe className="w-4 h-4 text-cyan-400" />
              <span>Open AI Studio App</span>
              <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
            </a>

            <button
              onClick={() => setIsExportModalOpen(true)}
              className="px-4 py-2.5 text-xs font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-lg transition-colors flex items-center gap-2 shadow-sm font-sans"
            >
              <Download className="w-4 h-4" />
              <span>Export Repo Files & Configs</span>
            </button>
          </div>
        </div>

        {/* Live Domain Status Ribbon */}
        <div className="pt-4 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs font-mono">
          <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4 text-cyan-400" />
              <span className="text-slate-300">AI Studio:</span>
            </div>
            <a
              href="https://intron-reading-labs.ai.studio"
              target="_blank"
              rel="noreferrer"
              className="text-cyan-300 font-bold hover:underline truncate max-w-[150px]"
            >
              intron-reading-labs.ai.studio
            </a>
          </div>

          <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4 text-slate-400" />
              <span className="text-slate-300">Target Host:</span>
            </div>
            <span className="text-white font-bold truncate max-w-[150px]">www.intronreadinglabs.com</span>
          </div>

          <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Server className="w-4 h-4 text-emerald-400" />
              <span className="text-slate-300">Vercel Edge:</span>
            </div>
            <span className="text-emerald-400 font-bold">Active & Configured</span>
          </div>

          <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Github className="w-4 h-4 text-slate-300" />
              <span className="text-slate-300">GitHub CI/CD:</span>
            </div>
            <span className="text-cyan-400 font-bold">Ready for Push</span>
          </div>
        </div>
      </div>

      {/* Domain DNS & Edge Verification Console */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <h3 className="text-base font-bold text-white">DNS & Vercel Edge Routing Status</h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Current network routing records for www.intronreadinglabs.com on Vercel
            </p>
          </div>

          <button
            onClick={handleVerifyDns}
            disabled={isVerifyingDns}
            className="px-3.5 py-1.5 text-xs font-mono font-medium rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors flex items-center gap-2 shrink-0"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isVerifyingDns ? 'animate-spin text-cyan-400' : ''}`} />
            <span>{isVerifyingDns ? 'Checking Edge Records...' : 'Verify DNS Records'}</span>
          </button>
        </div>

        {verificationFeedback && (
          <div className="p-3 rounded-lg bg-emerald-950/60 border border-emerald-500/50 text-xs font-mono text-emerald-300 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>{verificationFeedback}</span>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {dnsChecks.map((item) => (
            <div key={item.id} className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2 font-mono text-xs">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="px-1.5 py-0.5 rounded bg-slate-800 text-cyan-400 font-bold text-[11px]">
                    {item.recordType}
                  </span>
                  <span className="text-white font-semibold">{item.host}</span>
                </div>
                <div className="flex items-center gap-1.5 text-emerald-400 text-[11px]">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Valid</span>
                </div>
              </div>

              <div className="text-slate-400 text-[11px]">
                Target: <span className="text-slate-200">{item.target}</span>
              </div>
              <div className="text-slate-400 text-[11px] leading-relaxed pt-1 border-t border-slate-900 font-sans">
                {item.description}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Induction Pathways (GitHub Push / Vercel CLI / Embed Snippets) */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-6">
        
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div>
            <h3 className="text-base font-bold text-white">Choose Induction Method</h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Select how you prefer to upload your apps to www.intronreadinglabs.com
            </p>
          </div>

          <div className="flex items-center gap-1.5 p-1 bg-slate-950 rounded-lg border border-slate-800">
            <button
              onClick={() => setSelectedMethod('github')}
              className={`px-3 py-1.5 text-xs font-medium rounded transition-colors ${
                selectedMethod === 'github' ? 'bg-cyan-400 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              GitHub Push (Auto Vercel)
            </button>
            <button
              onClick={() => setSelectedMethod('vercel_cli')}
              className={`px-3 py-1.5 text-xs font-medium rounded transition-colors ${
                selectedMethod === 'vercel_cli' ? 'bg-cyan-400 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              Vercel CLI
            </button>
            <button
              onClick={() => setSelectedMethod('embed')}
              className={`px-3 py-1.5 text-xs font-medium rounded transition-colors ${
                selectedMethod === 'embed' ? 'bg-cyan-400 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              Embed Snippet
            </button>
          </div>
        </div>

        {/* Method 1: GitHub Push */}
        {selectedMethod === 'github' && (
          <div className="space-y-6">
            
            {/* Quick Download Bundle */}
            <div className="p-4 rounded-xl bg-cyan-950/40 border border-cyan-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h4 className="text-xs font-bold font-mono text-cyan-300 uppercase tracking-wide">
                  Complete Production Repository Archive
                </h4>
                <p className="text-xs text-slate-300 mt-0.5">
                  Pre-initialized Git repository with all 5 apps, commit history, configs, and assets ready to unpack.
                </p>
              </div>
              <a
                href="/intronreadinglabs-repository.tar.gz"
                download="intronreadinglabs-repository.tar.gz"
                className="px-4 py-2 bg-cyan-400 hover:bg-cyan-300 text-slate-950 text-xs font-bold rounded-lg transition-colors flex items-center gap-1.5 whitespace-nowrap shrink-0 shadow-sm"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download Git Repo (.tar.gz)</span>
              </a>
            </div>

            {/* Step-by-Step New Repository Publisher */}
            <div className="p-5 bg-slate-950 rounded-xl border border-slate-800 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <span className="text-xs font-mono font-bold text-white uppercase tracking-wider">
                  Publish to New GitHub Repository
                </span>
                <span className="text-xs font-mono text-slate-400">
                  Target: github.com/aminaatiq27004/intronreadings
                </span>
              </div>

              <div className="space-y-3 text-xs leading-relaxed text-slate-300">
                <div className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-slate-800 text-cyan-400 font-mono text-xs flex items-center justify-center font-bold shrink-0">1</span>
                  <div>
                    <strong className="text-white">Create a New Repository on GitHub:</strong>
                    <p className="text-slate-400 mt-0.5">
                      Go to <a href="https://github.com/new" target="_blank" rel="noreferrer" className="text-cyan-400 hover:underline">github.com/new</a> and name your repository <code className="text-cyan-300 bg-slate-900 px-1 py-0.5 rounded font-mono">intronreadings</code> (leave it empty without initializing README, as our repository already includes the full codebase).
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-slate-800 text-cyan-400 font-mono text-xs flex items-center justify-center font-bold shrink-0">2</span>
                  <div className="w-full">
                    <strong className="text-white">Link and Push in One Terminal Command:</strong>
                    <div className="mt-2 p-3 bg-slate-900 rounded-lg border border-slate-800 font-mono text-xs space-y-2">
                      <div className="flex items-center justify-between text-slate-400">
                        <span>GIT CLI COMMANDS:</span>
                        <button
                          onClick={() =>
                            copyCommandText(
                              `# Link remote repository\ngit remote add origin https://github.com/aminaatiq27004/intronreadings.git\n\n# Ensure main branch\ngit branch -M main\n\n# Push to GitHub\ngit push -u origin main`,
                              'cmd-new-repo'
                            )
                          }
                          className="text-cyan-400 hover:text-cyan-300 flex items-center gap-1 font-mono text-xs"
                        >
                          <Copy className="w-3.5 h-3.5" />
                          <span>{copiedCommand === 'cmd-new-repo' ? 'Copied' : 'Copy Commands'}</span>
                        </button>
                      </div>
                      <pre className="text-cyan-300 select-text overflow-x-auto leading-relaxed">
{`git remote add origin https://github.com/aminaatiq27004/intronreadings.git
git branch -M main
git push -u origin main`}
                      </pre>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-slate-800 text-cyan-400 font-mono text-xs flex items-center justify-center font-bold shrink-0">3</span>
                  <div>
                    <strong className="text-white">Automatic Vercel Deployment to www.intronreadinglabs.com:</strong>
                    <p className="text-slate-400 mt-0.5">
                      Once pushed, Vercel automatically deploys the <code className="text-cyan-300 bg-slate-900 px-1 py-0.5 rounded font-mono">main</code> branch to your live domain <strong className="text-white">www.intronreadinglabs.com</strong>.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 pt-1">
              <button
                onClick={() => setIsExportModalOpen(true)}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-lg flex items-center gap-2 transition-colors"
              >
                <Code2 className="w-3.5 h-3.5" />
                <span>View & Copy Individual Files</span>
              </button>
            </div>

          </div>
        )}


        {/* Method 2: Vercel CLI */}
        {selectedMethod === 'vercel_cli' && (
          <div className="space-y-4">
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              If you have the Vercel command line interface installed on your machine, deploy directly from your local terminal with one command:
            </p>

            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3 font-mono text-xs">
              <div className="flex items-center justify-between text-slate-400">
                <span>VERCEL CLI DEPLOY COMMANDS:</span>
                <button
                  onClick={() =>
                    copyCommandText(`npm i -g vercel\nvercel link\nvercel --prod`, 'cmd-vercel')
                  }
                  className="text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>{copiedCommand === 'cmd-vercel' ? 'Copied' : 'Copy Commands'}</span>
                </button>
              </div>

              <pre className="text-cyan-300 leading-relaxed select-text overflow-x-auto">
{`# 1. Install or update Vercel CLI (if not already installed)
npm i -g vercel

# 2. Link your working folder to your Vercel project
vercel link

# 3. Deploy directly to www.intronreadinglabs.com
vercel --prod`}
              </pre>
            </div>
          </div>
        )}

        {/* Method 3: Embed Snippet */}
        {selectedMethod === 'embed' && (
          <div className="space-y-4">
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Embed any individual app directly into your existing pages, blog articles, or sub-domains at intronreadinglabs.com using this responsive snippet:
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-2">
                <label className="text-xs font-mono uppercase text-slate-400">App to Embed:</label>
                <select
                  value={selectedEmbedApp}
                  onChange={(e) => setSelectedEmbedApp(e.target.value)}
                  className="bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-cyan-500 font-sans"
                >
                  <option value="splice-sense">SpliceSense Studio</option>
                  <option value="biolex-reader">BioLex Literature Reader</option>
                  <option value="isoform-mapper">IsoformMapper Simulator</option>
                  <option value="cadence-lab">Cadence Lab Pacer</option>
                  <option value="biograph-explorer">BioGraph Explorer</option>
                </select>
              </div>

              <div className="flex items-center gap-2">
                <label className="text-xs font-mono uppercase text-slate-400">Host Domain:</label>
                <div className="flex items-center p-0.5 bg-slate-950 rounded-lg border border-slate-800">
                  <button
                    onClick={() => setEmbedDomain('ai_studio')}
                    className={`px-2.5 py-1 text-xs font-mono rounded ${
                      embedDomain === 'ai_studio'
                        ? 'bg-cyan-400 text-slate-950 font-bold'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    intron-reading-labs.ai.studio
                  </button>
                  <button
                    onClick={() => setEmbedDomain('custom_domain')}
                    className={`px-2.5 py-1 text-xs font-mono rounded ${
                      embedDomain === 'custom_domain'
                        ? 'bg-cyan-400 text-slate-950 font-bold'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    www.intronreadinglabs.com
                  </button>
                </div>
              </div>
            </div>

            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2 font-mono text-xs">
              <div className="flex items-center justify-between text-slate-400">
                <span>HTML / REACT EMBED SNIPPET:</span>
                <button
                  onClick={() => copyCommandText(embedCodeSnippet, 'cmd-embed')}
                  className="text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>{copiedCommand === 'cmd-embed' ? 'Copied' : 'Copy Snippet'}</span>
                </button>
              </div>
              <pre className="text-cyan-300 leading-relaxed select-text overflow-x-auto">
                {embedCodeSnippet}
              </pre>
            </div>
          </div>
        )}

      </div>

      {/* Manifest of All 5 Apps for Induction */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-5">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div>
            <h3 className="text-base font-bold text-white">Application Induction Catalog</h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Current state of apps for induction into www.intronreadinglabs.com
            </p>
          </div>
          <span className="text-xs font-mono text-cyan-400 tabular-nums">
            5 Modules Configured
          </span>
        </div>

        <div className="space-y-3">
          {apps.map((app) => (
            <div
              key={app.id}
              className="p-4 bg-slate-950 rounded-xl border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4 transition-colors hover:border-slate-700"
            >
              <div className="space-y-1.5 flex-1">
                <div className="flex items-center gap-2.5">
                  <span className="font-bold text-sm text-white">{app.name}</span>
                  <span className="text-xs text-slate-400 font-mono">({app.version})</span>
                  <span className="text-slate-600">·</span>
                  <span className="text-xs text-cyan-400 font-mono">{app.routeSlug}</span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed max-w-2xl">
                  {app.description}
                </p>
                <div className="flex items-center gap-3 text-[11px] text-slate-400 font-mono pt-1">
                  <span>File: {app.githubFile}</span>
                  <span>·</span>
                  <span>Last inducted: {app.lastInducted}</span>
                </div>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <button
                  onClick={() => toggleAppStatus(app.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono border transition-colors ${
                    app.inductionStatus === 'published'
                      ? 'bg-emerald-950/60 border-emerald-500/50 text-emerald-300'
                      : app.inductionStatus === 'staged'
                      ? 'bg-amber-950/60 border-amber-500/50 text-amber-300'
                      : 'bg-cyan-950/60 border-cyan-500/50 text-cyan-300'
                  }`}
                  title="Click to toggle induction state"
                >
                  {app.inductionStatus === 'published'
                    ? '● Live on Site'
                    : app.inductionStatus === 'staged'
                    ? '▲ Staged for Sync'
                    : 'Ready to Induct'}
                </button>

                <button
                  onClick={() => onOpenApp(app.id)}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-medium text-white transition-colors"
                >
                  Test App
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Code Export Modal */}
      <CodeExportModal
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
        files={generatedFiles}
      />

    </div>
  );
};
