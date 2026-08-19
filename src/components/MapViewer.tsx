import React, { useState, useMemo } from 'react';
import { CALIFORNIA_COUNTIES, CountyData } from '../data/californiaData';
import { MEAN_CENTER_SCENARIOS } from '../data/meanCenterData';
import { Play, Pause, RotateCcw, Info, ZoomIn, TrendingUp, DollarSign, Users, Compass, Eye, Map as MapIcon, Layers } from 'lucide-react';

export type MapLayer = 
  | 'pop_growth' 
  | 'home_val_1990' 
  | 'home_val_2020' 
  | 'mean_center_baseline' 
  | 'mean_center_no_la' 
  | 'mean_center_no_la_bay'
  | 'pop_by_decade';

export const MapViewer: React.FC = () => {
  const [activeLayer, setActiveLayer] = useState<MapLayer>('mean_center_baseline');
  const [selectedCounty, setSelectedCounty] = useState<CountyData | null>(
    CALIFORNIA_COUNTIES.find((c) => c.name === 'Riverside') || CALIFORNIA_COUNTIES[0]
  );
  const [hoveredCounty, setHoveredCounty] = useState<CountyData | null>(null);
  const [selectedDecade, setSelectedDecade] = useState<number>(2020);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [filterRegion, setFilterRegion] = useState<string>('all');
  const [showAllTrajectories, setShowAllTrajectories] = useState<boolean>(true);

  // Decade animation player
  React.useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setSelectedDecade((prev) => {
          if (prev >= 2020) return 1970;
          return prev + 10;
        });
      }, 1400);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  // Color functions for choropleth maps (Optimized for Bento dark theme)
  const getPopGrowthColor = (pct: number): string => {
    if (pct < 50) return '#064e3b'; // < 50%
    if (pct < 100) return '#047857'; // 50% - 100%
    if (pct < 200) return '#10b981'; // 100% - 200%
    if (pct < 300) return '#34d399'; // 200% - 300%
    return '#6ee7b7'; // > 300% (brightest emerald)
  };

  const getHomeValueColor = (val: number): string => {
    if (val < 200000) return '#1e1b4b'; // < $200k (deep indigo)
    if (val < 400000) return '#3730a3'; // $200k - $400k
    if (val < 700000) return '#6366f1'; // $400k - $700k
    if (val < 1000000) return '#818cf8'; // $700k - $1M
    return '#c7d2fe'; // > $1M (brightest lavender)
  };

  const getCountyFill = (county: CountyData): string => {
    if (filterRegion !== 'all' && county.region !== filterRegion) {
      return '#18181b'; // zinc-900 dimmed
    }

    if (activeLayer === 'pop_growth') {
      return getPopGrowthColor(county.popGrowthPct);
    }
    if (activeLayer === 'home_val_1990') {
      return getHomeValueColor(county.homeValue1990Adj2020);
    }
    if (activeLayer === 'home_val_2020') {
      return getHomeValueColor(county.homeValue2020);
    }
    if (activeLayer === 'pop_by_decade') {
      const popKey = `pop${selectedDecade}` as keyof CountyData;
      const pop = Number(county[popKey]) || 0;
      if (pop > 3000000) return '#f43f5e';
      if (pop > 1000000) return '#fb7185';
      if (pop > 500000) return '#fda4af';
      if (pop > 150000) return '#fecdd3';
      return '#3f3f46';
    }

    // Default styling for Mean Center modes
    if (county.isLA && (activeLayer === 'mean_center_no_la' || activeLayer === 'mean_center_no_la_bay')) {
      return '#4c0519'; // Highlight remitted LA
    }
    if (county.isBayArea && activeLayer === 'mean_center_no_la_bay') {
      return '#1e1b4b'; // Highlight remitted Bay Area
    }
    return '#27272a';
  };

  const activeScenario = useMemo(() => {
    if (activeLayer === 'mean_center_baseline') return MEAN_CENTER_SCENARIOS[0];
    if (activeLayer === 'mean_center_no_la') return MEAN_CENTER_SCENARIOS[1];
    if (activeLayer === 'mean_center_no_la_bay') return MEAN_CENTER_SCENARIOS[2];
    return null;
  }, [activeLayer]);

  const currentDisplayCounty = hoveredCounty || selectedCounty;

  return (
    <div className="space-y-6">
      {/* Bento Header Box */}
      <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6 backdrop-blur-sm">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">
                GIS Map Studio
              </span>
              <span className="text-[10px] bg-zinc-800 text-zinc-300 px-2 py-0.5 rounded uppercase font-semibold">
                Interactive Layering
              </span>
            </div>
            <h2 className="text-2xl font-bold tracking-tight text-white">
              California Spatial Distribution & Affordability Explorer
            </h2>
            <p className="text-xs text-zinc-400 mt-1">
              Select any map layer to examine spatial mean centers, population shifts, and inflation-adjusted median home values (1970–2020).
            </p>
          </div>

          {/* Quick Layer Switcher Bento Buttons */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              id="layer-mc-baseline"
              onClick={() => setActiveLayer('mean_center_baseline')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all duration-150 ${
                activeLayer === 'mean_center_baseline'
                  ? 'bg-rose-500/20 border-rose-500/60 text-rose-300 shadow-sm'
                  : 'bg-zinc-950/60 border-zinc-800 text-zinc-400 hover:text-zinc-200 hover:border-zinc-700'
              }`}
            >
              Mean Center (All 58)
            </button>
            <button
              id="layer-mc-no-la"
              onClick={() => setActiveLayer('mean_center_no_la')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all duration-150 ${
                activeLayer === 'mean_center_no_la'
                  ? 'bg-amber-500/20 border-amber-500/60 text-amber-300 shadow-sm'
                  : 'bg-zinc-950/60 border-zinc-800 text-zinc-400 hover:text-zinc-200 hover:border-zinc-700'
              }`}
            >
              Mean Center (No LA)
            </button>
            <button
              id="layer-mc-no-bay"
              onClick={() => setActiveLayer('mean_center_no_la_bay')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all duration-150 ${
                activeLayer === 'mean_center_no_la_bay'
                  ? 'bg-sky-500/20 border-sky-500/60 text-sky-300 shadow-sm'
                  : 'bg-zinc-950/60 border-zinc-800 text-zinc-400 hover:text-zinc-200 hover:border-zinc-700'
              }`}
            >
              Mean Center (No LA & Bay)
            </button>
            <button
              id="layer-pop-growth"
              onClick={() => setActiveLayer('pop_growth')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all duration-150 ${
                activeLayer === 'pop_growth'
                  ? 'bg-emerald-500/20 border-emerald-500/60 text-emerald-300 shadow-sm'
                  : 'bg-zinc-950/60 border-zinc-800 text-zinc-400 hover:text-zinc-200 hover:border-zinc-700'
              }`}
            >
              Pop Growth %
            </button>
            <button
              id="layer-home-1990"
              onClick={() => setActiveLayer('home_val_1990')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all duration-150 ${
                activeLayer === 'home_val_1990'
                  ? 'bg-indigo-500/20 border-indigo-500/60 text-indigo-300 shadow-sm'
                  : 'bg-zinc-950/60 border-zinc-800 text-zinc-400 hover:text-zinc-200 hover:border-zinc-700'
              }`}
            >
              1990 Home (2020 $)
            </button>
            <button
              id="layer-home-2020"
              onClick={() => setActiveLayer('home_val_2020')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all duration-150 ${
                activeLayer === 'home_val_2020'
                  ? 'bg-purple-500/20 border-purple-500/60 text-purple-300 shadow-sm'
                  : 'bg-zinc-950/60 border-zinc-800 text-zinc-400 hover:text-zinc-200 hover:border-zinc-700'
              }`}
            >
              2020 Home Values
            </button>
          </div>
        </div>
      </div>

      {/* Bento Grid: Map Container (7 cols) + Analytics/Inspector Panel (5 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Interactive Map Bento Cell (7 cols) */}
        <div className="lg:col-span-7 bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6 backdrop-blur-sm flex flex-col relative">
          <div className="flex items-center justify-between border-b border-zinc-800/80 pb-4 mb-4">
            <div>
              <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest block">
                Cartographic Projection
              </span>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <span>California Albers Equal Area (EPSG:3310)</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-zinc-800 text-zinc-300 border border-zinc-700">
                  58 Counties
                </span>
              </h3>
            </div>

            {/* Region Filter */}
            <select
              id="region-filter-select"
              aria-label="Filter by Geographic Region"
              value={filterRegion}
              onChange={(e) => setFilterRegion(e.target.value)}
              className="text-xs rounded-xl border border-zinc-800 bg-zinc-950/80 px-3 py-1.5 text-zinc-300 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            >
              <option value="all">All California Regions</option>
              <option value="Inland Empire">Inland Empire</option>
              <option value="Central Valley">Central Valley</option>
              <option value="Bay Area">Bay Area (9 Counties)</option>
              <option value="Southern Coast">Southern Coast</option>
              <option value="Central Coast">Central Coast</option>
              <option value="Sierra & Foothills">Sierra & Foothills</option>
              <option value="Northern California">Northern California</option>
            </select>
          </div>

          {/* Map SVG Container */}
          <div className="relative w-full aspect-[4/5] bg-zinc-950/90 rounded-xl border border-zinc-800/80 p-2 overflow-hidden flex items-center justify-center">
            {/* Grid texture */}
            <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#6366f1_1px,transparent_1px)] [background-size:18px_18px] pointer-events-none"></div>

            {/* North Arrow & Scale Bar */}
            <div className="absolute top-4 right-4 z-10 bg-zinc-900/90 backdrop-blur-md p-2.5 rounded-xl border border-zinc-800 shadow-md text-center">
              <div className="flex flex-col items-center">
                <Compass className="w-4 h-4 text-indigo-400" />
                <span className="text-[10px] font-bold text-zinc-200">N</span>
                <span className="text-[8px] text-zinc-400 font-mono mt-0.5">EPSG:3310</span>
              </div>
            </div>

            {/* SVG Map of California */}
            <svg
              viewBox="0 0 100 100"
              className="w-full h-full max-h-[580px] drop-shadow-sm select-none"
            >
              {/* California State Base Geometry */}
              <path
                d="M 12 6 L 44 8 L 41 42 L 80 72 L 88 95 L 75 97 L 62 86 L 50 82 L 40 73 L 26 55 L 20 42 L 12 18 Z"
                fill="#18181b"
                stroke="#3f3f46"
                strokeWidth="1.2"
              />

              {/* County Points / Polygons */}
              {CALIFORNIA_COUNTIES.map((county) => {
                const isSelected = selectedCounty?.id === county.id;
                const isHovered = hoveredCounty?.id === county.id;
                const fill = getCountyFill(county);

                let radius = 2.4;
                if (county.name === 'San Bernardino') radius = 6.2;
                else if (county.name === 'Inyo') radius = 5.0;
                else if (county.name === 'Riverside' || county.name === 'Kern') radius = 4.4;
                else if (county.name === 'San Francisco') radius = 1.4;

                return (
                  <g
                    key={county.id}
                    id={`county-map-${county.id}`}
                    onClick={() => setSelectedCounty(county)}
                    onMouseEnter={() => setHoveredCounty(county)}
                    onMouseLeave={() => setHoveredCounty(null)}
                    className="cursor-pointer transition-all duration-150"
                  >
                    <circle
                      cx={county.mapX}
                      cy={county.mapY}
                      r={radius}
                      fill={fill}
                      stroke={isSelected ? '#f43f5e' : isHovered ? '#6366f1' : '#52525b'}
                      strokeWidth={isSelected ? 1.4 : isHovered ? 1.0 : 0.4}
                      className="transition-all duration-200"
                    />
                    <text
                      x={county.mapX}
                      y={county.mapY + 0.6}
                      textAnchor="middle"
                      fontSize="1.6"
                      fontWeight={isSelected || isHovered ? 'bold' : 'normal'}
                      fill={isSelected || isHovered ? '#ffffff' : '#d4d4d8'}
                      pointerEvents="none"
                    >
                      {county.name.slice(0, 3).toUpperCase()}
                    </text>
                  </g>
                );
              })}

              {/* Trajectories Overlay for Mean Center Layers */}
              {activeScenario && (
                <g id="mean-center-trajectory">
                  <polyline
                    points={activeScenario.points.map((p) => `${p.mapX},${p.mapY}`).join(' ')}
                    fill="none"
                    stroke={activeScenario.color}
                    strokeWidth="1.4"
                    strokeDasharray="1.5,1"
                  />

                  {activeScenario.points.map((pt) => (
                    <g key={pt.year} id={`mc-point-${pt.year}`}>
                      <circle
                        cx={pt.mapX}
                        cy={pt.mapY}
                        r={1.8}
                        fill={activeScenario.color}
                        stroke="#ffffff"
                        strokeWidth="0.5"
                      />
                      <rect
                        x={pt.mapX + 2.2}
                        y={pt.mapY - 1.6}
                        width="7.5"
                        height="3.2"
                        rx="0.6"
                        fill="#09090b"
                        stroke="#27272a"
                        strokeWidth="0.3"
                      />
                      <text
                        x={pt.mapX + 6.0}
                        y={pt.mapY + 0.6}
                        textAnchor="middle"
                        fontSize="1.7"
                        fill="#ffffff"
                        fontWeight="bold"
                      >
                        {pt.year}
                      </text>
                    </g>
                  ))}
                </g>
              )}

              {/* Ghost Paths Comparison */}
              {showAllTrajectories && activeLayer.startsWith('mean_center') && (
                <g id="all-scenarios-comparison">
                  {MEAN_CENTER_SCENARIOS.map((scen) => {
                    if (scen.id === activeScenario?.id) return null;
                    return (
                      <polyline
                        key={scen.id}
                        points={scen.points.map((p) => `${p.mapX},${p.mapY}`).join(' ')}
                        fill="none"
                        stroke={scen.color}
                        strokeWidth="0.8"
                        opacity="0.4"
                        strokeDasharray="1,1"
                      />
                    );
                  })}
                </g>
              )}
            </svg>

            {/* Map Floating Legend (Bento Card) */}
            <div className="absolute bottom-3 left-3 bg-zinc-900/95 backdrop-blur-md p-3.5 rounded-xl border border-zinc-800 shadow-xl max-w-xs text-xs text-zinc-300">
              <div className="font-bold text-white mb-2 flex items-center justify-between border-b border-zinc-800 pb-1.5">
                <span className="text-[11px] uppercase tracking-wider text-indigo-400">
                  {activeLayer === 'pop_growth' && 'Population Growth (1970–2020)'}
                  {activeLayer === 'home_val_1990' && '1990 Home Values (2020 $)'}
                  {activeLayer === 'home_val_2020' && '2020 Median Home Values'}
                  {activeLayer.startsWith('mean_center') && 'Mean Center Trajectory'}
                  {activeLayer === 'pop_by_decade' && `County Population (${selectedDecade})`}
                </span>
              </div>

              {activeLayer === 'pop_growth' && (
                <div className="space-y-1 text-[11px]">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-sm" style={{ background: '#064e3b' }}></span>
                    <span className="text-zinc-400">&lt; 50% (Coastal Slowdown)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-sm" style={{ background: '#047857' }}></span>
                    <span className="text-zinc-400">50% - 100%</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-sm" style={{ background: '#10b981' }}></span>
                    <span className="text-zinc-300">100% - 200%</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-sm" style={{ background: '#34d399' }}></span>
                    <span className="text-zinc-300">200% - 300% (Inland Surge)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-sm" style={{ background: '#6ee7b7' }}></span>
                    <span className="text-emerald-300 font-bold">&gt; 300% (Riverside, Placer)</span>
                  </div>
                </div>
              )}

              {activeLayer.includes('home_val') && (
                <div className="space-y-1 text-[11px]">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-sm" style={{ background: '#1e1b4b' }}></span>
                    <span className="text-zinc-400">&lt; $200,000</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-sm" style={{ background: '#3730a3' }}></span>
                    <span className="text-zinc-300">$200,000 - $400,000 (Central Valley)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-sm" style={{ background: '#6366f1' }}></span>
                    <span className="text-zinc-300">$400,000 - $700,000</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-sm" style={{ background: '#818cf8' }}></span>
                    <span className="text-indigo-200">$700,000 - $1,000,000</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-sm" style={{ background: '#c7d2fe' }}></span>
                    <span className="text-white font-bold">&gt; $1,000,000 (Bay Area 2020)</span>
                  </div>
                </div>
              )}

              {activeLayer.startsWith('mean_center') && (
                <div className="space-y-1.5 text-[11px]">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span>
                    <span className="text-zinc-300">Baseline (All 58 Counties)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
                    <span className="text-zinc-300">Without Los Angeles County</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-sky-500"></span>
                    <span className="text-zinc-300">Without LA & Bay Area</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Scenario Comparison Toggle */}
          {activeLayer.startsWith('mean_center') && (
            <div className="mt-4 p-3.5 bg-zinc-950/60 rounded-xl border border-zinc-800 text-xs flex items-center justify-between">
              <span className="text-zinc-400">
                Overlay ghost lines of all 3 mean center scenarios:
              </span>
              <label className="flex items-center gap-2 font-medium text-zinc-200 cursor-pointer">
                <input
                  type="checkbox"
                  checked={showAllTrajectories}
                  onChange={(e) => setShowAllTrajectories(e.target.checked)}
                  className="rounded bg-zinc-900 border-zinc-700 text-indigo-600 focus:ring-indigo-500"
                />
                Show Multi-Scenario Ghost Paths
              </label>
            </div>
          )}
        </div>

        {/* Right Details Panel: Bento Blocks (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          {/* Selected County Detail Bento Card */}
          {currentDisplayCounty && (
            <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6 backdrop-blur-sm">
              <div className="flex items-start justify-between border-b border-zinc-800 pb-3 mb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 text-[10px] font-bold rounded-full bg-zinc-800 text-indigo-300 border border-zinc-700 uppercase tracking-wider">
                      {currentDisplayCounty.region}
                    </span>
                    {currentDisplayCounty.isLA && (
                      <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-rose-950/80 text-rose-300 border border-rose-800">
                        Remitted in Scenario 2
                      </span>
                    )}
                    {currentDisplayCounty.isBayArea && (
                      <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-indigo-950/80 text-indigo-300 border border-indigo-800">
                        Bay Area County
                      </span>
                    )}
                  </div>
                  <h3 className="text-2xl font-bold tracking-tight text-white mt-1.5">
                    {currentDisplayCounty.name} County
                  </h3>
                  <p className="text-xs text-zinc-500 font-mono mt-0.5">FIPS: {currentDisplayCounty.fips}</p>
                </div>
                <div className="text-right">
                  <span className="text-[10px] uppercase tracking-wider text-zinc-500 block">50-Yr Growth</span>
                  <span
                    className={`text-xl font-bold ${
                      currentDisplayCounty.popGrowthPct > 200
                        ? 'text-emerald-400'
                        : currentDisplayCounty.popGrowthPct < 50
                        ? 'text-rose-400'
                        : 'text-zinc-200'
                    }`}
                  >
                    +{currentDisplayCounty.popGrowthPct.toFixed(1)}%
                  </span>
                </div>
              </div>

              {/* Bento Stat Grid */}
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="p-3.5 border border-zinc-800 rounded-xl bg-zinc-950/60">
                  <div className="flex items-center gap-1.5 text-xs text-zinc-400 mb-1">
                    <Users className="w-3.5 h-3.5 text-zinc-500" />
                    <span>1970 Population</span>
                  </div>
                  <div className="text-base font-bold text-white font-mono">
                    {currentDisplayCounty.pop1970.toLocaleString()}
                  </div>
                </div>

                <div className="p-3.5 border border-zinc-800 rounded-xl bg-zinc-950/60">
                  <div className="flex items-center gap-1.5 text-xs text-zinc-400 mb-1">
                    <Users className="w-3.5 h-3.5 text-emerald-400" />
                    <span>2020 Population</span>
                  </div>
                  <div className="text-base font-bold text-emerald-400 font-mono">
                    {currentDisplayCounty.pop2020.toLocaleString()}
                  </div>
                </div>

                <div className="p-3.5 border border-zinc-800 rounded-xl bg-zinc-950/60">
                  <div className="flex items-center gap-1.5 text-xs text-zinc-400 mb-1">
                    <DollarSign className="w-3.5 h-3.5 text-indigo-400" />
                    <span>1990 (in 2020 $)</span>
                  </div>
                  <div className="text-base font-bold text-white font-mono">
                    ${currentDisplayCounty.homeValue1990Adj2020.toLocaleString()}
                  </div>
                  <span className="text-[10px] text-zinc-500">
                    Raw 1990: ${currentDisplayCounty.homeValue1990Raw.toLocaleString()}
                  </span>
                </div>

                <div className="p-3.5 border border-zinc-800 rounded-xl bg-zinc-950/60">
                  <div className="flex items-center gap-1.5 text-xs text-zinc-400 mb-1">
                    <DollarSign className="w-3.5 h-3.5 text-purple-400" />
                    <span>2020 Median Home</span>
                  </div>
                  <div className="text-base font-bold text-purple-300 font-mono">
                    ${currentDisplayCounty.homeValue2020.toLocaleString()}
                  </div>
                  <span className="text-[10px] text-purple-400 font-semibold">
                    +{currentDisplayCounty.homeValueGrowthPct.toFixed(1)}% Real Gain
                  </span>
                </div>
              </div>

              {/* Research Insight Bento Callout */}
              <div className="p-4 bg-indigo-950/30 border border-indigo-500/30 rounded-xl text-xs text-indigo-200">
                <span className="font-bold text-indigo-300 block mb-1">Spatial Analysis Context:</span>
                {currentDisplayCounty.popGrowthPct > 200 ? (
                  <p className="text-zinc-300 leading-relaxed">
                    {currentDisplayCounty.name} was among California&apos;s primary inland growth epicenters, absorbing families seeking accessible homeownership compared to skyrocketing coastal prices.
                  </p>
                ) : currentDisplayCounty.homeValue2020 > 800000 ? (
                  <p className="text-zinc-300 leading-relaxed">
                    With median home values reaching ${ (currentDisplayCounty.homeValue2020 / 1000000).toFixed(2) }M, steep affordability barriers constrained population expansion to {currentDisplayCounty.popGrowthPct.toFixed(1)}%.
                  </p>
                ) : (
                  <p className="text-zinc-300 leading-relaxed">
                    {currentDisplayCounty.name} forms part of the crucial inland corridor where median prices remained within reach throughout the 1970–2020 period.
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Spatial Math Bento Card */}
          <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6 backdrop-blur-sm">
            <h2 className="text-xs font-bold text-indigo-400 uppercase tracking-wider mb-2">
              Spatial Methodology
            </h2>
            <h4 className="text-base font-bold text-white mb-2">
              Mean Center Shift (1970–2020)
            </h4>
            <p className="text-xs text-zinc-400 leading-relaxed mb-3">
              Calculates the population-weighted coordinate vector in California Albers equal area space:
            </p>
            <div className="bg-black/50 border border-zinc-800 rounded-lg p-3 font-mono text-xs text-indigo-300 text-center mb-3">
              X̄ = &Sigma;(w_i &times; x_i) / &Sigma;w_i &nbsp;|&nbsp; Ȳ = &Sigma;(w_i &times; y_i) / &Sigma;w_i
            </div>
            <div className="space-y-2 text-xs text-zinc-400">
              <div className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-rose-500 rounded-full mt-1.5 flex-shrink-0"></span>
                <span>
                  <strong className="text-zinc-200">Baseline:</strong> Trajectory pulls southeast across Fresno and Tulare counties driven by Inland Empire growth.
                </span>
              </div>
              <div className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-amber-500 rounded-full mt-1.5 flex-shrink-0"></span>
                <span>
                  <strong className="text-zinc-200">Without LA:</strong> Shifts 1 county north (Madera), yet maintains the identical south-southeast momentum.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
