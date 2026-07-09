# STEP 18 — Résistance Lambda avancée

Cette passe transforme l’onglet `Résistance` en vrai système de réseau Lambda.

## Ajouts

```text
src/data/resistanceNetwork.ts
src/systems/resistanceNetwork.ts
README_STEP18_ADVANCED_RESISTANCE.md
```

## Modifications

```text
src/types/game.ts
src/data/index.ts
src/App.tsx
src/components/DedicatedScreens.tsx
src/index.css
```

## Fonctionnalités

- cellules Lambda nommées ;
- chefs de cellule / alias ;
- stades : dormante, active, armée, coordonnée, soulèvement ouvert ;
- routes canaux, égouts, service, rail, clinique, Vortessence ;
- caches d’armes, radios pirates, safehouses, labos clandestins ;
- support Vortigaunt ;
- opérations simultanées ;
- fausses pistes et infiltration ;
- doctrines anti-Lambda ;
- actions ciblées : cartographie safehouse, raid cache d’armes, scellement route, brouillage radio, coursier retourné, infiltration labo, marché Vortigaunt, fausse fuite, leurre Overwatch.

## Effets gameplay

La jauge rebelle n’est plus isolée : elle dépend maintenant de la cohésion Lambda, du réseau radio, des routes, des armes, du moral et des secteurs. Les cellules peuvent évoluer jusqu’à un soulèvement ouvert si le joueur laisse se connecter les safehouses, radios et canaux.
