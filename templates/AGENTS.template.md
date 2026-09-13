# DIRECTIVAS OBLIGATORIAS DEL AGENTE — {{PROJECT_NAME}}

## ⛔ DIRECTIVA CRÍTICA OBLIGATORIA (MEMORIA Y LOGS)

1. **Lectura obligatoria al iniciar cualquier sesión o tarea:**
   - Antes de modificar código, consulta `memory.md` para conocer el estado actual, las decisiones de arquitectura, parches críticos y la bitácora activa.
   - Si necesitas consultar detalles de cambios históricos antiguos, lee directamente `docs/CHANGELOG_HISTORY.md`.

2. **Actualización de Decisiones de Arquitectura (Sección 2 de `memory.md`):**
   - Si durante la tarea resuelves un bug de arquitectura, agregas una regla de seguridad, solucionas una colisión de dependencias o estableces una convención obligatoria, regístralo inmediatamente como un nuevo punto clave en la sección `## 2. Decisiones de Arquitectura & Parches Críticos` de `memory.md`.

3. **Límite Estricto e Innegociable de `memory.md` (MÁXIMO 2 O 3 BLOQUES ACTIVOS):**
   - **`memory.md` NUNCA debe acumular más de 3 bloques en la Sección 3.**
   - **Un bloque = un tema/fase de trabajo.** Cada función o arreglo genuinamente nuevo empieza su propio `### [fecha] - Bloque N: <título>`.
   - **Protocolo de rotación obligatoria (Paso a Paso en el mismo instante):**
     1. Si ya existen 3 bloques en `memory.md` y vas a registrar el Bloque N nuevo:
     2. **PRIMERO:** Abre `docs/CHANGELOG_HISTORY.md` y prependea (pega arriba del contenido existente) el bloque o los bloques más antiguos sin resumirlos ni recortarlos.
     3. **SEGUNDO:** Elimina de `memory.md` esos bloques ya archivados.
     4. **TERCERO:** Escribe el nuevo Bloque N en `memory.md`.
   - **PROHIBIDO:** Dejar que `memory.md` crezca a 4, 5 o más bloques con la excusa de "limpiarlo después". La rotación se hace en el mismo momento.

4. **Condición de Parada:**
   - Ninguna tarea se considera finalizada sin verificar pruebas, compilación limpia y asegurar que `memory.md` tenga **estrictamente entre 2 y 3 bloques**.
