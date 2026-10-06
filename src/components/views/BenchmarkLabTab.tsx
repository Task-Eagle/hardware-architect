import React, { useState } from 'react';
import { HardwareItem, BenchmarkScores } from '../../types/hardware';
import { HARDWARE_CATALOG } from '../../data/hardwareCatalog';
import {
  Activity,
  Cpu,
  Zap,
  Clock,
  FileDown,
  Plus,
  X,
  TrendingUp,
  Award,
  ArrowUpDown
} from 'lucide-react';

interface BenchmarkLabTabProps {
  onExportBenchmarks: () => void;
  onSelectItemForDetail: (item: HardwareItem) => void;
}

type ActiveMetric =
  | 'geekbenchMulti'
  | 'geekbenchSingle'
  | 'cinebenchR24Cpu'
  | 'blenderClassroomSecs'
  | 'linuxKernelBuildSecs'
  | 'npuAITops'
  | 'passmarkGpu3D'
  | 'perfPerDollar';

export const BenchmarkLabTab: React.FC<BenchmarkLabTabProps> = ({
  onExportBenchmarks,
  onSelectItemForDetail
}) => {
  // Head-to-head selection
  const [selectedIds, setSelectedIds] = useState<string[]>([
    'supermicro-5014a',
    'system76-thelio-mega',
    'hp-z4-g5',
    'lenovo-thinkpad-p16-g2'
  ]);

  const [activeMetric, setActiveMetric] = useState<ActiveMetric>('geekbenchMulti');

  const metricConfigs: Record<
    ActiveMetric,
    { title: string; unit: string; description: string; lowerIsBetter?: boolean }
  > = {
    geekbenchMulti: {
      title: 'Geekbench 6 Multi-Core',
      unit: 'Points',
      description: 'Synthetic multi-threaded integer and floating-point throughput across all physical cores.'
    },
    geekbenchSingle: {
      title: 'Geekbench 6 Single-Core',
      unit: 'Points',
      description: 'Single-thread burst speed crucial for interactive CAD modeling, UI fluidness, and single-process scripts.'
    },
    cinebenchR24Cpu: {
      title: 'Cinebench R24 CPU',
      unit: 'Points',
      description: 'Cinema 4D photorealistic 3D render simulation measuring sustained long-duration thermal cooling and compute.'
    },
    blenderClassroomSecs: {
      title: 'Blender 3.6 Classroom Render',
      unit: 'Seconds',
      description: 'Time taken to render the standardized Blender Classroom benchmark scene. Lower time indicates faster compute.',
      lowerIsBetter: true
    },
    linuxKernelBuildSecs: {
      title: 'Linux Kernel 6.8 Build Time',
      unit: 'Seconds',
      description: 'Cold compile duration of standard Linux kernel using make -j(N). Lower time indicates superior developer build velocity.',
      lowerIsBetter: true
    },
    npuAITops: {
      title: 'Local AI Hardware TOPS (NPU + Tensor)',
      unit: 'TOPS / TFLOPS',
      description: 'Dedicated tensor processing capability for local Copilot, Whisper transcription, and transformer inference.'
    },
    passmarkGpu3D: {
      title: 'PassMark 3D Graphics Mark',
      unit: 'Points',
      description: 'DirectX 12 and Vulkan workstation 3D graphics rendering score for CAD viewports and video timelines.'
    },
    perfPerDollar: {
      title: 'Performance-per-Dollar Ratio',
      unit: 'Pts / $1,000',
      description: 'Geekbench 6 Multi-Core points achieved per $1,000 MSRP spent. Evaluates return on investment.'
    }
  };

  const getMetricValue = (item: HardwareItem, metric: ActiveMetric): number => {
    if (metric === 'perfPerDollar') {
      return Math.round((item.benchmarks.geekbenchMulti / item.pricing.unitMSRP) * 1000);
    }
    return item.benchmarks[metric as keyof BenchmarkScores] as number;
  };

  // Compare items
  const compareItems = selectedIds
    .map((id) => HARDWARE_CATALOG.find((hw) => hw.id === id))
    .filter(Boolean) as HardwareItem[];

  // Max value calculation for bar chart normalization
  const currentConfig = metricConfigs[activeMetric];
  const maxMetricVal = Math.max(
    ...HARDWARE_CATALOG.map((hw) => getMetricValue(hw, activeMetric)),
    1
  );

  const handleToggleSelect = (id: string) => {
    if (selectedIds.includes(id)) {
      if (selectedIds.length > 2) {
        setSelectedIds(selectedIds.filter((item) => item !== id));
      }
    } else {
      if (selectedIds.length < 5) {
        setSelectedIds([...selectedIds, id]);
      }
    }
  };

  return (
    <div className="space-y-6">
      {/* 1. Metric Category Ribbon Selector */}
      <div className="bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-800 rounded-[6px] p-4 shadow-xs">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3 pb-3 border-b border-neutral-200 dark:border-neutral-800">
          <div>
            <div className="text-[11px] font-bold uppercase tracking-wider text-neutral-500">
              Benchmark Testing Suite
            </div>
            <h1 className="text-lg font-bold tracking-tight text-neutral-900 dark:text-white mt-0.5">
              {currentConfig.title}
            </h1>
            <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-0.5">
              {currentConfig.description}
            </p>
          </div>

          <button
            onClick={onExportBenchmarks}
            className="px-3 py-1.5 bg-neutral-900 hover:bg-neutral-800 dark:bg-white dark:hover:bg-neutral-100 text-white dark:text-neutral-900 text-xs font-semibold rounded-[4px] flex items-center gap-1.5 transition-colors self-end md:self-auto shadow-xs"
          >
            <FileDown className="w-3.5 h-3.5" />
            <span>Export Benchmark CSV</span>
          </button>
        </div>

        {/* Metric Selector Buttons */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-1.5 pt-3">
          {(Object.keys(metricConfigs) as ActiveMetric[]).map((metricKey) => {
            const cfg = metricConfigs[metricKey];
            const isActive = activeMetric === metricKey;
            return (
              <button
                key={metricKey}
                onClick={() => setActiveMetric(metricKey)}
                className={`p-2 text-left rounded-[4px] border transition-colors ${
                  isActive
                    ? 'bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 border-neutral-900 dark:border-white font-semibold'
                    : 'bg-neutral-50 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 border-neutral-200 dark:border-neutral-700 hover:border-neutral-400'
                }`}
              >
                <div className="text-[11px] font-medium leading-tight truncate">
                  {cfg.title.split(' ')[0]} {cfg.title.split(' ')[1] || ''}
                </div>
                <div className={`text-[10px] mt-0.5 font-mono ${isActive ? 'text-neutral-300 dark:text-neutral-600' : 'text-neutral-500'}`}>
                  {cfg.unit}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Side-by-Side Head-to-Head Comparison Matrix */}
      <div className="bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-800 rounded-[6px] p-5 shadow-xs">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-4">
          <div>
            <h2 className="text-sm font-bold uppercase tracking-wider text-neutral-900 dark:text-white">
              Direct Head-to-Head Comparison ({compareItems.length} Models Selected)
            </h2>
            <div className="text-xs text-neutral-500">
              Select 2 to 5 systems from below to cross-evaluate performance metrics and price.
            </div>
          </div>
        </div>

        {/* Head-to-head column cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {compareItems.map((item) => {
            const rawVal = getMetricValue(item, activeMetric);
            let barPct = Math.round((rawVal / maxMetricVal) * 100);
            if (currentConfig.lowerIsBetter) {
              // For lower is better, invert scale relative to max
              barPct = Math.max(10, Math.round((1 - rawVal / (maxMetricVal * 1.2)) * 100));
            }

            return (
              <div
                key={item.id}
                className="bg-neutral-50 dark:bg-neutral-800/60 border border-neutral-300 dark:border-neutral-700/80 rounded-[4px] p-3.5 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] uppercase font-bold text-neutral-500">
                      {item.manufacturer}
                    </span>
                    {selectedIds.length > 2 && (
                      <button
                        onClick={() => handleToggleSelect(item.id)}
                        className="text-neutral-400 hover:text-neutral-700 dark:hover:text-white"
                        title="Remove from comparison"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>

                  <h3 className="font-bold text-xs text-neutral-900 dark:text-white mt-1">
                    {item.name}
                  </h3>
                  <div className="text-[10px] text-neutral-500 font-mono">
                    {item.processor.model}
                  </div>

                  {/* Primary Highlight Metric */}
                  <div className="my-3 p-2 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 rounded-[4px]">
                    <div className="text-[10px] text-neutral-500 font-medium">
                      {currentConfig.title}
                    </div>
                    <div className="text-xl font-bold font-mono text-neutral-900 dark:text-white mt-0.5">
                      {rawVal.toLocaleString()}{' '}
                      <span className="text-xs font-normal text-neutral-500 font-sans">
                        {currentConfig.unit}
                      </span>
                    </div>

                    {/* Progress Bar (Strict Grayscale) */}
                    <div className="w-full bg-neutral-200 dark:bg-neutral-800 h-2 rounded-[2px] mt-2 overflow-hidden">
                      <div
                        className="bg-neutral-900 dark:bg-white h-full transition-all duration-300"
                        style={{ width: `${barPct}%` }}
                      />
                    </div>
                  </div>

                  {/* Secondary Benchmarks Breakdown */}
                  <div className="space-y-1 text-xs py-1 text-neutral-700 dark:text-neutral-300 border-t border-neutral-200 dark:border-neutral-700">
                    <div className="flex justify-between">
                      <span className="text-neutral-500 text-[11px]">Geekbench Single:</span>
                      <span className="font-mono">{item.benchmarks.geekbenchSingle.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-neutral-500 text-[11px]">Cinebench R24:</span>
                      <span className="font-mono">{item.benchmarks.cinebenchR24Cpu.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-neutral-500 text-[11px]">Blender Classroom:</span>
                      <span className="font-mono">{item.benchmarks.blenderClassroomSecs}s</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-neutral-500 text-[11px]">Linux Kernel Build:</span>
                      <span className="font-mono">{item.benchmarks.linuxKernelBuildSecs}s</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-neutral-500 text-[11px]">NPU AI TOPS:</span>
                      <span className="font-mono">{item.benchmarks.npuAITops} TOPS</span>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-neutral-200 dark:border-neutral-700 mt-2">
                  <div className="flex justify-between items-baseline mb-2">
                    <span className="text-neutral-500 text-[11px]">MSRP Unit:</span>
                    <span className="font-mono font-bold text-sm text-neutral-900 dark:text-white">
                      ${item.pricing.unitMSRP.toLocaleString()}
                    </span>
                  </div>
                  <button
                    onClick={() => onSelectItemForDetail(item)}
                    className="w-full py-1 text-xs bg-neutral-200 dark:bg-neutral-700 hover:bg-neutral-300 dark:hover:bg-neutral-600 text-neutral-800 dark:text-neutral-200 rounded-[4px] font-medium transition-colors"
                  >
                    View Specs
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. Complete Ranking Matrix Table */}
      <div className="bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-800 rounded-[6px] overflow-hidden shadow-xs">
        <div className="p-3 bg-neutral-100 dark:bg-neutral-950 border-b border-neutral-300 dark:border-neutral-800 flex justify-between items-center text-xs">
          <span className="font-bold text-neutral-900 dark:text-white">
            All Hardware Ranked by {currentConfig.title}
          </span>
          <span className="text-neutral-500">
            Click checkbox to add/remove from Head-to-Head comparator above
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-neutral-300 dark:border-neutral-800 text-[11px] font-semibold text-neutral-600 dark:text-neutral-400">
                <th className="py-2.5 px-3 text-center">Compare</th>
                <th className="py-2.5 px-3">System Name</th>
                <th className="py-2.5 px-3">Processor</th>
                <th className="py-2.5 px-3 text-right">Geekbench 6 Multi</th>
                <th className="py-2.5 px-3 text-right">Cinebench R24</th>
                <th className="py-2.5 px-3 text-right">Blender (s)</th>
                <th className="py-2.5 px-3 text-right">Kernel Build (s)</th>
                <th className="py-2.5 px-3 text-right">AI TOPS</th>
                <th className="py-2.5 px-3 text-right">Perf / $1k</th>
                <th className="py-2.5 px-3 text-right">MSRP</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-200 dark:divide-neutral-800">
              {[...HARDWARE_CATALOG]
                .sort((a, b) => {
                  const valA = getMetricValue(a, activeMetric);
                  const valB = getMetricValue(b, activeMetric);
                  return currentConfig.lowerIsBetter ? valA - valB : valB - valA;
                })
                .map((hw, rank) => {
                  const isChecked = selectedIds.includes(hw.id);
                  const pPer1k = Math.round((hw.benchmarks.geekbenchMulti / hw.pricing.unitMSRP) * 1000);

                  return (
                    <tr
                      key={hw.id}
                      className={`hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-colors ${
                        isChecked ? 'bg-neutral-100/70 dark:bg-neutral-800/70' : ''
                      }`}
                    >
                      <td className="py-2 px-3 text-center">
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => handleToggleSelect(hw.id)}
                          className="accent-neutral-900 rounded-[2px]"
                        />
                      </td>

                      <td className="py-2 px-3">
                        <div className="font-semibold text-neutral-900 dark:text-neutral-100 flex items-center gap-1.5">
                          <span className="text-[10px] text-neutral-400 font-mono">#{rank + 1}</span>
                          {hw.name}
                        </div>
                        <div className="text-[10px] text-neutral-500">
                          {hw.manufacturer} · {hw.formFactor}
                        </div>
                      </td>

                      <td className="py-2 px-3 font-mono text-[11px] text-neutral-700 dark:text-neutral-300">
                        {hw.processor.model}
                      </td>

                      <td className="py-2 px-3 text-right font-mono font-semibold text-neutral-900 dark:text-neutral-100">
                        {hw.benchmarks.geekbenchMulti.toLocaleString()}
                      </td>

                      <td className="py-2 px-3 text-right font-mono text-neutral-800 dark:text-neutral-200">
                        {hw.benchmarks.cinebenchR24Cpu.toLocaleString()}
                      </td>

                      <td className="py-2 px-3 text-right font-mono text-neutral-700 dark:text-neutral-300">
                        {hw.benchmarks.blenderClassroomSecs}s
                      </td>

                      <td className="py-2 px-3 text-right font-mono text-neutral-700 dark:text-neutral-300">
                        {hw.benchmarks.linuxKernelBuildSecs}s
                      </td>

                      <td className="py-2 px-3 text-right font-mono text-neutral-700 dark:text-neutral-300">
                        {hw.benchmarks.npuAITops}
                      </td>

                      <td className="py-2 px-3 text-right font-mono font-bold text-neutral-900 dark:text-neutral-100">
                        {pPer1k}
                      </td>

                      <td className="py-2 px-3 text-right font-mono text-neutral-800 dark:text-neutral-200">
                        ${hw.pricing.unitMSRP.toLocaleString()}
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
