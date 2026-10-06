import React, { useState } from 'react';
import { HARDWARE_CATALOG } from '../../data/hardwareCatalog';
import { HardwareItem } from '../../types/hardware';
import {
  DollarSign,
  Zap,
  ShieldCheck,
  FileDown,
  Calculator,
  Building,
  TrendingDown,
  Info
} from 'lucide-react';

interface PricingTcoTabProps {
  onExportCatalog: () => void;
  onSelectItemForDetail: (item: HardwareItem) => void;
}

export const PricingTcoTab: React.FC<PricingTcoTabProps> = ({
  onExportCatalog,
  onSelectItemForDetail
}) => {
  const [fleetSize, setFleetSize] = useState<number>(25);
  const [electricityCostPerKwh, setElectricityCostPerKwh] = useState<number>(0.14);
  const [operationalHoursPerDay, setOperationalHoursPerDay] = useState<number>(8); // 8h vs 24h
  const [includeProSupport, setIncludeProSupport] = useState<boolean>(true);

  // Dynamic TCO calculation for an item
  const calculateItemTCO = (item: HardwareItem) => {
    // 1. Hardware Unit price based on volume
    let unitPrice = item.pricing.unitMSRP;
    if (fleetSize >= 100) unitPrice = item.pricing.volume100Price;
    else if (fleetSize >= 50) unitPrice = item.pricing.volume50Price;
    else if (fleetSize >= 10) unitPrice = item.pricing.volume10Price;

    const totalHardwareCapEx = unitPrice * fleetSize;

    // 2. Power over 3 years (250 workdays/yr * 3 yrs = 750 days)
    const totalOperatingHours = 750 * operationalHoursPerDay;
    const powerKwhPerUnit = (item.pricing.avgPowerWatts * totalOperatingHours) / 1000;
    const powerCostPerUnit = powerKwhPerUnit * electricityCostPerKwh;
    const totalPowerOpEx = powerCostPerUnit * fleetSize;

    // 3. Warranty Support
    const supportPerUnit = includeProSupport ? item.pricing.proSupport3Year : 0;
    const totalSupportOpEx = supportPerUnit * fleetSize;

    // 4. OS Licensing: Linux is $0, Windows Enterprise is approx $180/seat over 3 years
    const osLicensePerUnit = item.defaultOS.includes('Windows') ? 180 : 0;
    const totalOsOpEx = osLicensePerUnit * fleetSize;

    const grandTCO = totalHardwareCapEx + totalPowerOpEx + totalSupportOpEx + totalOsOpEx;
    const tcoPerSeat = grandTCO / fleetSize;

    return {
      unitPrice,
      totalHardwareCapEx,
      powerCostPerUnit: Math.round(powerCostPerUnit),
      totalPowerOpEx: Math.round(totalPowerOpEx),
      supportPerUnit,
      totalSupportOpEx,
      osLicensePerUnit,
      totalOsOpEx,
      grandTCO: Math.round(grandTCO),
      tcoPerSeat: Math.round(tcoPerSeat)
    };
  };

  return (
    <div className="space-y-6">
      {/* 1. Header & Interactive TCO Simulation Console */}
      <div className="bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-800 rounded-[6px] p-5 shadow-xs">
        <div className="flex flex-col lg:flex-row justify-between gap-6 pb-4 border-b border-neutral-200 dark:border-neutral-800">
          <div>
            <div className="text-[11px] font-bold uppercase tracking-wider text-neutral-500">
              Enterprise Financial Modeling
            </div>
            <h1 className="text-xl font-bold tracking-tight text-neutral-900 dark:text-white mt-0.5">
              Total Cost of Ownership (3-Year TCO) & Volume Matrix
            </h1>
            <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-1 max-w-2xl leading-relaxed">
              Models hardware acquisition CapEx alongside 3-year operating expenditures including electricity draw, 24/7 next-business-day vendor support, and OS licensing differentials.
            </p>
          </div>

          <button
            onClick={onExportCatalog}
            className="px-3 py-1.5 bg-neutral-900 hover:bg-neutral-800 dark:bg-white dark:hover:bg-neutral-100 text-white dark:text-neutral-900 text-xs font-semibold rounded-[4px] flex items-center gap-1.5 self-start shadow-xs"
          >
            <FileDown className="w-3.5 h-3.5" />
            <span>Export Financial Model (.CSV)</span>
          </button>
        </div>

        {/* Interactive Controls */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-5 pt-4 text-xs">
          {/* Fleet Size Slider */}
          <div>
            <div className="flex justify-between items-baseline mb-1">
              <span className="font-semibold text-neutral-700 dark:text-neutral-300">Fleet Deployment Size:</span>
              <span className="font-mono font-bold text-neutral-900 dark:text-white">{fleetSize} Units</span>
            </div>
            <input
              type="range"
              min={1}
              max={200}
              value={fleetSize}
              onChange={(e) => setFleetSize(Number(e.target.value))}
              className="w-full accent-neutral-800 dark:accent-neutral-200 h-1.5 bg-neutral-200 dark:bg-neutral-700 rounded-[2px]"
            />
            <div className="text-[10px] text-neutral-500 mt-1 font-mono">
              Tier:{' '}
              {fleetSize >= 100
                ? 'Volume Tier 3 (-22% discount)'
                : fleetSize >= 50
                ? 'Volume Tier 2 (-15% discount)'
                : fleetSize >= 10
                ? 'Volume Tier 1 (-8% discount)'
                : 'Standard MSRP (1-9 units)'}
            </div>
          </div>

          {/* Electricity Tariff Slider */}
          <div>
            <div className="flex justify-between items-baseline mb-1">
              <span className="font-semibold text-neutral-700 dark:text-neutral-300">Electricity Tariff ($/kWh):</span>
              <span className="font-mono font-bold text-neutral-900 dark:text-white">${electricityCostPerKwh.toFixed(2)}/kWh</span>
            </div>
            <input
              type="range"
              min={0.08}
              max={0.36}
              step={0.01}
              value={electricityCostPerKwh}
              onChange={(e) => setElectricityCostPerKwh(Number(e.target.value))}
              className="w-full accent-neutral-800 dark:accent-neutral-200 h-1.5 bg-neutral-200 dark:bg-neutral-700 rounded-[2px]"
            />
            <div className="text-[10px] text-neutral-500 mt-1">
              US Commercial Average: $0.14/kWh
            </div>
          </div>

          {/* Daily Operational Duty Cycle */}
          <div>
            <span className="font-semibold text-neutral-700 dark:text-neutral-300 block mb-1">
              Operational Duty Cycle:
            </span>
            <div className="grid grid-cols-2 gap-1.5">
              <button
                onClick={() => setOperationalHoursPerDay(8)}
                className={`py-1.5 text-xs rounded-[4px] border transition-colors ${
                  operationalHoursPerDay === 8
                    ? 'bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 border-neutral-900 dark:border-white font-semibold'
                    : 'bg-neutral-50 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 border-neutral-300 dark:border-neutral-700'
                }`}
              >
                8h Workday Shift
              </button>
              <button
                onClick={() => setOperationalHoursPerDay(24)}
                className={`py-1.5 text-xs rounded-[4px] border transition-colors ${
                  operationalHoursPerDay === 24
                    ? 'bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 border-neutral-900 dark:border-white font-semibold'
                    : 'bg-neutral-50 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 border-neutral-300 dark:border-neutral-700'
                }`}
              >
                24h Continuous CI/AI
              </button>
            </div>
          </div>

          {/* Warranty Toggle */}
          <div>
            <span className="font-semibold text-neutral-700 dark:text-neutral-300 block mb-1">
              Enterprise ProSupport:
            </span>
            <button
              onClick={() => setIncludeProSupport(!includeProSupport)}
              className={`w-full py-1.5 text-xs rounded-[4px] border transition-colors flex items-center justify-center gap-1.5 ${
                includeProSupport
                  ? 'bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 border-neutral-900 dark:border-white font-semibold'
                  : 'bg-neutral-50 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 border-neutral-300 dark:border-neutral-700'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>{includeProSupport ? 'Included (3-Yr Onsite NBD)' : 'Omitted (Self-Managed)'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. Linux OS Enterprise Cost Advantage Insight Card */}
      <div className="bg-neutral-100 dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-800 rounded-[6px] p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-xs">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-neutral-900 dark:bg-neutral-800 text-white rounded-[4px] flex items-center justify-center font-bold text-sm">
            OS
          </div>
          <div>
            <h3 className="font-bold text-neutral-900 dark:text-white">
              Enterprise OS Licensing Factor (Windows vs. Linux)
            </h3>
            <p className="text-neutral-600 dark:text-neutral-400 mt-0.5">
              Linux workstations (Ubuntu LTS, Red Hat Enterprise Linux, Debian) carry zero client access license surcharges, saving up to $180 per seat across enterprise developer deployments.
            </p>
          </div>
        </div>

        <div className="text-right shrink-0">
          <div className="font-mono font-bold text-sm text-neutral-900 dark:text-white">
            ${(180 * fleetSize).toLocaleString()}
          </div>
          <div className="text-[10px] text-neutral-500">
            Total potential OS licensing delta for {fleetSize} seats
          </div>
        </div>
      </div>

      {/* 3. High Density TCO & Volume Comparison Table */}
      <div className="bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-800 rounded-[6px] overflow-hidden shadow-xs">
        <div className="p-3 bg-neutral-100 dark:bg-neutral-950 border-b border-neutral-300 dark:border-neutral-800 flex justify-between items-center text-xs">
          <span className="font-bold text-neutral-900 dark:text-white">
            Enterprise Fleet TCO Matrix ({fleetSize} Units Modeled)
          </span>
          <span className="text-neutral-500 text-[11px]">
            Sorted by Total 3-Year TCO per Seat
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-neutral-300 dark:border-neutral-800 text-[11px] font-semibold text-neutral-600 dark:text-neutral-400">
                <th className="py-2.5 px-3">System Model</th>
                <th className="py-2.5 px-3">OS Distribution</th>
                <th className="py-2.5 px-3 text-right">Standard MSRP</th>
                <th className="py-2.5 px-3 text-right">Unit Price ({fleetSize}x)</th>
                <th className="py-2.5 px-3 text-right">Hardware CapEx</th>
                <th className="py-2.5 px-3 text-right">3-Yr Power Draw</th>
                <th className="py-2.5 px-3 text-right">3-Yr Support</th>
                <th className="py-2.5 px-3 text-right">Total Fleet TCO</th>
                <th className="py-2.5 px-3 text-right font-bold">3-Yr TCO / Seat</th>
                <th className="py-2.5 px-3 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-200 dark:divide-neutral-800">
              {[...HARDWARE_CATALOG]
                .map((hw) => ({
                  hw,
                  calc: calculateItemTCO(hw)
                }))
                .sort((a, b) => a.calc.tcoPerSeat - b.calc.tcoPerSeat)
                .map(({ hw, calc }) => (
                  <tr
                    key={hw.id}
                    className="hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-colors"
                  >
                    <td className="py-2.5 px-3">
                      <div className="font-semibold text-neutral-900 dark:text-neutral-100">
                        {hw.name}
                      </div>
                      <div className="text-[10px] text-neutral-500">
                        {hw.manufacturer} · {hw.formFactor}
                      </div>
                    </td>

                    <td className="py-2.5 px-3">
                      <div className="text-[11px] font-medium text-neutral-800 dark:text-neutral-200">
                        {hw.defaultOS}
                      </div>
                      <div className="text-[10px] text-neutral-500 font-mono">
                        {hw.pricing.avgPowerWatts}W active TDP
                      </div>
                    </td>

                    <td className="py-2.5 px-3 text-right font-mono text-neutral-600 dark:text-neutral-400">
                      ${hw.pricing.unitMSRP.toLocaleString()}
                    </td>

                    <td className="py-2.5 px-3 text-right font-mono font-semibold text-neutral-900 dark:text-neutral-100">
                      ${calc.unitPrice.toLocaleString()}
                    </td>

                    <td className="py-2.5 px-3 text-right font-mono text-neutral-800 dark:text-neutral-200">
                      ${calc.totalHardwareCapEx.toLocaleString()}
                    </td>

                    <td className="py-2.5 px-3 text-right font-mono text-neutral-700 dark:text-neutral-300">
                      ${calc.totalPowerOpEx.toLocaleString()}
                    </td>

                    <td className="py-2.5 px-3 text-right font-mono text-neutral-700 dark:text-neutral-300">
                      ${calc.totalSupportOpEx.toLocaleString()}
                    </td>

                    <td className="py-2.5 px-3 text-right font-mono font-bold text-neutral-900 dark:text-white">
                      ${calc.grandTCO.toLocaleString()}
                    </td>

                    <td className="py-2.5 px-3 text-right font-mono font-bold text-neutral-900 dark:text-neutral-100">
                      ${calc.tcoPerSeat.toLocaleString()}
                    </td>

                    <td className="py-2.5 px-3 text-center">
                      <button
                        onClick={() => onSelectItemForDetail(hw)}
                        className="px-2 py-1 bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-800 dark:text-neutral-200 rounded-[4px] text-[11px] border border-neutral-300 dark:border-neutral-700"
                      >
                        Details
                      </button>
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
