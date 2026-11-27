# Half Life Resonance

Bible, production graphique et premier module Boss Battle jouable du mode annexe de combat 2D de Half Life Administrator.

<!-- CURRENT_GUIDE_INTEGRATION_20261127 -->
## Reprise du 27 novembre — bible 1.11, guide commun et deux extensions

Les **trois fichiers originaux du guide de combat** sont désormais [intégrés sans modification](guides/README.md), avec provenance et SHA-256. La [matrice des 68 sections](guides/COVERAGE_68.md) donne une décision, un état réel et un fichier d’application pour chaque rubrique.

Le [chapitre d’intégration](chapters/guide_integration_20261127.md), l’[extension 01](chapters/guide_extension_01_20261127.md) et l’[extension 02](chapters/guide_extension_02_20261127.md) ajoutent **63 fiches de production** : six taunts, six cycles de sélection, trois duos, six assistances, neuf techniques/conclusions d’équipe, trois clashes, quatre entités, cinq bonus, un espace d’archives, treize slots/modes, six règles de déblocage et une politique de soutien. Les [données JSON](data/combat_extensions_20261127.json) restent des contrats de conception, reliés aux identifiants du catalogue.

**Aucun PNG ni clip animé n’est créé par cette intégration.** Le checkpoint graphique repris est le lot L (286 PNG) ; le [lot N produit en parallèle](production/continuation_20261127_n/README.md) porte l’inventaire à **293 PNG, dont sept nouveaux fichiers et six poses retenues pour la prochaine revue**, toujours 18 cibles sans PNG. Le lot M / la version 1.10 annoncés dans l’historique n’ont pas été récupérés ; 1.11 identifie ce nouveau travail sans les déclarer livrés. Les six profils et quatre boss déjà jouables ne deviennent pas des kits complets de duel.

Le lot adjacent intègre le modèle d’accès à quatre dimensions et quatre dossiers de terrain du Boss Battle, vérifiés par smoke tests Node ; sa validation navigateur reste ouverte. Les taunts animés, le tag, les assistances, les supers, QTE, bonus et espace exploratoire restent conçus ; les services de soutien restent différés. Les sources, adaptations et limites de fidélité sont explicites. ATLAS/P-body restent en conception avec leurs refus historiques conservés. Les exports Word/Excel v1 restent historiques.

Vérification documentaire : `node scripts/validate-resonance-guides.mjs`.
<!-- END_CURRENT_GUIDE_INTEGRATION_20261127 -->

## Reprise du 25 novembre — bible 1.9 et lot L

**15 nouveaux PNG : 10 cibles jusque-là sans fichier reçoivent un premier candidat, et cinq couches sont ajoutées à l’usine à tourelles de Portal 2.** Les 28 cibles initialement manquantes ont toutes une issue documentée.

L’inventaire atteint **286 PNG distincts**, **338 entrées**, **36 refus**, **4 erreurs outil** et **12 sorties historiques perdues**. **241 des 259 cibles ont un PNG; 18 restent sans PNG.**

[Rapport du lot L](production/continuation_20261125_l/README.md) · [Galerie](production/continuation_20261125_l/GALLERY.md) · [Revue des 28 cibles](production/continuation_20261125_l/TARGET_REVIEW.md) · [Inventaire complet](production/MISSING_TARGETS.md)

Les quatre archives ont une première étude, avec leurs limites de version et de matière. Les six identifiants de couches Factory disposent de candidats, mais raccords et séparation L5/L6 restent ouverts. Les refus historiques et reports sont distincts des nouvelles générations. Les neuf images déjà utilisées dans Boss Battle restent les seules intégrations; aucune fidélité 1:1, animation complète ou arène à six couches n’est certifiée. Les exports Word/Excel v1 restent historiques.

## Lot K — état historique avant le lot L

**80 nouveaux PNG couvrant 76 cibles jusque-là sans fichier.** Les 104 cibles manquantes au début du lot ont une issue explicite : 76 reçoivent un candidat, 11 ont un refus de génération confirmé et 17 sont reportées sans appel avec le blocage documenté.

L’inventaire atteint **271 PNG distincts**, **323 entrées**, **36 refus**, **4 erreurs outil** et **12 sorties historiques perdues**. **231 des 259 cibles ont un PNG; 28 restent sans PNG.**

[Rapport du lot K](production/continuation_20261125_k/README.md) · [Galerie](production/continuation_20261125_k/GALLERY.md) · [Revue des 104 cibles](production/continuation_20261125_k/TARGET_REVIEW.md) · [Inventaire complet](production/MISSING_TARGETS.md)

