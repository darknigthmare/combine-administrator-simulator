# STEP 40 — Audit final TypeScript / nettoyage architecture COAN

Cette passe ferme le cycle V1→V4 du simulateur **Combine Administrator**.
Elle ajoute une couche d’audit finale dans l’application et des scripts de contrôle pour vérifier que le pack cumulatif est cohérent avant intégration dans le dépôt complet.

## Ajouts

```text
src/data/systemAudit.ts
src/systems/systemAuditSystem.ts
src/components/SystemAuditScreen.tsx
scripts/audit-upgrade-pack.mjs
COAN_FINAL_AUDIT_REPORT.md
README_STEP40_FINAL_AUDIT_CLEANUP.md
```

## Modifications

```text
src/types/game.ts
src/data/index.ts
src/data/terminalInterfaces.ts
src/App.tsx
src/index.css
package.tauri.patch.json
```

## Nouvel onglet

```text
Audit final
```

L’onglet vérifie et expose :

- architecture data/systems/components ;
- carte connectée ;
- propagation Lambda/Xen ;
- rapports falsifiables ;
- Nova Prospekt ;
- timelines ;
- rations et population ;
- Civil Protection / informateurs ;
- directives et technologies Citadel ;
- Résistance Lambda avancée ;
- biosphère Xen ;
- campagnes, objectifs, verdicts et chronique ;
- terminaux spécialisés ;
- audio/vidéo ;
- sauvegardes et historique ;
- codex/difficulté ;
- scaffold Tauri.

## Script d’audit

Depuis le repo complet après avoir appliqué le pack :

```bash
node scripts/audit-upgrade-pack.mjs
```

ou, après patch du `package.json` :

```bash
npm run audit:coan
```

Le script vérifie :

- fichiers sentinelles ;
- présence des README STEP1 à STEP40 ;
- câblage de l’onglet `system_audit` ;
- export des données d’audit ;
- présence du scaffold Tauri.

## Validation effectuée sur le pack

```bash
tsc -p tsconfig.modules.json --noEmit
node scripts/audit-upgrade-pack.mjs
```

Résultat attendu : `requiredFiles`, `readmeCoverage`, `systemAuditTabWired`, `systemAuditDataExported` et `tauriScaffoldPresent` à `true`.

## Intégration

```bash
cp -r combine-lore-upgrade/src/* ./src/
cp -r combine-lore-upgrade/src-tauri ./src-tauri
cp -r combine-lore-upgrade/scripts ./scripts
cp combine-lore-upgrade/package.tauri.patch.json ./
cp combine-lore-upgrade/README_STEP40_FINAL_AUDIT_CLEANUP.md ./
cp combine-lore-upgrade/COAN_FINAL_AUDIT_REPORT.md ./
node scripts/apply-tauri-package-patch.mjs
npm install
npm run audit:coan
npm run dev
```

Pour desktop :

```bash
npm run tauri:build
```

## Note importante

Le ZIP est cumulatif pour le pack upgrade `combine-lore-upgrade`, mais il ne remplace pas un clone complet du dépôt original. Il faut l’appliquer par-dessus le repo existant afin de conserver `package.json`, `public`, assets éventuels et configuration originale.
