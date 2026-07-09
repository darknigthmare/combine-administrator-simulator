import type { GameState, NovaProspektState, QuarantineZoneState, Sector, Stats, VortigauntState, XenEcosystemState, XenMutationState, XenResearchOperation, XenResearchPolicyId, XenResearchProgramState, XenResearchStage, XenResearchState } from '../types/game';
import { xenResearchPolicies, xenResearchPrograms, xenResearchProgramOrder } from '../data/xenResearch';

const clamp = (value: number, min = 0, max = 100) => Math.max(min, Math.min(max, Math.round(value)));
const add = (value: number, delta = 0, min = 0, max = 100) => clamp(value + delta, min, max);

function applyStats(base: Stats, effects: Partial<Stats>): Stats {
  return {
    ...base,
    stability: add(base.stability, effects.stability ?? 0),
    loyalty: add(base.loyalty, effects.loyalty ?? 0),
    fear: add(base.fear, effects.fear ?? 0),
    rebel: add(base.rebel, effects.rebel ?? 0),
    xen: add(base.xen, effects.xen ?? 0),
    combine: add(base.combine, effects.combine ?? 0),
    production: add(base.production, effects.production ?? 0, 0, 120),
    rations: Math.max(0, Math.round(base.rations + (effects.rations ?? 0))),
    citadel: add(base.citadel, effects.citadel ?? 0),
    info: add(base.info, effects.info ?? 0),
    fatigue: add(base.fatigue, effects.fatigue ?? 0),
    civilianLosses: Math.max(0, Math.round(base.civilianLosses + (effects.civilianLosses ?? 0))),
    combineLosses: Math.max(0, Math.round(base.combineLosses + (effects.combineLosses ?? 0))),
    suspicion: add(base.suspicion, effects.suspicion ?? 0),
  };
}

function avg(values: number[]) {
  if (!values.length) return 0;
  return clamp(values.reduce((sum, value) => sum + value, 0) / values.length);
}

function choosePolicy(profile: string, scenario: string): XenResearchPolicyId {
  if (profile === 'quarantine') return 'cautious_containment';
  if (profile === 'sympathizer') return 'biotic_consultation';
  if (profile === 'tyrant') return 'weaponization_directive';
  if (scenario === 'post_nova') return 'nova_blacksite_sync';
  if (scenario === 'quarantine') return 'accelerated_harvest';
  return 'cautious_containment';
}

function stageFromProgram(program: XenResearchProgramState): XenResearchStage {
  const pressure = program.progress + program.weaponization * 0.28 + program.liveSpecimens * 0.18 + Math.max(0, 50 - program.containment) * 0.22;
  if (pressure >= 112) return 'blacksite_catastrophe';
  if (pressure >= 86 || program.weaponization > 70) return 'weaponized';
  if (pressure >= 62) return 'active_trial';
  if (pressure >= 30) return 'contained_study';
  return 'field_samples';
}

function stageLabel(stage: XenResearchStage) {
  const labels: Record<XenResearchStage, string> = {
    field_samples: 'Échantillons terrain',
    contained_study: 'Étude confinée',
    active_trial: 'Essai actif',
    weaponized: 'Militarisation',
    blacksite_catastrophe: 'Catastrophe blacksite',
  };
  return labels[stage];
}

