#!/usr/bin/env node
/**
 * rotate-memory.js
 * 
 * Automatiza la rotación de memoria entre memory.md y docs/CHANGELOG_HISTORY.md.
 * Si memory.md tiene 3 (o más) bloques en la Sección 3, extrae el más antiguo,
 * lo prependea intacto a docs/CHANGELOG_HISTORY.md y lo elimina de memory.md.
 * 
 * Uso:
 *   node rotate-memory.js [ruta-del-proyecto]
 */

const fs = require('fs');
const path = require('path');

const targetArg = process.argv[2] || process.cwd();
const targetDir = path.resolve(targetArg);
const memoryPath = path.join(targetDir, 'memory.md');
const historyPath = path.join(targetDir, 'docs', 'CHANGELOG_HISTORY.md');

if (!fs.existsSync(memoryPath)) {
  console.error(`❌ No se encontró "memory.md" en ${targetDir}`);
  process.exit(1);
}

if (!fs.existsSync(historyPath)) {
  console.error(`❌ No se encontró "docs/CHANGELOG_HISTORY.md" en ${targetDir}`);
  process.exit(1);
}

const memoryContent = fs.readFileSync(memoryPath, 'utf8');

// Localizar la Sección 3
const section3HeaderRegex = /(## 3\.\s+Bitácora de Sesión Activa[^\n]*\n)/i;
const match = memoryContent.match(section3HeaderRegex);

if (!match) {
  console.error('❌ No se encontró el encabezado de "## 3. Bitácora de Sesión Activa" en memory.md');
  process.exit(1);
}

const splitIndex = match.index + match[0].length;
const beforeSection3 = memoryContent.substring(0, splitIndex);
const section3Body = memoryContent.substring(splitIndex);

// Extraer los bloques que empiezan con ### [
const headerFindRegex = /(?:^|\n)(### \[\d{4}-\d{2}-\d{2}\] - Bloque \d+:[^\n]*)/g;
const blockIndices = [];
let matchH;

while ((matchH = headerFindRegex.exec(section3Body)) !== null) {
  const offset = matchH[0].startsWith('\n') ? 1 : 0;
  blockIndices.push(matchH.index + offset);
}

const blocks = [];
for (let i = 0; i < blockIndices.length; i++) {
  const start = blockIndices[i];
  const end = (i + 1 < blockIndices.length) ? blockIndices[i + 1] : section3Body.length;
  const chunk = section3Body.substring(start, end).trim();
  if (chunk) blocks.push(chunk);
}

console.log(`🔍 Bloques encontrados en la Sección 3: ${blocks.length}`);

if (blocks.length < 3) {
  console.log(`✅ memory.md tiene ${blocks.length} bloque(s). No requiere rotación (límite máximo permitido: 3).`);
  process.exit(0);
}

// Si tiene 3 o más bloques, rotamos los más antiguos para dejar espacio (quedar con 2 o menos)
const blocksToKeepCount = 2;
const rotateCount = blocks.length - blocksToKeepCount;
const blocksToArchive = blocks.slice(0, rotateCount);
const blocksToKeep = blocks.slice(rotateCount);

console.log(`📦 Rotando ${rotateCount} bloque(s) antiguo(s) hacia docs/CHANGELOG_HISTORY.md...`);

// 1. Prependear a CHANGELOG_HISTORY.md
const historyContent = fs.readFileSync(historyPath, 'utf8');
const textToArchive = blocksToArchive.join('\n\n') + '\n\n';

// Buscar si hay encabezado introductorio con ---
let newHistoryContent = '';
const dividerMatch = historyContent.match(/(?:\r?\n)(---)(?:\r?\n)/);
if (dividerMatch) {
  const dividerEnd = dividerMatch.index + dividerMatch[0].length;
  const prefix = historyContent.substring(0, dividerEnd);
  const rest = historyContent.substring(dividerEnd).trimStart();
  newHistoryContent = `${prefix}\n${textToArchive}${rest ? rest + '\n' : ''}`;
} else {
  newHistoryContent = `${textToArchive}${historyContent}`;
}

fs.writeFileSync(historyPath, newHistoryContent, 'utf8');
console.log(`✅ Bloque(s) archivado(s) exitosamente en docs/CHANGELOG_HISTORY.md`);

// 2. Reescribir memory.md con los bloques conservados
// Preservar cualquier texto guía / blockquote después del encabezado de la sección 3
const firstBlockPos = section3Body.indexOf(blocks[0]);
const section3Intro = firstBlockPos !== -1 ? section3Body.substring(0, firstBlockPos).trim() : '';

let newMemoryContent = beforeSection3;
if (section3Intro) {
  newMemoryContent += '\n' + section3Intro + '\n\n';
} else {
  newMemoryContent += '\n';
}
newMemoryContent += blocksToKeep.join('\n\n') + '\n';

fs.writeFileSync(memoryPath, newMemoryContent, 'utf8');
console.log(`✅ memory.md actualizado: ahora tiene exactamente ${blocksToKeep.length} bloques activos.`);
console.log(`🎯 Espacio liberado: ya puedes redactar tu nuevo bloque en memory.md cumpliendo la regla de oro.\n`);
