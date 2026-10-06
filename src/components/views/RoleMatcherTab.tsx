import React, { useState } from 'react';
import { JobRoleId, OSPlatform, HardwareItem, OSDistribution } from '../../types/hardware';
import { JOB_ROLES } from '../../data/jobRoles';
import { HARDWARE_CATALOG } from '../../data/hardwareCatalog';
import { evaluateHardwareForRole } from '../../utils/hardwareMatcher';
import {
  CheckCircle2,
  AlertTriangle,
  Cpu,
  HardDrive,
  Zap,
  DollarSign,
  ShoppingCart,
  Sliders,
  ChevronRight,
  Info,
  Layers,
  ArrowRight
} from 'lucide-react';

interface RoleMatcherTabProps {
  selectedRole: JobRoleId;
  setSelectedRole: (role: JobRoleId) => void;
  selectedOS: OSPlatform | 'all';
  setSelectedOS: (os: OSPlatform | 'all') => void;
  onSelectItemForDetail: (item: HardwareItem) => void;
  onAddToCart: (item: HardwareItem, os: OSDistribution, quantity?: number) => void;
  onNavigateToTab: (tab: 'catalog' | 'benchmarks' | 'pricing' | 'cart') => void;
}

export const RoleMatcherTab: React.FC<RoleMatcherTabProps> = ({
  selectedRole,
  setSelectedRole,
  selectedOS,
  setSelectedOS,
  onSelectItemForDetail,
  onAddToCart,
  onNavigateToTab
}) => {
  const currentRole = JOB_ROLES.find((r) => r.id === selectedRole) || JOB_ROLES[0];
  const [teamSize, setTeamSize] = useState<number>(10);
  const [budgetPerUnit, setBudgetPerUnit] = useState<number>(currentRole.typicalBudgetRange[1]);

  // Handle role change update default budget
  const handleRoleChange = (roleId: JobRoleId) => {
    setSelectedRole(roleId);
    const r = JOB_ROLES.find((item) => item.id === roleId);
    if (r) {
      setBudgetPerUnit(r.typicalBudgetRange[1]);
    }
  };

  // Evaluate all catalog items for this role
  const evaluatedItems = HARDWARE_CATALOG.map((hw) =>
    evaluateHardwareForRole(hw, currentRole, selectedOS, budgetPerUnit)
  ).sort((a, b) => b.score - a.score);

  const optimalMatches = evaluatedItems.filter((m) => m.matchLevel === 'Optimal');
  const otherMatches = evaluatedItems.filter((m) => m.matchLevel !== 'Optimal');

  return (
    <div className="space-y-6">
      {/* 1. Job Role Selector & Interactive Controls Banner */}
      <div className="bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-800 rounded-[6px] p-5 shadow-xs">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left: Role Selection & Workload Scope */}
          <div className="flex-1 space-y-4">
            <div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-neutral-500">
                Departmental Role Workload Matrix
              </div>
              <h1 className="text-xl font-bold tracking-tight text-neutral-900 dark:text-white mt-0.5">
                {currentRole.title}
              </h1>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-1 leading-relaxed">
                {currentRole.description}
              </p>
            </div>

            {/* Role Quick Selector Pills */}
            <div className="flex flex-wrap gap-1.5 pt-1">
              {JOB_ROLES.map((role) => (
                <button
                  key={role.id}
                  onClick={() => handleRoleChange(role.id)}
                  className={`px-2.5 py-1 text-xs rounded-[4px] border transition-colors ${
                    selectedRole === role.id
                      ? 'bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 border-neutral-900 dark:border-white font-semibold'
                      : 'bg-neutral-50 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 border-neutral-200 dark:border-neutral-700 hover:border-neutral-400'
                  }`}
                >
                  {role.title.split('&')[0].trim()}
                </button>
              ))}
            </div>

            {/* Workload Specifications Requirements */}
            <div className="p-3 bg-neutral-50 dark:bg-neutral-800/60 border border-neutral-200 dark:border-neutral-700/60 rounded-[4px]">
              <div className="text-[11px] font-semibold text-neutral-800 dark:text-neutral-200 mb-2">
                Baseline Hardware Demands for {currentRole.title}:
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                <div>
                  <span className="text-neutral-500 text-[10px] block">Minimum RAM</span>
                  <span className="font-semibold text-neutral-900 dark:text-white">{currentRole.recommendedMinRamGb}GB DDR5</span>
                </div>
                <div>
                  <span className="text-neutral-500 text-[10px] block">CPU Topology</span>
                  <span className="font-semibold text-neutral-900 dark:text-white">{currentRole.recommendedMinCores}+ Physical Cores</span>
                </div>
                <div>
                  <span className="text-neutral-500 text-[10px] block">GPU Capability</span>
                  <span className="font-semibold text-neutral-900 dark:text-white">{currentRole.recommendedGpuTier}</span>
                </div>
                <div>
                  <span className="text-neutral-500 text-[10px] block">Typical Seat Budget</span>
                  <span className="font-semibold text-neutral-900 dark:text-white font-mono">
                    ${currentRole.typicalBudgetRange[0]} - ${currentRole.typicalBudgetRange[1]}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Procurement Parameters & Filters */}
          <div className="lg:w-80 border-t lg:border-t-0 lg:border-l border-neutral-200 dark:border-neutral-800 pt-4 lg:pt-0 lg:pl-6 space-y-4">
            <div className="text-xs font-bold text-neutral-900 dark:text-white flex items-center gap-1.5">
              <Sliders className="w-3.5 h-3.5 text-neutral-500" />
              Procurement Constraints
            </div>

            {/* OS Target */}
            <div>
              <label className="text-[11px] font-medium text-neutral-600 dark:text-neutral-400 block mb-1">
                OS Platform Requirement:
              </label>
              <div className="grid grid-cols-3 gap-1">
                <button
                  onClick={() => setSelectedOS('all')}
                  className={`py-1 text-xs text-center rounded-[4px] border transition-colors ${
                    selectedOS === 'all'
                      ? 'bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 border-neutral-900 dark:border-white font-semibold'
                      : 'bg-white dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 border-neutral-300 dark:border-neutral-700'
                  }`}
                >
                  All OS
                </button>
                <button
                  onClick={() => setSelectedOS('windows')}
                  className={`py-1 text-xs text-center rounded-[4px] border transition-colors ${
                    selectedOS === 'windows'
                      ? 'bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 border-neutral-900 dark:border-white font-semibold'
                      : 'bg-white dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 border-neutral-300 dark:border-neutral-700'
                  }`}
                >
                  Windows
                </button>
                <button
                  onClick={() => setSelectedOS('linux')}
                  className={`py-1 text-xs text-center rounded-[4px] border transition-colors ${
                    selectedOS === 'linux'
                      ? 'bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 border-neutral-900 dark:border-white font-semibold'
                      : 'bg-white dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 border-neutral-300 dark:border-neutral-700'
                  }`}
                >
                  Linux
                </button>
              </div>

              {selectedOS === 'macos_coming_soon' && (
                <div className="mt-2 p-2 bg-neutral-100 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded-[4px] text-[11px] text-neutral-600 dark:text-neutral-400">
                  <span className="font-semibold text-neutral-900 dark:text-neutral-200">Notice:</span> macOS devices are queued for Enterprise Wave 2 deployment in Q4. Currently presenting Windows & Linux workstation options.
                </div>
              )}
            </div>

            {/* Target Budget Per Seat Slider */}
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-[11px] font-medium text-neutral-600 dark:text-neutral-400">Budget Per Seat:</span>
                <span className="font-mono font-bold text-neutral-900 dark:text-white">${budgetPerUnit.toLocaleString()}</span>
              </div>
              <input
                type="range"
                min={700}
                max={7500}
                step={100}
                value={budgetPerUnit}
                onChange={(e) => setBudgetPerUnit(Number(e.target.value))}
                className="w-full accent-neutral-800 dark:accent-neutral-200 h-1.5 bg-neutral-200 dark:bg-neutral-700 rounded-[2px]"
              />
              <div className="flex justify-between text-[10px] text-neutral-400 font-mono mt-0.5">
                <span>$700</span>
                <span>$4,000</span>
                <span>$7,500</span>
              </div>
            </div>

            {/* Team Headcount */}
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-[11px] font-medium text-neutral-600 dark:text-neutral-400">Fleet Quantity:</span>
                <span className="font-mono font-bold text-neutral-900 dark:text-white">{teamSize} Seats</span>
              </div>
              <div className="flex gap-1.5">
                {[5, 10, 25, 50, 100].map((count) => (
                  <button
                    key={count}
                    onClick={() => setTeamSize(count)}
                    className={`flex-1 py-1 text-xs rounded-[4px] border font-mono transition-colors ${
                      teamSize === count
                        ? 'bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 border-neutral-900 dark:border-white font-semibold'
                        : 'bg-white dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 border-neutral-300 dark:border-neutral-700'
                    }`}
                  >
                    {count}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Top Matches Section */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <h2 className="text-sm font-bold uppercase tracking-wider text-neutral-900 dark:text-white">
              Recommended Workstations ({evaluatedItems.length} Evaluated)
            </h2>
            <span className="text-xs text-neutral-500">
              Ranked by compute fit, memory headroom & budget adherence
            </span>
          </div>

          <button
            onClick={() => onNavigateToTab('catalog')}
            className="text-xs font-semibold text-neutral-700 dark:text-neutral-300 hover:text-neutral-950 dark:hover:text-white flex items-center gap-1"
          >
            <span>View All in Catalog</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="space-y-3">
          {evaluatedItems.map(({ hardware, score, matchLevel, reasons, bottlenecks }) => {
            const isOptimal = matchLevel === 'Optimal';

            // Calculate bulk price for current team size
            let unitPrice = hardware.pricing.unitMSRP;
            if (teamSize >= 100) unitPrice = hardware.pricing.volume100Price;
            else if (teamSize >= 50) unitPrice = hardware.pricing.volume50Price;
            else if (teamSize >= 10) unitPrice = hardware.pricing.volume10Price;

            const extendedTotal = unitPrice * teamSize;

            return (
              <div
                key={hardware.id}
                className={`bg-white dark:bg-neutral-900 border rounded-[6px] p-4 transition-all ${
                  isOptimal
                    ? 'border-neutral-900 dark:border-neutral-300 shadow-sm'
                    : 'border-neutral-200 dark:border-neutral-800 hover:border-neutral-400 dark:hover:border-neutral-600'
                }`}
              >
                <div className="flex flex-col lg:flex-row justify-between gap-4">
                  {/* Left Column: Specs & Match Score */}
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-2.5">
                      <span className={`px-2 py-0.5 text-xs font-bold rounded-[4px] border ${
                        isOptimal
                          ? 'bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 border-neutral-900 dark:border-white'
                          : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 border-neutral-300 dark:border-neutral-700'
                      }`}>
                        {score}% Match · {matchLevel}
                      </span>
                      <span className="text-xs text-neutral-500 font-medium">
                        {hardware.manufacturer} · {hardware.formFactor}
                      </span>
                      <span className="text-[11px] text-neutral-400 font-mono">
                        {hardware.modelNumber}
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-neutral-900 dark:text-white">
                      {hardware.name}
                    </h3>

                    {/* Hardware Spec Summary Row */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs py-1 text-neutral-700 dark:text-neutral-300">
                      <div>
                        <span className="text-neutral-500 text-[10px] block">CPU:</span>
                        <span className="font-medium truncate block">{hardware.processor.model}</span>
                      </div>
                      <div>
                        <span className="text-neutral-500 text-[10px] block">RAM:</span>
                        <span className="font-medium block">{hardware.memory.capacityGb}GB ({hardware.memory.type})</span>
                      </div>
                      <div>
                        <span className="text-neutral-500 text-[10px] block">GPU:</span>
                        <span className="font-medium truncate block">{hardware.graphics.model}</span>
                      </div>
                      <div>
                        <span className="text-neutral-500 text-[10px] block">OS Supported:</span>
                        <span className="font-medium block uppercase text-[11px]">
                          {hardware.supportedOS.join(' / ')}
                        </span>
                      </div>
                    </div>

                    {/* Reasons & Bottlenecks */}
                    <div className="space-y-1 pt-1 text-xs">
                      {reasons.slice(0, 2).map((reason, idx) => (
                        <div key={idx} className="flex items-center gap-1.5 text-neutral-700 dark:text-neutral-300">
                          <CheckCircle2 className="w-3.5 h-3.5 text-neutral-600 dark:text-neutral-400 shrink-0" />
                          <span>{reason}</span>
                        </div>
                      ))}
                      {bottlenecks.map((bottleneck, idx) => (
                        <div key={idx} className="flex items-center gap-1.5 text-neutral-600 dark:text-neutral-400">
                          <AlertTriangle className="w-3.5 h-3.5 text-neutral-500 shrink-0" />
                          <span>{bottleneck}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Right Column: Pricing & Action Buttons */}
                  <div className="lg:w-72 flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-neutral-200 dark:border-neutral-800 pt-3 lg:pt-0 lg:pl-5 space-y-3">
                    <div>
                      <div className="flex justify-between items-baseline">
                        <span className="text-[11px] text-neutral-500">Unit Price ({teamSize} units):</span>
                        <span className="text-lg font-bold font-mono text-neutral-900 dark:text-white">
                          ${unitPrice.toLocaleString()}
                        </span>
                      </div>
                      {unitPrice < hardware.pricing.unitMSRP && (
                        <div className="text-right text-[10px] text-neutral-500 font-mono">
                          MSRP: ${hardware.pricing.unitMSRP.toLocaleString()} (Volume Discount Applied)
                        </div>
                      )}
                      <div className="flex justify-between items-baseline mt-1 text-xs">
                        <span className="text-neutral-500">Fleet Total ({teamSize}x):</span>
                        <span className="font-mono font-semibold text-neutral-900 dark:text-white">
                          ${extendedTotal.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex justify-between items-baseline text-[11px] text-neutral-400">
                        <span>Est. 3-Yr TCO/seat:</span>
                        <span className="font-mono">${hardware.pricing.estimated3YrTCO.toLocaleString()}</span>
                      </div>
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <button
                        onClick={() => onAddToCart(hardware, hardware.defaultOS, teamSize)}
                        className="w-full py-1.5 px-3 bg-neutral-900 hover:bg-neutral-800 dark:bg-white dark:hover:bg-neutral-100 text-white dark:text-neutral-900 font-semibold text-xs rounded-[4px] transition-colors flex items-center justify-center gap-1.5 shadow-xs"
                      >
                        <ShoppingCart className="w-3.5 h-3.5" />
                        <span>Add {teamSize}x to Fleet Cart</span>
                      </button>
                      <button
                        onClick={() => onSelectItemForDetail(hardware)}
                        className="w-full py-1.5 px-3 bg-neutral-50 hover:bg-neutral-100 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-neutral-800 dark:text-neutral-200 text-xs rounded-[4px] border border-neutral-300 dark:border-neutral-700 transition-colors"
                      >
                        Inspect Full Tech Specs
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
