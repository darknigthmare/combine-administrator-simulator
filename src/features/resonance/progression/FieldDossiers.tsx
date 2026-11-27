import { useEffect, useState } from 'react';
import { getBoss } from '../bossBattle/catalog';
import type { BossId } from '../bossBattle/types';
import { accessTitle } from './access';
import { dossierAccess, FIELD_DOSSIERS } from './fieldDossiers';
import type { DossierId, DossierProgress, LoadedDossiers } from './fieldDossiers';
import striderUrl from '../../../../assets/resonance/candidates/continuation_20261125_k/machines/strider_hl2_idle_k.png';
import dropshipUrl from '../../../../assets/resonance/candidates/continuation_20261124_f/dropship_container_hl2_hover_right_f.png';
import gunshipUrl from '../../../../assets/resonance/candidates/continuation_20261124_f/gunship_hl2_hover_left_f.png';
import gargantuaUrl from '../../../../assets/resonance/candidates/continuation_20261120_e/boss_gargantua_hl1_rear_threequarter_e.png';
import './FieldDossiers.css';

/** Gallery-only references. These do not replace the battle renderer or hitboxes. */
export const DOSSIER_IMAGES: Record<BossId, string> = {
  strider_hl2: striderUrl, dropship_hl2: dropshipUrl, gunship_hl2: gunshipUrl, gargantua_hl1: gargantuaUrl,
};

function DossierSeal({ open }: { open: boolean }) {
  return <svg viewBox="0 0 32 32" fill="none" aria-hidden="true" focusable="false">
    <path d="M5 6h9l3 4h10v17H5V6Z" stroke="currentColor" strokeWidth="1.5" />
    {open ? <path d="m11 19 4 4 7-9" stroke="currentColor" strokeWidth="2" />
      : <><rect x="12" y="17" width="9" height="7" rx="1" stroke="currentColor" strokeWidth="1.5" /><path d="M14 17v-3a2.5 2.5 0 0 1 5 0v3M16.5 20v2" stroke="currentColor" strokeWidth="1.5" /></>}
  </svg>;
}

export interface FieldDossiersProps {
  progress: DossierProgress;
  visible: boolean;
  reducedMotion: boolean;
  newlyAwarded: readonly DossierId[];
  warning: LoadedDossiers['warning'];
  onRevealComplete: () => void;
  onSelectOperation: (bossId: BossId) => void;
}

