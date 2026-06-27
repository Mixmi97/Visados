import { SearchMode } from '../types';

interface Props {
  value: string;
  onChange: (v: string) => void;
  resultCount: number;
  mode: SearchMode;
  onModeChange: (m: SearchMode) => void;
}

const PLACEHOLDERS: Record<SearchMode, string> = {
  farmaco: 'Buscar por principio activo o marca comercial…',
  indicacion: 'Buscar por indicación o situación clínica…',
};

export function SearchBar({ value, onChange, resultCount, mode, onModeChange }: Props) {
  return (
    <div className="space-y-2.5">
      {/* Toggle de modo de búsqueda */}
      <div className="flex items-center gap-2">
        <div className="inline-flex rounded-lg bg-slate-100 p-1">
          <ModeButton active={mode === 'farmaco'} onClick={() => onModeChange('farmaco')}>
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
            </svg>
            Fármaco
          </ModeButton>
          <ModeButton active={mode === 'indicacion'} onClick={() => onModeChange('indicacion')}>
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25z" />
            </svg>
            Indicación
          </ModeButton>
        </div>
        {mode === 'indicacion' && (
          <span className="hidden text-xs text-slate-400 sm:inline">
            Busca qué fármacos cubren una patología
          </span>
        )}
      </div>

      {/* Campo de búsqueda */}
      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
          <svg className="h-5 w-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
          </svg>
        </div>
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={PLACEHOLDERS[mode]}
          className="w-full rounded-xl border border-slate-200 bg-white py-3.5 pl-12 pr-28 text-sm shadow-sm outline-none transition placeholder:text-slate-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
        />
        <div className="absolute inset-y-0 right-0 flex items-center gap-2 pr-3">
          {value && (
            <button
              onClick={() => onChange('')}
              className="rounded-lg p-1 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
              aria-label="Limpiar búsqueda"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
          <span className="hidden whitespace-nowrap rounded-lg bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-500 sm:inline">
            {resultCount} resultado{resultCount !== 1 ? 's' : ''}
          </span>
        </div>
      </div>
    </div>
  );
}

function ModeButton({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium transition ${
        active ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'
      }`}
    >
      {children}
    </button>
  );
}
