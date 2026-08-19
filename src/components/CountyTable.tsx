import React, { useState, useMemo } from 'react';
import { CALIFORNIA_COUNTIES, CountyData } from '../data/californiaData';
import { Search, Download, ArrowUpDown, ChevronUp, ChevronDown, Filter, Database, Check } from 'lucide-react';

export const CountyTable: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedRegion, setSelectedRegion] = useState<string>('all');
  const [sortField, setSortField] = useState<keyof CountyData>('popGrowthPct');
  const [sortAsc, setSortAsc] = useState<boolean>(false);
  const [downloaded, setDownloaded] = useState<boolean>(false);

  // Region options
  const regions = useMemo(() => {
    const set = new Set(CALIFORNIA_COUNTIES.map((c) => c.region));
    return ['all', ...Array.from(set)];
  }, []);

  // Filter and sort
  const filteredCounties = useMemo(() => {
    return CALIFORNIA_COUNTIES.filter((county) => {
      const matchesSearch =
        county.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        county.fips.includes(searchTerm);
      const matchesRegion = selectedRegion === 'all' || county.region === selectedRegion;
      return matchesSearch && matchesRegion;
    }).sort((a, b) => {
      const aVal = a[sortField];
      const bVal = b[sortField];
      if (typeof aVal === 'number' && typeof bVal === 'number') {
        return sortAsc ? aVal - bVal : bVal - aVal;
      }
      return sortAsc
        ? String(aVal).localeCompare(String(bVal))
        : String(bVal).localeCompare(String(aVal));
    });
  }, [searchTerm, selectedRegion, sortField, sortAsc]);

  const handleSort = (field: keyof CountyData) => {
    if (sortField === field) {
      setSortAsc(!sortAsc);
    } else {
      setSortField(field);
      setSortAsc(false);
    }
  };

  const exportCSV = () => {
    const headers = [
      'County FIPS',
      'County Name',
      'Region',
      '1970 Population',
      '1980 Population',
      '1990 Population',
      '2000 Population',
      '2010 Population',
      '2020 Population',
      '50-Yr Pop Growth (%)',
      '1990 Median Home (Nominal $)',
      '1990 Median Home (2020 $ Adj)',
      '2020 Median Home ($)',
      'Real Home Price Growth (%)',
    ];

    const rows = CALIFORNIA_COUNTIES.map((c) => [
      c.fips,
      c.name,
      `"${c.region}"`,
      c.pop1970,
      c.pop1980,
      c.pop1990,
      c.pop2000,
      c.pop2010,
      c.pop2020,
      c.popGrowthPct.toFixed(2),
      c.homeValue1990Raw,
      c.homeValue1990Adj2020,
      c.homeValue2020,
      c.homeValueGrowthPct.toFixed(2),
    ]);

    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'california_population_and_housing_1970_2020.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 2500);
  };

  return (
    <div className="space-y-6">
      {/* Bento Header Bar */}
      <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6 backdrop-blur-sm flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">
              IPUMS NHGIS & Decennial Census
            </span>
            <span className="text-[10px] bg-zinc-800 text-zinc-300 px-2 py-0.5 rounded uppercase font-semibold">
              58 Counties
            </span>
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-white">
            California 58-County Population & Housing Database
          </h2>
          <p className="text-xs text-zinc-400 mt-1">
            Decennial population counts (1970–2020) and inflation-adjusted median home value changes.
          </p>
        </div>

        <button
          id="export-csv-btn"
          onClick={exportCSV}
          className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-full text-xs font-semibold shadow-md shadow-indigo-600/20 border border-indigo-500/30 transition duration-150"
        >
          {downloaded ? (
            <>
              <Check className="w-4 h-4 text-white" />
              <span>Downloaded CSV!</span>
            </>
          ) : (
            <>
              <Download className="w-4 h-4" />
              <span>Export Full CSV Dataset</span>
            </>
          )}
        </button>
      </div>

      {/* Filter and Search Bento Controls */}
      <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-4 backdrop-blur-sm grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
        {/* Search Input */}
        <div className="sm:col-span-6 relative">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400" />
          <input
            id="county-search-input"
            type="text"
            placeholder="Search by county name or FIPS code..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-zinc-950/80 border border-zinc-800 rounded-xl text-xs text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
          />
        </div>

        {/* Region Filter */}
        <div className="sm:col-span-4 relative">
          <Filter className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none" />
          <select
            id="county-region-select"
            aria-label="Filter Counties by Region"
            value={selectedRegion}
            onChange={(e) => setSelectedRegion(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-zinc-950/80 border border-zinc-800 rounded-xl text-xs text-zinc-100 focus:outline-none focus:ring-1 focus:ring-indigo-500 appearance-none"
          >
            {regions.map((reg) => (
              <option key={reg} value={reg}>
                {reg === 'all' ? 'All Geographic Regions' : reg}
              </option>
            ))}
          </select>
        </div>

        {/* Counter Pill */}
        <div className="sm:col-span-2 text-right">
          <span className="inline-block px-3 py-1 bg-zinc-900 border border-zinc-800 rounded-full text-xs text-zinc-400 font-mono">
            {filteredCounties.length} of 58
          </span>
        </div>
      </div>

      {/* Bento Table Container */}
      <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl overflow-hidden backdrop-blur-sm shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-zinc-950/80 border-b border-zinc-800 text-zinc-400 font-mono select-none">
                <th
                  onClick={() => handleSort('name')}
                  className="py-3 px-4 font-semibold cursor-pointer hover:text-white"
                >
                  <div className="flex items-center gap-1.5">
                    <span>County</span>
                    <ArrowUpDown className="w-3 h-3 text-zinc-500" />
                  </div>
                </th>
                <th
                  onClick={() => handleSort('region')}
                  className="py-3 px-4 font-semibold cursor-pointer hover:text-white"
                >
                  Region
                </th>
                <th
                  onClick={() => handleSort('pop1970')}
                  className="py-3 px-4 font-semibold text-right cursor-pointer hover:text-white"
                >
                  1970 Pop
                </th>
                <th
                  onClick={() => handleSort('pop2020')}
                  className="py-3 px-4 font-semibold text-right cursor-pointer hover:text-white"
                >
                  2020 Pop
                </th>
                <th
                  onClick={() => handleSort('popGrowthPct')}
                  className="py-3 px-4 font-semibold text-right cursor-pointer hover:text-white"
                >
                  50-Yr Pop Growth
                </th>
                <th
                  onClick={() => handleSort('homeValue1990Adj2020')}
                  className="py-3 px-4 font-semibold text-right cursor-pointer hover:text-white"
                >
                  1990 Home (2020 $)
                </th>
                <th
                  onClick={() => handleSort('homeValue2020')}
                  className="py-3 px-4 font-semibold text-right cursor-pointer hover:text-white"
                >
                  2020 Home Value
                </th>
                <th
                  onClick={() => handleSort('homeValueGrowthPct')}
                  className="py-3 px-4 font-semibold text-right cursor-pointer hover:text-white"
                >
                  Real Value Gain
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/60 font-mono">
              {filteredCounties.map((c) => (
                <tr
                  key={c.id}
                  className="hover:bg-zinc-900/60 transition-colors duration-150 text-zinc-300"
                >
                  <td className="py-3 px-4 font-sans font-bold text-white">
                    <div className="flex items-center gap-2">
                      <span>{c.name}</span>
                      <span className="text-[10px] text-zinc-500 font-mono">({c.fips})</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 font-sans text-zinc-400">
                    <span className="px-2 py-0.5 rounded-full bg-zinc-800/80 text-zinc-300 text-[10px] border border-zinc-700">
                      {c.region}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">{c.pop1970.toLocaleString()}</td>
                  <td className="py-3 px-4 text-right font-bold text-zinc-100">
                    {c.pop2020.toLocaleString()}
                  </td>
                  <td className="py-3 px-4 text-right">
                    <span
                      className={`font-bold px-2 py-0.5 rounded ${
                        c.popGrowthPct > 200
                          ? 'bg-emerald-950/80 text-emerald-400 border border-emerald-800'
                          : c.popGrowthPct < 50
                          ? 'bg-rose-950/80 text-rose-400 border border-rose-800'
                          : 'text-zinc-200'
                      }`}
                    >
                      +{c.popGrowthPct.toFixed(1)}%
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right text-zinc-400">
                    ${c.homeValue1990Adj2020.toLocaleString()}
                  </td>
                  <td className="py-3 px-4 text-right font-bold text-purple-300">
                    ${c.homeValue2020.toLocaleString()}
                  </td>
                  <td className="py-3 px-4 text-right text-indigo-300">
                    +{c.homeValueGrowthPct.toFixed(1)}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