Les références, refus explicites et reports sont conservés séparément. Les nouveaux fichiers restent des poses, effets statiques ou panoramas candidats. Les neuf images déjà utilisées dans Boss Battle restent les seules intégrations déclarées; aucune animation complète, arène à six couches ou fidélité 1:1 n’est certifiée. Les exports Word/Excel v1 restent historiques.

## Lot J — état historique du 24 novembre

**44 PNG supplémentaires : 43 nouvelles images conservées et un décor historique récupéré.** Le [rapport du lot J](production/continuation_20261124_j/README.md) et sa [galerie](production/continuation_20261124_j/GALLERY.md) portent l’inventaire à **191 PNG distincts, 229 entrées, 25 refus antérieurs, 1 erreur outil et 12 sorties perdues tracées**. **155 des 259 cibles** ont un fichier associé; **104 restent sans PNG**.

Le prototype Boss Battle utilise désormais **six sprites fixes de combattants et celui du Gunship**, en plus des deux panoramas déjà intégrés. Le rendu de secours et les signaux de combat restent actifs. Les dix effets recréés après l’interruption sont de nouvelles sorties, explicitement reliées aux versions perdues. Aucune animation complète, arène à six couches ou fidélité 1:1 n’est certifiée.

[Inventaire complet](production/MISSING_TARGETS.md) · [Audit](production/asset_audit.md) · [Intégration et vérifications](production/continuation_20261124_j/runtime_integration.md). Les exports Word/Excel v1 restent historiques.

## Lot I — état historique avant le lot J

**108 PNG ajoutés : 94 récupérés et 14 nouveaux.** Le [rapport courant et la galerie du lot I](production/continuation_20261124_i/README.md) portent l’inventaire à **147 PNG distincts, 172 demandes et 25 refus**, couvrant **114 des 259 cibles**. **145 cibles restent sans fichier associé.** [Inventaire complet](production/MISSING_TARGETS.md) · [Audit des fichiers](production/asset_audit.md) · [Récupération des 94 PNG](production/recovery_20261124/README.md).

Le nouveau lot apporte Protection Civile, City Scanner, Rollermine, Grunt/Charger/Suppressor d’Alyx, costume G-Man HL1, Pit Worm, Gene Worm, trois masters de stages, portail orange Portal 1 et rayon Tau primaire HL1. Les fichiers restent des candidats ; aucun nouveau contenu n’est intégré au moteur et aucune fidélité 1:1 ou animation n’est déclarée certifiée. Les exports Word/Excel v1 restent historiques.

## Lot E — état historique du 20 novembre


La bible Markdown passe en **version 1.5**. Le [dossier des archives](chapters/archive_reference_contracts_20261120.md) développe huit contrats de référence pour le contenu abandonné et suit les trois autres archives dont les preuves restent à compléter. Les modèles, concepts, prototypes et adaptations proposées sont distingués ; aucun personnage inédit n’est présenté comme une apparence officielle finale.

Le [lot E et sa galerie](production/continuation_20261120_e/README.md) ajoutent **douze PNG pour sept cibles** : Dog, Hunter, Fourmilion ouvrier, costume HECU au béret, Gargantua vu de dos, cinq fichiers de couches des Canaux et deux de Ravenholm. La révision du mur central des Canaux remplace la v1 pour la prochaine revue. Les Canaux ont cinq plans candidats sur six ; Ravenholm en a deux.

Au point de contrôle du 20 novembre, l’état vérifié était de **39 PNG distincts, 51 demandes et 12 refus**, pour **187 cibles dont 25 avec fichier et 162 sans fichier**. Aucun nouveau refus n’a été enregistré dans ce lot. Les onze fichiers de couches couvrent neuf couples stage/plan identifiés ; le fichier historique de Cité 17 reste sans ID. Aucun stage complet, clip animé ni contrôle de fidélité 1:1 n’est déclaré terminé.

La [relecture alpha du lot D](production/continuation_20261120_e/alpha_review_previous_assets.json) corrige le diagnostic de franges rouges nettes pour trois sprites sur les fonds testés. Les PNG et le refus historique de la correction Strider sont conservés. Les nouveaux fichiers restent candidats ; les exports Word/Excel v1 restent historiques.

## Lot D — état historique avant le lot E

La bible Markdown passait en **version 1.4**. Le [chapitre des machines du Cartel](chapters/combine_encounter_design_20261120.md) précise cinq profils existants, quinze phases, treize attaques, dix-sept zones de collision proposées et **77 clips à produire**. Il ajoute trois plans de stages et dix-huit couches documentaires. Les comportements observés dans le prototype et les règles attestées par le SDK Valve sont distingués des adaptations proposées.

