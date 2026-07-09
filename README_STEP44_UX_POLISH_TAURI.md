# Étape 44 — Polish UX premium / finition Tauri

Cette passe ajoute une couche de finition interface pour rendre **Combine Administrator Simulator** plus lisible en partie longue et plus propre pour un build desktop Tauri.

## Fichiers ajoutés

```text
src/data/uxPolish.ts
src/systems/uxPolishSystem.ts
src/components/UxPolishScreen.tsx
scripts/coan-ux-polish-audit.mjs
README_STEP44_UX_POLISH_TAURI.md
```

## Fichiers modifiés

```text
src/App.tsx
src/index.css
src/types/game.ts
src/data/index.ts
src/data/terminalInterfaces.ts
src/data/systemAudit.ts
scripts/audit-upgrade-pack.mjs
package.tauri.patch.json
COAN_FINAL_AUDIT_REPORT.md
```

## Nouveau module

```text
Polish UX
```

Le module fournit :

- score UX global ;
- densité active : confort, compact, dense ;
- quick routes dynamiques selon crise ;
- audit de navigation ;
- audit de hiérarchie de crise ;
- audit de lisibilité logs/actions ;
- audit desktop/Tauri ;
- tooltips lore ;
- états vides pour éviter les écrans morts ;
- checklist polish avant build.

## Améliorations visibles

- bande **UX POLISH** sous la bannière terminal ;
- raccourcis dynamiques vers Xen, Lambda, Nova, Rapports, Rations, Citadel ;
- tooltips sur la navigation ;
- sidebar plus lisible en mode dense ;
- responsive desktop amélioré ;
- styles dédiés pour l’écran Polish UX ;
- audit scriptable via `npm run audit:ux`.

## Application

```bash
cp -r combine-lore-upgrade/src/* ./src/
cp -r combine-lore-upgrade/scripts ./scripts
cp combine-lore-upgrade/package.tauri.patch.json ./
cp combine-lore-upgrade/README_STEP44_UX_POLISH_TAURI.md ./
node scripts/apply-tauri-package-patch.mjs
npm install
npm run audit:ux
npm run check:modules
npm run dev
```

## Build Tauri conseillé après validation

```bash
npm run tauri:dev
npm run tauri:build
```

## Commit conseillé

```bash
git add src scripts package.tauri.patch.json README_STEP44_UX_POLISH_TAURI.md COAN_FINAL_AUDIT_REPORT.md
git commit -m "Add UX polish and Tauri desktop readability pass"
git push
```
