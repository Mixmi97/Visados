import { Medication } from '../types';
import { getVisadoStyle } from './visadoConfig';
import { BadgeVisado } from './BadgeVisado';
import { Highlight } from './highlight';

interface Props {
  med: Medication;
  onClick: () => void;
  isFavorite: boolean;
  onToggleFavorite: () => void;
  matchedIndicacion?: string;
  query?: string;
}

export function MedicationCard({
  med,
  onClick,
  isFavorite,
  onToggleFavorite,
  matchedIndicacion,
  query,
}: Props) {
  const style = getVisadoStyle(med.tipoVisado);
  const marcas = med.presentaciones.slice(0, 3);
  const restantes = med.presentaciones.length - marcas.length;

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onClick();
    }
  };

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      className={`group flex h-full cursor-pointer flex-col rounded-xl border border-slate-200 border-l-4 bg-white p-4 text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-300 ${style.ring}`}
    >
      <div className="mb-2 flex items-start justify-between gap-2">
        <h3 className="text-[15px] font-semibold leading-tight text-slate-800 group-hover:text-slate-900">
          {med.principioActivo}
        </h3>
        <div className="flex flex-shrink-0 items-center gap-1.5">
          <BadgeVisado tipo={med.tipoVisado} soloMayores75={med.soloMayores75} size="sm" />
          <FavoriteButton active={isFavorite} onToggle={onToggleFavorite} />
        </div>
      </div>

      {matchedIndicacion ? (
        <div className={`mb-3 rounded-lg ${style.soft} p-2.5`}>
          <p className="mb-1 text-[10px] font-semibold uppercase tracking-wide text-slate-400">
            Indicación coincidente
          </p>
          <p className="line-clamp-3 text-xs leading-relaxed text-slate-700">
            <Highlight text={matchedIndicacion} query={query ?? ''} />
          </p>
        </div>
      ) : (
        <div className="mb-3 flex flex-wrap gap-1">
          {marcas.map((m) => (
            <span
              key={m}
              className="truncate rounded-md bg-slate-50 px-1.5 py-0.5 text-[11px] text-slate-500 ring-1 ring-slate-100"
              title={m}
            >
              {m.length > 26 ? m.slice(0, 26) + '…' : m}
            </span>
          ))}
          {restantes > 0 && (
            <span className="rounded-md bg-slate-50 px-1.5 py-0.5 text-[11px] font-medium text-slate-400 ring-1 ring-slate-100">
              +{restantes}
            </span>
          )}
        </div>
      )}

      <div className="mt-auto space-y-1.5 border-t border-slate-100 pt-3">
        <div className="flex items-start gap-2 text-xs text-slate-500">
          <svg className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
          <span className="line-clamp-2">{med.prescriptor}</span>
        </div>
        <div className="flex items-center gap-2 text-xs">
          <svg className="h-3.5 w-3.5 flex-shrink-0 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className={`font-medium ${style.text}`}>{med.duracion}</span>
        </div>
      </div>
    </div>
  );
}

function FavoriteButton({ active, onToggle }: { active: boolean; onToggle: () => void }) {
  return (
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation();
        onToggle();
      }}
      aria-label={active ? 'Quitar de favoritos' : 'Añadir a favoritos'}
      aria-pressed={active}
      className={`rounded-lg p-1 transition ${
        active ? 'text-amber-400 hover:text-amber-500' : 'text-slate-300 hover:text-amber-400'
      }`}
    >
      <svg className="h-4 w-4" viewBox="0 0 24 24" fill={active ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.562.562 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.562.562 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
      </svg>
    </button>
  );
}
