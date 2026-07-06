import { useEffect } from 'react';
import { Medication } from '../types';
import { getVisadoInfo } from './visadoConfig';
import { BadgeVisado } from './BadgeVisado';
import { Highlight } from './highlight';

interface Props {
  med: Medication;
  onClose: () => void;
  isFavorite: boolean;
  onToggleFavorite: () => void;
  query?: string;
}

const StarIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round">
    <path d="M12 3.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 16.9 6.8 19.6l1-5.8-4.3-4.1 5.9-.9z" />
  </svg>
);

export function MedicationDetail({ med, onClose, isFavorite, onToggleFavorite, query }: Props) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [onClose]);

  const info = getVisadoInfo(med.tipoVisado);

  return (
    <div className="detail-card">
      <div className="detail-top">
        <button className="close" onClick={onClose} title="Cerrar" aria-label="Cerrar panel">
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>
        <div className="kicker">Ficha de visado</div>
        <h3>{med.principioActivo}</h3>
        <div className="detail-badges">
          <BadgeVisado tipo={med.tipoVisado} soloMayores75={med.soloMayores75} />
          {med.soloMayores75 && (
            <span
              className="badge"
              style={{
                ['--b-bg' as string]: 'var(--accent-soft)',
                ['--b-ink' as string]: 'var(--accent-ink)',
                ['--b-dot' as string]: 'var(--accent)',
              }}
            >
              <span className="bdot" />
              Visado ≥ 75 años
            </span>
          )}
          <button
            className={`star${isFavorite ? ' on' : ''}`}
            style={{ marginLeft: 'auto' }}
            onClick={onToggleFavorite}
            title={isFavorite ? 'Quitar de favoritos' : 'Añadir a favoritos'}
            aria-label={isFavorite ? 'Quitar de favoritos' : 'Añadir a favoritos'}
            aria-pressed={isFavorite}
          >
            <StarIcon />
          </button>
        </div>
      </div>

      <div className="detail-body">
        <div className="meta-grid">
          <div className="mrow">
            <span className="mk">Tipo</span>
            <span className="mv">
              {info.label}
              {med.tipoVisado ? ` — ${info.nombre}` : ''}
            </span>
          </div>
          <div className="mrow">
            <span className="mk">Prescriptor</span>
            <span className="mv">{med.prescriptor}</span>
          </div>
          <div className="mrow">
            <span className="mk">Duración</span>
            <span className="mv">{med.duracion}</span>
          </div>
          <div className="mrow">
            <span className="mk">Presentac.</span>
            <span className="mv">
              <span className="brands">{med.presentaciones.join(' · ')}</span>
            </span>
          </div>
        </div>

        {med.indicaciones.length > 0 && (
          <>
            <div className="sect-label">
              Indicaciones autorizadas <span className="rule" />
            </div>
            <ol className="ind">
              {med.indicaciones.map((ind, i) => (
                <li key={i}>{query ? <Highlight text={ind} query={query} /> : ind}</li>
              ))}
            </ol>
          </>
        )}

        {med.criteriosValidacion.length > 0 && (
          <>
            <div className="sect-label">
              Criterios a valorar <span className="rule" />
            </div>
            <ul className="crit">
              {med.criteriosValidacion.map((c, i) => (
                <li key={i}>{c}</li>
              ))}
            </ul>
          </>
        )}

        {med.notas && (
          <div className="note">
            <b>Nota. </b>
            {med.notas}
          </div>
        )}
      </div>
    </div>
  );
}