Le [lot D et sa galerie](production/continuation_20261120_d/README.md) ajoutent **huit PNG pour sept cibles** : soldat Overwatch, Fourmilion et Zombine de la réserve, Strider de White Forest, Advisor, maîtres Ravenholm et Canaux, et sol séparé des Canaux. Aucun costume n’est ajouté dans ce lot. Une correction du détourage du Strider a été refusée ; sa première version reste disponible. Le diagnostic initial de franges est précisé par la relecture alpha du lot E.

À l’issue du lot D, l’état vérifié était de **27 PNG distincts**, **39 demandes**, **12 refus**, **187 cibles**, dont **20 avec un fichier associé et 167 sans fichier**. Les douze réserves ont désormais un jeu d’origine renseigné. Les quatre fichiers de couches correspondent à trois plans identifiés ; la silhouette de Cité 17 mélange encore ciel et Citadelle et reste sans ID de plan. Aucun stage à six couches, clip animé ni contrôle de fidélité 1:1 n’est déclaré terminé.

Les nouveaux fichiers restent candidats et ne changent pas les quatre boss du prototype. Les exports Word/Excel v1 demeurent historiques ; les sources Markdown/JSON courantes font foi.

## Lot C — état historique avant le lot D

La bible Markdown passait en **version 1.3**. Le [chapitre Aperture](chapters/aperture_combat_design_20261120.md) développe trois kits et 69 actions proposées, douze routes, les parcours narratifs, une rencontre Rocket Turret en trois phases et deux plans d’arènes. Ces spécifications enrichissent huit cibles existantes et restent à implémenter.

Le [lot C et sa galerie](production/continuation_20261120_c/README.md) ajoutent **sept PNG pour cinq cibles** : Chell Portal 1, tenue Chell Portal 2, noyau de Grady, Rocket Turret (v1 et v2) et chaîne de fabrication Portal 2 (maître et sol séparé). Wheatley, ATLAS et P-body ont été refusés par le service et restent sans fichier.

À l’issue du lot C, l’état vérifié était de **19 PNG distincts**, **30 demandes**, **11 refus**, **187 cibles**, dont **13 avec un fichier associé et 174 sans fichier**. Les contours, poses latérales, animations, autres couches et validations de fidélité restent à terminer.

<!-- CURRENT_CONTINUATION_20261120_B -->
## Lot B — état historique avant le lot C

La bible Markdown passe en **version 1.2** avec [102 cibles supplémentaires](chapters/catalogue_extension_20261120.md): personnages, petites machines, costumes, stages, rencontres et archives séparées. Cette extension est documentaire; elle n’ajoute pas 102 combattants jouables.

**Douze PNG sont réellement présents**, dont six nouveaux fichiers couvrant Colette, G-Man, Apache HECU, Abrams et White Forest (v1 plus correction v2). [La galerie et le rapport du lot](production/continuation_20261120_b/README.md) décrivent les limites, les cinq nouveaux refus et les prompts. Tous restent candidats, sans certification 1:1 ni animation complète.

La [file consolidée des manquants](production/MISSING_TARGETS.md) et son [JSON](data/production_queue.json) relient les catalogues aux images présentes. Le [rapport d’audit](production/asset_audit.md) vérifie chemins, dimensions, tailles et SHA256. Les 68 PNG et 229 cibles évoqués dans une reprise antérieure n’ont pas été retrouvés; ils ne sont pas présentés comme livrés. [Détail de récupération](production/continuation_20261120_b/RECOVERY_STATUS.md).

Les exports Word/Excel v1 ci-dessous restent des instantanés historiques. Les sources Markdown/JSON actuelles font foi.
<!-- END_CURRENT_CONTINUATION_20261120_B -->

## Boss Battle

Le menu principal ouvre désormais **Half Life Resonance · Boss Battle**, également accessible avec `?module=resonance-boss-battle`. Six profils pilotes affrontent quatre boss dans une simulation à 60 Hz : Strider, Dropship et sa nacelle, Gunship, Gargantua. Opération libre, Boss Rush de quatre rencontres et entraînement fonctionnent, avec trois difficultés, commandes clavier/tactiles, interactions d'arène, pause, résultats et records locaux séparés de la gestion.

Le [chapitre Boss Battle](BOSS_BATTLE.md), repris dans la bible complète, documente 24 rencontres et une archive Hydra désactivée. Les vingt rencontres supplémentaires, les chroniques narratives, le relais et la coopération restent à implémenter. Le rendu utilise sept poses fixes candidates, des représentations vectorielles de secours et deux panoramas candidats; aucune animation de boss ni fidélité 1:1 n’est déclarée achevée.

