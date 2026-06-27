import { TipoVisado } from '../types';
import { VISADO_STYLES } from './visadoConfig';

export type FiltroTipo = TipoVisado | 'TODOS';

interface Props {
  activo: FiltroTipo;
  onChange: (t: FiltroTipo) => void;
  counts: Record<string, number>;
}

const ORDEN: { key: FiltroTipo; label: string }[] = [
  { key: 'TODOS', label: 'Todos' },
  { key: 'CPD', label: 'CPD' },
  { key: 'CPD-E', label: 'CPD-E' },
  { key: 'DH', label: 'DH' },
  { key: 'FR', label: 'FR' },
];

export function FilterBar({ activo, onChange, counts }: Props) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      {ORDEN.map(({ key, label }) => {
        const isActive = activo === key;
        const style = key !== 'TODOS' ? VISADO_STYLES[key as string] : null;
        const count = counts[key as string] ?? 0;
        return (
          <button
            key={key}
            onClick={() => onChange(key)}
            className={`group inline-flex items-center gap-2 rounded-lg border px-3 py-1.5 text-sm font-medium transition ${
              isActive
                ? 'border-slate-800 bg-slate-800 text-white shadow-sm'
                : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50'
            }`}
          >
            {style && (
              <span className={`h-2 w-2 rounded-full ${isActive ? 'bg-white/80' : style.dot}`} />
            )}
            {label}
            <span
              className={`rounded-md px-1.5 py-0.5 text-[11px] font-semibold ${
                isActive ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-500'
              }`}
            >
              {count}
            </span>
          </button>
        );
      })}
    </div>
  );
}
