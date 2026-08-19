import React from 'react';
import { CALIFORNIA_COUNTIES } from '../data/californiaData';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import { TrendingUp, DollarSign, Home, AlertCircle, Sparkles, Building } from 'lucide-react';

export const DiscussionInsights: React.FC = () => {
  // Top 8 Fastest Growing Counties
  const topGrowthCounties = [...CALIFORNIA_COUNTIES]
    .sort((a, b) => b.popGrowthPct - a.popGrowthPct)
    .slice(0, 8);

  // Top 8 Slowest Growing Counties (Coastal / Far North)
  const slowestGrowthCounties = [...CALIFORNIA_COUNTIES]
    .sort((a, b) => a.popGrowthPct - b.popGrowthPct)
    .slice(0, 8);

  return (
    <div className="space-y-6">
      {/* Bento Header Banner */}
      <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6 backdrop-blur-sm">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">
            Spatial Synthesis & Economic Geography
          </span>
          <span className="text-[10px] bg-zinc-800 text-zinc-300 px-2 py-0.5 rounded uppercase font-semibold">
            Empirical Results
          </span>
        </div>
        <h2 className="text-2xl font-bold tracking-tight text-white">
          Research Discussion & Analytical Insights
        </h2>
        <p className="text-xs text-zinc-400 mt-1 max-w-3xl leading-relaxed">
          An examination of the inverse relationship between home price appreciation and decennial population growth in California from 1970 to 2020.
        </p>
      </div>

      {/* Synthesis Metric Highlights in Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Metric 1 */}
        <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6 backdrop-blur-sm flex flex-col justify-between">
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 uppercase tracking-wider mb-2">
            <TrendingUp className="w-4 h-4" />
            <span>Inland Empire Boom</span>
          </div>
          <div className="text-3xl font-bold tracking-tight text-white mb-2 font-mono">
            +426.7%
          </div>
          <p className="text-xs text-zinc-400 leading-relaxed">
            Riverside County expanded from 459k residents in 1970 to over 2.41 million in 2020, anchoring the southeast pull.
          </p>
        </div>

        {/* Metric 2 */}
        <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6 backdrop-blur-sm flex flex-col justify-between">
          <div className="flex items-center gap-2 text-xs font-bold text-rose-400 uppercase tracking-wider mb-2">
            <Building className="w-4 h-4" />
            <span>Coastal Growth Slowdown</span>
          </div>
          <div className="text-3xl font-bold tracking-tight text-white mb-2 font-mono">
            +22.1%
          </div>
          <p className="text-xs text-zinc-400 leading-relaxed">
            San Francisco recorded California&apos;s lowest urban growth rate (22.1%), accompanied by median home values exceeding $1.19M.
          </p>
        </div>

        {/* Metric 3 */}
        <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6 backdrop-blur-sm flex flex-col justify-between">
          <div className="flex items-center gap-2 text-xs font-bold text-indigo-400 uppercase tracking-wider mb-2">
            <Home className="w-4 h-4" />
            <span>Affordability Premium</span>
          </div>
          <div className="text-3xl font-bold tracking-tight text-white mb-2 font-mono">
            $275k vs $1.25M
          </div>
          <p className="text-xs text-zinc-400 leading-relaxed">
            Central Valley 2020 median home prices (Fresno, Kern) remained nearly 5x more affordable than Silicon Valley (Santa Clara).
          </p>
        </div>
      </div>

      {/* Bento 2-Column Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Chart 1: Fastest Growing Counties */}
        <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6 backdrop-blur-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-bold text-white">
                Top 8 Fastest Growing Counties (% Population Surge)
              </h3>
              <p className="text-xs text-zinc-400">1970 to 2020 Decennial Census Growth</p>
            </div>
            <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-950/80 text-emerald-300 border border-emerald-800">
              Inland & Foothills
            </span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={topGrowthCounties} layout="vertical" margin={{ left: 20, right: 20 }}>
                <XAxis type="number" unit="%" tick={{ fontSize: 11, fill: '#a1a1aa' }} />
                <YAxis dataKey="name" type="category" tick={{ fontSize: 11, fill: '#e4e4e7' }} width={80} />
                <Tooltip
                  formatter={(val: any) => [`+${val.toFixed(1)}%`, 'Population Growth']}
                  contentStyle={{ backgroundColor: '#09090b', borderColor: '#27272a', color: '#fff', borderRadius: '12px', fontSize: '12px' }}
                />
                <Bar dataKey="popGrowthPct" fill="#10b981" radius={[0, 6, 6, 0]}>
                  {topGrowthCounties.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={index === 0 ? '#34d399' : '#10b981'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <p className="text-[11px] text-zinc-500 mt-2 text-center font-mono">
            Highest percentage surges occurred inland: Riverside, Placer, Nevada, Madera, Calaveras.
          </p>
        </div>

        {/* Chart 2: Slowest Growing Counties */}
        <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6 backdrop-blur-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-bold text-white">
                Slowest Growing Counties (% Population Change)
              </h3>
              <p className="text-xs text-zinc-400">Constrained by steep real estate prices or remote geography</p>
            </div>
            <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-rose-950/80 text-rose-300 border border-rose-800">
              Coastal Cores & Far North
            </span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={slowestGrowthCounties} layout="vertical" margin={{ left: 20, right: 20 }}>
                <XAxis type="number" unit="%" tick={{ fontSize: 11, fill: '#a1a1aa' }} />
                <YAxis dataKey="name" type="category" tick={{ fontSize: 11, fill: '#e4e4e7' }} width={85} />
                <Tooltip
                  formatter={(val: any) => [`+${val.toFixed(1)}%`, 'Population Growth']}
                  contentStyle={{ backgroundColor: '#09090b', borderColor: '#27272a', color: '#fff', borderRadius: '12px', fontSize: '12px' }}
                />
                <Bar dataKey="popGrowthPct" fill="#f43f5e" radius={[0, 6, 6, 0]}>
                  {slowestGrowthCounties.map((entry, index) => (
                    <Cell key={`cell-slow-${index}`} fill={entry.region === 'Bay Area' ? '#e11d48' : '#fb7185'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <p className="text-[11px] text-zinc-500 mt-2 text-center font-mono">
            Dense coastal hubs (San Francisco, Marin, Los Angeles) experienced the slowest population growth rates.
          </p>
        </div>
      </div>

      {/* Narrative Conclusions Bento Block */}
      <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6 backdrop-blur-sm">
        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-indigo-400" />
          <span>Core Conclusions & Future Trajectory</span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-zinc-300 leading-relaxed">
          <div className="space-y-3">
            <div className="p-4 bg-zinc-950/60 rounded-xl border border-zinc-800">
              <strong className="text-white block mb-1">1. The Pull of Affordable Housing:</strong>
              Across the 50-year study window (1970–2020), spatial statistics reveal that California&apos;s population center did not move randomly; it was methodically pulled toward regions offering accessible homeownership.
            </div>
            <div className="p-4 bg-zinc-950/60 rounded-xl border border-zinc-800">
              <strong className="text-white block mb-1">2. Los Angeles and the Mean Center:</strong>
              While Los Angeles remains the nation&apos;s most populous single county (&gt;10 million residents), its rate of growth slowed relative to its inland neighbors. Remitting Los Angeles shifts the mean center north to Madera County, yet both scenarios project the exact same southeast vector.
            </div>
          </div>
          <div className="space-y-3">
            <div className="p-4 bg-zinc-950/60 rounded-xl border border-zinc-800">
              <strong className="text-white block mb-1">3. The Coastal-Inland Housing Divide:</strong>
              By 2020, median home values in San Francisco ($1.19M), San Mateo ($1.22M), and Santa Clara ($1.25M) surged past $1,000,000, creating an insurmountable barrier for prospective first-time homeowners.
            </div>
            <div className="p-4 bg-zinc-950/60 rounded-xl border border-zinc-800">
              <strong className="text-white block mb-1">4. Outlook for Inland California:</strong>
              As the economic divide between coastal high earners and the broader workforce persists, inland foothill and valley counties (Calaveras, Madera, Stanislaus, San Joaquin, and Mono) will continue to experience heightened development pressure and inward migration.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
