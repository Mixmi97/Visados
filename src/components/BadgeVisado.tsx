import { TipoVisado } from '../types';
import { getVisadoStyle } from './visadoConfig';

interface Props {
  tipo: TipoVisado;
  soloMayores75?: boolean;
  size?: 'sm' | 'md';
}

export function BadgeVisado({ tipo, soloMayores75, size = 'md' }: Props) {
  const style = getVisadoStyle(tipo);
  const pad = size === 'sm' ? 'px-2 py-0.5 text-[11px]' : 'px-2.5 py-1 text-xs';

  return (
    <span className="inline-flex flex-wrap items-center gap-1.5">
      <span className={`inline-flex items-center gap-1.5 rounded-full font-semibold ${pad} ${style.badge}`}>
        <span className={`h-1.5 w-1.5 rounded-full ${style.dot}`} />
        {style.label}
      </span>
      {soloMayores75 && (
        <span className={`inline-flex items-center rounded-full bg-purple-50 px-2 py-0.5 text-[11px] font-medium text-purple-700 ring-1 ring-purple-200`}>
          ≥75 años
        </span>
      )}
    </span>
  );
}
