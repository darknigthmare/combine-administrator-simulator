export interface ArchiveReport {
  id: string;
  day: number;
  title: string;
  author: string;
  classification: string;
  content: string;
}

export const preWrittenReports: ArchiveReport[] = [
  {
    id: 'arch_report_01',
    day: -120,
    title: 'RAPPORT DE SÉCURITÉ URBAINE — INCIDENT 77-B',
    author: 'Officier de Liaison CP-04',
    classification: 'RESTREINT — CONSEIL D\'ADMINISTRATION',
    content: `Relevé de patrouille dans le Bloc Résidentiel A.
Plusieurs graffitis Lambda ont été nettoyés au niveau des sous-sols du bâtiment 4. Deux citoyens de sexe masculin ont été appréhendés alors qu'ils transportaient du matériel radio d'avant-guerre.
Après interrogatoire préliminaire, les sujets ont été réaffectés au convoi de transfert 44-A à destination de Nova Prospekt. Le secteur est revenu à un niveau de stabilité nominal de 80%.
Recommandation : Augmenter la fréquence des inspections de nuit.`
  },
  {
    id: 'arch_report_02',
    day: -98,
    title: 'RAPPORT D\'INFESTATION XEN — SECTEUR CANAUX',
    author: 'Chef d\'équipe Décontamination CP-12',
    classification: 'DANGER BIOLOGIQUE — PROTOCOLE QUARANTINE',
    content: `Détection d'une poche d'incubation d'headcrabs classiques sous le pont ferroviaire des Canaux.
Deux Metro Cops ont été attaqués. L'un d'eux a subi un parasitage cérébral complet avant d'être éliminé par ses coéquipiers. Un essaim de 12 Manhacks a été déployé pour purger les conduits.
La contamination locale a été réduite de 40%, mais des spores fongiques résiduelles se propagent le long des parois humides.
Recommandation : Déclarer le canal inférieur 'compromis' et installer des barrières de confinement.`
  },
  {
    id: 'arch_report_03',
    day: -75,
    title: 'AUDIT DE RENDEMENT INDUSTRIEL — TRIMESTRE 3',
    author: 'Technocrate en Chef V. Vance (décédé/reconditionné)',
    classification: 'INTERNE — CITADEL LOGISTICS',
    content: `La production de plaques de blindage pour Razor Trains a chuté de 12% en raison de la fatigue civique et d'accidents de travail répétés dans la fonderie du Complexe industriel.
La Citadel refuse d'accorder des suppléments de rations caloriques pour ce trimestre. Les quotas doivent être maintenus sous peine de sanctions envers l'administration locale.
Un protocole de rotation forcée de 16 heures a été implémenté.
Recommandation : Remplacer les ouvriers défaillants par de la main-d'œuvre de la Gare de transit.`
  },
  {
    id: 'arch_report_04',
    day: -60,
    title: 'RAPPORT PSYCHIQUE ADVISOR — LOG 009',
    author: 'Citadel Operations Node',
    classification: 'CLASSIFICATION CRITIQUE — INTERDIT AUX CIVILS',
    content: `Le pod de l'Advisor-02 a signalé des perturbations psychiques d'ondes de basse fréquence en provenance du Bloc Résidentiel B.
L'analyse suggère la présence d'un émetteur radio rebelle non autorisé émettant sur la fréquence Lambda.
Les ondes causent des nausées sévères parmi les officiers CP non conditionnés. L'ordre a été donné de lancer un balayage électronique massif et de couper l'alimentation électrique du bloc pendant 24 heures.
Statut : Brouillage en cours.`
  },
  {
    id: 'arch_report_05',
    day: -45,
    title: 'ÉVACUATION FORCEE DU SECTEUR RUINES',
    author: 'Commandant Overwatch Ordinal-09',
    classification: 'OPÉRATIONS MILITAIRES',
    content: `Conformément au protocole de stabilisation, les ruines pré-guerre ont été vidées de toute population civile résiduelle.
Les habitations de fortune ont été détruites. Une patrouille d'APC a été déployée pour interdire l'accès. 120 citoyens récalcitrants ont été arrêtés pour 'non-conformité majeure' et transférés à Nova Prospekt.
Des foyers d'insectes Antlions restent actifs sous les fondations meubles du secteur.
Recommandation : Déploiement régulier de suppresseurs thermiques.`
  },
  {
    id: 'arch_report_06',
    day: -30,
    title: 'RAPPORT DE SÉDITION DANS LE QUARTIER DES TRAVAILLEURS',
    author: 'Inspecteur Interne CP-01',
    classification: 'SECRET DEFENSE',
    content: `Découverte d'un tract intitulé "Le Flambeau Lambda" dans la cantine 3 du Quartier des travailleurs.
Le texte appelle à saboter les générateurs d'électricité pour désactiver le Suppression Field de la Citadel locale. L'auteur présumé, un électricien de niveau 3, a été identifié et arrêté.
L'interrogatoire n'a pas permis de révéler de complices directs en raison d'une panne cardiaque du sujet lors de la procédure d'extraction neurale.
Recommandation : Augmentation de la censure informationnelle.`
  },
  {
    id: 'arch_report_07',
    day: -15,
    title: 'BOMBARDEMENT HEADCRAB SHELL SUR LES CANAUX SUD',
    author: 'Citadel Artillery Command',
    classification: 'PROTOCOLE HEADCRAB DENIAL — EXPÉRIMENTAL',
    content: `Tir de 3 obus biologiques Headcrab Shells sur la section sud des Canaux, suspectée d'abriter un relais de fuite de la Résistance.
Les relevés post-bombardement indiquent l'éradication complète de la présence humaine active. Le secteur présente désormais une contamination Xen critique de 85%.
Des patrouilles de la CP ont été déployées pour barricader les tunnels menant au secteur résidentiel.
Recommandation : Maintenir le scellement physique indéfiniment.`
  },
  {
    id: 'arch_report_08',
    day: -10,
    title: 'ALERTE SUR LE SYSTÈME DE SUPPRESSION BIOLOGIQUE',
    author: 'Directeur de Recherche de la Citadel',
    classification: 'RESTREINT — PRIORITÉ NIVEAU 1',
    content: `Le Suppression Field fonctionne à 94% de sa capacité énergétique nominale.
Cependant, des relevés d'hormones de grossesse ont été détectés dans les urines d'une citoyenne du Bloc Résidentiel A. Il s'agit du premier cas de contournement de barrière de fertilité enregistré cette année dans cette cité.
La citoyenne et son conjoint ont été appréhendés en secret.
Recommandation : Augmenter la tension du champ sur le Bloc A de 5% pour neutraliser tout résidu d'hormones.`
  },
  {
    id: 'arch_report_09',
    day: -5,
    title: 'SABOTAGE DU NŒUD FERROVIAIRE RAZOR TRAIN',
    author: 'Chef de Secteur Transport CP-08',
    classification: 'RAPPORTS COMMERCIAUX — PERTES',
    content: `Un aiguillage a été délibérément saboté au Nœud ferroviaire Razor Train, provoquant le déraillement d'un convoi de métaux en provenance de City 17.
Les coupables ont fui par les Canaux. La production industrielle de la ville est affectée à hauteur de -20% pour les trois prochains jours.
Des civils ont été réquisitionnés sous garde armée pour dégager les voies.
Recommandation : Installer des scanners fixes au-dessus des rails de transit.`
  },
  {
    id: 'arch_report_10',
    day: -2,
    title: 'RAPPORT DE SUPERVISION ADVISOR SUR L\'ADMINISTRATEUR ACTUEL',
    author: 'Consortium des Advisors Combine',
    classification: 'CLASSIFICATION CRITIQUE — SURVEILLANCE DIRECTE',
    content: `L'analyse du rendement de l'Administrateur actuel de City {{CITY_NUMBER}} montre des fluctuations inquiétantes.
Bien que la stabilité urbaine reste au-dessus du seuil de crise, la progression de la sédition Lambda et les incursions Xen menacent la continuité industrielle.
Le sujet fait l'objet d'une surveillance renforcée. En cas de défaillance majeure d'une directive de la Citadel, le protocole d'élimination ou de recyclage transhumain sera immédiatement engagé.
Statut : En observation.`
  }
];
export const getArchiveReportById = (id: string, cityNumber: string | number): ArchiveReport | undefined => {
  const report = preWrittenReports.find(r => r.id === id);
  if (!report) return undefined;
  return {
    ...report,
    content: report.content.replace(/\{\{CITY_NUMBER\}\}/g, String(cityNumber))
  };
};
export const getArchiveReportsForCity = (cityNumber: string | number): ArchiveReport[] => {
  return preWrittenReports.map(report => ({
    ...report,
    content: report.content.replace(/\{\{CITY_NUMBER\}\}/g, String(cityNumber))
  }));
};
