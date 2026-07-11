export type ScenarioId = 'pre_hl2' | 'standard' | 'dormant' | 'quarantine' | 'post_nova' | 'uprising';
export type TimelineId = 'seven_hour_aftermath' | 'early_occupation' | 'alyx_era' | 'pre_hl2' | 'hl2_arrival' | 'post_nova_prospekt' | 'uprising' | 'citadel_collapse';
export type ProfileId = 'loyalist' | 'technocrat' | 'tyrant' | 'collaborator' | 'sympathizer' | 'quarantine';
export type AdministratorAvatarId = 'civil_director' | 'field_prefect' | 'combine_technocrat' | 'quarantine_director';
export type RationPolicyId = 'standard' | 'loyalty_priority' | 'industrial_priority' | 'punitive' | 'black_market_tolerance' | 'humanitarian_mask' | 'cp_informant_bounty';
export type RationOperationId = 'redistribute' | 'worker_bonus' | 'punitive_cut' | 'informant_bonus' | 'market_sweep' | 'hidden_relief' | 'nova_requisition';
export type TabId = 'new_game' | 'prologue' | 'onboarding' | 'dashboard' | 'command_deck_v2' | 'progression' | 'campaigns' | 'major_events' | 'finale' | 'chronicle' | 'timeline' | 'sectors' | 'population' | 'citizens' | 'informants' | 'civil_protection' | 'overwatch' | 'citadel' | 'technology' | 'combine' | 'resistance' | 'vortigaunts' | 'xen' | 'xen_research' | 'xen_catastrophes' | 'rationing' | 'nova' | 'propaganda' | 'reports' | 'archives' | 'video_archives' | 'save_system' | 'decision_history' | 'difficulty' | 'gameplay_balance' | 'atmosphere' | 'tauri_packaging' | 'codex' | 'system_audit' | 'ux_polish';
export type NovaInterfaceMode = 'city' | 'nova';


export type FloatingWindowPresetId =
  | 'sector_dossier'
  | 'citizen_file'
  | 'directive_file'
  | 'breencast_signal'
  | 'nova_transfer'
  | 'xen_biohazard'
  | 'lambda_cell'
  | 'unit_roster'
  | 'report_compare'
  | 'ration_ledger'
  | 'major_event_file'
  | 'objective_tracker'
  | 'vortigaunt_biotic'
  | 'cp_precinct'
  | 'tech_protocol'
  | 'chronicle_extract';

export type FloatingWindowCategory = 'city' | 'civil' | 'citadel' | 'propaganda' | 'nova' | 'xen' | 'resistance' | 'overwatch' | 'report' | 'crisis' | 'campaign' | 'archive';
export type FloatingWindowAccent = 'cyan' | 'amber' | 'white' | 'blue' | 'cold' | 'xen' | 'red';

export type FloatingWindowPreset = {
  id: FloatingWindowPresetId;
  label: string;
  shortLabel: string;
  category: FloatingWindowCategory;
  description: string;
  defaultTab: TabId;
  priority: 1 | 2 | 3 | 4 | 5;
  accent: FloatingWindowAccent;
  loreTags: string[];
};

export type FloatingWindowMetric = {
  label: string;
  value: string | number;
  danger?: boolean;
  xen?: boolean;
};

export type FloatingWindowContent = {
  presetId: FloatingWindowPresetId;
  title: string;
  subtitle: string;
  classification: string;
  severity: 0 | 1 | 2 | 3 | 4 | 5;
  accent: FloatingWindowAccent;
  relatedTab: TabId;
  metrics: FloatingWindowMetric[];
  lines: string[];
  tags: string[];
  footer: string;
};

export type FloatingWindowRuntime = {
  id: string;
  presetId: FloatingWindowPresetId;
  title: string;
  x: number;
  y: number;
  z: number;
  width: number;
  minimized: boolean;
  pinned: boolean;
};


export type CampaignId =
  | 'custom_city_administration'
  | 'city17_pre_hl2'
  | 'contaminated_port_city'
  | 'industrial_model_city'
  | 'post_nova_city'
  | 'uprising_city'
  | 'isolated_citadel_city';

export type CampaignObjectiveMetric =
  | keyof Stats
  | 'days_survived'
  | 'sector_integrity'
  | 'lambda_suppression'
  | 'xen_containment'
  | 'citadel_obedience'
  | 'population_survival'
  | 'industrial_output'
  | 'nova_secrecy'
  | 'quarantine_control';

export type CampaignObjective = {
  id: string;
  title: string;
  description: string;
  metric: CampaignObjectiveMetric;
  mode: 'above' | 'below';
  target: number;
  hidden?: boolean;
};

export type CampaignMilestone = {
  day: number;
  title: string;
  description: string;
  effects: Partial<Stats>;
  sectorEffects?: TimelineSectorEffect[];
  logLine: string;
};

export type CampaignPreset = {
  id: CampaignId;
  name: string;
  subtitle: string;
  recommendedCity: string;
  recommendedScenario: ScenarioId;
  recommendedTimeline: TimelineId;
  recommendedProfile: ProfileId;
  durationDays: number;
  briefing: string;
  adminMandate: string;
  openingReport: string;
  startingEffects: Partial<Stats>;
  dailyEffects: Partial<Stats>;
  sectorEffects: TimelineSectorEffect[];
  objectives: CampaignObjective[];
  milestones: CampaignMilestone[];
  failureWarnings: string[];
  finale: string;
  loreNotes: string[];
};

export type CampaignObjectiveProgress = {
  id: string;
  title: string;
  progress: number;
  achieved: boolean;
  detail: string;
};

export type CampaignState = {
  activeCampaignId: CampaignId;
  dayInCampaign: number;
  durationDays: number;
  pressure: number;
  narrativeHeat: number;
  milestoneIndex: number;
  objectives: CampaignObjectiveProgress[];
  completedObjectiveIds: string[];
  currentBriefing: string;
  currentMandate: string;
  log: string[];
};

export type UiuxUnlockId = 'citizen_intake' | 'ota_command' | 'xen_bioscan' | 'nova_prospekt_link' | 'advisor_channel' | 'rail_network' | 'ravenholm_blacklist' | 'synth_requisition';
export type UiuxCampaignPhase = 'occupation' | 'pacification' | 'containment' | 'uprising' | 'citadel_review';

export type UiuxProgressionResources = {
  requisition: number;
  data: number;
  compliance: number;
};

export type UiuxProgressionState = {
  resources: UiuxProgressionResources;
  unlocked: Record<UiuxUnlockId, boolean>;
  phase: UiuxCampaignPhase;
  heat: number;
  bureaucraticLoad: number;
  consecutiveCriticalDays: number;
  longTermScore: number;
  lastAudit: string;
};




export type CampaignMissionObjectiveKind = 'primary' | 'secondary' | 'hidden' | 'failure';
export type CampaignMissionObjectiveStatus = 'locked' | 'active' | 'completed' | 'failed' | 'expired';

export type CampaignMissionMetric =
  | CampaignObjectiveMetric
  | 'hunger_control'
  | 'black_market_control'
  | 'informant_integrity'
  | 'cp_integrity'
  | 'tech_readiness'
  | 'vortigaunt_control'
  | 'xen_research_control'
  | 'catastrophe_prevention'
  | 'civil_registry_control'
  | 'campaign_pressure'
  | 'audit_control'
  | 'ration_reserve'
  | 'population_compliance'
  | 'lambda_network_disruption'
  | 'resistance_fragmentation';

export type CampaignMissionCondition = {
  metric: CampaignMissionMetric;
  mode: 'above' | 'below';
  target: number;
};

export type CampaignMissionOutcome = {
  label: string;
  logLine: string;
  stats?: Partial<Stats>;
  mandateScore?: number;
};

export type CampaignMissionObjectiveDefinition = {
  id: string;
  campaignId: CampaignId | 'any';
  kind: CampaignMissionObjectiveKind;
  title: string;
  description: string;
  metric: CampaignMissionMetric;
  mode: 'above' | 'below';
  target: number;
  deadlineDay?: number;
  revealWhen?: CampaignMissionCondition;
  reward?: CampaignMissionOutcome;
  penalty?: CampaignMissionOutcome;
  loreTags: string[];
};

export type CampaignMissionObjectiveRuntime = {
  id: string;
  kind: CampaignMissionObjectiveKind;
  title: string;
  description: string;
  metric: CampaignMissionMetric;
  mode: 'above' | 'below';
  target: number;
  deadlineDay?: number;
  discovered: boolean;
  status: CampaignMissionObjectiveStatus;
  value: number;
  progress: number;
  detail: string;
  completedDay?: number;
  failedDay?: number;
  loreTags: string[];
};

export type CampaignMissionState = {
  activeCampaignId: CampaignId;
  objectives: CampaignMissionObjectiveRuntime[];
  primaryCount: number;
  secondaryCount: number;
  hiddenCount: number;
  revealedHiddenCount: number;
  completedCount: number;
  failedCount: number;
  mandateScore: number;
  failureRisk: number;
  lastEvaluationDay: number;
  log: string[];
};

export type PopulationGroupId =
  | 'loyal_citizens'
  | 'neutral_citizens'
  | 'hungry_citizens'
  | 'suspected_citizens'
  | 'collaborators'
  | 'informants'
  | 'disappeared_families'
  | 'industrial_workers'
  | 'internal_refugees'
  | 'lambda_sympathizers'
  | 'xen_exposed';

export type PopulationGroupDefinition = {
  id: PopulationGroupId;
  name: string;
  description: string;
  combineLabel: string;
  rebelAffinity: number;
  xenVulnerability: number;
  rationWeight: number;
  informantValue: number;
};

export type PopulationSectorState = {
  sectorId: string;
  total: number;
  groups: Record<PopulationGroupId, number>;
  compliance: number;
  lambdaSupport: number;
  xenExposure: number;
  informantDensity: number;
  workforce: number;
  vulnerable: number;
  lastChange: string;
};

export type PopulationState = {
  total: number;
  groups: Record<PopulationGroupId, number>;
  complianceIndex: number;
  lambdaSupportIndex: number;
  xenExposureIndex: number;
  informantDensityIndex: number;
  workforce: number;
  vulnerable: number;
  sectors: PopulationSectorState[];
  log: string[];
};

