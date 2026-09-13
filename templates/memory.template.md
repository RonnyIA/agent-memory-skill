# Memoria del Proyecto - {{PROJECT_NAME}}

## 1. Estado Actual del Sistema
- **Propósito:** {{PROJECT_DESCRIPTION}}
- **Stack Tecnológico:** {{PROJECT_STACK}}
- **Estado de Pruebas:** 100% verde / sin fallos conocidos.
- **Estado de Compilación:** Compilación limpia sin advertencias críticas.
- **Entorno de Ejecución:** {{PROJECT_ENV}}

---

## 2. Decisiones de Arquitectura & Parches Críticos (Lecciones Aprendidas)

> **Regla de Oro:** Cada vez que resuelvas un bug de arquitectura, colisión de librerías, problema de seguridad o regla de negocio, regístralo aquí como un punto permanente para que ningún agente vuelva a cometer el mismo error.

### A. Reglas Generales & Buenas Prácticas
- **Consistencia de Tipos:** Declarar tipos explícitos en interfaces, entidades y firmas de funciones públicas.
- **Manejo de Errores:** Errores capturados con mensajes descriptivos en lenguaje claro, registrando contexto y causa raíz.
- **Higiene de Dependencias:** Evitar dependencias pesadas innecesarias si una función nativa moderna resuelve el caso.

---

## 3. Bitácora de Sesión Activa (Estrictamente 2 a 3 Bloques)

> **LÍMITE ESTRICTO E INNEGOCIABLE:** Esta sección NUNCA debe contener más de 3 bloques. Cuando se vaya a registrar un nuevo bloque y ya existan 3, el bloque más antiguo se debe copiar íntegramente al inicio de `docs/CHANGELOG_HISTORY.md` y luego eliminarse de aquí.

### [{{CURRENT_DATE}}] - Bloque 1: Inicialización del Sistema de Memoria y Reglas de Agente
- **Requerimiento:**
  - Configurar el sistema de memoria persistente de dos niveles para el proyecto.
- **Implementación Técnica:**
  - Creación de `memory.md` para memoria caliente de trabajo activo.
  - Creación de `docs/CHANGELOG_HISTORY.md` para archivo histórico de bloques rotados.
  - Configuración de directivas universales del agente en las instrucciones del workspace.
- **Verificación:**
  - Verificación de estructura de archivos y directivas de rotación.
