import { Medication } from '../types';

/** Categorías de prescriptor derivadas del texto libre (heurística). */
export type PrescCat = 'AP' | 'HOSP' | 'ESP';
/** Categorías de duración. */
export type DurCat = 'indef' | 'limit';

const RE_AP = /atenci[oó]n primaria/i;
const RE_ESPECIALIDAD =
  /(dermatolog|ginecolog|urolog|nefrolog|neurolog|cardiolog|psiquiatr|oncolog|endocrin|reumatolog|alergolog|digestiv|hematolog|traumatolog|neuropediatr|pediatr|neumolog|oftalmolog|geriatr|medicina interna|internista|paliativ|matrona|planificaci[oó]n familiar|fertilidad)/i;

/**
 * Clasifica el prescriptor:
 * - AP  → menciona Atención Primaria (junto a hospitalario o no).
 * - ESP → especialista de una especialidad concreta (sin Atención Primaria).
 * - HOSP→ especialista hospitalario genérico "que trata la patología".
 */
export function prescCat(prescriptor: string): PrescCat {
  if (RE_AP.test(prescriptor)) return 'AP';
  if (RE_ESPECIALIDAD.test(prescriptor)) return 'ESP';
  return 'HOSP';
}

export function durCat(duracion: string): DurCat {
  return /indefinid/i.test(duracion) ? 'indef' : 'limit';
}

/** Clave de tipo de visado para conteos/badges ('NA' cuando no hay acrónimo). */
export function tipoKey(med: Medication): string {
  return med.tipoVisado ?? 'NA';
}
