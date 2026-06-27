import { Medication } from '../types';
import { getVisadoStyle } from './visadoConfig';
import { BadgeVisado } from './BadgeVisado';

interface Props {
  med: Medication;
  onClick: () => void;
}

export function MedicationCard({ med, onClick }: Props) {
  const style = getVisadoStyle(med.tipoVisado);
  const marcas = med.presentaciones.slice(0, 3);
  const restantes = med.presentaciones.length - marcas.length;

  return (
    <button
      onClick={onClick}
      className={`group flex h-full flex-col rounded-xl border border-slate-200 border-l-4 bg-white p-4 text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-md ${style.ring}`}
    >
      <div className="mb-2 flex items-start justify-between gap-2">
        <h3 className="text-[15px] font-semibold leading-tight text-slate-800 group-hover:text-slate-900">
          {med.principioActivo}
        </h3>
        <BadgeVisado tipo={med.tipoVisado} soloMayores75={med.soloMayores75} size="sm" />
      </div>

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
    </button>
  );
}
