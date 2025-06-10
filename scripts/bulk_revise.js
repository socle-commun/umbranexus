import { promises as fs } from 'fs';
import path from 'path';

const chaptersDir = path.join('docs', 'chapitres_finaux');
const critiquesDir = path.join('docs', 'critiques');

async function revise() {
  const files = await fs.readdir(chaptersDir);
  for (const file of files) {
    if (!file.endsWith('.md')) continue;
    const chapterPath = path.join(chaptersDir, file);
    const content = await fs.readFile(chapterPath, 'utf8');
    let lines = content.trimEnd().split('\n');
    lines = lines
      .map(l => l.replace(/\s*>\s*_Revision auto[^_]*_/, '').trimEnd())
      .filter(l => !l.startsWith('> _Revision auto') && l !== '');
    await fs.writeFile(chapterPath, lines.join('\n') + '\n');

    const match = file.match(/^(\d{2})_/);
    const chapterNum = match ? parseInt(match[1], 10) : null;
    if (chapterNum) {
      const critiquePath = path.join(critiquesDir, `chapitre${chapterNum}.md`);
      try {
        const critiqueContent = await fs.readFile(critiquePath, 'utf8');
        const clean = critiqueContent
          .trimEnd()
          .split('\n')
          .filter(l => !l.startsWith('- Révision automatique'));
        await fs.writeFile(critiquePath, clean.join('\n') + '\n');
      } catch {}
    }
  }
}

revise();
