# PruebaTecnicaAngular

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 20.3.13.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

**Prueba Técnica — Aplicación Angular (standalone components)**

Resumen
- Este repo es una implementación de la prueba técnica solicitada: una pequeña aplicación en Angular 20 que muestra un calendario mensual, gestión de "sesiones" (CRUD con datos mock), autenticación simulada y un panel de administración.
- He seguido las restricciones del enunciado: todo el backend está simulado (datos en memoria o en `/assets/mock`), la sesión se persiste con un token simulado en `localStorage`, y las rutas y acciones están protegidas mediante guards.

Decisiones clave
- Angular 20 con componentes `standalone` para simplificar la estructura y reducir boilerplate.
- PrimeNG se ha usado principalmente para la gestión de inputs y modales (Selects, DatePicker, FileUpload, Dialog/ConfirmDialog y Toast). Su objetivo fue acelerar la interfaz, accesibilidad y consistencia en formularios y overlays.
- Autorización: `AuthGuard` controla acceso autenticado; `AdminGuard` comprueba además el rol `admin`. Hay una regla extra: sólo administradores de la misma ciudad pueden eliminar sesiones (se implementó en el servicio de calendario).
- Estilos: SCSS con variables globales y uso de clases BEM-like para mantener consistencia. Los colores semánticos están centralizados en `src/styles/_variables.scss`.

Estructura relevante
- `src/app/features/calendar/` — Vista del calendario, helpers y estilos.
- `src/app/features/admin/` — Mini dashboard de administración que abre la modal de creación/edición.
- `src/app/features/calendar/modals/` — Modal para crear/editar sesiones con carga de imagen en base64.
- `src/app/core/` — `AuthService`, guards (`AuthGuard`, `AdminGuard`) y servicios compartidos.
- `src/assets/mock/` — JSONs y datos mock utilizados por el `CalendarService`.

Uso rápido
Instala dependencias y arranca en modo desarrollo:

```bash
npm install
npm start
```

La app quedará disponible en `http://localhost:4200/`.

Próximos pasos recomendados
1. Añadir tests unitarios y de integración (prioridad alta):
	- Unit tests para `CalendarService` y `AuthService` (Jest o Karma + TestBed).
	- Tests para guards (`AuthGuard`, `AdminGuard`) y para la lógica de autorización (borrado por ciudad).
	- Tests E2E (Cypress) para flujos críticos: login, creación/edición de sesiones y restricciones de admin.
2. Integración continua: añadir pipeline (GitHub Actions) que corra linter, tests y build.
3. Mejorar cobertura visual y accesibilidad: añadir más casos en SCSS y pruebas de contraste/keyboard nav.
4. Considerar extensión a backend real o una capa de persistencia simulada más persistente si se quiere conservar datos entre sesiones reales.

Notas finales
- He priorizado cumplir la especificación de la prueba, manteniendo el código modular y legible. PrimeNG se integró por facilidad en inputs/modales y para que la UX sea consistente.

