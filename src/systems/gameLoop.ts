import { GameStoreState } from '../store/gameStore';
import { GameStats, CitySector, DayReport, HistoryLog, SectorStatus } from '../types/game';
import { GameEvent, CitadelDirective } from '../types/events';
import { combineUnits as defaultUnits } from '../data/combineUnits';
import { SeededRandom } from './seededRandom';
import { rebelEvents } from '../data/rebelEvents';
import { xenEvents } from '../data/xenEvents';
import { citizenEvents } from '../data/citizenEvents';
import { combineEvents } from '../data/combineEvents';
import { advisorEvents } from '../data/advisorEvents';
import { moralCrises } from '../data/moralCrises';
import { directives as allDirectives } from '../data/directives';

// Helper to check ending conditions
export const checkEndingConditions = (state: GameStoreState): string | null => {
  const { stats, directivesFailed, day, scenarioId, governanceProfileId } = state;

  // 1. Insurrection générale
  if (stats.rebelActivity >= 100) return 'end_general_uprising';

  // 2. Zone de quarantaine totale
  if (stats.xenContamination >= 85) return 'end_xen_infestation';

  // 3. Citadel effondrée
  if (stats.citadelEnergy <= 0 && stats.rebelActivity >= 60) return 'end_citadel_collapse';

  // 4. Administrateur remplacé (trop de directives échouées)
  if (directivesFailed >= 3) return 'end_replaced_admin';

  // 5. Effondrement industriel
  if (stats.industrialProduction <= 0 && stats.rations <= 0) return 'end_industrial_collapse';

  // 6. Terreur stérile (jour 30+, ordre parfait mais mort de la cité)
  if (day >= 30 && stats.stability >= 75 && stats.rebelActivity <= 5 && stats.loyalty <= 5 && stats.fear >= 85) {
    return 'end_sterile_terror';
  }

  // 7. Ville modèle Combine (jour 35+, stabilité totale et production au max)
  if (day >= 35 && stats.stability >= 80 && stats.rebelActivity <= 10 && stats.xenContamination <= 10 && stats.industrialProduction >= 80) {
    return 'end_model_city';
  }

  // 8. Humanité préservée (jour 30+, fin secrète)
  if (day >= 30 && governanceProfileId === 'sympathizer' && stats.civilianCasualties <= 400 && stats.loyalty >= 60 && stats.citadelEnergy <= 40) {
    return 'end_preserved_humanity';
  }

  // 9. Exécution administrative (si l'Overwatch ou Citadel soupçonne le double jeu)
  if (governanceProfileId === 'sympathizer' && stats.infoControl <= 15 && stats.rebelActivity >= 50) {
    return 'end_administrative_execution';
  }

  // 10. Ravenholm bis (si bombardement ou contamination incontrôlée dans secteur B)
  const sectorB = state.sectors.find(s => s.id === 'residential_b');
  if (sectorB && (sectorB.status === 'Bombardé' || sectorB.xenContamination >= 95) && stats.civilianCasualties >= 2000) {
    return 'end_ravenholm_bis';
  }

  // 11. Purge totale (jour 25+ si rébellion et Xen sont élevés en même temps)
  if (day >= 25 && stats.rebelActivity >= 70 && stats.xenContamination >= 60) {
    return 'end_total_purge';
  }

  // 12. Ville évacuée (si loyauté haute et présence Combine basse)
  if (stats.loyalty >= 70 && stats.combinePresence <= 20) {
    return 'end_evacuated_city';
  }

  // 13. Soulèvement contrôlé (si tyran et stabilité haute)
  if (governanceProfileId === 'tyrant' && day >= 30 && stats.stability >= 70 && stats.rebelActivity >= 30) {
    return 'end_controlled_uprising';
  }

  // 14. Double jeu triomphant (sympathisant, jour 35, stabilité moyenne)
  if (governanceProfileId === 'sympathizer' && day >= 35 && stats.loyalty >= 50 && stats.rebelActivity >= 60) {
    return 'end_double_agent';
  }

  // 15. Intervention Advisor (jour 20+ si Citadel instable et présence Combine faible)
  if (scenarioId === 'citadel_instability' && day >= 20 && stats.combinePresence <= 30) {
    return 'end_advisor_takeover';
  }

  return null;
};

