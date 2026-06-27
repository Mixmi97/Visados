import { TipoVisado } from '../types';

export interface VisadoStyle {
  label: string;
  nombre: string;
  descripcion: string;
  badge: string; // clases para el badge
  dot: string; // color del punto/acento
  ring: string; // borde lateral de la tarjeta
  soft: string; // fondo suave para secciones
  text: string; // color de texto del acento
}

export const VISADO_STYLES: Record<string, VisadoStyle> = {
  CPD: {
    label: 'CPD',
    nombre: 'Cupón Precinto Diferenciado',
    descripcion:
      'Informe de prescripción y diagnóstico por médico especialista hospitalario del Servicio Riojano de Salud o médico de Atención Primaria, según determine la autoridad competente.',
    badge: 'bg-blue-100 text-blue-800 ring-1 ring-blue-200',
    dot: 'bg-blue-500',
    ring: 'border-l-blue-500',
    soft: 'bg-blue-50',
    text: 'text-blue-700',
  },
  'CPD-E': {
    label: 'CPD-E',
    nombre: 'Cupón Precinto Diferenciado-E (Mayores de 75 años)',
    descripcion:
      'Informe de prescripción y diagnóstico por médico especialista hospitalario del Servicio Riojano de Salud o médico de Atención Primaria. Visado solo en mayores de 75 años.',
    badge: 'bg-purple-100 text-purple-800 ring-1 ring-purple-200',
    dot: 'bg-purple-500',
    ring: 'border-l-purple-500',
    soft: 'bg-purple-50',
    text: 'text-purple-700',
  },
  DH: {
    label: 'DH',
    nombre: 'Diagnóstico Hospitalario',
    descripcion:
      'Informe de prescripción y diagnóstico por médico especialista hospitalario del Servicio Riojano de Salud que trata la patología para la que se prescribe.',
    badge: 'bg-amber-100 text-amber-800 ring-1 ring-amber-200',
    dot: 'bg-amber-500',
    ring: 'border-l-amber-500',
    soft: 'bg-amber-50',
    text: 'text-amber-700',
  },
  FR: {
    label: 'FR',
    nombre: 'Financiación Restringida a determinadas indicaciones',
    descripcion:
      'Informe de prescripción y diagnóstico por médico especialista del Servicio Riojano de Salud o médico de Atención Primaria, según determine la autoridad competente.',
    badge: 'bg-emerald-100 text-emerald-800 ring-1 ring-emerald-200',
    dot: 'bg-emerald-500',
    ring: 'border-l-emerald-500',
    soft: 'bg-emerald-50',
    text: 'text-emerald-700',
  },
  SIN: {
    label: 'Sin acrónimo',
    nombre: 'Sujeto a visado sin acrónimo específico',
    descripcion:
      'Producto sujeto a visado de la Inspección sin acrónimo de reserva singular asignado en el documento.',
    badge: 'bg-slate-100 text-slate-700 ring-1 ring-slate-200',
    dot: 'bg-slate-400',
    ring: 'border-l-slate-400',
    soft: 'bg-slate-50',
    text: 'text-slate-600',
  },
};

export function getVisadoStyle(tipo: TipoVisado): VisadoStyle {
  if (tipo && VISADO_STYLES[tipo]) return VISADO_STYLES[tipo];
  return VISADO_STYLES.SIN;
}