export type CitizenStatus =
  | 'compliant'
  | 'neutral'
  | 'suspect'
  | 'informant'
  | 'collaborator'
  | 'lambda_sympathizer'
  | 'xen_exposed'
  | 'transferred'
  | 'deceased';

export type CitizenRiskMarker =
  | 'ration_default'
  | 'radio_contact'
  | 'tunnel_proximity'
  | 'family_disappeared'
  | 'cp_abuse_witness'
  | 'xen_contact'
  | 'vortigaunt_contact'
  | 'industrial_access'
  | 'nova_transfer_flag'
  | 'false_denunciation_risk';

export type CitizenRecord = {
  id: string;
  name: string;
  sectorId: string;
  status: CitizenStatus;
  ageBand: '18-25' | '26-40' | '41-60' | '60+';
  workAssignment: string;
  rationStatus: 'Standard' | 'Prioritaire' | 'Restreint' | 'Suspendu' | 'Bonus informateur' | 'Quarantaine';
  loyaltyScore: number;
  fearScore: number;
  antiCitizenRisk: number;
  reliability: number;
  familyLinks: string[];
  lastCpCheck: string;
  novaProspektFlag: boolean;
  xenExposure: number;
  markers: CitizenRiskMarker[];
  notes: string;
  history: string[];
};

export type CitizenRegistryState = {
  records: CitizenRecord[];
  selectedId: string | null;
  total: number;
  compliantCount: number;
  suspectCount: number;
  informantCount: number;
  lambdaCount: number;
  xenExposedCount: number;
  novaFlaggedCount: number;
  transferredCount: number;
  averageRisk: number;
  averageLoyalty: number;
  averageFear: number;
  falseDenunciationIndex: number;
  lastGeneratedDay: number;
  log: string[];
};

export type CitizenActionId =
  | 'ration_bonus'
  | 'cp_interrogation'
  | 'recruit_informant'
  | 'mark_nova'
  | 'transfer_nova'
  | 'medical_quarantine'
  | 'erase_record'
  | 'public_reward';

export type CitizenAction = {
  id: CitizenActionId;
  name: string;
  description: string;
  targetStatuses: CitizenStatus[];
  effects: Partial<Stats>;
  registryEffects: {
    riskDelta?: number;
    loyaltyDelta?: number;
    fearDelta?: number;
    rationDelta?: number;
    reliabilityDelta?: number;
    xenDelta?: number;
    newStatus?: CitizenStatus;
    addMarkers?: CitizenRiskMarker[];
    novaFlag?: boolean;
  };
  logLine: string;
};






export type CivilProtectionDoctrineId = 'regulated_policing' | 'quota_crackdown' | 'ration_extortion' | 'loyalist_privileges' | 'internal_affairs' | 'terror_patrols';
export type CivilProtectionOperationId = 'discipline_sweep' | 'punish_rogue_cops' | 'expand_checkpoint_shakedowns' | 'ration_leak_probe' | 'use_brutal_squad' | 'embed_coan_observers' | 'nova_transfer_cp' | 'stage_public_restraint';

export type CivilProtectionDoctrine = {
  id: CivilProtectionDoctrineId;
  name: string;
  description: string;
  publicLine: string;
  brutalityBias: number;
  corruptionBias: number;
  rebelSuppression: number;
  loyaltyDamage: number;
  auditRisk: number;
  rationLeakageBias: number;
  effects: Partial<Stats>;
};

export type CivilProtectionPost = {
  id: string;
  name: string;
  sectorId: string;
  officers: number;
  discipline: number;
  brutality: number;
  corruption: number;
  morale: number;
  lambdaInfluence: number;
  rationLeakage: number;
  abuseReports: number;
  falseCharges: number;
  arrestsToday: number;
  seizedRations: number;
  compromisedOfficers: number;
  lastIncident: string;
};

export type CivilProtectionOperation = {
  id: CivilProtectionOperationId;
  name: string;
  description: string;
  cost: number;
  effects: Partial<Stats>;
  postEffects: {
    disciplineDelta?: number;
    brutalityDelta?: number;
    corruptionDelta?: number;
    moraleDelta?: number;
    lambdaInfluenceDelta?: number;
    rationLeakDelta?: number;
    abuseReportsDelta?: number;
    falseChargesDelta?: number;
    arrestsDelta?: number;
    seizedRationsDelta?: number;
    compromisedDelta?: number;
  };
  risk: number;
  logLine: string;
};

export type CivilProtectionState = {
  activeDoctrine: CivilProtectionDoctrineId;
  totalOfficers: number;
  brutalityIndex: number;
  corruptionIndex: number;
  disciplineIndex: number;
  moraleIndex: number;
  abuseReportIndex: number;
  rationLeakageIndex: number;
  falseChargeIndex: number;
  lambdaInfiltration: number;
  compromisedOfficers: number;
  arrestsToday: number;
  seizedRationsToday: number;
  posts: CivilProtectionPost[];
  log: string[];
};

export type InformantDoctrineId = 'ration_bounty' | 'family_pressure' | 'embedded_cp' | 'silent_files' | 'lambda_double' | 'terror_denunciation';
export type InformantOperationId = 'recruit_from_registry' | 'validate_sources' | 'bait_lambda' | 'purge_false_denunciations' | 'protect_informant_families' | 'nova_pressure_source' | 'turn_lambda_courier' | 'public_reward_case';

export type InformantDoctrine = {
  id: InformantDoctrineId;
  name: string;
  description: string;
  publicLine: string;
  effects: Partial<Stats>;
  recruitmentBias: number;
  reliabilityBias: number;
  falseReportBias: number;
  backlashRisk: number;
};

export type InformantOperation = {
  id: InformantOperationId;
  name: string;
  description: string;
  cost: number;
  effects: Partial<Stats>;
  networkEffects: Partial<Pick<InformantNetworkState, 'totalInformants' | 'reliabilityIndex' | 'falseReportIndex' | 'lambdaPenetration' | 'compromisedSources' | 'exposedCells' | 'backlashIndex'>> & {
    informantsDelta?: number;
    reliabilityDelta?: number;
    falseReportsDelta?: number;
    penetrationDelta?: number;
    compromisedDelta?: number;
    exposedCellsDelta?: number;
    backlashDelta?: number;
  };
  risk: number;
  logLine: string;
};

export type InformantSource = {
  id: string;
  citizenId?: string;
  codename: string;
  sectorId: string;
  cover: 'Ration line' | 'Factory floor' | 'Civil Protection clerk' | 'Transit queue' | 'Canal contact' | 'Nova family' | 'Medical quarantine';
  motivation: 'Rations' | 'Fear' | 'Revenge' | 'Privilege' | 'Coercion' | 'Double agent' | 'Family protection';
  reliability: number;
  risk: number;
  lambdaExposure: number;
  falseReportTendency: number;
  compromised: boolean;
  lastReport: string;
};

export type InformantNetworkState = {
  activeDoctrine: InformantDoctrineId;
  totalInformants: number;
  reliabilityIndex: number;
  falseReportIndex: number;
  lambdaPenetration: number;
  compromisedSources: number;
  exposedCells: number;
  backlashIndex: number;
  rationBountySpend: number;
  dailyReports: number;
  usefulReports: number;
  falseReports: number;
  sources: InformantSource[];
  log: string[];
};

export type AtmosphereMode = 'combine' | 'xen' | 'uprising' | 'nova' | 'citadel_alert' | 'collapse' | 'quiet_control';

export type SyntheticAudioCueId =
  | 'terminal_ping'
  | 'scanner_sweep'
  | 'citadel_alarm'
  | 'xen_drone'
  | 'advisor_bass'
  | 'curfew_siren'
  | 'breencast_chime'
  | 'razor_train'
  | 'nova_intake'
  | 'manhack_rattle'
  | 'strider_footfall'
  | 'vortessence_chord';

export type SyntheticAudioCategory = 'terminal' | 'combine' | 'citadel' | 'xen' | 'nova' | 'resistance' | 'transport' | 'vortigaunt';

export type SyntheticAudioSegment = {
  delay: number;
  duration: number;
  frequency: number;
  oscillator: OscillatorType | 'noise';
  gain: number;
  detune?: number;
  filter?: BiquadFilterType;
  filterFrequency?: number;
  pan?: number;
  ramp?: 'ping' | 'swell' | 'fade' | 'pulse';
};

export type SyntheticAudioCueDefinition = {
  id: SyntheticAudioCueId;
  label: string;
  category: SyntheticAudioCategory;
  description: string;
  trigger: string;
  baseVolume: number;
  priority: 1 | 2 | 3 | 4 | 5;
  terminalTag: string;
  color: string;
  segments: SyntheticAudioSegment[];
};

export type SyntheticAudioDirectorSnapshot = {
  activeCue: SyntheticAudioCueId;
  ambientCue: SyntheticAudioCueId;
  moodLabel: string;
  mixLabel: string;
  intensity: number;
  danger: number;
  routeLines: string[];
  recommendedCues: SyntheticAudioCueId[];
  suppressionNotice?: string;
};

export type AtmosphereSettings = {
  enabled: boolean;
  audioEnabled: boolean;
  advancedAudioEnabled: boolean;
  ambientDrone: boolean;
  eventCues: boolean;
  uiCues: boolean;
  bassResponse: boolean;
  distortion: boolean;
  scanlines: boolean;
  glitch: boolean;
  chromatic: boolean;
  ambientPulse: boolean;
  reducedMotion: boolean;
  masterVolume: number;
  audioComplexity: 'minimal' | 'standard' | 'dense';
  cueCooldownMs: number;
};

export type AtmosphereProfile = {
  mode: AtmosphereMode;
  label: string;
  bodyClass: string;
  alertLevel: 0 | 1 | 2 | 3 | 4 | 5;
  intensity: number;
  hue: string;
  accent: string;
  vignette: number;
  scanlineOpacity: number;
  glitchOpacity: number;
  pulseRate: number;
  audioCue: 'none' | 'terminal' | 'alarm' | 'xen' | 'nova' | 'advisor' | 'uprising';
  reason: string;
  ticker: string[];
};

export type RationSectorLedger = {
  sectorId: string;
  priority: 'Citadel' | 'Industry' | 'Residential' | 'Quarantine' | 'Punished' | 'Underclass';
  dailyNeed: number;
  allocated: number;
  caloricRatio: number;
  hunger: number;
  blackMarket: number;
  informants: number;
  hoarding: number;
  complianceBonus: number;
  lastIncident: string;
};

