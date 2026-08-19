/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar, ViewTab } from './components/Navbar';
import { ResearchPoster } from './components/ResearchPoster';
import { MapViewer } from './components/MapViewer';
import { MeanCenterVisualizer } from './components/MeanCenterVisualizer';
import { CountyTable } from './components/CountyTable';
import { MethodologySection } from './components/MethodologySection';
import { DiscussionInsights } from './components/DiscussionInsights';
import { GitHubExportModal } from './components/GitHubExportModal';
import { RESEARCH_METADATA } from './data/researchPosterContent';
import { GitBranch } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<ViewTab>('poster');
  const [isGitHubModalOpen, setIsGitHubModalOpen] = useState<boolean>(false);

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col font-sans selection:bg-indigo-500 selection:text-white antialiased">
      {/* Navigation Bar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenGitHubModal={() => setIsGitHubModalOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {activeTab === 'poster' && <ResearchPoster />}
        {activeTab === 'map' && <MapViewer />}
        {activeTab === 'trajectories' && <MeanCenterVisualizer />}
        {activeTab === 'explorer' && <CountyTable />}
        {activeTab === 'methodology' && <MethodologySection />}
        {activeTab === 'discussion' && <DiscussionInsights />}
      </main>

      {/* Footer Bento Bar */}
      <footer className="border-t border-zinc-800/80 bg-zinc-950 py-6 text-center text-xs text-zinc-400">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-bold text-zinc-200">
              {RESEARCH_METADATA.shortTitle}
            </span>
            <span className="text-zinc-700">•</span>
            <span className="text-zinc-400 font-mono">{RESEARCH_METADATA.author}</span>
          </div>

          <div className="flex items-center gap-4 text-[11px] text-zinc-500 font-mono">
            <span>{RESEARCH_METADATA.course}</span>
            <span>•</span>
            <span>{RESEARCH_METADATA.institution}</span>
            <span>•</span>
            <button
              onClick={() => setIsGitHubModalOpen(true)}
              className="text-indigo-400 hover:text-indigo-300 font-semibold inline-flex items-center gap-1 transition"
            >
              <GitBranch className="w-3.5 h-3.5" />
              <span>GitHub Instructions</span>
            </button>
          </div>
        </div>
      </footer>

      {/* GitHub & Installation Guide Modal */}
      <GitHubExportModal
        isOpen={isGitHubModalOpen}
        onClose={() => setIsGitHubModalOpen(false)}
      />
    </div>
  );
}
