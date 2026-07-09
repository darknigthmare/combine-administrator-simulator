# Step 9 — Écrans dédiés complets

Cette étape transforme les onglets génériques en vrais modules de gestion spécialisés.

## Nouveaux modules visuels

- `Civil Protection` : maintien de l’ordre, corruption, brutalité, raids, scanners, manhacks.
- `Overwatch Command` : escalade militaire, synths, airwatch, Striders/Hunters et validation Advisor.
- `Citadel Directives` : suivi précis de directive, pression Advisor et audit administratif.
- `Quarantaine Xen` : confinement biologique, secteurs contaminés, scellement et purge.
- `Rationnement` : économie des rations, faim, marché noir, radicalisation.
- `Archives` : rapports, logs COAN, catalogue d’événements et historique.

## Fichiers ajoutés

- `src/components/DedicatedScreens.tsx`
- `README_STEP9_DEDICATED_SCREENS.md`

## Fichiers modifiés

- `src/App.tsx`
- `src/types/game.ts`
- `src/index.css`

## Objectif

L’application ne donne plus l’impression d’avoir seulement des onglets de données : chaque domaine a maintenant son propre écran de commandement, avec son vocabulaire, ses métriques et ses actions.

Cette étape prépare la suivante : couche sonore/visuelle, alertes terminal, effets glitch Xen, tonalités de crise et feedback UI plus fort.
