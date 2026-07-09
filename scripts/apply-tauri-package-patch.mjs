import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const packagePath = path.join(root, 'package.json');
const patchPath = path.join(root, 'package.tauri.patch.json');

if (!fs.existsSync(packagePath)) {
  console.error('package.json introuvable. Lance ce script depuis la racine du repo.');
  process.exit(1);
}
if (!fs.existsSync(patchPath)) {
  console.error('package.tauri.patch.json introuvable. Copie le patch depuis le pack avant.');
  process.exit(1);
}

const pkg = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
const patch = JSON.parse(fs.readFileSync(patchPath, 'utf8'));

pkg.scripts = { ...(pkg.scripts ?? {}), ...(patch.scripts ?? {}) };
pkg.devDependencies = { ...(pkg.devDependencies ?? {}), ...(patch.devDependencies ?? {}) };

fs.writeFileSync(packagePath, `${JSON.stringify(pkg, null, 2)}\n`);
console.log('package.json mis à jour avec les scripts/devDependencies Tauri.');
