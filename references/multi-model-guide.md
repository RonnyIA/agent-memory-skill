# Guía Multi-Modelo: Cómo usar agent-memory con cualquier IA

Este sistema es compatible con las principales herramientas de desarrollo asistido por IA del mercado:

---

## 1. Google Antigravity
Antigravity reconoce automáticamente:
1. `AGENTS.md` y `GEMINI.md` en la raíz del proyecto.
2. Reglas jerárquicas en `.agents/rules/memory-directive.md`.
3. Habilidades instaladas en `.agents/skills/agent-memory/SKILL.md`.

**Comando rápido para Antigravity:**
> "Instala la skill agent-memory y configura memory.md para este proyecto."

---

## 2. Anthropic Claude Code (CLI)
Claude Code lee de forma nativa el archivo `CLAUDE.md` en la raíz del proyecto al iniciarse.

1. El instalador `install-memory.js` genera `CLAUDE.md` con las instrucciones exactas de lectura, rotación y parada.
2. Puedes invocar directamente:
   > "Claude, lee CLAUDE.md y actualiza memory.md con la tarea que acabamos de hacer."

---

## 3. Cursor IDE
Cursor lee el archivo `.cursorrules` en la raíz del repositorio.

1. El archivo `.cursorrules` inyecta las directivas de memoria en cada solicitud de Cursor Composer y Chat.
2. En Cursor, escribe en el Composer:
   > "@memory.md revisa el estado actual y añade el bloque correspondiente tras implementar la función."

---

## 4. Windsurf / Cascade (Codeium)
Windsurf utiliza el archivo `.windsurfrules` en la raíz del proyecto.
- La regla obliga a Cascade a leer `memory.md` y realizar la rotación hacia `docs/CHANGELOG_HISTORY.md` cuando corresponda.

---

## 5. OpenAI Codex / ChatGPT / Copilot / Otros
Para asistentes genéricos o interfaces web:
1. Asegúrate de que `AGENTS.md` esté en la raíz del proyecto.
2. Si usas Custom Instructions o System Prompts, copia y pega el contenido de `templates/AGENTS.template.md`.
3. Al iniciar una sesión, tu prompt puede ser tan simple como:
   > "Por favor lee memory.md antes de proponer cualquier cambio de código."
