# Visados · La Rioja

Aplicación web para consultar de forma ágil y visual las **condiciones de visado** de los
medicamentos sujetos a condiciones restringidas de prescripción y/o dispensación en el
Sistema Sanitario Público de La Rioja.

Permite comprobar rápidamente, para cada fármaco:

- **Tipo de visado** (CPD, CPD-E, DH, FR) con código de color.
- **Quién debe prescribir / solicitar** el visado.
- **Duración** de la autorización.
- **Indicaciones aprobadas** en las que se cumplen los requisitos.
- **Criterios a valorar** por la Inspección para su validación.

Incluye además una sección dedicada a la **Nutrición Enteral Domiciliaria (NED)** con los
criterios de visado, validez y excepciones.

> Datos basados en el documento *«Medicamentos sujetos a condiciones restringidas de
> prescripción y/o dispensación»* de larioja.org (actualización 04/05/2026). Herramienta de
> consulta de apoyo; ante cualquier duda, consultar el documento oficial y la normativa vigente.

## Tipos de visado

| Acrónimo | Significado | Prescriptor |
|----------|-------------|-------------|
| **CPD** | Cupón Precinto Diferenciado | Especialista hospitalario o Atención Primaria |
| **CPD-E** | Cupón Precinto Diferenciado-E | Igual que CPD, **solo en mayores de 75 años** |
| **DH** | Diagnóstico Hospitalario | Solo especialista hospitalario que trata la patología |
| **FR** | Financiación Restringida | Especialista o Atención Primaria, indicaciones concretas |

## Stack

- React 18 + TypeScript
- Vite
- Tailwind CSS
- Fuse.js (búsqueda difusa, tolerante a acentos)

Todos los datos van embebidos en el cliente (`src/data/`): no requiere backend y funciona offline.

## Desarrollo

```bash
npm install
npm run dev      # servidor de desarrollo
npm run build    # build de producción en dist/
npm run preview  # previsualizar el build
```

## Estructura

```
src/
├── App.tsx                 # estado, búsqueda y filtros
├── types/index.ts          # modelo de datos
├── data/
│   ├── medications.ts       # ~166 entradas de medicamentos
│   └── ned.ts               # criterios de Nutrición Enteral Domiciliaria
└── components/
    ├── Header.tsx
    ├── SearchBar.tsx
    ├── FilterBar.tsx
    ├── MedicationCard.tsx
    ├── MedicationDetail.tsx
    ├── BadgeVisado.tsx
    ├── NedGuide.tsx
    └── visadoConfig.ts      # colores y descripciones por tipo de visado
```
