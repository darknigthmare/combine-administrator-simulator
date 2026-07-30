#!/usr/bin/env node
import { createServer } from 'vite';

const server = await createServer({
  appType: 'custom',
  logLevel: 'silent',
  server: { middlewareMode: true },
});

try {
  const module = await server.ssrLoadModule('/src/systems/preReleaseMatrixSystem.ts');
  const report = module.runPreReleaseMatrix();
  console.log('COAN PRE-RELEASE MATRIX');
  for (const check of report.checks) console.log(`${check.pass ? 'OK ' : 'ERR'} ${check.label}`);
  console.log(`MATRIX ${report.cases.length} configurations / ${report.endings} verdicts`);
  console.log(`CANON danger=${report.canonical.danger}% stabilite=${report.canonical.stabilityForecast}%`);
  if (!report.ok) process.exitCode = 1;
} finally {
  await server.close();
}
