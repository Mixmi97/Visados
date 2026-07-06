import { ActiveTab } from '../types';
import { Theme } from '../hooks/useTheme';

interface Props {
  tab: ActiveTab;
  onTabChange: (t: ActiveTab) => void;
  totalMedicamentos: number;
  totalFavoritos: number;
  theme: Theme;
  onToggleTheme: () => void;
}

export function Header({ tab, onTabChange, totalMedicamentos, totalFavoritos, theme, onToggleTheme }: Props) {
  return (
    <header className="app">
      <div className="head-top">
        <div className="brand">
          <span className="logo" aria-hidden="true">
            <svg viewBox="0 0 24 24">
              <path fill="#fff" d="M12 3.3 18.8 5.9 V12 C18.8 16.5 15.8 19.7 12 21.4 C8.2 19.7 5.2 16.5 5.2 12 V5.9 Z" />
              <path fill="none" stroke="#8a2b3d" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round" d="M8.7 12.2 11 14.5 15.4 9.7" />
            </svg>
          </span>
          <div className="brand-txt">
            <h1>
              Visados <span className="sep">·</span> La Rioja
            </h1>
            <p>Medicamentos sujetos a condiciones restringidas de prescripción y/o dispensación</p>
          </div>
        </div>
        <div className="head-actions">
          <span className="region-pill">
            <b>SERIS</b> · Servicio Riojano de Salud
          </span>
          <button
            className="theme-btn"
            onClick={onToggleTheme}
            title="Cambiar tema"
            aria-label={theme === 'dark' ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
          >
            {theme === 'dark' ? (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 14.5A8 8 0 1 1 9.5 4a6.3 6.3 0 0 0 10.5 10.5z" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                <circle cx="12" cy="12" r="4.2" />
                <path d="M12 2v2.5M12 19.5V22M4.2 4.2l1.8 1.8M18 18l1.8 1.8M2 12h2.5M19.5 12H22M4.2 19.8L6 18M18 6l1.8-1.8" />
              </svg>
            )}
          </button>
        </div>
      </div>
      <nav className="tabs" role="tablist" aria-label="Secciones">
        <button
          className="tab"
          role="tab"
          aria-selected={tab === 'medicamentos'}
          onClick={() => onTabChange('medicamentos')}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <rect x="3.5" y="4.5" width="17" height="15" rx="2" />
            <path d="M3.5 9.5h17M8.5 9.5v10" />
          </svg>
          Medicamentos <span className="cnt num">{totalMedicamentos}</span>
        </button>
        <button className="tab" role="tab" aria-selected={tab === 'favoritos'} onClick={() => onTabChange('favoritos')}>
          <svg viewBox="0 0 24 24" fill={totalFavoritos > 0 ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round">
            <path d="M12 3.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 16.9 6.8 19.6l1-5.8-4.3-4.1 5.9-.9z" />
          </svg>
          Favoritos <span className="cnt num">{totalFavoritos}</span>
        </button>
        <button className="tab" role="tab" aria-selected={tab === 'ned'} onClick={() => onTabChange('ned')}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
            <path d="M9 3.5h6M10 3.5v3.2L6.4 15a3 3 0 0 0 2.8 4.5h5.6A3 3 0 0 0 17.6 15L14 6.7V3.5" />
            <path d="M7.6 12.5h8.8" />
          </svg>
          Nutrición Enteral <span className="cnt">NED</span>
        </button>
      </nav>
    </header>
  );
}
