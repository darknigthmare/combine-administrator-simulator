/**
 * HALF LIFE RESONANCE — contrats de conception v0.1.
 * Destination proposée : src/features/resonance/types.ts.
 *
 * Ce fichier décrit des données et des contrôles de cohérence. Il ne fournit
 * ni boucle de combat, ni physique, ni rollback, ni persistance native.
 * Aucun import du store de gestion n'est nécessaire ou autorisé ici.
 * Les identifiants d'assets sont des références de catalogue, jamais des
 * affirmations qu'une animation a déjà été produite ou intégrée.
 */

export type ContentId = string;
export type FighterId = ContentId;
export type MoveId = ContentId;
export type StageId = ContentId;
export type AssetId = ContentId;
export type PlayerId = ContentId;
export type TournamentSetId = ContentId;

export type ProductionStatus =
  | "proposed"
  | "documented"
  | "image_generated"
  | "image_reviewed"
  | "animation_produced"
  | "integrated"
  | "verified_in_game";

export interface ReferenceIdentity {
  readonly work: string;
  readonly version_or_appearance: string;
  readonly source_urls: readonly string[];
  readonly fidelity_status: "reference_pending" | "reference_collected" | "visually_reviewed";
  readonly adaptation_notes: string;
}

export interface ResonanceCosts {
  readonly ex: number;
  readonly super: number;
  readonly guard_counter: number;
  readonly defensive_break: number;
  readonly ultimate: number;
  readonly post_victory_finisher: number;
}

/** Noyau requis ; combat_rules.json peut contenir des sections supplémentaires. */
export interface RuleSet {
  readonly schema_version: string;
  readonly ruleset_id: ContentId;
  readonly status: "design_contract_not_implemented";
  readonly canon_status: "original_gameplay_adaptation";
  readonly simulation: {
    readonly ticks_per_second: 60;
    readonly authoritative_coordinates: "integer_or_fixed_point";
    readonly seeded_randomness_required: true;
    readonly rendering_independent: true;
    readonly active_timer_excludes: readonly string[];
  };
  readonly duel: {
    readonly reference_max_hp: number;
    readonly proposed_roster_hp_range: readonly [number, number];
    readonly rounds_to_win: number;
    readonly round_active_ticks: number;
    readonly full_hp_on_round_start: boolean;
    readonly timeout_rule: "compare_remaining_hp_fractions_by_cross_multiplication";
    readonly simultaneous_ko_rule: "draw_round";
    readonly tied_hp_fraction_rule: "draw_round";
    readonly draw_round_resource_policy: "restore_round_start_snapshot";
    readonly consecutive_draw_rounds_before_draw_game: number;
    readonly draw_game_policy: "replay_game_without_awarding_set_point";
  };
  readonly resonance: {
    readonly display_max: number;
    readonly internal_units_per_display_point: number;
    readonly internal_max: number;
    readonly initial_internal_units: number;
    readonly persists_between_rounds: boolean;
    readonly resets_between_games: boolean;
    readonly costs_display_points: ResonanceCosts;
    readonly gain_basis: string;
    readonly attacker_internal_units_per_hp_removed: number;
    readonly defender_internal_units_per_hp_removed: number;
    readonly no_gain_from: readonly string[];
    readonly cost_commit: "on_validated_action_entry";
    readonly refund_after_interruption: false;
  };
  readonly tournament: {
    readonly formats: readonly ("single_elimination" | "double_elimination")[];
    readonly supported_bracket_sizes: readonly number[];
    readonly default_games_to_win_set: number;
    readonly finals_games_to_win_set: number;
    readonly finals_categories: readonly string[];
    readonly double_elimination_losses_to_eliminate: 2;
    readonly grand_final_reset_if_losers_bracket_winner_wins_first_set: true;
    readonly grand_final_reset_is_complete_new_set: true;
    readonly byes_are_not_played_game_wins: true;
    readonly game_winner_keeps_fighter: boolean;
    readonly game_loser_can_change_fighter: boolean;
    readonly score_corrections_must_expose_invalidated_descendants: true;
  };
}

export type MoveKind =
  | "normal"
  | "special"
  | "ex"
  | "super"
  | "ultimate"
  | "throw"
  | "trait"
  | "guard_counter"
  | "defensive_break"
  | "finisher";