export type RationPolicy = {
  id: RationPolicyId;
  name: string;
  description: string;
  publicJustification: string;
  allocationBias: Partial<Record<RationSectorLedger['priority'], number>>;
  effects: Partial<Stats>;
  blackMarketPressure: number;
  informantPressure: number;
  suspicionRisk: number;
};

export type RationOperation = {
  id: RationOperationId;
  name: string;
  description: string;
  cost: number;
  effects: Partial<Stats>;
  ledgerEffects: Partial<Pick<RationSectorLedger, 'hunger' | 'blackMarket' | 'informants' | 'hoarding' | 'complianceBonus'>>;
  risk: number;
};

export type RationEconomyState = {
  activePolicy: RationPolicyId;
  reserves: number;
  dailyProduction: number;
  dailyNeed: number;
  dailyAllocated: number;
  dailyDeficit: number;
  autonomyDays: number;
  blackMarketIndex: number;
  hungerIndex: number;
  informantIndex: number;
  corruptionLeakage: number;
  hiddenRelief: number;
  ledgers: RationSectorLedger[];
  log: string[];
};

export type NovaDetaineeCategory = 'Resistance' | 'Vortigaunt' | 'Collaborator' | 'XenContaminated' | 'Civilian';


export type CitadelDirectiveBranchId = 'production' | 'repression' | 'quarantine' | 'propaganda' | 'nova' | 'transhuman' | 'biocontrol' | 'advisor';

export type CitadelDirectiveBranch = {
  id: CitadelDirectiveBranchId;
  name: string;
  description: string;
  loreLine: string;
  colorLabel: 'amber' | 'red' | 'green' | 'blue' | 'white' | 'cyan' | 'violet' | 'cold';
};

export type CitadelDirectiveNode = {
  id: string;
  branchId: CitadelDirectiveBranchId;
  tier: 1 | 2 | 3 | 4 | 5;
  title: string;
  body: string;
  cost: Partial<Stats>;
  effects: Partial<Stats>;
  dailyEffects: Partial<Stats>;
  advisorRisk: number;
  unlocks: string[];
  prerequisites: string[];
};

export type CitadelDirectiveTreeState = {
  activeBranch: CitadelDirectiveBranchId;
  completedNodes: string[];
  unlockedCapabilities: string[];
  branchPressure: number;
  advisorAttention: number;
  dailyMandate: string;
  log: string[];
};



export type CombineTechnologyBranchId = 'surveillance' | 'containment' | 'overwatch' | 'airwatch' | 'propaganda' | 'nova' | 'biocontrol' | 'infrastructure';

export type CombineTechnologyBranch = {
  id: CombineTechnologyBranchId;
  name: string;
  description: string;
  loreLine: string;
  colorLabel: 'blue' | 'green' | 'red' | 'cyan' | 'amber' | 'violet' | 'cold' | 'white';
};

export type CombineTechnologyNode = {
  id: string;
  branchId: CombineTechnologyBranchId;
  tier: 1 | 2 | 3 | 4;
  title: string;
  body: string;
  cost: number;
  maintenance: number;
  risk: number;
  prerequisites: string[];
  unlocks: string[];
  effects: Partial<Stats>;
  dailyEffects: Partial<Stats>;
  reserveEffects?: Record<string, number>;
  sectorEffects?: Partial<Pick<Sector, 'surveillance' | 'infrastructure' | 'rebel' | 'xen' | 'fear' | 'loyalty'>>;
};

export type CombineTechnologyState = {
  activeBranch: CombineTechnologyBranchId;
  researchedNodes: string[];
  unlockedCapabilities: string[];
  researchBudget: number;
  techSuspicion: number;
  maintenanceDebt: number;
  scanEfficiency: number;
  containmentGrid: number;
  overwatchIntegration: number;
  propagandaBandwidth: number;
  novaIntegration: number;
  log: string[];
};



export type ResistanceCellStage = 'dormant' | 'active' | 'armed' | 'coordinated' | 'open_uprising';
export type ResistanceCellType = 'canal_network' | 'scientific_lambda' | 'industrial_saboteurs' | 'vortigaunt_allies' | 'nova_survivors' | 'civilian_militia' | 'radio_cell' | 'medical_safehouse';
export type ResistanceOperationId = 'map_safehouse' | 'raid_weapon_cache' | 'seal_escape_route' | 'jam_pirate_radio' | 'flip_courier' | 'infiltrate_lab' | 'negotiate_vortigaunt' | 'stage_false_leak' | 'overwatch_decoy';

export type ResistanceCell = {
  id: string;
  name: string;
  type: ResistanceCellType;
  leaderAlias: string;
  sectorId: string;
  stage: ResistanceCellStage;
  secrecy: number;
  manpower: number;
  weapons: number;
  supplies: number;
  morale: number;
  tunnelAccess: number;
  radioReach: number;
  vortigauntSupport: number;
  scientificCapacity: number;
  infiltration: number;
  heat: number;
  nextOperation: string;
  discovered: boolean;
  compromised: boolean;
  notes: string;
};

export type ResistanceRoute = {
  id: string;
  fromSectorId: string;
  toSectorId: string;
  label: string;
  type: 'canal' | 'sewer' | 'service' | 'rail' | 'rooftop' | 'medical' | 'vortessence';
  secrecy: number;
  throughput: number;
  risk: number;
  controlledBy: 'Lambda' | 'Combine' | 'Contested';
};

export type ResistanceOperation = {
  id: ResistanceOperationId;
  name: string;
  description: string;
  target: 'cell' | 'route' | 'sector' | 'network';
  cost: Partial<Stats>;
  effects: Partial<Stats>;
  cellEffects?: Partial<Pick<ResistanceCell, 'secrecy' | 'manpower' | 'weapons' | 'supplies' | 'morale' | 'tunnelAccess' | 'radioReach' | 'vortigauntSupport' | 'scientificCapacity' | 'infiltration' | 'heat'>>;
  routeEffects?: Partial<Pick<ResistanceRoute, 'secrecy' | 'throughput' | 'risk'>>;
  sectorEffects?: Partial<Pick<Sector, 'rebel' | 'surveillance' | 'loyalty' | 'fear' | 'infrastructure'>>;
  logLine: string;
};

export type ResistanceNetworkState = {
  cells: ResistanceCell[];
  routes: ResistanceRoute[];
  activeDoctrine: 'standard_counterinsurgency' | 'decapitation' | 'route_denial' | 'radio_silence' | 'controlled_tolerance' | 'sympathizer_shadow';
  networkCohesion: number;
  armedCapacity: number;
  safehouseIntegrity: number;
  radioFreedom: number;
  tunnelMobility: number;
  vortigauntInfluence: number;
  lambdaScience: number;
  simultaneousOpsRisk: number;
  falseLeadIndex: number;
  discoveredCells: number;
  compromisedCells: number;
  openUprisingCells: number;
  log: string[];
};



export type ResistanceFactionId =
  | 'lambda_science'
  | 'canal_rail'
  | 'armed_citizens'
  | 'free_vortigaunts'
  | 'industrial_saboteurs'
  | 'nova_escapees'
  | 'ravenholm_refugees';

export type ResistanceFactionDoctrineId =
  | 'fragment_and_isolate'
  | 'scientific_decoy'
  | 'canal_denial'
  | 'vortigaunt_containment'
  | 'nova_counter_narrative'
  | 'selective_tolerance';

export type ResistanceFactionOperationId =
  | 'exploit_faction_rivalry'
  | 'target_science_cell'
  | 'flood_canal_route'
  | 'offer_amnesty_workers'
  | 'capture_vortigaunt_contact'
  | 'discredit_nova_escapees'
  | 'burn_ravenholm_safehouse'
  | 'seed_false_supply_drop';

export type ResistanceFaction = {
  id: ResistanceFactionId;
  name: string;
  combineLabel: string;
  doctrine: string;
  preferredSectors: string[];
  influence: number;
  cohesion: number;
  militancy: number;
  secrecy: number;
  publicSympathy: number;
  vortigauntLink: number;
  scientificValue: number;
  xenTolerance: number;
  novaTrauma: number;
  rivalries: ResistanceFactionId[];
  methods: string[];
  currentAgenda: string;
  discovered: boolean;
  suppressed: boolean;
};

export type ResistanceFactionDoctrine = {
  id: ResistanceFactionDoctrineId;
  name: string;
  description: string;
  effects: Partial<Stats>;
  influenceBias: Partial<Record<ResistanceFactionId, number>>;
  risk: number;
};

export type ResistanceFactionOperation = {
  id: ResistanceFactionOperationId;
  name: string;
  description: string;
  targetFaction: ResistanceFactionId;
  cost: Partial<Stats>;
  effects: Partial<Stats>;
  factionEffects: Partial<Pick<ResistanceFaction, 'influence' | 'cohesion' | 'militancy' | 'secrecy' | 'publicSympathy' | 'vortigauntLink' | 'scientificValue' | 'xenTolerance' | 'novaTrauma'>>;
  logLine: string;
};

export type ResistanceFactionState = {
  activeDoctrine: ResistanceFactionDoctrineId;
  factions: ResistanceFaction[];
  dominantFactionId: ResistanceFactionId;
  fragmentationIndex: number;
  scientificThreat: number;
  canalControl: number;
  armedMobilization: number;
  vortigauntDiplomacy: number;
  novaMartyrdom: number;
  ravenholmPanic: number;
  factionWarRisk: number;
  log: string[];
};



export type VortigauntGroupStatus = 'enslaved_biotics' | 'controlled_asset' | 'nova_processed' | 'contained_watch' | 'free_hidden' | 'resistance_allied';
export type VortigauntDoctrineId = 'biotic_labor_control' | 'vortessence_suppression' | 'quarantine_cooperation' | 'nova_extraction' | 'silent_coexistence' | 'clandestine_liberation';
export type VortigauntOperationId =
  | 'biotic_quarantine_reassignment'
  | 'vortessence_interrogation'
  | 'suppress_chant_cycle'
  | 'nova_transfer_biotics'
  | 'controlled_healing_permit'
  | 'negotiate_free_circle'
  | 'false_liberation_trap'
  | 'sever_lambda_vort_link'
  | 'clandestine_release'
  | 'labor_rotation';