- `data/boss_battle_catalog.json` : identités, sources, contre-jeu, objectifs et trois phases de conception par rencontre.
- `data/boss_battle_rules.json` : périmètre réel et extensions prévues.
- `data/boss_battle_production.json` : 72 groupes de production visuelle planifiés, aucun terminé.
- `src/features/resonance/bossBattle` : moteur, catalogue pilote, écran, rendu et tests.
- [État de validation du lot](technical/BOSS_BATTLE_VALIDATION.md).

## Premier lot — historique du 19 novembre

La conception couvre 24 combattants, 24 arènes, six kits pilotes, une histoire en douze chapitres, les parcours arcade avec intro, rival et ending, les modes de tournoi, l'entraînement, les fatalités optionnelles et la production des décors en parallaxe.

Le lot graphique contient six images réellement produites : une pose individuelle d'Élite du Cartel, deux panoramas maîtres, deux couches candidates dérivées de ces panoramas et un chargeur HEV candidat. Gordon, Alyx et le Vortigaunt ont été demandés mais leurs générations ont été refusées automatiquement. Ils ne sont pas comptés comme produits.

Les visuels sont rangés dans `assets/resonance/candidates`. Le manifeste conserve leur provenance, leurs dimensions, leurs consignes et leur état de validation. Aucun asset n'est certifié 1:1. Aucun clip animé complet ni arène complète à six couches n'est déclaré terminé. La couche de brume de Cité 17 et le chargeur HEV nécessitent une révision visible.

## Documents de lecture et de suivi

- [Bible Word de 62 pages](deliverables/Half_Life_Resonance_Bible_v1.docx).
- [Classeur Excel de production, sept onglets](deliverables/Half_Life_Resonance_Production_v1.xlsx).

Ces exports Word et Excel sont les instantanés historiques v1 du premier lot ; ils n'incluent pas l'ajout Boss Battle. Les sources Markdown et JSON actuelles font foi pour cette extension. Le classeur v1 distingue les entrées de conception, les groupes à produire et le journal des images réellement générées.

## Organisation

- `BIBLE.md` : bible intégrale en français.
- `chapters/` : chapitres séparés pour la revue éditoriale.
- `data/roster.json` : combattants, techniques, scènes et parcours.
- `data/stages.json` : arènes et spécifications des six couches.
- `data/combat_rules.json` : paramètres initiaux du système à 60 Hz.
- `data/frame_data_pilote.json` : données initiales des normales et projections des six pilotes.
- `data/asset_backlog.json` et `asset_backlog.csv` : groupes de production.
- `data/animation_inventory.json` et `animation_budget.json` : séquences et dessins cibles.
- `data/generated_art_register.json` : journal courant des demandes, fichiers, refus et itérations non retenues.
- `data/existing_visual_inventory.json` : visuels présents dans la base auditée.
- `technical/resonance_contracts.ts` : contrats proposés et vérifications partielles.

Le module Boss Battle est intégré sous `src/features/resonance/bossBattle`. Le moteur de duel et les autres modes de la bible restent à réaliser. Les données documentaires de l'extension ne rendent pas automatiquement jouables les rencontres supplémentaires. Les contrats historiques de duel conservent leur statut proposé ; la simulation Boss Battle et les records possèdent leur propre périmètre.

## Validation du lot

Depuis la racine du dépôt :

```bash
node scripts/validate-resonance-design.mjs
node scripts/validate-resonance-boss-design.mjs
node scripts/audit-resonance-production.mjs --write-report
node scripts/sync-resonance-production.mjs --write
npm run quality
```

Les validateurs documentaires portent sur les catalogues, identifiants, coûts, comptes de production, références d’assets et cohérence mathématique de la frame data. La commande `quality` ajoute le lint, les tests du moteur, la matrice de gestion et la compilation. Ces contrôles ne mesurent ni performances d’affichage ni gameplay réseau. Les six images candidates du premier lot ont fait l’objet d’une inspection de format et de transparence ; le parcours visuel et interactif Boss Battle n’a pas pu être validé dans le navigateur disponible, comme indiqué dans le rapport de validation.

## Base de référence

Conception initiée le 19 novembre 2026 depuis `master` au commit `63652852f030f6d76d5893845e326a60100d3c58`, package `0.47.0`. L'inventaire public de cette base contient 67 images statiques et ne révèle aucun module de combat 2D existant.

Half-Life et les personnages associés appartiennent à leurs ayants droit. Les règles de combat, récits, rivalités et conclusions proposés ici sont des adaptations originales pour ce projet de fan non officiel.
