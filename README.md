# Combine Civil Authority — City Strategic & Narrative Simulator

Bienvenue dans l'interface de contrôle et de stabilisation urbaine de **City {{CITY_NUMBER}}** (l'Union Universelle / Le Cartel). 

Ce simulateur fan-made met le joueur dans le rôle de l'**Administrateur civil** nommé par la Citadel sous supervision directe des Advisors Combine et du Dr. Wallace Breen. Votre objectif principal est de maintenir l'ordre et la productivité industrielle face à l'insurrection de la Résistance Lambda et à la propagation de la biosphère Xen.

---

## 🚀 Installation et Lancement

### Prérequis
- [Node.js](https://nodejs.org/) (Version 18+ recommandée)
- npm (livré avec Node.js)

### Lancement
1. Installez les dépendances du projet :
   ```bash
   npm install
   ```
2. Lancez le serveur de développement local :
   ```bash
   npm run dev
   ```
3. Ouvrez votre navigateur sur l'adresse indiquée par Vite (généralement `http://localhost:5173`).

---

## 📂 Structure du Projet

L'application est structurée de manière claire et modulaire dans `src/` :

- **`types/`** : Contient les définitions TypeScript du jeu.
  - `game.ts` : Types pour l'état, les statistiques et les rapports journaliers.
  - `lore.ts` : Types liés aux unités Combine, entités Xen, profils de départ.
  - `events.ts` : Types pour le moteur de choix d'événements et directives.
- **`store/`** :
  - `gameStore.ts` : Zustand store centralisant l'état réactif et les actions.
- **`data/`** : Les bases de données statiques d'initialisation du jeu.
  - `citySectors.ts` : Définitions et graphe d'interconnexion des 18 secteurs.
  - `combineUnits.ts` : Paramètres des 15 unités Combine.
  - `xenEntities.ts` : Propriétés des 19 menaces écologiques de Xen.
  - `directives.ts` : Directives de quotas imposées par la Citadel.
  - `rebelEvents.ts` / `xenEvents.ts` / `citizenEvents.ts` / `combineEvents.ts` / `advisorEvents.ts` / `moralCrises.ts` : Événements narratifs avec choix.
  - `propagandaMessages.ts` : Les 50 messages de propagande Breencast.
  - `endings.ts` : Textes et conditions pour les 15 fins différentes.
- **`systems/`** : Moteurs logiques.
  - `gameLoop.ts` : Moteur de simulation de tour par tour (déclenché par la fin de journée).
  - `seededRandom.ts` : Générateur de nombres pseudo-aléatoires déterministe par graine.
- **`components/`** : Interface utilisateur React stylée sous Tailwind CSS.
  - `layout/` : AppShell (scanlines), Sidebar, TopStatusBar, AlertFeed.
  - `dashboard/` : Console administrative, CityStatsPanel, DirectivePanel, StabilityGraph (Recharts).
  - `city/` : CityMap (grille de surveillance interactive), SectorDetailsModal.
  - `combine/` : Roster des troupes et protocoles de forces.
  - `citizens/` : Rationnement, Breencast, et message generator.
  - `narrative/` : Modals d'événements à choix et écran de fin.

---

## 🎮 Règles du Jeu et Équilibrage

Chaque tour de jeu représente **1 journée administrative**. Lorsque vous cliquez sur **"Clôturer la journée administrative"** :
1. Les ressources (rations) sont consommées par la population et le personnel.
2. Les usines produisent des rations et du matériel basés sur la **production industrielle**.
3. La sédition **Lambda** se propage dans les secteurs peu surveillés.
4. Les parasites **Xen** infestent les secteurs et se propagent à leurs voisins, à moins qu'un confinement (quarantaine/scellement) ne soit actif.
5. L'**Overwatch** applique la surveillance pour réduire les risques locaux.
6. La Citadel évalue la **directive** en vigueur (temps limité).
7. Un événement narratif aléatoire ou une crise morale survient, vous obligeant à prendre des décisions à coût moral ou matériel élevé.
8. Les conditions pour l'une des **15 fins** sont évaluées.

### Conseils d'équilibrage
- **Peur vs Loyauté** : Une peur élevée calme la sédition à court terme mais fatigue les civils et diminue la productivité. Une loyauté élevée pacifie la population mais est très difficile à maintenir sous rationnement sévère.
- **Rations** : Si vos rations tombent à zéro, la famine se déclare, la fatigue grimpe de +15%/jour et la sédition Lambda s'enflamme.
- **Quarantaine vs Scellement** : Sceller un secteur arrête net la rébellion et Xen, mais condamne 90% de sa population et réduit la stabilité générale. La quarantaine contient Xen temporairement mais fatigue les citoyens voisins.

---

## 🛠️ Guide du Développeur (Comment étendre le projet)

### 1. Changer ou personnaliser le numéro de la Cité
L'utilisateur peut saisir le numéro de son choix sur l'écran d'accueil lors du démarrage de sa session. Les rapports d'archives (`preWrittenReports.ts`) et les fins de jeu adapteront automatiquement le numéro dans leurs textes grâce à un traitement par template dynamique.

### 2. Ajouter des Événements Narratifs
Pour insérer un nouvel événement dans le jeu, ouvrez le fichier correspondant dans `src/data/` (ex. `rebelEvents.ts`) et ajoutez une entrée respectant la structure `GameEvent` :
```typescript
{
  id: 'reb_my_custom_event',
  title: 'Titre de l\'Événement',
  type: 'Rebel',
  severity: 2,
  description: 'Description de la situation survenue...',
  choices: [
    {
      id: 'opt_1',
      label: 'Choix A',
      description: 'Effets...',
      effects: { stability: 5, rations: -50 } // Modificateurs de statistiques globales
    },
    {
      id: 'opt_2',
      label: 'Choix B',
      description: 'Effets secondaires...',
      effects: { fear: 10, rebelActivity: 15 }
    }
  ],
  loreTags: ['Tag1', 'Tag2'],
  repeatable: true
}
```

### 3. Ajouter des Unités Combine
Ouvrez `src/data/combineUnits.ts` et insérez une unité dans le tableau. Exemple :
```typescript
{
  id: 'combine_synth_crab',
  name: 'Crab Synth (Synthé)',
  role: 'Assaut lourd blindé de première ligne',
  description: 'Unité biologique mécanisée géante capable de détruire les barricades.',
  cost: 55,
  power: 80,
  surveillanceBoost: 2,
  fearFactor: 20,
  loyaltyImpact: -8,
  collateralRisk: 8,
  category: 'heavy'
}
```

### 4. Ajuster l'Équilibrage
La boucle de simulation principale réside dans `src/systems/gameLoop.ts`. Vous pouvez y modifier :
- Le coût d'entretien en rations par habitant (`rationsConsumed`).
- Le rendement de production des rations par usine (`rationsProduced`).
- La formule de calcul de la **stabilité globale** (`stabilityCalc`).
- Les coefficients de propagation de Xen ou de l'activité Lambda.

### 5. Exporter les rapports journaliers
Les rapports de fin de journée peuvent être exportés directement depuis l'onglet **"Directives & Archives"** à l'aide des boutons de téléchargement :
- **Bouton JSON** : Produit un fichier `.json` structuré contenant l'état brut de toutes les variables.
- **Bouton TEXTE** : Génère un fichier `.txt` formaté et mis en page simulant un vrai télex administratif Combine chiffré, idéal pour le jeu de rôle fan-made.