export type HitLevel = "mid" | "high" | "low" | "overhead" | "throw";
export type FighterState =
  | "idle"
  | "walk"
  | "crouch"
  | "dash"
  | "airborne"
  | "attack"
  | "guard_stun"
  | "hit_stun"
  | "thrown"
  | "launched"
  | "knockdown"
  | "wake_up"
  | "cinematic"
  | "ko"
  | "victory";

export interface FrameSpan {
  /** Intervalle demi-ouvert : premier tick inclus, dernier tick exclu. */
  readonly start_tick: number;
  readonly end_tick_exclusive: number;
}

export interface FixedPointBox {
  readonly x: number;
  readonly y: number;
  readonly width: number;
  readonly height: number;
  readonly coordinate_scale: number;
}

export interface MoveDefinition {
  readonly id: MoveId;
  readonly fighter_id: FighterId;
  readonly display_name: string;
  readonly command: string;
  readonly kind: MoveKind;
  readonly allowed_states: readonly FighterState[];
  readonly resonance_cost_points: number;
  readonly character_resource_cost?: Readonly<Record<string, number>>;
  readonly startup_ticks: number;
  readonly active_ticks: number;
  readonly recovery_ticks: number;
  readonly hit_level: HitLevel;
  readonly damage_per_hit: readonly number[];
  readonly hit_stun_ticks: number;
  readonly block_stun_ticks: number;
  readonly juggle_cost: number;
  readonly uses_wall_bounce: boolean;
  readonly uses_ground_bounce: boolean;
  readonly air_unblockable: boolean;
  readonly cancel_windows: readonly {
    readonly interval: FrameSpan;
    readonly condition: "on_hit" | "on_block" | "on_hit_or_block";
    readonly target_move_ids: readonly MoveId[];
  }[];
  readonly collision_tracks: readonly {
    readonly interval: FrameSpan;
    readonly kind: "hurtbox" | "hitbox" | "throwbox" | "pushbox";
    readonly box: FixedPointBox;
  }[];
  /** null tant que l'asset correspondant n'a pas réellement été créé. */
  readonly animation_asset_id: AssetId | null;
  readonly production_status: ProductionStatus;
  readonly design_notes: string;
}

export interface FighterDefinition {
  readonly id: FighterId;
  readonly display_name: string;
  readonly source: ReferenceIdentity;
  readonly archetype: string;
  readonly max_hp: number;
  readonly move_ids: readonly MoveId[];
  readonly costume_ids: readonly ContentId[];
  readonly portrait_asset_id: AssetId | null;
  readonly trait_description: string;
  readonly intro_scene_id: ContentId | null;
  readonly rival_fighter_id: FighterId | null;
  readonly ending_scene_id: ContentId | null;
  readonly production_status: ProductionStatus;
  readonly competitive_stats_from_management_progression: false;
}

export type StageProfile = "tournament" | "spectacle";

export interface StageDefinition {
  readonly id: StageId;
  readonly display_name: string;
  readonly source: ReferenceIdentity;
  readonly layers: readonly {
    readonly id: ContentId;
    readonly role: "sky" | "far" | "mid" | "combat_plane" | "foreground" | "atmosphere";
    readonly asset_id: AssetId | null;
    readonly parallax_numerator: number;
    readonly parallax_denominator: number;
    readonly blocks_fighter_readability: false;
    readonly production_status: ProductionStatus;
  }[];
  readonly profiles: {
    readonly tournament: {
      readonly flat_continuous_floor: true;
      readonly normalized_collision: true;
      readonly mechanical_props: false;
      readonly damage_hazards: false;
    };
    readonly spectacle: {
      readonly enabled: boolean;
      readonly prop_interaction_limit_per_player_per_round: number;
      readonly hazard_ids: readonly ContentId[];
      readonly stage_finisher_ids: readonly ContentId[];
    };
  };
  readonly production_status: ProductionStatus;
}

export type SessionPhase =
  | "menu"
  | "selection"
  | "loading"
  | "intro"
  | "round"
  | "local_pause"
  | "resolution"
  | "conclusion"
  | "result";

export type ModeId =
  | "story"
  | "arcade"
  | "local_versus"
  | "online_versus"
  | "ranked"
  | "tournament"
  | "relay"
  | "survival"
  | "boss"
  | "challenge"
  | "training";

/** Unique contrat de sortie autorisé vers la progression du jeu de gestion. */
export interface CosmeticReward {
  readonly kind: "cosmetic_unlock" | "achievement_unlock";
  readonly reward_id: ContentId;
  readonly originating_session_id: ContentId;
}