function createProgramState(programId: XenResearchProgramState['programId'], index: number, params: { scenario: string; timeline: string; ecosystem?: XenEcosystemState; mutation?: XenMutationState; quarantine?: QuarantineZoneState }): XenResearchProgramState {
  const def = xenResearchPrograms[programId];
  const matchingLayerPressure = avg((params.ecosystem?.layers ?? [])
    .filter((layer) => def.relatedLayers.includes(layer.layerId))
    .map((layer) => layer.biomass * 0.35 + layer.activity * 0.22 + layer.spread * 0.18 + layer.mutationPressure * 0.25));
  const matchingChainPressure = avg((params.mutation?.chains ?? [])
    .filter((chain) => def.relatedChains.includes(chain.chainId))
    .map((chain) => chain.progress * 0.3 + chain.triggerPressure * 0.2 + chain.conversionLoad * 0.25 + chain.mutationLoad * 0.25));
  const quarantinePressure = (params.quarantine?.biologicalExclusionIndex ?? 0) * 0.15;
  const scenarioBias = params.scenario === 'quarantine' ? 10 : params.scenario === 'post_nova' ? 7 : params.scenario === 'uprising' ? 4 : 0;
  const timelineBias = params.timeline === 'alyx_era' ? 5 : params.timeline === 'post_nova_prospekt' ? 9 : params.timeline === 'citadel_collapse' ? -4 : 0;
  const pressure = clamp(matchingLayerPressure * 0.45 + matchingChainPressure * 0.35 + quarantinePressure + scenarioBias + timelineBias + index * 0.6);
  const program: XenResearchProgramState = {
    id: `xrd-${programId}`,
    programId,
    stage: 'field_samples',
    progress: clamp(8 + pressure * 0.42),
    samples: clamp(5 + pressure * 0.34),
    containment: clamp(72 - pressure * 0.2 + (params.scenario === 'quarantine' ? 5 : 0)),
    liveSpecimens: clamp(pressure * 0.22),
    weaponization: programId === 'headcrab_shell_delivery' ? clamp(12 + pressure * 0.25) : programId === 'nova_biotics_experiment' ? clamp(7 + pressure * 0.18) : clamp(pressure * 0.08),
    industrialUse: programId === 'antlion_extract_harvest' || programId === 'barnacle_adhesive' ? clamp(12 + pressure * 0.28) : clamp(pressure * 0.07),
    ethicalDebt: programId === 'headcrab_shell_delivery' || programId === 'nova_biotics_experiment' ? clamp(14 + pressure * 0.28) : clamp(pressure * 0.09),
    advisorFlag: programId === 'gonarch_reproductive_alarm' || programId === 'headcrab_shell_delivery' || programId === 'nova_biotics_experiment' ? clamp(10 + pressure * 0.18) : clamp(pressure * 0.08),
    breakthroughUnlocked: pressure > 74,
    lastFinding: `${def.combineLabel} ouvert : ${def.sampleFocus}`,
  };
  return { ...program, stage: stageFromProgram(program) };
}

function summarize(activePolicy: XenResearchPolicyId, programs: XenResearchProgramState[], log: string[], previous?: Partial<XenResearchState>, lastIncident?: string): XenResearchState {
  const researchProgressIndex = avg(programs.map((program) => program.progress));
  const containmentIntegrity = avg(programs.map((program) => program.containment));
  const liveSpecimenCount = programs.reduce((sum, program) => sum + program.liveSpecimens, 0);
  const parasiteStock = Math.max(0, Math.round((previous?.parasiteStock ?? 0) + avg(programs.filter((program) => ['parasite_lifecycle', 'headcrab_shell_delivery', 'gonarch_reproductive_alarm'].includes(program.programId)).map((program) => program.samples)) * 0.06));
  const antlionExtract = Math.max(0, Math.round((previous?.antlionExtract ?? 0) + avg(programs.filter((program) => program.programId === 'antlion_extract_harvest').map((program) => program.samples)) * 0.06));
  const sporeSamples = Math.max(0, Math.round((previous?.sporeSamples ?? 0) + avg(programs.filter((program) => ['spore_biomass_analysis', 'vortessence_bio_reading'].includes(program.programId)).map((program) => program.samples)) * 0.05));
  const biomassSamples = Math.max(0, Math.round((previous?.biomassSamples ?? 0) + avg(programs.filter((program) => ['spore_biomass_analysis', 'organic_tunnel_study', 'barnacle_adhesive'].includes(program.programId)).map((program) => program.samples)) * 0.05));
  const weaponizationIndex = avg(programs.map((program) => program.weaponization));
  const industrialYield = avg(programs.map((program) => program.industrialUse));
  const ethicalDebt = avg(programs.map((program) => program.ethicalDebt));
  const advisorInterest = clamp(avg(programs.map((program) => program.advisorFlag)) + (previous?.advisorInterest ?? 0) * 0.08);
  const labIncidentRisk = clamp((100 - containmentIntegrity) * 0.45 + liveSpecimenCount * 0.045 + weaponizationIndex * 0.22 + ethicalDebt * 0.12);
  const blackSiteSecrecy = clamp(previous?.blackSiteSecrecy ?? 34);
  const bioweaponReadiness = clamp(weaponizationIndex * 0.55 + parasiteStock * 0.12 + programs.filter((program) => program.stage === 'weaponized' || program.stage === 'blacksite_catastrophe').length * 5);
  const breakthroughCount = programs.filter((program) => program.breakthroughUnlocked || program.progress >= 100).length;
  const incident = lastIncident || programs.sort((a, b) => (b.progress + b.liveSpecimens + b.weaponization) - (a.progress + a.liveSpecimens + a.weaponization))[0]?.lastFinding || 'Aucun programme Xen actif.';
  return {
    activePolicy,
    programs,
    researchProgressIndex,
    containmentIntegrity,
    liveSpecimenCount,
    parasiteStock,
    antlionExtract,
    sporeSamples,
    biomassSamples,
    weaponizationIndex,
    industrialYield,
    labIncidentRisk,
    advisorInterest,
    ethicalDebt,
    blackSiteSecrecy,
    bioweaponReadiness,
    breakthroughCount,
    lastIncident: incident,
    log: log.slice(0, 90),
  };
}

