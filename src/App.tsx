import { useMemo, useState } from 'react';
import Fuse from 'fuse.js';
import { Medication, ActiveTab, SearchMode, SearchResult } from './types';
import { medications } from './data/medications';
import { useFavorites } from './hooks/useFavorites';
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
  const [searchMode, setSearchMode] = useState<SearchMode>('farmaco');
  const [filtro, setFiltro] = useState<FiltroTipo>('TODOS');
  const [seleccionado, setSeleccionado] = useState<Medication | null>(null);

  const { toggle, isFavorite, count: favCount } = useFavorites();

  const fuseFarmaco = useMemo(
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

  const fuseIndicacion = useMemo(
    () =>
      new Fuse(ordenados, {
        keys: ['indicaciones'],
        threshold: 0.4,
        ignoreLocation: true,
        ignoreDiacritics: true,
        includeMatches: true,
        minMatchCharLength: 3,
      }),
    []
  );

  const tieneQuery = query.trim().length >= 2;

  // Resultados de la búsqueda como SearchResult[] (independiente de pestaña/filtro).
  const resultadosBusqueda = useMemo<SearchResult[]>(() => {
    if (!tieneQuery) return ordenados.map((med) => ({ med }));

    if (searchMode === 'indicacion') {
      return fuseIndicacion.search(query).map((r) => {
        const match = r.matches?.find((m) => m.key === 'indicaciones');
        const matchedIndicacion =
          match && typeof match.refIndex === 'number'
            ? r.item.indicaciones[match.refIndex]
            : r.item.indicaciones[0];
        return { med: r.item, matchedIndicacion };
      });
    }

    return fuseFarmaco.search(query).map((r) => ({ med: r.item }));
  }, [query, searchMode, tieneQuery, fuseFarmaco, fuseIndicacion]);

  // Conjunto base de la pestaña activa (para conteos coherentes).
  const baseTab = useMemo(
    () => (tab === 'favoritos' ? ordenados.filter((m) => isFavorite(m.id)) : ordenados),
    [tab, isFavorite]
  );

  const counts = useMemo(() => {
    const c: Record<string, number> = {
      TODOS: baseTab.length,
      CPD: 0,
      'CPD-E': 0,
      DH: 0,
      FR: 0,
    };
    for (const m of baseTab) {
      if (m.tipoVisado && c[m.tipoVisado] !== undefined) c[m.tipoVisado]++;
    }
    return c;
  }, [baseTab]);

  // Pipeline: búsqueda → pestaña (favoritos) → tipo de visado.
  const resultados = useMemo<SearchResult[]>(() => {
    let res = resultadosBusqueda;
    if (tab === 'favoritos') res = res.filter((r) => isFavorite(r.med.id));
    if (filtro !== 'TODOS') res = res.filter((r) => r.med.tipoVisado === filtro);
    return res;
  }, [resultadosBusqueda, tab, filtro, isFavorite]);

  const esListado = tab === 'medicamentos' || tab === 'favoritos';

  return (
    <div className="min-h-screen">
      <Header
        tab={tab}
        onTabChange={setTab}
        totalMedicamentos={ordenados.length}
        totalFavoritos={favCount}
      />

      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        {esListado ? (
          <>
            <div className="mb-5 space-y-4">
              <SearchBar
                value={query}
                onChange={setQuery}
                resultCount={resultados.length}
                mode={searchMode}
                onModeChange={setSearchMode}
              />
              <FilterBar activo={filtro} onChange={setFiltro} counts={counts} />
            </div>

            {tab === 'favoritos' && baseTab.length === 0 ? (
              <FavoritosVacio />
            ) : resultados.length === 0 ? (
              <EmptyState
                query={query}
                onReset={() => {
                  setQuery('');
                  setFiltro('TODOS');
                }}
              />
            ) : (
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {resultados.map(({ med, matchedIndicacion }) => (
                  <MedicationCard
                    key={med.id}
                    med={med}
                    onClick={() => setSeleccionado(med)}
                    isFavorite={isFavorite(med.id)}
                    onToggleFavorite={() => toggle(med.id)}
                    matchedIndicacion={matchedIndicacion}
                    query={query}
                  />
                ))}
              </div>
            )}
          </>
        ) : (
          <NedGuide />
        )}
      </main>

      <MedicationDetail
        med={seleccionado}
        onClose={() => setSeleccionado(null)}
        isFavorite={seleccionado ? isFavorite(seleccionado.id) : false}
        onToggleFavorite={seleccionado ? () => toggle(seleccionado.id) : undefined}
        query={tieneQuery ? query : undefined}
      />

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

function FavoritosVacio() {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-white py-16 text-center">
      <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-amber-50">
        <svg className="h-6 w-6 text-amber-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.562.562 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.562.562 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
        </svg>
      </div>
      <p className="text-sm font-medium text-slate-700">Aún no tienes favoritos</p>
      <p className="mt-1 max-w-sm text-sm text-slate-500">
        Marca la estrella ☆ en cualquier medicamento para guardarlo aquí y acceder a él rápidamente. Se guardan en este
        navegador.
      </p>
    </div>
  );
}