export interface MatchSession {
  readonly session_id: ContentId;
  readonly mode: ModeId;
  readonly phase: SessionPhase;
  readonly ruleset_id: ContentId;
  readonly rules_checksum: string;
  readonly fighters: readonly [FighterId, FighterId];
  readonly stage_id: StageId;
  readonly stage_profile: StageProfile;
  readonly seed: number;
  readonly current_tick: number;
  readonly round_wins: readonly [number, number];
  readonly result: null | {
    readonly winner_slot: 0 | 1 | null;
    readonly reason: "ko" | "timeout" | "draw" | "forfeit" | "arbiter_decision";
  };
  readonly cosmetic_rewards: readonly CosmeticReward[];
  readonly management_save_mutation: "none_except_explicit_cosmetic_reward_bridge";
}

export interface InputFrame {
  readonly tick: number;
  readonly player_slot: 0 | 1;
  /** Directions physiques ; conversion relative effectuée par la simulation. */
  readonly direction: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
  /** Bits proposés : L=1, M=2, H=4, S=8 ; aucun état de combat déclaré. */
  readonly button_mask: number;
}

export interface ReplayContract {
  readonly schema_version: string;
  readonly replay_id: ContentId;
  readonly ruleset_id: ContentId;
  readonly rules_checksum: string;
  readonly simulation_version: string;
  readonly ticks_per_second: 60;
  readonly fighters: readonly [FighterId, FighterId];
  readonly stage_id: StageId;
  readonly stage_profile: StageProfile;
  readonly seed: number;
  readonly influential_options: Readonly<Record<string, string | number | boolean>>;
  readonly inputs: readonly InputFrame[];
  readonly result_checksum: string;
  readonly compatible_engine_required: true;
}

export type TournamentBracket = "winners" | "losers" | "grand_final" | "grand_final_reset";
export type SlotSource =
  | { readonly kind: "player"; readonly player_id: PlayerId }
  | { readonly kind: "winner_of" | "loser_of"; readonly set_id: TournamentSetId }
  | { readonly kind: "bye" };

export interface TournamentSet {
  readonly id: TournamentSetId;
  readonly bracket: TournamentBracket;
  readonly round_index: number;
  readonly slots: readonly [SlotSource, SlotSource];
  readonly resolved_player_ids: readonly [PlayerId | null, PlayerId | null];
  readonly games_to_win: number;
  readonly game_wins: readonly [number, number];
  readonly status: "waiting" | "ready" | "playing" | "paused" | "validated" | "invalidated";
  readonly winning_player_id: PlayerId | null;
  readonly station_id: ContentId | null;
  readonly revision: number;
}

export interface TournamentContract {
  readonly schema_version: string;
  readonly tournament_id: ContentId;
  readonly format: "single_elimination" | "double_elimination";
  readonly bracket_size: 4 | 8 | 16 | 32;
  readonly ruleset_id: ContentId;
  readonly rules_checksum: string;
  readonly players: readonly { readonly id: PlayerId; readonly display_name: string; readonly seed: number | null }[];
  readonly sets: readonly TournamentSet[];
  readonly grand_final_reset_required: boolean;
  readonly correction_log: readonly {
    readonly set_id: TournamentSetId;
    readonly prior_revision: number;
    readonly invalidated_descendant_set_ids: readonly TournamentSetId[];
    readonly reason: string;
  }[];
}

export interface DesignBundle {
  readonly rules: RuleSet;
  readonly fighters: readonly FighterDefinition[];
  readonly moves: readonly MoveDefinition[];
  readonly stages: readonly StageDefinition[];
}

export interface ValidationIssue {
  readonly path: string;
  readonly code: "schema" | "identifier" | "duplicate" | "reference" | "cost" | "rules";
  readonly message_fr: string;
}

const ID_PATTERN = /^[A-Za-z0-9]+(?:[._-][A-Za-z0-9]+)*$/;
const COST_KEYS = ["ex", "super", "guard_counter", "defensive_break", "ultimate", "post_victory_finisher"] as const;

