# Half Life Resonance

Bible, production graphique et premier module Boss Battle jouable du mode annexe de combat 2D de Half Life Administrator.

## Suite du 20 novembre — lot C publié après le lot B

La bible Markdown passe en **version 1.3**. Le [chapitre Aperture](chapters/aperture_combat_design_20261120.md) développe trois kits et 69 actions proposées, douze routes, les parcours narratifs, une rencontre Rocket Turret en trois phases et deux plans d’arènes. Ces spécifications enrichissent huit cibles existantes et restent à implémenter.

Le [lot C et sa galerie](production/continuation_20261120_c/README.md) ajoutent **sept PNG pour cinq cibles** : Chell Portal 1, tenue Chell Portal 2, noyau de Grady, Rocket Turret (v1 et v2) et chaîne de fabrication Portal 2 (maître et sol séparé). Wheatley, ATLAS et P-body ont été refusés par le service et restent sans fichier.

L’état courant vérifié est de **19 PNG distincts**, **30 demandes**, **11 refus**, **187 cibles**, dont **13 avec un fichier associé et 174 sans fichier**. Les contours, poses latérales, animations, autres couches et validations de fidélité restent à terminer. Les exports Word/Excel v1 demeurent historiques ; le Markdown/JSON courant fait foi.

<!-- CURRENT_CONTINUATION_20261120_B -->
## Lot B — état historique avant le lot C

La bible Markdown passe en **version 1.2** avec [102 cibles supplémentaires](chapters/catalogue_extension_20261120.md): personnages, petites machines, costumes, stages, rencontres et archives séparées. Cette extension est documentaire; elle n’ajoute pas 102 combattants jouables.

**Douze PNG sont réellement présents**, dont six nouveaux fichiers couvrant Colette, G-Man, Apache HECU, Abrams et White Forest (v1 plus correction v2). [La galerie et le rapport du lot](production/continuation_20261120_b/README.md) décrivent les limites, les cinq nouveaux refus et les prompts. Tous restent candidats, sans certification 1:1 ni animation complète.

La [file consolidée des manquants](production/MISSING_TARGETS.md) et son [JSON](data/production_queue.json) relient les catalogues aux images présentes. Le [rapport d’audit](production/asset_audit.md) vérifie chemins, dimensions, tailles et SHA256. Les 68 PNG et 229 cibles évoqués dans une reprise antérieure n’ont pas été retrouvés; ils ne sont pas présentés comme livrés. [Détail de récupération](production/continuation_20261120_b/RECOVERY_STATUS.md).

Les exports Word/Excel v1 ci-dessous restent des instantanés historiques. Les sources Markdown/JSON actuelles font foi.
<!-- END_CURRENT_CONTINUATION_20261120_B -->

## Boss Battle

Le menu principal ouvre désormais **Half Life Resonance · Boss Battle**, également accessible avec `?module=resonance-boss-battle`. Six profils pilotes affrontent quatre boss dans une simulation à 60 Hz : Strider, Dropship et sa nacelle, Gunship, Gargantua. Opération libre, Boss Rush de quatre rencontres et entraînement fonctionnent, avec trois difficultés, commandes clavier/tactiles, interactions d'arène, pause, résultats et records locaux séparés de la gestion.

Le [chapitre Boss Battle](BOSS_BATTLE.md), repris dans la bible complète, documente 24 rencontres et une archive Hydra désactivée. Les vingt rencontres supplémentaires, les chroniques narratives, le relais et la coopération restent à implémenter. Le rendu actuel utilise des silhouettes schématiques et deux panoramas candidats : aucune animation de boss ni fidélité 1:1 n'est déclarée achevée.

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
