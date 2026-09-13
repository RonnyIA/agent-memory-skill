---
trigger: always_on
description: Regla de oro estricta e innegociable de rotacion y actualizacion obligatoria de MEMORY.md
---

# DIRECTIVA CRITICA OBLIGATORIA (MEMORIA Y LOGS)

1. Lectura obligatoria al iniciar: Consulta memory.md y AGENTS.md para conocer decisiones de arquitectura y estado.
2. Limite Estricto e Innegociable de memory.md (MAXIMO 2 O 3 BLOQUES ACTIVOS):
   - memory.md NUNCA debe acumular mas de 3 bloques.
   - Rotacion obligatoria: archivar bloques antiguos en docs/CHANGELOG_HISTORY.md pegandolos arriba sin resumirlos.
3. Condicion de Parada Inquebrantable: Ninguna tarea se considera finalizada sin verificar compilacion y asegurar que memory.md tenga estrictamente entre 2 y 3 bloques actualizados.
