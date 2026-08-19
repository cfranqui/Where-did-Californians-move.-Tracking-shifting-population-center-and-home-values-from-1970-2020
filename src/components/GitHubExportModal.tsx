import React, { useState } from 'react';
import { X, Copy, Check, GitBranch, Terminal, ExternalLink, Github, FolderTree, BookOpen } from 'lucide-react';

interface GitHubExportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GitHubExportModal: React.FC<GitHubExportModalProps> = ({ isOpen, onClose }) => {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  if (!isOpen) return null;

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const gitSnippet1 = `# 1. Initialize a Git repository in this project directory
git init

# 2. Add all source files, README, and configuration
git add .

# 3. Create your first commit
git commit -m "feat: initial commit for California Population & Home Values GIS Analysis (1970-2020)"

# 4. Link your remote GitHub repository (replace with your repo URL)
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/california-population-gis-1970-2020.git

# 5. Push to GitHub
git push -u origin main`;

  const installSnippet = `# Clone the repository
git clone https://github.com/YOUR_USERNAME/california-population-gis-1970-2020.git

# Navigate into project directory
cd california-population-gis-1970-2020

# Install dependencies
npm install

# Start the local development server (runs at http://localhost:3000)
npm run dev

# Build for production deployment
npm run build`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl text-slate-100 overflow-hidden my-8">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <Github className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-100">
                GitHub Repository & Installation Guide
              </h3>
              <p className="text-xs text-slate-400">
                How to push this project to GitHub and install it locally
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          {/* Quick Methods */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800">
              <div className="flex items-center gap-2 text-xs font-bold text-amber-400 mb-1">
                <GitBranch className="w-4 h-4" />
                <span>AI Studio Export Option</span>
              </div>
              <p className="text-xs text-slate-300">
                You can also export directly via Google AI Studio by clicking the <strong>Settings Menu (&vellip;) &gt; Export to GitHub / Download ZIP</strong>.
              </p>
            </div>

            <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800">
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 mb-1">
                <BookOpen className="w-4 h-4" />
                <span>Full README.md Included</span>
              </div>
              <p className="text-xs text-slate-300">
                A comprehensive <code className="text-emerald-300 font-mono">README.md</code> has been generated with complete research methodology, data sources, and setup commands.
              </p>
            </div>
          </div>

          {/* Section 1: Push to GitHub Commands */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-200">
                <Terminal className="w-4 h-4 text-emerald-400" />
                <span>Step 1: Push to your GitHub Repository</span>
              </div>
              <button
                onClick={() => copyToClipboard(gitSnippet1, 1)}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-[11px] text-slate-300 border border-slate-700 transition"
              >
                {copiedIndex === 1 ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400 font-bold">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Commands</span>
                  </>
                )}
              </button>
            </div>
            <pre className="p-4 bg-slate-950 rounded-xl border border-slate-800 text-xs font-mono text-emerald-300 overflow-x-auto">
              {gitSnippet1}
            </pre>
          </div>

          {/* Section 2: Installation Process */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-200">
                <FolderTree className="w-4 h-4 text-sky-400" />
                <span>Step 2: Installation & Running Locally</span>
              </div>
              <button
                onClick={() => copyToClipboard(installSnippet, 2)}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-[11px] text-slate-300 border border-slate-700 transition"
              >
                {copiedIndex === 2 ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400 font-bold">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Commands</span>
                  </>
                )}
              </button>
            </div>
            <pre className="p-4 bg-slate-950 rounded-xl border border-slate-800 text-xs font-mono text-sky-300 overflow-x-auto">
              {installSnippet}
            </pre>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 border-t border-slate-800 bg-slate-950 flex items-center justify-between">
          <span className="text-xs text-slate-400">
            Node.js 18+ and npm required.
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-lg border border-slate-700 transition"
          >
            Close Guide
          </button>
        </div>
      </div>
    </div>
  );
};
