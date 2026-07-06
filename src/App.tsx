import { useMemo, useState } from 'react';
import Fuse from 'fuse.js';
import { Medication, ActiveTab, SearchMode, SearchResult } from './types';
import { medications } from './data/medications';
import { useFavorites } from './hooks/useFavorites';
import { useTheme } from './hooks/useTheme';
import { prescCat, durCat, tipoKey } from './lib/filters';
import { Header } from './components/Header';
import { SearchBar } from './components/SearchBar';
import { FilterRail, FiltroTipo, FiltroPresc, FiltroDur } from './components/FilterRail';
import { MedicationTable, SortKey } from './components/MedicationTable';
import { MedicationDetail } from './components/MedicationDetail';
import { NedGuide } from './components/NedGuide';

const ordenados = [...medications].sort((a, b) => a.principioActivo.localeCompare(b.principioActivo, 'es'));
const medById = new Map(ordenados.map((m) => [m.id, m]));

const TIPO_ORDER: Record<string, number> = { CPD: 0, 'CPD-E': 1, DH: 2, FR: 3, NA: 4 };

function durOrder(duracion: string): number {
  if (durCat(duracion) === 'indef') return 100000;
  const n = duracion.match(/\d+/);
  return n ? parseInt(n[0], 10) : 99999;
}

export default function App() {
  const { theme, toggle: toggleTheme } = useTheme();
  const { isFavorite, toggle: toggleFav, count: favCount } = useFavorites();

  const [tab, setTab] = useState<ActiveTab>('medicamentos');
  const [query, setQuery] = useState('');
  const [searchMode, setSearchMode] = useState<SearchMode>('farmaco');
  const [filtroTipo, setFiltroTipo] = useState<FiltroTipo>('all');
  const [filtroPresc, setFiltroPresc] = useState<FiltroPresc>('all');
  const [filtroDur, setFiltroDur] = useState<FiltroDur>('all');
  const [sort, setSort] = useState<SortKey | null>(null);
  const [sortDir, setSortDir] = useState<1 | -1>(1);
  const [selectedId, setSelectedId] = useState<string | null>(null);

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

  const resultadosBusqueda = useMemo<SearchResult[]>(() => {
    if (!tieneQuery) return ordenados.map((med) => ({ med }));
    if (searchMode === 'indicacion') {
      return fuseIndicacion.search(query).map((r) => {
        const match = r.matches?.find((m) => m.key === 'indicaciones');
        const matchedIndicacion =
          match && typeof match.refIndex === 'number' ? r.item.indicaciones[match.refIndex] : r.item.indicaciones[0];
        return { med: r.item, matchedIndicacion };
      });
    }
    return fuseFarmaco.search(query).map((r) => ({ med: r.item }));
  }, [query, searchMode, tieneQuery, fuseFarmaco, fuseIndicacion]);

  // Universo = búsqueda + pestaña (para conteos del rail).
  const universo = useMemo<SearchResult[]>(
    () => (tab === 'favoritos' ? resultadosBusqueda.filter((r) => isFavorite(r.med.id)) : resultadosBusqueda),
    [resultadosBusqueda, tab, isFavorite]
  );

  const { countsTipo, countsPresc, countsDur } = useMemo(() => {
    const ct: Record<string, number> = { all: 0, CPD: 0, 'CPD-E': 0, DH: 0, FR: 0, NA: 0 };
    const cp: Record<string, number> = { all: 0, AP: 0, HOSP: 0, ESP: 0 };
    const cd: Record<string, number> = { all: 0, indef: 0, limit: 0 };
    for (const { med } of universo) {
      ct.all++; cp.all++; cd.all++;
      ct[tipoKey(med)]++;
      cp[prescCat(med.prescriptor)]++;
      cd[durCat(med.duracion)]++;
    }
    return { countsTipo: ct, countsPresc: cp, countsDur: cd };
  }, [universo]);

  const resultados = useMemo<SearchResult[]>(() => {
    let res = universo;
    if (filtroTipo !== 'all') res = res.filter((r) => tipoKey(r.med) === filtroTipo);
    if (filtroPresc !== 'all') res = res.filter((r) => prescCat(r.med.prescriptor) === filtroPresc);
    if (filtroDur !== 'all') res = res.filter((r) => durCat(r.med.duracion) === filtroDur);
    if (sort) {
      const d = sortDir;
      res = res.slice().sort((a, b) => {
        if (sort === 'name') return a.med.principioActivo.localeCompare(b.med.principioActivo, 'es') * d;
        if (sort === 'tipo') return (TIPO_ORDER[tipoKey(a.med)] - TIPO_ORDER[tipoKey(b.med)]) * d;
        if (sort === 'dur') return (durOrder(a.med.duracion) - durOrder(b.med.duracion)) * d;
        return 0;
      });
    }
    return res;
  }, [universo, filtroTipo, filtroPresc, filtroDur, sort, sortDir]);

  const onSort = (key: SortKey) => {
    if (sort === key) setSortDir((d) => (d === 1 ? -1 : 1));
    else {
      setSort(key);
      setSortDir(1);
    }
  };

  const seleccionado: Medication | null = selectedId ? medById.get(selectedId) ?? null : null;
  const detailOpen = seleccionado !== null && tab !== 'ned';

  return (
    <>
      <Header
        tab={tab}
        onTabChange={setTab}
        totalMedicamentos={ordenados.length}
        totalFavoritos={favCount}
        theme={theme}
        onToggleTheme={toggleTheme}
      />

      {tab === 'ned' ? (
        <main className="layout" style={{ gridTemplateColumns: 'minmax(0,1fr)' }}>
          <NedGuide />
        </main>
      ) : (
        <>
          <SearchBar
            value={query}
            onChange={setQuery}
            resultCount={resultados.length}
            total={ordenados.length}
            mode={searchMode}
            onModeChange={setSearchMode}
          />

          <main className={`layout${detailOpen ? ' detail-open' : ''}`}>
            <FilterRail
              tipo={filtroTipo}
              presc={filtroPresc}
              dur={filtroDur}
              onTipo={setFiltroTipo}
              onPresc={setFiltroPresc}
              onDur={setFiltroDur}
              countsTipo={countsTipo}
              countsPresc={countsPresc}
              countsDur={countsDur}
            />

            <MedicationTable
              results={resultados}
              selectedId={selectedId}
              onSelect={setSelectedId}
              isFavorite={isFavorite}
              onToggleFavorite={toggleFav}
              sort={sort}
              sortDir={sortDir}
              onSort={onSort}
              query={query}
              showMatched={tieneQuery && searchMode === 'indicacion'}
              tab={tab}
            />

            {detailOpen && seleccionado && (
              <aside className="detail">
                <MedicationDetail
                  med={seleccionado}
                  onClose={() => setSelectedId(null)}
                  isFavorite={isFavorite(seleccionado.id)}
                  onToggleFavorite={() => toggleFav(seleccionado.id)}
                  query={tieneQuery ? query : undefined}
                />
              </aside>
            )}
          </main>

          <div className="scrim" onClick={() => setSelectedId(null)} />
        </>
      )}

      <footer className="app-foot">
        <p>
          Datos basados en el documento «Medicamentos sujetos a condiciones restringidas de prescripción y/o
          dispensación» de larioja.org (act. 04/05/2026). Herramienta de consulta de apoyo; ante cualquier duda,
          consultar el documento oficial y la normativa vigente.
        </p>
      </footer>
    </>
  );
}
