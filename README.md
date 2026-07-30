# Combine Administrator Simulator

Jeu de gestion stratégique non officiel dans lequel le joueur administre une City occupée par le Combine. Chaque journée demande de répartir un quota d'ordres, contenir Lambda et Xen, maintenir les rations et la production, puis répondre aux exigences de la Citadelle.

[Jouer à la version web](https://combine-administrator-simulator.vercel.app/)

## Expérience de jeu

- Création de campagne hors-session avec portrait, doctrine, scénario, chronologie, profil et difficulté.
- Prologue de mandat puis tutoriel jouable pour présenter la boucle du premier jour.
- 7 campagnes, 6 doctrines de départ et 6 profils de difficulté.
- Progression par réquisitions : Xen, Nova Prospekt, OTA, Advisor, Razor Train et Synths ne sont pas tous accessibles au départ.
- Événements illustrés, décisions à conséquences, directives Citadel et transition de nouvelle journée.
- Campagnes de 18 à 50 jours, chronique finale et 12 verdicts documentés.
- Sauvegardes locales, export/import, Codex lore et paramètres d'accessibilité disponibles avant la campagne.
- Musique originale adaptative et effets synthétiques sans audio propriétaire de Half-Life.

## Installation

Prérequis : Node.js 22 et npm.

```bash
npm ci
npm run dev
```

Le serveur Vite indique l'adresse locale à ouvrir.

## Validation

```bash
npm run quality
npm run test:e2e
npm run audit:all
```

`npm run quality` exécute le lint, les tests unitaires, la matrice pré-release et le build de production. La matrice couvre 252 combinaisons doctrine × campagne × difficulté, les 12 verdicts et les fenêtres de simulation longue.

Les parcours Playwright couvrent la création de campagne, le prologue, l'entrée dans le tutoriel et la transition vers le jour 002 sur desktop et mobile. GitHub Actions relance ces contrôles à chaque mise à jour de `master`.

## Application Windows

Le shell desktop utilise Tauri 2.

```bash
npm run tauri:qa
npm run package:windows
```

Les installateurs NSIS/MSI et l'exécutable direct sont générés sous `src-tauri/target/release/`.

## Technologies

React, TypeScript, Vite, Tauri, Recharts, Zustand, Lucide, Vitest et Playwright.

## Crédits et statut

Conception et développement : `darknigthmare`.

Les visuels originaux ont été générés avec OpenAI puis intégrés pour cette application. La musique et les effets sont des créations originales synthétisées localement.

Half-Life, City 17, Combine et les éléments associés appartiennent à Valve Corporation. Ce fangame non commercial et non officiel n'est ni affilié, ni approuvé par Valve. Aucun asset audio propriétaire de Half-Life n'est distribué avec le projet.