export type VortigauntGroup = {
  id: string;
  name: string;
  status: VortigauntGroupStatus;
  location: string;
  count: number;
  condition: number;
  coercion: number;
  vortessenceSignal: number;
  resistanceLink: number;
  xenInsight: number;
  containmentUse: number;
  novaPressure: number;
  escapeRisk: number;
  notes: string;
  lastIncident: string;
};

export type VortigauntDoctrine = {
  id: VortigauntDoctrineId;
  name: string;
  description: string;
  publicLine: string;
  groupBias: Partial<Record<'condition' | 'coercion' | 'vortessenceSignal' | 'resistanceLink' | 'xenInsight' | 'containmentUse' | 'novaPressure' | 'escapeRisk', number>>;
  effects: Partial<Stats>;
  advisorRisk: number;
};

export type VortigauntOperation = {
  id: VortigauntOperationId;
  name: string;
  description: string;
  target: 'group' | 'network';
  cost: Partial<Stats>;
  effects: Partial<Stats>;
  groupEffects: Partial<Pick<VortigauntGroup, 'condition' | 'coercion' | 'vortessenceSignal' | 'resistanceLink' | 'xenInsight' | 'containmentUse' | 'novaPressure' | 'escapeRisk'>>;
  novaEffects?: Partial<Pick<NovaProspektState, 'authority' | 'security' | 'secrecy' | 'intelligence' | 'instability' | 'humaneIndex' | 'bioticsPressure' | 'xenBreachRisk' | 'escaped'>>;
  factionEffects?: Partial<Pick<ResistanceFactionState, 'vortigauntDiplomacy' | 'armedMobilization'>>;
  logLine: string;
};

export type VortigauntState = {
  activeDoctrine: VortigauntDoctrineId;
  groups: VortigauntGroup[];
  totalCaptive: number;
  totalFree: number;
  vortessenceCoherence: number;
  bioticPressure: number;
  xenInsight: number;
  resistanceSympathy: number;
  novaAbuseIndex: number;
  escapeRisk: number;
  advisorInterest: number;
  quarantineAid: number;
  lastVision: string;
  log: string[];
};



export type XenEcosystemLayerId =
  | 'spores'
  | 'wall_biomass'
  | 'headcrab_nest'
  | 'barnacle_bloom'
  | 'organic_tunnels'
  | 'antlion_colony'
  | 'ichthyosaur_wetland'
  | 'human_infection'
  | 'roaming_fauna';

export type XenLayerStage = 'trace' | 'active' | 'bloom' | 'dominant' | 'lost';

export type XenEcosystemPolicyId =
  | 'balanced_containment'
  | 'spore_burn_protocol'
  | 'parasite_denial'
  | 'antlion_suppression'
  | 'specimen_harvest'
  | 'quarantine_abandonment'
  | 'vortessence_mapping';

export type XenEcosystemOperationId =
  | 'mobile_bioscan'
  | 'thermal_sterilization'
  | 'ceiling_scrape'
  | 'nest_denial'
  | 'thumper_grid'
  | 'collapse_organic_tunnel'
  | 'evacuation_triage'
  | 'bait_rebel_vectors'
  | 'vortessence_reading'
  | 'specimen_harvest_run';

export type XenEcosystemLayerDefinition = {
  id: XenEcosystemLayerId;
  name: string;
  combineLabel: string;
  description: string;
  preferredZones: Sector['zone'][];
  spreadBias: number;
  infrastructureDamage: number;
  humanThreat: number;
  containmentHint: string;
};

export type XenEcosystemLayerState = {
  id: string;
  sectorId: string;
  layerId: XenEcosystemLayerId;
  stage: XenLayerStage;
  biomass: number;
  activity: number;
  spread: number;
  containment: number;
  mutationPressure: number;
  humanExposure: number;
  discovered: boolean;
  lastIncident: string;
};

export type XenEcosystemPolicy = {
  id: XenEcosystemPolicyId;
  name: string;
  description: string;
  publicLine: string;
  layerBias: Partial<Record<XenEcosystemLayerId, number>>;
  effects: Partial<Stats>;
  containmentBias: number;
  mutationRisk: number;
  humaneCost: number;
  advisorRisk: number;
};

export type XenEcosystemOperation = {
  id: XenEcosystemOperationId;
  name: string;
  description: string;
  target: 'layer' | 'sector' | 'network';
  cost: Partial<Stats>;
  effects: Partial<Stats>;
  layerEffects: Partial<Pick<XenEcosystemLayerState, 'biomass' | 'activity' | 'spread' | 'containment' | 'mutationPressure' | 'humanExposure' | 'discovered'>>;
  sectorEffects?: Partial<Pick<Sector, 'population' | 'rebel' | 'xen' | 'surveillance' | 'infrastructure' | 'loyalty' | 'fear'>>;
  risk: number;
  logLine: string;
};

export type XenEcosystemState = {
  activePolicy: XenEcosystemPolicyId;
  layers: XenEcosystemLayerState[];
  totalBiomass: number;
  sporeIndex: number;
  parasiteIndex: number;
  antlionPressure: number;
  barnacleDensity: number;
  organicInfrastructureDamage: number;
  humanInfectionIndex: number;
  roamingFaunaIndex: number;
  containmentIndex: number;
  mutationPressure: number;
  lostSectorRisk: number;
  networkSpread: number;
  lastOutbreak: string;
  log: string[];
};



export type XenMutationChainId =
  | 'classic_zombie_conversion'
  | 'fast_zombie_conversion'
  | 'poison_zombie_conversion'
  | 'spore_bloom_mutation'
  | 'hospital_mutagenic_surge'
  | 'barnacle_logistics_lock'
  | 'antlion_hive_emergence'
  | 'organic_tunnel_metastasis'
  | 'ichthyosaur_water_predation'
  | 'roaming_fauna_scavenger_loop'
  | 'gonarch_alarm_chain';

export type XenMutationStage = 'latent' | 'triggered' | 'accelerating' | 'outbreak' | 'catastrophic';

export type XenMutationPolicyId =
  | 'contain_hosts_first'
  | 'parasite_denial'
  | 'burn_mutation_sites'
  | 'harvest_mutagenic_samples'
  | 'triage_humanitarian_mask'
  | 'vortessence_guided_stabilization';

export type XenMutationOperationId =
  | 'host_triage_sweep'
  | 'decapitate_parasite_chain'
  | 'fast_zombie_containment'
  | 'poison_biohazard_lock'
  | 'sterilize_hospital_cluster'
  | 'clear_barnacle_chokepoint'
  | 'deploy_thumper_hive_grid'
  | 'collapse_mutation_tunnel'
  | 'purge_water_predators'
  | 'capture_mutagenic_sample'
  | 'vortessence_chain_reading'
  | 'declare_ravenholm_denial_zone';

export type XenMutationChainDefinition = {
  id: XenMutationChainId;
  name: string;
  combineLabel: string;
  description: string;
  trigger: string;
  requiredLayers: XenEcosystemLayerId[];
  preferredZones: Sector['zone'][];
  loreChain: string[];
  severity: 1 | 2 | 3 | 4 | 5;
  containmentHint: string;
  sectorEffects: Partial<Pick<Sector, 'xen' | 'fear' | 'loyalty' | 'infrastructure' | 'population' | 'status'>>;
  statsEffects: Partial<Stats>;
};

export type XenMutationChainState = {
  id: string;
  chainId: XenMutationChainId;
  sectorId: string;
  stage: XenMutationStage;
  progress: number;
  triggerPressure: number;
  containment: number;
  hostPool: number;
  conversionLoad: number;
  mutationLoad: number;
  discovered: boolean;
  daysActive: number;
  lastMutation: string;
};

export type XenMutationPolicy = {
  id: XenMutationPolicyId;
  name: string;
  description: string;
  publicLine: string;
  effects: Partial<Stats>;
  chainBias: Partial<Record<XenMutationChainId, number>>;
  containmentBias: number;
  civilianCost: number;
  advisorRisk: number;
};

export type XenMutationOperation = {
  id: XenMutationOperationId;
  name: string;
  description: string;
  target: 'chain' | 'sector' | 'network';
  cost: Partial<Stats>;
  effects: Partial<Stats>;
  chainEffects: Partial<Pick<XenMutationChainState, 'progress' | 'triggerPressure' | 'containment' | 'hostPool' | 'conversionLoad' | 'mutationLoad' | 'discovered'>>;
  sectorEffects?: Partial<Pick<Sector, 'population' | 'rebel' | 'xen' | 'surveillance' | 'infrastructure' | 'loyalty' | 'fear' | 'status'>>;
  risk: number;
  logLine: string;
};

export type XenMutationState = {
  activePolicy: XenMutationPolicyId;
  chains: XenMutationChainState[];
  zombieIndex: number;
  fastZombieIndex: number;
  poisonZombieIndex: number;
  hostConversionIndex: number;
  mutationVelocity: number;
  outbreakRisk: number;
  sectorLockdownPressure: number;
  antlionHivePressure: number;
  logisticsBlockage: number;
  quarantineDebt: number;
  lastChainEvent: string;
  log: string[];
};



export type QuarantineStage =
  | 'sanitary_watch'
  | 'partial_quarantine'
  | 'full_quarantine'
  | 'sealed_zone'
  | 'abandoned_zone'
  | 'organic_zone'
  | 'lost_zone'
  | 'ravenholm_like';

export type QuarantinePolicyId =
  | 'transparent_containment'
  | 'silent_seal'
  | 'industrial_override'
  | 'burn_and_forget'
  | 'biotic_humanitarian_mask'
  | 'ravenholm_denial';

export type QuarantineOperationId =
  | 'raise_sanitary_watch'
  | 'partial_lockdown'
  | 'full_sector_quarantine'
  | 'seal_access_points'
  | 'controlled_evacuation'
  | 'thermal_purge_zone'
  | 'declare_exclusion_zone'
  | 'ravenholm_black_file'
  | 'network_sanitary_grid'
  | 'families_information_embargo'
  | 'biotic_recon_passage'
  | 'headcrab_shell_aftermath_protocol';

export type QuarantineStageDefinition = {
  id: QuarantineStage;
  label: string;
  combineLabel: string;
  description: string;
  severity: 1 | 2 | 3 | 4 | 5;
  publicMask: string;
  loreOutcome: string;
};

export type QuarantineSectorState = {
  id: string;
  sectorId: string;
  stage: QuarantineStage;
  exposure: number;
  containment: number;
  secrecy: number;
  civilianTrapped: number;
  evacuationProgress: number;
  infrastructureLoss: number;
  lastDecision: string;
  daysInStage: number;
  ravenholmMemory: number;
};

