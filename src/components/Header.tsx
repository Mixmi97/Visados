import { ActiveTab } from '../types';

interface Props {
  tab: ActiveTab;
  onTabChange: (t: ActiveTab) => void;
  totalMedicamentos: number;
  totalFavoritos: number;
}

export function Header({ tab, onTabChange, totalMedicamentos, totalFavoritos }: Props) {
  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-3 py-3.5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-blue-500 text-white shadow-sm">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div>
              <h1 className="text-base font-bold leading-tight text-slate-900 sm:text-lg">
                Visados <span className="font-normal text-slate-400">·</span> La Rioja
              </h1>
              <p className="text-xs text-slate-500">
                Medicamentos sujetos a condiciones restringidas de prescripción y/o dispensación
              </p>
            </div>
          </div>

          <nav className="flex items-center gap-1 rounded-xl bg-slate-100 p-1">
            <TabButton active={tab === 'medicamentos'} onClick={() => onTabChange('medicamentos')}>
              Medicamentos
              <span className="ml-1.5 rounded-md bg-white/70 px-1.5 py-0.5 text-[11px] font-semibold text-slate-500">
                {totalMedicamentos}
              </span>
            </TabButton>
            <TabButton active={tab === 'favoritos'} onClick={() => onTabChange('favoritos')}>
              <svg
                className={`h-3.5 w-3.5 ${tab === 'favoritos' ? 'text-amber-400' : 'text-slate-400'}`}
                viewBox="0 0 24 24"
                fill={totalFavoritos > 0 ? 'currentColor' : 'none'}
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.562.562 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.562.562 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
              </svg>
              Favoritos
              {totalFavoritos > 0 && (
                <span className="ml-1 rounded-md bg-white/70 px-1.5 py-0.5 text-[11px] font-semibold text-slate-500">
                  {totalFavoritos}
                </span>
              )}
            </TabButton>
            <TabButton active={tab === 'ned'} onClick={() => onTabChange('ned')}>
              Nutrición Enteral (NED)
            </TabButton>
          </nav>
        </div>
      </div>
    </header>
  );
}

function TabButton({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium transition ${
        active ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'
      }`}
    >
      {children}
    </button>
  );
}
