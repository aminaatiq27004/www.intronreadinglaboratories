import React, { useState } from 'react';
import { GeneratedRepoFile } from '../../types';
import { Check, Copy, Download, FileCode, X } from 'lucide-react';

interface CodeExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  files: GeneratedRepoFile[];
  initialFileIndex?: number;
}

export const CodeExportModal: React.FC<CodeExportModalProps> = ({
  isOpen,
  onClose,
  files,
  initialFileIndex = 0
}) => {
  const [activeFileIndex, setActiveFileIndex] = useState<number>(initialFileIndex);
  const [copied, setCopied] = useState<boolean>(false);

  if (!isOpen || files.length === 0) return null;

  const currentFile = files[activeFileIndex] || files[0];

  const handleCopy = () => {
    navigator.clipboard.writeText(currentFile.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadFile = () => {
    const blob = new Blob([currentFile.content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = currentFile.filePath.split('/').pop() || 'file.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleDownloadAll = () => {
    // Downloads all files sequentially
    files.forEach((file, index) => {
      setTimeout(() => {
        const blob = new Blob([file.content], { type: 'text/plain;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = file.filePath.split('/').pop() || `file-${index}.txt`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
      }, index * 200);
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/80 backdrop-blur-sm">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded bg-cyan-950 border border-cyan-500/40 flex items-center justify-center text-cyan-400 font-mono text-xs font-bold">
              GIT
            </div>
            <div>
              <h3 className="font-bold text-white text-sm sm:text-base">
                Repository File Exporter — www.intronreadinglabs.com
              </h3>
              <p className="text-xs text-slate-400">
                Ready-to-commit files for your GitHub repository and Vercel build
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleDownloadAll}
              className="px-3 py-1.5 text-xs font-medium text-slate-300 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors flex items-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download All</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* File Tabs Ribbon */}
        <div className="flex items-center gap-1 px-6 pt-3 border-b border-slate-800 overflow-x-auto bg-slate-950/60">
          {files.map((file, idx) => (
            <button
              key={file.filePath}
              onClick={() => setActiveFileIndex(idx)}
              className={`px-3 py-2 text-xs font-mono rounded-t-lg transition-colors flex items-center gap-2 whitespace-nowrap shrink-0 border-t border-x ${
                activeFileIndex === idx
                  ? 'bg-slate-900 border-slate-700 text-cyan-400 font-semibold'
                  : 'bg-transparent border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <FileCode className="w-3.5 h-3.5" />
              <span>{file.filePath}</span>
            </button>
          ))}
        </div>

        {/* Code Content & Actions */}
        <div className="flex-1 overflow-hidden flex flex-col p-6 space-y-3">
          <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
            <span>{currentFile.description}</span>
            <div className="flex items-center gap-2">
              <button
                onClick={handleCopy}
                className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded flex items-center gap-1 transition-colors"
              >
                {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                <span>{copied ? 'Copied' : 'Copy Content'}</span>
              </button>
              <button
                onClick={handleDownloadFile}
                className="px-3 py-1 bg-cyan-950 border border-cyan-500/40 hover:bg-cyan-900 text-cyan-300 rounded flex items-center gap-1 transition-colors"
              >
                <Download className="w-3 h-3" />
                <span>Save File</span>
              </button>
            </div>
          </div>

          <div className="flex-1 bg-slate-950 rounded-xl border border-slate-800 p-4 overflow-y-auto font-mono text-xs text-slate-300 leading-relaxed select-text">
            <pre><code>{currentFile.content}</code></pre>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-slate-800 bg-slate-950/80 flex items-center justify-between text-xs text-slate-400 font-mono">
          <span>Target repo: intronreadings / intronreadinglabs</span>
          <span className="text-cyan-400">Target host: www.intronreadinglabs.com</span>
        </div>

      </div>
    </div>
  );
};