export function createInitialXenResearchState({ scenario, profile, timeline, ecosystem, mutation, quarantine }: { scenario: string; profile: string; timeline: string; ecosystem?: XenEcosystemState; mutation?: XenMutationState; quarantine?: QuarantineZoneState }): XenResearchState {
  const activePolicy = choosePolicy(profile, scenario);
  const programs = xenResearchProgramOrder.map((programId, index) => createProgramState(programId, index, { scenario, timeline, ecosystem, mutation, quarantine }));
  return summarize(activePolicy, programs, [
    `Bureau de recherche Xen initialisé : ${programs.length} programmes sous scellés COAN.`,
    `Politique active : ${xenResearchPolicies.find((policy) => policy.id === activePolicy)?.name ?? activePolicy}.`,
  ], { blackSiteSecrecy: scenario === 'post_nova' ? 52 : 34 });
}

export function migrateXenResearchState(game: Partial<GameState>): XenResearchState {
  if (game.xenResearch?.programs) {
    return summarize(game.xenResearch.activePolicy ?? 'cautious_containment', game.xenResearch.programs, game.xenResearch.log ?? [], game.xenResearch, game.xenResearch.lastIncident);
  }
  return createInitialXenResearchState({
    scenario: game.scenario ?? 'standard',
    profile: game.profile ?? 'loyalist',
    timeline: game.timeline ?? 'pre_hl2',
    ecosystem: game.xenEcosystem,
    mutation: game.xenMutation,
    quarantine: game.quarantineZones,
  });
}

function applyProgramDelta(program: XenResearchProgramState, delta: Partial<XenResearchOperation['researchEffects']>, directProgress = 0): XenResearchProgramState {
  const updated: XenResearchProgramState = {
    ...program,
    progress: add(program.progress, (delta.progressDelta ?? 0) + directProgress),
    samples: add(program.samples, delta.specimenDelta ?? 0),
    containment: add(program.containment, delta.containmentDelta ?? 0),
    liveSpecimens: add(program.liveSpecimens, delta.specimenDelta ? Math.round(delta.specimenDelta * 0.35) : 0),
    weaponization: add(program.weaponization, delta.weaponizationDelta ?? 0),
    industrialUse: add(program.industrialUse, delta.industrialYieldDelta ?? 0),
    ethicalDebt: add(program.ethicalDebt, delta.ethicalDebtDelta ?? 0),
    advisorFlag: add(program.advisorFlag, delta.advisorInterestDelta ?? 0),
  };
  updated.breakthroughUnlocked = updated.breakthroughUnlocked || updated.progress >= 100;
  updated.stage = stageFromProgram(updated);
  updated.lastFinding = `${stageLabel(updated.stage)} : ${xenResearchPrograms[updated.programId].breakthrough}`;
  return updated;
}

function applySectorEffects(sector: Sector, effects?: XenResearchOperation['sectorEffects']): Sector {
  if (!effects) return sector;
  return {
    ...sector,
    population: Math.max(0, Math.round(sector.population + (effects.population ?? 0))),
    xen: add(sector.xen, effects.xen ?? 0),
    rebel: add(sector.rebel, effects.rebel ?? 0),
    surveillance: add(sector.surveillance, effects.surveillance ?? 0),
    infrastructure: add(sector.infrastructure, effects.infrastructure ?? 0),
    loyalty: add(sector.loyalty, effects.loyalty ?? 0),
    fear: add(sector.fear, effects.fear ?? 0),
    status: effects.status ?? sector.status,
  };
}

