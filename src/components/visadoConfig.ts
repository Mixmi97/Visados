import { TipoVisado } from '../types';

export interface VisadoInfo {
  key: string; // CPD | CPD-E | DH | FR | NA
  label: string; // etiqueta corta del badge
  nombre: string; // nombre completo
  badgeClass: string; // clase CSS del badge (.b-cpd, ...)
  dotVar: string; // variable CSS del punto de color
  descripcion: string;
}

export const VISADO_INFO: Record<string, VisadoInfo> = {
  CPD: {
    key: 'CPD',
    label: 'CPD',
    nombre: 'Cupón Precinto Diferenciado',
    badgeClass: 'b-cpd',
    dotVar: 'var(--cpd-dot)',
    descripcion:
      'Informe de prescripción y diagnóstico por médico especialista hospitalario del Servicio Riojano de Salud o médico de Atención Primaria, según determine la autoridad competente.',
  },
  'CPD-E': {
    key: 'CPD-E',
    label: 'CPD-E',
    nombre: 'CPD para mayores de 75 años',
    badgeClass: 'b-cpde',
    dotVar: 'var(--cpde-dot)',
    descripcion:
      'Informe de prescripción y diagnóstico por médico especialista hospitalario del Servicio Riojano de Salud o médico de Atención Primaria. Visado solo en mayores de 75 años.',
  },
  DH: {
    key: 'DH',
    label: 'DH',
    nombre: 'Diagnóstico Hospitalario',
    badgeClass: 'b-dh',
    dotVar: 'var(--dh-dot)',
    descripcion:
      'Informe de prescripción y diagnóstico por médico especialista hospitalario del Servicio Riojano de Salud que trata la patología para la que se prescribe.',
  },
  FR: {
    key: 'FR',
    label: 'FR',
    nombre: 'Financiación Restringida a determinadas indicaciones',
    badgeClass: 'b-fr',
    dotVar: 'var(--fr-dot)',
    descripcion:
      'Informe de prescripción y diagnóstico por médico especialista del Servicio Riojano de Salud o médico de Atención Primaria, según determine la autoridad competente.',
  },
  NA: {
    key: 'NA',
    label: 'Sin acrónimo',
    nombre: 'Sujeto a visado sin acrónimo específico',
    badgeClass: 'b-na',
    dotVar: 'var(--na-dot)',
    descripcion:
      'Producto sujeto a visado de la Inspección sin acrónimo de reserva singular asignado en el documento.',
  },
};

export function getVisadoInfo(tipo: TipoVisado): VisadoInfo {
  if (tipo && VISADO_INFO[tipo]) return VISADO_INFO[tipo];
  return VISADO_INFO.NA;
}
