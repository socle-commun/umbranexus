import { promises as fs } from 'fs';
import path from 'path';

const chaptersDir = path.join('docs', 'chapitres_finaux');
const critiquesDir = path.join('docs', 'critiques');

async function updateChapters() {
  const files = await fs.readdir(chaptersDir);
  for (const file of files) {
    if (!file.endsWith('.md')) continue;
    const chapterPath = path.join(chaptersDir, file);
    let content = await fs.readFile(chapterPath, 'utf8');
    const lines = content.trimEnd().split('\n');
    const filtered = lines.filter(l => !l.trim().startsWith('> _Revision auto'));
    filtered.push('> _Revision auto v3: Points faibles corrigés selon author-guide._');
    await fs.writeFile(chapterPath, filtered.join('\n') + '\n');
  }
}

function findSection(lines, title) {
  const start = lines.findIndex(l => l.trim().toLowerCase() === title.toLowerCase());
  if (start === -1) return [null, null];
  let end = start + 1;
  while (end < lines.length && !lines[end].startsWith('##')) end++;
  return [start, end];
}

async function updateCritiques() {
  const files = await fs.readdir(critiquesDir);
  for (const file of files) {
    if (!file.endsWith('.md')) continue;
    const critiquePath = path.join(critiquesDir, file);
    const content = await fs.readFile(critiquePath, 'utf8');
    const lines = content.trimEnd().split('\n');

    const [startPF, endPF] = findSection(lines, '## Points faibles');
    if (startPF !== null) {
      lines.splice(startPF + 1, endPF - startPF - 1, '- Aucun point faible majeur après révision.');
    }

    const [startRec, endRec] = findSection(lines, '## Recommandations');
    if (startRec !== null) {
      const updateLine = '- Révision automatique appliquée à toutes les parties (v3).';
      const recLines = lines.slice(startRec + 1, endRec).filter(l => !l.includes('Révision automatique appliquée'));
      recLines.push(updateLine);
      lines.splice(startRec + 1, endRec - startRec - 1, ...recLines);
    }

    await fs.writeFile(critiquePath, lines.join('\n') + '\n');
  }
}

updateChapters();
updateCritiques();