export type QuarantinePolicy = {
  id: QuarantinePolicyId;
  name: string;
  description: string;
  publicLine: string;
  stageBias: number;
  secrecyDelta: number;
  civilianCost: number;
  productionCost: number;
  advisorRisk: number;
  effects: Partial<Stats>;
};

export type QuarantineOperation = {
  id: QuarantineOperationId;
  name: string;
  description: string;
  target: 'sector' | 'network';
  cost: Partial<Stats>;
  effects: Partial<Stats>;
  zoneEffects: {
    stageStep?: number;
    forceStage?: QuarantineStage;
    exposureDelta?: number;
    containmentDelta?: number;
    secrecyDelta?: number;
    civilianTrappedDelta?: number;
    evacuationDelta?: number;
    infrastructureLossDelta?: number;
    ravenholmMemoryDelta?: number;
  };
  sectorEffects?: Partial<Pick<Sector, 'population' | 'xen' | 'rebel' | 'surveillance' | 'infrastructure' | 'loyalty' | 'fear' | 'status'>>;
  logLine: string;
  risk: number;
};

export type QuarantineZoneState = {
  activePolicy: QuarantinePolicyId;
  zones: QuarantineSectorState[];
  sanitaryWatchCount: number;
  partialCount: number;
  fullCount: number;
  sealedCount: number;
  organicCount: number;
  lostCount: number;
  ravenholmLikeCount: number;
  trappedCivilianEstimate: number;
  evacuationIndex: number;
  secrecyIndex: number;
  containmentIndex: number;
  biologicalExclusionIndex: number;
  ravenholmMemoryIndex: number;
  publicContradictionRisk: number;
  lastZoneEvent: string;
  log: string[];
};



export type XenResearchProgramId =
  | 'parasite_lifecycle'
  | 'antlion_extract_harvest'
  | 'spore_biomass_analysis'
  | 'barnacle_adhesive'
  | 'organic_tunnel_study'
  | 'ichthyosaur_aquatic_organ'
  | 'headcrab_shell_delivery'
  | 'gonarch_reproductive_alarm'
  | 'vortessence_bio_reading'
  | 'nova_biotics_experiment';

export type XenResearchStage = 'field_samples' | 'contained_study' | 'active_trial' | 'weaponized' | 'blacksite_catastrophe';

export type XenResearchPolicyId =
  | 'cautious_containment'
  | 'accelerated_harvest'
  | 'industrial_exploitation'
  | 'weaponization_directive'
  | 'nova_blacksite_sync'
  | 'biotic_consultation';

export type XenResearchOperationId =
  | 'mobile_specimen_capture'
  | 'harvest_antlion_extract'
  | 'secure_headcrab_canisters'
  | 'spore_culture_analysis'
  | 'barnacle_resin_scrape'
  | 'quarantine_lab_lockdown'
  | 'transfer_specimens_nova'
  | 'deploy_research_team'
  | 'weaponize_headcrab_shell_batch'
  | 'purge_failed_experiment'
  | 'vortigaunt_interpretation_session'
  | 'falsify_lab_manifest';

export type XenResearchProgramDefinition = {
  id: XenResearchProgramId;
  name: string;
  combineLabel: string;
  description: string;
  sampleFocus: string;
  relatedLayers: XenEcosystemLayerId[];
  relatedChains: XenMutationChainId[];
  riskProfile: string;
  breakthrough: string;
};

export type XenResearchProgramState = {
  id: string;
  programId: XenResearchProgramId;
  stage: XenResearchStage;
  progress: number;
  samples: number;
  containment: number;
  liveSpecimens: number;
  weaponization: number;
  industrialUse: number;
  ethicalDebt: number;
  advisorFlag: number;
  breakthroughUnlocked: boolean;
  lastFinding: string;
};

export type XenResearchPolicy = {
  id: XenResearchPolicyId;
  name: string;
  description: string;
  publicLine: string;
  progressBias: number;
  containmentBias: number;
  sampleBias: number;
  weaponizationBias: number;
  industrialBias: number;
  advisorRisk: number;
  humaneCost: number;
  effects: Partial<Stats>;
};

export type XenResearchOperation = {
  id: XenResearchOperationId;
  name: string;
  description: string;
  target: 'program' | 'network';
  cost: Partial<Stats>;
  effects: Partial<Stats>;
  researchEffects: {
    progressDelta?: number;
    specimenDelta?: number;
    antlionExtractDelta?: number;
    parasiteStockDelta?: number;
    sporeSampleDelta?: number;
    biomassSampleDelta?: number;
    containmentDelta?: number;
    incidentRiskDelta?: number;
    advisorInterestDelta?: number;
    ethicalDebtDelta?: number;
    industrialYieldDelta?: number;
    weaponizationDelta?: number;
    blackSiteSecrecyDelta?: number;
  };
  sectorEffects?: Partial<Pick<Sector, 'population' | 'rebel' | 'xen' | 'surveillance' | 'infrastructure' | 'loyalty' | 'fear' | 'status'>>;
  novaEffects?: {
    authorityDelta?: number;
    securityDelta?: number;
    secrecyDelta?: number;
    intelligenceDelta?: number;
    instabilityDelta?: number;
    humaneIndexDelta?: number;
    bioticsPressureDelta?: number;
    xenBreachRiskDelta?: number;
  };
  risk: number;
  logLine: string;
};

export type XenResearchState = {
  activePolicy: XenResearchPolicyId;
  programs: XenResearchProgramState[];
  researchProgressIndex: number;
  containmentIntegrity: number;
  liveSpecimenCount: number;
  parasiteStock: number;
  antlionExtract: number;
  sporeSamples: number;
  biomassSamples: number;
  weaponizationIndex: number;
  industrialYield: number;
  labIncidentRisk: number;
  advisorInterest: number;
  ethicalDebt: number;
  blackSiteSecrecy: number;
  bioweaponReadiness: number;
  breakthroughCount: number;
  lastIncident: string;
  log: string[];
};



export type XenCatastropheId =
  | 'industrial_tentacle_emergence'
  | 'gonarch_reproductive_alarm'
  | 'antlion_mass_migration'
  | 'contaminated_razor_train'
  | 'hospital_nest_conversion'
  | 'organic_substructure_collapse'
  | 'headcrab_shell_backfire'
  | 'ichthyosaur_canal_breach'
  | 'barnacle_ceiling_city_bloom'
  | 'nova_specimen_escape';

export type XenCatastropheStage = 'watch' | 'warning' | 'active' | 'citywide' | 'catastrophic';

export type XenCatastrophePolicyId =
  | 'preventive_lockdown'
  | 'contain_and_classify'
  | 'sacrifice_sector'
  | 'weaponize_catastrophe'
  | 'public_health_mask'
  | 'vortessence_emergency_read';

export type XenCatastropheOperationId =
  | 'deploy_heavy_containment'
  | 'advisor_seal_order'
  | 'thumper_line_emergency'
  | 'evacuate_key_personnel'
  | 'burn_nest_core'
  | 'sever_razor_manifest'
  | 'headcrab_denial_cleanup'
  | 'vortessence_stabilization'
  | 'false_rebel_attribution'
  | 'abandon_sector_black_file'
  | 'nova_breach_lockdown'
  | 'containment_failure_drill';

export type XenCatastropheDefinition = {
  id: XenCatastropheId;
  name: string;
  combineLabel: string;
  description: string;
  trigger: string;
  visibleSign: string;
  preferredZones: Sector['zone'][];
  relatedLayers: XenEcosystemLayerId[];
  relatedChains: XenMutationChainId[];
  relatedResearch: XenResearchProgramId[];
  baseSeverity: 1 | 2 | 3 | 4 | 5;
  containmentProtocol: string;
  loreOutcome: string;
  sectorEffects: Partial<Pick<Sector, 'population' | 'xen' | 'rebel' | 'surveillance' | 'infrastructure' | 'loyalty' | 'fear' | 'status'>>;
  statsEffects: Partial<Stats>;
};

export type XenCatastropheEventState = {
  id: string;
  catastropheId: XenCatastropheId;
  sectorId: string;
  stage: XenCatastropheStage;
  probability: number;
  intensity: number;
  containment: number;
  civilianExposure: number;
  combineCommitment: number;
  publicCover: number;
  discovered: boolean;
  daysActive: number;
  lastReport: string;
};

export type XenCatastrophePolicy = {
  id: XenCatastrophePolicyId;
  name: string;
  description: string;
  publicLine: string;
  containmentBias: number;
  secrecyBias: number;
  sacrificeBias: number;
  advisorRisk: number;
  humaneCost: number;
  effects: Partial<Stats>;
};

export type XenCatastropheOperation = {
  id: XenCatastropheOperationId;
  name: string;
  description: string;
  target: 'event' | 'sector' | 'network';
  cost: Partial<Stats>;
  effects: Partial<Stats>;
  eventEffects: Partial<Pick<XenCatastropheEventState, 'probability' | 'intensity' | 'containment' | 'civilianExposure' | 'combineCommitment' | 'publicCover' | 'discovered'>>;
  sectorEffects?: Partial<Pick<Sector, 'population' | 'xen' | 'rebel' | 'surveillance' | 'infrastructure' | 'loyalty' | 'fear' | 'status'>>;
  risk: number;
  logLine: string;
};

export type XenCatastropheState = {
  activePolicy: XenCatastrophePolicyId;
  events: XenCatastropheEventState[];
  totalCatastropheRisk: number;
  activeEventCount: number;
  citywideRisk: number;
  advisorEmergency: number;
  infrastructureCollapse: number;
  xenPanic: number;
  containmentDebt: number;
  ravenholmProbability: number;
  lastCatastrophe: string;
  log: string[];
};



export type MajorStoryEventId =
  | 'advisor_arrival'
  | 'breencast_relay_blast'
  | 'razor_train_loss'
  | 'nova_prospekt_escape'
  | 'civil_protection_mutiny'
  | 'major_xen_rift'
  | 'lambda_coordinated_assault'
  | 'citadel_blackout'
  | 'vortigaunt_resonance_burst'
  | 'headcrab_shell_exposure';

