export interface NedCriterioGrupo {
  numero: number;
  titulo: string;
  descripcion?: string;
  items: { texto: string; subitems?: string[] }[];
  nota?: string;
}

export interface NedSeccion {
  titulo: string;
  parrafos: string[];
}

export const nedIntro: NedSeccion = {
  titulo: 'Nutrición Enteral Domiciliaria (NED)',
  parrafos: [
    'La prestación con productos dietéticos comprende la dispensación de los tratamientos dietoterápicos a personas con determinados trastornos metabólicos congénitos y la nutrición enteral domiciliaria para pacientes cuyas necesidades nutricionales no es posible cubrir, por su situación clínica, con alimentos de consumo ordinario. Está recogida en el Real Decreto 1030/2006 (ANEXO VII).',
    'Estas instrucciones solo afectan a tratamientos con Nutrición Enteral Domiciliaria (no a trastornos metabólicos congénitos).',
    'La NED comprende la administración de fórmulas enterales por vía digestiva, habitualmente mediante sonda (nasoentérica u ostomía), con el fin de evitar o corregir la desnutrición de los pacientes atendidos en su domicilio. Como norma general se entiende que se trata de fórmulas nutricionalmente completas para utilizarse como única fuente nutricional.',
    'La prescripción de productos dietéticos no está sujeta a limitaciones; el procedimiento de visado únicamente garantiza la financiación pública de los tratamientos que cumplen los requisitos de la normativa.',
  ],
};

export const nedCriterios: NedCriterioGrupo[] = [
  {
    numero: 1,
    titulo: 'Alteración mecánica de la deglución o del tránsito',
    descripcion:
      'Cursa con afagia o disfagia severa y precisa sonda (en caso excepcional de no utilizar sonda, especificar el motivo):',
    items: [
      { texto: 'Tumor de cabeza y cuello.' },
      { texto: 'Tumor de aparato digestivo (esófago, estómago).' },
      { texto: 'Cirugía ORL y maxilofacial.' },
      { texto: 'Estenosis esofágica no tumoral.' },
    ],
    nota: 'En estas situaciones se autorizará el visado aunque el paciente no utilice sonda, debiendo especificarse el motivo.',
  },
  {
    numero: 2,
    titulo: 'Trastorno neuromotor que impide la deglución o el tránsito y que precisa sonda',
    items: [
      {
        texto: 'Enfermedad neurológica que cursa con afagia o disfagia severa:',
        subitems: [
          'Esclerosis múltiple',
          'Esclerosis lateral amiotrófica',
          'Síndrome miasteniforme',
          'Síndrome de Guillain-Barré',
          'Secuelas de enfermedades infecciosas o traumáticas del SNC',
          'Retraso mental severo',
          'Proceso degenerativo severo del SNC (especificar)',
        ],
      },
      { texto: 'Accidente cerebrovascular.' },
      { texto: 'Tumor cerebral.' },
      { texto: 'Parálisis cerebral.' },
      { texto: 'Coma neurológico.' },
      {
        texto: 'Trastorno severo de la motilidad intestinal:',
        subitems: ['Pseudoobstrucción intestinal', 'Gastroparesia diabética'],
      },
    ],
    nota: 'En estas situaciones el uso de sonda condicionará la autorización del visado (salvo en las excepciones que se indican posteriormente).',
  },
  {
    numero: 3,
    titulo: 'Paciente con requerimientos especiales de energía y/o nutrientes',
    items: [
      {
        texto: 'Síndrome de malabsorción severa:',
        subitems: [
          'Síndrome de intestino corto severo',
          'Diarrea intratable de origen autoinmune',
          'Linfoma',
          'Esteatorrea posgastrectomía',
          'Carcinoma de páncreas',
          'Resección amplia pancreática',
          'Insuficiencia vascular mesentérica',
          'Amiloidosis',
          'Esclerodermia',
          'Enteritis eosinofílica',
        ],
      },
      {
        texto: 'Enfermedad neurológica subsidiaria de ser tratada con dietas cetogénicas:',
        subitems: [
          'Epilepsia refractaria en niños',
          'Epilepsia refractaria en adultos siempre bajo supervisión por el Sº de endocrinología y nutrición',
          'Deficiencia del transportador tipo I de la Glucosa',
          'Deficiencia del complejo de la piruvato-deshidrogenasa',
        ],
      },
      { texto: 'Intolerancia o alergia diagnosticada a proteínas de leche de vaca en lactantes hasta 2 años con compromiso nutricional.' },
      { texto: 'Paciente desnutrido que va a ser sometido a cirugía mayor programada o trasplante.' },
      { texto: 'Paciente con encefalopatía hepática crónica con intolerancia a las proteínas de la dieta.' },
      { texto: 'Paciente con adrenoleucodistrofia ligada al cromosoma X, neurológicamente asintomático.' },
    ],
    nota: 'En estas situaciones procede autorizar el visado de tratamiento con módulos o suplementos nutricionales, no precisando tratarse de una dieta enteral completa.',
  },
  {
    numero: 4,
    titulo: 'Situación clínica que cursa con desnutrición severa',
    items: [
      {
        texto: 'Enfermedad inflamatoria intestinal:',
        subitems: ['Colitis ulcerosa', 'Enfermedad de Crohn'],
      },
      { texto: 'Caquexia cancerosa por enteritis crónica por tratamiento quimio y/o radioterápico.' },
      { texto: 'Patología médica infecciosa que comporta malabsorción severa: SIDA.' },
      { texto: 'Fibrosis quística.' },
      { texto: 'Fístulas enterocutáneas de bajo débito.' },
      { texto: 'Insuficiencia renal infantil que compromete el crecimiento del paciente.' },
    ],
    nota: 'En estas patologías la situación clínica debe cursar con "desnutrición severa". No se aceptará el visado para "desnutrición leve/moderada" ni "riesgo de nutrición".',
  },
];

export const nedValidez: string[] = [
  'La duración de la autorización de visado será por norma general de 6 meses, salvo:',
  'Que expresamente se indique un tiempo inferior.',
  'Pacientes portadores de una "sonda de alimentación permanente" y ELA avanzada (aún sin sonda), que será de carácter indefinido.',
  'Cuando esté previsto una duración del tratamiento con fecha de revisión médica superior a dicho plazo, dentro de un margen prudencial, debiendo constar dicha fecha en la solicitud.',
];

export const nedExcepciones: string[] = [
  'Insuficiencia renal crónica en hemodiálisis.',
  'ELA avanzada aunque no sea portador de sonda.',
  'Esclerosis múltiple avanzada aunque no sea portador de sonda.',
  'Enfermedad de Steinert avanzada aunque no sea portador de sonda.',
  'Parkinson avanzado aunque no sea portador de sonda.',
  'Procesos oncológicos activos.',
  'Todos los tratamientos de duración determinada prescritos desde el Sº de Endocrinología y nutrición que no se ajusten a los criterios diagnósticos de visado, siempre que estén debidamente justificados y se indiquen para un periodo ≤ 3 meses.',
];

export const nedContacto =
  'Cuando desde el Sº de Endocrinología y nutrición se considere que procede el visado fuera de las indicaciones establecidas y por un periodo superior a tres meses, se remitirá a Inspección Médica un informe justificativo a través del correo: visados_logrono@riojasalud.es. No procede tramitar la solicitud por receta electrónica de SELENE mientras no se haya concedido su autorización.';
