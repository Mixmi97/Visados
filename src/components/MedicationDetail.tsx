import { useEffect } from 'react';
import { Medication } from '../types';
import { getVisadoStyle } from './visadoConfig';
import { BadgeVisado } from './BadgeVisado';

interface Props {
  med: Medication | null;
  onClose: () => void;
}

export function MedicationDetail({ med, onClose }: Props) {
  useEffect(() => {
    if (!med) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handler);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handler);
      document.body.style.overflow = '';
    };
  }, [med, onClose]);

  if (!med) return null;
  const style = getVisadoStyle(med.tipoVisado);

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden
      />
      <aside className="detail-scroll relative flex h-full w-full max-w-xl flex-col overflow-y-auto bg-white shadow-2xl animate-[slideIn_0.2s_ease-out]">
        {/* Cabecera */}
        <div className={`sticky top-0 z-10 border-b border-slate-100 ${style.soft} px-6 py-5`}>
          <div className="flex items-start justify-between gap-4">
            <div>
              <BadgeVisado tipo={med.tipoVisado} soloMayores75={med.soloMayores75} />
              <h2 className="mt-2 text-xl font-bold leading-tight text-slate-900">
                {med.principioActivo}
              </h2>
              <p className={`mt-1 text-sm font-medium ${style.text}`}>{style.nombre}</p>
            </div>
            <button
              onClick={onClose}
              className="flex-shrink-0 rounded-lg bg-white/70 p-2 text-slate-500 transition hover:bg-white hover:text-slate-700"
              aria-label="Cerrar"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <div className="flex-1 space-y-6 px-6 py-6">
          {/* Resumen prescriptor / duración */}
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <InfoBox
              titulo="Quién lo prescribe"
              icon="user"
              valor={med.prescriptor}
            />
            <InfoBox titulo="Duración de la autorización" icon="clock" valor={med.duracion} />
          </div>

          {/* Indicaciones */}
          {med.indicaciones.length > 0 && (
            <Section titulo="Indicaciones aprobadas" count={med.indicaciones.length}>
              <ul className="space-y-2">
                {med.indicaciones.map((ind, i) => (
                  <li key={i} className="flex gap-3 text-sm leading-relaxed text-slate-700">
                    <span className={`mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full text-[11px] font-semibold ${style.badge}`}>
                      {i + 1}
                    </span>
                    <span>{ind}</span>
                  </li>
                ))}
              </ul>
            </Section>
          )}

          {/* Criterios a valorar */}
          {med.criteriosValidacion.length > 0 && (
            <Section titulo="Criterios a valorar para su validación" count={med.criteriosValidacion.length}>
              <ul className="space-y-2">
                {med.criteriosValidacion.map((c, i) => (
                  <li key={i} className="flex gap-2.5 text-sm leading-relaxed text-slate-600">
                    <svg className="mt-0.5 h-4 w-4 flex-shrink-0 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
            </Section>
          )}

          {/* Presentaciones */}
          <Section titulo="Nombre y presentaciones" count={med.presentaciones.length}>
            <div className="flex flex-wrap gap-2">
              {med.presentaciones.map((p) => (
                <span
                  key={p}
                  className="rounded-lg bg-slate-50 px-2.5 py-1.5 text-xs font-medium text-slate-600 ring-1 ring-slate-200"
                >
                  {p}
                </span>
              ))}
            </div>
          </Section>

          {/* Notas */}
          {med.notas && (
            <div className="rounded-xl bg-amber-50 p-4 text-sm text-amber-800 ring-1 ring-amber-100">
              <span className="font-semibold">Nota: </span>
              {med.notas}
            </div>
          )}

          {/* Significado del tipo de visado */}
          <div className="rounded-xl border border-slate-100 bg-slate-50/60 p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
              Tipo de visado · {style.label}
            </p>
            <p className="mt-1.5 text-sm leading-relaxed text-slate-600">{style.descripcion}</p>
          </div>
        </div>
      </aside>

      <style>{`@keyframes slideIn { from { transform: translateX(100%); } to { transform: translateX(0); } }`}</style>
    </div>
  );
}

function Section({ titulo, count, children }: { titulo: string; count?: number; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold text-slate-800">
        {titulo}
        {count !== undefined && (
          <span className="rounded-md bg-slate-100 px-1.5 py-0.5 text-[11px] font-medium text-slate-500">
            {count}
          </span>
        )}
      </h3>
      {children}
    </div>
  );
}

function InfoBox({ titulo, valor, icon }: { titulo: string; valor: string; icon: 'user' | 'clock' }) {
  return (
    <div className="rounded-xl border border-slate-100 bg-white p-3.5 shadow-sm">
      <div className="mb-1 flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wide text-slate-400">
        {icon === 'user' ? (
          <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        ) : (
          <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        )}
        {titulo}
      </div>
      <p className="text-sm leading-snug text-slate-700">{valor}</p>
    </div>
  );
}
