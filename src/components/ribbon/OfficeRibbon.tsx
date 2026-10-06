import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { JobRoleId, OSPlatform, FormFactor } from '../../types/hardware';
import {
  Save,
  RotateCcw,
  RotateCw,
  FileDown,
  Sun,
  Moon,
  Eye,
  Search,
  ChevronDown,
  ChevronUp,
  Cpu,
  Layers,
  SlidersHorizontal,
  DollarSign,
  ShoppingCart,
  HardDrive,
  Monitor,
  Laptop,
  Box,
  Server,
  Filter,
  CheckCircle,
  HelpCircle,
  User,
  Sparkles,
  Zap
} from 'lucide-react';

export type RibbonTab = 'home' | 'catalog' | 'benchmarks' | 'pricing' | 'cart';

interface OfficeRibbonProps {
  activeTab: RibbonTab;
  setActiveTab: (tab: RibbonTab) => void;
  onOpenFileMenu: () => void;
  selectedRole: JobRoleId;
  setSelectedRole: (role: JobRoleId) => void;
  selectedOS: OSPlatform | 'all';
  setSelectedOS: (os: OSPlatform | 'all') => void;
  selectedFormFactor: FormFactor | 'all';
  setSelectedFormFactor: (ff: FormFactor | 'all') => void;
  onExportCatalog: () => void;
  onExportQuote: () => void;
  onExportBenchmarks: () => void;
  cartCount: number;
}

