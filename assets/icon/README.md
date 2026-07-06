# Icono de la app

Escudo con check sobre el granate de Rioja (`#8a2b3d → #a0334a`), el mismo símbolo
que aparece en la pantalla de acceso de la versión protegida. Es también el favicon
de la pestaña del navegador (embebido en `index.html`).

## Archivos

- `icon.svg` — diseño vectorial fuente (1024×1024).
- `Visados-icono-1024.png` — PNG de alta resolución.
- `Visados-icono.icns` — icono para macOS.
- `Visados-icono.ico` — icono multitamaño para Windows.

## Ponerlo en el archivo (macOS)

Selecciona `Visados-La-Rioja.html` → **Cmd+I** (Obtener información) → arrastra
`Visados-icono-1024.png` sobre el icono pequeño de la esquina superior izquierda de
esa ventana (o abre el `.icns`, cópialo con **Cmd+C** y pégalo con **Cmd+V** sobre él).

## Regenerar

Los PNG se rasterizan desde `icon.svg` con `render-icon.mjs` (Playwright/Chromium) y
se empaquetan en `.ico`/`.icns` con `pack-icons.mjs`.
