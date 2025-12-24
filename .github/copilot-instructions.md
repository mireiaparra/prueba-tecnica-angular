
<!-- Directrices para Copilot y agentes AI que aportan código -->
# Copilot instructions — prueba-tecnica-angular

Antes de editar:
- Localiza `package.json`, `angular.json`, `tsconfig.json` y `src/` y adopta las reglas y scripts declarados allí (`lint`, `format`, `test`, `build`).

Instrucciones:
- Interceptores HTTP para autenticación y manejo centralizado de errores.
- Este código nunca se va a conectar con ninguna API, por lo que todas las operaciones CRUD van a realizarse con datos mockeados.
- Ten en cuenta que la persistencia de la sesión va a mantenerse en un token simulado en localStorage o sessionStorage.
- Permisos y guards para controlar el acceso a las rutas y botones.
- Uso de componentes separados para mejorar la mantenibilidad.
- Uso de clases CSS en lugar de estilos en línea.
- La versión de Angular que estamos usando es la 20. Debes usar recomendaciones como:
  - Standalone components en lugar de módulos

