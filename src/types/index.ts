export type TipoVisado = 'CPD' | 'CPD-E' | 'DH' | 'FR' | null;

export interface Medication {
  id: string;
  principioActivo: string;
  tipoVisado: TipoVisado;
  soloMayores75: boolean;
  presentaciones: string[];
  indicaciones: string[];
  criteriosValidacion: string[];
  prescriptor: string;
  duracion: string;
  notas?: string;
}

export type ActiveTab = 'medicamentos' | 'favoritos' | 'ned';

export type SearchMode = 'farmaco' | 'indicacion';

export interface FilterState {
  tipoVisado: TipoVisado | 'TODOS';
  search: string;
}

/** Resultado de búsqueda; en modo "indicacion" incluye la indicación que coincidió. */
export interface SearchResult {
  med: Medication;
  matchedIndicacion?: string;
}
