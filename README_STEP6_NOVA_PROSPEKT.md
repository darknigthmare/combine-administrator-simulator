# Étape 6 — Module Nova Prospekt

Cette étape ajoute un vrai lieu de gestion séparé : **Nova Prospekt**.

L’objectif n’est pas d’ajouter un simple onglet, mais de simuler un basculement d’interface vers un complexe externe Combine : terminal de transferts, détention, interrogatoire, aile Biotics/Vortigaunts, laboratoire Transhuman Arm, confinement Xen et périmètre côtier.

## Fichiers ajoutés

```text
src/data/novaProspekt.ts
src/systems/novaProspektSystem.ts
README_STEP6_NOVA_PROSPEKT.md
```

## Fichiers modifiés

```text
src/types/game.ts
src/data/index.ts
src/App.tsx
src/index.css
```

## Ce que ça ajoute

- Nouvel onglet : **Nova Prospekt**.
- Changement visuel d’interface quand l’onglet Nova Prospekt est actif.
- État dédié `novaProspekt` dans le `GameState`.
- Zones internes du complexe :
  - Terminal Razor Train / Intake ;
  - Bloc de détention A ;
  - Interrogation / Memory Processing ;
  - Aile Biotics / Vortigaunts ;
  - Laboratoire Transhuman Arm ;
  - Confinement parasite Xen ;
  - Périmètre côtier / Batteries.
- Politiques de gestion :
  - traitement strict ;
  - disparitions silencieuses ;
  - réseau d’informateurs ;
  - pression sur les Biotics ;
  - masque sanitaire humanitaire ;
  - libérations clandestines filtrées.
- Opérations jouables :
  - traiter manifeste de transfert ;
  - interroger cellule Lambda ;
  - étendre coercition Biotics ;
  - préparer candidats Transhuman Arm ;
  - lockdown spécimens Xen ;
  - balayage périmètre côtier ;
  - nettoyer récit public ;
  - relâcher civils sous fausses archives.
- Dossiers sensibles : technicien Lambda, Vortigaunt captif, défecteur Civil Protection, saboteur Razor Train, porteur parasitaire, témoin civil.
- Traitement journalier automatique : chaque fin de journée Nova Prospekt reçoit des transferts, génère du renseignement, augmente ou réduit la peur, la loyauté, la suspicion, le risque Xen et le risque d’incident.

## Logique gameplay

Nova Prospekt impacte directement City :

- Plus de transferts = peur plus forte, loyauté plus basse.
- Interrogatoires = baisse rebelle possible, mais coût moral et suspicion.
- Aile Biotics = aide contre Xen, mais risque d’évasion ou de rupture.
- Transhuman Arm = candidats Overwatch, mais perte d’humanité et radicalisation.
- Libérations clandestines = meilleure loyauté et fin secrète possible, mais suspicion massive.
- Secret bas = les familles de City commencent à comprendre les disparitions.
- Instabilité haute = émeute, contradiction d’archives, fuite, rupture de confinement.

## Validation

Les modules TypeScript non-React (`src/types`, `src/data`, `src/systems`) ont été vérifiés avec `tsc` en compilation isolée.

## Application

Copie le contenu du dossier dans ton repo :

```bash
cp -r combine-lore-upgrade/src/* ./src/
cp combine-lore-upgrade/README_STEP6_NOVA_PROSPEKT.md ./
npm run dev
```

Puis commit :

```bash
git add src README_STEP6_NOVA_PROSPEKT.md
git commit -m "Add Nova Prospekt facility management module"
git push
```
