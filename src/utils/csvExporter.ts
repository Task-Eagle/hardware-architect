import { HardwareItem, FleetCartItem } from '../types/hardware';

function downloadCsvBlob(csvContent: string, fileName: string) {
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', fileName);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

function escapeCsvCell(value: string | number | null | undefined): string {
  if (value === null || value === undefined) return '""';
  const str = String(value);
  if (str.includes(',') || str.includes('"') || str.includes('\n')) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return `"${str}"`;
}

export function exportHardwareCatalogCsv(items: HardwareItem[]) {
  const headers = [
    'Model Name',
    'Manufacturer',
    'Model Number',
    'Form Factor',
    'Supported OS',
    'Default OS',
    'CPU Model',
    'Cores / Threads',
    'Base / Boost GHz',
    'TDP Watts',
    'RAM (GB)',
    'RAM Type',
    'ECC Supported',
    'Storage',
    'GPU Model',
    'VRAM (GB)',
    'Geekbench 6 Single',
    'Geekbench 6 Multi',
    'Cinebench R24 CPU',
    'Blender Classroom (s)',
    'Linux Kernel Build (s)',
    'NPU AI TOPS',
    'PassMark GPU 3D',
    'Battery Hours',
    'Unit MSRP ($)',
    'Volume 10+ Price ($)',
    'Volume 50+ Price ($)',
    'Volume 100+ Price ($)',
    '3-Yr ProSupport ($)',
    'Annual Electricity ($)',
    'Estimated 3-Yr TCO ($)',
    'Stock Status'
  ];

  const rows = items.map(item => [
    escapeCsvCell(item.name),
    escapeCsvCell(item.manufacturer),
    escapeCsvCell(item.modelNumber),
    escapeCsvCell(item.formFactor),
    escapeCsvCell(item.supportedOS.join(', ')),
    escapeCsvCell(item.defaultOS),
    escapeCsvCell(item.processor.model),
    escapeCsvCell(`${item.processor.cores}C / ${item.processor.threads}T`),
    escapeCsvCell(`${item.processor.baseClockGhz} / ${item.processor.boostClockGhz} GHz`),
    escapeCsvCell(item.processor.tdpWatts),
    escapeCsvCell(item.memory.capacityGb),
    escapeCsvCell(item.memory.type),
    escapeCsvCell(item.memory.eccSupported ? 'Yes' : 'No'),
    escapeCsvCell(item.storage.primary),
    escapeCsvCell(item.graphics.model),
    escapeCsvCell(item.graphics.vramGb),
    escapeCsvCell(item.benchmarks.geekbenchSingle),
    escapeCsvCell(item.benchmarks.geekbenchMulti),
    escapeCsvCell(item.benchmarks.cinebenchR24Cpu),
    escapeCsvCell(item.benchmarks.blenderClassroomSecs),
    escapeCsvCell(item.benchmarks.linuxKernelBuildSecs),
    escapeCsvCell(item.benchmarks.npuAITops),
    escapeCsvCell(item.benchmarks.passmarkGpu3D),
    escapeCsvCell(item.benchmarks.batteryLifeHours ?? 'N/A (Desktop)'),
    escapeCsvCell(item.pricing.unitMSRP),
    escapeCsvCell(item.pricing.volume10Price),
    escapeCsvCell(item.pricing.volume50Price),
    escapeCsvCell(item.pricing.volume100Price),
    escapeCsvCell(item.pricing.proSupport3Year),
    escapeCsvCell(item.pricing.annualElectricityCost),
    escapeCsvCell(item.pricing.estimated3YrTCO),
    escapeCsvCell(item.stockAvailability)
  ]);

  const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\r\n');
  const dateStr = new Date().toISOString().split('T')[0];
  downloadCsvBlob(csvContent, `Enterprise_Hardware_Matrix_${dateStr}.csv`);
}

export function exportProcurementQuoteCsv(
  cartItems: FleetCartItem[],
  catalog: HardwareItem[],
  companyName: string
) {
  const headers = [
    'Line Item #',
    'Hardware Model',
    'Manufacturer',
    'Department Allocation',
    'Configured OS',
    'Quantity',
    'Unit MSRP ($)',
    'Applied Unit Discount Price ($)',
    '3-Yr ProSupport Included',
    'Unit 3-Yr TCO ($)',
    'Line Extended Total ($)',
    'Line Extended 3-Yr TCO ($)'
  ];

  let lineIndex = 1;
  const rows = cartItems.map(item => {
    const hw = catalog.find(c => c.id === item.hardwareId);
    if (!hw) return [];

    let effectivePrice = hw.pricing.unitMSRP;
    if (item.quantity >= 100) effectivePrice = hw.pricing.volume100Price;
    else if (item.quantity >= 50) effectivePrice = hw.pricing.volume50Price;
    else if (item.quantity >= 10) effectivePrice = hw.pricing.volume10Price;

    const supportAddon = item.include3YrProSupport ? hw.pricing.proSupport3Year : 0;
    const finalUnitPrice = effectivePrice + supportAddon;
    const lineTotal = finalUnitPrice * item.quantity;
    const lineTco = hw.pricing.estimated3YrTCO * item.quantity;

    return [
      escapeCsvCell(lineIndex++),
      escapeCsvCell(hw.name),
      escapeCsvCell(hw.manufacturer),
      escapeCsvCell(item.department),
      escapeCsvCell(item.selectedOS),
      escapeCsvCell(item.quantity),
      escapeCsvCell(hw.pricing.unitMSRP),
      escapeCsvCell(finalUnitPrice),
      escapeCsvCell(item.include3YrProSupport ? 'Yes ($' + hw.pricing.proSupport3Year + ')' : 'No'),
      escapeCsvCell(hw.pricing.estimated3YrTCO),
      escapeCsvCell(lineTotal),
      escapeCsvCell(lineTco)
    ];
  }).filter(r => r.length > 0);

  const summary = [
    '',
    escapeCsvCell(`Procurement Quote for ${companyName}`),
    escapeCsvCell(`Generated on ${new Date().toLocaleDateString()}`),
    '',
    ''
  ];

  const csvContent = [
    summary.join(','),
    headers.join(','),
    ...rows.map(r => r.join(','))
  ].join('\r\n');

  const safeCompany = companyName.replace(/[^a-zA-Z0-9]/g, '_');
  downloadCsvBlob(csvContent, `Procurement_Quote_${safeCompany}_${Date.now()}.csv`);
}

export function exportBenchmarkComparisonCsv(items: HardwareItem[]) {
  const headers = [
    'Hardware Model',
    'Form Factor',
    'Processor',
    'Geekbench 6 Single-Core',
    'Geekbench 6 Multi-Core',
    'Cinebench R24 CPU',
    'Blender Classroom (s, lower better)',
    'Linux Kernel Build (s, lower better)',
    'NPU AI Inference (TOPS)',
    'PassMark GPU 3D Graphics',
    'Battery Life (Hours)',
    'Unit MSRP ($)',
    'Geekbench Multi Per $1000'
  ];

  const rows = items.map(hw => [
    escapeCsvCell(hw.name),
    escapeCsvCell(hw.formFactor),
    escapeCsvCell(hw.processor.model),
    escapeCsvCell(hw.benchmarks.geekbenchSingle),
    escapeCsvCell(hw.benchmarks.geekbenchMulti),
    escapeCsvCell(hw.benchmarks.cinebenchR24Cpu),
    escapeCsvCell(hw.benchmarks.blenderClassroomSecs),
    escapeCsvCell(hw.benchmarks.linuxKernelBuildSecs),
    escapeCsvCell(hw.benchmarks.npuAITops),
    escapeCsvCell(hw.benchmarks.passmarkGpu3D),
    escapeCsvCell(hw.benchmarks.batteryLifeHours ?? 'Desktop AC Only'),
    escapeCsvCell(hw.pricing.unitMSRP),
    escapeCsvCell(Math.round((hw.benchmarks.geekbenchMulti / hw.pricing.unitMSRP) * 1000))
  ]);

  const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\r\n');
  downloadCsvBlob(csvContent, `Benchmark_Comparison_Report_${Date.now()}.csv`);
}
