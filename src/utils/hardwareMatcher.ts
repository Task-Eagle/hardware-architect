import { HardwareItem, JobRoleDefinition, OSPlatform } from '../types/hardware';

export interface MatchResult {
  hardware: HardwareItem;
  score: number; // 0 to 100
  matchLevel: 'Optimal' | 'Recommended' | 'Acceptable' | 'Under-Spec';
  reasons: string[];
  bottlenecks: string[];
}

export function evaluateHardwareForRole(
  hardware: HardwareItem,
  role: JobRoleDefinition,
  osPreference: OSPlatform | 'all',
  budgetConstraint?: number
): MatchResult {
  let score = 70; // baseline
  const reasons: string[] = [];
  const bottlenecks: string[] = [];

  // 1. Direct role tagging check
  if (hardware.targetRoles.includes(role.id)) {
    score += 15;
    reasons.push(`Directly validated for ${role.title} workloads`);
  }

  // 2. RAM check
  if (hardware.memory.capacityGb >= role.recommendedMinRamGb * 2) {
    score += 10;
    reasons.push(`${hardware.memory.capacityGb}GB RAM offers 2x headroom for heavy multitasking`);
  } else if (hardware.memory.capacityGb >= role.recommendedMinRamGb) {
    score += 5;
    reasons.push(`Meets recommended ${role.recommendedMinRamGb}GB RAM threshold`);
  } else {
    score -= 20;
    bottlenecks.push(`Only ${hardware.memory.capacityGb}GB RAM (recommend minimum ${role.recommendedMinRamGb}GB for ${role.title})`);
  }

  // 3. CPU Cores check
  if (hardware.processor.cores >= role.recommendedMinCores * 1.5) {
    score += 8;
    reasons.push(`${hardware.processor.cores} cores accelerates multi-threaded processes`);
  } else if (hardware.processor.cores < role.recommendedMinCores) {
    score -= 15;
    bottlenecks.push(`${hardware.processor.cores} CPU cores is below recommended ${role.recommendedMinCores} cores`);
  }

  // 4. GPU tier check
  if (role.recommendedGpuTier === 'High-End Workstation' || role.recommendedGpuTier === 'Dual/Multi-GPU') {
    if (hardware.graphics.isDiscrete && hardware.graphics.vramGb >= 16) {
      score += 12;
      reasons.push(`Dedicated workstation GPU with ${hardware.graphics.vramGb}GB VRAM`);
    } else {
      score -= 25;
      bottlenecks.push(`Requires high-memory GPU for hardware-accelerated processing`);
    }
  }

  // 5. OS compatibility check
  if (osPreference !== 'all') {
    if (osPreference === 'macos_coming_soon') {
      // macOS notice
    } else if (hardware.supportedOS.includes(osPreference)) {
      score += 5;
      reasons.push(`Verified native support for ${osPreference.toUpperCase()}`);
    } else {
      score -= 30;
      bottlenecks.push(`Does not officially support requested OS: ${osPreference.toUpperCase()}`);
    }
  }

  // 6. Budget constraint check
  if (budgetConstraint && budgetConstraint > 0) {
    if (hardware.pricing.unitMSRP <= budgetConstraint) {
      score += 5;
      reasons.push(`Within allocated budget of $${budgetConstraint.toLocaleString()} per unit`);
    } else {
      const overBudgetPct = Math.round(((hardware.pricing.unitMSRP - budgetConstraint) / budgetConstraint) * 100);
      score -= Math.min(30, overBudgetPct / 2);
      bottlenecks.push(`$${(hardware.pricing.unitMSRP - budgetConstraint).toLocaleString()} over target budget (+${overBudgetPct}%)`);
    }
  }

  // Clamp score between 10 and 99
  const finalScore = Math.max(10, Math.min(99, Math.round(score)));

  let matchLevel: MatchResult['matchLevel'] = 'Acceptable';
  if (finalScore >= 88) matchLevel = 'Optimal';
  else if (finalScore >= 75) matchLevel = 'Recommended';
  else if (finalScore < 60) matchLevel = 'Under-Spec';

  return {
    hardware,
    score: finalScore,
    matchLevel,
    reasons,
    bottlenecks
  };
}