function record(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function natural(value: unknown): value is number {
  return typeof value === "number" && Number.isSafeInteger(value) && value >= 0;
}

/** Contrôle partiel explicite du JSON de règles ; ne prétend pas valider tout le moteur. */
export function validateRulesContract(value: unknown): ValidationIssue[] {
  const issues: ValidationIssue[] = [];
  const add = (path: string, code: ValidationIssue["code"], message_fr: string) => {
    issues.push({ path, code, message_fr });
  };
  if (!record(value)) {
    add("rules", "schema", "Le contrat de règles doit être un objet.");
    return issues;
  }
  if (typeof value.schema_version !== "string" || !/^\d+\.\d+\.\d+$/.test(value.schema_version)) {
    add("rules.schema_version", "schema", "Une version majeure.mineure.correctif est requise.");
  }
  if (typeof value.ruleset_id !== "string" || !ID_PATTERN.test(value.ruleset_id)) {
    add("rules.ruleset_id", "identifier", "Identifiant stable alphanumérique requis.");
  }
  if (!record(value.simulation) || value.simulation.ticks_per_second !== 60) {
    add("rules.simulation.ticks_per_second", "rules", "Ce contrat exige une simulation à 60 Hz.");
  }
  if (!record(value.duel) || !natural(value.duel.round_active_ticks) || value.duel.round_active_ticks === 0) {
    add("rules.duel.round_active_ticks", "schema", "Durée de manche entière strictement positive requise.");
  }
  if (!record(value.resonance)) {
    add("rules.resonance", "schema", "La section Résonance est obligatoire.");
  } else {
    const meter = value.resonance;
    if (!natural(meter.display_max) || meter.display_max === 0) {
      add("rules.resonance.display_max", "schema", "La capacité doit être un entier strictement positif.");
    }
    if (!natural(meter.internal_units_per_display_point) || meter.internal_units_per_display_point === 0) {
      add("rules.resonance.internal_units_per_display_point", "schema", "L'échelle interne doit être un entier positif.");
    }
    if (natural(meter.display_max) && natural(meter.internal_units_per_display_point)
      && meter.internal_max !== meter.display_max * meter.internal_units_per_display_point) {
      add("rules.resonance.internal_max", "rules", "Capacité interne incohérente avec l'échelle de jauge.");
    }
    if (!natural(meter.initial_internal_units)
      || (natural(meter.internal_max) && meter.initial_internal_units > meter.internal_max)) {
      add("rules.resonance.initial_internal_units", "rules", "La réserve initiale doit être comprise dans la capacité.");
    }
    if (!record(meter.costs_display_points)) {
      add("rules.resonance.costs_display_points", "schema", "La table des coûts est obligatoire.");
    } else {
      for (const key of COST_KEYS) {
        const cost = meter.costs_display_points[key];
        if (!natural(cost) || (natural(meter.display_max) && cost > meter.display_max)) {
          add(`rules.resonance.costs_display_points.${key}`, "cost", "Coût entier compris entre zéro et la capacité requis.");
        }
      }
      if (meter.costs_display_points.post_victory_finisher !== 0) {
        add("rules.resonance.costs_display_points.post_victory_finisher", "cost", "La conclusion après victoire ne coûte pas de Résonance.");
      }
    }
  }
  if (!record(value.tournament)) {
    add("rules.tournament", "schema", "Les règles du tournoi sont obligatoires.");
  } else if (value.tournament.double_elimination_losses_to_eliminate !== 2
    || value.tournament.grand_final_reset_if_losers_bracket_winner_wins_first_set !== true
    || value.tournament.grand_final_reset_is_complete_new_set !== true) {
    add("rules.tournament", "rules", "La double élimination exige deux défaites et le reset complet de grande finale prévu.");
  }
  return issues;
}

/** Vérification des références et des coûts après adaptation des catalogues à ces types. */
export function validateDesignBundle(bundle: DesignBundle): ValidationIssue[] {
  const issues = validateRulesContract(bundle.rules);
  const add = (path: string, code: ValidationIssue["code"], message_fr: string) => {
    issues.push({ path, code, message_fr });
  };
  const ids = (items: readonly { readonly id: string }[], path: string): Set<string> => {
    const seen = new Set<string>();
    items.forEach((item, index) => {
      if (!ID_PATTERN.test(item.id)) add(`${path}[${index}].id`, "identifier", "Identifiant stable alphanumérique requis.");
      if (seen.has(item.id)) add(`${path}[${index}].id`, "duplicate", "Identifiant dupliqué dans ce catalogue.");
      seen.add(item.id);
    });
    return seen;
  };
  const fighterIds = ids(bundle.fighters, "fighters");
  const moveIds = ids(bundle.moves, "moves");
  ids(bundle.stages, "stages");
  const moveMap = new Map(bundle.moves.map(move => [move.id, move]));
  const costKeyByKind: Partial<Record<MoveKind, keyof ResonanceCosts>> = {
    ex: "ex", super: "super", ultimate: "ultimate", guard_counter: "guard_counter",
    defensive_break: "defensive_break", finisher: "post_victory_finisher",
  };
  bundle.fighters.forEach((fighter, index) => {
    const path = `fighters[${index}]`;
    if (!natural(fighter.max_hp) || fighter.max_hp === 0) add(`${path}.max_hp`, "rules", "Vie maximale positive requise.");
    if (fighter.competitive_stats_from_management_progression !== false) {
      add(`${path}.competitive_stats_from_management_progression`, "rules", "Les statistiques compétitives doivent rester indépendantes de la gestion.");
    }
    if (fighter.rival_fighter_id !== null && !fighterIds.has(fighter.rival_fighter_id)) {
      add(`${path}.rival_fighter_id`, "reference", "Le rival doit exister dans le catalogue.");
    }
    const listed = new Set<string>();
    fighter.move_ids.forEach((id, moveIndex) => {
      if (listed.has(id)) add(`${path}.move_ids[${moveIndex}]`, "duplicate", "Cette attaque apparaît déjà dans le kit.");
      listed.add(id);
      if (!moveIds.has(id)) add(`${path}.move_ids[${moveIndex}]`, "reference", "Attaque absente du catalogue.");
      else if (moveMap.get(id)?.fighter_id !== fighter.id) add(`${path}.move_ids[${moveIndex}]`, "reference", "Attaque attribuée à un autre combattant.");
    });
  });
  bundle.moves.forEach((move, index) => {
    const path = `moves[${index}]`;
    if (!fighterIds.has(move.fighter_id)) add(`${path}.fighter_id`, "reference", "Combattant propriétaire absent.");
    const key = costKeyByKind[move.kind];
    const expected = key ? bundle.rules.resonance.costs_display_points[key] : 0;
    if (!natural(move.resonance_cost_points) || move.resonance_cost_points !== expected) {
      add(`${path}.resonance_cost_points`, "cost", `Le coût attendu pour cette catégorie est ${expected}.`);
    }
    for (const field of ["startup_ticks", "active_ticks", "recovery_ticks", "hit_stun_ticks", "block_stun_ticks", "juggle_cost"] as const) {
      if (!natural(move[field])) add(`${path}.${field}`, "schema", "Un nombre entier de ticks ou d'unités positif ou nul est requis.");
    }
    move.damage_per_hit.forEach((damage, hit) => {
      if (!natural(damage)) add(`${path}.damage_per_hit[${hit}]`, "schema", "Dégâts entiers positifs ou nuls requis.");
    });
    move.cancel_windows.forEach((window, windowIndex) => {
      if (!natural(window.interval.start_tick) || !natural(window.interval.end_tick_exclusive)
        || window.interval.end_tick_exclusive <= window.interval.start_tick) {
        add(`${path}.cancel_windows[${windowIndex}].interval`, "schema", "Intervalle non vide et ordonné requis.");
      }
      window.target_move_ids.forEach(id => {
        if (!moveIds.has(id) || moveMap.get(id)?.fighter_id !== move.fighter_id) {
          add(`${path}.cancel_windows[${windowIndex}].target_move_ids`, "reference", "Une annulation doit viser une attaque existante du même combattant.");
        }
      });
    });
    if (["animation_produced", "integrated", "verified_in_game"].includes(move.production_status)
      && move.animation_asset_id === null) {
      add(`${path}.animation_asset_id`, "reference", "Ce statut exige une référence vers une animation réellement produite.");
    }
  });
  bundle.stages.forEach((stage, index) => {
    const profile = stage.profiles.tournament;
    if (profile.flat_continuous_floor !== true || profile.normalized_collision !== true
      || profile.mechanical_props !== false || profile.damage_hazards !== false) {
      add(`stages[${index}].profiles.tournament`, "rules", "Le profil tournoi exige un sol normalisé sans accessoire mécanique ni danger dommageable.");
    }
    stage.layers.forEach((layer, layerIndex) => {
      if (!Number.isSafeInteger(layer.parallax_numerator) || !natural(layer.parallax_denominator)
        || layer.parallax_denominator === 0) {
        add(`stages[${index}].layers[${layerIndex}]`, "schema", "Rapport de parallaxe entier à dénominateur positif requis.");
      }
    });
  });
  return issues;
}
