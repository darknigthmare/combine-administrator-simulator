import type { BossDefinition, BossId, FighterDefinition, FighterId } from './types';

export const ARENA_WIDTH = 1280;
export const TICKS_PER_SECOND = 60;
export const BOSS_ORDER: BossId[] = ['strider_hl2', 'dropship_hl2', 'gunship_hl2', 'gargantua_hl1'];

/** These are deliberately scoped mechanical profiles, not the complete duel movesets. */
export const FIGHTER_CATALOG: FighterDefinition[] = [
  { id: 'gordon_hl2', name: 'Gordon Freeman', sourceGame: 'Half-Life 2', role: 'Contrôle physique', maxHp: 12000, speed: 5, color: '#ed883d', lightName: 'Pied-de-biche', rangedName: 'Tir de SMG', specialName: 'Débris gravitationnel', specialHint: 'Projette un débris sur les renforts. Ne traverse pas le blindage lourd.', rangedDamage: 34, rangedCooldown: 14, rangedKind: 'bullet' },
  { id: 'alyx_hl2', name: 'Alyx Vance', sourceGame: 'Half-Life 2', role: 'Mobilité et feinte', maxHp: 10500, speed: 6, color: '#c49a79', lightName: 'Interception', rangedName: 'Alyx Gun', specialName: 'Percée tactique', specialHint: 'Déplacement vif suivi d’un tir ; recharge immédiatement l’esquive.', rangedDamage: 28, rangedCooldown: 11, rangedKind: 'bullet' },
  { id: 'barney_hl2', name: 'Barney Calhoun', sourceGame: 'Half-Life 2', role: 'Défense tactique', maxHp: 13000, speed: 4, color: '#729dbb', lightName: 'Crosse', rangedName: 'Tir de couverture', specialName: 'Garde de sécurité', specialHint: 'Réduit brièvement les rafales. Les canons, flammes et écrasements restent à éviter.', rangedDamage: 38, rangedCooldown: 17, rangedKind: 'bullet' },
  { id: 'shephard_op4', name: 'Adrian Shephard', sourceGame: 'Opposing Force', role: 'Explosifs et assaut', maxHp: 12000, speed: 5, color: '#93a575', lightName: 'Clé à griffe', rangedName: 'Rafale militaire', specialName: 'Grenade', specialHint: 'Explosion efficace sur les renforts et Gargantua ; ne remplace pas le RPG contre les synths.', rangedDamage: 45, rangedCooldown: 20, rangedKind: 'bullet' },
  { id: 'vortigaunt_hl2', name: 'Vortigaunt', sourceGame: 'Half-Life 2', role: 'Décharge et concentration', maxHp: 11500, speed: 4, color: '#b4c575', lightName: 'Griffe', rangedName: 'Décharge vortale', specialName: 'Arc concentré', specialHint: 'Frappe les renforts à proximité et les interrompt. L’équipement de l’arène répond au blindage lourd.', rangedDamage: 80, rangedCooldown: 32, rangedKind: 'energy' },
  { id: 'combine_elite_hl2', name: 'Élite du Cartel', sourceGame: 'Half-Life 2', role: 'Pression à distance', maxHp: 12500, speed: 4, color: '#dce4df', lightName: 'Crosse AR2', rangedName: 'Impulsion AR2', specialName: 'Orbe AR2', specialHint: 'Orbe efficace sur Strider, Gunship et nacelle. Le corps du Dropship reste invulnérable. Puissance et recharge adaptées au mode.', rangedDamage: 55, rangedCooldown: 22, rangedKind: 'energy' },
];

