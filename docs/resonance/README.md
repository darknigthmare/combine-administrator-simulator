# Half Life Resonance

Bible et premier lot d'assets pour le mode annexe de combat 2D de Half Life Administrator.

## Contenu du lot

La conception couvre 24 combattants, 24 arènes, six kits pilotes, une histoire en douze chapitres, les parcours arcade avec intro, rival et ending, les modes de tournoi, l'entraînement, les fatalités optionnelles et la production des décors en parallaxe.

Le lot graphique contient six images réellement produites : une pose individuelle d'Élite du Cartel, deux panoramas maîtres, deux couches candidates dérivées de ces panoramas et un chargeur HEV candidat. Gordon, Alyx et le Vortigaunt ont été demandés mais leurs générations ont été refusées automatiquement. Ils ne sont pas comptés comme produits.

Les visuels sont rangés dans `assets/resonance/candidates`. Le manifeste conserve leur provenance, leurs dimensions, leurs consignes et leur état de validation. Aucun asset n'est certifié 1:1. Aucun clip animé complet ni arène complète à six couches n'est déclaré terminé. La couche de brume de Cité 17 et le chargeur HEV nécessitent une révision visible.

## Documents de lecture et de suivi

- [Bible Word de 62 pages](deliverables/Half_Life_Resonance_Bible_v1.docx).
- [Classeur Excel de production, sept onglets](deliverables/Half_Life_Resonance_Production_v1.xlsx).

Ces exports accompagnent les sources Markdown et JSON de ce lot. Le classeur distingue les entrées de conception, les groupes à produire et le journal des images réellement générées.

## Organisation

- `BIBLE.md` : bible intégrale en français.
- `chapters/` : chapitres séparés pour la revue éditoriale.
- `data/roster.json` : combattants, techniques, scènes et parcours.
- `data/stages.json` : arènes et spécifications des six couches.
- `data/combat_rules.json` : paramètres initiaux du système à 60 Hz.
- `data/frame_data_pilote.json` : données initiales des normales et projections des six pilotes.
- `data/asset_backlog.json` et `asset_backlog.csv` : groupes de production.
- `data/animation_inventory.json` et `animation_budget.json` : séquences et dessins cibles.
- `data/generated_art_register.json` : journal des neuf demandes et des six résultats.
- `data/existing_visual_inventory.json` : visuels présents dans la base auditée.
- `technical/resonance_contracts.ts` : contrats proposés et vérifications partielles.

Les fichiers de conception ne sont pas automatiquement importés par le jeu de gestion. Le futur module proposé est `src/features/resonance`. Les contrats documentent la séparation des sauvegardes, de la simulation de combat et de la progression de gestion. Le mode décrit par cette bible n'est pas encore jouable.

## Validation du lot

Depuis la racine du dépôt :

```bash
node scripts/validate-resonance-design.mjs
```

Ce contrôle porte sur les catalogues, identifiants, coûts, comptes de production, références d'assets et cohérence mathématique de la frame data. Il ne mesure ni performances de jeu ni gameplay réseau. Les visuels ont également fait l'objet d'une inspection et d'un contrôle de format et de transparence.

## Base de référence

Conception initiée le 19 novembre 2026 depuis `master` au commit `63652852f030f6d76d5893845e326a60100d3c58`, package `0.47.0`. L'inventaire public de cette base contient 67 images statiques et ne révèle aucun module de combat 2D existant.

Half-Life et les personnages associés appartiennent à leurs ayants droit. Les règles de combat, récits, rivalités et conclusions proposés ici sont des adaptations originales pour ce projet de fan non officiel.