// Main daily game loop simulation
export const runGameLoop = (state: GameStoreState): Partial<GameStoreState> => {
  const random = new SeededRandom(state.seed + state.day);
  const nextDay = state.day + 1;

  const nextStats = { ...state.stats };
  const updatedSectors = state.sectors.map(s => ({ ...s }));
  const incidents: string[] = [];

  let civilianCasualtiesThisTurn = 0;
  let combineCasualtiesThisTurn = 0;

  // 1. COMBINE FORCES & SECTORS CALCULATION
  let totalPresence = 0;
  let totalSurveillance = 0;
  let totalRebelRisk = 0;
  let totalXen = 0;
  let activePopulation = 0;

  updatedSectors.forEach(sec => {
    // Skip calculation for abandoned or sealed sectors
    const isClosed = sec.status === 'Scellé' || sec.status === 'Abandonné';
    if (isClosed) {
      sec.population = 0;
      sec.rebelRisk = 0;
      sec.xenContamination = 0;
      sec.surveillance = 100;
      return;
    }

    activePopulation += sec.population;

    // Calculate forces presence in this sector
    let cpCount = sec.unitsDeployed.cp_metro || 0;
    let overwatchCount = 
      (sec.unitsDeployed.soldier || 0) +
      (sec.unitsDeployed.grunt || 0) +
      (sec.unitsDeployed.charger || 0) +
      (sec.unitsDeployed.suppressor || 0) +
      (sec.unitsDeployed.elite || 0) +
      (sec.unitsDeployed.ordinal || 0);
    
    let heavyCount = 
      (sec.unitsDeployed.apc || 0) +
      (sec.unitsDeployed.hunter || 0) +
      (sec.unitsDeployed.strider || 0);

    let supportCount = 
      (sec.unitsDeployed.scanner || 0) +
      (sec.unitsDeployed.manhack || 0) +
      (sec.unitsDeployed.dropship || 0);

    let advisorCount = sec.unitsDeployed.advisor || 0;

    // Presence & Surveillance booster calculation
    let localPresence = (cpCount * 5) + (overwatchCount * 12) + (heavyCount * 25) + (advisorCount * 50);
    let localSurveillance = (cpCount * 8) + (overwatchCount * 5) + (supportCount * 10) + (advisorCount * 30);

    sec.cpPresence = Math.max(0, Math.min(100, cpCount * 10));
    sec.overwatchPresence = Math.max(0, Math.min(100, overwatchCount * 15 + heavyCount * 20));
    sec.surveillance = Math.max(0, Math.min(100, localSurveillance));

    // Decaying infrastructure / local danger
    // Rebel risk simulation
    let rebelChange = 3; // base drift
    if (sec.surveillance > 60) rebelChange -= 6;
    if (sec.surveillance > 80) rebelChange -= 10;
    if (sec.fear > 50) rebelChange -= 2;
    if (sec.loyalty < 15) rebelChange += 4;
    sec.rebelRisk = Math.max(0, Math.min(100, sec.rebelRisk + rebelChange));

    // Xen Contamination simulation
    let xenChange = 1;
    if (sec.status === 'En quarantaine') xenChange -= 4;
    if (localPresence > 40) xenChange -= 6; // Combine cleans up Xen
    if (sec.xenContamination > 30) xenChange += 3; // spreads faster if established
    sec.xenContamination = Math.max(0, Math.min(100, sec.xenContamination + xenChange));

    // Local casualty risk based on Xen & Rebellion
    if (sec.xenContamination > 50 && sec.population > 0) {
      const lost = Math.ceil(sec.population * 0.01 * (sec.xenContamination / 100));
      sec.population = Math.max(0, sec.population - lost);
      civilianCasualtiesThisTurn += lost;
      incidents.push(`Pertes civiles dans ${sec.name} dues à l'infestation Xen (+${lost} résidents).`);
    }

    if (sec.rebelRisk > 75 && localPresence > 30) {
      // Local skirmishes
      const combLoss = Math.floor(random.range(0, 2));
      const civLoss = Math.floor(random.range(1, 5));
      combineCasualtiesThisTurn += combLoss;
      civilianCasualtiesThisTurn += civLoss;
      sec.population = Math.max(0, sec.population - civLoss);
      if (combLoss > 0) {
        incidents.push(`Escarmouche dans ${sec.name} : ${combLoss} unité(s) Overwatch perdues.`);
      }
    }

    // Infrastructure status change
    let infraDecay = 0;
    if (sec.rebelRisk > 60) infraDecay += 2;
    if (sec.xenContamination > 40) infraDecay += 3;
    if (sec.status === 'Bombardé') infraDecay += 10;
    sec.infrastructureStatus = Math.max(0, Math.min(100, sec.infrastructureStatus - infraDecay + 2)); // self-repair slightly

    // Apply sector state badges based on values
    if (sec.xenContamination > 60 && sec.status !== 'En quarantaine' && sec.status !== 'Scellé') {
      sec.status = 'Infesté';
    } else if (sec.rebelRisk > 70 && sec.status !== 'Scellé' && sec.status !== 'Sous couvre-feu') {
      sec.status = 'Insurgé';
    } else if (sec.surveillance > 70 && sec.status === 'Stable') {
      sec.status = 'Surveillé';
    }

    totalPresence += localPresence;
    totalSurveillance += sec.surveillance;
    totalRebelRisk += sec.rebelRisk;
    totalXen += sec.xenContamination;
  });

  // Calculate sector averages for global stats
  const activeSectorsCount = updatedSectors.filter(s => s.status !== 'Scellé' && s.status !== 'Abandonné').length || 1;
  const avgRebelRisk = Math.ceil(totalRebelRisk / activeSectorsCount);
  const avgXen = Math.ceil(totalXen / activeSectorsCount);

  // 2. RESOURCE AND CIVILIAN WELL-BEING
  // Rations Consumption
  const baseRationConsumption = Math.ceil(activePopulation * 0.02);
  const rationsConsumed = Math.max(50, Math.min(600, baseRationConsumption));
  let finalRations = nextStats.rations - rationsConsumed;

  // Industrial Production yields rations/supplies
  const rationsProduced = Math.ceil(nextStats.industrialProduction * 4);
  finalRations = Math.max(0, finalRations + rationsProduced);

  let rationsDiff = rationsProduced - rationsConsumed;

  // Handle Rations Famine (rations = 0)
  if (finalRations <= 0) {
    nextStats.loyalty = Math.max(0, nextStats.loyalty - 12);
    nextStats.civilianFatigue = Math.min(100, nextStats.civilianFatigue + 15);
    nextStats.rebelActivity = Math.min(100, nextStats.rebelActivity + 8);
    incidents.push("FAMINE CRITIQUE : Stock de rations épuisé. Hausse immédiate de la fatigue et de la sédition.");
  } else {
    // regular drift
    nextStats.civilianFatigue = Math.max(0, Math.min(100, nextStats.civilianFatigue + (nextStats.industrialProduction > 70 ? 4 : 1) - (state.governanceProfileId === 'technocrat' ? 2 : 0)));
  }

  nextStats.rations = finalRations;

  // 3. GLOBAL STATS UPDATES AND SPREAD
  nextStats.rebelActivity = Math.max(0, Math.min(100, avgRebelRisk + (100 - nextStats.infoControl) * 0.15));
  nextStats.xenContamination = Math.max(0, Math.min(100, avgXen));
  nextStats.combinePresence = Math.max(10, Math.min(100, Math.ceil(totalPresence / activeSectorsCount)));

  // Stability formula
  // Stability decays with rebel activity and xen contamination, boosts with combine presence and info control
  const stabilityCalc = 100 - (nextStats.rebelActivity * 0.5) - (nextStats.xenContamination * 0.4) - (nextStats.civilianFatigue * 0.2) + (nextStats.infoControl * 0.1);
  nextStats.stability = Math.max(0, Math.min(100, Math.ceil(stabilityCalc)));

  // Civilian loyalty/fear adjustments
  if (nextStats.stability < 40) {
    nextStats.loyalty = Math.max(0, nextStats.loyalty - 4);
    nextStats.fear = Math.min(100, nextStats.fear + 2);
  }
  // Industrial production decays if fatigue is high or stability is low
  let prodChange = 0;
  if (nextStats.civilianFatigue > 60) prodChange -= 5;
  if (nextStats.stability < 45) prodChange -= 8;
  if (nextStats.stability > 70) prodChange += 3;
  nextStats.industrialProduction = Math.max(10, Math.min(100, nextStats.industrialProduction + prodChange));

  // Cumulative casualties
  nextStats.civilianCasualties += civilianCasualtiesThisTurn;
  nextStats.combineCasualties += combineCasualtiesThisTurn;

  // 4. CITADEL DIRECTIVE RESOLUTION
  let nextDirectivesCompleted = state.directivesCompleted;
  let nextDirectivesFailed = state.directivesFailed;
  let activeDirective = state.activeDirective;
  let activeDirectiveDaysLeft = state.activeDirectiveDaysLeft;
  let directiveProgressStr = 'Aucune directive active.';

  if (activeDirective) {
    activeDirectiveDaysLeft -= 1;
    if (activeDirectiveDaysLeft <= 0) {
      // Check validation conditions
      let succeeded = false;
      const target = activeDirective.targetStat;
      const value = activeDirective.targetValue;

      if (target === 'rebelActivityUnder' && nextStats.rebelActivity <= value) succeeded = true;
      else if (target === 'productionAbove' && nextStats.industrialProduction >= value) succeeded = true;
      else if (target === 'xenContaminationUnder' && nextStats.xenContamination <= value) succeeded = true;
      else if (target !== 'rebelActivityUnder' && target !== 'productionAbove' && target !== 'xenContaminationUnder' && nextStats[target] !== undefined) {
        // Direct stat check
        const currentStatVal = nextStats[target] as number;
        if (currentStatVal >= value) succeeded = true;
      }

      if (succeeded) {
        nextDirectivesCompleted += 1;
        incidents.push(`DIRECTIVE CITADEL RÉUSSIE : "${activeDirective.title}".`);
        // Apply rewards
        const rew = activeDirective.rewardEffects;
        if (rew.stability) nextStats.stability = Math.min(100, nextStats.stability + rew.stability);
        if (rew.rations) nextStats.rations += rew.rations;
        if (rew.combinePresence) nextStats.combinePresence = Math.min(100, nextStats.combinePresence + rew.combinePresence);
        directiveProgressStr = `Directive "${activeDirective.title}" complétée avec succès.`;
      } else {
        nextDirectivesFailed += 1;
        incidents.push(`ÉCHEC DE DIRECTIVE CITADEL : "${activeDirective.title}". Sanctions appliquées.`);
        // Apply penalties
        const pen = activeDirective.penaltyEffects;
        if (pen.stability) nextStats.stability = Math.max(0, nextStats.stability + pen.stability);
        if (pen.citadelEnergy) nextStats.citadelEnergy = Math.max(0, nextStats.citadelEnergy + pen.citadelEnergy);
        if (pen.rations) nextStats.rations = Math.max(0, nextStats.rations + pen.rations);
        directiveProgressStr = `Échec de la directive "${activeDirective.title}". Sanctions administratives imposées.`;
      }

      // Fetch new directive
      activeDirective = random.choice(allDirectives.filter(d => d.id !== activeDirective?.id));
      activeDirectiveDaysLeft = activeDirective.duration;
      state.history.push({
        day: nextDay,
        type: 'directive',
        message: `Nouvelle directive reçue : ${activeDirective.title} (${activeDirective.duration} jours).`
      });
    } else {
      directiveProgressStr = `Directive "${activeDirective.title}" en cours (${activeDirectiveDaysLeft} jours restants). Cible : ${activeDirective.targetStat} -> ${activeDirective.targetValue}`;
    }
  }

  // 5. NARRATIVE EVENT TRIGGERING
  // Select a qualified random event if there isn't one active
  let nextActiveEvent: GameEvent | null = null;
  
  // 15% chance of moral crisis, 40% chance of standard event (Rebel, Xen, Citizen, Combine)
  const roll = random.next();
  if (roll < 0.15) {
    // Trigger Moral Crisis
    nextActiveEvent = random.choice(moralCrises);
  } else if (roll < 0.55) {
    // Trigger standard event based on current threats
    const eventPool: GameEvent[] = [];
    
    // Add rebel events if activity is high
    if (nextStats.rebelActivity > 20) {
      eventPool.push(...rebelEvents.filter(e => e.severity <= Math.ceil(nextStats.rebelActivity / 20)));
    }
    // Add Xen events if contamination is high
    if (nextStats.xenContamination > 15) {
      eventPool.push(...xenEvents.filter(e => e.severity <= Math.ceil(nextStats.xenContamination / 20)));
    }
    // Add general citizen events
    eventPool.push(...citizenEvents);
    // Add combine events
    eventPool.push(...combineEvents);
    // Add Advisor events if presence is high or energy is low
    if (nextStats.combinePresence > 50 || nextStats.citadelEnergy < 50) {
      eventPool.push(...advisorEvents);
    }

    if (eventPool.length > 0) {
      const selected = random.choice(eventPool);
      
      // Inject random sector ID if the event requires a sector
      if (selected.sectorId === undefined) {
        // If event requires a sector ID structurally (e.g. affect local sectors)
        const relevantSectors = updatedSectors.filter(s => s.status !== 'Scellé' && s.status !== 'Abandonné');
        if (relevantSectors.length > 0) {
          selected.sectorId = random.choice(relevantSectors).id;
        }
      }
      nextActiveEvent = selected;
    }
  }

  if (nextActiveEvent) {
    incidents.push(`Alerte de sécurité : Crise détectée - ${nextActiveEvent.title}.`);
  }

  // 6. GENERAL HOURLY/DAILY LOGS AND ALERTS
  if (nextStats.stability < 30) {
    incidents.push("ALERTE CRITIQUE : Niveau de stabilité générale sous le seuil d'émeute.");
  }
  if (nextStats.citadelEnergy < 40) {
    incidents.push("AVERTISSEMENT : Fluctuations majeures du réacteur de la Citadel.");
  }

  // 7. BUILD DAILY REPORT
  const newReport: DayReport = {
    day: state.day,
    globalStats: { ...nextStats },
    incidents,
    civilianCasualties: civilianCasualtiesThisTurn,
    combineCasualties: combineCasualtiesThisTurn,
    rationsChange: rationsDiff,
    productionChange: prodChange,
    directiveProgress: directiveProgressStr,
  };

  // 8. COMBINE ALERTS AND AUTONOMY CODE
  let overwatchAlert: 'Faible' | 'Moyenne' | 'Haute' | 'Code d\'Autonomie' = 'Faible';
  if (nextStats.rebelActivity > 70) overwatchAlert = 'Code d\'Autonomie';
  else if (nextStats.rebelActivity > 50) overwatchAlert = 'Haute';
  else if (nextStats.rebelActivity > 25) overwatchAlert = 'Moyenne';

  const updatedHistory = [
    ...state.history,
    { day: state.day, type: 'action' as const, message: `Clôture de la journée administrative ${state.day}.` }
  ];

  const nextState: Partial<GameStoreState> = {
    day: nextDay,
    stats: nextStats,
    sectors: updatedSectors,
    activeDirective,
    activeDirectiveDaysLeft,
    directivesCompleted: nextDirectivesCompleted,
    directivesFailed: nextDirectivesFailed,
    activeEvent: nextActiveEvent,
    history: updatedHistory,
    dayReports: [...state.dayReports, newReport],
    recentAlerts: incidents.slice(-5),
    seed: state.seed + 1, // update seed for next day
  };

  // Check ending conditions with the newly computed state merged
  const fullTempState = { ...state, ...nextState } as GameStoreState;
  const triggeredEnding = checkEndingConditions(fullTempState);
  if (triggeredEnding) {
    nextState.endingTriggered = triggeredEnding;
    nextState.history = [
      ...updatedHistory,
      { day: state.day, type: 'warning' as const, message: `ADMINISTRATION ROMPUE. PROTOCOLE DE FIN ACTIVÉ.` }
    ];
  }

  return nextState;
};