export type MajorStoryEventCategory = 'advisor' | 'propaganda' | 'infrastructure' | 'nova' | 'civil_protection' | 'xen' | 'resistance' | 'citadel' | 'vortigaunt' | 'bioweapon';
export type MajorStoryStage = 'dormant' | 'warning' | 'active' | 'climax' | 'contained' | 'failed';

export type MajorStoryPolicyId =
  | 'preventive_censorship'
  | 'force_escalation'
  | 'classified_delay'
  | 'controlled_disclosure'
  | 'advisor_submission'
  | 'sympathizer_misdirection';

export type MajorStoryOperationId =
  | 'advisor_reception_lockdown'
  | 'restore_breencast_grid'
  | 'secure_razor_manifest'
  | 'nova_hunt_protocol'
  | 'purge_cp_ringleaders'
  | 'seal_xen_rift'
  | 'disrupt_lambda_assault'
  | 'blacksite_cover_story'
  | 'sacrificial_sector_lock'
  | 'quiet_civilian_evacuation';

export type MajorStoryEventDefinition = {
  id: MajorStoryEventId;
  title: string;
  combineLabel: string;
  category: MajorStoryEventCategory;
  description: string;
  trigger: string;
  warningSigns: string[];
  preferredSectors: string[];
  campaignBias: CampaignId[];
  timelineBias: TimelineId[];
  baseHeat: number;
  escalationRate: number;
  statsEffects: Partial<Stats>;
  sectorEffects: Partial<Pick<Sector, 'rebel' | 'xen' | 'surveillance' | 'infrastructure' | 'loyalty' | 'fear' | 'population' | 'status'>>;
  narrativePayoff: string;
  loreTags: string[];
};

export type MajorStoryEventRuntime = {
  id: string;
  eventId: MajorStoryEventId;
  sectorId: string;
  stage: MajorStoryStage;
  heat: number;
  secrecy: number;
  containment: number;
  publicAwareness: number;
  advisorAttention: number;
  lambdaOpportunity: number;
  xenInstability: number;
  daysInStage: number;
  triggeredDay?: number;
  resolvedDay?: number;
  lastReport: string;
};

export type MajorStoryPolicy = {
  id: MajorStoryPolicyId;
  name: string;
  description: string;
  publicLine: string;
  effects: Partial<Stats>;
  heatBias: number;
  secrecyBias: number;
  containmentBias: number;
  advisorRisk: number;
};

export type MajorStoryOperation = {
  id: MajorStoryOperationId;
  name: string;
  description: string;
  target: 'event' | 'sector' | 'citywide';
  cost: Partial<Stats>;
  effects: Partial<Stats>;
  eventEffects: Partial<Pick<MajorStoryEventRuntime, 'heat' | 'secrecy' | 'containment' | 'publicAwareness' | 'advisorAttention' | 'lambdaOpportunity' | 'xenInstability'>> & {
    heatDelta?: number;
    secrecyDelta?: number;
    containmentDelta?: number;
    publicAwarenessDelta?: number;
    advisorAttentionDelta?: number;
    lambdaOpportunityDelta?: number;
    xenInstabilityDelta?: number;
  };
  sectorEffects?: Partial<Pick<Sector, 'rebel' | 'xen' | 'surveillance' | 'infrastructure' | 'loyalty' | 'fear' | 'population' | 'status'>>;
  risk: number;
  bestAgainst: MajorStoryEventId[];
  logLine: string;
};

export type MajorStoryEventState = {
  activePolicy: MajorStoryPolicyId;
  events: MajorStoryEventRuntime[];
  currentArcId: MajorStoryEventId | null;
  citywideHeat: number;
  unresolvedMajorEvents: number;
  advisorNarrativePressure: number;
  publicContradiction: number;
  lambdaNarrativeMomentum: number;
  xenNarrativePressure: number;
  blackoutRisk: number;
  lastMajorEvent: string;
  log: string[];
};




export type VideoArchiveFeedId =
  | 'cam_res_a_17'
  | 'cp_checkpoint_11'
  | 'razor_intake_04'
  | 'nova_block_b'
  | 'xen_contain_02'
  | 'citadel_spire_link'
  | 'canal_lambda_shadow'
  | 'hospital_quarantine_cam'
  | 'industrial_biocam'
  | 'vortessence_interference';

export type VideoArchiveCategory = 'residential' | 'civil_protection' | 'transport' | 'nova' | 'xen' | 'citadel' | 'resistance' | 'industrial' | 'vortigaunt';
export type VideoArchivePolicyId = 'passive_monitoring' | 'cp_surveillance_priority' | 'nova_blackout' | 'xen_biofeed_priority' | 'lambda_signal_trap' | 'citadel_evidence_scrub' | 'sympathizer_archive_leak';
export type VideoArchiveOperationId = 'restore_feed_integrity' | 'scrub_incriminating_frames' | 'tag_lambda_suspect' | 'isolate_xen_frames' | 'export_advisor_evidence' | 'plant_false_timestamp' | 'route_to_nova_intake' | 'release_anonymized_clip' | 'triangulate_source' | 'lock_camera_cluster';

export type VideoArchiveFeedDelta = Partial<Pick<VideoArchiveFeedRuntime, 'integrity' | 'corruption' | 'publicExposure' | 'evidenceValue' | 'lambdaNoise' | 'xenNoise' | 'citadelScrutiny'>>;

export type VideoArchiveFeedDefinition = {
  id: VideoArchiveFeedId;
  sourceCode: string;
  label: string;
  category: VideoArchiveCategory;
  preferredSectors: string[];
  description: string;
  visualSignature: string;
  signalArtifacts: string[];
  sensitiveBecause: string;
  baseCorruption: number;
  baseSensitivity: number;
  loreTags: string[];
};

export type VideoArchiveFeedRuntime = {
  id: string;
  feedId: VideoArchiveFeedId;
  sectorId: string;
  integrity: number;
  corruption: number;
  publicExposure: number;
  evidenceValue: number;
  lambdaNoise: number;
  xenNoise: number;
  citadelScrutiny: number;
  archivedClips: number;
  recording: boolean;
  locked: boolean;
  discovered: boolean;
  lastFrame: string;
};

export type VideoArchivePolicy = {
  id: VideoArchivePolicyId;
  name: string;
  description: string;
  statsDelta: Partial<Stats>;
  feedDelta: VideoArchiveFeedDelta;
  logLine: string;
};

export type VideoArchiveOperation = {
  id: VideoArchiveOperationId;
  name: string;
  description: string;
  target: 'feed' | 'citywide';
  statsDelta: Partial<Stats>;
  feedDelta: VideoArchiveFeedDelta;
  risk: number;
  bestAgainst: VideoArchiveFeedId[];
  logLine: string;
};

export type VideoArchiveState = {
  activePolicy: VideoArchivePolicyId;
  feeds: VideoArchiveFeedRuntime[];
  signalIntegrity: number;
  archiveCorruption: number;
  evidenceBacklog: number;
  publicLeakRisk: number;
  advisorEvidenceDemand: number;
  lambdaSignalIntrusion: number;
  xenVisualNoise: number;
  novaBlackoutLevel: number;
  archivedClipsTotal: number;
  lastClip: string;
  log: string[];
};

export type FinalVerdictAxisId =
  | 'city_control'
  | 'civilian_survival'
  | 'resistance_status'
  | 'xen_status'
  | 'nova_prospekt'
  | 'vortigaunts'
  | 'reports'
  | 'campaign_legacy';

export type FinalVerdictClassification = 'success' | 'pyrrhic' | 'failure' | 'catastrophe' | 'secret' | 'ambiguous';

export type FinalEndingDefinition = {
  id: string;
  title: string;
  subtitle: string;
  classification: FinalVerdictClassification;
  tone: string;
  loreFrame: string;
  publicConclusion: string;
  hiddenConclusion: string;
  archiveTags: string[];
  priority: number;
};

export type FinalVerdictAxis = {
  id: FinalVerdictAxisId;
  label: string;
  score: number;
  grade: 'stable' | 'strained' | 'critical' | 'lost';
  summary: string;
  detail: string;
  loreTags: string[];
};

export type FinalVerdictState = {
  id: string;
  day: number;
  city: string;
  endingId: string;
  title: string;
  subtitle: string;
  classification: FinalVerdictClassification;
  tone: string;
  finalScore: number;
  mandateScore: number;
  humanCostIndex: number;
  combineControlIndex: number;
  xenLegacyIndex: number;
  lambdaLegacyIndex: number;
  reportIntegrity: number;
  publicVerdict: string;
  hiddenTruth: string;
  advisorJudgement: string;
  triggeredBy: string;
  axes: FinalVerdictAxis[];
  archiveLines: string[];
  recommendations: string[];
  unlockedEndingIds: string[];
};


export type FinalChronicleChapterId =
  | 'executive_summary'
  | 'administration_record'
  | 'covered_crimes'
  | 'lost_sectors'
  | 'nova_prospekt'
  | 'xen_status'
  | 'resistance_survivors'
  | 'citadel_verdict'
  | 'historical_memory';

export type FinalChronicleClassification = 'public' | 'restricted' | 'blacksite' | 'erased';

export type FinalChronicleChapterDefinition = {
  id: FinalChronicleChapterId;
  title: string;
  subtitle: string;
  publicHeader: string;
  restrictedHeader: string;
  loreTags: string[];
};

export type FinalChronicleChapter = {
  id: FinalChronicleChapterId;
  title: string;
  subtitle: string;
  classification: FinalChronicleClassification;
  publicText: string;
  restrictedText: string;
  evidence: string[];
  consequences: string[];
  loreTags: string[];
};

export type FinalChronicleSectorEntry = {
  sectorId: string;
  name: string;
  finalStatus: SectorStatus;
  controllingMemory: 'Combine' | 'Lambda' | 'Xen' | 'Quarantine' | 'Destroyed' | 'Contested';
  populationRemaining: number;
  infrastructure: number;
  rebel: number;
  xen: number;
  note: string;
};

export type FinalChronicleLedger = {
  civilianLosses: number;
  combineLosses: number;
  novaTransfers: number;
  novaEscapes: number;
  trappedCivilians: number;
  xenLostSectors: number;
  ravenholmLikeSectors: number;
  falsificationIndex: number;
  auditHeat: number;
  mandateScore: number;
};

