import { SearchMode } from '../types';

interface Props {
  value: string;
  onChange: (v: string) => void;
  resultCount: number;
  total: number;
  mode: SearchMode;
  onModeChange: (m: SearchMode) => void;
}

const PLACEHOLDERS: Record<SearchMode, string> = {
  farmaco: 'Buscar por principio activo o marca comercial…',
  indicacion: 'Buscar por indicación o situación clínica…',
};

export function SearchBar({ value, onChange, resultCount, total, mode, onModeChange }: Props) {
  return (
    <div className="toolbar">
      <div className="toolbar-inner">
        <div className={`search${value ? ' has-val' : ''}`}>
          <span className="mag" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round">
              <circle cx="11" cy="11" r="7" />
              <path d="M20 20l-3.5-3.5" />
            </svg>
          </span>
          <input
            type="text"
            autoComplete="off"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={PLACEHOLDERS[mode]}
            aria-label="Buscar"
          />
          <button className="clear" onClick={() => onChange('')} title="Limpiar" aria-label="Limpiar búsqueda">
            ×
          </button>
        </div>

        <div className="seg" role="group" aria-label="Buscar en">
          <button data-mode="farmaco" aria-pressed={mode === 'farmaco'} onClick={() => onModeChange('farmaco')}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
              <path d="M6.5 14.5l8-8a3.5 3.5 0 0 1 5 5l-8 8a3.5 3.5 0 0 1-5-5z" />
              <path d="M9 12l4 4" />
            </svg>
            Fármaco
          </button>
          <button data-mode="indicacion" aria-pressed={mode === 'indicacion'} onClick={() => onModeChange('indicacion')}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 4.5h11l3 3V19.5H5z" />
              <path d="M8 9h8M8 12.5h8M8 16h5" />
            </svg>
            Indicación
          </button>
        </div>

        <p className="result-note">
          <b className="num">{resultCount}</b> de <span className="num">{total}</span> visados
        </p>
      </div>
    </div>
  );
}
