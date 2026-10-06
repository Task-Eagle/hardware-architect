import React, { useState, useMemo } from 'react';
import { HardwareItem, OSPlatform, FormFactor, OSDistribution } from '../../types/hardware';
import { HARDWARE_CATALOG } from '../../data/hardwareCatalog';
import {
  Search,
  Filter,
  Monitor,
  Laptop,
  Box,
  Server,
  ArrowUpDown,
  ShoppingCart,
  Eye,
  FileDown,
  Check,
  LayoutGrid,
  Table as TableIcon
} from 'lucide-react';

interface CatalogTabProps {
  selectedOS: OSPlatform | 'all';
  setSelectedOS: (os: OSPlatform | 'all') => void;
  selectedFormFactor: FormFactor | 'all';
  setSelectedFormFactor: (ff: FormFactor | 'all') => void;
  onSelectItemForDetail: (item: HardwareItem) => void;
  onAddToCart: (item: HardwareItem, os: OSDistribution) => void;
  onExportCatalog: () => void;
}

type SortField = 'price' | 'geekbench' | 'ram' | 'name' | 'tco';

export const CatalogTab: React.FC<CatalogTabProps> = ({
  selectedOS,
  setSelectedOS,
  selectedFormFactor,
  setSelectedFormFactor,
  onSelectItemForDetail,
  onAddToCart,
  onExportCatalog
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedVendor, setSelectedVendor] = useState<string>('all');
  const [sortField, setSortField] = useState<SortField>('geekbench');
  const [sortAsc, setSortAsc] = useState<boolean>(false);
  const [viewMode, setViewMode] = useState<'table' | 'grid'>('table');

  const filteredItems = useMemo(() => {
    return HARDWARE_CATALOG.filter((item) => {
      // Search filter
      const q = searchQuery.toLowerCase();
      const matchesSearch =
        item.name.toLowerCase().includes(q) ||
        item.modelNumber.toLowerCase().includes(q) ||
        item.processor.model.toLowerCase().includes(q) ||
        item.graphics.model.toLowerCase().includes(q) ||
        item.manufacturer.toLowerCase().includes(q);

      if (!matchesSearch) return false;

      // OS filter
      if (selectedOS !== 'all') {
        if (selectedOS === 'macos_coming_soon') {
          return false;
        }
        if (!item.supportedOS.includes(selectedOS)) return false;
      }

      // Form Factor filter
      if (selectedFormFactor !== 'all' && item.formFactor !== selectedFormFactor) {
        return false;
      }

      // Vendor filter
      if (selectedVendor !== 'all' && item.manufacturer !== selectedVendor) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      let diff = 0;
      if (sortField === 'price') {
        diff = a.pricing.unitMSRP - b.pricing.unitMSRP;
      } else if (sortField === 'geekbench') {
        diff = a.benchmarks.geekbenchMulti - b.benchmarks.geekbenchMulti;
      } else if (sortField === 'ram') {
        diff = a.memory.capacityGb - b.memory.capacityGb;
      } else if (sortField === 'tco') {
        diff = a.pricing.estimated3YrTCO - b.pricing.estimated3YrTCO;
      } else if (sortField === 'name') {
        diff = a.name.localeCompare(b.name);
      }
      return sortAsc ? diff : -diff;
    });
  }, [searchQuery, selectedOS, selectedFormFactor, selectedVendor, sortField, sortAsc]);

  const toggleSort = (field: SortField) => {
    if (sortField === field) {
      setSortAsc(!sortAsc);
    } else {
      setSortField(field);
      setSortAsc(false);
    }
  };

  return (
    <div className="space-y-4">
      {/* Search, Filter & View Controls Bar */}
      <div className="bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-800 rounded-[6px] p-3 flex flex-col md:flex-row items-center justify-between gap-3 text-xs shadow-xs">
        {/* Left: Search input */}
        <div className="relative w-full md:w-80">
          <Search className="w-3.5 h-3.5 text-neutral-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search model, CPU, GPU, or vendor..."
            className="w-full pl-8 pr-3 py-1.5 bg-neutral-50 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded-[4px] text-neutral-900 dark:text-neutral-100 placeholder-neutral-500 focus:outline-none focus:border-neutral-800 dark:focus:border-neutral-300"
          />
        </div>

        {/* Center: Filters */}
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          {/* Vendor Filter */}
          <select
            value={selectedVendor}
            onChange={(e) => setSelectedVendor(e.target.value)}
            className="bg-neutral-50 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded-[4px] px-2 py-1.5 text-neutral-800 dark:text-neutral-200"
          >
            <option value="all">All Vendors</option>
            <option value="Dell">Dell</option>
            <option value="Lenovo">Lenovo</option>
            <option value="HP">HP</option>
            <option value="System76">System76 (Linux Native)</option>
            <option value="Framework">Framework (Modular)</option>
            <option value="Tuxedo Computers">Tuxedo Computers (Linux)</option>
            <option value="Supermicro">Supermicro (Rackmount)</option>
          </select>

          {/* Form Factor Filter */}
          <select
            value={selectedFormFactor}
            onChange={(e) => setSelectedFormFactor(e.target.value as FormFactor | 'all')}
            className="bg-neutral-50 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded-[4px] px-2 py-1.5 text-neutral-800 dark:text-neutral-200"
          >
            <option value="all">All Form Factors</option>
            <option value="Tower Workstation">Tower Workstations</option>
            <option value="Mobile Workstation (Laptop)">Mobile Laptops</option>
            <option value="Compact SFF / Mini-PC">Compact SFF / Mini-PC</option>
            <option value="Rackmount Dev Station">Rackmount Dev Station</option>
          </select>

          {/* OS Platform Filter */}
          <select
            value={selectedOS}
            onChange={(e) => setSelectedOS(e.target.value as OSPlatform | 'all')}
            className="bg-neutral-50 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded-[4px] px-2 py-1.5 text-neutral-800 dark:text-neutral-200"
          >
            <option value="all">All OS</option>
            <option value="windows">Windows Certified</option>
            <option value="linux">Linux Certified</option>
            <option value="dual_boot">Dual-Boot Validated</option>
          </select>
        </div>

        {/* Right: Layout Switcher & CSV Download */}
        <div className="flex items-center gap-2 self-end md:self-auto">
          <div className="flex border border-neutral-300 dark:border-neutral-700 rounded-[4px] overflow-hidden">
            <button
              onClick={() => setViewMode('table')}
              className={`p-1.5 transition-colors ${
                viewMode === 'table' ? 'bg-neutral-800 text-white' : 'bg-neutral-50 dark:bg-neutral-800 text-neutral-500'
              }`}
              title="Spreadsheet Table View"
            >
              <TableIcon className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 transition-colors ${
                viewMode === 'grid' ? 'bg-neutral-800 text-white' : 'bg-neutral-50 dark:bg-neutral-800 text-neutral-500'
              }`}
              title="Card Grid View"
            >
              <LayoutGrid className="w-3.5 h-3.5" />
            </button>
          </div>

          <button
            onClick={onExportCatalog}
            className="px-2.5 py-1.5 bg-neutral-900 hover:bg-neutral-800 dark:bg-neutral-100 dark:hover:bg-neutral-200 text-white dark:text-neutral-900 rounded-[4px] font-semibold flex items-center gap-1.5 transition-colors"
          >
            <FileDown className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Export CSV</span>
          </button>
        </div>
      </div>

      {/* Results Count Banner */}
      <div className="flex items-center justify-between text-xs text-neutral-500 px-1">
        <div>
          Showing <span className="font-semibold text-neutral-900 dark:text-neutral-200">{filteredItems.length}</span> verified enterprise hardware configurations
        </div>
        <div className="flex items-center gap-3">
          <span>Sort by:</span>
          <button
            onClick={() => toggleSort('geekbench')}
            className={`flex items-center gap-1 font-medium ${sortField === 'geekbench' ? 'text-neutral-900 dark:text-white underline' : 'text-neutral-500 hover:text-neutral-800'}`}
          >
            Geekbench Multi {sortField === 'geekbench' && (sortAsc ? '↑' : '↓')}
          </button>
          <button
            onClick={() => toggleSort('price')}
            className={`flex items-center gap-1 font-medium ${sortField === 'price' ? 'text-neutral-900 dark:text-white underline' : 'text-neutral-500 hover:text-neutral-800'}`}
          >
            MSRP {sortField === 'price' && (sortAsc ? '↑' : '↓')}
          </button>
          <button
            onClick={() => toggleSort('ram')}
            className={`flex items-center gap-1 font-medium ${sortField === 'ram' ? 'text-neutral-900 dark:text-white underline' : 'text-neutral-500 hover:text-neutral-800'}`}
          >
            RAM {sortField === 'ram' && (sortAsc ? '↑' : '↓')}
          </button>
        </div>
      </div>

      {/* VIEW: SPREADSHEET HIGH-DENSITY TABLE */}
      {viewMode === 'table' ? (
        <div className="bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-800 rounded-[6px] overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-neutral-100 dark:bg-neutral-950 border-b border-neutral-300 dark:border-neutral-800 text-[11px] font-semibold text-neutral-600 dark:text-neutral-400 select-none">
                  <th className="py-2.5 px-3">System Name & Form Factor</th>
                  <th className="py-2.5 px-3">OS Certified</th>
                  <th className="py-2.5 px-3">Processor & Cores</th>
                  <th className="py-2.5 px-3">RAM & ECC</th>
                  <th className="py-2.5 px-3">Graphics Subsystem</th>
                  <th className="py-2.5 px-3 text-right">Geekbench 6 Multi</th>
                  <th className="py-2.5 px-3 text-right">MSRP Unit</th>
                  <th className="py-2.5 px-3 text-right">3-Yr TCO</th>
                  <th className="py-2.5 px-3 text-center">Procurement Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-200 dark:divide-neutral-800">
                {filteredItems.map((item) => (
                  <tr
                    key={item.id}
                    className="hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-colors"
                  >
                    <td className="py-2.5 px-3">
                      <div className="font-semibold text-neutral-900 dark:text-neutral-100 flex items-center gap-1.5">
                        {item.name}
                      </div>
                      <div className="text-[10px] text-neutral-500">
                        {item.manufacturer} · {item.formFactor} · <span className="font-mono">{item.modelNumber}</span>
                      </div>
                    </td>

                    <td className="py-2.5 px-3">
                      <div className="uppercase text-[10px] font-bold text-neutral-700 dark:text-neutral-300">
                        {item.supportedOS.join(' / ')}
                      </div>
                      <div className="text-[10px] text-neutral-500">
                        Default: {item.defaultOS}
                      </div>
                    </td>

                    <td className="py-2.5 px-3 max-w-[200px]">
                      <div className="truncate font-medium text-neutral-900 dark:text-neutral-100">
                        {item.processor.model}
                      </div>
                      <div className="text-[10px] text-neutral-500 font-mono">
                        {item.processor.cores}C/{item.processor.threads}T · {item.processor.boostClockGhz} GHz · {item.processor.tdpWatts}W
                      </div>
                    </td>

                    <td className="py-2.5 px-3">
                      <div className="font-semibold text-neutral-900 dark:text-neutral-100">
                        {item.memory.capacityGb}GB
                      </div>
                      <div className="text-[10px] text-neutral-500">
                        {item.memory.eccSupported ? 'ECC Registered' : 'Non-ECC'} · Up to {item.memory.maxSupportedGb}GB
                      </div>
                    </td>

                    <td className="py-2.5 px-3 max-w-[180px]">
                      <div className="truncate font-medium text-neutral-900 dark:text-neutral-100">
                        {item.graphics.model}
                      </div>
                      <div className="text-[10px] text-neutral-500">
                        {item.graphics.vramGb > 0 ? `${item.graphics.vramGb}GB VRAM` : 'Integrated GPU'}
                      </div>
                    </td>

                    <td className="py-2.5 px-3 text-right font-mono font-semibold text-neutral-900 dark:text-neutral-100">
                      {item.benchmarks.geekbenchMulti.toLocaleString()}
                    </td>

                    <td className="py-2.5 px-3 text-right font-mono text-neutral-900 dark:text-neutral-100">
                      <div className="font-bold">${item.pricing.unitMSRP.toLocaleString()}</div>
                      <div className="text-[10px] text-neutral-500 font-mono">
                        10+: ${item.pricing.volume10Price.toLocaleString()}
                      </div>
                    </td>

                    <td className="py-2.5 px-3 text-right font-mono text-neutral-600 dark:text-neutral-400">
                      ${item.pricing.estimated3YrTCO.toLocaleString()}
                    </td>

                    <td className="py-2.5 px-3">
                      <div className="flex items-center justify-center gap-1.5">
                        <button
                          onClick={() => onSelectItemForDetail(item)}
                          className="p-1.5 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700 rounded-[4px] border border-neutral-300 dark:border-neutral-700"
                          title="View Specifications"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => onAddToCart(item, item.defaultOS)}
                          className="px-2.5 py-1.5 bg-neutral-900 hover:bg-neutral-800 dark:bg-white dark:hover:bg-neutral-100 text-white dark:text-neutral-900 font-semibold text-[11px] rounded-[4px] flex items-center gap-1 shadow-xs"
                          title="Add to Fleet Cart"
                        >
                          <ShoppingCart className="w-3 h-3" />
                          <span>Add</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        /* VIEW: CARDS GRID */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-800 rounded-[6px] p-4 flex flex-col justify-between hover:border-neutral-500 dark:hover:border-neutral-600 transition-colors shadow-xs"
            >
              <div>
                <div className="flex items-center justify-between text-[11px] text-neutral-500 mb-1">
                  <span>{item.manufacturer} · {item.formFactor}</span>
                  <span className="font-mono">{item.modelNumber}</span>
                </div>
                <h3 className="font-bold text-sm text-neutral-900 dark:text-white">
                  {item.name}
                </h3>
                <p className="text-[11px] text-neutral-600 dark:text-neutral-400 mt-1 line-clamp-2">
                  {item.workloadFitSummary}
                </p>

                <div className="my-3 py-2 border-y border-neutral-200 dark:border-neutral-800 space-y-1 text-xs">
                  <div className="flex justify-between">
                    <span className="text-neutral-500">CPU:</span>
                    <span className="font-medium truncate max-w-[170px] text-right">{item.processor.model}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-500">RAM:</span>
                    <span className="font-medium">{item.memory.capacityGb}GB ({item.memory.type})</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-500">GPU:</span>
                    <span className="font-medium truncate max-w-[170px] text-right">{item.graphics.model}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-500">Geekbench 6 Multi:</span>
                    <span className="font-mono font-semibold">{item.benchmarks.geekbenchMulti.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-baseline mb-3">
                  <div>
                    <div className="text-lg font-bold font-mono text-neutral-900 dark:text-white">
                      ${item.pricing.unitMSRP.toLocaleString()}
                    </div>
                    <div className="text-[10px] text-neutral-500">MSRP Standard</div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs font-mono font-semibold text-neutral-800 dark:text-neutral-200">
                      ${item.pricing.volume100Price.toLocaleString()}
                    </div>
                    <div className="text-[10px] text-neutral-500">Bulk 100+ (-22%)</div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => onSelectItemForDetail(item)}
                    className="flex-1 py-1.5 text-xs border border-neutral-300 dark:border-neutral-700 text-neutral-800 dark:text-neutral-200 rounded-[4px] hover:bg-neutral-50 dark:hover:bg-neutral-800"
                  >
                    Specs
                  </button>
                  <button
                    onClick={() => onAddToCart(item, item.defaultOS)}
                    className="flex-1 py-1.5 bg-neutral-900 hover:bg-neutral-800 dark:bg-white dark:hover:bg-neutral-100 text-white dark:text-neutral-900 font-semibold text-xs rounded-[4px] flex items-center justify-center gap-1 shadow-xs"
                  >
                    <ShoppingCart className="w-3.5 h-3.5" /> Add
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
