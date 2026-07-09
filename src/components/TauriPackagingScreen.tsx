import { useMemo, useState } from 'react';
import type { GameState } from '../types/game';
import { buildTauriPackagingReport } from '../systems/tauriPackagingSystem';

export function TauriPackagingScreen({ game }: { game: GameState }) {
  const report = useMemo(() => buildTauriPackagingReport(game), [game]);
  const [copied, setCopied] = useState<string | null>(null);

  const copy = async (label: string, text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(label);
      window.setTimeout(() => setCopied(null), 1600);
    } catch {
      setCopied('clipboard indisponible');
    }
  };

  return (
    <section className="tauri-packaging-screen">
      <div className="screen-hero desktop-build-hero">
        <span className="brand-kicker">DESKTOP BUNDLE / WINDOWS OUTPUT</span>
        <h2>QA build Tauri — EXE / NSIS / MSI</h2>
        <p>
          Centre de contrôle packaging pour générer une version desktop privée de Combine Administrator Simulator.
          Cette interface vérifie les scripts, la config, les chemins de sortie, les release notes et les risques de QA longue partie.
        </p>
        <div className="hero-actions">
          <button onClick={() => copy('runbook', report.runbook.join('\n'))}>Copier runbook</button>
          <button onClick={() => copy('release notes', report.releaseNotes)}>Copier release notes</button>
          <button onClick={() => copy('commands', report.commands.map((cmd) => cmd.command).join('\n'))}>Copier commandes</button>
          {copied && <span className="copy-confirm">Copié : {copied}</span>}
        </div>
      </div>

      <div className="tauri-readiness-grid">
        <div className="terminal-card big-score">
          <span>Readiness packaging</span>
          <strong>{report.readiness}%</strong>
          <small>{report.version} / version app {report.appVersion}</small>
        </div>
        <div className="terminal-card big-score danger-card">
          <span>Risque release</span>
          <strong>{report.risk}%</strong>
          <small>{report.dominantRisk}</small>
        </div>
        <div className="terminal-card">
          <span>Session QA</span>
          <b>City {game.city} / Jour {game.day}</b>
          <small>{game.reports.length} rapports · {game.decisionHistory.entries.length} entrées historisées</small>
        </div>
      </div>

      <div className="module-grid two">
        <div className="terminal-card">
          <h3>Runbook release Windows</h3>
          <ol className="runbook-list">
            {report.runbook.map((line) => <li key={line}><code>{line}</code></li>)}
          </ol>
        </div>
        <div className="terminal-card">
          <h3>Prérequis machine Windows</h3>
          <ul className="dense-list">
            {report.prerequisites.map((line) => <li key={line}>{line}</li>)}
          </ul>
          {report.warnings.length > 0 && <>
            <h4>Warnings QA session</h4>
            <ul className="dense-list warning-list">
              {report.warnings.map((line) => <li key={line}>{line}</li>)}
            </ul>
          </>}
        </div>
      </div>

      <div className="module-grid three">
        {report.artifactTargets.map((target) => (
          <article className="terminal-card artifact-card" key={target.id}>
            <span className="brand-kicker">{target.preferredFor}</span>
            <h3>{target.label}</h3>
            <code>{target.path}</code>
            <p>{target.note}</p>
          </article>
        ))}
      </div>

      <div className="terminal-card">
        <h3>Commandes packaging</h3>
        <div className="command-grid">
          {report.commands.map((command) => (
            <button className="command-tile" key={command.id} onClick={() => copy(command.label, command.command)}>
              <strong>{command.label}</strong>
              <code>{command.command}</code>
              <span>{command.purpose}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="terminal-card">
        <h3>Checklist Tauri / Windows</h3>
        <div className="qa-check-grid">
          {report.checks.map((check) => (
            <article key={check.id} className={`qa-check ${check.status}`}>
              <span>{check.category}</span>
              <h4>{check.label}</h4>
              <p>{check.detail}</p>
              <small>{check.remediation}</small>
            </article>
          ))}
        </div>
      </div>

      <div className="module-grid two">
        <div className="terminal-card">
          <h3>Canaux de release privée</h3>
          {report.channels.map((channel) => (
            <div className="release-channel" key={channel.id}>
              <b>{channel.label}</b>
              <span>{channel.intent}</span>
              <small>Suffixe : {channel.versionSuffix}</small>
              <ul>{channel.guardrails.map((rule) => <li key={rule}>{rule}</li>)}</ul>
            </div>
          ))}
        </div>
        <div className="terminal-card release-notes-preview">
          <h3>Preview release notes</h3>
          <pre>{report.releaseNotes}</pre>
        </div>
      </div>
    </section>
  );
}
