import { useMemo, useState } from 'react';
import Fuse from 'fuse.js';
import { Medication, ActiveTab } from './types';
import { medications } from './data/medications';
import { Header } from './components/Header';
import { SearchBar } from './components/SearchBar';
import { FilterBar, FiltroTipo } from './components/FilterBar';
import { MedicationCard } from './components/MedicationCard';
import { MedicationDetail } from './components/MedicationDetail';
import { NedGuide } from './components/NedGuide';

const ordenados = [...medications].sort((a, b) =>
  a.principioActivo.localeCompare(b.principioActivo, 'es')
);

export default function App() {
  const [tab, setTab] = useState<ActiveTab>('medicamentos');
  const [query, setQuery] = useState('');
  const [filtro, setFiltro] = useState<FiltroTipo>('TODOS');
  const [seleccionado, setSeleccionado] = useState<Medication | null>(null);

  const fuse = useMemo(
    () =>
      new Fuse(ordenados, {
        keys: [
          { name: 'principioActivo', weight: 3 },
          { name: 'presentaciones', weight: 2 },
          { name: 'indicaciones', weight: 1 },
        ],
        threshold: 0.35,
        ignoreLocation: true,
        ignoreDiacritics: true,
        minMatchCharLength: 2,
      }),
    []
  );

  const counts = useMemo(() => {
    const c: Record<string, number> = { TODOS: ordenados.length, CPD: 0, 'CPD-E': 0, DH: 0, FR: 0 };
    for (const m of ordenados) {
      if (m.tipoVisado && c[m.tipoVisado] !== undefined) c[m.tipoVisado]++;
    }
    return c;
  }, []);

  const resultados = useMemo(() => {
    let base = query.trim().length >= 2 ? fuse.search(query).map((r) => r.item) : ordenados;
    if (filtro !== 'TODOS') {
      base = base.filter((m) => m.tipoVisado === filtro);
    }
    return base;
  }, [query, filtro, fuse]);

  return (
    <div className="min-h-screen">
      <Header tab={tab} onTabChange={setTab} totalMedicamentos={ordenados.length} />

      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        {tab === 'medicamentos' ? (
          <>
            <div className="mb-5 space-y-4">
              <SearchBar value={query} onChange={setQuery} resultCount={resultados.length} />
              <FilterBar activo={filtro} onChange={setFiltro} counts={counts} />
            </div>

            {resultados.length === 0 ? (
              <EmptyState query={query} onReset={() => { setQuery(''); setFiltro('TODOS'); }} />
            ) : (
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {resultados.map((med) => (
                  <MedicationCard key={med.id} med={med} onClick={() => setSeleccionado(med)} />
                ))}
              </div>
            )}
          </>
        ) : (
          <NedGuide />
        )}
      </main>

      <MedicationDetail med={seleccionado} onClose={() => setSeleccionado(null)} />

      <footer className="mx-auto max-w-7xl px-4 py-8 text-center sm:px-6 lg:px-8">
        <p className="text-xs text-slate-400">
          Datos basados en el documento «Medicamentos sujetos a condiciones restringidas de prescripción y/o dispensación»
          de larioja.org (act. 04/05/2026). Herramienta de consulta de apoyo; ante cualquier duda, consultar el documento
          oficial y la normativa vigente.
        </p>
      </footer>
    </div>
  );
}

function EmptyState({ query, onReset }: { query: string; onReset: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-white py-16 text-center">
      <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-slate-100">
        <svg className="h-6 w-6 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
        </svg>
      </div>
      <p className="text-sm font-medium text-slate-700">Sin resultados</p>
      <p className="mt-1 max-w-sm text-sm text-slate-500">
        No se han encontrado medicamentos {query && <>para «<span className="font-medium">{query}</span>»</>} con los
        filtros actuales.
      </p>
      <button
        onClick={onReset}
        className="mt-4 rounded-lg bg-slate-800 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-700"
      >
        Limpiar búsqueda y filtros
      </button>
    </div>
  );
}
