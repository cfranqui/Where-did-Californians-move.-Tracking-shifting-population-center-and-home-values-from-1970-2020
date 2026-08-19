import React from 'react';
import { Layers, MapPin, Table, BookOpen, GitBranch, Sparkles, Compass } from 'lucide-react';

export type ViewTab = 'poster' | 'map' | 'trajectories' | 'explorer' | 'methodology' | 'discussion';

interface NavbarProps {
  activeTab: ViewTab;
  setActiveTab: (tab: ViewTab) => void;
  onOpenGitHubModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  onOpenGitHubModal,
}) => {
  const tabs: { id: ViewTab; label: string; icon: React.ReactNode; badge?: string }[] = [
    { id: 'poster', label: 'Academic Poster', icon: <BookOpen className="w-4 h-4" /> },
    { id: 'map', label: 'GIS Map Studio', icon: <Layers className="w-4 h-4" />, badge: '6 Layers' },
    { id: 'trajectories', label: 'Mean Center Paths', icon: <Compass className="w-4 h-4" /> },
    { id: 'explorer', label: '58 Counties Data', icon: <Table className="w-4 h-4" /> },
    { id: 'methodology', label: 'ArcGIS Methodology', icon: <MapPin className="w-4 h-4" /> },
    { id: 'discussion', label: 'Insights & Discussion', icon: <Sparkles className="w-4 h-4" /> },
  ];

  return (
    <header className="sticky top-0 z-40 bg-zinc-950/90 border-b border-zinc-800/80 text-zinc-100 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand / Title with Bento Theme Accent */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center font-bold text-lg text-white shadow-lg shadow-indigo-600/20 border border-indigo-500/30">
              CA
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-bold text-zinc-100 tracking-tight text-base sm:text-lg leading-none">
                  Where Did Californians Move?
                </h1>
                <span className="hidden md:inline-block px-2.5 py-0.5 text-[10px] font-semibold tracking-wider uppercase rounded-full bg-indigo-950/70 text-indigo-400 border border-indigo-500/30">
                  1970–2020 GIS Analysis
                </span>
              </div>
              <p className="text-[11px] text-zinc-400 font-mono mt-0.5 hidden sm:block">
                Christopher Franqui • GEG 230 Spatial Analysis • Monroe Community College
              </p>
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center gap-2">
            <span className="hidden lg:inline-flex px-3 py-1 bg-zinc-900 border border-zinc-800 rounded-full text-xs text-zinc-400 font-mono">
              ArcGIS Pro • EPSG:3310
            </span>
            <button
              id="github-guide-btn"
              onClick={onOpenGitHubModal}
              className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-full text-xs font-semibold shadow-md shadow-indigo-600/20 border border-indigo-500/40 transition duration-150"
              title="Add to GitHub & Installation Guide"
            >
              <GitBranch className="w-3.5 h-3.5" />
              <span>GitHub & Install</span>
            </button>
          </div>
        </div>

        {/* Tab Navigation - Bento Pill Strip */}
        <div className="flex overflow-x-auto no-scrollbar gap-1.5 border-t border-zinc-800/80 py-2.5 -mb-px">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                id={`tab-nav-${tab.id}`}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all duration-150 border ${
                  isActive
                    ? 'bg-zinc-900 border-indigo-500/50 text-indigo-300 font-semibold shadow-sm ring-1 ring-indigo-500/20'
                    : 'bg-zinc-950/50 border-zinc-800/60 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/60 hover:border-zinc-700'
                }`}
              >
                <span className={isActive ? 'text-indigo-400' : 'text-zinc-400'}>{tab.icon}</span>
                <span>{tab.label}</span>
                {tab.badge && (
                  <span
                    className={`px-1.5 py-0.2 text-[9px] font-mono uppercase tracking-wider rounded ${
                      isActive
                        ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30'
                        : 'bg-zinc-800 text-zinc-400 border border-zinc-700/50'
                    }`}
                  >
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
};
