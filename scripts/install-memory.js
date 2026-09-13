#!/usr/bin/env node
/**
 * install-memory.js
 * 
 * Configura automáticamente el sistema universal de memoria persistente
 * de 2 niveles (memory.md + docs/CHANGELOG_HISTORY.md + directivas de agentes)
 * en cualquier proyecto.
 * 
 * Uso:
 *   node install-memory.js [ruta-del-proyecto] [--name="Nombre Proyecto"] [--force]
 */

const fs = require('fs');
const path = require('path');

// 1. Determinar directorio objetivo
const targetArg = process.argv[2] && !process.argv[2].startsWith('--') ? process.argv[2] : process.cwd();
const targetDir = path.resolve(targetArg);

// Opciones
const args = process.argv.slice(2);
const force = args.includes('--force');
const nameArgMatch = args.find(a => a.startsWith('--name='));
const customName = nameArgMatch ? nameArgMatch.split('=')[1] : null;

console.log(`\n🧠 [agent-memory-skill] Instalando sistema de memoria persistente...`);
console.log(`📁 Directorio destino: ${targetDir}\n`);

if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
  console.log(`📁 Directorio creado: ${targetDir}`);
}

// 2. Detectar metadatos del proyecto objetivo
let projectName = customName || path.basename(targetDir);
let projectDescription = 'Sistema desarrollado con asistencia de agentes IA.';
let projectStack = 'No especificado (detectado automáticamente)';
let projectEnv = 'Desarrollo local / Producción';

// Inspeccionar package.json si existe
const pkgPath = path.join(targetDir, 'package.json');
if (fs.existsSync(pkgPath)) {
  try {
    const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
    if (!customName && pkg.name) projectName = pkg.name;
    if (pkg.description) projectDescription = pkg.description;

    const deps = Object.keys(pkg.dependencies || {}).concat(Object.keys(pkg.devDependencies || {}));
    const detected = [];
    if (deps.includes('react')) detected.push('React');
    if (deps.includes('vue')) detected.push('Vue');
    if (deps.includes('next')) detected.push('Next.js');
    if (deps.includes('express')) detected.push('Express');
    if (deps.includes('typescript')) detected.push('TypeScript');
    if (deps.includes('tailwindcss')) detected.push('TailwindCSS');
    if (deps.includes('electron')) detected.push('Electron');
    if (deps.includes('typeorm')) detected.push('TypeORM');
    if (deps.includes('prisma')) detected.push('Prisma');
    if (detected.length > 0) {
      projectStack = `Node.js (${detected.join(', ')})`;
    } else {
      projectStack = 'Node.js / JavaScript';
    }
  } catch (e) {}
} else if (fs.existsSync(path.join(targetDir, 'requirements.txt')) || fs.existsSync(path.join(targetDir, 'pyproject.toml'))) {
  projectStack = 'Python';
} else if (fs.existsSync(path.join(targetDir, 'Cargo.toml'))) {
  projectStack = 'Rust';
} else if (fs.existsSync(path.join(targetDir, 'go.mod'))) {
  projectStack = 'Go';
}

const currentDate = new Date().toISOString().split('T')[0];
const templatesDir = path.resolve(__dirname, '..', 'templates');

function renderTemplate(templateName, replacements) {
  const filePath = path.join(templatesDir, templateName);
  let content = fs.readFileSync(filePath, 'utf8');
  for (const [key, value] of Object.entries(replacements)) {
    const regex = new RegExp(`{{${key}}}`, 'g');
    content = content.replace(regex, value);
  }
  return content;
}

const replacements = {
  PROJECT_NAME: projectName,
  PROJECT_DESCRIPTION: projectDescription,
  PROJECT_STACK: projectStack,
  PROJECT_ENV: projectEnv,
  CURRENT_DATE: currentDate
};

// 3. Crear memory.md
const memoryPath = path.join(targetDir, 'memory.md');
if (!fs.existsSync(memoryPath) || force) {
  const content = renderTemplate('memory.template.md', replacements);
  fs.writeFileSync(memoryPath, content, 'utf8');
  console.log(`✅ Creado: memory.md (Memoria caliente lista con 3 secciones estándar)`);
} else {
  console.log(`ℹ️  Ya existe memory.md (omitiendo sobrescritura; usa --force si deseas resetearlo)`);
}

