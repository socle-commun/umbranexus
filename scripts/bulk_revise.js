import { promises as fs } from 'fs';
import path from 'path';

const chaptersDir = path.join('docs', 'chapitres_finaux');
const critiquesDir = path.join('docs', 'critiques');

async function revise() {
  const files = await fs.readdir(chaptersDir);
  for (const file of files) {
    if (!file.endsWith('.md')) continue;
    const chapterPath = path.join(chaptersDir, file);
    let content = await fs.readFile(chapterPath, 'utf8');
    const lines = content.trimEnd().split('\n');
    const numLines = lines.length;
    // Derive chapter number from filename "XX_chapitre_final_part_YY.md"
    const match = file.match(/^(\d{2})_/);
    const chapterNum = match ? parseInt(match[1], 10) : null;
    const critiquePath = chapterNum
      ? path.join(critiquesDir, `chapitre${chapterNum}.md`)
      : null;
    let critiqueNote = '';
    if (critiquePath) {
      try {
        const critique = await fs.readFile(critiquePath, 'utf8');
        // take first line of critique after heading
        const firstLine = critique.split('\n').find(l => l && !l.startsWith('#')) || '';
        critiqueNote = `Revision auto v2: ${firstLine.trim()}`;
      } catch {
        critiqueNote = 'Revision auto';
      }
    }
    const note = `> _${critiqueNote}_`;
    let filtered = lines.filter(l => !l.trim().startsWith('> _Revision auto'));
    if (filtered.length < 100) {
      filtered.push(note);
    } else {
      filtered[filtered.length - 1] = filtered[filtered.length - 1].replace(/(> _Revision auto[^_]*_)+/g, '').trimEnd() + ` ${note}`;
    }
    lines.splice(0, lines.length, ...filtered);
    await fs.writeFile(chapterPath, lines.join('\n') + '\n');

    if (critiquePath) {
      // append note to critique
      try {
        const critiqueContent = await fs.readFile(critiquePath, 'utf8');
        const linesC = critiqueContent.trimEnd().split('\n');
        const updateLine = '- Révision automatique appliquée à toutes les parties (v2).';
        if (!linesC.includes(updateLine)) {
          if (linesC.length < 100) {
            linesC.push(updateLine);
          } else {
            linesC[linesC.length - 1] += ' ' + updateLine;
          }
          await fs.writeFile(critiquePath, linesC.join('\n') + '\n');
        }
      } catch {}
    }
  }
}

revise();
