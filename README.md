# 🧠 Universal Agent Memory Skill (`agent-memory-skill`)

> **Sistema universal de memoria persistente y rotativa de dos niveles para agentes de codificación de Inteligencia Artificial.**  
> Compatible con **Google Antigravity**, **Anthropic Claude Code**, **Cursor IDE**, **Windsurf / Cascade**, **OpenAI Codex** y cualquier LLM.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Multi-Model](https://img.shields.io/badge/Compatibility-Antigravity%20%7C%20Claude%20%7C%20Cursor%20%7C%20Codex-brightgreen.svg)]()
[![Zero Dependencies](https://img.shields.io/badge/Dependencies-Zero%20(Pure%20Node.js)-blue.svg)]()

---

## 🎯 ¿Qué problema resuelve?

Cuando desarrollas proyectos de software con asistentes de IA, surgen dos grandes problemas:
1. **Amnesia y Regresiones:** El agente no recuerda las lecciones de ayer. Si una librería chocó con Docker o un tipo de columna falló en la base de datos, el agente tiende a cometer exactamente el mismo error en la siguiente sesión.
2. **Degradación por Archivos Gigantes:** Si dejas que un archivo de notas crezca sin control a 3,000 líneas, el modelo satura su ventana de atención (*context window*), se vuelve lento y empieza a alucinar.

### 💡 La Solución: Memoria Caliente + Memoria Fría
Este sistema divide la memoria del proyecto en dos capas:
- 🔥 **Memoria Caliente (`memory.md`):** Archivo ultraligero (< 400 líneas) en la raíz del proyecto. Contiene el estado actual, las lecciones permanentes de arquitectura y una bitácora con **estrictamente 2 a 3 bloques activos**.
- 🧊 **Memoria Fría (`docs/CHANGELOG_HISTORY.md`):** Archivo de archivo permanente donde se traslada de forma automática y cronológica el historial antiguo cuando entra un 4to bloque.

---

## 🏗️ Estructura de `memory.md`

```markdown
# Memoria del Proyecto - [Nombre del Proyecto]

## 1. Estado Actual del Sistema
- Stack: Tecnologías, bases de datos y puertos.
- Pruebas y Compilación: Estado actual.

## 2. Decisiones de Arquitectura & Parches Críticos (Lecciones Permanentes)
- Regla A: Descubrimiento técnico que NUNCA debe deshacerse.
- Regla B: Parche de librería o convención obligatoria.

## 3. Bitácora de Sesión Activa (MÁXIMO 2 O 3 BLOQUES)
### [2026-09-12] - Bloque 186: [Título]
### [2026-09-12] - Bloque 187: [Título]
```

---

## 🚀 Instalación Rápida en un Nuevo Proyecto

Tienes 3 formas sencillas de usar esta skill en cualquier proyecto:

### Opción 1: Ejecución Automática por Terminal (1 Clic)
Desde la carpeta de este repositorio (o clonado desde GitHub):

```bash
# Instalar en el proyecto actual
node scripts/install-memory.js

# O instalar en cualquier otra carpeta
node scripts/install-memory.js "C:\Ruta\A\Tu\Proyecto"
```

El script detectará automáticamente tu stack (`package.json`, `requirements.txt`, `Cargo.toml`, etc.) y creará:
- `memory.md`
- `docs/CHANGELOG_HISTORY.md`
- `AGENTS.md` y `GEMINI.md` (Antigravity y genéricos)
- `CLAUDE.md` (Claude Code)
- `.cursorrules` (Cursor IDE)
- `.windsurfrules` (Windsurf IDE)
- `.agents/rules/memory-directive.md` (Regla de Antigravity)

---

### Opción 2: Como Skill de Workspace en Antigravity
Copia la carpeta de esta skill dentro de tu proyecto en:
```text
tu-proyecto/
└── .agents/
    └── skills/
        └── agent-memory/
            ├── SKILL.md
            ├── scripts/
            └── templates/
```
Antigravity detectará la habilidad automáticamente y la activará bajo demanda cuando tú o el modelo lo requieran.

---

### Opción 3: Pidiéndoselo Directamente a tu Agente de IA
Simplemente escribe en el chat de tu IA favorita (Antigravity, Claude, Cursor, ChatGPT):
> *"Por favor instala y configura la skill `agent-memory` desde este repositorio para inicializar `memory.md` y las directivas del agente en este proyecto."*

La IA leerá `SKILL.md` y ejecutará todo el procedimiento de forma autónoma.

---

## 🛠️ Herramientas y Scripts Incluidos (Zero Dependencies)

Todos los scripts están escritos en **Node.js puro**, sin requerir `npm install` ni paquetes externos:

| Script | Comando | Qué hace |
| :--- | :--- | :--- |
| **Instalador Universal** | `node scripts/install-memory.js [ruta]` | Inicializa la memoria y crea todas las reglas de IA en el proyecto destino. |
| **Rotador Automático** | `node scripts/rotate-memory.js [ruta]` | Si `memory.md` tiene 3 o más bloques, traslada el más antiguo a `docs/CHANGELOG_HISTORY.md` y limpia `memory.md`. |
| **Auditor de Higiene** | `node scripts/check-memory.js [ruta]` | Valida que `memory.md` exista, tenga las 3 secciones y cumpla estrictamente el límite de 2 a 3 bloques. Ideal para hooks de Git o CI/CD. |

---

## 📦 Cómo subir este repositorio a tu GitHub

Para tener tu skill guardada en tu cuenta de GitHub y poder clonarla en cualquier máquina:

1. Abre tu terminal en esta carpeta:
   ```bash
   cd "C:\Users\ronny\Documents\Proyectos Antigravity\agent-memory-skill"
   ```

2. Inicializa el repositorio git:
   ```bash
   git init
   git add .
   git commit -m "feat: initial commit of universal agent-memory skill"
   ```

3. Crea un repositorio vacío en tu GitHub llamado `agent-memory-skill` y vincula el remoto:
   ```bash
   git branch -M main
   git remote add origin https://github.com/TU_USUARIO/agent-memory-skill.git
   git push -u origin main
   ```

¡Listo! A partir de ese momento podrás clonarlo o compartirlo con cualquier desarrollador o proyecto.

---

## 📄 Licencia

Distribuido bajo la Licencia **MIT**. Siéntete libre de usarlo, modificarlo y compartirlo en todos tus proyectos personales y comerciales.
