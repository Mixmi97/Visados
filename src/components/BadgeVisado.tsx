import { TipoVisado } from '../types';
import { getVisadoInfo } from './visadoConfig';

interface Props {
  tipo: TipoVisado;
  soloMayores75?: boolean;
}

export function BadgeVisado({ tipo, soloMayores75 }: Props) {
  const info = getVisadoInfo(tipo);
  return (
    <span className={`badge ${info.badgeClass}`}>
      <span className="bdot" />
      {info.label}
      {soloMayores75 && <span className="age">≥75</span>}
    </span>
  );
}