export type FinalChronicleState = {
  id: string;
  generatedDay: number;
  city: string;
  title: string;
  subtitle: string;
  archivalClassification: FinalChronicleClassification;
  openingStatement: string;
  publicArchive: string;
  restrictedArchive: string;
  finalSignature: string;
  ledger: FinalChronicleLedger;
  sectorLedger: FinalChronicleSectorEntry[];
  chapters: FinalChronicleChapter[];
  timeline: string[];
  exportText: string;
};



export type DecisionHistoryCategory =
  | 'directive'
  | 'sector'
  | 'deployment'
  | 'rationing'
  | 'nova'
  | 'propaganda'
  | 'report'
  | 'citizen'
  | 'informant'
  | 'civil_protection'
  | 'technology'
  | 'resistance'
  | 'vortigaunt'
  | 'xen'
  | 'campaign'
  | 'story_event'
  | 'video'
  | 'atmosphere'
  | 'save'
  | 'system';

export type DecisionHistorySource =
  | 'operator'
  | 'coan'
  | 'citadel'
  | 'advisor'
  | 'nova'
  | 'civil_protection'
  | 'quarantine'
  | 'lambda'
  | 'xen'
  | 'archive';

export type DecisionHistoryFilterId = 'all' | 'operator' | 'hidden' | 'reports' | 'xen' | 'lambda' | 'nova' | 'citadel' | 'civil';

export type DecisionHistoryEntry = {
  id: string;
  day: number;
  sequence: number;
  createdAt: string;
  category: DecisionHistoryCategory;
  source: DecisionHistorySource;
  title: string;
  summary: string;
  operatorIntent: string;
  targetLabel: string;
  classification: string;
  severity: 1 | 2 | 3 | 4 | 5;
  statsSnapshot: Stats | null;
  statsDelta: Partial<Stats>;
  immediateEffects: string[];
  deferredConsequences: string[];
  hiddenConsequences: string[];
  relatedReportDay: number | null;
  realReportExcerpt: string[];
  transmittedReportExcerpt: string[];
  falsificationScore: number;
  auditRisk: number;
  tags: string[];
  fingerprint: string;
};

export type DecisionHistoryState = {
  entries: DecisionHistoryEntry[];
  recordedFingerprints: string[];
  lastSequence: number;
  activeFilter: DecisionHistoryFilterId;
  categoryCounts: Record<DecisionHistoryCategory, number>;
  highRiskCount: number;
  hiddenConsequenceCount: number;
  reportEntryCount: number;
  averageFalsification: number;
  lastExportText: string;
};


export type DifficultyPresetId = 'civil_observer' | 'standard_occupation' | 'hardline_city' | 'quarantine_blacksite' | 'uprising_nightmare' | 'custom';

export type DifficultyScalarKey =
  | 'lambdaForce'
  | 'xenVelocity'
  | 'citadelSeverity'
  | 'advisorTolerance'
  | 'rationScarcity'
  | 'productionBase'
  | 'cpBrutality'
  | 'novaPressure'
  | 'technologyDebt'
  | 'campaignPressure'
  | 'citizenFragility'
  | 'reportAuditStrictness';

export type DifficultyScalars = Record<DifficultyScalarKey, number>;

export type DifficultyPreset = {
  id: DifficultyPresetId;
  name: string;
  subtitle: string;
  loreFrame: string;
  classification: string;
  recommendedFor: string;
  scalars: DifficultyScalars;
  startingEffects: Partial<Stats>;
  dailyEffects: Partial<Stats>;
  sectorEffects: Partial<Pick<Sector, 'rebel' | 'xen' | 'surveillance' | 'infrastructure' | 'loyalty' | 'fear'>>;
  unlockNotes: string[];
};

export type DifficultySettingsState = {
  activePresetId: DifficultyPresetId;
  customName: string;
  scalars: DifficultyScalars;
  lastAppliedDay: number;
  projectedThreat: number;
  auditModifier: number;
  dailyPressure: number;
  startSummary: string;
  log: string[];
};


export type GameplayBalanceBand = 'underpowered' | 'stable' | 'tense' | 'runaway';
export type GameplayBalanceMetricId =
  | 'lambda_pressure'
  | 'xen_pressure'
  | 'citadel_pressure'
  | 'civil_stress'
  | 'economy_viability'
  | 'control_apparatus'
  | 'moral_debt'
  | 'runaway_risk';

export type GameplayBalanceMetricDefinition = {
  id: GameplayBalanceMetricId;
  label: string;
  targetLow: number;
  targetHigh: number;
  dangerHigh: boolean;
  description: string;
  loreIntent: string;
};

export type GameplayBalanceMetric = {
  id: GameplayBalanceMetricId;
  label: string;
  value: number;
  targetLow: number;
  targetHigh: number;
  band: GameplayBalanceBand;
  bandLabel: string;
  description: string;
  loreIntent: string;
  drivers: string[];
  recommendation: string;
};

export type LongRunProjectionPoint = {
  day: number;
  lambda: number;
  xen: number;
  civil: number;
  audit: number;
  collapseRisk: number;
};

export type LongRunPlaytestScenario = {
  id: string;
  name: string;
  setup: string;
  expectedArc: string;
  warningSigns: string[];
};

export type GameplayBalanceReport = {
  version: string;
  score: number;
  statusLabel: string;
  headline: string;
  metrics: GameplayBalanceMetric[];
  recommendations: string[];
  projection: LongRunProjectionPoint[];
  playtestScenarios: LongRunPlaytestScenario[];
  runbook: string[];
  exportText: string;
};

export type ReportPolicy = 'truthful' | 'minimize_rebellion' | 'hide_xen' | 'hide_casualties' | 'inflate_productivity' | 'model_city' | 'sympathizer_cover';
export type RouteType = 'surface' | 'canal' | 'sewer' | 'rail' | 'citadel' | 'quarantine' | 'service';
export type SectorStatus = 'Stable' | 'Surveillé' | 'Sous couvre-feu' | 'Insurgé' | 'Saboté' | 'Contaminé' | 'Infesté' | 'En quarantaine' | 'Scellé' | 'Bombardé' | 'Abandonné' | 'Zone de combat' | 'Contrôle rebelle' | 'Contrôle Combine total';

export type Stats = {
  stability: number;
  loyalty: number;
  fear: number;
  rebel: number;
  xen: number;
  combine: number;
  production: number;
  rations: number;
  citadel: number;
  info: number;
  fatigue: number;
  civilianLosses: number;
  combineLosses: number;
  suspicion: number;
};

export type SectorConnection = {
  to: string;
  type: RouteType;
  label: string;
  risk: number;
  controlledBy: 'Combine' | 'Resistance' | 'Xen' | 'Contested';
};

export type Sector = {
  id: string;
  name: string;
  role: string;
  population: number;
  status: SectorStatus;
  rebel: number;
  xen: number;
  surveillance: number;
  infrastructure: number;
  loyalty: number;
  fear: number;
  units: Record<string, number>;
  notes: string;
  x: number;
  y: number;
  zone: 'Centre administratif' | 'Résidentiel' | 'Infrastructure' | 'Souterrain' | 'Quarantaine' | 'Citadelle' | 'Périphérie';
  strategicValue: number;
  chokePoint: boolean;
  connections: SectorConnection[];
};


export type TimelineSectorEffect = Partial<Pick<Sector, 'rebel' | 'xen' | 'surveillance' | 'infrastructure' | 'loyalty' | 'fear' | 'status'>> & {
  sectorIds: string[];
};

export type TimelinePreset = {
  id: TimelineId;
  name: string;
  subtitle: string;
  canonWindow: string;
  briefing: string;
  statEffects: Partial<Stats>;
  dailyEffects: Partial<Stats>;
  sectorEffects: TimelineSectorEffect[];
  unitReserveOverrides: Partial<Record<string, number>>;
  directiveBias: Array<keyof Stats>;
  eventBias: {
    rebellion: number;
    xen: number;
    citadel: number;
    civil: number;
    moral: number;
  };
  availabilityNotes: string[];
  unlocks: string[];
};

export type Unit = {
  id: string;
  name: string;
  category: 'Civil Protection' | 'Overwatch' | 'Synth' | 'Airwatch' | 'Biocontrol' | 'Authority';
  description: string;
  strength: string;
  weakness: string;
  reserve: number;
  lore: string;
};

export type XenEntity = {
  name: string;
  danger: number;
  ecology: string;
  preferred: string;
  containment: string;
};

export type EventChoice = {
  id: string;
  label: string;
  detail: string;
  effects: Partial<Stats> & Partial<Record<'sectorRebel' | 'sectorXen' | 'sectorFear' | 'sectorLoyalty' | 'sectorInfrastructure', number>>;
  status?: SectorStatus;
};

export type CrisisType = 'REBELLION' | 'XEN' | 'CITADEL' | 'CIVIL' | 'MORAL' | 'COMBINE' | 'PROPAGANDA' | 'INFRASTRUCTURE';

export type Crisis = {
  id: string;
  type: CrisisType;
  title: string;
  sectorId?: string;
  severity?: 1 | 2 | 3 | 4 | 5;
  body: string;
  choices: EventChoice[];
  loreTags?: string[];
  repeatable?: boolean;
  consequences?: string;
};



export type BreencastCategory = 'rebellion' | 'xen' | 'rations' | 'nova' | 'audit' | 'civilian' | 'productivity' | 'continuity';

export type BreencastMessage = {
  id: string;
  category: BreencastCategory;
  title: string;
  publicLine: string;
  hiddenIntent: string;
  effects: Partial<Stats>;
  severity: number;
  loreTags: string[];
};

export type BreencastStrategy = {
  id: string;
  name: string;
  description: string;
  effects: Partial<Stats>;
  risk: number;
  bestAgainst: string[];
};

export type NovaZoneEffect = Partial<Stats> & {
  authority?: number;
  security?: number;
  secrecy?: number;
  intelligence?: number;
  instability?: number;
  humaneIndex?: number;
  bioticsPressure?: number;
  xenBreachRisk?: number;
  overwatchYield?: number;
  escaped?: number;
};

export type NovaFacilityZone = {
  id: string;
  name: string;
  function: string;
  security: number;
  instability: number;
  secrecy: number;
  capacity: number;
  detainees: number;
  staff: number;
  notes: string;
};

export type NovaDetainee = {
  id: string;
  name: string;
  category: NovaDetaineeCategory;
  value: number;
  risk: number;
  condition: number;
  notes: string;
};

export type NovaPolicy = {
  id: string;
  name: string;
  description: string;
  effects: NovaZoneEffect;
};