export function setXenResearchPolicy(state: XenResearchState, policyId: XenResearchPolicyId): { xenResearch: XenResearchState; statsDelta: Partial<Stats>; lines: string[] } {
  const policy = xenResearchPolicies.find((item) => item.id === policyId) ?? xenResearchPolicies[0];
  const programs = state.programs.map((program) => applyProgramDelta(program, {
    containmentDelta: policy.containmentBias,
    progressDelta: policy.progressBias,
    specimenDelta: policy.sampleBias,
    weaponizationDelta: policy.weaponizationBias,
    industrialYieldDelta: policy.industrialBias,
    advisorInterestDelta: policy.advisorRisk,
    ethicalDebtDelta: policy.humaneCost,
  }));
  const summary = summarize(policy.id, programs, [
    `Xen R&D : politique active modifiée — ${policy.name}.`,
    `Masque public : ${policy.publicLine}`,
    ...state.log,
  ], {
    ...state,
    blackSiteSecrecy: add(state.blackSiteSecrecy, policy.id === 'nova_blacksite_sync' || policy.id === 'weaponization_directive' ? 6 : policy.id === 'biotic_consultation' ? -2 : 0),
  });
  return { xenResearch: summary, statsDelta: policy.effects, lines: summary.log.slice(0, 2) };
}

export function resolveXenResearchOperation({ state, operation, sectors, selectedProgramId, selectedSectorId, stats, nova, day }: { state: XenResearchState; operation: XenResearchOperation; sectors: Sector[]; selectedProgramId?: string; selectedSectorId?: string; stats: Stats; nova?: NovaProspektState; day: number }): { xenResearch: XenResearchState; sectors: Sector[]; novaProspekt?: NovaProspektState; statsDelta: Partial<Stats>; lines: string[] } {
  const policy = xenResearchPolicies.find((item) => item.id === state.activePolicy) ?? xenResearchPolicies[0];
  const targetProgram = state.programs.find((program) => program.id === selectedProgramId) ?? state.programs.sort((a, b) => b.progress - a.progress)[0];
  const targetSectorId = selectedSectorId ?? sectors.sort((a, b) => b.xen - a.xen)[0]?.id;
  let lines = [`Xen R&D : ${operation.name} — ${operation.logLine}`];
  const delta = operation.researchEffects;
  const programDelta = operation.target === 'program' ? delta : {
    ...delta,
    progressDelta: Math.round((delta.progressDelta ?? 0) * 0.55),
    specimenDelta: Math.round((delta.specimenDelta ?? 0) * 0.5),
  };
  const programs = state.programs.map((program) => {
    const isTarget = operation.target === 'network' || program.id === targetProgram?.id;
    if (!isTarget) return applyProgramDelta(program, { incidentRiskDelta: Math.round((delta.incidentRiskDelta ?? 0) * 0.08) }, policy.progressBias > 0 ? 1 : 0);
    return applyProgramDelta(program, programDelta, Math.round(policy.progressBias * 0.2));
  });
  const nextPrevious: Partial<XenResearchState> = {
    ...state,
    parasiteStock: Math.max(0, state.parasiteStock + (delta.parasiteStockDelta ?? 0)),
    antlionExtract: Math.max(0, state.antlionExtract + (delta.antlionExtractDelta ?? 0)),
    sporeSamples: Math.max(0, state.sporeSamples + (delta.sporeSampleDelta ?? 0)),
    biomassSamples: Math.max(0, state.biomassSamples + (delta.biomassSampleDelta ?? 0)),
    blackSiteSecrecy: add(state.blackSiteSecrecy, delta.blackSiteSecrecyDelta ?? 0),
    advisorInterest: add(state.advisorInterest, delta.advisorInterestDelta ?? 0),
    ethicalDebt: add(state.ethicalDebt, delta.ethicalDebtDelta ?? 0),
  };
  const nextSectors = sectors.map((sector) => sector.id === targetSectorId ? applySectorEffects(sector, operation.sectorEffects) : sector);
  const nextNova = nova && operation.novaEffects ? {
    ...nova,
    authority: add(nova.authority, operation.novaEffects.authorityDelta ?? 0),
    security: add(nova.security, operation.novaEffects.securityDelta ?? 0),
    secrecy: add(nova.secrecy, operation.novaEffects.secrecyDelta ?? 0),
    intelligence: add(nova.intelligence, operation.novaEffects.intelligenceDelta ?? 0),
    instability: add(nova.instability, operation.novaEffects.instabilityDelta ?? 0),
    humaneIndex: add(nova.humaneIndex, operation.novaEffects.humaneIndexDelta ?? 0),
    bioticsPressure: add(nova.bioticsPressure, operation.novaEffects.bioticsPressureDelta ?? 0),
    xenBreachRisk: add(nova.xenBreachRisk, operation.novaEffects.xenBreachRiskDelta ?? 0),
  } : nova;
  const riskRoll = (day * 37 + operation.risk + stats.xen + state.labIncidentRisk) % 100;
  if (riskRoll < Math.max(8, operation.risk * 0.32 + state.labIncidentRisk * 0.18)) {
    nextPrevious.blackSiteSecrecy = add(nextPrevious.blackSiteSecrecy ?? 0, 4);
    nextPrevious.advisorInterest = add(nextPrevious.advisorInterest ?? 0, 5);
    lines.push('Incident laboratoire mineur : cohérence des scellés biologiques dégradée.');
  }
  const summary = summarize(state.activePolicy, programs, [...lines, ...state.log], nextPrevious, lines[0]);
  return {
    xenResearch: summary,
    sectors: nextSectors,
    novaProspekt: nextNova,
    statsDelta: { ...operation.cost, ...operation.effects },
    lines: summary.log.slice(0, 4),
  };
}

