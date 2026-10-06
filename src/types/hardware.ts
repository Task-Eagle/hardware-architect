export type OSPlatform = 'windows' | 'linux' | 'dual_boot' | 'macos_coming_soon';

export type OSDistribution =
  | 'Windows 11 Pro'
  | 'Windows 11 Enterprise'
  | 'Windows 10 IoT Enterprise'
  | 'Ubuntu 24.04 LTS'
  | 'Red Hat Enterprise Linux 9'
  | 'Fedora Workstation 40'
  | 'Debian 12 Bookworm'
  | 'Dual Boot (Win11 Pro + Ubuntu 24.04)';

export type FormFactor =
  | 'Tower Workstation'
  | 'Mobile Workstation (Laptop)'
  | 'Compact SFF / Mini-PC'
  | 'Rackmount Dev Station';

export type JobRoleId =
  | 'software_engineering'
  | 'data_science_ai'
  | 'cad_3d_modeling'
  | 'finance_executive'
  | 'operations_clerical'
  | 'devops_sysadmin'
  | 'video_motion';

export interface JobRoleDefinition {
  id: JobRoleId;
  title: string;
  department: string;
  description: string;
  primaryWorkloads: string[];
  recommendedMinRamGb: number;
  recommendedMinCores: number;
  recommendedGpuTier: 'Integrated' | 'Mid-Range Dedicated' | 'High-End Workstation' | 'Dual/Multi-GPU';
  preferredOS: ('windows' | 'linux' | 'dual_boot')[];
  typicalBudgetRange: [number, number];
  priorityMetrics: ('single_thread' | 'multi_thread' | 'gpu_compute' | 'ram_bandwidth' | 'compiling_speed' | 'portability')[];
}

export interface BenchmarkScores {
  geekbenchSingle: number;       // Higher is better (e.g., 2200 - 3350)
  geekbenchMulti: number;        // Higher is better (e.g., 12000 - 41000)
  cinebenchR24Cpu: number;       // Higher is better (e.g., 850 - 2950)
  blenderClassroomSecs: number;  // Lower is better (e.g., 38s - 220s)
  linuxKernelBuildSecs: number;  // Lower is better (e.g., 55s - 310s)
  npuAITops: number;             // Higher is better (e.g., 10 - 75 TOPS)
  passmarkGpu3D: number;         // Higher is better (e.g., 3800 - 34000)
  batteryLifeHours: number | null; // For mobile workstations, null for desktop
}

export interface PricingModel {
  unitMSRP: number;
  volume10Price: number;   // 8% discount (10-49 units)
  volume50Price: number;   // 15% discount (50-99 units)
  volume100Price: number;  // 22% discount (100+ units)
  proSupport3Year: number; // 3-year next-business-day onsite service
  avgPowerWatts: number;   // Active operational power draw
  annualElectricityCost: number; // Based on $0.14/kWh @ 250 work days * 8 hours
  estimated3YrTCO: number; // Hardware + 3yr power + 3yr support + OS entitlement
}

export interface HardwareItem {
  id: string;
  name: string;
  manufacturer: 'Dell' | 'Lenovo' | 'HP' | 'System76' | 'Puget Systems' | 'Framework' | 'Tuxedo Computers' | 'Supermicro';
  modelNumber: string;
  formFactor: FormFactor;
  supportedOS: ('windows' | 'linux' | 'dual_boot')[];
  defaultOS: OSDistribution;
  availableOSOptions: OSDistribution[];
  processor: {
    brand: 'Intel' | 'AMD';
    model: string;
    cores: number;
    threads: number;
    baseClockGhz: number;
    boostClockGhz: number;
    tdpWatts: number;
  };
  memory: {
    capacityGb: number;
    type: string;
    eccSupported: boolean;
    maxSupportedGb: number;
  };
  storage: {
    primary: string;
    expansionSlots: string;
  };
  graphics: {
    brand: 'NVIDIA' | 'AMD' | 'Intel';
    model: string;
    vramGb: number;
    isDiscrete: boolean;
  };
  connectivity: {
    ethernetSpeed: string;
    wifi: string;
    thunderboltOrUsb4: boolean;
    displayOutputs: string;
  };
  chassisInfo: {
    weightKg: number;
    powerSupplyWatts: number;
    dimensionsCm: string;
    warrantyStandardYears: number;
  };
  targetRoles: JobRoleId[];
  workloadFitSummary: string;
  benchmarks: BenchmarkScores;
  pricing: PricingModel;
  stockAvailability: 'In Stock (Fast Ship)' | 'Configure to Order (2-3 Wks)' | 'Enterprise Allocation';
}

export interface FleetCartItem {
  hardwareId: string;
  quantity: number;
  department: string;
  selectedOS: OSDistribution;
  include3YrProSupport: boolean;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  companyName: string;
  roleTitle: string;
  department: string;
  avatarInitials: string;
}

export type ThemeMode = 'light' | 'dark' | 'high-contrast';