export type NovaOperation = {
  id: string;
  name: string;
  zoneId: string;
  description: string;
  duration: number;
  effects: NovaZoneEffect;
  risk: number;
};

export type NovaProspektState = {
  active: boolean;
  interfaceMode: NovaInterfaceMode;
  authority: number;
  security: number;
  secrecy: number;
  intelligence: number;
  instability: number;
  humaneIndex: number;
  transferredToday: number;
  totalTransferred: number;
  escaped: number;
  convertedCandidates: number;
  bioticsPressure: number;
  xenBreachRisk: number;
  zones: NovaFacilityZone[];
  detainees: NovaDetainee[];
  policies: NovaPolicy[];
  activePolicy: string;
  log: string[];
};


export type SaveSlotId = 'slot_01' | 'slot_02' | 'slot_03' | 'slot_04' | 'slot_05' | 'slot_06';
export type SaveSlotTone = 'city' | 'citadel' | 'nova' | 'xen' | 'resistance' | 'archive';

export type SaveSlotDefinition = {
  id: SaveSlotId;
  label: string;
  shortLabel: string;
  description: string;
  tone: SaveSlotTone;
};

export type SaveSlotMeta = {
  slotId: SaveSlotId;
  label: string;
  appLabel: string;
  schemaVersion: number;
  savedAt: string;
  city: string;
  day: number;
  scenario: ScenarioId;
  timeline: TimelineId;
  profile: ProfileId;
  campaignId: CampaignId;
  campaignName: string;
  ending: string | null;
  finalVerdictTitle?: string;
  statsSnapshot: {
    stability: number;
    loyalty: number;
    fear: number;
    rebel: number;
    xen: number;
    production: number;
    rations: number;
    suspicion: number;
    auditHeat: number;
    civilianLosses: number;
  };
  moduleSnapshot: {
    lambdaNetwork: number;
    xenMutation: number;
    novaInstability: number;
    rationHunger: number;
    cpAbuse: number;
    campaignMandate: number;
    videoLeakRisk: number;
    dangerousSectors: number;
    lostSectors: number;
  };
  reportCount: number;
  logCount: number;
  checksum: string;
};

export type SaveSlotPayload = {
  kind: 'coan-city-save';
  schemaVersion: number;
  appLabel: string;
  slotId: SaveSlotId;
  label: string;
  savedAt: string;
  meta: SaveSlotMeta;
  game: GameState;
};

export type SaveStorageState = {
  kind: 'coan-save-storage';
  schemaVersion: number;
  updatedAt: string;
  slots: SaveSlotPayload[];
};

export type SaveImportResult =
  | { ok: true; payload: SaveSlotPayload; warnings: string[] }
  | { ok: false; error: string };

export type Directive = {
  title: string;
  body: string;
  stat: keyof Stats;
  mode: 'above' | 'below';
  target: number;
  days: number;
  reward: Partial<Stats>;
  penalty: Partial<Stats>;
};

export type Report = {
  day: number;
  title: string;
  lines: string[];
  stats: Stats;
  transmittedLines?: string[];
  transmittedStats?: Stats;
  falsificationScore?: number;
  auditRisk?: number;
  falsifiedFields?: Array<keyof Stats>;
  auditLines?: string[];
  auditTriggered?: boolean;
  auditDiscovered?: boolean;
};


export type OnboardingTrackId = 'standard_command' | 'alyx_quarantine_intake' | 'nova_blackfile_intake' | 'uprising_survival_cell' | 'sympathizer_double_game';
export type OnboardingChapterId =
  | 'coan_mandate'
  | 'sector_network'
  | 'civil_pressure'
  | 'combine_escalation'
  | 'nova_blackfiles'
  | 'xen_biosphere'
  | 'truth_layer'
  | 'first_day';
export type OnboardingStage = 'briefing' | 'systems' | 'blackfile' | 'biohazard' | 'truth' | 'first_day';

export type OnboardingTrack = {
  id: OnboardingTrackId;
  title: string;
  subtitle: string;
  recommendedCity: string;
  campaignId: CampaignId;
  scenario: ScenarioId;
  timeline: TimelineId;
  profile: ProfileId;
  difficultyPresetId: DifficultyPresetId;
  doctrine: string;
  startingTab: TabId;
  briefingLines: string[];
  riskNotes: string[];
  tags: string[];
};

export type OnboardingChapter = {
  id: OnboardingChapterId;
  order: number;
  title: string;
  stage: OnboardingStage;
  body: string;
  operatorLesson: string;
  linkedTabs: TabId[];
  completionHint: string;
};

export type OnboardingFirstDayAction = {
  id: string;
  order: number;
  title: string;
  relatedTab: TabId;
  moduleLabel: string;
  description: string;
  expectedEffect: string;
  severity: 1 | 2 | 3 | 4 | 5;
};

export type OnboardingState = {
  schemaVersion: string;
  activeTrackId: OnboardingTrackId;
  completedChapterIds: OnboardingChapterId[];
  firstDayScriptArmed: boolean;
  firstDayScriptCompleted: boolean;
  intakeScore: number;
  lastCompletedAt: string | null;
  briefingLog: string[];
};



export type NewGameIntakeDoctrineId = 'manual' | 'canonical_city17' | 'alyx_quarantine' | 'nova_blackfile' | 'uprising_survival' | 'double_game';
export type NewGameIntakeThreatBand = 'low' | 'medium' | 'high' | 'extreme';

export type NewGameIntakePhase = {
  id: 'identity' | 'era' | 'mandate' | 'training' | 'preview';
  title: string;
  label: string;
  description: string;
  warning: string;
};

export type NewGameIntakeDoctrine = {
  id: NewGameIntakeDoctrineId;
  title: string;
  subtitle: string;
  campaignId: CampaignId;
  scenario: ScenarioId;
  timeline: TimelineId;
  profile: ProfileId;
  difficultyPresetId: DifficultyPresetId;
  onboardingTrackId: OnboardingTrackId;
  citySuggestion: string;
  doctrineLine: string;
  riskLine: string;
  tags: string[];
};

export type NewGameIntakeConfig = {
  city: string;
  doctrineId: NewGameIntakeDoctrineId;
  campaignId: CampaignId;
  scenario: ScenarioId;
  timeline: TimelineId;
  profile: ProfileId;
  difficultyPresetId: DifficultyPresetId;
  onboardingTrackId: OnboardingTrackId;
  useCampaignRecommendations: boolean;
};

export type NewGameIntakeResolvedConfig = {
  city: string;
  doctrine: NewGameIntakeDoctrine;
  campaign: CampaignPreset;
  scenario: ScenarioId;
  timeline: TimelineId;
  profile: ProfileId;
  difficulty: DifficultyPreset;
  onboardingTrack: OnboardingTrack;
  useCampaignRecommendations: boolean;
};

export type NewGameIntakePreview = {
  resolved: NewGameIntakeResolvedConfig;
  stats: Stats;
  pressure: {
    lambda: number;
    xen: number;
    citadel: number;
    civil: number;
    rations: number;
    nova: number;
    stabilityForecast: number;
    overallDanger: number;
  };
  bands: {
    lambda: NewGameIntakeThreatBand;
    xen: NewGameIntakeThreatBand;
    citadel: NewGameIntakeThreatBand;
    civil: NewGameIntakeThreatBand;
    rations: NewGameIntakeThreatBand;
    nova: NewGameIntakeThreatBand;
    overall: NewGameIntakeThreatBand;
  };
  warnings: string[];
  recommendedFirstTabs: TabId[];
  summary: string[];
};

export type GameState = {
  started: boolean;
  city: string;
  day: number;
  scenario: ScenarioId;
  timeline: TimelineId;
  profile: ProfileId;
  administratorAvatar: AdministratorAvatarId;
  campaign: CampaignState;
  uiuxProgression: UiuxProgressionState;
  campaignMission: CampaignMissionState;
  difficultySettings: DifficultySettingsState;
  onboarding: OnboardingState;
  tab: TabId;
  stats: Stats;
  sectors: Sector[];
  units: Unit[];
  directive: Directive;
  directiveDays: number;
  crisis: Crisis | null;
  reports: Report[];
  log: string[];
  ending: string | null;
  finalVerdict: FinalVerdictState | null;
  finalChronicle: FinalChronicleState | null;
  reportPolicy: ReportPolicy;
  auditHeat: number;
  novaProspekt: NovaProspektState;
  atmosphereSettings: AtmosphereSettings;
  rationEconomy: RationEconomyState;
  population: PopulationState;
  citizenRegistry: CitizenRegistryState;
  informantNetwork: InformantNetworkState;
  civilProtection: CivilProtectionState;
  citadelDirectiveTree: CitadelDirectiveTreeState;
  combineTechnology: CombineTechnologyState;
  resistanceNetwork: ResistanceNetworkState;
  resistanceFactions: ResistanceFactionState;
  vortigaunts: VortigauntState;
  xenEcosystem: XenEcosystemState;
  xenMutation: XenMutationState;
  quarantineZones: QuarantineZoneState;
  xenResearch: XenResearchState;
  xenCatastrophes: XenCatastropheState;
  majorStoryEvents: MajorStoryEventState;
  videoArchives: VideoArchiveState;
  decisionHistory: DecisionHistoryState;
};

export type LoreCodexCategoryId = 'all' | 'timeline' | 'combine' | 'civil' | 'resistance' | 'xen' | 'nova' | 'gameplay';
export type LoreCodexSourceType = 'official' | 'inferred' | 'gameplay_translation' | 'private_simulation';

export type LoreCodexEntry = {
  id: string;
  title: string;
  subtitle: string;
  category: Exclude<LoreCodexCategoryId, 'all'>;
  sourceType: LoreCodexSourceType;
  classification: string;
  canonSummary: string;
  operationalDoctrine: string;
  gameplayHooks: TabId[];
  connectedTabs: TabId[];
  relatedSystems: string[];
  dangerRules: string[];
  avoidRules: string[];
  keywords: string[];
  weight: 1 | 2 | 3 | 4 | 5;
};

export type LoreCodexView = {
  totalEntries: number;
  filteredEntries: LoreCodexEntry[];
  recommendedEntries: LoreCodexEntry[];
  categoryCounts: Record<LoreCodexCategoryId, number>;
  loreRisk: number;
  completeness: number;
  activeWarnings: string[];
};