export function FieldDossiers({ progress, visible, reducedMotion, newlyAwarded, warning, onRevealComplete, onSelectOperation }: FieldDossiersProps) {
  const [expanded, setExpanded] = useState<DossierId | null>(null);
  const [imageErrors, setImageErrors] = useState<readonly BossId[]>([]);
  const [announcement, setAnnouncement] = useState('');
  const owned = FIELD_DOSSIERS.filter((dossier) => dossierAccess(progress, dossier).usable).length;
  useEffect(() => {
    if (!visible) { setAnnouncement(''); return; }
    if (!newlyAwarded.length) return;
    const names = FIELD_DOSSIERS.filter((dossier) => newlyAwarded.includes(dossier.id)).map((dossier) => dossier.title).join(', ');
    setAnnouncement(`${newlyAwarded.length === 1 ? 'Nouveau dossier ouvert' : `${newlyAwarded.length} dossiers ouverts`} : ${names}.`);
    const timer = window.setTimeout(onRevealComplete, reducedMotion ? 0 : 1500);
    return () => window.clearTimeout(timer);
  }, [visible, reducedMotion, newlyAwarded, onRevealComplete]);
  if (!visible) return null;

  return <section className="bb-dossiers" aria-labelledby="bb-dossiers-title">
    <div className="bb-section-label"><h2 id="bb-dossiers-title">04 — Dossiers de terrain</h2><small>{owned} / {FIELD_DOSSIERS.length} ARCHIVES OUVERTES</small></div>
    <p className="bb-dossiers-intro">Une victoire en opération ou un Boss Rush complet ouvre ces dossiers de collection. Toutes les opérations restent accessibles.</p>
    {warning && <p className="bb-dossiers-warning" role="status">{warning === 'unsupported_version'
      ? 'Une sauvegarde plus récente est conservée. Les dossiers ouverts ici restent disponibles pour cette session.'
      : warning === 'invalid' ? 'La collection sauvegardée est illisible. Les dossiers seront récupérés depuis vos records disponibles.'
        : 'La sauvegarde de la collection est indisponible. Vos dossiers restent ouverts pour cette session.'}</p>}
    <p className="bb-dossier-announcement" role="status">{announcement}</p>
    <div className="bb-dossier-grid">
      {FIELD_DOSSIERS.map((dossier, index) => {
        const access = dossierAccess(progress, dossier);
        const boss = getBoss(dossier.bossId);
        const open = expanded === dossier.id;
        const title = accessTitle(access, dossier.title);
        const imageFailed = imageErrors.includes(dossier.bossId);
        return <article key={dossier.id} className={`bb-dossier ${access.usable ? 'is-open' : 'is-locked'}${newlyAwarded.includes(dossier.id) ? ' is-new' : ''}`}>
          <button type="button" className="bb-dossier-card" aria-expanded={open} aria-controls={`${dossier.id}_detail`} onClick={() => setExpanded(open ? null : dossier.id)}>
            <span className="bb-dossier-number">ARCHIVE / 0{index + 1}</span>
            <span className="bb-dossier-image" aria-hidden="true">
              {!imageFailed ? <img src={DOSSIER_IMAGES[dossier.bossId]} alt="" loading="lazy" decoding="async" onError={() => setImageErrors((previous) => [...new Set([...previous, dossier.bossId])])} /> : <span className="bb-dossier-image-fallback">ILLUSTRATION INDISPONIBLE</span>}
              <span className="bb-dossier-seal"><DossierSeal open={access.usable} /></span>
            </span>
            <b>{title}</b><span className="bb-dossier-state">{access.usable ? 'Acquis définitivement' : 'Dossier classifié — à débloquer'}</span>
            <span className="bb-dossier-action">{open ? 'Fermer la fiche' : access.usable ? 'Consulter le dossier' : 'Voir les conditions'}<span aria-hidden="true">{open ? '−' : '+'}</span></span>
          </button>
          {imageFailed && <p className="bb-dossier-technical" role="status">Illustration indisponible. {access.usable ? 'Votre dossier reste acquis et consultable.' : 'Les conditions de déblocage restent consultables.'}</p>}
          <div className="bb-dossier-detail" id={`${dossier.id}_detail`} hidden={!open}>
            {access.usable ? <>
              <span className="bb-overline">{boss.sourceGame}</span>
              <p>{boss.canonicalRule}</p>
              <p><strong>Approche tactique.</strong> {boss.counterplay}</p>
              <p className="bb-dossier-art-note">{dossier.bossId === 'gargantua_hl1' ? 'Étude visuelle de dos. ' : ''}Illustration de travail ; la fidélité au modèle reste à valider.</p>
              <div className="bb-dossier-sources">{boss.sourceUrls.map((url, sourceIndex) => <a key={url} href={url} target="_blank" rel="noreferrer">Référence {sourceIndex + 1} ↗</a>)}</div>
            </> : <>
              <span className="bb-overline">Deux voies de déblocage</span>
              <p>Réussir l’opération {dossier.title} <strong>OU</strong> terminer les quatre opérations du Boss Rush.</p>
              <p>Tous les combattants et toutes les difficultés comptent. Entraînement, défaite et parcours inachevé ne débloquent pas de dossier.</p>
              <p>Attribution automatique et permanente après une victoire admissible aux records.</p>
            </>}
            <button type="button" className="bb-small-button" onClick={() => onSelectOperation(dossier.bossId)}>Préparer l’opération {title}</button>
          </div>
        </article>;
      })}
    </div>
    <p className="bb-dossiers-footnote">Collection locale · Anciens records pris en compte · Présentation des archives créée pour Resonance</p>
  </section>;
}
