import React from 'react';
import { HardwareItem, OSDistribution } from '../../types/hardware';
import { X, Check, Cpu, HardDrive, Zap, Shield, ShoppingCart, Activity } from 'lucide-react';

interface HardwareDetailModalProps {
  item: HardwareItem | null;
  onClose: () => void;
  onAddToCart: (item: HardwareItem, os: OSDistribution) => void;
}

export const HardwareDetailModal: React.FC<HardwareDetailModalProps> = ({ item, onClose, onAddToCart }) => {
  const [selectedOS, setSelectedOS] = React.useState<OSDistribution>(item ? item.defaultOS : 'Windows 11 Pro');

  React.useEffect(() => {
    if (item) {
      setSelectedOS(item.defaultOS);
    }
  }, [item]);

  if (!item) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
      <div className="w-full max-w-3xl bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 shadow-2xl rounded-[6px] overflow-hidden flex flex-col max-h-[90vh]">
        {/* Title Bar */}
        <div className="bg-neutral-900 text-neutral-100 px-4 py-2.5 flex items-center justify-between border-b border-neutral-800">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold">{item.name} · Specification Sheet</span>
            <span className="text-[10px] bg-neutral-800 px-2 py-0.5 rounded-[4px] font-mono text-neutral-400">
              {item.modelNumber}
            </span>
          </div>
          <button onClick={onClose} className="p-1 hover:text-white text-neutral-400 rounded-[4px]">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-neutral-900 dark:text-neutral-100 text-xs">
          {/* Header Summary */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-4 border-b border-neutral-200 dark:border-neutral-800">
            <div>
              <div className="text-[11px] font-semibold text-neutral-500 uppercase tracking-wider">
                {item.manufacturer} · {item.formFactor}
              </div>
              <h2 className="text-xl font-bold tracking-tight text-neutral-900 dark:text-white mt-0.5">
                {item.name}
              </h2>
              <p className="text-neutral-600 dark:text-neutral-400 text-xs mt-1 max-w-xl">
                {item.workloadFitSummary}
              </p>
            </div>

            <div className="text-right">
              <div className="text-2xl font-bold font-mono tracking-tight text-neutral-900 dark:text-white">
                ${item.pricing.unitMSRP.toLocaleString()}
              </div>
              <div className="text-[11px] text-neutral-500">MSRP Base Configuration</div>
              <div className="text-[10px] text-neutral-400 font-mono mt-0.5">
                Bulk 100+: ${item.pricing.volume100Price.toLocaleString()} (-22%)
              </div>
            </div>
          </div>

          {/* Specifications Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Processor & Memory */}
            <div className="p-4 bg-neutral-50 dark:bg-neutral-800/60 border border-neutral-200 dark:border-neutral-700/60 rounded-[4px] space-y-2.5">
              <div className="flex items-center gap-2 font-semibold text-neutral-800 dark:text-neutral-200 text-xs border-b border-neutral-200 dark:border-neutral-700 pb-1.5">
                <Cpu className="w-4 h-4 text-neutral-500" />
                Processor & Computing Core
              </div>
              <div className="space-y-1">
                <div className="flex justify-between">
                  <span className="text-neutral-500">Processor:</span>
                  <span className="font-medium text-neutral-900 dark:text-neutral-100">{item.processor.model}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-500">Cores / Threads:</span>
                  <span className="font-mono text-neutral-900 dark:text-neutral-100">{item.processor.cores} Cores / {item.processor.threads} Threads</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-500">Base / Boost Clock:</span>
                  <span className="font-mono text-neutral-900 dark:text-neutral-100">{item.processor.baseClockGhz} GHz / {item.processor.boostClockGhz} GHz</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-500">Thermal Design Power (TDP):</span>
                  <span className="font-mono text-neutral-900 dark:text-neutral-100">{item.processor.tdpWatts} Watts</span>
                </div>
              </div>
            </div>

            {/* Memory & Storage */}
            <div className="p-4 bg-neutral-50 dark:bg-neutral-800/60 border border-neutral-200 dark:border-neutral-700/60 rounded-[4px] space-y-2.5">
              <div className="flex items-center gap-2 font-semibold text-neutral-800 dark:text-neutral-200 text-xs border-b border-neutral-200 dark:border-neutral-700 pb-1.5">
                <HardDrive className="w-4 h-4 text-neutral-500" />
                Memory & Storage Subsystem
              </div>
              <div className="space-y-1">
                <div className="flex justify-between">
                  <span className="text-neutral-500">System RAM:</span>
                  <span className="font-medium text-neutral-900 dark:text-neutral-100">{item.memory.capacityGb}GB {item.memory.type}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-500">ECC Supported:</span>
                  <span className="text-neutral-900 dark:text-neutral-100">{item.memory.eccSupported ? 'Yes (Workstation ECC)' : 'No (Standard Non-ECC)'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-500">Max RAM Expandability:</span>
                  <span className="font-mono text-neutral-900 dark:text-neutral-100">Up to {item.memory.maxSupportedGb}GB</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-500">Primary NVMe Storage:</span>
                  <span className="text-neutral-900 dark:text-neutral-100">{item.storage.primary}</span>
                </div>
              </div>
            </div>

            {/* Graphics & Displays */}
            <div className="p-4 bg-neutral-50 dark:bg-neutral-800/60 border border-neutral-200 dark:border-neutral-700/60 rounded-[4px] space-y-2.5">
              <div className="flex items-center gap-2 font-semibold text-neutral-800 dark:text-neutral-200 text-xs border-b border-neutral-200 dark:border-neutral-700 pb-1.5">
                <Zap className="w-4 h-4 text-neutral-500" />
                Graphics & Acceleration
              </div>
              <div className="space-y-1">
                <div className="flex justify-between">
                  <span className="text-neutral-500">GPU Hardware:</span>
                  <span className="font-medium text-neutral-900 dark:text-neutral-100">{item.graphics.model}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-500">Dedicated VRAM:</span>
                  <span className="font-mono text-neutral-900 dark:text-neutral-100">{item.graphics.vramGb > 0 ? `${item.graphics.vramGb}GB GDDR` : 'Shared System Memory'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-500">Display Interfaces:</span>
                  <span className="text-neutral-900 dark:text-neutral-100">{item.connectivity.displayOutputs}</span>
                </div>
              </div>
            </div>

            {/* Power & Enterprise Management */}
            <div className="p-4 bg-neutral-50 dark:bg-neutral-800/60 border border-neutral-200 dark:border-neutral-700/60 rounded-[4px] space-y-2.5">
              <div className="flex items-center gap-2 font-semibold text-neutral-800 dark:text-neutral-200 text-xs border-b border-neutral-200 dark:border-neutral-700 pb-1.5">
                <Shield className="w-4 h-4 text-neutral-500" />
                Chassis & 3-Year TCO Profile
              </div>
              <div className="space-y-1">
                <div className="flex justify-between">
                  <span className="text-neutral-500">Avg Operational Power:</span>
                  <span className="font-mono text-neutral-900 dark:text-neutral-100">{item.pricing.avgPowerWatts} Watts</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-500">Annual Electricity Cost:</span>
                  <span className="font-mono text-neutral-900 dark:text-neutral-100">${item.pricing.annualElectricityCost}/yr</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-500">3-Year Enterprise TCO:</span>
                  <span className="font-mono font-bold text-neutral-900 dark:text-neutral-100">${item.pricing.estimated3YrTCO.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Benchmark Table */}
          <div className="p-4 bg-neutral-50 dark:bg-neutral-800/60 border border-neutral-200 dark:border-neutral-700/60 rounded-[4px]">
            <div className="flex items-center gap-2 font-semibold text-neutral-800 dark:text-neutral-200 text-xs mb-3">
              <Activity className="w-4 h-4 text-neutral-500" />
              Standardized Hardware Benchmarks
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
              <div className="p-2 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 rounded-[4px]">
                <div className="text-[10px] text-neutral-500 uppercase font-medium">Geekbench 6 Multi</div>
                <div className="text-base font-bold font-mono text-neutral-900 dark:text-white mt-0.5">
                  {item.benchmarks.geekbenchMulti.toLocaleString()}
                </div>
              </div>
              <div className="p-2 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 rounded-[4px]">
                <div className="text-[10px] text-neutral-500 uppercase font-medium">Cinebench R24</div>
                <div className="text-base font-bold font-mono text-neutral-900 dark:text-white mt-0.5">
                  {item.benchmarks.cinebenchR24Cpu.toLocaleString()}
                </div>
              </div>
              <div className="p-2 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 rounded-[4px]">
                <div className="text-[10px] text-neutral-500 uppercase font-medium">Kernel Compile</div>
                <div className="text-base font-bold font-mono text-neutral-900 dark:text-white mt-0.5">
                  {item.benchmarks.linuxKernelBuildSecs}s
                </div>
              </div>
              <div className="p-2 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 rounded-[4px]">
                <div className="text-[10px] text-neutral-500 uppercase font-medium">NPU AI TOPS</div>
                <div className="text-base font-bold font-mono text-neutral-900 dark:text-white mt-0.5">
                  {item.benchmarks.npuAITops} TOPS
                </div>
              </div>
            </div>
          </div>

          {/* OS Choice & Action Bar */}
          <div className="pt-4 border-t border-neutral-200 dark:border-neutral-800 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <label className="text-xs font-semibold text-neutral-700 dark:text-neutral-300">
                Operating System Distribution:
              </label>
              <select
                value={selectedOS}
                onChange={(e) => setSelectedOS(e.target.value as OSDistribution)}
                className="bg-neutral-50 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 text-xs px-2 py-1.5 rounded-[4px] font-medium text-neutral-900 dark:text-white"
              >
                {item.availableOSOptions.map((os) => (
                  <option key={os} value={os}>
                    {os}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={onClose}
                className="px-3 py-1.5 text-xs text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-[4px] border border-neutral-300 dark:border-neutral-700"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  onAddToCart(item, selectedOS);
                  onClose();
                }}
                className="px-4 py-1.5 bg-neutral-900 hover:bg-neutral-800 dark:bg-white dark:hover:bg-neutral-100 text-white dark:text-neutral-900 text-xs font-semibold rounded-[4px] flex items-center gap-1.5 shadow-xs"
              >
                <ShoppingCart className="w-3.5 h-3.5" />
                Add to Fleet Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
