# STEP 27 — Objectifs multiples par scénario

Cette étape transforme les campagnes longues en véritables missions administratives multi-objectifs.

## Ajouts

- `src/data/campaignObjectives.ts`
  - Définit les objectifs principaux, secondaires, cachés et conditions d'échec par campagne.
  - Ajoute des récompenses, sanctions, tags lore, deadlines et conditions de révélation.

- `src/systems/campaignObjectiveSystem.ts`
  - Évalue les objectifs chaque journée.
  - Calcule progression, statut, score de mandat et risque d'échec.
  - Applique les récompenses/sanctions une seule fois au moment où un objectif change d'état.
  - Révèle les objectifs cachés selon le contexte réel de City.

## Modifications

- `src/types/game.ts`
  - Ajout des types `CampaignMissionState`, `CampaignMissionObjectiveDefinition`, `CampaignMissionMetric`, etc.
  - Ajout de `campaignMission` dans `GameState`.

- `src/App.tsx`
  - Initialisation du nouveau système d'objectifs.
  - Migration automatique des anciennes sauvegardes.
  - Évaluation quotidienne après la simulation de campagne.
  - Ajout de stats globales : mandat objectif et risque objectif.

- `src/components/DedicatedScreens.tsx`
  - L'écran Campagnes affiche maintenant :
    - objectifs principaux ;
    - objectifs secondaires ;
    - objectifs cachés révélés ;
    - conditions d'échec ;
    - score de mandat ;
    - risque d'échec ;
    - journal spécifique des objectifs.

- `src/index.css`
  - Styles pour les dossiers objectifs : primary, secondary, hidden, failure, completed, failed, expired.

## Métriques avancées ajoutées

Les objectifs peuvent maintenant suivre des métriques globales ou systémiques :

- stabilité, loyauté, peur, rébellion, Xen, Citadel, production, rations ;
- jours de survie ;
- intégrité sectorielle stratégique ;
- suppression Lambda ;
- confinement Xen ;
- obéissance Citadel ;
- survie population ;
- production industrielle ;
- secret Nova Prospekt ;
- contrôle de quarantaine ;
- contrôle de la faim ;
- contrôle du marché noir ;
- intégrité informateurs ;
- intégrité Civil Protection ;
- maturité technologique Combine ;
- contrôle Vortigaunt/Biotics ;
- sécurité recherche Xen ;
- prévention catastrophes Xen ;
- contrôle du registre civil ;
- pression de campagne ;
- contrôle d'audit ;
- réserve de rations ;
- conformité population ;
- disruption du réseau Lambda ;
- fragmentation de la Résistance.

## Campagnes couvertes

Chaque campagne possède désormais ses propres objectifs :

- Administration libre de City ;
- City 17 — Pré-Half-Life 2 ;
- City portuaire contaminée ;
- City industrielle modèle ;
- Après Nova Prospekt ;
- City en Uprising ;
- City isolée après chute Citadel.

## Exemple de fonctionnement

Un objectif principal peut demander de garder la stabilité au-dessus de 72 jusqu'au jour 45.
Un objectif secondaire peut demander de tenir le marché noir sous contrôle.
Un objectif caché peut se révéler seulement si la loyauté devient assez haute ou si la Citadel baisse trop.
Une condition d'échec peut se déclencher si la rébellion atteint un seuil critique.

Quand un objectif est réussi ou compromis, le système applique :

- une ligne de rapport COAN ;
- un ajustement de stats ;
- un bonus/malus de score de mandat ;
- une entrée dans le journal campagne.

## Application

Depuis la racine de ton repo :

```bash
cp -r combine-lore-upgrade/src/* ./src/
cp combine-lore-upgrade/README_STEP27_CAMPAIGN_OBJECTIVES.md ./
npm run dev
```

Puis :

```bash
git add src README_STEP27_CAMPAIGN_OBJECTIVES.md
git commit -m "Add multi-objective campaign mission system"
git push
```