// 4. Crear docs/CHANGELOG_HISTORY.md
const docsDir = path.join(targetDir, 'docs');
if (!fs.existsSync(docsDir)) {
  fs.mkdirSync(docsDir, { recursive: true });
}
const historyPath = path.join(docsDir, 'CHANGELOG_HISTORY.md');
if (!fs.existsSync(historyPath) || force) {
  const content = renderTemplate('CHANGELOG_HISTORY.template.md', replacements);
  fs.writeFileSync(historyPath, content, 'utf8');
  console.log(`✅ Creado: docs/CHANGELOG_HISTORY.md (Memoria fría / archivo permanente)`);
} else {
  console.log(`ℹ️  Ya existe docs/CHANGELOG_HISTORY.md`);
}

// 5. Configurar directivas para múltiples agentes
function injectOrPrependRule(filePath, ruleContent, tagKeyword, label) {
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, ruleContent, 'utf8');
    console.log(`✅ Creado: ${label}`);
  } else {
    const existing = fs.readFileSync(filePath, 'utf8');
    if (!existing.includes(tagKeyword)) {
      const merged = `${ruleContent.trim()}\n\n---\n\n${existing.trimStart()}`;
      fs.writeFileSync(filePath, merged, 'utf8');
      console.log(`⚡ Inyectada directiva de memoria en: ${label} (preservando tus reglas existentes)`);
    } else {
      console.log(`ℹ️  ${label} ya contiene la directiva de memoria.`);
    }
  }
}

// A. AGENTS.md y GEMINI.md (Antigravity & modelos genéricos)
const agentsContent = renderTemplate('AGENTS.template.md', replacements);
injectOrPrependRule(path.join(targetDir, 'AGENTS.md'), agentsContent, 'DIRECTIVA CRÍTICA OBLIGATORIA', 'AGENTS.md');
injectOrPrependRule(path.join(targetDir, 'GEMINI.md'), agentsContent, 'DIRECTIVA CRÍTICA OBLIGATORIA', 'GEMINI.md');

// B. CLAUDE.md (Claude Code de Anthropic)
const claudeContent = renderTemplate('CLAUDE.template.md', replacements);
injectOrPrependRule(path.join(targetDir, 'CLAUDE.md'), claudeContent, 'Critical Memory Directives', 'CLAUDE.md');

// C. .cursorrules (Cursor IDE)
const cursorContent = renderTemplate('cursorrules.template', replacements);
injectOrPrependRule(path.join(targetDir, '.cursorrules'), cursorContent, 'Mandatory Memory Protocol', '.cursorrules');

// D. .windsurfrules (Windsurf IDE / Cascade)
const windsurfContent = renderTemplate('windsurfrules.template', replacements);
injectOrPrependRule(path.join(targetDir, '.windsurfrules'), windsurfContent, 'Mandatory Memory Protocol', '.windsurfrules');

// E. .agents/rules/memory-directive.md (Regla jerárquica de máxima prioridad en Antigravity)
const agentsRulesDir = path.join(targetDir, '.agents', 'rules');
if (!fs.existsSync(agentsRulesDir)) {
  fs.mkdirSync(agentsRulesDir, { recursive: true });
}
const antRulePath = path.join(agentsRulesDir, 'memory-directive.md');
if (!fs.existsSync(antRulePath) || force) {
  const antRuleContent = renderTemplate('rules-memory-directive.template.md', replacements);
  fs.writeFileSync(antRulePath, antRuleContent, 'utf8');
  console.log(`✅ Creado: .agents/rules/memory-directive.md (Regla incondicional en Antigravity <user_rules>)`);
}

console.log(`\n🎉 ¡Sistema de memoria persistente instalado con éxito en "${projectName}"!`);
console.log(`📌 Próximos pasos con cualquier IA (Antigravity, Claude, Cursor, ChatGPT):`);
console.log(`   1. Solo dile al agente: "Lee memory.md y sigue las directivas de memoria".`);
console.log(`   2. Para verificar que cumpla la regla de 2-3 bloques: ejecuta "node scripts/check-memory.js".\n`);
