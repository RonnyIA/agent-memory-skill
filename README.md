# 🧠 Universal Agent Memory Skill (`agent-memory-skill`)

> **Universal 2-tier persistent rolling memory system for AI coding agents.**  
> Compatible with **Google Antigravity**, **Anthropic Claude Code**, **Cursor IDE**, **Windsurf / Cascade**, **OpenAI Codex**, and any LLM.

[ 🇬🇧 English ](#-english) • [ 🇪🇸 Español ](#-español) • [ 📖 Spanish File (README.es.md)](./README.es.md)

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Multi-Model](https://img.shields.io/badge/Compatibility-Antigravity%20%7C%20Claude%20%7C%20Cursor%20%7C%20Codex-brightgreen.svg)]()
[![Zero Dependencies](https://img.shields.io/badge/Dependencies-Zero%20(Pure%20Node.js)-blue.svg)]()

---

## 🎯 What Problem Does This Solve?

When developing software alongside AI coding assistants, two major problems arise:

1. **Amnesia and Regressions:** The agent forgets yesterday's hard-learned lessons. If a library conflicted with Docker, an API route changed, or a database column required an explicit type, the agent tends to make the exact same mistake again in subsequent sessions.
2. **Context Degradation from Bloated Files:** Allowing notes or documentation to grow unchecked into 2,000–3,000 line behemoths saturates the model's attention window (*context window*). The AI becomes slow, ignores crucial instructions, and starts hallucinating.

---

### 💡 The Solution: Hot Memory + Cold Storage

This architecture divides project memory into two strictly calibrated tiers:

- 🔥 **Hot Memory (`memory.md`):** An ultra-lean file (< 400 lines) at the project root. It contains current system state, permanent architectural decisions, and an active session log strictly capped at **2 to 3 active blocks**.
- 🧊 **Cold Storage (`docs/CHANGELOG_HISTORY.md`):** A permanent historical archive where older blocks are automatically prepended and stored intact as soon as a 4th block is created.

---

## 🏗️ Structure of `memory.md`

```markdown
# Project Memory - [Project Name]

## 1. Current System State
- Tech stack, database engine, running ports, and build status.
- Passing test suites and verified dependencies.

## 2. Architecture Decisions & Critical Patches (Permanent Lessons)
- Rule A: Hard-won discovery that must NEVER be reverted.
- Rule B: Framework collision, library patch, or mandatory security convention.

## 3. Active Session Log (STRICTLY 2 TO 3 BLOCKS)
### [2026-09-12] - Block 186: [Feature Title]
### [2026-09-12] - Block 187: [Feature Title]
```

---

## 🚀 Quick Start in Any Project

You have 3 easy ways to install and use this skill in any workspace:

### Option 1: Automated Terminal Execution (1-Click)
From your cloned repository directory:

```bash
# Install in the current project
node scripts/install-memory.js

# Or install in any target project path
node scripts/install-memory.js "C:\Path\To\Your\Project"
```

The script automatically detects your stack (`package.json`, `requirements.txt`, `Cargo.toml`, `go.mod`, etc.) and configures:
- `memory.md`
- `docs/CHANGELOG_HISTORY.md`
- `AGENTS.md` and `GEMINI.md` (Antigravity & generic models)
- `CLAUDE.md` (Claude Code)
- `.cursorrules` (Cursor IDE)
- `.windsurfrules` (Windsurf IDE)
- `.agents/rules/memory-directive.md` (Antigravity unconditional `trigger: always_on` rule)

---

### Option 2: As an Antigravity Workspace Skill
Copy this repository into your project under:
```text
your-project/
└── .agents/
    └── skills/
        └── agent-memory-skill/
            ├── SKILL.md
            ├── scripts/
            └── templates/
```
Antigravity automatically discovers the skill and invokes it on demand when needed.

---

### Option 3: Prompt Your AI Agent Directly
Simply write in your chat with any AI (Antigravity, Claude Code, Cursor, ChatGPT):
> *"Please install and configure the skill `agent-memory-skill` from https://github.com/RonnyIA/agent-memory-skill to initialize `memory.md` and agent directives in this project."*

The AI will read `SKILL.md` and execute the entire setup autonomously.

---

## 🛡️ Multi-Model Compatibility (4-Layer Defense)

| Environment / Model | Injected / Created File | Enforcement Mechanism |
| :--- | :--- | :--- |
| **Google Antigravity** | `.agents/rules/memory-directive.md` | Injected into `<user_rules>` via **`trigger: always_on`**. |
| **Antigravity / Generic LLMs** | `AGENTS.md` and `GEMINI.md` | Root directives with mandatory memory reading rules. |
| **Claude Code (Anthropic)** | `CLAUDE.md` | Auto-prepended to the top of the startup file. |
| **Cursor IDE** | `.cursorrules` | Injected into Cursor's workspace context prompt. |
| **Windsurf / Cascade** | `.windsurfrules` | Injected into Cascade's persistent instructions. |

---

## 🛠️ Included Tools & CLI Scripts (Zero Dependencies)

All utilities are written in **pure Node.js** with zero external packages:

| Script | Command | Purpose |
| :--- | :--- | :--- |
| **Universal Installer** | `node scripts/install-memory.js [path]` | Scans stack, initializes memory, and sets up AI agent rules. |
| **Automatic Rotator** | `node scripts/rotate-memory.js [path]` | If `memory.md` has 3+ blocks, moves the oldest to `docs/CHANGELOG_HISTORY.md`. |
| **Hygiene Auditor** | `node scripts/check-memory.js [path]` | Audits 3 required sections and enforces the 2-3 block limit. Ideal for Git hooks/CI. |

---

## 📄 License

Distributed under the **MIT License**. Free to use, modify, and distribute across personal and commercial projects.

---

## 🇪🇸 Documentación en Español

Puedes consultar la [**guía completa en español aquí (README.es.md)**](./README.es.md).

<details>
<summary><b>Haz clic aquí para una vista rápida en Español</b></summary>

### 🎯 ¿Qué problema resuelve?
1. **Amnesia y Regresiones:** El agente olvida las lecciones de ayer y repite errores ya resueltos.
2. **Degradación por Archivos Gigantes:** Los archivos de notas descontrolados saturan la ventana de contexto de la IA.

### 💡 La Solución: Memoria Caliente + Memoria Fría
- 🔥 **Memoria Caliente (`memory.md`):** Archivo ágil (< 400 líneas) en la raíz con el estado actual, decisiones críticas y **estrictamente de 2 a 3 bloques activos**.
- 🧊 **Memoria Fría (`docs/CHANGELOG_HISTORY.md`):** Historial permanente donde se archivan los bloques antiguos sin recortar.

### 🚀 Instalación en 1 Clic
```bash
node scripts/install-memory.js "C:\Ruta\A\Tu\Proyecto"
```

### 🛡️ Compatibilidad Multi-Modelo
Configura automáticamente directivas para Antigravity (`always_on`), Claude Code (`CLAUDE.md`), Cursor (`.cursorrules`), Windsurf (`.windsurfrules`) y cualquier LLM.

Para más detalles, revisa [README.es.md](./README.es.md).
</details>
