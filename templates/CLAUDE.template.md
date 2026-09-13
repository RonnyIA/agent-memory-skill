# CLAUDE.md — Memory & Architecture Directives for Claude Code

## Critical Memory Directives

1. **Mandatory Start Step:** Always read `memory.md` at the beginning of any task to understand current system status, architectural lessons, and recent changes. Read `docs/CHANGELOG_HISTORY.md` only when researching older historical context.
2. **Record Architecture Decisions:** If you solve an architectural issue, security rule, or framework collision, document it immediately in `## 2. Decisiones de Arquitectura & Parches Críticos` inside `memory.md`.
3. **Strict 2-3 Active Blocks Limit (Non-Negotiable):**
   - Section `## 3. Bitácora de Sesión Activa` in `memory.md` MUST never exceed 3 blocks.
   - **Rotation Protocol:**
     - Before adding a new Block N when 3 blocks already exist:
     1. Prepend the oldest block(s) into `docs/CHANGELOG_HISTORY.md` without summarizing or truncating.
     2. Delete the archived block(s) from `memory.md`.
     3. Append the new Block N to `memory.md`.
4. **Definition of Done:** Never finish a task without running tests, verifying clean builds, and confirming `memory.md` contains strictly 2 to 3 active blocks.
