import React, { useState } from 'react';
import { MEAN_CENTER_SCENARIOS, MeanCenterPoint } from '../data/meanCenterData';
import { Compass, MapPin, Layers, ArrowUpRight, Check, Sparkles } from 'lucide-react';

export const MeanCenterVisualizer: React.FC = () => {
  const [selectedScenarioId, setSelectedScenarioId] = useState<string>('baseline');
  const [hoveredPoint, setHoveredPoint] = useState<MeanCenterPoint | null>(null);

  const currentScenario =
    MEAN_CENTER_SCENARIOS.find((s) => s.id === selectedScenarioId) || MEAN_CENTER_SCENARIOS[0];

  return (
    <div className="space-y-6">
      {/* Bento Header */}
      <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6 backdrop-blur-sm flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">
              Spatial Statistics Visualizer
            </span>
            <span className="text-[10px] bg-zinc-800 text-zinc-300 px-2 py-0.5 rounded uppercase font-semibold">
              ArcGIS Pro Mean Center
            </span>
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-white">
            California Population Mean Center Trajectories (1970–2020)
          </h2>
          <p className="text-xs text-zinc-400 mt-1">
            Examine the coordinates and directional drift of California&apos;s geographic center of population across three experimental configurations.
          </p>
        </div>

        {/* Scenario Selector Bento Pills */}
        <div className="flex flex-wrap gap-2">
          {MEAN_CENTER_SCENARIOS.map((scen) => {
            const isSelected = selectedScenarioId === scen.id;
            return (
              <button
                key={scen.id}
                id={`btn-scenario-${scen.id}`}
                onClick={() => setSelectedScenarioId(scen.id)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold border transition-all duration-150 flex items-center gap-2 ${
                  isSelected
                    ? 'bg-zinc-900 border-indigo-500/50 text-indigo-300 shadow-sm ring-1 ring-indigo-500/20'
                    : 'bg-zinc-950/60 border-zinc-800 text-zinc-400 hover:text-zinc-200 hover:border-zinc-700'
                }`}
              >
                <span
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ backgroundColor: scen.color }}
                ></span>
                <span>{scen.title}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Bento 2-Column Layout: Visual Map (7 cols) + Coordinate Inspector (5 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Visual Map Box */}
        <div className="lg:col-span-7 bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6 backdrop-blur-sm flex flex-col">
          <div className="flex items-center justify-between border-b border-zinc-800 pb-3 mb-4">
            <div>
              <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">
                Trajectory Vector Canvas
              </span>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <span>{currentScenario.title}</span>
                <span
                  className="px-2 py-0.5 rounded-full text-[10px] font-bold"
                  style={{
                    backgroundColor: `${currentScenario.color}20`,
                    color: currentScenario.color,
                    borderColor: `${currentScenario.color}40`,
                    borderWidth: '1px',
                  }}
                >
                  South-Southeast Vector
                </span>
              </h3>
            </div>
            <span className="text-xs font-mono text-zinc-400">
              Fresno / Madera / Tulare
            </span>
          </div>

          {/* SVG Canvas for Trajectory */}
          <div className="relative aspect-[4/5] bg-zinc-950 rounded-xl border border-zinc-800/80 p-4 overflow-hidden flex items-center justify-center">
            {/* Grid Pattern */}
            <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#6366f1_1px,transparent_1px)] [background-size:18px_18px] pointer-events-none"></div>

            <svg viewBox="0 0 100 100" className="w-full h-full max-h-[520px]">
              {/* California Outline */}
              <path
                d="M 12 6 L 44 8 L 41 42 L 80 72 L 88 95 L 75 97 L 62 86 L 50 82 L 40 73 L 26 55 L 20 42 L 12 18 Z"
                fill="#18181b"
                stroke="#3f3f46"
                strokeWidth="1.2"
              />

              {/* Remitted Area Indicators */}
              {currentScenario.id.includes('without_la') && (
                <circle cx="61" cy="81" r="7" fill="#4c0519" stroke="#f43f5e" strokeWidth="0.8" opacity="0.8" />
              )}
              {currentScenario.id === 'without_la_and_bay' && (
                <circle cx="28" cy="48" r="8" fill="#1e1b4b" stroke="#6366f1" strokeWidth="0.8" opacity="0.8" />
              )}

              {/* Ghost Paths of other scenarios */}
              {MEAN_CENTER_SCENARIOS.map((scen) => {
                if (scen.id === currentScenario.id) return null;
                return (
                  <polyline
                    key={scen.id}
                    points={scen.points.map((p) => `${p.mapX},${p.mapY}`).join(' ')}
                    fill="none"
                    stroke={scen.color}
                    strokeWidth="1"
                    opacity="0.3"
                    strokeDasharray="1.5,1.5"
                  />
                );
              })}

              {/* Active Trajectory Polyline */}
              <polyline
                points={currentScenario.points.map((p) => `${p.mapX},${p.mapY}`).join(' ')}
                fill="none"
                stroke={currentScenario.color}
                strokeWidth="2.4"
              />

              {/* Decennial Mean Center Points */}
              {currentScenario.points.map((pt) => {
                const isHovered = hoveredPoint?.year === pt.year;
                return (
                  <g
                    key={pt.year}
                    onMouseEnter={() => setHoveredPoint(pt)}
                    onMouseLeave={() => setHoveredPoint(null)}
                    className="cursor-pointer"
                  >
                    <circle
                      cx={pt.mapX}
                      cy={pt.mapY}
                      r={isHovered ? 3.5 : 2.5}
                      fill={currentScenario.color}
                      stroke="#ffffff"
                      strokeWidth={isHovered ? 1.4 : 0.8}
                      className="transition-all duration-200"
                    />
                    <rect
                      x={pt.mapX + 2.6}
                      y={pt.mapY - 2.0}
                      width="9.0"
                      height="4.0"
                      rx="0.8"
                      fill="#09090b"
                      stroke="#27272a"
                      strokeWidth="0.4"
                    />
                    <text
                      x={pt.mapX + 7.1}
                      y={pt.mapY + 0.8}
                      textAnchor="middle"
                      fontSize="2.1"
                      fill="#ffffff"
                      fontWeight="bold"
                    >
                      {pt.year}
                    </text>
                  </g>
                );
              })}
            </svg>

            {/* Hovered Decade Callout */}
            {hoveredPoint && (
              <div className="absolute top-4 left-4 bg-zinc-900/95 backdrop-blur-md p-3 rounded-xl border border-zinc-800 text-xs shadow-xl space-y-1">
                <div className="font-bold text-white flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: currentScenario.color }}></span>
                  <span>Census Decade: {hoveredPoint.year}</span>
                </div>
                <div className="text-[11px] text-zinc-400 font-mono">
                  Location: {hoveredPoint.county} County
                </div>
                <div className="text-[11px] text-zinc-400 font-mono">
                  Albers: ({hoveredPoint.albersX.toLocaleString()} m, {hoveredPoint.albersY.toLocaleString()} m)
                </div>
                <div className="text-[11px] text-zinc-400 font-mono">
                  WGS84: {hoveredPoint.lat.toFixed(4)}° N, {Math.abs(hoveredPoint.lng).toFixed(4)}° W
                </div>
              </div>
            )}
          </div>

          <p className="text-xs text-zinc-400 mt-4 leading-relaxed">
            {currentScenario.description}
          </p>
        </div>

        {/* Right Coordinate Inspector Bento Card */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6 backdrop-blur-sm">
            <h2 className="text-xs font-bold text-indigo-400 uppercase tracking-wider mb-2">
              Coordinate Matrix
            </h2>
            <h3 className="text-base font-bold text-white mb-4">
              EPSG:3310 & Geographic Positions
            </h3>

            {/* Table of Decennial Points */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-zinc-800 text-zinc-400 font-mono">
                    <th className="py-2 px-3 font-semibold">Decade</th>
                    <th className="py-2 px-3 font-semibold">County</th>
                    <th className="py-2 px-3 font-semibold">Albers (X, Y)</th>
                    <th className="py-2 px-3 font-semibold">Lat / Long</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800/60 font-mono">
                  {currentScenario.points.map((pt) => {
                    const isHovered = hoveredPoint?.year === pt.year;
                    return (
                      <tr
                        key={pt.year}
                        onMouseEnter={() => setHoveredPoint(pt)}
                        onMouseLeave={() => setHoveredPoint(null)}
                        className={`transition-colors duration-150 cursor-pointer ${
                          isHovered ? 'bg-zinc-800/80 text-white' : 'hover:bg-zinc-900 text-zinc-300'
                        }`}
                      >
                        <td className="py-2.5 px-3 font-bold text-indigo-400">{pt.year}</td>
                        <td className="py-2.5 px-3 text-zinc-200">{pt.county}</td>
                        <td className="py-2.5 px-3 text-zinc-400 text-[11px]">
                          {pt.albersX.toLocaleString()}, {pt.albersY.toLocaleString()}
                        </td>
                        <td className="py-2.5 px-3 text-zinc-400 text-[11px]">
                          {pt.lat.toFixed(2)}°, {pt.lng.toFixed(2)}°
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Research Insight Card */}
          <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6 backdrop-blur-sm">
            <h2 className="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-2">
              Cartographic Insight
            </h2>
            <h4 className="text-sm font-bold text-white mb-2">
              Why the vector maintains a south-southeast trajectory
            </h4>
            <p className="text-xs text-zinc-300 leading-relaxed mb-3">
              Even after removing Los Angeles County (the largest population hub with &gt;10 million people), the state mean center continues to march south-southeast across decades.
            </p>
            <div className="p-3 bg-zinc-950/60 border border-zinc-800 rounded-xl text-xs text-zinc-400 space-y-1.5">
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>
                  <strong className="text-zinc-200">Inland Empire:</strong> Riverside (+426.7%) and San Bernardino (+218.9%) created a massive southern gravitational pull.
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>
                  <strong className="text-zinc-200">Central Valley:</strong> Madera (+276.3%) and San Joaquin (+263.2%) pulled the northern center southward.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
