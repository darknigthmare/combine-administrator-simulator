# Intégration du guide commun — Half-Life / Portal

Bible **1.11**, 27 novembre 2026. Les [trois originaux](../guides/README.md) sont présents, préservés octet pour octet et accompagnés d’une [matrice des 68 sections](../guides/COVERAGE_68.md). Les [données de conception](../data/combat_extensions_20261127.json) relient toutes les nouvelles fiches aux identifiants existants, sans créer de combattant ni modifier le registre graphique.

## Point de reprise vérifiable

Le checkpoint effectivement disponible est le lot L : **286 PNG distincts, 259 cibles, 241 cibles avec au moins un PNG et 18 sans PNG**. Ce chapitre ajoute **zéro PNG et zéro animation complète**. Le [lot N mené en parallèle](../production/continuation_20261127_n/README.md) possède son propre bilan de sept PNG ; ses poses ne sont pas comptées comme des clips animés ni comme des assets issus de cette intégration documentaire. La version 1.10 / le lot M sont mentionnés dans l’historique de conversation mais leur livraison n’a pas été retrouvée dans la base reprise. Le numéro 1.11 identifie cette intégration sans réutiliser 1.10 et sans reconstituer artificiellement M.

Le Boss Battle existant fournit six profils, quatre rencontres et les modes `single`, `rush`, `training`. Ses profils simplifiés n’équivalent pas aux 24 kits de duel conçus. Les tableaux d’histoire, les scènes collectives et les futurs modes ne deviennent pas jouables parce qu’une fiche ou un JSON existe. Les exports Word/Excel v1 restent historiques.

## Décisions de périmètre

Le guide général et les deux extensions sont retenus comme contrats de conception. La première extension ajoute explicitement la personnalité, le cycle de sélection, les équipes, les clashes, les entités et les activités bonus. La seconde définit découverte, droits d’accès, disponibilité technique et compatibilité avec la partie. La réalisation immédiate du lot adjacent se limite au **modèle d’accès et aux quatre dossiers de terrain du Boss Battle** ; l’espace exploratoire, les verrous de roster, le tag, les supers et les services externes restent conçus ou différés.

Les réglages de cadence, jauges, coûts et dégâts sont des hypothèses du projet. Le module `combat_rules.json` garde son contrat de duel et ses exceptions Boss Battle. L’extension ne remplace pas implicitement le relais historique à trois ni les commandes du prototype. Toute nouvelle règle sera activée par un profil explicite après implémentation et tests.

## Fidélité et continuités

La cible 1:1 porte sur les identités et leurs versions, les proportions, matières, équipements, capacités et personnalités. Elle ne désigne pas le ratio d’une image. La présence d’un sprite ne constitue pas une certification. Les vues opposées, pivots, frames, collisions, sources et comportements doivent passer leurs contrôles séparés.

Les faits attestés sont attribués aux sources ci-dessous. Les coups chiffrés, gestes d’interface, supers, dialogues éventuels et fins créés ici sont des adaptations de Resonance. Le duo Gordon/Alyx se rapporte aux versions HL2. Gina/Colette se rapportent à Decay PS2. ATLAS/P-body se rapportent à Portal 2 coop et restent en conception : leurs refus de génération historiques sont conservés. Aucun costume d’un autre épisode n’est substitué silencieusement à la version voulue.

Les archives gardent leurs contrats de référence existants : jeu commercialisé, prototype, modèle abandonné et concept restent distincts. Aucun récit ni modèle final supposé « Half-Life 3 » n’est ajouté comme canon. Le Terminal des traces est une **métaphore d’interface originale**, pas une salle officielle qui relierait physiquement Black Mesa, Cité 17 et Aperture.

## Fiches produites dans cette reprise documentaire

| Famille | Fiches conçues | État |
| --- | --- | --- |
| Taunts | 6 | Conçu, non implémenté |
| Cycles de sélection | 6 | Conçu, non implémenté |
| Duos / profils d’équipe | 3 | Conçu, non implémenté |
| Assistances | 6 | Conçu, non implémenté |
| Supers, finishers et fins dramatiques | 9 | Conçu, non implémenté |
| Clashes, dont une famille différée | 3 | Conçu, non implémenté |
| Entités et objets | 4 | Conçu, non implémenté |
| Bonus | 5 | Conçu, non implémenté |
| Espace exploratoire | 1 | Conçu, non implémenté |
| Slots et politiques des modes | 13 | Conçu, non implémenté |
| Règles futures de déblocage | 6 | Conçu, non implémenté |
| Politique de soutien différée | 1 | Conçu, non implémenté |

Soit **63 fiches de production**, plus **26 scénarios d’acceptation** et **quatre correspondances de dossiers de terrain** vers le module runtime. Le hub possède quatre espaces et trois connexions bidirectionnelles de navigation ; ils ne sont pas des stages ajoutés au catalogue. Les 68 lignes de couverture constituent une mesure documentaire distincte.