export const OfficeRibbon: React.FC<OfficeRibbonProps> = ({
  activeTab,
  setActiveTab,
  onOpenFileMenu,
  selectedRole,
  setSelectedRole,
  selectedOS,
  setSelectedOS,
  selectedFormFactor,
  setSelectedFormFactor,
  onExportCatalog,
  onExportQuote,
  onExportBenchmarks,
  cartCount
}) => {
  const { currentUser, theme, setTheme, setShowSignInModal } = useAuth();
  const [isRibbonCollapsed, setIsRibbonCollapsed] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);
  const [saveStatus, setSaveStatus] = useState<string>('AutoSaved');

  const handleQuickSave = () => {
    setSaveStatus('Saving...');
    setTimeout(() => {
      setSaveStatus('Saved to Cloud');
      setTimeout(() => setSaveStatus('AutoSaved'), 2500);
    }, 400);
  };

  const handleSearchAction = (action: () => void) => {
    action();
    setSearchQuery('');
    setShowSearchDropdown(false);
  };

  return (
    <div className="w-full bg-neutral-100 dark:bg-neutral-900 border-b border-neutral-300 dark:border-neutral-800 select-none">
      {/* 1. TOP TITLE BAR & QUICK ACCESS TOOLBAR (Classic Office Header) */}
      <div className="bg-neutral-900 text-neutral-200 px-3 py-1.5 flex items-center justify-between text-xs border-b border-neutral-800">
        {/* Left: Quick Access Toolbar */}
        <div className="flex items-center gap-1.5">
          <div className="flex items-center gap-1 bg-neutral-800/80 px-1.5 py-0.5 rounded-[4px] border border-neutral-700">
            <button
              onClick={handleQuickSave}
              title="Save Workbook (Ctrl+S)"
              className="p-1 hover:text-white hover:bg-neutral-700 rounded-[4px] transition-colors"
            >
              <Save className="w-3.5 h-3.5" />
            </button>
            <button
              title="Undo"
              className="p-1 text-neutral-400 hover:text-white hover:bg-neutral-700 rounded-[4px] transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
            <button
              title="Redo"
              className="p-1 text-neutral-400 hover:text-white hover:bg-neutral-700 rounded-[4px] transition-colors"
            >
              <RotateCw className="w-3.5 h-3.5" />
            </button>
            <div className="w-px h-3 bg-neutral-700 mx-0.5" />
            <button
              onClick={onExportCatalog}
              title="Quick Export Matrix to CSV"
              className="p-1 hover:text-white hover:bg-neutral-700 rounded-[4px] transition-colors flex items-center gap-1 text-[11px]"
            >
              <FileDown className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">CSV</span>
            </button>
          </div>

          <span className="hidden lg:inline text-[11px] text-neutral-400 ml-2 font-mono">
            {saveStatus}
          </span>
        </div>

        {/* Center: File Title & "Tell me what you want to do" Search Box */}
        <div className="flex items-center gap-3">
          <div className="hidden md:flex items-center gap-2">
            <span className="font-semibold text-neutral-100 tracking-tight text-xs">
              Hardware_Procurement_Matrix_FY2026.hwx
            </span>
            <span className="text-[10px] bg-neutral-800 px-1.5 py-0.5 rounded-[4px] text-neutral-400 font-mono">
              Workstation Architect
            </span>
          </div>

          {/* Office Command Search (Tell me what you want to do) */}
          <div className="relative w-52 md:w-64">
            <div className="flex items-center bg-neutral-800 border border-neutral-700 rounded-[4px] px-2 py-1 text-neutral-200 focus-within:border-neutral-400">
              <Search className="w-3.5 h-3.5 text-neutral-400 mr-1.5 shrink-0" />
              <input
                type="text"
                value={searchQuery}
                onFocus={() => setShowSearchDropdown(true)}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setShowSearchDropdown(true);
                }}
                placeholder="Tell me what you want to do..."
                className="bg-transparent border-none outline-none text-xs w-full placeholder-neutral-500"
              />
            </div>

            {showSearchDropdown && (
              <div
                className="absolute left-0 right-0 top-full mt-1 bg-neutral-900 border border-neutral-700 shadow-xl rounded-[4px] z-50 p-1 space-y-1 text-xs"
                onMouseLeave={() => setShowSearchDropdown(false)}
              >
                <div className="px-2 py-1 text-[10px] uppercase font-bold text-neutral-400">
                  Quick Ribbon Actions
                </div>
                <button
                  onClick={() => handleSearchAction(() => setActiveTab('home'))}
                  className="w-full text-left px-2 py-1.5 hover:bg-neutral-800 rounded-[4px] flex items-center justify-between"
                >
                  <span>Go to Role Matcher Wizard</span>
                  <span className="text-neutral-500 text-[10px]">Tab: Home</span>
                </button>
                <button
                  onClick={() => handleSearchAction(() => setActiveTab('catalog'))}
                  className="w-full text-left px-2 py-1.5 hover:bg-neutral-800 rounded-[4px] flex items-center justify-between"
                >
                  <span>Browse Full Hardware Catalog</span>
                  <span className="text-neutral-500 text-[10px]">Tab: Catalog</span>
                </button>
                <button
                  onClick={() => handleSearchAction(() => setActiveTab('benchmarks'))}
                  className="w-full text-left px-2 py-1.5 hover:bg-neutral-800 rounded-[4px] flex items-center justify-between"
                >
                  <span>Compare Geekbench & Cinebench Scores</span>
                  <span className="text-neutral-500 text-[10px]">Tab: Benchmarks</span>
                </button>
                <button
                  onClick={() => handleSearchAction(() => setActiveTab('pricing'))}
                  className="w-full text-left px-2 py-1.5 hover:bg-neutral-800 rounded-[4px] flex items-center justify-between"
                >
                  <span>Calculate 3-Year TCO & Bulk Pricing</span>
                  <span className="text-neutral-500 text-[10px]">Tab: Pricing</span>
                </button>
                <button
                  onClick={() => handleSearchAction(onExportCatalog)}
                  className="w-full text-left px-2 py-1.5 hover:bg-neutral-800 rounded-[4px] flex items-center justify-between text-neutral-100"
                >
                  <span className="font-semibold">Export Complete Hardware Database (.CSV)</span>
                  <FileDown className="w-3.5 h-3.5 text-neutral-400" />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Right: Accessibility Theme Toggles, High Contrast & User Profile */}
        <div className="flex items-center gap-2">
          {/* Accessibility & Theme Selector */}
          <div className="flex items-center bg-neutral-800 p-0.5 rounded-[4px] border border-neutral-700">
            <button
              onClick={() => setTheme('light')}
              title="Light Grayscale Theme"
              className={`p-1 rounded-[4px] transition-colors ${
                theme === 'light' ? 'bg-neutral-600 text-white' : 'text-neutral-400 hover:text-white'
              }`}
            >
              <Sun className="w-3 h-3" />
            </button>
            <button
              onClick={() => setTheme('dark')}
              title="Dark Charcoal Mode"
              className={`p-1 rounded-[4px] transition-colors ${
                theme === 'dark' ? 'bg-neutral-600 text-white' : 'text-neutral-400 hover:text-white'
              }`}
            >
              <Moon className="w-3 h-3" />
            </button>
            <button
              onClick={() => setTheme('high-contrast')}
              title="High Contrast Accessibility Mode"
              className={`p-1 rounded-[4px] transition-colors flex items-center gap-1 text-[10px] font-bold px-1.5 ${
                theme === 'high-contrast' ? 'bg-white text-black' : 'text-neutral-300 hover:text-white'
              }`}
            >
              <Eye className="w-3 h-3" />
              <span>HC</span>
            </button>
          </div>

          {/* User Account Capsule */}
          <button
            onClick={() => setShowSignInModal(true)}
            className="flex items-center gap-1.5 px-2 py-1 bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 rounded-[4px] text-neutral-200 transition-colors"
            title="Manage Corporate Identity & Switch Profile"
          >
            <div className="w-4 h-4 bg-neutral-600 text-white rounded-[2px] flex items-center justify-center font-bold text-[9px]">
              {currentUser?.avatarInitials || 'EU'}
            </div>
            <span className="hidden sm:inline text-[11px] font-medium max-w-[100px] truncate">
              {currentUser?.name || 'Sign In'}
            </span>
          </button>
        </div>
      </div>

      {/* 2. RIBBON TAB STRIP */}
      <div className="bg-neutral-200 dark:bg-neutral-950 px-2 flex items-center justify-between border-b border-neutral-300 dark:border-neutral-800">
        <div className="flex items-center">
          {/* Office [File] Backstage Tab */}
          <button
            onClick={onOpenFileMenu}
            className="px-4 py-1.5 bg-neutral-900 hover:bg-neutral-800 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-white font-semibold text-xs rounded-t-[4px] transition-colors mr-2"
          >
            File
          </button>

          {/* Standard Ribbon Tabs */}
          <button
            onClick={() => {
              setActiveTab('home');
              if (isRibbonCollapsed) setIsRibbonCollapsed(false);
            }}
            className={`px-3 py-1.5 text-xs font-medium transition-colors border-b-2 rounded-t-[4px] ${
              activeTab === 'home'
                ? 'bg-neutral-100 dark:bg-neutral-900 text-neutral-900 dark:text-white border-neutral-900 dark:border-white font-semibold'
                : 'border-transparent text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
            }`}
          >
            Role Matcher (Home)
          </button>

          <button
            onClick={() => {
              setActiveTab('catalog');
              if (isRibbonCollapsed) setIsRibbonCollapsed(false);
            }}
            className={`px-3 py-1.5 text-xs font-medium transition-colors border-b-2 rounded-t-[4px] ${
              activeTab === 'catalog'
                ? 'bg-neutral-100 dark:bg-neutral-900 text-neutral-900 dark:text-white border-neutral-900 dark:border-white font-semibold'
                : 'border-transparent text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
            }`}
          >
            Hardware Catalog
          </button>

          <button
            onClick={() => {
              setActiveTab('benchmarks');
              if (isRibbonCollapsed) setIsRibbonCollapsed(false);
            }}
            className={`px-3 py-1.5 text-xs font-medium transition-colors border-b-2 rounded-t-[4px] ${
              activeTab === 'benchmarks'
                ? 'bg-neutral-100 dark:bg-neutral-900 text-neutral-900 dark:text-white border-neutral-900 dark:border-white font-semibold'
                : 'border-transparent text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
            }`}
          >
            Benchmark Lab
          </button>

          <button
            onClick={() => {
              setActiveTab('pricing');
              if (isRibbonCollapsed) setIsRibbonCollapsed(false);
            }}
            className={`px-3 py-1.5 text-xs font-medium transition-colors border-b-2 rounded-t-[4px] ${
              activeTab === 'pricing'
                ? 'bg-neutral-100 dark:bg-neutral-900 text-neutral-900 dark:text-white border-neutral-900 dark:border-white font-semibold'
                : 'border-transparent text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
            }`}
          >
            Pricing & TCO
          </button>

          <button
            onClick={() => {
              setActiveTab('cart');
              if (isRibbonCollapsed) setIsRibbonCollapsed(false);
            }}
            className={`px-3 py-1.5 text-xs font-medium transition-colors border-b-2 rounded-t-[4px] flex items-center gap-1.5 ${
              activeTab === 'cart'
                ? 'bg-neutral-100 dark:bg-neutral-900 text-neutral-900 dark:text-white border-neutral-900 dark:border-white font-semibold'
                : 'border-transparent text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
            }`}
          >
            <ShoppingCart className="w-3.5 h-3.5" />
            <span>Procurement Fleet</span>
            {cartCount > 0 && (
              <span className="text-[10px] bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 px-1.5 py-0.2 rounded-[3px] font-mono">
                {cartCount}
              </span>
            )}
          </button>
        </div>

        {/* Far Right: Ribbon Minimize Toggle */}
        <button
          onClick={() => setIsRibbonCollapsed(!isRibbonCollapsed)}
          className="p-1 text-neutral-500 hover:text-neutral-900 dark:hover:text-white rounded-[4px] transition-colors"
          title={isRibbonCollapsed ? 'Expand Ribbon (Ctrl+F1)' : 'Collapse Ribbon (Ctrl+F1)'}
        >
          {isRibbonCollapsed ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronUp className="w-3.5 h-3.5" />}
        </button>
      </div>

      {/* 3. RIBBON COMMAND CANVAS (Commands & Action Groups) */}
      {!isRibbonCollapsed && (
        <div className="bg-neutral-100 dark:bg-neutral-900 px-3 py-2 flex items-stretch gap-3 overflow-x-auto min-h-[92px]">
          {/* ===================== TAB: HOME ===================== */}
          {activeTab === 'home' && (
            <>
              {/* Group 1: Role Selection */}
              <div className="flex flex-col justify-between pr-3 border-r border-neutral-300 dark:border-neutral-800">
                <div className="flex items-center gap-1.5">
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] text-neutral-500 font-medium">Select Corporate Role:</label>
                    <select
                      value={selectedRole}
                      onChange={(e) => setSelectedRole(e.target.value as JobRoleId)}
                      className="text-xs bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 px-2 py-1 rounded-[4px] text-neutral-900 dark:text-neutral-100 font-medium focus:outline-none"
                    >
                      <option value="software_engineering">Software Engineering & Systems</option>
                      <option value="data_science_ai">Data Science & Local AI</option>
                      <option value="cad_3d_modeling">3D CAD & Architecture</option>
                      <option value="finance_executive">Finance, Quantitative & Exec</option>
                      <option value="operations_clerical">Operations & Customer Support</option>
                      <option value="devops_sysadmin">DevOps, Cloud & SecOps</option>
                      <option value="video_motion">Video Production & Graphics</option>
                    </select>
                  </div>
                </div>
                <div className="text-[10px] uppercase font-semibold text-neutral-400 dark:text-neutral-500 text-center tracking-wider mt-1">
                  Role Profile
                </div>
              </div>

              {/* Group 2: Operating System Filter */}
              <div className="flex flex-col justify-between px-3 border-r border-neutral-300 dark:border-neutral-800">
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setSelectedOS('all')}
                    className={`px-2 py-1 text-xs rounded-[4px] transition-colors border ${
                      selectedOS === 'all'
                        ? 'bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 border-neutral-900 dark:border-white font-semibold'
                        : 'bg-white dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 border-neutral-300 dark:border-neutral-700 hover:border-neutral-500'
                    }`}
                  >
                    All OS
                  </button>
                  <button
                    onClick={() => setSelectedOS('windows')}
                    className={`px-2 py-1 text-xs rounded-[4px] transition-colors border ${
                      selectedOS === 'windows'
                        ? 'bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 border-neutral-900 dark:border-white font-semibold'
                        : 'bg-white dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 border-neutral-300 dark:border-neutral-700 hover:border-neutral-500'
                    }`}
                  >
                    Windows PC
                  </button>
                  <button
                    onClick={() => setSelectedOS('linux')}
                    className={`px-2 py-1 text-xs rounded-[4px] transition-colors border ${
                      selectedOS === 'linux'
                        ? 'bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 border-neutral-900 dark:border-white font-semibold'
                        : 'bg-white dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 border-neutral-300 dark:border-neutral-700 hover:border-neutral-500'
                    }`}
                  >
                    Linux OS
                  </button>
                  <button
                    onClick={() => setSelectedOS('macos_coming_soon')}
                    title="macOS Enterprise Staging - Coming Q4"
                    className={`px-2 py-1 text-xs rounded-[4px] transition-colors border border-dashed ${
                      selectedOS === 'macos_coming_soon'
                        ? 'bg-neutral-800 text-neutral-300 border-neutral-500 font-semibold'
                        : 'bg-neutral-100 dark:bg-neutral-850 text-neutral-400 border-neutral-300 dark:border-neutral-700 hover:text-neutral-600'
                    }`}
                  >
                    macOS (Q4 Preview)
                  </button>
                </div>
                <div className="text-[10px] uppercase font-semibold text-neutral-400 dark:text-neutral-500 text-center tracking-wider mt-1">
                  OS Platform
                </div>
              </div>

              {/* Group 3: Quick Navigation to Other Modules */}
              <div className="flex flex-col justify-between px-3 border-r border-neutral-300 dark:border-neutral-800">
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => setActiveTab('benchmarks')}
                    className="p-1.5 text-xs bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded-[4px] hover:border-neutral-500 flex items-center gap-1.5"
                  >
                    <Cpu className="w-3.5 h-3.5 text-neutral-500" />
                    <span>View Benchmarks</span>
                  </button>
                  <button
                    onClick={() => setActiveTab('pricing')}
                    className="p-1.5 text-xs bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded-[4px] hover:border-neutral-500 flex items-center gap-1.5"
                  >
                    <DollarSign className="w-3.5 h-3.5 text-neutral-500" />
                    <span>Analyze TCO</span>
                  </button>
                </div>
                <div className="text-[10px] uppercase font-semibold text-neutral-400 dark:text-neutral-500 text-center tracking-wider mt-1">
                  Analysis Views
                </div>
              </div>

              {/* Group 4: CSV Export Action */}
              <div className="flex flex-col justify-between pl-3">
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={onExportCatalog}
                    className="px-3 py-1.5 bg-neutral-900 hover:bg-neutral-800 dark:bg-white dark:hover:bg-neutral-100 text-white dark:text-neutral-900 font-semibold text-xs rounded-[4px] transition-colors flex items-center gap-1.5 shadow-xs"
                  >
                    <FileDown className="w-3.5 h-3.5" />
                    <span>Export Matrix to CSV</span>
                  </button>
                </div>
                <div className="text-[10px] uppercase font-semibold text-neutral-400 dark:text-neutral-500 text-center tracking-wider mt-1">
                  Data Output
                </div>
              </div>
            </>
          )}

          {/* ===================== TAB: HARDWARE CATALOG ===================== */}
          {activeTab === 'catalog' && (
            <>
              {/* Form Factor Group */}
              <div className="flex flex-col justify-between pr-3 border-r border-neutral-300 dark:border-neutral-800">
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setSelectedFormFactor('all')}
                    className={`px-2 py-1 text-xs rounded-[4px] border ${
                      selectedFormFactor === 'all'
                        ? 'bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 border-neutral-900 dark:border-white font-semibold'
                        : 'bg-white dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 border-neutral-300 dark:border-neutral-700'
                    }`}
                  >
                    All Types
                  </button>
                  <button
                    onClick={() => setSelectedFormFactor('Tower Workstation')}
                    className={`px-2 py-1 text-xs rounded-[4px] border flex items-center gap-1 ${
                      selectedFormFactor === 'Tower Workstation'
                        ? 'bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 border-neutral-900 dark:border-white font-semibold'
                        : 'bg-white dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 border-neutral-300 dark:border-neutral-700'
                    }`}
                  >
                    <Monitor className="w-3 h-3" /> Tower
                  </button>
                  <button
                    onClick={() => setSelectedFormFactor('Mobile Workstation (Laptop)')}
                    className={`px-2 py-1 text-xs rounded-[4px] border flex items-center gap-1 ${
                      selectedFormFactor === 'Mobile Workstation (Laptop)'
                        ? 'bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 border-neutral-900 dark:border-white font-semibold'
                        : 'bg-white dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 border-neutral-300 dark:border-neutral-700'
                    }`}
                  >
                    <Laptop className="w-3 h-3" /> Laptop
                  </button>
                  <button
                    onClick={() => setSelectedFormFactor('Compact SFF / Mini-PC')}
                    className={`px-2 py-1 text-xs rounded-[4px] border flex items-center gap-1 ${
                      selectedFormFactor === 'Compact SFF / Mini-PC'
                        ? 'bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 border-neutral-900 dark:border-white font-semibold'
                        : 'bg-white dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 border-neutral-300 dark:border-neutral-700'
                    }`}
                  >
                    <Box className="w-3 h-3" /> Mini-PC
                  </button>
                  <button
                    onClick={() => setSelectedFormFactor('Rackmount Dev Station')}
                    className={`px-2 py-1 text-xs rounded-[4px] border flex items-center gap-1 ${
                      selectedFormFactor === 'Rackmount Dev Station'
                        ? 'bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 border-neutral-900 dark:border-white font-semibold'
                        : 'bg-white dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 border-neutral-300 dark:border-neutral-700'
                    }`}
                  >
                    <Server className="w-3 h-3" /> Rackmount
                  </button>
                </div>
                <div className="text-[10px] uppercase font-semibold text-neutral-400 dark:text-neutral-500 text-center tracking-wider mt-1">
                  Form Factor
                </div>
              </div>

              {/* OS Filter Group */}
              <div className="flex flex-col justify-between px-3 border-r border-neutral-300 dark:border-neutral-800">
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setSelectedOS('all')}
                    className={`px-2 py-1 text-xs rounded-[4px] border ${
                      selectedOS === 'all'
                        ? 'bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 border-neutral-900 dark:border-white font-semibold'
                        : 'bg-white dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 border-neutral-300 dark:border-neutral-700'
                    }`}
                  >
                    All OS
                  </button>
                  <button
                    onClick={() => setSelectedOS('windows')}
                    className={`px-2 py-1 text-xs rounded-[4px] border ${
                      selectedOS === 'windows'
                        ? 'bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 border-neutral-900 dark:border-white font-semibold'
                        : 'bg-white dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 border-neutral-300 dark:border-neutral-700'
                    }`}
                  >
                    Windows
                  </button>
                  <button
                    onClick={() => setSelectedOS('linux')}
                    className={`px-2 py-1 text-xs rounded-[4px] border ${
                      selectedOS === 'linux'
                        ? 'bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 border-neutral-900 dark:border-white font-semibold'
                        : 'bg-white dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 border-neutral-300 dark:border-neutral-700'
                    }`}
                  >
                    Linux
                  </button>
                </div>
                <div className="text-[10px] uppercase font-semibold text-neutral-400 dark:text-neutral-500 text-center tracking-wider mt-1">
                  OS Platform
                </div>
              </div>

              {/* Data Export */}
              <div className="flex flex-col justify-between pl-3">
                <button
                  onClick={onExportCatalog}
                  className="px-3 py-1.5 bg-neutral-900 hover:bg-neutral-800 dark:bg-white dark:hover:bg-neutral-100 text-white dark:text-neutral-900 font-semibold text-xs rounded-[4px] flex items-center gap-1.5"
                >
                  <FileDown className="w-3.5 h-3.5" /> Export Catalog (.CSV)
                </button>
                <div className="text-[10px] uppercase font-semibold text-neutral-400 dark:text-neutral-500 text-center tracking-wider mt-1">
                  Catalog Tools
                </div>
              </div>
            </>
          )}

          {/* ===================== TAB: BENCHMARK LAB ===================== */}
          {activeTab === 'benchmarks' && (
            <>
              <div className="flex flex-col justify-between pr-3 border-r border-neutral-300 dark:border-neutral-800">
                <div className="text-xs text-neutral-700 dark:text-neutral-300 font-medium">
                  Standardized Test Bench: Geekbench 6 · Cinebench R24 · Blender · Linux Kernel · NPU
                </div>
                <div className="text-[10px] uppercase font-semibold text-neutral-400 dark:text-neutral-500 tracking-wider mt-1">
                  Workload Suites
                </div>
              </div>

              <div className="flex flex-col justify-between pl-3">
                <button
                  onClick={onExportBenchmarks}
                  className="px-3 py-1.5 bg-neutral-900 hover:bg-neutral-800 dark:bg-white dark:hover:bg-neutral-100 text-white dark:text-neutral-900 font-semibold text-xs rounded-[4px] flex items-center gap-1.5"
                >
                  <FileDown className="w-3.5 h-3.5" /> Export Benchmarks (.CSV)
                </button>
                <div className="text-[10px] uppercase font-semibold text-neutral-400 dark:text-neutral-500 text-center tracking-wider mt-1">
                  Matrix Output
                </div>
              </div>
            </>
          )}

          {/* ===================== TAB: PRICING & TCO ===================== */}
          {activeTab === 'pricing' && (
            <>
              <div className="flex flex-col justify-between pr-3 border-r border-neutral-300 dark:border-neutral-800">
                <div className="text-xs text-neutral-700 dark:text-neutral-300">
                  Volume Discounts: 10-49 units (-8%) · 50-99 units (-15%) · 100+ units (-22%)
                </div>
                <div className="text-[10px] uppercase font-semibold text-neutral-400 dark:text-neutral-500 tracking-wider mt-1">
                  Discount Tiers
                </div>
              </div>

              <div className="flex flex-col justify-between pl-3">
                <button
                  onClick={onExportCatalog}
                  className="px-3 py-1.5 bg-neutral-900 hover:bg-neutral-800 dark:bg-white dark:hover:bg-neutral-100 text-white dark:text-neutral-900 font-semibold text-xs rounded-[4px] flex items-center gap-1.5"
                >
                  <FileDown className="w-3.5 h-3.5" /> Export Pricing & TCO Model (.CSV)
                </button>
                <div className="text-[10px] uppercase font-semibold text-neutral-400 dark:text-neutral-500 text-center tracking-wider mt-1">
                  Financial Export
                </div>
              </div>
            </>
          )}

          {/* ===================== TAB: FLEET CART ===================== */}
          {activeTab === 'cart' && (
            <>
              <div className="flex flex-col justify-between pr-3 border-r border-neutral-300 dark:border-neutral-800">
                <div className="text-xs text-neutral-700 dark:text-neutral-300">
                  Corporate Procurement Cart ({cartCount} machine lines configured)
                </div>
                <div className="text-[10px] uppercase font-semibold text-neutral-400 dark:text-neutral-500 tracking-wider mt-1">
                  Fleet Summary
                </div>
              </div>

              <div className="flex flex-col justify-between pl-3">
                <button
                  onClick={onExportQuote}
                  disabled={cartCount === 0}
                  className="px-3 py-1.5 bg-neutral-900 hover:bg-neutral-800 dark:bg-white dark:hover:bg-neutral-100 disabled:opacity-50 text-white dark:text-neutral-900 font-semibold text-xs rounded-[4px] flex items-center gap-1.5"
                >
                  <FileDown className="w-3.5 h-3.5" /> Download Official PO Quote (.CSV)
                </button>
                <div className="text-[10px] uppercase font-semibold text-neutral-400 dark:text-neutral-500 text-center tracking-wider mt-1">
                  Purchase Order
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};
