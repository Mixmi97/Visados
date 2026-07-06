import { SearchResult, ActiveTab } from '../types';
import { BadgeVisado } from './BadgeVisado';
import { Highlight } from './highlight';
import { durCat } from '../lib/filters';

export type SortKey = 'name' | 'tipo' | 'dur';

interface Props {
  results: SearchResult[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  isFavorite: (id: string) => boolean;
  onToggleFavorite: (id: string) => void;
  sort: SortKey | null;
  sortDir: 1 | -1;
  onSort: (key: SortKey) => void;
  query: string;
  showMatched: boolean;
  tab: ActiveTab;
}

const StarIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round">
    <path d="M12 3.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 16.9 6.8 19.6l1-5.8-4.3-4.1 5.9-.9z" />
  </svg>
);

function ariaSort(active: boolean, dir: 1 | -1): 'ascending' | 'descending' | undefined {
  if (!active) return undefined;
  return dir === 1 ? 'ascending' : 'descending';
}

export function MedicationTable({
  results,
  selectedId,
  onSelect,
  isFavorite,
  onToggleFavorite,
  sort,
  sortDir,
  onSort,
  query,
  showMatched,
  tab,
}: Props) {
  return (
    <section className="table-wrap">
      <div className="table-scroll">
        <table className="meds" aria-label="Listado de medicamentos con visado">
          <thead>
            <tr>
              <th className="c-star" scope="col" aria-label="Favorito">
                ★
              </th>
              <th
                className="c-pa sortable"
                scope="col"
                aria-sort={ariaSort(sort === 'name', sortDir)}
                onClick={() => onSort('name')}
              >
                Principio activo <span className="arw" />
              </th>
              <th
                className="c-tipo sortable"
                scope="col"
                aria-sort={ariaSort(sort === 'tipo', sortDir)}
                onClick={() => onSort('tipo')}
              >
                Visado <span className="arw" />
              </th>
              <th className="c-presc" scope="col">
                Prescriptor
              </th>
              <th
                className="c-dur sortable"
                scope="col"
                aria-sort={ariaSort(sort === 'dur', sortDir)}
                onClick={() => onSort('dur')}
              >
                Duración <span className="arw" />
              </th>
            </tr>
          </thead>
          <tbody>
            {results.length === 0 ? (
              <tr>
                <td colSpan={5}>
                  <div className="empty">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
                      <circle cx="11" cy="11" r="7" />
                      <path d="M20 20l-3.5-3.5" />
                    </svg>
                    <b>Sin resultados</b>
                    {tab === 'favoritos'
                      ? 'No has marcado favoritos todavía. Pulsa la estrella de cualquier fila.'
                      : 'No hay medicamentos que coincidan con la búsqueda y los filtros.'}
                  </div>
                </td>
              </tr>
            ) : (
              results.map(({ med, matchedIndicacion }) => {
                const fav = isFavorite(med.id);
                const indef = durCat(med.duracion) === 'indef';
                return (
                  <tr
                    key={med.id}
                    className={med.id === selectedId ? 'sel' : undefined}
                    onClick={() => onSelect(med.id)}
                  >
                    <td className="c-star">
                      <button
                        className={`star${fav ? ' on' : ''}`}
                        title={fav ? 'Quitar de favoritos' : 'Añadir a favoritos'}
                        aria-label={fav ? 'Quitar de favoritos' : 'Añadir a favoritos'}
                        aria-pressed={fav}
                        onClick={(e) => {
                          e.stopPropagation();
                          onToggleFavorite(med.id);
                        }}
                      >
                        <StarIcon />
                      </button>
                    </td>
                    <td className="c-pa">
                      <div className="pa">
                        <span className="name">
                          {showMatched ? med.principioActivo : <Highlight text={med.principioActivo} query={query} />}
                        </span>
                        {showMatched && matchedIndicacion ? (
                          <span className="matched">
                            <Highlight text={matchedIndicacion} query={query} />
                          </span>
                        ) : (
                          <span className="brands">{med.presentaciones.join(' · ')}</span>
                        )}
                      </div>
                    </td>
                    <td className="c-tipo">
                      <BadgeVisado tipo={med.tipoVisado} soloMayores75={med.soloMayores75} />
                    </td>
                    <td className="c-presc">
                      <span className="presc">{med.prescriptor}</span>
                    </td>
                    <td className="c-dur">
                      <span className={`dur${indef ? ' indef' : ''}`}>{med.duracion}</span>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
