# Étape 7 — BreenCast dynamique

Cette étape remplace la propagande fixe par un système réactif : le BreenCast lit l’état réel de City et produit un message adapté à la crise dominante.

## Fichiers ajoutés

```text
src/data/breencast.ts
src/systems/dynamicBreencast.ts
README_STEP7_DYNAMIC_BREENCAST.md
```

## Fichiers modifiés

```text
src/types/game.ts
src/data/index.ts
src/App.tsx
src/index.css
```

## Ce que le système regarde

- activité rebelle / réseau Lambda ;
- contamination Xen ;
- rations et production ;
- pertes civiles ;
- pression d’audit Advisor ;
- suspicion Citadel ;
- état de Nova Prospekt ;
- transferts Razor Train ;
- instabilité Biotics / Xen breach risk.

## Nouveaux concepts

### Message recommandé

Le système génère un BreenCast avec :

- catégorie de crise ;
- phrase publique ;
- intention cachée ;
- effets de gameplay ;
- gravité rhétorique ;
- tags lore.

### File de diffusion adaptative

L’onglet Propagande affiche maintenant plusieurs messages alternatifs : Résistance, Xen, rations, Nova Prospekt, audit, pertes civiles, productivité.

### Campagnes de doctrine

Les campagnes donnent des bonus/malus et peuvent provoquer un backlash si la population est trop fatiguée ou si la stratégie est trop risquée.

## Exemple

Si Xen monte, le message recommandé justifie quarantaine, sas scellés et équipes de confinement.

Si Nova Prospekt accumule trop de transferts, le système normalise les “réaffectations productives”.

Si l’audit Advisor chauffe, la propagande tente de présenter la surveillance de la Citadelle comme une protection.
