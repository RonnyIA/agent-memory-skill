#!/usr/bin/env node
/**
 * check-memory.js
 * 
 * Validador de higiene de memoria para agentes de IA y pipelines de CI/CD.
 * Verifica que memory.md cumpla estrictamente la regla innegociable de 2 a 3 bloques activos.
 * 
 * Códigos de salida:
 *   0: Todo en orden (entre 2 y 3 bloques, estructura válida).
 *   1: Violación de directiva de memoria (> 3 bloques o estructura rota).
 * 
 * Uso:
 *   node check-memory.js [ruta-del-proyecto]
 */

const fs = require('fs');
const path = require('path');

const targetArg = process.argv[2] || process.cwd();
const targetDir = path.resolve(targetArg);
const memoryPath = path.join(targetDir, 'memory.md');
const historyPath = path.join(targetDir, 'docs', 'CHANGELOG_HISTORY.md');

console.log(`\n🔍 Auditando higiene de memoria en: ${targetDir}`);

let errors = 0;

if (!fs.existsSync(memoryPath)) {
  console.error(`❌ ERROR: No se encontró "memory.md" en el proyecto.`);
  process.exit(1);
}

if (!fs.existsSync(historyPath)) {
  console.warn(`⚠️ AVISO: No se encontró "docs/CHANGELOG_HISTORY.md" (Memoria Fría).`);
}

const memoryContent = fs.readFileSync(memoryPath, 'utf8');

// 1. Validar presencia de las 3 secciones obligatorias
if (!/## 1\.\s+Estado Actual del Sistema/i.test(memoryContent)) {
  console.error(`❌ Falta la sección obligatoria: "## 1. Estado Actual del Sistema"`);
  errors++;
}

if (!/## 2\.\s+Decisiones de Arquitectura/i.test(memoryContent)) {
  console.error(`❌ Falta la sección obligatoria: "## 2. Decisiones de Arquitectura & Parches Críticos"`);
  errors++;
}

if (!/## 3\.\s+Bitácora de Sesión Activa/i.test(memoryContent)) {
  console.error(`❌ Falta la sección obligatoria: "## 3. Bitácora de Sesión Activa"`);
  errors++;
}

// 2. Extraer y contar bloques en la sección 3
const section3Match = memoryContent.match(/## 3\.\s+Bitácora de Sesión Activa[\s\S]*$/i);
let blockCount = 0;

if (section3Match) {
  const blockRegex = /### \[\d{4}-\d{2}-\d{2}\] - Bloque \d+:/g;
  const matches = section3Match[0].match(blockRegex);
  blockCount = matches ? matches.length : 0;
}

console.log(`📊 Conteo de bloques activos en memory.md: ${blockCount}`);

if (blockCount > 3) {
  console.error(`❌ VIOLACIÓN DE DIRECTIVA: memory.md tiene ${blockCount} bloques activos (LÍMITE MÁXIMO: 3).`);
  console.error(`   👉 Acción requerida: Rota los bloques más antiguos hacia docs/CHANGELOG_HISTORY.md`);
  console.error(`   👉 Puedes ejecutar: "node scripts/rotate-memory.js" para rotar automáticamente.`);
  errors++;
} else if (blockCount < 2) {
  console.warn(`⚠️ Advertencia: memory.md tiene ${blockCount} bloque(s). Lo ideal es mantener entre 2 y 3 bloques.`);
} else {
  console.log(`✅ Límite estricto respetado: exactamente ${blockCount} bloques activos.`);
}

if (errors > 0) {
  console.error(`\n❌ La verificación de memoria ha FALLADO con ${errors} error(es).`);
  process.exit(1);
}

console.log(`\n🎉 ¡Higiene de memoria 100% válida! El proyecto está listo para continuar.\n`);
process.exit(0);
