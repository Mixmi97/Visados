import { useState } from 'react';

export type FiltroTipo = 'all' | 'CPD' | 'CPD-E' | 'DH' | 'FR' | 'NA';
export type FiltroPresc = 'all' | 'AP' | 'HOSP' | 'ESP';
export type FiltroDur = 'all' | 'indef' | 'limit';

interface Props {
  tipo: FiltroTipo;
  presc: FiltroPresc;
  dur: FiltroDur;
  onTipo: (v: FiltroTipo) => void;
  onPresc: (v: FiltroPresc) => void;
  onDur: (v: FiltroDur) => void;
  countsTipo: Record<string, number>;
  countsPresc: Record<string, number>;
  countsDur: Record<string, number>;
}

const TIPOS: { val: FiltroTipo; label: string; sub?: string; dot: string }[] = [
  { val: 'all', label: 'Todos', dot: 'var(--faint)' },
  { val: 'CPD', label: 'CPD', sub: 'Cupón Precinto Diferenciado', dot: 'var(--cpd-dot)' },
  { val: 'CPD-E', label: 'CPD-E', sub: 'CPD · pacientes ≥ 75 años', dot: 'var(--cpde-dot)' },
  { val: 'DH', label: 'DH', sub: 'Diagnóstico Hospitalario', dot: 'var(--dh-dot)' },
  { val: 'FR', label: 'FR', sub: 'Financiación Restringida', dot: 'var(--fr-dot)' },
  { val: 'NA', label: 'Sin acrónimo', sub: 'Otras condiciones', dot: 'var(--na-dot)' },
];

const PRESCS: { val: FiltroPresc; label: string }[] = [
  { val: 'all', label: 'Cualquiera' },
  { val: 'AP', label: 'Incluye At. Primaria' },
  { val: 'HOSP', label: 'Solo hospitalario' },
  { val: 'ESP', label: 'Especialista concreto' },
];

const DURS: { val: FiltroDur; label: string }[] = [
  { val: 'all', label: 'Cualquiera' },
  { val: 'indef', label: 'Indefinida' },
  { val: 'limit', label: 'Con límite temporal' },
];

export function FilterRail({
  tipo,
  presc,
  dur,
  onTipo,
  onPresc,
  onDur,
  countsTipo,
  countsPresc,
  countsDur,
}: Props) {
  const [open, setOpen] = useState(false);

  return (
    <aside className="rail">
      <div className={`rail-card filters${open ? ' open' : ''}${tipo !== 'all' ? ' dirty' : ''}`}>
        <button className="rail-toggle" aria-expanded={open} onClick={() => setOpen((o) => !o)}>
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
            <path d="M4 6h16M7 12h10M10 18h4" />
          </svg>
          Filtros
          <svg className="chev" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M6 9l6 6 6-6" />
          </svg>
        </button>
        <div className="rail-head">
          <h2>Tipo de visado</h2>
          <button className="reset" onClick={() => onTipo('all')}>
            Limpiar
          </button>
        </div>
        <div className="filter-list">
          {TIPOS.map((t) => (
            <button
              key={t.val}
              className="filter"
              aria-pressed={tipo === t.val}
              style={{ ['--dot' as string]: t.dot }}
              onClick={() => onTipo(t.val)}
            >
              <span className="dot" style={{ background: t.dot }} />
              <span className="lbl">
                {t.label}
                {t.sub && <small>{t.sub}</small>}
              </span>
              <span className="cnt num">{countsTipo[t.val] ?? 0}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="rail-card">
        <div className="rail-head">
          <h2>Prescriptor</h2>
        </div>
        <div className="filter-list">
          {PRESCS.map((p) => (
            <button key={p.val} className="filter" aria-pressed={presc === p.val} onClick={() => onPresc(p.val)}>
              <span className="lbl">{p.label}</span>
              <span className="cnt num">{countsPresc[p.val] ?? 0}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="rail-card">
        <div className="rail-head">
          <h2>Duración</h2>
        </div>
        <div className="filter-list">
          {DURS.map((d) => (
            <button key={d.val} className="filter" aria-pressed={dur === d.val} onClick={() => onDur(d.val)}>
              <span className="lbl">{d.label}</span>
              <span className="cnt num">{countsDur[d.val] ?? 0}</span>
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
}
