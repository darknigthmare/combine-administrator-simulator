import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const candidates = [root, path.join(root, 'combine-lore-upgrade')];
const packRoot = candidates.find((candidate) => fs.existsSync(path.join(candidate, 'src-tauri', 'tauri.conf.json'))) ?? root;

function readJson(relative) {
  return JSON.parse(fs.readFileSync(path.join(packRoot, relative), 'utf8'));
}
function readText(relative) {
  return fs.readFileSync(path.join(packRoot, relative), 'utf8');
}
function exists(relative) {
  return fs.existsSync(path.join(packRoot, relative));
}
function check(condition, label, details = '') {
  return { ok: Boolean(condition), label, details };
}

const tauri = readJson('src-tauri/tauri.conf.json');
const packageJson = readJson('package.json');
const pkgPatch = readJson('package.tauri.patch.json');
const cargo = readText('src-tauri/Cargo.toml');
const workflow = exists('.github/workflows/tauri-windows.yml') ? readText('.github/workflows/tauri-windows.yml') : '';
const packagingData = readText('src/data/tauriPackaging.ts');

const cargoVersion = cargo.match(/version\s*=\s*"([^"]+)"/)?.[1] ?? null;
const bundleTargets = tauri.bundle?.targets ?? [];
const scripts = pkgPatch.scripts ?? {};
const icons = tauri.bundle?.icon ?? [];

const checks = [
  check(tauri.productName === 'Combine Administrator Simulator', 'productName Combine Administrator Simulator', tauri.productName),
  check(tauri.identifier === 'com.darknigthmare.combine-administrator-simulator', 'identifier privé stable', tauri.identifier),
  check(/^\d+\.\d+\.\d+$/.test(tauri.version), 'tauri.conf.json utilise une version SemVer', tauri.version),
  check(packageJson.version === tauri.version, 'package.json version synchronisée', `${packageJson.version} / ${tauri.version}`),
  check(cargoVersion === tauri.version, 'Cargo.toml version synchronisée', `${cargoVersion} / ${tauri.version}`),
  check(packagingData.includes(`version: '${tauri.version}'`) && packagingData.includes(`même version ${tauri.version}`), 'données packaging version synchronisée', tauri.version),
  check(tauri.build?.frontendDist === '../dist', 'frontendDist vers ../dist', tauri.build?.frontendDist),
  check(tauri.build?.beforeBuildCommand === 'npm run build', 'beforeBuildCommand npm run build', tauri.build?.beforeBuildCommand),
  check(bundleTargets.includes('nsis'), 'target NSIS actif', JSON.stringify(bundleTargets)),
  check(bundleTargets.includes('msi'), 'target MSI actif', JSON.stringify(bundleTargets)),
  check(tauri.bundle?.windows?.webviewInstallMode?.type === 'downloadBootstrapper', 'WebView2 mode principal downloadBootstrapper', tauri.bundle?.windows?.webviewInstallMode?.type),
  check(exists('src-tauri/tauri.windows-offline.conf.json'), 'config offline WebView2 disponible'),
  check(exists('src-tauri/tauri.release.conf.json'), 'config release overlay disponible'),
  check(icons.length >= 4 && icons.every((icon) => exists(`src-tauri/${icon}`)), 'icônes Tauri présentes', icons.join(', ')),
  check(Boolean(scripts['audit:tauri']), 'script audit:tauri présent'),
  check(Boolean(scripts['release:notes']), 'script release:notes présent'),
  check(Boolean(scripts['package:windows']), 'script package:windows présent'),
  check(exists('scripts/coan-tauri-build-windows.ps1'), 'script PowerShell build Windows présent'),
  check(exists('scripts/coan-tauri-build-windows.cmd'), 'script CMD wrapper présent'),
  check(workflow.includes('audit:tauri') && workflow.includes('tauri:build'), 'workflow Windows audite puis build'),
  check(exists('README_STEP45_TAURI_BUILD_PACKAGING_QA.md'), 'README étape 45 présent'),
  check(exists('src/components/TauriPackagingScreen.tsx'), 'écran TauriPackagingScreen présent'),
  check(exists('src/data/tauriPackaging.ts'), 'data tauriPackaging présent'),
  check(exists('src/systems/tauriPackagingSystem.ts'), 'system tauriPackaging présent'),
];

const failed = checks.filter((item) => !item.ok);
const report = {
  packRoot,
  version: tauri.version,
  bundleTargets,
  checks,
  totals: {
    checks: checks.length,
    ok: checks.length - failed.length,
    failed: failed.length,
  },
  artifacts: [
    'src-tauri/target/release/combine-administrator-simulator.exe',
    'src-tauri/target/release/bundle/nsis/*-setup.exe',
    'src-tauri/target/release/bundle/msi/*.msi',
    'RELEASE_NOTES_COAN_DESKTOP.md',
  ],
};

console.log(JSON.stringify(report, null, 2));
if (failed.length) process.exit(1);
