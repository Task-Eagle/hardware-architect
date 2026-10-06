import { HardwareItem } from '../types/hardware';

export const HARDWARE_CATALOG: HardwareItem[] = [
  {
    id: 'dell-prec-7960',
    name: 'Dell Precision 7960 Tower',
    manufacturer: 'Dell',
    modelNumber: 'PREC-7960T-ENT',
    formFactor: 'Tower Workstation',
    supportedOS: ['windows', 'linux'],
    defaultOS: 'Windows 11 Enterprise',
    availableOSOptions: ['Windows 11 Enterprise', 'Ubuntu 24.04 LTS', 'Red Hat Enterprise Linux 9'],
    processor: {
      brand: 'Intel',
      model: 'Xeon w7-3465X (28 Cores / 56 Threads)',
      cores: 28,
      threads: 56,
      baseClockGhz: 2.5,
      boostClockGhz: 4.8,
      tdpWatts: 300
    },
    memory: {
      capacityGb: 128,
      type: 'DDR5-4800 Registered ECC',
      eccSupported: true,
      maxSupportedGb: 1024
    },
    storage: {
      primary: '2TB NVMe PCIe Gen 4 M.2 Enterprise SSD',
      expansionSlots: 'Up to 8x Front-Accessible NVMe bays + 4x SATA'
    },
    graphics: {
      brand: 'NVIDIA',
      model: 'RTX 5000 Ada Generation (32GB GDDR6 ECC)',
      vramGb: 32,
      isDiscrete: true
    },
    connectivity: {
      ethernetSpeed: 'Dual 10GbE + 1GbE onboard',
      wifi: 'Wi-Fi 6E AX211 vPro',
      thunderboltOrUsb4: true,
      displayOutputs: '4x DisplayPort 1.4a'
    },
    chassisInfo: {
      weightKg: 21.5,
      powerSupplyWatts: 1400,
      dimensionsCm: '43.1 x 21.8 x 53.8 cm',
      warrantyStandardYears: 3
    },
    targetRoles: ['data_science_ai', 'cad_3d_modeling', 'video_motion'],
    workloadFitSummary: 'Ultra-heavyweight workstation for enterprise AI model fine-tuning, complex CAD simulations, and 8K visual rendering. Certified for CATIA, Revit, and PyTorch.',
    benchmarks: {
      geekbenchSingle: 2810,
      geekbenchMulti: 34800,
      cinebenchR24Cpu: 2420,
      blenderClassroomSecs: 44,
      linuxKernelBuildSecs: 62,
      npuAITops: 65,
      passmarkGpu3D: 29800,
      batteryLifeHours: null
    },
    pricing: {
      unitMSRP: 5499,
      volume10Price: 5059,
      volume50Price: 4674,
      volume100Price: 4289,
      proSupport3Year: 420,
      avgPowerWatts: 380,
      annualElectricityCost: 106,
      estimated3YrTCO: 6237
    },
    stockAvailability: 'Configure to Order (2-3 Wks)'
  },
  {
    id: 'lenovo-p8-threadripper',
    name: 'Lenovo ThinkStation P8',
    manufacturer: 'Lenovo',
    modelNumber: '30HF-P8-TR',
    formFactor: 'Tower Workstation',
    supportedOS: ['linux', 'windows', 'dual_boot'],
    defaultOS: 'Ubuntu 24.04 LTS',
    availableOSOptions: ['Ubuntu 24.04 LTS', 'Red Hat Enterprise Linux 9', 'Windows 11 Pro', 'Dual Boot (Win11 Pro + Ubuntu 24.04)'],
    processor: {
      brand: 'AMD',
      model: 'Ryzen Threadripper PRO 7965WX (24 Cores / 48 Threads)',
      cores: 24,
      threads: 48,
      baseClockGhz: 4.2,
      boostClockGhz: 5.3,
      tdpWatts: 350
    },
    memory: {
      capacityGb: 64,
      type: 'DDR5-5200 8-Channel ECC RDIMM',
      eccSupported: true,
      maxSupportedGb: 1024
    },
    storage: {
      primary: '2TB PCIe Gen 5 NVMe SSD (12,000 MB/s)',
      expansionSlots: '4x M.2 onboard + 3x 3.5" HDD bays'
    },
    graphics: {
      brand: 'NVIDIA',
      model: 'RTX 4500 Ada Generation (24GB GDDR6 ECC)',
      vramGb: 24,
      isDiscrete: true
    },
    connectivity: {
      ethernetSpeed: '10GbE + 1GbE onboard RJ-45',
      wifi: 'Wi-Fi 6E Intel AX210',
      thunderboltOrUsb4: true,
      displayOutputs: '4x DisplayPort 1.4a'
    },
    chassisInfo: {
      weightKg: 19.8,
      powerSupplyWatts: 1400,
      dimensionsCm: '44.0 x 17.5 x 50.8 cm',
      warrantyStandardYears: 3
    },
    targetRoles: ['software_engineering', 'data_science_ai', 'devops_sysadmin'],
    workloadFitSummary: 'Exceptional compiling throughput and multi-threaded Linux performance. Ideal for large C++/Rust monolithic codebases and continuous CI compilation environments.',
    benchmarks: {
      geekbenchSingle: 2980,
      geekbenchMulti: 36200,
      cinebenchR24Cpu: 2680,
      blenderClassroomSecs: 41,
      linuxKernelBuildSecs: 56,
      npuAITops: 58,
      passmarkGpu3D: 25400,
      batteryLifeHours: null
    },
    pricing: {
      unitMSRP: 4890,
      volume10Price: 4499,
      volume50Price: 4156,
      volume100Price: 3814,
      proSupport3Year: 380,
      avgPowerWatts: 320,
      annualElectricityCost: 90,
      estimated3YrTCO: 5540
    },
    stockAvailability: 'In Stock (Fast Ship)'
  },
  {
    id: 'hp-z4-g5',
    name: 'HP Z4 G5 Workstation',
    manufacturer: 'HP',
    modelNumber: 'Z4G5-PRO-ENG',
    formFactor: 'Tower Workstation',
    supportedOS: ['windows', 'linux', 'dual_boot'],
    defaultOS: 'Windows 11 Pro',
    availableOSOptions: ['Windows 11 Pro', 'Windows 11 Enterprise', 'Ubuntu 24.04 LTS'],
    processor: {
      brand: 'Intel',
      model: 'Core i9-14900K (24 Cores / 32 Threads)',
      cores: 24,
      threads: 32,
      baseClockGhz: 3.2,
      boostClockGhz: 6.0,
      tdpWatts: 253
    },
    memory: {
      capacityGb: 64,
      type: 'DDR5-5600 Dual-Channel',
      eccSupported: false,
      maxSupportedGb: 192
    },
    storage: {
      primary: '2TB PCIe Gen 4 NVMe SSD',
      expansionSlots: '2x M.2 slots + 2x 3.5" internal bays'
    },
    graphics: {
      brand: 'NVIDIA',
      model: 'GeForce RTX 4080 Super (16GB GDDR6X)',
      vramGb: 16,
      isDiscrete: true
    },
    connectivity: {
      ethernetSpeed: 'Dual 2.5GbE onboard',
      wifi: 'Wi-Fi 7 BE200',
      thunderboltOrUsb4: true,
      displayOutputs: '3x DisplayPort 1.4a, 1x HDMI 2.1'
    },
    chassisInfo: {
      weightKg: 13.5,
      powerSupplyWatts: 1000,
      dimensionsCm: '38.6 x 16.9 x 44.5 cm',
      warrantyStandardYears: 3
    },
    targetRoles: ['software_engineering', 'cad_3d_modeling', 'video_motion'],
    workloadFitSummary: 'Top-tier 6.0 GHz single-core boost speed maximizes interactive CAD responsiveness and rapid IDE responsiveness. Outstanding cost-to-performance ratio.',
    benchmarks: {
      geekbenchSingle: 3180,
      geekbenchMulti: 23400,
      cinebenchR24Cpu: 2180,
      blenderClassroomSecs: 48,
      linuxKernelBuildSecs: 79,
      npuAITops: 38,
      passmarkGpu3D: 34200,
      batteryLifeHours: null
    },
    pricing: {
      unitMSRP: 3250,
      volume10Price: 2990,
      volume50Price: 2762,
      volume100Price: 2535,
      proSupport3Year: 290,
      avgPowerWatts: 260,
      annualElectricityCost: 73,
      estimated3YrTCO: 3759
    },
    stockAvailability: 'In Stock (Fast Ship)'
  },
  {
    id: 'system76-thelio-mega',
    name: 'System76 Thelio Mega (Native Linux)',
    manufacturer: 'System76',
    modelNumber: 'THELIO-MEGA-LNX',
    formFactor: 'Tower Workstation',
    supportedOS: ['linux'],
    defaultOS: 'Ubuntu 24.04 LTS',
    availableOSOptions: ['Ubuntu 24.04 LTS', 'Red Hat Enterprise Linux 9', 'Fedora Workstation 40', 'Debian 12 Bookworm'],
    processor: {
      brand: 'AMD',
      model: 'Threadripper PRO 7975WX (32 Cores / 64 Threads)',
      cores: 32,
      threads: 64,
      baseClockGhz: 4.0,
      boostClockGhz: 5.3,
      tdpWatts: 350
    },
    memory: {
      capacityGb: 128,
      type: 'DDR5-5200 8-Channel Registered ECC',
      eccSupported: true,
      maxSupportedGb: 2048
    },
    storage: {
      primary: '4TB PCIe 5.0 NVMe M.2 SSD',
      expansionSlots: 'Up to 8x 2.5" SATA drives + 4x PCIe 5.0 M.2 slots'
    },
    graphics: {
      brand: 'NVIDIA',
      model: 'Dual RTX 4090 Enterprise (48GB Total VRAM)',
      vramGb: 48,
      isDiscrete: true
    },
    connectivity: {
      ethernetSpeed: 'Dual 10G Aquantia AQC113C',
      wifi: 'Wi-Fi 6E',
      thunderboltOrUsb4: false,
      displayOutputs: '6x DisplayPort 1.4a, 2x HDMI 2.1'
    },
    chassisInfo: {
      weightKg: 24.0,
      powerSupplyWatts: 1600,
      dimensionsCm: '47.5 x 25.1 x 43.7 cm',
      warrantyStandardYears: 3
    },
    targetRoles: ['data_science_ai', 'devops_sysadmin'],
    workloadFitSummary: 'Purpose-built open-source hardware workstation handcrafted for deep learning, local LLM fine-tuning, and Linux container operations with verified out-of-the-box drivers.',
    benchmarks: {
      geekbenchSingle: 2990,
      geekbenchMulti: 39500,
      cinebenchR24Cpu: 2890,
      blenderClassroomSecs: 36,
      linuxKernelBuildSecs: 52,
      npuAITops: 75,
      passmarkGpu3D: 37500,
      batteryLifeHours: null
    },
    pricing: {
      unitMSRP: 6950,
      volume10Price: 6394,
      volume50Price: 5907,
      volume100Price: 5421,
      proSupport3Year: 490,
      avgPowerWatts: 420,
      annualElectricityCost: 118,
      estimated3YrTCO: 7794
    },
    stockAvailability: 'Configure to Order (2-3 Wks)'
  },
  {
    id: 'lenovo-thinkpad-p16-g2',
    name: 'Lenovo ThinkPad P16 Gen 2',
    manufacturer: 'Lenovo',
    modelNumber: '21FA-P16G2-MBL',
    formFactor: 'Mobile Workstation (Laptop)',
    supportedOS: ['windows', 'linux', 'dual_boot'],
    defaultOS: 'Windows 11 Pro',
    availableOSOptions: ['Windows 11 Pro', 'Windows 11 Enterprise', 'Ubuntu 24.04 LTS', 'Red Hat Enterprise Linux 9'],
    processor: {
      brand: 'Intel',
      model: 'Core i9-14900HX (24 Cores / 32 Threads)',
      cores: 24,
      threads: 32,
      baseClockGhz: 2.2,
      boostClockGhz: 5.8,
      tdpWatts: 55
    },
    memory: {
      capacityGb: 64,
      type: 'DDR5-5600 SODIMM (2 of 4 slots populated)',
      eccSupported: true,
      maxSupportedGb: 192
    },
    storage: {
      primary: '2TB PCIe Gen 4 Performance M.2 SSD',
      expansionSlots: '2x M.2 2280 PCIe Gen 4 slots total'
    },
    graphics: {
      brand: 'NVIDIA',
      model: 'RTX 3500 Ada Generation (12GB GDDR6)',
      vramGb: 12,
      isDiscrete: true
    },
    connectivity: {
      ethernetSpeed: '2.5GbE RJ-45 (via included dongle)',
      wifi: 'Wi-Fi 6E AX211 vPro',
      thunderboltOrUsb4: true,
      displayOutputs: '2x Thunderbolt 4, 1x HDMI 2.1'
    },
    chassisInfo: {
      weightKg: 2.95,
      powerSupplyWatts: 230,
      dimensionsCm: '36.4 x 26.6 x 3.0 cm',
      warrantyStandardYears: 3
    },
    targetRoles: ['software_engineering', 'cad_3d_modeling', 'video_motion'],
    workloadFitSummary: 'Heavy-duty desktop replacement laptop with MIL-STD-810H durability, 16" 4K OLED display option, and certified ISV graphics for engineers on job sites.',
    benchmarks: {
      geekbenchSingle: 2920,
      geekbenchMulti: 19800,
      cinebenchR24Cpu: 1680,
      blenderClassroomSecs: 72,
      linuxKernelBuildSecs: 104,
      npuAITops: 32,
      passmarkGpu3D: 18900,
      batteryLifeHours: 6.8
    },
    pricing: {
      unitMSRP: 3190,
      volume10Price: 2935,
      volume50Price: 2711,
      volume100Price: 2488,
      proSupport3Year: 280,
      avgPowerWatts: 110,
      annualElectricityCost: 31,
      estimated3YrTCO: 3563
    },
    stockAvailability: 'In Stock (Fast Ship)'
  },
  {
    id: 'framework-laptop-16',
    name: 'Framework Laptop 16 Enterprise',
    manufacturer: 'Framework',
    modelNumber: 'FW16-PRO-AMD',
    formFactor: 'Mobile Workstation (Laptop)',
    supportedOS: ['linux', 'windows'],
    defaultOS: 'Fedora Workstation 40',
    availableOSOptions: ['Fedora Workstation 40', 'Ubuntu 24.04 LTS', 'Windows 11 Pro'],
    processor: {
      brand: 'AMD',
      model: 'Ryzen 9 7940HS (8 Cores / 16 Threads)',
      cores: 8,
      threads: 16,
      baseClockGhz: 4.0,
      boostClockGhz: 5.2,
      tdpWatts: 45
    },
    memory: {
      capacityGb: 32,
      type: 'DDR5-5600 SODIMM',
      eccSupported: false,
      maxSupportedGb: 96
    },
    storage: {
      primary: '1TB Western Digital Black SN850X NVMe',
      expansionSlots: '1x M.2 2280 + 1x M.2 2230 slot'
    },
    graphics: {
      brand: 'AMD',
      model: 'Radeon RX 7700S Graphics Module (8GB GDDR6)',
      vramGb: 8,
      isDiscrete: true
    },
    connectivity: {
      ethernetSpeed: 'Modular Expansion Card 2.5GbE',
      wifi: 'Wi-Fi 6E RZ616',
      thunderboltOrUsb4: true,
      displayOutputs: 'Up to 4x USB-C DisplayPort Expansion Cards'
    },
    chassisInfo: {
      weightKg: 2.4,
      powerSupplyWatts: 180,
      dimensionsCm: '35.6 x 27.0 x 2.1 cm',
      warrantyStandardYears: 3
    },
    targetRoles: ['software_engineering', 'devops_sysadmin'],
    workloadFitSummary: 'Fully modular, field-repairable Linux and Windows laptop. Components, battery, motherboard, and ports can be upgraded independently to lower long-term corporate replacement cycles.',
    benchmarks: {
      geekbenchSingle: 2740,
      geekbenchMulti: 14600,
      cinebenchR24Cpu: 1140,
      blenderClassroomSecs: 98,
      linuxKernelBuildSecs: 135,
      npuAITops: 16,
      passmarkGpu3D: 14200,
      batteryLifeHours: 8.5
    },
    pricing: {
      unitMSRP: 2240,
      volume10Price: 2060,
      volume50Price: 1904,
      volume100Price: 1747,
      proSupport3Year: 210,
      avgPowerWatts: 85,
      annualElectricityCost: 24,
      estimated3YrTCO: 2522
    },
    stockAvailability: 'In Stock (Fast Ship)'
  },
  {
    id: 'dell-latitude-7450',
    name: 'Dell Latitude 7450 vPro Enterprise',
    manufacturer: 'Dell',
    modelNumber: 'LAT-7450-EXEC',
    formFactor: 'Mobile Workstation (Laptop)',
    supportedOS: ['windows', 'linux'],
    defaultOS: 'Windows 11 Pro',
    availableOSOptions: ['Windows 11 Pro', 'Windows 11 Enterprise', 'Ubuntu 24.04 LTS'],
    processor: {
      brand: 'Intel',
      model: 'Core Ultra 7 165U vPro (12 Cores / 14 Threads)',
      cores: 12,
      threads: 14,
      baseClockGhz: 1.7,
      boostClockGhz: 4.9,
      tdpWatts: 15
    },
    memory: {
      capacityGb: 32,
      type: 'LPDDR5x-6400 Dual-Channel',
      eccSupported: false,
      maxSupportedGb: 32
    },
    storage: {
      primary: '1TB Opal Self-Encrypting PCIe Gen 4 SSD',
      expansionSlots: '1x M.2 2230 slot'
    },
    graphics: {
      brand: 'Intel',
      model: 'Intel Graphics 4-Core with Integrated NPU',
      vramGb: 0,
      isDiscrete: false
    },
    connectivity: {
      ethernetSpeed: 'Gigabit via USB-C Dock',
      wifi: 'Wi-Fi 7 BE200 vPro + 5G LTE optional',
      thunderboltOrUsb4: true,
      displayOutputs: '2x Thunderbolt 4, 1x HDMI 2.1'
    },
    chassisInfo: {
      weightKg: 1.33,
      powerSupplyWatts: 65,
      dimensionsCm: '31.3 x 22.2 x 1.7 cm',
      warrantyStandardYears: 3
    },
    targetRoles: ['finance_executive', 'operations_clerical'],
    workloadFitSummary: 'Ultra-lightweight executive enterprise notebook with 13-hour battery life, hardware vPro remote management, and integrated AI NPU for real-time background noise cancellation and meeting transcriptions.',
    benchmarks: {
      geekbenchSingle: 2420,
      geekbenchMulti: 11900,
      cinebenchR24Cpu: 820,
      blenderClassroomSecs: 185,
      linuxKernelBuildSecs: 215,
      npuAITops: 34,
      passmarkGpu3D: 4900,
      batteryLifeHours: 13.2
    },
    pricing: {
      unitMSRP: 1780,
      volume10Price: 1637,
      volume50Price: 1513,
      volume100Price: 1388,
      proSupport3Year: 180,
      avgPowerWatts: 35,
      annualElectricityCost: 10,
      estimated3YrTCO: 1990
    },
    stockAvailability: 'In Stock (Fast Ship)'
  },
  {
    id: 'hp-elite-mini-800',
    name: 'HP Elite Mini 800 G9',
    manufacturer: 'HP',
    modelNumber: 'ELITE-MINI-800G9',
    formFactor: 'Compact SFF / Mini-PC',
    supportedOS: ['windows', 'linux'],
    defaultOS: 'Windows 11 Pro',
    availableOSOptions: ['Windows 11 Pro', 'Windows 11 Enterprise', 'Debian 12 Bookworm', 'Ubuntu 24.04 LTS'],
    processor: {
      brand: 'Intel',
      model: 'Core i5-14500 (14 Cores / 20 Threads)',
      cores: 14,
      threads: 20,
      baseClockGhz: 2.6,
      boostClockGhz: 5.0,
      tdpWatts: 65
    },
    memory: {
      capacityGb: 32,
      type: 'DDR5-4800 SODIMM',
      eccSupported: false,
      maxSupportedGb: 64
    },
    storage: {
      primary: '512GB PCIe Gen 4 NVMe M.2 SSD',
      expansionSlots: '2x M.2 2280 slots'
    },
    graphics: {
      brand: 'Intel',
      model: 'UHD Graphics 770 (Triple 4K Display Capable)',
      vramGb: 0,
      isDiscrete: false
    },
    connectivity: {
      ethernetSpeed: 'Intel I219-LM Gigabit vPro',
      wifi: 'Wi-Fi 6E AX211',
      thunderboltOrUsb4: false,
      displayOutputs: '2x DisplayPort 1.4a, 1x HDMI 2.1'
    },
    chassisInfo: {
      weightKg: 1.42,
      powerSupplyWatts: 150,
      dimensionsCm: '17.7 x 17.5 x 3.4 cm',
      warrantyStandardYears: 3
    },
    targetRoles: ['operations_clerical', 'finance_executive'],
    workloadFitSummary: 'Compact, mountable 1-liter chassis engineered for call centers, reception counters, and standard corporate desks. Ultra-low 45W operational draw and silent acoustic profile.',
    benchmarks: {
      geekbenchSingle: 2610,
      geekbenchMulti: 14800,
      cinebenchR24Cpu: 1120,
      blenderClassroomSecs: 142,
      linuxKernelBuildSecs: 148,
      npuAITops: 12,
      passmarkGpu3D: 4100,
      batteryLifeHours: null
    },
    pricing: {
      unitMSRP: 980,
      volume10Price: 901,
      volume50Price: 833,
      volume100Price: 764,
      proSupport3Year: 120,
      avgPowerWatts: 45,
      annualElectricityCost: 13,
      estimated3YrTCO: 1139
    },
    stockAvailability: 'In Stock (Fast Ship)'
  },
  {
    id: 'lenovo-m90q-tiny',
    name: 'Lenovo ThinkCentre M90q Gen 4 Tiny',
    manufacturer: 'Lenovo',
    modelNumber: '11Q5-M90QG4-TNY',
    formFactor: 'Compact SFF / Mini-PC',
    supportedOS: ['linux', 'windows'],
    defaultOS: 'Ubuntu 24.04 LTS',
    availableOSOptions: ['Ubuntu 24.04 LTS', 'Debian 12 Bookworm', 'Windows 11 Pro'],
    processor: {
      brand: 'Intel',
      model: 'Core i7-14700T (20 Cores / 28 Threads)',
      cores: 20,
      threads: 28,
      baseClockGhz: 1.3,
      boostClockGhz: 5.2,
      tdpWatts: 35
    },
    memory: {
      capacityGb: 64,
      type: 'DDR5-5200 SODIMM (Dual Channel)',
      eccSupported: false,
      maxSupportedGb: 64
    },
    storage: {
      primary: '1TB Opal 2.0 NVMe PCIe Gen 4 SSD',
      expansionSlots: '2x M.2 2280 slots'
    },
    graphics: {
      brand: 'Intel',
      model: 'UHD Graphics 770',
      vramGb: 0,
      isDiscrete: false
    },
    connectivity: {
      ethernetSpeed: 'Dual Gigabit Ethernet (Optional 2nd punch-out NIC)',
      wifi: 'Wi-Fi 6E AX211',
      thunderboltOrUsb4: false,
      displayOutputs: '1x HDMI 2.1, 1x DisplayPort 1.4, 1x Punch-Out DP'
    },
    chassisInfo: {
      weightKg: 1.25,
      powerSupplyWatts: 135,
      dimensionsCm: '17.9 x 18.2 x 3.6 cm',
      warrantyStandardYears: 3
    },
    targetRoles: ['devops_sysadmin', 'operations_clerical'],
    workloadFitSummary: 'Tiny footprint workstation node with 64GB RAM and 20 CPU cores. Highly favored by DevOps leads for local k3s/microk8s clusters, network tap testbeds, and branch office servers.',
    benchmarks: {
      geekbenchSingle: 2780,
      geekbenchMulti: 18400,
      cinebenchR24Cpu: 1390,
      blenderClassroomSecs: 115,
      linuxKernelBuildSecs: 118,
      npuAITops: 14,
      passmarkGpu3D: 4300,
      batteryLifeHours: null
    },
    pricing: {
      unitMSRP: 1420,
      volume10Price: 1306,
      volume50Price: 1207,
      volume100Price: 1107,
      proSupport3Year: 140,
      avgPowerWatts: 50,
      annualElectricityCost: 14,
      estimated3YrTCO: 1602
    },
    stockAvailability: 'In Stock (Fast Ship)'
  },
  {
    id: 'supermicro-5014a',
    name: 'Supermicro SuperWorkstation 5014A-TT',
    manufacturer: 'Supermicro',
    modelNumber: 'SYS-5014A-TT-ENT',
    formFactor: 'Rackmount Dev Station',
    supportedOS: ['linux', 'windows'],
    defaultOS: 'Red Hat Enterprise Linux 9',
    availableOSOptions: ['Red Hat Enterprise Linux 9', 'Ubuntu 24.04 LTS', 'Debian 12 Bookworm', 'Windows 11 Enterprise'],
    processor: {
      brand: 'AMD',
      model: 'Threadripper PRO 7995WX (96 Cores / 192 Threads)',
      cores: 96,
      threads: 192,
      baseClockGhz: 2.5,
      boostClockGhz: 5.1,
      tdpWatts: 350
    },
    memory: {
      capacityGb: 256,
      type: 'DDR5-4800 Registered ECC (8 Channels)',
      eccSupported: true,
      maxSupportedGb: 2048
    },
    storage: {
      primary: '4x 2TB NVMe PCIe Gen 5 in RAID-10 (4TB Usable)',
      expansionSlots: '4x Hot-Swap 3.5" NVMe/SATA hybrid bays + 4x M.2'
    },
    graphics: {
      brand: 'NVIDIA',
      model: 'RTX 6000 Ada Generation (48GB GDDR6 ECC)',
      vramGb: 48,
      isDiscrete: true
    },
    connectivity: {
      ethernetSpeed: 'Dual 10GBase-T + Dedicated IPMI 2.0 LAN',
      wifi: 'None (Data Center & Dev Lab Rackmount)',
      thunderboltOrUsb4: false,
      displayOutputs: '4x DisplayPort 1.4a'
    },
    chassisInfo: {
      weightKg: 28.5,
      powerSupplyWatts: 2000,
      dimensionsCm: '45.2 x 22.2 x 58.4 cm (4U Rack / Tower convertible)',
      warrantyStandardYears: 3
    },
    targetRoles: ['data_science_ai', 'software_engineering', 'devops_sysadmin'],
    workloadFitSummary: '96 physical cores and 192 threads make this the ultimate shared compilation station and on-premise AI training box. Equipped with remote IPMI KVM management.',
    benchmarks: {
      geekbenchSingle: 2890,
      geekbenchMulti: 41200,
      cinebenchR24Cpu: 3150,
      blenderClassroomSecs: 34,
      linuxKernelBuildSecs: 46,
      npuAITops: 72,
      passmarkGpu3D: 36200,
      batteryLifeHours: null
    },
    pricing: {
      unitMSRP: 8900,
      volume10Price: 8188,
      volume50Price: 7565,
      volume100Price: 6942,
      proSupport3Year: 580,
      avgPowerWatts: 490,
      annualElectricityCost: 137,
      estimated3YrTCO: 9891
    },
    stockAvailability: 'Enterprise Allocation'
  },
  {
    id: 'tuxedo-stellaris-16',
    name: 'TUXEDO Stellaris 16 Gen 6 (Linux Focus)',
    manufacturer: 'Tuxedo Computers',
    modelNumber: 'TX-STEL16-G6',
    formFactor: 'Mobile Workstation (Laptop)',
    supportedOS: ['linux', 'windows', 'dual_boot'],
    defaultOS: 'Ubuntu 24.04 LTS',
    availableOSOptions: ['Ubuntu 24.04 LTS', 'Debian 12 Bookworm', 'Dual Boot (Win11 Pro + Ubuntu 24.04)'],
    processor: {
      brand: 'AMD',
      model: 'Ryzen 9 7945HX (16 Cores / 32 Threads)',
      cores: 16,
      threads: 32,
      baseClockGhz: 2.5,
      boostClockGhz: 5.4,
      tdpWatts: 75
    },
    memory: {
      capacityGb: 64,
      type: 'DDR5-5200 SODIMM',
      eccSupported: false,
      maxSupportedGb: 96
    },
    storage: {
      primary: '2TB Samsung 990 PRO NVMe SSD',
      expansionSlots: '2x M.2 2280 PCIe Gen 4'
    },
    graphics: {
      brand: 'NVIDIA',
      model: 'GeForce RTX 4080 Laptop (12GB GDDR6)',
      vramGb: 12,
      isDiscrete: true
    },
    connectivity: {
      ethernetSpeed: '2.5GbE RJ-45 onboard',
      wifi: 'Wi-Fi 6E Intel AX210',
      thunderboltOrUsb4: true,
      displayOutputs: '1x HDMI 2.1, 1x Mini DP 1.4a, 1x USB-C DP'
    },
    chassisInfo: {
      weightKg: 2.5,
      powerSupplyWatts: 280,
      dimensionsCm: '35.9 x 26.3 x 2.6 cm',
      warrantyStandardYears: 3
    },
    targetRoles: ['software_engineering', 'data_science_ai', 'video_motion'],
    workloadFitSummary: 'Native European Linux manufacturer with specialized kernel drivers for power management, fan curves, and discrete NVIDIA switching under Wayland.',
    benchmarks: {
      geekbenchSingle: 2890,
      geekbenchMulti: 18900,
      cinebenchR24Cpu: 1540,
      blenderClassroomSecs: 76,
      linuxKernelBuildSecs: 110,
      npuAITops: 28,
      passmarkGpu3D: 21500,
      batteryLifeHours: 5.5
    },
    pricing: {
      unitMSRP: 2790,
      volume10Price: 2566,
      volume50Price: 2371,
      volume100Price: 2176,
      proSupport3Year: 240,
      avgPowerWatts: 130,
      annualElectricityCost: 36,
      estimated3YrTCO: 3138
    },
    stockAvailability: 'In Stock (Fast Ship)'
  },
  {
    id: 'dell-optiplex-7020-sff',
    name: 'Dell OptiPlex 7020 SFF',
    manufacturer: 'Dell',
    modelNumber: 'OPTI-7020-SFF',
    formFactor: 'Compact SFF / Mini-PC',
    supportedOS: ['windows', 'linux'],
    defaultOS: 'Windows 11 Pro',
    availableOSOptions: ['Windows 11 Pro', 'Windows 11 Enterprise', 'Ubuntu 24.04 LTS'],
    processor: {
      brand: 'Intel',
      model: 'Core i3-14100 (4 Cores / 8 Threads)',
      cores: 4,
      threads: 8,
      baseClockGhz: 3.5,
      boostClockGhz: 4.7,
      tdpWatts: 60
    },
    memory: {
      capacityGb: 16,
      type: 'DDR5-4800',
      eccSupported: false,
      maxSupportedGb: 64
    },
    storage: {
      primary: '512GB PCIe Gen 4 NVMe SSD',
      expansionSlots: '1x M.2 2280 + 1x 3.5" HDD bay'
    },
    graphics: {
      brand: 'Intel',
      model: 'Intel UHD Graphics 730',
      vramGb: 0,
      isDiscrete: false
    },
    connectivity: {
      ethernetSpeed: 'Gigabit Ethernet RJ-45',
      wifi: 'Optional Wi-Fi 6E',
      thunderboltOrUsb4: false,
      displayOutputs: '1x DisplayPort 1.4a, 1x HDMI 1.4b'
    },
    chassisInfo: {
      weightKg: 4.9,
      powerSupplyWatts: 180,
      dimensionsCm: '29.0 x 9.3 x 29.3 cm',
      warrantyStandardYears: 3
    },
    targetRoles: ['operations_clerical'],
    workloadFitSummary: 'Budget-conscious enterprise fleet desktop with low total cost of ownership. Ideal for ticketing queues, customer service agents, and warehouse kiosks.',
    benchmarks: {
      geekbenchSingle: 2310,
      geekbenchMulti: 9200,
      cinebenchR24Cpu: 680,
      blenderClassroomSecs: 235,
      linuxKernelBuildSecs: 295,
      npuAITops: 8,
      passmarkGpu3D: 3200,
      batteryLifeHours: null
    },
    pricing: {
      unitMSRP: 699,
      volume10Price: 643,
      volume50Price: 594,
      volume100Price: 545,
      proSupport3Year: 95,
      avgPowerWatts: 40,
      annualElectricityCost: 11,
      estimated3YrTCO: 827
    },
    stockAvailability: 'In Stock (Fast Ship)'
  }
];
