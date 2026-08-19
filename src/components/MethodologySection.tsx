import React from 'react';
import { Layers, Database, Calculator, Compass, Cpu, CheckCircle2, ArrowRight } from 'lucide-react';

export const MethodologySection: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Bento Header Banner */}
      <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6 backdrop-blur-sm">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">
            Technical Workflow & Cartography
          </span>
          <span className="text-[10px] bg-zinc-800 text-zinc-300 px-2 py-0.5 rounded uppercase font-semibold">
            Esri ArcGIS Pro
          </span>
        </div>
        <h2 className="text-2xl font-bold tracking-tight text-white">
          GIS Methodology & Spatial Statistics
        </h2>
        <p className="text-xs text-zinc-400 mt-1 max-w-3xl leading-relaxed">
          A step-by-step breakdown of how decennial census tabular data, ACS microdata, and TIGER/Line boundary shapefiles were ingested into Esri ArcGIS Pro, reprojected to EPSG:3310 California Albers, normalized for inflation, and analyzed using spatial mean center algorithms.
        </p>
      </div>

      {/* 4 Pillars in a Bento 2x2 Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Pillar 1: Projection & Coordinate Reference System */}
        <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6 backdrop-blur-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400">
                <Compass className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-amber-400">Pillar 1</span>
                <h3 className="text-base font-bold text-white">California Albers Projection (EPSG:3310)</h3>
              </div>
            </div>
            <p className="text-xs text-zinc-300 leading-relaxed mb-4">
              Calculating geographic mean centers on unprojected geographic coordinates (latitude/longitude in degrees) introduces severe spatial distortion due to the curvature of the Earth and converging meridians. To ensure equal area preservation across California&apos;s 1,040 km north-south expanse:
            </p>
          </div>
          <div className="bg-black/50 border border-zinc-800 p-4 rounded-xl text-xs font-mono text-zinc-300 space-y-1">
            <div className="text-amber-400 font-bold">// Projection Definition (EPSG:3310)</div>
            <div>PROJCS[&quot;NAD_1983_California_Albers&quot;,</div>
            <div className="pl-4 text-zinc-400">GEOGCS[&quot;GCS_North_American_1983&quot;],</div>
            <div className="pl-4 text-zinc-400">STANDARD_PARALLEL_1[34.0],</div>
            <div className="pl-4 text-zinc-400">STANDARD_PARALLEL_2[40.5],</div>
            <div className="pl-4 text-zinc-400">CENTRAL_MERIDIAN[-120.0],</div>
            <div className="pl-4 text-zinc-400">FALSE_EASTING[0.0], FALSE_NORTHING[-4000000.0],</div>
            <div className="pl-4 text-emerald-400">UNIT[&quot;Meter&quot;, 1.0]]</div>
          </div>
        </div>

        {/* Pillar 2: Mean Center Spatial Algorithm */}
        <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6 backdrop-blur-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                <Calculator className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-400">Pillar 2</span>
                <h3 className="text-base font-bold text-white">Weighted Mean Center Formulation</h3>
              </div>
            </div>
            <p className="text-xs text-zinc-300 leading-relaxed mb-3">
              The ArcGIS Pro <em>Spatial Statistics &gt; Measuring Geographic Distributions &gt; Mean Center</em> tool computes the population-weighted centroid coordinates for each decennial census interval (1970, 1980, 1990, 2000, 2010, 2020):
            </p>
          </div>
          <div className="bg-black/50 border border-zinc-800 p-4 rounded-xl text-center font-mono my-2">
            <div className="text-sm font-bold text-emerald-300 mb-1">
              X̄ = &Sigma;(w_i &times; x_i) / &Sigma;w_i &nbsp;&nbsp;&nbsp;&nbsp; Ȳ = &Sigma;(w_i &times; y_i) / &Sigma;w_i
            </div>
            <p className="text-[11px] text-zinc-400 font-sans mt-2">
              Where w_i represents county i&apos;s decennial population count, and (x_i, y_i) denotes the projected polygon centroid coordinates in meters.
            </p>
          </div>
          <p className="text-xs text-zinc-400 mt-2">
            Points are subsequently linked into continuous temporal trajectories using the <strong>Points To Line</strong> tool in ArcGIS.
          </p>
        </div>

        {/* Pillar 3: Data Ingestion & TIGER Join */}
        <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6 backdrop-blur-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-sky-500/20 border border-sky-500/30 flex items-center justify-center text-sky-400">
                <Database className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-sky-400">Pillar 3</span>
                <h3 className="text-base font-bold text-white">Data Acquisition & Table Joining</h3>
              </div>
            </div>
            <div className="space-y-3 text-xs text-zinc-300">
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-sky-400 flex-shrink-0 mt-0.5" />
                <span>
                  <strong className="text-white">IPUMS NHGIS Extraction:</strong> Extracted decennial population tallies (1970–2020) and 1990 STF3 Summary Table NH61A (Specified Owner-Occupied Housing Units).
                </span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-sky-400 flex-shrink-0 mt-0.5" />
                <span>
                  <strong className="text-white">2016–2020 ACS 5-Year (Table B25077):</strong> Extracted 2020 median home values for all 58 county geographic units.
                </span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-sky-400 flex-shrink-0 mt-0.5" />
                <span>
                  <strong className="text-white">Spatial Join:</strong> Joined tabular attributes to U.S. Census 2020 TIGER/Line Cartographic Boundary shapefiles via 5-digit county FIPS codes (<code className="text-[11px] bg-zinc-800 text-sky-300 px-1 py-0.5 rounded">06001</code> to <code className="text-[11px] bg-zinc-800 text-sky-300 px-1 py-0.5 rounded">06115</code>).
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Pillar 4: Inflation Normalization */}
        <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6 backdrop-blur-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
                <Cpu className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-indigo-400">Pillar 4</span>
                <h3 className="text-base font-bold text-white">BLS CPI Inflation Adjustment</h3>
              </div>
            </div>
            <p className="text-xs text-zinc-300 leading-relaxed mb-3">
              To enable legitimate apples-to-apples comparison between 1990 and 2020 housing prices, nominal 1990 values were converted to constant 2020 dollars in ArcGIS using the <strong>Field Calculator</strong>:
            </p>
          </div>
          <div className="bg-black/50 border border-zinc-800 p-4 rounded-xl text-xs font-mono text-zinc-300 space-y-1.5">
            <div className="text-zinc-500">// ArcGIS Field Calculator Expression</div>
            <div>Value_Adj_2020 = Value_1990 * (CPI_2020 / CPI_1990)</div>
            <div className="text-indigo-400 font-bold">Value_Adj_2020 = Value_1990 * (258.81 / 130.7) &asymp; Value_1990 * 2.023</div>
          </div>
          <p className="text-xs text-zinc-400 mt-3">
            Both 1990 (adjusted) and 2020 home value maps were rendered using identical graduated color classifications (&lt;$200k, $200k–$400k, $400k–$700k, $700k–$1M, &gt;$1M) to expose real purchasing power divergence.
          </p>
        </div>
      </div>
    </div>
  );
};
