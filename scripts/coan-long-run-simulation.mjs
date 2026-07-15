#!/usr/bin/env node
import { createServer } from 'vite';

const server = await createServer({
  appType: 'custom',
  logLevel: 'silent',
  server: { middlewareMode: true },
});

try {
  const module = await server.ssrLoadModule('/src/systems/longRunSimulation.ts');
  const report = module.runLongRunVerification();
  console.log('COAN LONG-RUN SIMULATION');
  for (const check of report.checks) console.log(`${check.pass ? 'OK ' : 'ERR'} ${check.label}`);
  for (const scenario of report.scenarios) {
    console.log(`SIM ${scenario.name} crises=${scenario.crisisDays}/${scenario.days} calme=${scenario.quietDays} charge=${scenario.load}% netREQ=${scenario.dailyNet.requisition} ressources=${JSON.stringify(scenario.finalResources)}`);
  }
  if (!report.ok) process.exitCode = 1;
} finally {
  await server.close();
}
