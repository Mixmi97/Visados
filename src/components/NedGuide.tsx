import { nedIntro, nedCriterios, nedValidez, nedExcepciones, nedContacto } from '../data/ned';

const GRUPO_COLORS = ['var(--cpd-dot)', 'var(--cpde-dot)', 'var(--dh-dot)', 'var(--fr-dot)'];

export function NedGuide() {
  return (
    <div className="ned">
      {/* Intro */}
      <section className="ned-card">
        <span className="ned-eyebrow">
          <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <circle cx="12" cy="12" r="9" />
            <path d="M12 8h.01M11 12h1v4h1" />
          </svg>
          Actualización mayo 2021
        </span>
        <h2>{nedIntro.titulo}</h2>
        {nedIntro.parrafos.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </section>

      {/* Criterios de visado */}
      <section>
        <h3 className="ned-section-title" style={{ fontSize: '15px', textTransform: 'none', letterSpacing: 0, color: 'var(--ink)', fontWeight: 720 }}>
          Criterios de visado
        </h3>
        <p className="ned-sub">Grupos de patologías según la normativa seguidos por Inspección Médica.</p>
        <div className="ned-groups">
          {nedCriterios.map((grupo, idx) => (
            <div key={grupo.numero} className="ned-group" style={{ ['--gcol' as string]: GRUPO_COLORS[idx % 4] }}>
              <div className="ned-group-head">
                <span className="ned-num">{grupo.numero}</span>
                <div style={{ minWidth: 0 }}>
                  <h4>{grupo.titulo}</h4>
                  {grupo.descripcion && <p className="desc">{grupo.descripcion}</p>}
                </div>
              </div>
              <ul className="ned-items">
                {grupo.items.map((item, i) => (
                  <li key={i} className="ned-item">
                    <div className="ned-item-row">
                      <span className="b" />
                      <span className="t">{item.texto}</span>
                    </div>
                    {item.subitems && (
                      <ul className="ned-chips">
                        {item.subitems.map((s) => (
                          <li key={s}>{s}</li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
              {grupo.nota && <p className="ned-note">{grupo.nota}</p>}
            </div>
          ))}
        </div>
      </section>

      {/* Validez y excepciones */}
      <div className="ned-two">
        <section className="ned-card">
          <h3>Validez del visado</h3>
          <ul className="ned-list">
            {nedValidez.map((v, i) => (
              <li key={i} className={i === 0 ? 'lead' : undefined}>
                {v}
              </li>
            ))}
          </ul>
        </section>
        <section className="ned-card">
          <h3>Excepciones (se autorizan aun sin sonda)</h3>
          <ul className="ned-list ok">
            {nedExcepciones.map((e, i) => (
              <li key={i}>{e}</li>
            ))}
          </ul>
        </section>
      </div>

      {/* Contacto */}
      <section className="ned-contact">
        <h3>Tramitación excepcional</h3>
        <p>{nedContacto}</p>
        <a className="ned-mail" href="mailto:visados_logrono@riojasalud.es">
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          visados_logrono@riojasalud.es
        </a>
      </section>
    </div>
  );
}
