import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { OfficeRibbon, RibbonTab } from './components/ribbon/OfficeRibbon';
import { OfficeBackstage } from './components/ribbon/OfficeBackstage';
import { SignInModal } from './components/auth/SignInModal';
import { HardwareDetailModal } from './components/modals/HardwareDetailModal';
import { RoleMatcherTab } from './components/views/RoleMatcherTab';
import { CatalogTab } from './components/views/CatalogTab';
import { BenchmarkLabTab } from './components/views/BenchmarkLabTab';
import { PricingTcoTab } from './components/views/PricingTcoTab';
import { ProcurementFleetTab } from './components/views/ProcurementFleetTab';
import { HARDWARE_CATALOG } from './data/hardwareCatalog';
import {
  HardwareItem,
  JobRoleId,
  OSPlatform,
  FormFactor,
  FleetCartItem,
  OSDistribution
} from './types/hardware';
import {
  exportHardwareCatalogCsv,
  exportProcurementQuoteCsv,
  exportBenchmarkComparisonCsv
} from './utils/csvExporter';

function MainAppContent() {
  const { currentUser } = useAuth();

  // Navigation & ribbon state
  const [activeTab, setActiveTab] = useState<RibbonTab>('home');
  const [isBackstageOpen, setIsBackstageOpen] = useState(false);

  // Active filters across tabs
  const [selectedRole, setSelectedRole] = useState<JobRoleId>('software_engineering');
  const [selectedOS, setSelectedOS] = useState<OSPlatform | 'all'>('all');
  const [selectedFormFactor, setSelectedFormFactor] = useState<FormFactor | 'all'>('all');

  // Selected hardware modal
  const [detailItem, setDetailItem] = useState<HardwareItem | null>(null);

  // Corporate Fleet Cart
  const [cart, setCart] = useState<FleetCartItem[]>([
    {
      hardwareId: 'lenovo-p8-threadripper',
      quantity: 15,
      department: 'Platform Engineering',
      selectedOS: 'Ubuntu 24.04 LTS',
      include3YrProSupport: true
    },
    {
      hardwareId: 'lenovo-thinkpad-p16-g2',
      quantity: 10,
      department: 'Architecture & Field CAD',
      selectedOS: 'Windows 11 Pro',
      include3YrProSupport: true
    },
    {
      hardwareId: 'system76-thelio-mega',
      quantity: 4,
      department: 'Data Science & AI Lab',
      selectedOS: 'Ubuntu 24.04 LTS',
      include3YrProSupport: true
    }
  ]);

  // Cart actions
  const handleAddToCart = (item: HardwareItem, os: OSDistribution, quantity = 1) => {
    setCart((prev) => {
      const existingIdx = prev.findIndex(
        (c) => c.hardwareId === item.id && c.selectedOS === os
      );
      if (existingIdx >= 0) {
        const next = [...prev];
        next[existingIdx] = {
          ...next[existingIdx],
          quantity: next[existingIdx].quantity + quantity
        };
        return next;
      }
      return [
        ...prev,
        {
          hardwareId: item.id,
          quantity,
          department: 'Corporate IT Fleet',
          selectedOS: os,
          include3YrProSupport: true
        }
      ];
    });
  };

  const handleUpdateQuantity = (index: number, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveItem(index);
      return;
    }
    setCart((prev) => {
      const next = [...prev];
      next[index] = { ...next[index], quantity };
      return next;
    });
  };

  const handleUpdateDepartment = (index: number, department: string) => {
    setCart((prev) => {
      const next = [...prev];
      next[index] = { ...next[index], department };
      return next;
    });
  };

  const handleUpdateOS = (index: number, os: OSDistribution) => {
    setCart((prev) => {
      const next = [...prev];
      next[index] = { ...next[index], selectedOS: os };
      return next;
    });
  };

  const handleToggleProSupport = (index: number) => {
    setCart((prev) => {
      const next = [...prev];
      next[index] = {
        ...next[index],
        include3YrProSupport: !next[index].include3YrProSupport
      };
      return next;
    });
  };

  const handleRemoveItem = (index: number) => {
    setCart((prev) => prev.filter((_, i) => i !== index));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  const handleLoadSampleFleet = () => {
    setCart([
      {
        hardwareId: 'lenovo-p8-threadripper',
        quantity: 20,
        department: 'Backend Engineering',
        selectedOS: 'Ubuntu 24.04 LTS',
        include3YrProSupport: true
      },
      {
        hardwareId: 'dell-prec-7960',
        quantity: 5,
        department: 'AI & Machine Learning',
        selectedOS: 'Red Hat Enterprise Linux 9',
        include3YrProSupport: true
      },
      {
        hardwareId: 'lenovo-thinkpad-p16-g2',
        quantity: 15,
        department: 'Field Systems & CAD',
        selectedOS: 'Windows 11 Pro',
        include3YrProSupport: true
      },
      {
        hardwareId: 'hp-elite-mini-800',
        quantity: 25,
        department: 'Customer Operations',
        selectedOS: 'Windows 11 Pro',
        include3YrProSupport: false
      }
    ]);
  };

  // CSV Export handlers
  const handleExportCatalog = () => {
    exportHardwareCatalogCsv(HARDWARE_CATALOG);
  };

  const handleExportQuote = () => {
    exportProcurementQuoteCsv(
      cart,
      HARDWARE_CATALOG,
      currentUser?.companyName || 'Corporate Client'
    );
  };

  const handleExportBenchmarks = () => {
    exportBenchmarkComparisonCsv(HARDWARE_CATALOG);
  };

  return (
    <div className="min-h-screen bg-neutral-100 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 flex flex-col">
      {/* 1. MICROSOFT OFFICE RIBBON */}
      <OfficeRibbon
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenFileMenu={() => setIsBackstageOpen(true)}
        selectedRole={selectedRole}
        setSelectedRole={setSelectedRole}
        selectedOS={selectedOS}
        setSelectedOS={setSelectedOS}
        selectedFormFactor={selectedFormFactor}
        setSelectedFormFactor={setSelectedFormFactor}
        onExportCatalog={handleExportCatalog}
        onExportQuote={handleExportQuote}
        onExportBenchmarks={handleExportBenchmarks}
        cartCount={cart.reduce((sum, item) => sum + item.quantity, 0)}
      />

      {/* 2. OFFICE BACKSTAGE OVERLAY (when clicking File) */}
      <OfficeBackstage
        isOpen={isBackstageOpen}
        onClose={() => setIsBackstageOpen(false)}
        catalog={HARDWARE_CATALOG}
        cart={cart}
      />

      {/* 3. WORKSPACE MAIN VIEWPORT */}
      <main className="flex-1 max-w-[1440px] w-full mx-auto px-4 py-5">
        {activeTab === 'home' && (
          <RoleMatcherTab
            selectedRole={selectedRole}
            setSelectedRole={setSelectedRole}
            selectedOS={selectedOS}
            setSelectedOS={setSelectedOS}
            onSelectItemForDetail={(item) => setDetailItem(item)}
            onAddToCart={handleAddToCart}
            onNavigateToTab={(tab) => setActiveTab(tab)}
          />
        )}

        {activeTab === 'catalog' && (
          <CatalogTab
            selectedOS={selectedOS}
            setSelectedOS={setSelectedOS}
            selectedFormFactor={selectedFormFactor}
            setSelectedFormFactor={setSelectedFormFactor}
            onSelectItemForDetail={(item) => setDetailItem(item)}
            onAddToCart={handleAddToCart}
            onExportCatalog={handleExportCatalog}
          />
        )}

        {activeTab === 'benchmarks' && (
          <BenchmarkLabTab
            onExportBenchmarks={handleExportBenchmarks}
            onSelectItemForDetail={(item) => setDetailItem(item)}
          />
        )}

        {activeTab === 'pricing' && (
          <PricingTcoTab
            onExportCatalog={handleExportCatalog}
            onSelectItemForDetail={(item) => setDetailItem(item)}
          />
        )}

        {activeTab === 'cart' && (
          <ProcurementFleetTab
            cart={cart}
            onUpdateQuantity={handleUpdateQuantity}
            onUpdateDepartment={handleUpdateDepartment}
            onUpdateOS={handleUpdateOS}
            onToggleProSupport={handleToggleProSupport}
            onRemoveItem={handleRemoveItem}
            onClearCart={handleClearCart}
            onLoadSampleFleet={handleLoadSampleFleet}
            onExportQuote={handleExportQuote}
            onNavigateToCatalog={() => setActiveTab('catalog')}
          />
        )}
      </main>

      {/* 4. OFFICE STATUS BAR (Bottom) */}
      <footer className="bg-neutral-200 dark:bg-neutral-900 border-t border-neutral-300 dark:border-neutral-800 px-4 py-1.5 flex items-center justify-between text-[11px] text-neutral-600 dark:text-neutral-400 select-none">
        <div className="flex items-center gap-3">
          <span>Ready</span>
          <span>·</span>
          <span>
            {currentUser?.companyName || 'Enterprise'} · {currentUser?.roleTitle || 'Procurement'}
          </span>
          <span>·</span>
          <span className="hidden sm:inline">Windows & Linux Workstations Only (macOS Staged Q4)</span>
        </div>

        <div className="flex items-center gap-4">
          <span className="font-mono">
            {HARDWARE_CATALOG.length} Configurations Loaded
          </span>
          <span>·</span>
          <span className="font-mono">
            Fleet Cart: {cart.reduce((sum, item) => sum + item.quantity, 0)} Units
          </span>
          <span>·</span>
          <span className="font-mono">100% Zoom</span>
        </div>
      </footer>

      {/* 5. MODALS */}
      <SignInModal />
      <HardwareDetailModal
        item={detailItem}
        onClose={() => setDetailItem(null)}
        onAddToCart={handleAddToCart}
      />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <MainAppContent />
    </AuthProvider>
  );
}