## Ordre de réalisation et critères d’acceptation

1. Conserver sources, identifiants et états réels ; vérifier le lot de dossiers de terrain et sa sauvegarde.
2. Produire un cycle complet de sélection et un taunt sur un pilote, avec deux orientations contrôlées.
3. Implémenter l’autorité d’équipe, la jauge, une assistance et un tag ; tester concurrence, coûts, KO et conservation du combo.
4. Ajouter un objet autonome et les états de réserve/KO/transition, puis une super avec confirmation de touche.
5. Réaliser une fin conditionnelle, un clash physique et leur solution de remplacement ; aucune scène ne réécrit une victoire acquise.
6. Réaliser un bonus puis une collection consultable avec attribution unique avant l’animation de révélation.
7. Étendre par personnage et par version seulement après validation. Réseau et service de soutien nécessitent leurs propres preuves avant activation.

Les scripts documentaires contrôlent structure et intégrité. Les tests du moteur contrôlent les états simulés. La revue de rendu et l’inspection humaine des références contrôlent autre chose : elles restent nécessaires pour déclarer un asset fidèle ou une interaction agréable et lisible. Aucun de ces contrôles ne remplace les autres.

## Sources et limites

| ID | Source | Portée contrôlée |
| --- | --- | --- |
| GE-S01 | [Valve — Half-Life 2](https://www.half-life.com/en/halflife2) | Gordon et Alyx associés à la résistance au Cartel; ne prouve aucun taunt ni super de Resonance. |
| GE-S02 | [Sierra / Gearbox / Valve — Half-Life PlayStation 2, manuel officiel archivé](https://valvearchive.com/Games/Half-Life%20%28PlayStation%202%29/Documents/Manual.pdf) | Texte indexé consulté, page imprimée 26 : Gina et Colette, coopération, changement de contrôle en solo, échec si une meurt. Page 29 : identités. Le fichier PDF direct a répondu 403; aucune certification des pixels de modèles. |
| GE-S03 | [Valve — Portal 2, présentation officielle](https://www.thinkwithportals.com/about.php) | Univers Aperture, dispositif à portails, réflexion et coopération; aucune arme létale déduite du rayon de placement. |
| GE-S04 | [Contrats Aperture déjà documentés dans Resonance](../../../docs/resonance/data/aperture_combat_design_20261120.json) | Kits et sockets proposés, identités ATLAS/P-body, séparation des versions et des portails; règles de duel non canoniques. |
| GE-S05 | [Kits, versions et récits existants du roster](../../../docs/resonance/data/roster.json) | Identifiants et actions de conception; scènes originales de Resonance, pas des scènes attestées dans les jeux. |
| GE-S06 | [Valve Half-Life SDK — satchel.cpp à révision fixe](https://github.com/ValveSoftware/halflife/blob/b1b5cf5892918535619b2937bb927e46cb097ba1/dlls/satchel.cpp) | Charge physique et déclenchement séparé; ni visuel 1:1 ni paramètres 2D certifiés. |
| GE-S07 | [Catalogue d’extensions — identifiants, versions et état de production](../../../docs/resonance/data/catalogue_extension_20261120.json) | ATLAS/P-body : refus historiques et absence de PNG. Costumes Chell Portal 2 / Colette Head-to-Head et stages référencés : identifiants et version de catalogue vérifiés. Aucun dessin ni costume n’est certifié 1:1 par ce relevé. |
| GE-S08 | [Archives et versions abandonnées](../../../docs/resonance/data/archive_reference_contracts_20261120.json) | Versions et preuves propres aux archives; aucune invention estampillée Half-Life 3 ni apparence finale déduite des prototypes. |
| GE-S09 | [Boss Battle — catalogue, contrats et résultats existants](../../../src/features/resonance/bossBattle/catalog.ts) | Six profils mécaniques, quatre rencontres et trois modes distincts des kits de duel; dossiers de terrain liés aux identifiants existants. |


Les trois guides sont des sources de spécification de l’utilisateur. Leurs références d’autres jeux expliquent des inspirations ; elles ne prouvent aucun pouvoir, geste ou événement canonique de Half-Life/Portal. La lecture textuelle du manuel PS2 vérifie les relations indiquées, sans certifier les pixels des modèles ni contourner son accès direct indisponible.

## Navigation

- [Extension 01 — personnalité, équipes, entités et bonus](guide_extension_01_20261127.md).
- [Extension 02 — accès, progression et collections](guide_extension_02_20261127.md).
- [Matrice complète des 68 sections](../guides/COVERAGE_68.md).
- [Contrat JSON des extensions](../data/combat_extensions_20261127.json).
