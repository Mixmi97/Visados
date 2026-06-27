import { Fragment, ReactNode } from 'react';

/** Quita diacríticos y pasa a minúsculas (igual criterio que Fuse con ignoreDiacritics). */
function normalize(s: string): string {
  return s.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
}

/**
 * Resalta los tokens de `query` dentro de `text` de forma insensible a
 * acentos y mayúsculas, envolviendo las coincidencias en <mark>.
 * El resaltado se hace sobre el texto original (conserva acentos/mayúsculas).
 */
export function Highlight({ text, query }: { text: string; query: string }): ReactNode {
  const tokens = query
    .split(/\s+/)
    .map((t) => t.trim())
    .filter((t) => t.length >= 2);

  if (tokens.length === 0) return text;

  const normText = normalize(text);
  // Marca qué posiciones del texto están dentro de una coincidencia.
  const hits = new Array<boolean>(text.length).fill(false);
  let found = false;

  for (const token of tokens) {
    const normToken = normalize(token);
    if (!normToken) continue;
    let from = 0;
    let idx = normText.indexOf(normToken, from);
    while (idx !== -1) {
      found = true;
      for (let i = idx; i < idx + normToken.length && i < hits.length; i++) hits[i] = true;
      from = idx + normToken.length;
      idx = normText.indexOf(normToken, from);
    }
  }

  if (!found) return text;

  // Construye segmentos contiguos resaltados / no resaltados.
  const parts: { text: string; hit: boolean }[] = [];
  let buf = '';
  let bufHit = hits[0];
  for (let i = 0; i < text.length; i++) {
    if (hits[i] === bufHit) {
      buf += text[i];
    } else {
      parts.push({ text: buf, hit: bufHit });
      buf = text[i];
      bufHit = hits[i];
    }
  }
  if (buf) parts.push({ text: buf, hit: bufHit });

  return (
    <>
      {parts.map((p, i) =>
        p.hit ? (
          <mark key={i} className="rounded bg-yellow-200/80 px-0.5 text-slate-900">
            {p.text}
          </mark>
        ) : (
          <Fragment key={i}>{p.text}</Fragment>
        )
      )}
    </>
  );
}
