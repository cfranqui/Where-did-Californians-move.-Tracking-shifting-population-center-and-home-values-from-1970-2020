import React from 'react';
import { RESEARCH_METADATA, POSTER_SECTIONS } from '../data/researchPosterContent';
import { MEAN_CENTER_SCENARIOS } from '../data/meanCenterData';
import { CALIFORNIA_COUNTIES } from '../data/californiaData';
import { GraduationCap, Award, Compass, BookOpen, Layers, CheckCircle2 } from 'lucide-react';

export const ResearchPoster: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Bento Header Info Bar */}
      <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6 backdrop-blur-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center font-bold text-lg text-white shadow-md shadow-indigo-600/20">
            <GraduationCap className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">
                Conference Presentation
              </span>
              <span className="text-[10px] bg-zinc-800 text-zinc-300 px-2 py-0.5 rounded uppercase font-semibold">
                Interactive Edition
              </span>
            </div>
            <h2 className="text-xl font-bold tracking-tight text-white mt-0.5">
              Academic GIS Research Poster
            </h2>
          </div>
        </div>
        <div className="flex items-center gap-2 text-xs font-mono text-indigo-300 bg-indigo-950/60 px-3.5 py-1.5 rounded-full border border-indigo-500/30">
          <Award className="w-4 h-4 text-indigo-400" />
          <span>Monroe Community College (MCC) • GEG 230</span>
        </div>
      </div>

      {/* Main Bento Poster Canvas */}
      <div className="bg-zinc-950 border border-zinc-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl">
        {/* Poster Top Banner - Bento Hero */}
        <div className="bg-gradient-to-r from-zinc-900 via-zinc-900/80 to-zinc-950 border border-zinc-800 rounded-2xl p-6 sm:p-8 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none"></div>
          
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-zinc-900 border border-zinc-800 rounded-full text-xs text-zinc-400 mb-3 font-mono">
            <span>Spatial Analysis & GIS</span>
            <span>•</span>
            <span className="text-indigo-400 font-semibold">Spring 2026</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-bold text-white tracking-tight leading-tight max-w-4xl mx-auto">
            Where did Californians move? Tracking shifting population center and home values from 1970-2020
          </h1>
          <div className="mt-3 text-base font-semibold text-indigo-300">
            {RESEARCH_METADATA.author}
          </div>
          <p className="text-xs text-zinc-500 font-mono mt-0.5">
            {RESEARCH_METADATA.course} • {RESEARCH_METADATA.institution}
          </p>
        </div>

        {/* Bento 3-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Column 1: Research Question & Background */}
          <div className="space-y-6 flex flex-col">
            {/* Research Question Bento Block */}
            <div className="bg-indigo-950/30 border border-indigo-500/40 rounded-2xl p-6 flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-center mb-3">
                  <h2 className="text-xs font-bold text-indigo-400 uppercase tracking-wider">
                    Research Question
                  </h2>
                  <span className="text-[10px] bg-indigo-500/20 text-indigo-300 px-2 py-0.5 rounded uppercase font-semibold">
                    Core Inquiry
                  </span>
                </div>
                <p className="text-base sm:text-lg font-medium text-white leading-snug">
                  {RESEARCH_METADATA.researchQuestion}
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-indigo-500/20 text-xs text-indigo-300/80 font-mono">
                Variables: Population Centroid vs Median Home Value (Adjusted)
              </div>
            </div>

            {/* Background Bento Block */}
            <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6 flex-1 flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-center mb-3">
                  <h2 className="text-xs font-bold text-zinc-400 uppercase tracking-wider">
                    Background
                  </h2>
                  <span className="text-[10px] bg-zinc-800 text-zinc-400 px-2 py-0.5 rounded uppercase font-semibold">
                    Historical Context
                  </span>
                </div>
                <div className="text-xs text-zinc-300 leading-relaxed space-y-3">
                  <p>
                    For over two centuries, the American West has captured the imagination of settlers, adventurers, and scientists, drawing generations across the mighty Mississippi River to build towns, farms, and cities that fundamentally reshaped how cartographers and geographers understood the United States.
                  </p>
                  <p>
                    That westward pull hasn’t ended. California, the destination of this westward expansion, has seen similar changes reflected in its own internal migration. With the population steadily moving away from coastal urban centers toward inland areas and the Central Valley. This project examines the internal pull and the forces driving it.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Column 2: Methods & Results */}
          <div className="space-y-6 flex flex-col">
            {/* Methods Bento Block */}
            <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6">
              <div className="flex justify-between items-center mb-3">
                <h2 className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                  Methods
                </h2>
                <span className="text-[10px] bg-zinc-800 text-amber-300 px-2 py-0.5 rounded uppercase font-semibold">
                  ArcGIS Workflow
                </span>
              </div>
              <div className="text-xs text-zinc-300 leading-relaxed space-y-2.5">
                <p>
                  To collect my data, I used county population data (1970-2020) and median home values (1990, 2016-2020 ACS) from IPUMS NHGIS. This data was placed into ArcGIS, where it was joined to the 2020 TIGER/Line county boundaries.
                </p>
                <p>
                  To calculate the median home value, I obtained home value data from 1990 and 2020. The 2020 data was sourced from the American Community Survey. Similar to what I did with the population data I joined the data together to my county shapefile. In order to calculate the changes, I used Field calculator to obtain values that could be adjusted to the cost in 2020.
                </p>
                <p>
                  The map used the following projection: California Albers (EPSG 3310) to calculate the population weight center for each decade. The mean center tool was used. The point to line tool was used to connect the six points from the years 1970, 1980, 1990, 2000, 2010, 2020. I repeated these steps two more times. The second time I remitted LA County from the mean. The third time I remitted both LA County and counties in the Bay area.
                </p>
              </div>
            </div>

            {/* Results Bento Block */}
            <div className="bg-emerald-950/20 border border-emerald-500/30 rounded-2xl p-6 flex-1">
              <div className="flex justify-between items-center mb-3">
                <h2 className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                  Results
                </h2>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded uppercase font-semibold">
                  Key Findings
                </span>
              </div>
              <div className="text-xs text-zinc-200 leading-relaxed space-y-2 font-medium">
                <p>
                  My data shows that in the last fifty years California has seen its population move southeast between the decades, 1970-2020. When LA County is remitted as part of the mean, the mean center moves up a county. However it continues to gradually move south. When both LA County and Counties in The Bay Area are remitted, The mean center looks similar to how the mean would without LA County included.
                </p>
                <p>
                  Riverside and San Bernardino counties saw the largest percent of population growth. In comparison counties located along the coast, such as Los Angeles and San Francisco saw the slowest amount of growth. Home values in the Bay Area grew substantially, reaching past 1 million dollars in 2020. Home values in the Central Valley and inland California remained in comparison relatively low, even after the prices were adjusted.
                </p>
              </div>
            </div>
          </div>

          {/* Column 3: Discussion, References & Acknowledgements */}
          <div className="space-y-6 flex flex-col">
            {/* Discussion Bento Block */}
            <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6">
              <div className="flex justify-between items-center mb-3">
                <h2 className="text-xs font-bold text-purple-400 uppercase tracking-wider">
                  Discussion
                </h2>
                <span className="text-[10px] bg-zinc-800 text-purple-300 px-2 py-0.5 rounded uppercase font-semibold">
                  Synthesis
                </span>
              </div>
              <div className="text-xs text-zinc-300 leading-relaxed space-y-2.5">
                <p>
                  California’s changes regarding its population and home value in many respects are reflective of what is being seen across the country. Larger cities have an impact on the population mean center as shown when we include LA County as part of the mean center. When LA County is not included our analysis, the population mean center moves up by one county north. However it still projects movement which points south.
                </p>
                <p>
                  When the price of a home grew in value, population growth slowed. Where home prices remained relatively affordable, the population grew. We can therefore conclude that as long as the economic gap between rich and poor grows, California will continue to see a shift in its population. In the case of California, this will mean further population growth inland in places like Calaveras, Madera, and Mono.
                </p>
              </div>
            </div>

            {/* References Bento Block */}
            <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-5 text-xs">
              <h2 className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider mb-2">
                References & Data Sources
              </h2>
              <p className="text-[11px] text-zinc-400 leading-relaxed">
                <strong>Data:</strong> Decennial Census Population (1970–2020) and Median Home Values (1990 STF3 Table NH61A; 2016–2020 ACS Table B25077), accessed via IPUMS NHGIS (Manson et al., 2025; nhgis.org). <strong>Boundaries:</strong> U.S. Census Bureau TIGER/Line 2020. <strong>CPI:</strong> U.S. Bureau of Labor Statistics. <strong>Software:</strong> Esri ArcGIS Pro.
              </p>
            </div>

            {/* Acknowledgements Bento Block */}
            <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-5 text-xs flex-1">
              <h2 className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider mb-2">
                Acknowledgements
              </h2>
              <p className="text-[11px] text-zinc-400 leading-relaxed">
                Acknowledgements to Stef, Professor Pierce, Ana & David, Hoda Mitwally & William T Flynn (Queens Legal Services NYC/Queens), and Stacey Pheffer Amato. Monroe Community College.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Section: 6 Bento Map Cards */}
        <div className="pt-6 border-t border-zinc-800">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xs font-bold text-indigo-400 uppercase tracking-wider">
                Cartographic Figures
              </h2>
              <h3 className="text-xl font-bold text-white tracking-tight mt-0.5">
                Mean Centers, Population Surges & Home Values (1970–2020)
              </h3>
            </div>
            <span className="hidden sm:inline-block px-3 py-1 bg-zinc-900 border border-zinc-800 rounded-full text-xs text-zinc-400 font-mono">
              ArcGIS Spatial Statistics Toolbox
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
            {/* Map 1: Baseline Mean Center */}
            <div className="bg-zinc-900/60 rounded-2xl p-4 border border-zinc-800 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-mono font-bold text-rose-400 uppercase tracking-wider">Fig 1</span>
                <h4 className="text-xs font-bold text-white leading-tight mt-0.5">
                  Mean Center 1970–2020
                </h4>
                <p className="text-[10px] text-zinc-400 mt-1">
                  Baseline (All 58 Counties)
                </p>
              </div>
              <div className="my-3 aspect-[3/4] bg-zinc-950 rounded-xl border border-zinc-800 relative overflow-hidden flex items-center justify-center p-2">
                <svg viewBox="0 0 100 100" className="w-full h-full">
                  <path
                    d="M 12 6 L 44 8 L 41 42 L 80 72 L 88 95 L 75 97 L 62 86 L 50 82 L 40 73 L 26 55 L 20 42 L 12 18 Z"
                    fill="#18181b"
                    stroke="#3f3f46"
                    strokeWidth="1.2"
                  />
                  <polyline
                    points={MEAN_CENTER_SCENARIOS[0].points.map((p) => `${p.mapX},${p.mapY}`).join(' ')}
                    fill="none"
                    stroke="#f43f5e"
                    strokeWidth="2.2"
                  />
                  {MEAN_CENTER_SCENARIOS[0].points.map((p) => (
                    <circle key={p.year} cx={p.mapX} cy={p.mapY} r="2.6" fill="#f43f5e" stroke="#fff" strokeWidth="0.8" />
                  ))}
                </svg>
              </div>
              <span className="text-[9px] font-mono text-center text-rose-300 bg-rose-950/80 py-1 rounded-lg border border-rose-900">
                Southward Drift
              </span>
            </div>

            {/* Map 2: Without LA */}
            <div className="bg-zinc-900/60 rounded-2xl p-4 border border-zinc-800 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-mono font-bold text-amber-400 uppercase tracking-wider">Fig 2</span>
                <h4 className="text-xs font-bold text-white leading-tight mt-0.5">
                  Without Los Angeles
                </h4>
                <p className="text-[10px] text-zinc-400 mt-1">
                  Center shifts north to Madera
                </p>
              </div>
              <div className="my-3 aspect-[3/4] bg-zinc-950 rounded-xl border border-zinc-800 relative overflow-hidden flex items-center justify-center p-2">
                <svg viewBox="0 0 100 100" className="w-full h-full">
                  <path
                    d="M 12 6 L 44 8 L 41 42 L 80 72 L 88 95 L 75 97 L 62 86 L 50 82 L 40 73 L 26 55 L 20 42 L 12 18 Z"
                    fill="#18181b"
                    stroke="#3f3f46"
                    strokeWidth="1.2"
                  />
                  <circle cx="61" cy="81" r="5" fill="#4c0519" stroke="#f43f5e" strokeWidth="0.8" />
                  <polyline
                    points={MEAN_CENTER_SCENARIOS[1].points.map((p) => `${p.mapX},${p.mapY}`).join(' ')}
                    fill="none"
                    stroke="#f59e0b"
                    strokeWidth="2.2"
                  />
                  {MEAN_CENTER_SCENARIOS[1].points.map((p) => (
                    <circle key={p.year} cx={p.mapX} cy={p.mapY} r="2.6" fill="#f59e0b" stroke="#fff" strokeWidth="0.8" />
                  ))}
                </svg>
              </div>
              <span className="text-[9px] font-mono text-center text-amber-300 bg-amber-950/80 py-1 rounded-lg border border-amber-900">
                Madera Shift
              </span>
            </div>

            {/* Map 3: Without LA & Bay Area */}
            <div className="bg-zinc-900/60 rounded-2xl p-4 border border-zinc-800 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-mono font-bold text-sky-400 uppercase tracking-wider">Fig 3</span>
                <h4 className="text-xs font-bold text-white leading-tight mt-0.5">
                  Without LA & Bay Area
                </h4>
                <p className="text-[10px] text-zinc-400 mt-1">
                  Excludes metro cores
                </p>
              </div>
              <div className="my-3 aspect-[3/4] bg-zinc-950 rounded-xl border border-zinc-800 relative overflow-hidden flex items-center justify-center p-2">
                <svg viewBox="0 0 100 100" className="w-full h-full">
                  <path
                    d="M 12 6 L 44 8 L 41 42 L 80 72 L 88 95 L 75 97 L 62 86 L 50 82 L 40 73 L 26 55 L 20 42 L 12 18 Z"
                    fill="#18181b"
                    stroke="#3f3f46"
                    strokeWidth="1.2"
                  />
                  <circle cx="28" cy="48" r="6" fill="#1e1b4b" stroke="#6366f1" strokeWidth="0.8" />
                  <circle cx="61" cy="81" r="5" fill="#4c0519" stroke="#f43f5e" strokeWidth="0.8" />
                  <polyline
                    points={MEAN_CENTER_SCENARIOS[2].points.map((p) => `${p.mapX},${p.mapY}`).join(' ')}
                    fill="none"
                    stroke="#0284c7"
                    strokeWidth="2.2"
                  />
                  {MEAN_CENTER_SCENARIOS[2].points.map((p) => (
                    <circle key={p.year} cx={p.mapX} cy={p.mapY} r="2.6" fill="#0284c7" stroke="#fff" strokeWidth="0.8" />
                  ))}
                </svg>
              </div>
              <span className="text-[9px] font-mono text-center text-sky-300 bg-sky-950/80 py-1 rounded-lg border border-sky-900">
                Inland Pull
              </span>
            </div>

            {/* Map 4: Pop Change 1970-2020 */}
            <div className="bg-zinc-900/60 rounded-2xl p-4 border border-zinc-800 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-mono font-bold text-emerald-400 uppercase tracking-wider">Fig 4</span>
                <h4 className="text-xs font-bold text-white leading-tight mt-0.5">
                  Pop Change 1970–2020
                </h4>
                <p className="text-[10px] text-zinc-400 mt-1">
                  County % Growth
                </p>
              </div>
              <div className="my-3 aspect-[3/4] bg-zinc-950 rounded-xl border border-zinc-800 relative overflow-hidden flex items-center justify-center p-2">
                <svg viewBox="0 0 100 100" className="w-full h-full">
                  <path
                    d="M 12 6 L 44 8 L 41 42 L 80 72 L 88 95 L 75 97 L 62 86 L 50 82 L 40 73 L 26 55 L 20 42 L 12 18 Z"
                    fill="#18181b"
                    stroke="#3f3f46"
                    strokeWidth="1.2"
                  />
                  {CALIFORNIA_COUNTIES.map((c) => {
                    let fill = '#064e3b';
                    if (c.popGrowthPct > 300) fill = '#6ee7b7';
                    else if (c.popGrowthPct > 200) fill = '#34d399';
                    else if (c.popGrowthPct > 100) fill = '#10b981';
                    else if (c.popGrowthPct > 50) fill = '#047857';
                    return <circle key={c.id} cx={c.mapX} cy={c.mapY} r="3" fill={fill} stroke="#27272a" strokeWidth="0.3" />;
                  })}
                </svg>
              </div>
              <span className="text-[9px] font-mono text-center text-emerald-300 bg-emerald-950/80 py-1 rounded-lg border border-emerald-900">
                Riverside (+426%)
              </span>
            </div>

            {/* Map 5: 1990 Home Values */}
            <div className="bg-zinc-900/60 rounded-2xl p-4 border border-zinc-800 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-mono font-bold text-indigo-400 uppercase tracking-wider">Fig 5</span>
                <h4 className="text-xs font-bold text-white leading-tight mt-0.5">
                  1990 Home (2020 $)
                </h4>
                <p className="text-[10px] text-zinc-400 mt-1">
                  Adjusted by BLS CPI
                </p>
              </div>
              <div className="my-3 aspect-[3/4] bg-zinc-950 rounded-xl border border-zinc-800 relative overflow-hidden flex items-center justify-center p-2">
                <svg viewBox="0 0 100 100" className="w-full h-full">
                  <path
                    d="M 12 6 L 44 8 L 41 42 L 80 72 L 88 95 L 75 97 L 62 86 L 50 82 L 40 73 L 26 55 L 20 42 L 12 18 Z"
                    fill="#18181b"
                    stroke="#3f3f46"
                    strokeWidth="1.2"
                  />
                  {CALIFORNIA_COUNTIES.map((c) => {
                    let fill = '#1e1b4b';
                    if (c.homeValue1990Adj2020 > 700000) fill = '#818cf8';
                    else if (c.homeValue1990Adj2020 > 400000) fill = '#6366f1';
                    else if (c.homeValue1990Adj2020 > 200000) fill = '#3730a3';
                    return <circle key={c.id} cx={c.mapX} cy={c.mapY} r="3" fill={fill} stroke="#27272a" strokeWidth="0.3" />;
                  })}
                </svg>
              </div>
              <span className="text-[9px] font-mono text-center text-indigo-300 bg-indigo-950/80 py-1 rounded-lg border border-indigo-900">
                1990 Adjusted
              </span>
            </div>

            {/* Map 6: 2020 Home Values */}
            <div className="bg-zinc-900/60 rounded-2xl p-4 border border-zinc-800 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-mono font-bold text-purple-400 uppercase tracking-wider">Fig 6</span>
                <h4 className="text-xs font-bold text-white leading-tight mt-0.5">
                  2020 Home Values
                </h4>
                <p className="text-[10px] text-zinc-400 mt-1">
                  Bay Area reaches &gt; $1M
                </p>
              </div>
              <div className="my-3 aspect-[3/4] bg-zinc-950 rounded-xl border border-zinc-800 relative overflow-hidden flex items-center justify-center p-2">
                <svg viewBox="0 0 100 100" className="w-full h-full">
                  <path
                    d="M 12 6 L 44 8 L 41 42 L 80 72 L 88 95 L 75 97 L 62 86 L 50 82 L 40 73 L 26 55 L 20 42 L 12 18 Z"
                    fill="#18181b"
                    stroke="#3f3f46"
                    strokeWidth="1.2"
                  />
                  {CALIFORNIA_COUNTIES.map((c) => {
                    let fill = '#1e1b4b';
                    if (c.homeValue2020 >= 1000000) fill = '#c7d2fe';
                    else if (c.homeValue2020 > 700000) fill = '#818cf8';
                    else if (c.homeValue2020 > 400000) fill = '#6366f1';
                    else if (c.homeValue2020 > 200000) fill = '#3730a3';
                    return <circle key={c.id} cx={c.mapX} cy={c.mapY} r="3" fill={fill} stroke="#27272a" strokeWidth="0.3" />;
                  })}
                </svg>
              </div>
              <span className="text-[9px] font-mono text-center text-purple-300 bg-purple-950/80 py-1 rounded-lg border border-purple-900">
                Bay Area &gt; $1.0M
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
