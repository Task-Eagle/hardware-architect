import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { HardwareItem, FleetCartItem } from '../../types/hardware';
import { exportHardwareCatalogCsv, exportProcurementQuoteCsv, exportBenchmarkComparisonCsv } from '../../utils/csvExporter';
import { ArrowLeft, FileDown, ShieldCheck, UserCheck, HardDrive, Cpu, DollarSign, Printer, Info } from 'lucide-react';

interface OfficeBackstageProps {
  isOpen: boolean;
  onClose: () => void;
  catalog: HardwareItem[];
  cart: FleetCartItem[];
}

export const OfficeBackstage: React.FC<OfficeBackstageProps> = ({ isOpen, onClose, catalog, cart }) => {
  const { currentUser, setShowSignInModal, logout } = useAuth();
  const [activePane, setActivePane] = React.useState<'info' | 'export' | 'account'>('export');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex bg-neutral-900/90 backdrop-blur-xs text-neutral-100 animate-in fade-in duration-150">
      {/* Left Backstage Navigation Rail */}
      <div className="w-64 bg-neutral-950 border-r border-neutral-800 flex flex-col justify-between py-4">
        <div>
          <button
            onClick={onClose}
            className="flex items-center gap-2.5 px-6 py-3 text-neutral-300 hover:text-white hover:bg-neutral-800/60 w-full text-left font-medium text-xs transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Workspace</span>
          </button>

          <div className="px-6 mb-3 text-[10px] font-bold uppercase tracking-wider text-neutral-500">
            File Menu
          </div>

          <div className="space-y-1">
            <button
              onClick={() => setActivePane('info')}
              className={`w-full px-6 py-2.5 text-xs text-left flex items-center gap-2.5 transition-colors ${
                activePane === 'info' ? 'bg-neutral-800 font-semibold text-white' : 'text-neutral-400 hover:bg-neutral-800/40 hover:text-neutral-200'
              }`}
            >
              <Info className="w-4 h-4" />
              <span>Document Information</span>
            </button>
            <button
              onClick={() => setActivePane('export')}
              className={`w-full px-6 py-2.5 text-xs text-left flex items-center gap-2.5 transition-colors ${
                activePane === 'export' ? 'bg-neutral-800 font-semibold text-white' : 'text-neutral-400 hover:bg-neutral-800/40 hover:text-neutral-200'
              }`}
            >
              <FileDown className="w-4 h-4" />
              <span>Export CSV & Reports</span>
            </button>
            <button
              onClick={() => setActivePane('account')}
              className={`w-full px-6 py-2.5 text-xs text-left flex items-center gap-2.5 transition-colors ${
                activePane === 'account' ? 'bg-neutral-800 font-semibold text-white' : 'text-neutral-400 hover:bg-neutral-800/40 hover:text-neutral-200'
              }`}
            >
              <UserCheck className="w-4 h-4" />
              <span>Enterprise Account & Licensing</span>
            </button>
          </div>
        </div>

        <div className="px-6 border-t border-neutral-800 pt-4">
          <div className="text-[11px] text-neutral-500">
            Microsoft 365 Architecture Suite
            <div className="text-[10px] text-neutral-600 font-mono mt-0.5">Build 2026.10-ENT</div>
          </div>
        </div>
      </div>

      {/* Main Backstage Content */}
      <div className="flex-1 bg-neutral-900 p-8 overflow-y-auto">
        {activePane === 'export' && (
          <div className="max-w-3xl space-y-6">
            <div>
              <h2 className="text-xl font-bold tracking-tight text-white">Export to CSV</h2>
              <p className="text-xs text-neutral-400 mt-1">
                Generate formatted RFC 4180 comma-separated value spreadsheets ready for Microsoft Excel, Power BI, or ERP import.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-neutral-950 border border-neutral-800 rounded-[4px] hover:border-neutral-600 transition-colors">
                <div className="flex items-center gap-2 text-white font-semibold text-xs mb-1">
                  <HardDrive className="w-4 h-4 text-neutral-400" />
                  Full Hardware Catalog CSV
                </div>
                <p className="text-[11px] text-neutral-400 mb-3">
                  All {catalog.length} enterprise workstations & PCs with comprehensive processor, RAM, graphics, benchmark scores, volume prices, and TCO estimates.
                </p>
                <button
                  onClick={() => exportHardwareCatalogCsv(catalog)}
                  className="px-3 py-1.5 bg-neutral-100 hover:bg-white text-neutral-950 text-xs font-semibold rounded-[4px] transition-colors flex items-center gap-1.5"
                >
                  <FileDown className="w-3.5 h-3.5" /> Download Catalog CSV
                </button>
              </div>

              <div className="p-4 bg-neutral-950 border border-neutral-800 rounded-[4px] hover:border-neutral-600 transition-colors">
                <div className="flex items-center gap-2 text-white font-semibold text-xs mb-1">
                  <DollarSign className="w-4 h-4 text-neutral-400" />
                  Procurement Quote & PO CSV
                </div>
                <p className="text-[11px] text-neutral-400 mb-3">
                  Export current fleet cart ({cart.reduce((acc, c) => acc + c.quantity, 0)} units) with departmental allocations, volume discounts, and 3-year TCO totals.
                </p>
                <button
                  onClick={() => exportProcurementQuoteCsv(cart, catalog, currentUser?.companyName || 'Corporate Client')}
                  className="px-3 py-1.5 bg-neutral-100 hover:bg-white text-neutral-950 text-xs font-semibold rounded-[4px] transition-colors flex items-center gap-1.5"
                >
                  <FileDown className="w-3.5 h-3.5" /> Download Procurement Quote CSV
                </button>
              </div>

              <div className="p-4 bg-neutral-950 border border-neutral-800 rounded-[4px] hover:border-neutral-600 transition-colors">
                <div className="flex items-center gap-2 text-white font-semibold text-xs mb-1">
                  <Cpu className="w-4 h-4 text-neutral-400" />
                  Benchmark Comparison Matrix CSV
                </div>
                <p className="text-[11px] text-neutral-400 mb-3">
                  Standardized Geekbench 6, Cinebench R24, Blender 3D render times, Linux Kernel build speeds, and AI TOPS ranking for all hardware models.
                </p>
                <button
                  onClick={() => exportBenchmarkComparisonCsv(catalog)}
                  className="px-3 py-1.5 bg-neutral-100 hover:bg-white text-neutral-950 text-xs font-semibold rounded-[4px] transition-colors flex items-center gap-1.5"
                >
                  <FileDown className="w-3.5 h-3.5" /> Download Benchmarks CSV
                </button>
              </div>

              <div className="p-4 bg-neutral-950 border border-neutral-800 rounded-[4px] hover:border-neutral-600 transition-colors">
                <div className="flex items-center gap-2 text-white font-semibold text-xs mb-1">
                  <Printer className="w-4 h-4 text-neutral-400" />
                  Print / Save PDF Specification
                </div>
                <p className="text-[11px] text-neutral-400 mb-3">
                  Format current screen layout for standard A4 / US Letter landscape print or system PDF export with clean grayscale typography.
                </p>
                <button
                  onClick={() => window.print()}
                  className="px-3 py-1.5 bg-neutral-800 hover:bg-neutral-700 text-white text-xs font-semibold rounded-[4px] transition-colors flex items-center gap-1.5"
                >
                  <Printer className="w-3.5 h-3.5" /> Print Layout
                </button>
              </div>
            </div>
          </div>
        )}

        {activePane === 'info' && (
          <div className="max-w-2xl space-y-5">
            <h2 className="text-xl font-bold tracking-tight text-white">Document Information</h2>
            <div className="p-4 bg-neutral-950 border border-neutral-800 rounded-[4px] space-y-3 text-xs">
              <div className="flex justify-between py-1 border-b border-neutral-800">
                <span className="text-neutral-400">File Name</span>
                <span className="font-mono text-white">Hardware_Procurement_Matrix_FY2026.hwx</span>
              </div>
              <div className="flex justify-between py-1 border-b border-neutral-800">
                <span className="text-neutral-400">Location</span>
                <span className="text-white">SharePoint / Corporate Technology / Procurement</span>
              </div>
              <div className="flex justify-between py-1 border-b border-neutral-800">
                <span className="text-neutral-400">Supported OS Platforms</span>
                <span className="text-white">Microsoft Windows 11 & Enterprise Linux (Ubuntu/RHEL/Debian)</span>
              </div>
              <div className="flex justify-between py-1 border-b border-neutral-800">
                <span className="text-neutral-400">macOS Support Status</span>
                <span className="text-white">Enterprise Preview Staged (Coming in Q4 Release)</span>
              </div>
              <div className="flex justify-between py-1 border-b border-neutral-800">
                <span className="text-neutral-400">Catalog Size</span>
                <span className="text-white">{catalog.length} Certified Enterprise Configurations</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-neutral-400">Data Revision</span>
                <span className="font-mono text-white">2026.Q4-REV-8</span>
              </div>
            </div>
          </div>
        )}

        {activePane === 'account' && (
          <div className="max-w-2xl space-y-5">
            <h2 className="text-xl font-bold tracking-tight text-white">Enterprise Account & Subscription</h2>
            <div className="p-5 bg-neutral-950 border border-neutral-800 rounded-[4px] space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-neutral-800 text-white rounded-[4px] flex items-center justify-center font-bold text-base">
                  {currentUser?.avatarInitials || 'EU'}
                </div>
                <div>
                  <div className="font-bold text-sm text-white">{currentUser?.name || 'Enterprise Guest'}</div>
                  <div className="text-xs text-neutral-400">{currentUser?.email}</div>
                  <div className="text-xs text-neutral-500 font-mono mt-0.5">
                    {currentUser?.roleTitle} · {currentUser?.companyName}
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-neutral-800 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2 text-neutral-300">
                  <ShieldCheck className="w-4 h-4 text-neutral-400" />
                  <span>Licensed for Enterprise Workstation Architecture & Procurement</span>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      onClose();
                      setShowSignInModal(true);
                    }}
                    className="px-3 py-1 bg-neutral-800 hover:bg-neutral-700 text-white text-xs rounded-[4px]"
                  >
                    Switch Account
                  </button>
                  <button
                    onClick={() => {
                      logout();
                      onClose();
                    }}
                    className="px-3 py-1 bg-neutral-800 hover:bg-neutral-700 text-white text-xs rounded-[4px]"
                  >
                    Sign Out
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
