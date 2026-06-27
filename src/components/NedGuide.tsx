import { nedIntro, nedCriterios, nedValidez, nedExcepciones, nedContacto } from '../data/ned';

const GRUPO_COLORS = [
  'border-l-blue-500 bg-blue-50/50',
  'border-l-purple-500 bg-purple-50/50',
  'border-l-amber-500 bg-amber-50/50',
  'border-l-emerald-500 bg-emerald-50/50',
];

const GRUPO_NUM_COLORS = [
  'bg-blue-500',
  'bg-purple-500',
  'bg-amber-500',
  'bg-emerald-500',
];

export function NedGuide() {
  return (
    <div className="mx-auto max-w-4xl space-y-8">
      {/* Intro */}
      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
          <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Actualización mayo 2021
        </div>
        <h2 className="text-xl font-bold text-slate-900">{nedIntro.titulo}</h2>
        <div className="mt-3 space-y-3">
          {nedIntro.parrafos.map((p, i) => (
            <p key={i} className="text-sm leading-relaxed text-slate-600">
              {p}
            </p>
          ))}
        </div>
      </section>

      {/* Criterios de visado */}
      <section>
        <h3 className="mb-1 text-lg font-bold text-slate-900">Criterios de visado</h3>
        <p className="mb-4 text-sm text-slate-500">
          Grupos de patologías según la normativa seguidos por Inspección Médica.
        </p>
        <div className="space-y-4">
          {nedCriterios.map((grupo, idx) => (
            <div
              key={grupo.numero}
              className={`rounded-xl border border-slate-200 border-l-4 p-5 shadow-sm ${GRUPO_COLORS[idx % 4]}`}
            >
              <div className="flex items-start gap-3">
                <span className={`flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg text-sm font-bold text-white ${GRUPO_NUM_COLORS[idx % 4]}`}>
                  {grupo.numero}
                </span>
                <div className="flex-1">
                  <h4 className="text-[15px] font-semibold text-slate-800">{grupo.titulo}</h4>
                  {grupo.descripcion && (
                    <p className="mt-1 text-sm text-slate-600">{grupo.descripcion}</p>
                  )}
                  <ul className="mt-3 space-y-2">
                    {grupo.items.map((item, i) => (
                      <li key={i} className="text-sm text-slate-700">
                        <div className="flex gap-2">
                          <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-slate-400" />
                          <span className="font-medium">{item.texto}</span>
                        </div>
                        {item.subitems && (
                          <ul className="ml-5 mt-1.5 flex flex-wrap gap-1.5">
                            {item.subitems.map((s) => (
                              <li
                                key={s}
                                className="rounded-md bg-white px-2 py-0.5 text-[12px] text-slate-600 ring-1 ring-slate-200"
                              >
                                {s}
                              </li>
                            ))}
                          </ul>
                        )}
                      </li>
                    ))}
                  </ul>
                  {grupo.nota && (
                    <p className="mt-3 rounded-lg bg-white/70 p-2.5 text-xs italic leading-relaxed text-slate-500 ring-1 ring-slate-100">
                      {grupo.nota}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Validez y excepciones */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <h3 className="mb-3 flex items-center gap-2 text-base font-bold text-slate-900">
            <svg className="h-4 w-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Validez del visado
          </h3>
          <ul className="space-y-2">
            {nedValidez.map((v, i) => (
              <li key={i} className={`text-sm leading-relaxed ${i === 0 ? 'font-medium text-slate-700' : 'text-slate-600'}`}>
                {i === 0 ? (
                  v
                ) : (
                  <span className="flex gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-slate-400" />
                    {v}
                  </span>
                )}
              </li>
            ))}
          </ul>
        </section>

        <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <h3 className="mb-3 flex items-center gap-2 text-base font-bold text-slate-900">
            <svg className="h-4 w-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01M5.07 19H19a2 2 0 001.75-2.96l-7-12a2 2 0 00-3.5 0l-7 12A2 2 0 005.07 19z" />
            </svg>
            Excepciones (se autorizan aun sin sonda)
          </h3>
          <ul className="space-y-2">
            {nedExcepciones.map((e, i) => (
              <li key={i} className="flex gap-2 text-sm leading-relaxed text-slate-600">
                <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-emerald-400" />
                {e}
              </li>
            ))}
          </ul>
        </section>
      </div>

      {/* Contacto */}
      <section className="rounded-xl border border-blue-100 bg-blue-50 p-5">
        <h3 className="mb-2 text-sm font-bold text-blue-900">Tramitación excepcional</h3>
        <p className="text-sm leading-relaxed text-blue-800">{nedContacto}</p>
        <a
          href="mailto:visados_logrono@riojasalud.es"
          className="mt-3 inline-flex items-center gap-1.5 rounded-lg bg-blue-600 px-3 py-1.5 text-sm font-medium text-white transition hover:bg-blue-700"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          visados_logrono@riojasalud.es
        </a>
      </section>
    </div>
  );
}
