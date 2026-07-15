import { useMemo, useState } from 'react';
import type { KeyboardEvent as ReactKeyboardEvent, MouseEvent as ReactMouseEvent } from 'react';
import { ExternalLink, Minus, PanelsTopLeft, Pin, PinOff, X } from 'lucide-react';
import type { FloatingWindowContent, FloatingWindowPresetId, FloatingWindowRuntime, GameState, TabId } from '../types/game';
import { defaultFloatingWindowLoadout } from '../data';
import { buildFloatingWindowContent, buildFloatingWindowLauncher, getFloatingWindowPreset } from '../systems/floatingWindowSystem';
import { isUiuxTabUnlocked } from '../systems/uiuxProgressionSystem';

const startPositions = [
  { x: 356, y: 104 },
  { x: 424, y: 142 },
  { x: 492, y: 180 },
  { x: 560, y: 118 },
  { x: 628, y: 156 },
];

export function FloatingWindowLayer({ game, selectedSectorId, setTab }: { game: GameState; selectedSectorId: string; setTab: (tab: TabId) => void }) {
  const [windows, setWindows] = useState<FloatingWindowRuntime[]>([]);
  const [dockOpen, setDockOpen] = useState(false);
  const [zTop, setZTop] = useState(40);
  const launcher = useMemo(
    () => buildFloatingWindowLauncher(game, selectedSectorId).filter((content) => isUiuxTabUnlocked(game.uiuxProgression, content.relatedTab)),
    [game, selectedSectorId],
  );

  function openWindow(presetId: FloatingWindowPresetId) {
    const already = windows.find((window) => window.presetId === presetId && !window.minimized);
    const nextZ = zTop + 1;
    setZTop(nextZ);
    if (already) {
      setWindows((current) => current.map((window) => window.id === already.id ? { ...window, z: nextZ } : window));
      return;
    }
    const pos = startPositions[windows.length % startPositions.length];
    const preset = getFloatingWindowPreset(presetId);
    setWindows((current) => [...current, {
      id: `${presetId}-${Date.now()}-${current.length}`,
      presetId,
      title: preset.label,
      x: pos.x + current.length * 10,
      y: pos.y + current.length * 8,
      z: nextZ,
      width: presetId === 'report_compare' || presetId === 'chronicle_extract' ? 620 : 520,
      minimized: false,
      pinned: false,
    }]);
  }

  function openDefaultDeck() {
    defaultFloatingWindowLoadout.filter((presetId) => isUiuxTabUnlocked(game.uiuxProgression, getFloatingWindowPreset(presetId).defaultTab)).forEach((presetId, index) => {
      window.setTimeout(() => openWindow(presetId), index * 35);
    });
  }

  function closeWindow(id: string) {
    setWindows((current) => current.filter((window) => window.id !== id));
  }

  function minimizeWindow(id: string) {
    setWindows((current) => current.map((window) => window.id === id ? { ...window, minimized: true } : window));
  }

  function restoreWindow(id: string) {
    const nextZ = zTop + 1;
    setZTop(nextZ);
    setWindows((current) => current.map((window) => window.id === id ? { ...window, minimized: false, z: nextZ } : window));
  }

  function focusWindow(id: string) {
    const nextZ = zTop + 1;
    setZTop(nextZ);
    setWindows((current) => current.map((window) => window.id === id ? { ...window, z: nextZ } : window));
  }

  function togglePin(id: string) {
    setWindows((current) => current.map((window) => window.id === id ? { ...window, pinned: !window.pinned } : window));
  }

  function moveWindow(id: string, x: number, y: number) {
    setWindows((current) => current.map((window) => window.id === id ? { ...window, x, y } : window));
  }

  const minimized = windows.filter((window) => window.minimized);

  return <div className="floating-window-layer" aria-label="COAN floating dossier operating system">
    <button
      className={`floating-os-toggle ${dockOpen ? 'active' : ''}`}
      aria-label={dockOpen ? 'Fermer le gestionnaire de dossiers COAN' : 'Ouvrir le gestionnaire de dossiers COAN'}
      aria-expanded={dockOpen}
      aria-controls="coan-floating-dock"
      title="Gestionnaire de dossiers COAN"
      onClick={() => setDockOpen(!dockOpen)}
    >
      <PanelsTopLeft size={18} aria-hidden="true" />
      <span className="floating-os-label">COAN OS</span>
      <b>{windows.filter((window) => !window.minimized).length}</b>
    </button>

    {dockOpen && <div className="floating-dock panel" id="coan-floating-dock">
      <div className="floating-dock-head">
        <div>
          <span className="brand-kicker">COAN WINDOW MANAGER</span>
          <strong>Dossiers flottants</strong>
        </div>
        <button onClick={openDefaultDeck}>Deck urgence</button>
      </div>
      <div className="floating-launcher-grid">
        {launcher.map((content) => <button key={content.presetId} className={`floating-launcher accent-${content.accent} severity-${content.severity}`} onClick={() => openWindow(content.presetId)}>
          <span>{getFloatingWindowPreset(content.presetId).shortLabel}</span>
          <b>{content.severity}/5</b>
          <small>{content.title.replace(/^.*?\/\//, '').trim()}</small>
        </button>)}
      </div>
      {minimized.length > 0 && <div className="floating-minimized-tray">
        <span>Réduit</span>
        {minimized.map((window) => <button key={window.id} onClick={() => restoreWindow(window.id)}>{getFloatingWindowPreset(window.presetId).shortLabel}</button>)}
      </div>}
    </div>}

    {windows.filter((window) => !window.minimized).map((window) => <FloatingWindow
      key={window.id}
      runtime={window}
      content={buildFloatingWindowContent(game, window.presetId, selectedSectorId)}
      focusWindow={focusWindow}
      closeWindow={closeWindow}
      minimizeWindow={minimizeWindow}
      togglePin={togglePin}
      moveWindow={moveWindow}
      setTab={setTab}
    />)}
  </div>;
}

function FloatingWindow({ runtime, content, focusWindow, closeWindow, minimizeWindow, togglePin, moveWindow, setTab }: {
  runtime: FloatingWindowRuntime;
  content: FloatingWindowContent;
  focusWindow: (id: string) => void;
  closeWindow: (id: string) => void;
  minimizeWindow: (id: string) => void;
  togglePin: (id: string) => void;
  moveWindow: (id: string, x: number, y: number) => void;
  setTab: (tab: TabId) => void;
}) {
  function startDrag(e: ReactMouseEvent<HTMLDivElement>) {
    if (runtime.pinned) return;
    focusWindow(runtime.id);
    const startX = e.clientX;
    const startY = e.clientY;
    const originX = runtime.x;
    const originY = runtime.y;
    const onMove = (move: MouseEvent) => {
      const nextX = Math.max(244, Math.min(window.innerWidth - 260, originX + move.clientX - startX));
      const nextY = Math.max(56, Math.min(window.innerHeight - 180, originY + move.clientY - startY));
      moveWindow(runtime.id, nextX, nextY);
    };
    const onUp = () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
    };
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
  }

  function handleWindowKeyDown(event: ReactKeyboardEvent<HTMLElement>) {
    if (event.target !== event.currentTarget) return;
    if (event.key === 'Escape') {
      event.preventDefault();
      minimizeWindow(runtime.id);
      return;
    }
    if (!['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(event.key) || runtime.pinned) return;
    event.preventDefault();
    const step = event.shiftKey ? 32 : 12;
    const xDelta = event.key === 'ArrowLeft' ? -step : event.key === 'ArrowRight' ? step : 0;
    const yDelta = event.key === 'ArrowUp' ? -step : event.key === 'ArrowDown' ? step : 0;
    const nextX = Math.max(244, Math.min(window.innerWidth - 260, runtime.x + xDelta));
    const nextY = Math.max(56, Math.min(window.innerHeight - 180, runtime.y + yDelta));
    moveWindow(runtime.id, nextX, nextY);
  }

  return <article
    className={`floating-window panel accent-${content.accent} severity-${content.severity} ${runtime.pinned ? 'pinned' : ''}`}
    style={{ left: runtime.x, top: runtime.y, zIndex: runtime.z, width: runtime.width }}
    onMouseDown={() => focusWindow(runtime.id)}
    onKeyDown={handleWindowKeyDown}
    tabIndex={0}
    aria-label={`${content.title}. Fenêtre déplaçable avec les flèches, Maj pour accélérer.`}
  >
    <div className="floating-window-titlebar" onMouseDown={startDrag}>
      <div>
        <span>{content.classification}</span>
        <strong>{content.title}</strong>
      </div>
      <div className="floating-window-actions" onMouseDown={(event) => event.stopPropagation()}>
        <button title={runtime.pinned ? 'Désépingler' : 'Épingler'} aria-label={runtime.pinned ? 'Désépingler la fenêtre' : 'Épingler la fenêtre'} onClick={(e) => { e.stopPropagation(); togglePin(runtime.id); }}>{runtime.pinned ? <PinOff size={14} /> : <Pin size={14} />}</button>
        <button title="Ouvrir le module" aria-label="Ouvrir le module lié" onClick={(e) => { e.stopPropagation(); setTab(content.relatedTab); }}><ExternalLink size={14} /></button>
        <button title="Réduire" aria-label="Réduire la fenêtre" onClick={(e) => { e.stopPropagation(); minimizeWindow(runtime.id); }}><Minus size={14} /></button>
        <button title="Fermer" aria-label="Fermer la fenêtre" onClick={(e) => { e.stopPropagation(); closeWindow(runtime.id); }}><X size={14} /></button>
      </div>
    </div>
    <div className="floating-window-body">
      <p className="floating-subtitle">{content.subtitle}</p>
      <div className="floating-metrics">
        {content.metrics.map((item) => <span key={`${runtime.id}-${item.label}`} className={`${item.danger ? 'danger' : ''} ${item.xen ? 'xen' : ''}`}><small>{item.label}</small><b>{item.value}</b></span>)}
      </div>
      <div className="floating-lines">
        {content.lines.map((line, index) => <p key={`${runtime.id}-line-${index}`}>▸ {line}</p>)}
      </div>
      <div className="event-tags floating-tags">
        {content.tags.map((tag) => <span key={`${runtime.id}-${tag}`}>{tag}</span>)}
      </div>
      <footer>{content.footer}</footer>
    </div>
  </article>;
}