export const BOSS_CATALOG: BossDefinition[] = [
  {
    id: 'strider_hl2', name: 'Strider', sourceGame: 'Half-Life 2', arena: 'Cité 17 — place occupée',
    objective: 'Abattre le Strider avec le poste RPG.',
    counterplay: 'Utiliser le poste RPG et la réserve à gauche. Se mettre à couvert des rafales et sortir de la zone annoncée par le canon. Viser le corps ; les pattes ne sont pas des points faibles.',
    phases: ['Patrouille', 'Suppression', 'Dernière avancée'],
    colors: { primary: '#c58f76', secondary: '#76bac9', sky: '#152d37' }, maxHp: 1200, width: 300, height: 390,
    canonicalRule: 'Le RPG et les orbes AR2 peuvent détruire le Strider ; les tirs ordinaires ne traversent pas son blindage. Le poste accessible à tous et les dégâts sont des adaptations de Resonance.',
    sourceUrls: ['https://www.combineoverwiki.net/wiki/Strider'],
  },
  {
    id: 'dropship_hl2', name: 'Dropship', sourceGame: 'Half-Life 2', arena: 'Littoral — zone de débarquement',
    objective: 'Détruire la nacelle, neutraliser les renforts, puis laisser le transport se retirer.',
    counterplay: 'Sélectionner la nacelle avec Cible ; le corps du Dropship est invulnérable. Utiliser le poste RPG et sa réserve à gauche. Neutraliser aussi les soldats débarqués.',
    phases: ['Approche', 'Débarquement', 'Retrait du transport'],
    colors: { primary: '#a8a395', secondary: '#91bec3', sky: '#26343a' }, maxHp: 900, width: 380, height: 180,
    canonicalRule: 'Le corps du Dropship ne reçoit pas de dégâts joueur. La nacelle est une entité destructible distincte. La victoire est une interception, jamais la mort du transport.',
    sourceUrls: ['https://github.com/ValveSoftware/source-sdk-2013/blob/master/src/game/server/hl2/npc_combinedropship.cpp', 'https://www.combineoverwiki.net/wiki/Combine_Dropship'],
  },
  {
    id: 'gunship_hl2', name: 'Gunship', sourceGame: 'Half-Life 2', arena: 'Route côtière — bastion',
    objective: 'Détruire le Gunship au RPG en gérant les passes et la couverture.',
    counterplay: 'Tirer depuis le poste RPG pendant une récupération. Les rafales du Gunship peuvent intercepter une roquette ; patienter ou tirer après la salve.',
    phases: ['Passe de reconnaissance', 'Feu de suppression', 'Rupture de trajectoire'],
    colors: { primary: '#a3937e', secondary: '#83c7d5', sky: '#193745' }, maxHp: 1000, width: 320, height: 150,
    canonicalRule: 'Le Gunship peut être détruit au RPG ou par orbes AR2 ; il peut intercepter les roquettes. Le rythme des passes et les dégâts sont des réglages originaux du prototype 2D.',
    sourceUrls: ['https://www.combineoverwiki.net/wiki/Combine_Gunship'],
  },
  {
    id: 'gargantua_hl1', name: 'Gargantua', sourceGame: 'Half-Life (1998)', arena: 'Black Mesa — générateurs',
    objective: 'Armer les deux générateurs puis déclencher la décharge lorsque Gargantua est dans la cage.',
    counterplay: 'Armer les générateurs A et B, puis utiliser la commande centrale lorsque Gargantua passe entre les pylônes. Chaque décharge consomme les deux charges. Sauter les ondes et éviter les flammes.',
    phases: ['Poursuite', 'Fournaise', 'Surcharge finale'],
    colors: { primary: '#5b8c9a', secondary: '#f19149', sky: '#242b30' }, maxHp: 1200, width: 180, height: 240,
    canonicalRule: 'Les balles ne tuent pas Gargantua. Les explosifs et les pièges environnementaux fonctionnent. Cette cage est une adaptation du principe électrique de Power Up, sans point faible oculaire fictif.',
    sourceUrls: ['https://www.combineoverwiki.net/wiki/Gargantua', 'https://github.com/ValveSoftware/halflife/blob/master/dlls/gargantua.cpp'],
  },
];

export function getBoss(id: BossId): BossDefinition {
  const boss = BOSS_CATALOG.find((entry) => entry.id === id);
  if (!boss) throw new Error(`Boss inconnu : ${id}`);
  return boss;
}

export function getFighter(id: FighterId): FighterDefinition {
  const fighter = FIGHTER_CATALOG.find((entry) => entry.id === id);
  if (!fighter) throw new Error(`Combattant inconnu : ${id}`);
  return fighter;
}
