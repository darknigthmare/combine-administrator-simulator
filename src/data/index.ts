/** Central data barrel. Import game data from this file in UI/systems. */
export { baseStats, baseSectors } from './citySectors';
export { unitTemplates } from './combineUnits';
export { xenCodex } from './xenEntities';
export { directives } from './directives';
export { propagandaMessages } from './propagandaMessages';
export { breencastStrategies, breencastOpeners, breencastClosers, breencastFragments } from './breencast';
export { crises } from './crisisEvents';
export { profileEffects } from './governanceProfiles';
export { scenarioEffects } from './scenarioPresets';
export { endings } from './endings';
export { novaDetainees, novaFacilityZones, novaOperations, novaPolicies } from './novaProspekt';
export { timelinePresets, timelineOrder } from './timelinePresets';

export * from './rationEconomy';
export { populationGroupDefinitions, populationGroupOrder } from './populationGroups';
export { citizenActions, citizenStatuses, riskMarkerDescriptions, representativeCitizenTemplates } from './citizenRegistry';
export { informantDoctrines, informantOperations } from './informantNetwork';

export { civilProtectionDoctrines, civilProtectionOperations } from './civilProtection';
export { citadelDirectiveBranches, citadelDirectiveNodes } from './citadelDirectiveTree';

export { combineTechnologyBranches, combineTechnologyNodes } from './combineTechnologies';

export { resistanceCellTemplates, resistanceRouteTemplates, resistanceOperations } from './resistanceNetwork';
export { resistanceFactionTemplates, resistanceFactionDoctrines, resistanceFactionOperations } from './resistanceFactions';
export { vortigauntDoctrines, vortigauntGroupTemplates, vortigauntOperations } from './vortigaunts';
export { xenLayerDefinitions, xenLayerOrder, xenEcosystemPolicies, xenEcosystemOperations } from './xenEcosystem';
export { xenMutationChainDefinitions, xenMutationChainOrder, xenMutationPolicies, xenMutationOperations } from './xenMutationChains';
export { quarantineOperations, quarantinePolicies, quarantineStageDefinitions, quarantineStageOrder } from './quarantineZones';
export { xenResearchOperations, xenResearchPolicies, xenResearchProgramOrder, xenResearchPrograms } from './xenResearch';
export { xenCatastropheDefinitions, xenCatastropheOperations, xenCatastropheOrder, xenCatastrophePolicies } from './xenCatastrophes';

export { campaignOrder, campaignPresets } from './campaignScenarios';

export { campaignObjectiveDefinitions, campaignObjectiveDefinitionsByCampaign } from './campaignObjectives';
export { majorStoryEventDefinitions, majorStoryEventOrder, majorStoryOperations, majorStoryPolicies } from './majorStoryEvents';

export { finalEndingDefinitions, finalEndingOrder } from './finalVerdicts';

export { chronicleTransitionLines, finalChronicleChapterDefinitions, finalChronicleChapterOrder, finalChronicleClassifications } from './finalChronicle';

export * from './dashboardTerminal';
export { defaultFloatingWindowLoadout, floatingWindowPresets } from './floatingWindows';
export { terminalInterfaceOrder, terminalInterfaces } from './terminalInterfaces';
export { syntheticAudioCueOrder, syntheticAudioCues } from './syntheticAudioCues';
export { videoArchiveFeedOrder, videoArchiveFeeds, videoArchiveOperations, videoArchivePolicies } from './videoArchives';
export { AUTOSAVE_STORAGE_KEY, SAVE_APP_LABEL, SAVE_EXPORT_KIND, SAVE_SCHEMA_VERSION, SAVE_SLOT_STORAGE_KEY, saveSlotDefinitions, saveSlotOrder } from './saveSlots';
export { decisionHistoryCategoryLabels, decisionHistoryExportHeader, decisionHistoryFilterLabels, decisionHistorySeverityLabels, decisionHistorySourceLabels } from './decisionHistory';
export { loreCodexCategoryLabels, loreCodexCategoryOrder, loreCodexEntries, loreCodexSourceLabels } from './loreCodex';
export { difficultyPresetOrder, difficultyPresets, difficultyScalarLabels } from './difficultySettings';

export { finalAuditChecklist, finalAuditRequiredFiles, finalAuditRunbook, finalAuditVersion } from './systemAudit';
export { gameplayBalanceBands, gameplayBalanceMetricDefinitions, gameplayBalanceRunbook, gameplayBalanceVersion, longRunPlaytestScenarios } from './gameplayBalance';
export { onboardingChapters, onboardingFirstDayActions, onboardingQuickLinks, onboardingTrackOrder, onboardingTracks, onboardingVersion } from './onboarding';

export { newGameIntakeDoctrineOrder, newGameIntakeDoctrines, newGameIntakePhases, newGameIntakeProfileLabels, newGameIntakeQuickTrackMap, newGameIntakeRecommendedCombos, newGameIntakeScenarioLabels, newGameIntakeThreatLabels, newGameIntakeVersion } from './newGameIntake';
export { uxDensityPresets, uxEmptyStates, uxModuleGroups, uxPolishRunbook, uxPolishVersion, uxQuickRoutes, uxTooltipLibrary } from './uxPolish';
export { tauriAppMetadata, tauriArtifactTargets, tauriBuildCommands, tauriPackagingChecklist, tauriPackagingVersion, tauriReleaseChannels, tauriReleaseRunbook, tauriWindowsPrerequisites } from './tauriPackaging';
