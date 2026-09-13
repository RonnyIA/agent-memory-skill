# Arquitectura de Memoria Persistente de Dos Niveles (Hot vs Cold Memory)

## 1. El Problema de los Sistemas Monolíticos de Notas
Los agentes de codificación basados en LLMs (Large Language Models) operan dentro de ventanas de contexto con límites físicos y cognitivos:
1. **Pérdida de Atención (Needle in a Haystack):** A medida que un archivo de contexto (`notes.md` o `changelog.md`) supera los 1,000 o 2,000 tokens, la capacidad del modelo para seguir instrucciones críticas al pie de la letra se degrada exponencialmente.
2. **Costo y Latencia:** Enviar 4,000 tokens de historial en cada invocación ralentiza las respuestas y desperdicia cuotas de tokens.
3. **Amnesia Post-Sesión:** Si no existe ningún archivo de memoria, cada nueva sesión comienza desde cero ("Tabula Rasa"), provocando que el agente deshaga soluciones a bugs difíciles ya resueltos.

---

## 2. La Solución: Hot Memory + Cold Memory

```
┌────────────────────────────────────────────────────────┐
│               AGENTE DE CODIFICACIÓN                   │
│        (Antigravity / Claude / Cursor / Codex)         │
└──────────────────────────┬─────────────────────────────┘
                           │ Lee al iniciar cada tarea
                           ▼
┌────────────────────────────────────────────────────────┐
│             MEMORIA CALIENTE: memory.md                │
│             (~300 - 500 líneas / < 4 KB)               │
├────────────────────────────────────────────────────────┤
│ 1. Estado Actual (Stack, Base de Datos, Puertos)       │
│ 2. Decisiones de Arquitectura & Parches Críticos       │
│ 3. Bitácora Activa: [Bloque N-1] y [Bloque N]          │
└──────────────────────────┬─────────────────────────────┘
                           │
                           │ Rotación Automática
                           │ (Cuando se añade un 4to bloque)
                           ▼
┌────────────────────────────────────────────────────────┐
│        MEMORIA FRÍA: docs/CHANGELOG_HISTORY.md         │
│          (Archivo permanente e ilimitado)              │
├────────────────────────────────────────────────────────┤
│ Bloque N-2                                             │
│ Bloque N-3                                             │
│ ... Bloque 1                                           │
└────────────────────────────────────────────────────────┘
```

---

## 3. Desglose de las 3 Secciones de `memory.md`

### Sección 1: Estado Actual del Sistema
- **Objetivo:** Brindar conciencia situacional en 10 segundos.
- **Contenido:** Stack tecnológico, librerías principales, estado de pruebas unitarias (`npm test` o similar), modo de base de datos y comandos de compilación.

### Sección 2: Decisiones de Arquitectura & Parches Críticos
- **Objetivo:** Prevenir regresiones y el síndrome "lo volví a romper".
- **Contenido:** Reglas permanentes descubiertas durante el desarrollo.
  - Ejemplos: "No usar bloqueos pesimistas en SQLite", "No invocar window.confirm", "Cifrar credenciales con AES-256-GCM".
- **Regla:** Esta sección es acumulativa y destilada; solo contiene axiomas y reglas inquebrantables.

### Sección 3: Bitácora de Sesión Activa (Estrictamente 2 a 3 Bloques)
- **Objetivo:** Registro granular del trabajo reciente sin saturar el contexto.
- **Límite:** Entre 2 y 3 bloques.
- **Rotación:** Cuando se completa un bloque nuevo y ya hay 3, el bloque más antiguo se traslada intacto a `docs/CHANGELOG_HISTORY.md` antes de registrar el nuevo.