export function simulateXenResearchDay({ state, stats, sectors, ecosystem, mutation, quarantine, vortigaunts, nova, day }: { state: XenResearchState; stats: Stats; sectors: Sector[]; ecosystem?: XenEcosystemState; mutation?: XenMutationState; quarantine?: QuarantineZoneState; vortigaunts?: VortigauntState; nova?: NovaProspektState; day: number }): { xenResearch: XenResearchState; statsDelta: Partial<Stats>; lines: string[] } {
  const policy = xenResearchPolicies.find((item) => item.id === state.activePolicy) ?? xenResearchPolicies[0];
  const xenPressure = stats.xen * 0.25 + (ecosystem?.totalBiomass ?? 0) * 0.2 + (mutation?.outbreakRisk ?? 0) * 0.18 + (quarantine?.biologicalExclusionIndex ?? 0) * 0.17;
  const techContainment = Math.max(0, stats.combine * 0.08 + stats.info * 0.05);
  const vortInsight = (vortigaunts?.xenInsight ?? 0) * 0.12 + (vortigaunts?.quarantineAid ?? 0) * 0.08;
  const novaBoost = (nova?.intelligence ?? 0) * 0.04 + (nova?.bioticsPressure ?? 0) * 0.05;
  let incidentLine = '';
  const programs = state.programs.map((program, index) => {
    const def = xenResearchPrograms[program.programId];
    const layerMatch = avg((ecosystem?.layers ?? [])
      .filter((layer) => def.relatedLayers.includes(layer.layerId))
      .map((layer) => layer.biomass * 0.22 + layer.activity * 0.18 + layer.mutationPressure * 0.18 + (layer.discovered ? 2 : 0)));
    const chainMatch = avg((mutation?.chains ?? [])
      .filter((chain) => def.relatedChains.includes(chain.chainId))
      .map((chain) => chain.progress * 0.18 + chain.mutationLoad * 0.18 + chain.conversionLoad * 0.12));
    const progress = Math.round(1 + policy.progressBias * 0.14 + layerMatch * 0.025 + chainMatch * 0.02 + vortInsight * 0.03 + novaBoost * 0.02 + (program.samples > 40 ? 1 : 0));
    const sample = Math.round(policy.sampleBias * 0.12 + xenPressure * 0.018 + (program.programId === 'antlion_extract_harvest' && sectors.some((sector) => sector.zone === 'Périphérie') ? 1 : 0));
    const containmentDrift = Math.round(policy.containmentBias * 0.08 + techContainment * 0.05 - program.liveSpecimens * 0.02 - program.weaponization * 0.03 - (mutation?.mutationVelocity ?? 0) * 0.025);
    const weapon = Math.round(policy.weaponizationBias * 0.08 + (program.programId === 'headcrab_shell_delivery' ? 1 : 0));
    const industrial = Math.round(policy.industrialBias * 0.08 + (program.programId === 'antlion_extract_harvest' ? 1 : 0));
    let updated = applyProgramDelta(program, {
      progressDelta: progress,
      specimenDelta: sample,
      containmentDelta: containmentDrift,
      weaponizationDelta: weapon,
      industrialYieldDelta: industrial,
      advisorInterestDelta: Math.round(policy.advisorRisk * 0.04 + program.weaponization * 0.01),
      ethicalDebtDelta: Math.round(policy.humaneCost * 0.04 + program.liveSpecimens * 0.006),
    });
    const incidentThreshold = state.labIncidentRisk + program.liveSpecimens * 0.12 + program.weaponization * 0.1 - updated.containment * 0.08;
    if (!incidentLine && ((day * (index + 11) + stats.suspicion + program.progress) % 100) < incidentThreshold * 0.22) {
      updated = applyProgramDelta(updated, { containmentDelta: -8, progressDelta: 2, advisorInterestDelta: 4, ethicalDebtDelta: 5 });
      incidentLine = `Incident Xen R&D : ${def.combineLabel} a produit une rupture de confinement mineure.`;
    }
    return updated;
  });
  const previous: Partial<XenResearchState> = {
    ...state,
    parasiteStock: Math.max(0, state.parasiteStock + Math.round(avg(programs.filter((program) => ['parasite_lifecycle', 'headcrab_shell_delivery'].includes(program.programId)).map((program) => program.samples)) * 0.03)),
    antlionExtract: Math.max(0, state.antlionExtract + Math.round(avg(programs.filter((program) => program.programId === 'antlion_extract_harvest').map((program) => program.industrialUse)) * 0.04)),
    sporeSamples: Math.max(0, state.sporeSamples + Math.round(avg(programs.filter((program) => program.programId === 'spore_biomass_analysis').map((program) => program.samples)) * 0.04)),
    biomassSamples: Math.max(0, state.biomassSamples + Math.round(avg(programs.filter((program) => ['spore_biomass_analysis', 'organic_tunnel_study', 'barnacle_adhesive'].includes(program.programId)).map((program) => program.samples)) * 0.035)),
    blackSiteSecrecy: add(state.blackSiteSecrecy, state.activePolicy === 'nova_blacksite_sync' || state.activePolicy === 'weaponization_directive' ? 1 : state.activePolicy === 'cautious_containment' ? -1 : 0),
  };
  const summary = summarize(state.activePolicy, programs, [
    `Xen R&D : progression ${avg(programs.map((program) => program.progress))}% / confinement ${avg(programs.map((program) => program.containment))}% / spécimens vivants ${programs.reduce((sum, program) => sum + program.liveSpecimens, 0)}.`,
    incidentLine || `Exploitation biologique : rendement ${avg(programs.map((program) => program.industrialUse))}% / militarisation ${avg(programs.map((program) => program.weaponization))}%.`,
    ...state.log,
  ], previous, incidentLine || undefined);
  const incidentPenalty = incidentLine ? 1 : 0;
  const statsDelta: Partial<Stats> = {
    production: Math.round(summary.industrialYield * 0.035 - summary.labIncidentRisk * 0.015),
    rations: Math.round(summary.antlionExtract * 0.12 + summary.industrialYield * 0.25),
    xen: Math.round(summary.labIncidentRisk * 0.03 + incidentPenalty * 2 - summary.containmentIntegrity * 0.018),
    rebel: -Math.round(summary.bioweaponReadiness * 0.025),
    fear: Math.round(summary.weaponizationIndex * 0.03 + incidentPenalty * 2),
    loyalty: -Math.round(summary.ethicalDebt * 0.035 + summary.blackSiteSecrecy * 0.015),
    suspicion: Math.round(summary.advisorInterest * 0.025 + summary.blackSiteSecrecy * 0.015 + incidentPenalty * 3),
    civilianLosses: incidentLine ? Math.round(8 + summary.labIncidentRisk * 0.2) : 0,
    combineLosses: incidentLine ? 1 : 0,
  };
  const lines = [
    `Recherche Xen : ${summary.breakthroughCount} percées / readiness bioweapon ${summary.bioweaponReadiness}% / risque incident ${summary.labIncidentRisk}%.`,
    `Stocks R&D : parasites ${summary.parasiteStock}, extract antlion ${summary.antlionExtract}, spores ${summary.sporeSamples}, biomasse ${summary.biomassSamples}.`,
    incidentLine || `Dernier dossier : ${summary.lastIncident}`,
  ];
  if (summary.bioweaponReadiness > 72) lines.push('Alerte biocontrôle : Headcrab Shell / déni parasite proche d’un usage opérationnel politiquement toxique.');
  if (summary.labIncidentRisk > 75) lines.push('Alerte laboratoire : sas R&D incompatibles avec niveau actuel de mutation Xen.');
  return { xenResearch: summary, statsDelta, lines };
}
