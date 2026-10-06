import { JobRoleDefinition } from '../types/hardware';

export const JOB_ROLES: JobRoleDefinition[] = [
  {
    id: 'software_engineering',
    title: 'Software Engineering & Systems Dev',
    department: 'Engineering',
    description: 'Full-stack development, continuous compilation, containerized microservices (Docker/Podman), local emulator testing, and parallel test suites.',
    primaryWorkloads: [
      'Multi-threaded compilation (C++, Rust, Go, Java, TypeScript)',
      'Multiple container runtimes (Docker, Podman, Minikube)',
      'IDE memory footprint (IntelliJ, VS Code, multiple dev services)',
      'Fast NVMe disk caching for repository git status & build artifacts'
    ],
    recommendedMinRamGb: 32,
    recommendedMinCores: 8,
    recommendedGpuTier: 'Integrated',
    preferredOS: ['linux', 'windows', 'dual_boot'],
    typicalBudgetRange: [1400, 3200],
    priorityMetrics: ['compiling_speed', 'multi_thread', 'single_thread', 'ram_bandwidth']
  },
  {
    id: 'data_science_ai',
    title: 'Data Science, ML & Local AI',
    department: 'Data & Analytics',
    description: 'Local LLM inference and fine-tuning, PyTorch/TensorFlow pipelines, large tabular pandas/Polars datasets, and GPU-accelerated computing.',
    primaryWorkloads: [
      'CUDA tensor acceleration for local LLMs & transformer models',
      'Massive memory capacity for in-RAM tabular & embedding models',
      'High sustained memory bandwidth and PCIe Gen 5 lanes',
      'Linux kernel stability for containerized NVIDIA drivers'
    ],
    recommendedMinRamGb: 64,
    recommendedMinCores: 16,
    recommendedGpuTier: 'High-End Workstation',
    preferredOS: ['linux', 'windows'],
    typicalBudgetRange: [3000, 7500],
    priorityMetrics: ['gpu_compute', 'multi_thread', 'ram_bandwidth']
  },
  {
    id: 'cad_3d_modeling',
    title: '3D CAD, Architecture & Engineering',
    department: 'Product Design & Architecture',
    description: 'Parametric CAD modeling (SolidWorks, Autodesk Revit, AutoCAD, CATIA), viewport rendering, FEA simulation, and photorealistic ray tracing.',
    primaryWorkloads: [
      'High single-core clock speeds for linear parametric modeling solvers',
      'ISV-certified enterprise workstation GPUs (RTX Ada generation)',
      'ECC memory reliability for mission-critical FEA and engineering calculations',
      'Multi-monitor 4K viewport rendering'
    ],
    recommendedMinRamGb: 64,
    recommendedMinCores: 12,
    recommendedGpuTier: 'High-End Workstation',
    preferredOS: ['windows'],
    typicalBudgetRange: [2800, 6200],
    priorityMetrics: ['single_thread', 'gpu_compute', 'ram_bandwidth']
  },
  {
    id: 'finance_executive',
    title: 'Executive, Finance & Quantitative Modeling',
    department: 'Finance & Leadership',
    description: 'Complex financial modeling (huge Excel workbooks, Monte Carlo analysis, Power BI), multi-display Bloomberg / trading setups, and mobile travel.',
    primaryWorkloads: [
      'High single-thread responsiveness for heavy Excel formula recalculations',
      'Lightweight portability and high battery endurance for mobile travel',
      'Biometric enterprise security (Windows Hello, TPM 2.0, SmartCard)',
      'Multi-monitor 4K docking station connectivity'
    ],
    recommendedMinRamGb: 16,
    recommendedMinCores: 8,
    recommendedGpuTier: 'Integrated',
    preferredOS: ['windows'],
    typicalBudgetRange: [1200, 2400],
    priorityMetrics: ['single_thread', 'portability']
  },
  {
    id: 'operations_clerical',
    title: 'Operations, Customer Support & Clerical',
    department: 'Operations & Call Center',
    description: 'Enterprise ERP systems (SAP, Salesforce), multi-tab cloud applications, telecommunication softphones, and dense office deployments.',
    primaryWorkloads: [
      'Compact physical footprint (Mini-PC / SFF) for small desks or mounting',
      'Low acoustic noise and low electrical power consumption (<65W)',
      'Reliable corporate fleet image deployment via PXE/Intune',
      'Dual-display 1080p/1440p support for multi-tasking ticketing'
    ],
    recommendedMinRamGb: 16,
    recommendedMinCores: 6,
    recommendedGpuTier: 'Integrated',
    preferredOS: ['windows', 'linux'],
    typicalBudgetRange: [750, 1400],
    priorityMetrics: ['single_thread']
  },
  {
    id: 'devops_sysadmin',
    title: 'DevOps, Cloud & SecOps Administration',
    department: 'Infrastructure & Security',
    description: 'Infrastructure-as-code (Terraform, Ansible), network packet capture, local Kubernetes clusters, secure VPN tunneling, and Linux terminal multi-tasking.',
    primaryWorkloads: [
      'Native Linux kernel environment or robust Windows Subsystem for Linux (WSL2)',
      'High memory capacity for virtual machines and staging environments',
      'Dual Gigabit/10G Ethernet or fast Wi-Fi 6E/7 interfaces',
      'Hardware virtualization (VT-x / AMD-V) stability'
    ],
    recommendedMinRamGb: 32,
    recommendedMinCores: 12,
    recommendedGpuTier: 'Integrated',
    preferredOS: ['linux', 'windows', 'dual_boot'],
    typicalBudgetRange: [1600, 3600],
    priorityMetrics: ['multi_thread', 'compiling_speed', 'ram_bandwidth']
  },
  {
    id: 'video_motion',
    title: 'Video Production & Motion Graphics',
    department: 'Creative & Communications',
    description: '4K/8K RAW footage editing (Premiere Pro, DaVinci Resolve), After Effects motion graphics, color grading, and ProRes/AV1 hardware encoding.',
    primaryWorkloads: [
      'Dedicated hardware video encode/decode engines (NVENC / QuickSync)',
      'Large high-speed NVMe scratch disk for video caches and media scrubbing',
      'High GPU VRAM (16GB+) for heavy color grading nodes and temporal effects',
      'Color-accurate 10-bit display pipeline'
    ],
    recommendedMinRamGb: 64,
    recommendedMinCores: 16,
    recommendedGpuTier: 'High-End Workstation',
    preferredOS: ['windows', 'linux'],
    typicalBudgetRange: [2600, 5800],
    priorityMetrics: ['gpu_compute', 'multi_thread', 'ram_bandwidth']
  }
];
