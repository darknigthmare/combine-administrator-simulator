# Step 5 — Rapports falsifiables / mensonge administratif

Cette étape ajoute un système de rapports administratifs à double niveau :

1. **Dossier réel COAN** : les données internes exactes de City.
2. **Transmission Citadel** : le rapport que l’Administrateur choisit d’envoyer à la Citadelle.

Le but est de rendre l’application plus fidèle à l’ambiance Half-Life : bureaucratie froide, mensonges d’occupation, chiffres nettoyés, pression Advisor et risque de remplacement.

## Fichiers ajoutés

```text
src/systems/reportFalsification.ts
README_STEP5_FALSIFIABLE_REPORTS.md
```

## Fichiers modifiés

```text
src/types/game.ts
src/App.tsx
src/index.css
```

## Politiques de transmission ajoutées

- Transmission exacte
- Minimiser activité anti-citoyenne
- Dissimuler contamination Xen
- Classer pertes civiles
- Gonfler rendement industriel
- Présenter City modèle
- Double rapport / couverture clandestine

Chaque politique modifie la transmission envoyée sans modifier le dossier réel COAN.

## Nouveaux risques simulés

- Score de falsification
- Risque audit Advisor
- Audit superficiel
- Falsification détectée
- Hausse de suspicion
- Perte d’autorité Citadel
- Remplacement administratif possible

## Effet gameplay

Un rapport nettoyé peut sauver l’Administrateur à court terme, mais augmente le risque d’inspection Advisor. Une ville officiellement stable peut cacher une réalité explosive : canaux Lambda, quarantaine Xen, pertes civiles classifiées, rations falsifiées.

## Application

Copier le contenu du pack dans le dépôt :

```bash
cp -r combine-lore-upgrade/src/* ./src/
cp combine-lore-upgrade/README_STEP5_FALSIFIABLE_REPORTS.md ./
npm run dev
```

Puis commit :

```bash
git add src README_STEP5_FALSIFIABLE_REPORTS.md
git commit -m "Add falsifiable Citadel reporting and Advisor audits"
git push
```
