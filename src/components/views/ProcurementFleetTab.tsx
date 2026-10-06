import React from 'react';
import { FleetCartItem, HardwareItem, OSDistribution } from '../../types/hardware';
import { HARDWARE_CATALOG } from '../../data/hardwareCatalog';
import { useAuth } from '../../context/AuthContext';
import {
  ShoppingCart,
  Trash2,
  FileDown,
  Plus,
  Minus,
  CheckCircle2,
  Building,
  ShieldCheck,
  HardDrive,
  RefreshCw,
  Printer
} from 'lucide-react';

interface ProcurementFleetTabProps {
  cart: FleetCartItem[];
  onUpdateQuantity: (index: number, quantity: number) => void;
  onUpdateDepartment: (index: number, department: string) => void;
  onUpdateOS: (index: number, os: OSDistribution) => void;
  onToggleProSupport: (index: number) => void;
  onRemoveItem: (index: number) => void;
  onClearCart: () => void;
  onLoadSampleFleet: () => void;
  onExportQuote: () => void;
  onNavigateToCatalog: () => void;
}

export const ProcurementFleetTab: React.FC<ProcurementFleetTabProps> = ({
  cart,
  onUpdateQuantity,
  onUpdateDepartment,
  onUpdateOS,
  onToggleProSupport,
  onRemoveItem,
  onClearCart,
  onLoadSampleFleet,
  onExportQuote,
  onNavigateToCatalog
}) => {
  const { currentUser } = useAuth();

  // Calculate totals
  let totalUnits = 0;
  let totalMSRP = 0;
  let totalDiscountedHardware = 0;
  let totalSupport = 0;
  let totalEstimatedTco = 0;

  const resolvedLines = cart.map((line, idx) => {
    const hw = HARDWARE_CATALOG.find((item) => item.id === line.hardwareId);
    if (!hw) return null;

    totalUnits += line.quantity;

    // Determine volume unit price based on line quantity
    let unitPrice = hw.pricing.unitMSRP;
    if (line.quantity >= 100) unitPrice = hw.pricing.volume100Price;
    else if (line.quantity >= 50) unitPrice = hw.pricing.volume50Price;
    else if (line.quantity >= 10) unitPrice = hw.pricing.volume10Price;

    const lineMSRP = hw.pricing.unitMSRP * line.quantity;
    const lineHardwarePrice = unitPrice * line.quantity;
    const lineSupportPrice = line.include3YrProSupport ? hw.pricing.proSupport3Year * line.quantity : 0;
    const lineTco = hw.pricing.estimated3YrTCO * line.quantity;

    totalMSRP += lineMSRP;
    totalDiscountedHardware += lineHardwarePrice;
    totalSupport += lineSupportPrice;
    totalEstimatedTco += lineTco;

    return {
      line,
      hw,
      unitPrice,
      lineMSRP,
      lineHardwarePrice,
      lineSupportPrice,
      lineTotal: lineHardwarePrice + lineSupportPrice,
      lineTco,
      index: idx
    };
  }).filter(Boolean);

  const totalSavings = totalMSRP - totalDiscountedHardware;
  const grandTotal = totalDiscountedHardware + totalSupport;

  if (cart.length === 0) {
    return (
      <div className="bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-800 rounded-[6px] p-10 text-center space-y-4 max-w-xl mx-auto my-8 shadow-xs">
        <div className="w-12 h-12 bg-neutral-100 dark:bg-neutral-800 rounded-[4px] flex items-center justify-center mx-auto text-neutral-500">
          <ShoppingCart className="w-6 h-6" />
        </div>
        <h2 className="text-lg font-bold text-neutral-900 dark:text-white">
          Corporate Procurement Cart is Empty
        </h2>
        <p className="text-xs text-neutral-500 leading-relaxed max-w-md mx-auto">
          No hardware line items configured yet. You can build your fleet from the Role Matcher, browse the catalog, or populate our verified enterprise multi-department template.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-2 pt-2">
          <button
            onClick={onLoadSampleFleet}
            className="px-4 py-2 bg-neutral-900 hover:bg-neutral-800 dark:bg-white dark:hover:bg-neutral-100 text-white dark:text-neutral-900 text-xs font-semibold rounded-[4px] transition-colors flex items-center justify-center gap-1.5 shadow-xs"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Load Sample Corporate Fleet (45 Seats)</span>
          </button>
          <button
            onClick={onNavigateToCatalog}
            className="px-4 py-2 bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-neutral-800 dark:text-neutral-200 text-xs font-medium rounded-[4px] border border-neutral-300 dark:border-neutral-700 transition-colors"
          >
            Browse Hardware Catalog
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* 1. Procurement Order Header & Status Bar */}
      <div className="bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-800 rounded-[6px] p-5 shadow-xs">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 pb-4 border-b border-neutral-200 dark:border-neutral-800">
          <div>
            <div className="text-[11px] font-bold uppercase tracking-wider text-neutral-500">
              Procurement & Requisition Summary
            </div>
            <h1 className="text-xl font-bold tracking-tight text-neutral-900 dark:text-white mt-0.5">
              Enterprise Fleet Requisition Order
            </h1>
            <div className="text-xs text-neutral-500 mt-1 flex flex-wrap items-center gap-2">
              <span>Client: <strong className="text-neutral-800 dark:text-neutral-200">{currentUser?.companyName || 'Corporate Client'}</strong></span>
              <span>·</span>
              <span>Requisitioner: <strong className="text-neutral-800 dark:text-neutral-200">{currentUser?.name}</strong> ({currentUser?.roleTitle})</span>
              <span>·</span>
              <span className="font-mono text-neutral-400">PO-REF: 2026-HWX-{Date.now().toString().slice(-5)}</span>
            </div>
          </div>

          <div className="flex items-center gap-2 self-end lg:self-auto">
            <button
              onClick={onClearCart}
              className="px-3 py-1.5 text-xs text-neutral-600 dark:text-neutral-400 hover:text-neutral-950 dark:hover:text-white rounded-[4px] border border-neutral-300 dark:border-neutral-700 flex items-center gap-1.5"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear Cart</span>
            </button>
            <button
              onClick={onExportQuote}
              className="px-4 py-1.5 bg-neutral-900 hover:bg-neutral-800 dark:bg-white dark:hover:bg-neutral-100 text-white dark:text-neutral-900 text-xs font-semibold rounded-[4px] flex items-center gap-1.5 shadow-xs"
            >
              <FileDown className="w-3.5 h-3.5" />
              <span>Export Official PO Quote (.CSV)</span>
            </button>
          </div>
        </div>

        {/* Requisition Key Metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 text-xs">
          <div className="p-3 bg-neutral-50 dark:bg-neutral-800/60 border border-neutral-200 dark:border-neutral-700/60 rounded-[4px]">
            <span className="text-neutral-500 text-[11px] block">Total Fleet Size</span>
            <span className="text-xl font-bold font-mono text-neutral-900 dark:text-white mt-0.5 block">
              {totalUnits} Units
            </span>
          </div>

          <div className="p-3 bg-neutral-50 dark:bg-neutral-800/60 border border-neutral-200 dark:border-neutral-700/60 rounded-[4px]">
            <span className="text-neutral-500 text-[11px] block">Hardware Acquisition (CapEx)</span>
            <span className="text-xl font-bold font-mono text-neutral-900 dark:text-white mt-0.5 block">
              ${totalDiscountedHardware.toLocaleString()}
            </span>
            {totalSavings > 0 && (
              <span className="text-[10px] text-neutral-500 font-mono">
                Saved ${totalSavings.toLocaleString()} in bulk discounts
              </span>
            )}
          </div>

          <div className="p-3 bg-neutral-50 dark:bg-neutral-800/60 border border-neutral-200 dark:border-neutral-700/60 rounded-[4px]">
            <span className="text-neutral-500 text-[11px] block">3-Yr ProSupport (NBD)</span>
            <span className="text-xl font-bold font-mono text-neutral-900 dark:text-white mt-0.5 block">
              ${totalSupport.toLocaleString()}
            </span>
          </div>

          <div className="p-3 bg-neutral-50 dark:bg-neutral-800/60 border border-neutral-200 dark:border-neutral-700/60 rounded-[4px]">
            <span className="text-neutral-500 text-[11px] block">Estimated 3-Yr TCO Total</span>
            <span className="text-xl font-bold font-mono text-neutral-900 dark:text-white mt-0.5 block">
              ${totalEstimatedTco.toLocaleString()}
            </span>
          </div>
        </div>
      </div>

      {/* 2. Line Items Table */}
      <div className="bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-800 rounded-[6px] overflow-hidden shadow-xs">
        <div className="p-3 bg-neutral-100 dark:bg-neutral-950 border-b border-neutral-300 dark:border-neutral-800 flex justify-between items-center text-xs">
          <span className="font-bold text-neutral-900 dark:text-white">
            Allocated Hardware Lines ({cart.length} Models)
          </span>
          <button
            onClick={onNavigateToCatalog}
            className="text-neutral-700 dark:text-neutral-300 hover:text-neutral-950 dark:hover:text-white font-medium flex items-center gap-1"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add More Hardware</span>
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-neutral-300 dark:border-neutral-800 text-[11px] font-semibold text-neutral-600 dark:text-neutral-400">
                <th className="py-2.5 px-3">Item # & Hardware Model</th>
                <th className="py-2.5 px-3">Department Allocation</th>
                <th className="py-2.5 px-3">Selected OS Image</th>
                <th className="py-2.5 px-3 text-center">3-Yr Support</th>
                <th className="py-2.5 px-3 text-center">Quantity</th>
                <th className="py-2.5 px-3 text-right">Applied Unit Price</th>
                <th className="py-2.5 px-3 text-right font-bold">Line Total</th>
                <th className="py-2.5 px-3 text-center">Remove</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-200 dark:divide-neutral-800">
              {resolvedLines.map((itemRow, i) => {
                if (!itemRow) return null;
                const { line, hw, unitPrice, lineTotal, index } = itemRow;

                return (
                  <tr key={index} className="hover:bg-neutral-50 dark:hover:bg-neutral-800/50">
                    <td className="py-3 px-3">
                      <div className="font-semibold text-neutral-900 dark:text-neutral-100">
                        {hw.name}
                      </div>
                      <div className="text-[10px] text-neutral-500">
                        {hw.manufacturer} · {hw.formFactor} · <span className="font-mono">{hw.modelNumber}</span>
                      </div>
                    </td>

                    <td className="py-3 px-3">
                      <input
                        type="text"
                        value={line.department}
                        onChange={(e) => onUpdateDepartment(index, e.target.value)}
                        placeholder="e.g. Engineering"
                        className="bg-neutral-50 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 px-2 py-1 rounded-[4px] text-xs text-neutral-900 dark:text-neutral-100 w-36 focus:outline-none"
                      />
                    </td>

                    <td className="py-3 px-3">
                      <select
                        value={line.selectedOS}
                        onChange={(e) => onUpdateOS(index, e.target.value as OSDistribution)}
                        className="bg-neutral-50 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 px-2 py-1 rounded-[4px] text-xs text-neutral-900 dark:text-neutral-100 focus:outline-none"
                      >
                        {hw.availableOSOptions.map((os) => (
                          <option key={os} value={os}>
                            {os}
                          </option>
                        ))}
                      </select>
                    </td>

                    <td className="py-3 px-3 text-center">
                      <button
                        onClick={() => onToggleProSupport(index)}
                        className={`px-2 py-0.5 text-[11px] rounded-[4px] border transition-colors ${
                          line.include3YrProSupport
                            ? 'bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 border-neutral-900 dark:border-white font-medium'
                            : 'bg-neutral-50 dark:bg-neutral-800 text-neutral-500 border-neutral-300 dark:border-neutral-700'
                        }`}
                      >
                        {line.include3YrProSupport ? `+$${hw.pricing.proSupport3Year}` : 'Omit'}
                      </button>
                    </td>

                    <td className="py-3 px-3">
                      <div className="flex items-center justify-center gap-1">
                        <button
                          onClick={() => onUpdateQuantity(index, line.quantity - 1)}
                          className="w-6 h-6 border border-neutral-300 dark:border-neutral-700 rounded-[4px] flex items-center justify-center hover:bg-neutral-200 dark:hover:bg-neutral-700"
                        >
                          <Minus className="w-3 h-3 text-neutral-600 dark:text-neutral-400" />
                        </button>
                        <span className="w-8 text-center font-mono font-bold text-neutral-900 dark:text-neutral-100 text-xs">
                          {line.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(index, line.quantity + 1)}
                          className="w-6 h-6 border border-neutral-300 dark:border-neutral-700 rounded-[4px] flex items-center justify-center hover:bg-neutral-200 dark:hover:bg-neutral-700"
                        >
                          <Plus className="w-3 h-3 text-neutral-600 dark:text-neutral-400" />
                        </button>
                      </div>
                    </td>

                    <td className="py-3 px-3 text-right font-mono text-neutral-800 dark:text-neutral-200">
                      <div>${unitPrice.toLocaleString()}</div>
                      {line.quantity >= 10 && (
                        <div className="text-[10px] text-neutral-500 font-mono">
                          MSRP: ${hw.pricing.unitMSRP.toLocaleString()}
                        </div>
                      )}
                    </td>

                    <td className="py-3 px-3 text-right font-mono font-bold text-neutral-900 dark:text-white">
                      ${lineTotal.toLocaleString()}
                    </td>

                    <td className="py-3 px-3 text-center">
                      <button
                        onClick={() => onRemoveItem(index)}
                        className="text-neutral-400 hover:text-neutral-700 dark:hover:text-white p-1 rounded-[4px]"
                        title="Remove item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Order Bottom Action Bar */}
        <div className="p-4 bg-neutral-100 dark:bg-neutral-950 border-t border-neutral-300 dark:border-neutral-800 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <div className="text-xs text-neutral-500">
            Exporting generates a clean, enterprise-compliant CSV purchase schedule with full billing breakdowns.
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right">
              <span className="text-[11px] text-neutral-500 block">Grand Total Requisition:</span>
              <span className="text-lg font-bold font-mono text-neutral-900 dark:text-white">
                ${grandTotal.toLocaleString()}
              </span>
            </div>

            <button
              onClick={onExportQuote}
              className="px-4 py-2 bg-neutral-900 hover:bg-neutral-800 dark:bg-white dark:hover:bg-neutral-100 text-white dark:text-neutral-900 text-xs font-semibold rounded-[4px] flex items-center gap-1.5 shadow-xs"
            >
              <FileDown className="w-4 h-4" />
              <span>Download CSV Quote</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
