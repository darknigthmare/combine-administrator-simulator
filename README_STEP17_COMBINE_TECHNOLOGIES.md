# Step 17 — Technologies Combine

Cette étape ajoute une vraie couche de progression technologique Combine à l’application.

## Ajouts

- `src/data/combineTechnologies.ts`
- `src/systems/combineTechnologySystem.ts`
- nouvel onglet `Technologies Combine`
- nouvel état `combineTechnology` dans `GameState`

## Branches technologiques

- Surveillance urbaine
- Confinement énergétique
- Overwatch protocols
- Airwatch / Synth grid
- Réseau BreenCast
- Nova Prospekt link
- Biocontrôle Xen
- Infrastructure Citadel

Chaque branche contient 4 protocoles progressifs, soit 32 technologies.

## Effets gameplay

Les technologies peuvent :

- débloquer des capacités administratives ;
- renforcer scanners, Overwatch, Airwatch ou Nova Prospekt ;
- ajouter des réserves d’unités ;
- améliorer confinement Xen ;
- réduire l’activité Lambda ;
- augmenter production/rations ;
- augmenter la suspicion Advisor ;
- créer une dette de maintenance technologique.

## Boucle quotidienne

À chaque fin de journée :

- le budget R&D augmente selon production et Citadelle ;
- les technologies actives appliquent leurs effets quotidiens ;
- la dette de maintenance peut réduire la production ;
- la suspicion techno-administrative peut attirer les Advisors.

## Installation

Copier le dossier `src` dans le repo :

```bash
cp -r combine-lore-upgrade/src/* ./src/
cp combine-lore-upgrade/README_STEP17_COMBINE_TECHNOLOGIES.md ./
npm run dev
```

## Commit conseillé

```bash
git add src README_STEP17_COMBINE_TECHNOLOGIES.md
git commit -m "Add Combine technology progression system"
git push
```
