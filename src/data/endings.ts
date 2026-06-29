export interface GameEnding {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  category: 'combine_victory' | 'rebel_victory' | 'xen_defeat' | 'combine_purge' | 'special';
  moraleCost: string;
}

export const endings: GameEnding[] = [
  {
    id: 'end_model_city',
    title: 'Cité Modèle de l\'Union Universelle',
    subtitle: 'La stabilisation par l\'éradication de la volonté',
    description: 'La stabilité est totale. La rébellion n\'est plus qu\'un lointain souvenir, la contamination Xen est contenue dans des limites scientifiques, et les usines tournent à plein régime. Les citoyens, brisés par la discipline et le rationnement parfait, ne pensent plus à résister. Vous avez réussi vos fonctions de gestionnaire colonial Combine. Vous êtes promu à l\'administration d\'une mégalopole majeure, tandis que la population de City {{CITY_NUMBER}} est définitivement assimilée.',
    category: 'combine_victory',
    moraleCost: 'Destruction définitive de l\'individualité humaine locale.'
  },
  {
    id: 'end_sterile_terror',
    title: 'Terreur Stérile',
    subtitle: 'Un ordre parfait régnant sur des tombes',
    description: 'Vous avez maintenu l\'ordre par une poigne de fer. La rébellion est nulle et les rues sont vides de tout graffiti Lambda. Cependant, la loyauté est au plus bas, et la peur au plus haut. Les pertes civiles se comptent par dizaines de milliers. Les secteurs résidentiels sont silencieux, glacés et quadrillés par les scanners. Vous avez stabilisé City {{CITY_NUMBER}}, mais vous administrez désormais une ville fantôme vidée de sa force vitale.',
    category: 'combine_victory',
    moraleCost: 'Génocide passif de la population urbaine.'
  },
  {
    id: 'end_general_uprising',
    title: 'Insurrection Générale',
    subtitle: 'La chute des remparts de l\'Union',
    description: 'L\'activité rebelle a atteint son paroxysme. Les citoyens armés de fusils à impulsions volés ont brisé les check-points de la Civil Protection. Les barricades se sont dressées à chaque coin de rue et les soldats Overwatch se replient vers la Citadel. Le logo Lambda brille sur tous les écrans géants de la place. City {{CITY_NUMBER}} est tombée. Vous êtes contraint de fuir vers le sommet de la Citadel alors que le peuple en colère enfonce les portes de votre bunker administratif.',
    category: 'rebel_victory',
    moraleCost: 'Chaos urbain total, mais espoir de liberté retrouvé.'
  },
  {
    id: 'end_xen_infestation',
    title: 'Zone Organique Instable (Ravenholm Bis)',
    subtitle: 'La biosphère terrestre submergée par Xen',
    description: 'La contamination Xen a dépassé le seuil critique. Les headcrabs, les zombies et les antlions grouillent dans tous les secteurs. Les murs de la cité se recouvrent de champignons luminescents et de tentacules géants. La Civil Protection a fui ou a été parasitée. La ville entière est déclarée biologiquement compromise par la Citadel centrale. Les Razor Trains cessent d\'y transiter. City {{CITY_NUMBER}} n\'est plus une cité humaine, c\'est un biome Xen hostile.',
    category: 'xen_defeat',
    moraleCost: 'Perte de la cité au profit de la faune extraterrestre parasite.'
  },
  {
    id: 'end_replaced_admin',
    title: 'Administrateur Remplacé et Recyclé',
    subtitle: 'Sanction bureaucratique pour défaillance répétée',
    description: 'Vous avez échoué à remplir les directives de la Citadel à plusieurs reprises. Les Advisors ont jugé votre rendement inacceptable. Deux soldats d\'élite de l\'Overwatch pénètrent dans votre bureau sans avertissement. Vous êtes arrêté pour sédition passive et inefficacité criminelle. Vos privilèges vous sont retirés et vous êtes transféré vers Nova Prospekt pour y être reconditionné en soldat de l\'Overwatch sans mémoire.',
    category: 'combine_purge',
    moraleCost: 'Perte totale de votre conscience et de votre identité.'
  },
  {
    id: 'end_advisor_takeover',
    title: 'Reprise de Contrôle Directe par les Advisors',
    subtitle: 'L\'intervention psychique des Conseillers',
    description: 'Le désordre grandissant a forcé l\'intervention directe des Advisors de l\'Union. Des capsules d\'Advisors flottent désormais dans votre bureau administratif. Utilisant leurs pouvoirs télékinésiques et psychiques dévastateurs, ils répriment la population et contrôlent directement les unités Overwatch, court-circuitant votre autorité. Vous restez en poste comme simple marionnette terrorisée, assistant impuissant à la purge de votre propre ville.',
    category: 'combine_purge',
    moraleCost: 'Asservissement psychique total des cadres dirigeants.'
  },
  {
    id: 'end_citadel_collapse',
    title: 'Effondrement de la Citadel Locale',
    subtitle: 'La chute de la tour de contrôle',
    description: 'L\'énergie de la Citadel est tombée à zéro sous les assauts combinés de la Résistance et de pannes critiques du réacteur. Sans alimentation, le Suppression Field s\'est désactivé et les barrières énergétiques de confinement se sont éteintes. La structure métallique de la Citadel commence à s\'effondrer sur elle-même. La ville plonge dans le noir, tandis que les forces Combine perdent toute coordination logistique. L\'évacuation de l\'Union a commencé.',
    category: 'rebel_victory',
    moraleCost: 'Destruction des infrastructures de survie de la ville.'
  },
  {
    id: 'end_double_agent',
    title: 'Le Triomphe du Double Jeu',
    subtitle: 'Sabotage administratif depuis le sommet',
    description: 'Vous avez maintenu une façade de loyauté Combine parfaite tout en aidant clandestinement la Résistance Lambda. Vos rapports falsifiés ont masqué l\'infiltration rebelle, et vos détours de ressources ont armé le soulèvement. Lorsque l\'insurrection finale éclate, vous ouvrez les portes des installations Combine aux rebelles. Vous êtes accueilli en héros secret par les chefs de la Résistance, mais vous savez que vous avez envoyé des centaines de Metro Cops crédules à la mort pour y parvenir.',
    category: 'special',
    moraleCost: 'Trahison systématique et sacrifices humains consentis.'
  },
  {
    id: 'end_industrial_collapse',
    title: 'Effondrement Industriel et Famine',
    subtitle: 'Une économie totalitaire en ruine',
    description: 'La production industrielle s\'est effondrée et les réserves de rations sont tombées à zéro. La population, affamée, a cessé de travailler et pille les entrepôts. Sans énergie ni rations à distribuer, la Civil Protection déserte son poste. L\'Union Universelle coupe le ravitaillement électrique de la ville et la déclare en faillite administrative. Les citoyens meurent de faim dans les rues abandonnées sous les yeux froids des caméras.',
    category: 'combine_purge',
    moraleCost: 'Famine urbaine généralisée sous embargo extraterrestre.'
  },
  {
    id: 'end_ravenholm_bis',
    title: 'La Purge Biologique (Ravenholm)',
    subtitle: 'Le bombardement massif par Headcrab Shells',
    description: 'Pour mater la rébellion incontrôlable de certains blocs résidentiels, vous avez autorisé un bombardement massif par Headcrab Shells. Des centaines de capsules biologiques contenant des parasites Xen se sont abattues sur la ville. En 48 heures, les rebelles et les citoyens innocents ont été transformés en zombies décérébrés. La ville est silencieuse, peuplée uniquement de cadavres animés et de cris d\'agonie. Vous contemplez les ruines de votre ville depuis votre bureau scellé.',
    category: 'xen_defeat',
    moraleCost: 'Utilisation d\'armes biologiques de destruction massive sur vos concitoyens.'
  },
  {
    id: 'end_evacuated_city',
    title: 'La Cité Évacuée',
    subtitle: 'L\'exode silencieux par les tunnels',
    description: 'Grâce à des choix de surveillance délibérément laxistes, la majorité des civils a réussi à s\'échapper de City {{CITY_NUMBER}} par les canaux et les anciens tunnels pré-guerre. Lorsqu\'Overwatch lance son raid final sur les blocs résidentiels, ils ne trouvent que des appartements vides et des messages de dérision Lambda peints sur les murs. La population a fui vers les bases rebelles de l\'extérieur (type Black Mesa East ou White Forest). Vous restez seul dans une cité vide, attendant le châtiment de la Citadel.',
    category: 'special',
    moraleCost: 'Abandon volontaire de la cité et sacrifice de votre carrière.'
  },
  {
    id: 'end_total_purge',
    title: 'Purge Militaire Totale',
    subtitle: 'Le protocole de nettoyage de l\'Overwatch',
    description: 'L\'activité rebelle et la contamination Xen ont rendu la ville ingérable. La Citadel a ordonné le protocole de nettoyage militaire total. Des Striders, des Gunships et des bataillons entiers de soldats d\'élite envahissent les secteurs, abattant systématiquement tout être vivant sans distinction entre rebelles, Xen ou civils innocents. Le ciel est obscurci par la fumée des incendies. La cité est nettoyée militairement mais rendue inhabitable pour des décennies.',
    category: 'combine_purge',
    moraleCost: 'Extermination complète et indiscriminate de la vie urbaine.'
  },
  {
    id: 'end_controlled_uprising',
    title: 'Le Soulèvement Contrôlé',
    subtitle: 'L\'élimination tactique de vos rivaux politiques',
    description: 'Vous avez sciemment laissé grandir une petite rébellion pour justifier l\'intervention de l\'Overwatch et l\'élimination de vos rivaux administratifs locaux. Une fois vos ennemis politiques éliminés dans les émeutes, vous avez déployé les Striders pour écraser la révolte avec une brutalité inouïe. Vous conservez votre poste avec une autorité absolue et renforcée, mais votre nom est écrit en lettres de sang dans la mémoire des survivants.',
    category: 'combine_victory',
    moraleCost: 'Machiavélisme pur et instrumentalisation de la mort de milliers de personnes.'
  },
  {
    id: 'end_administrative_execution',
    title: 'Exécution Administrative',
    subtitle: 'Le prix de la trahison ou de la faiblesse',
    description: 'Vos actions ambiguës ont attiré l\'attention de la division de sécurité de la Citadel. Vos communications cryptées avec la résistance ont été interceptées ou vos échecs simulés ont été dénoncés par un officier de la Civil Protection jaloux. Vous êtes traîné devant un tribunal militaire improvisé et exécuté publiquement sur la place administrative pour servir d\'exemple de ce qu\'il en coûte de douter de l\'Union.',
    category: 'combine_purge',
    moraleCost: 'Votre propre exécution pour haute trahison.'
  },
  {
    id: 'end_preserved_humanity',
    title: 'L\'Humanité Préservée',
    subtitle: 'La fin secrète du juste',
    description: 'Au prix de risques immenses et de compromis permanents, vous avez réussi l\'impossible : limiter les pertes civiles, maintenir un approvisionnement en rations digne, contenir la menace Xen sans incinération de masse, et affaiblir la Citadel locale en retardant ses plans énergétiques. Lorsque les forces rebelles entrent dans votre bureau, elles ne tirent pas. Elles vous escortent avec respect à l\'extérieur. Vous avez préservé l\'humanité physique et morale de vos citoyens.',
    category: 'special',
    moraleCost: 'Aucun. C\'est la fin secrète et glorieuse de l\'administrateur juste.'
  }
];
export const getEndingById = (id: string, cityNumber: string | number): GameEnding | undefined => {
  const ending = endings.find(e => e.id === id);
  if (!ending) return undefined;
  return {
    ...ending,
    description: ending.description.replace(/\{\{CITY_NUMBER\}\}/g, String(cityNumber))
  };
};
