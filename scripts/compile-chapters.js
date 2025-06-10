import { promises as fs } from 'fs';
import path from 'path';

const chaptersDir = path.join('docs', 'chapitres_finaux');
const outputFile = path.join(chaptersDir, 'compiled_book.md');

async function gather() {
  const files = await fs.readdir(chaptersDir);
  const parts = files
    .map(f => {
      const m = f.match(/^(\d{2})_chapitre_final_part_(\d+)\.md$/);
      if (!m) return null;
      return { chapter: Number(m[1]), part: Number(m[2]), file: f };
    })
    .filter(Boolean)
    .sort((a, b) => a.chapter - b.chapter || a.part - b.part);

  let content = '';
  for (const p of parts) {
    const text = await fs.readFile(path.join(chaptersDir, p.file), 'utf8');
    content += text.trimEnd() + '\n\n';
  }
  await fs.writeFile(outputFile, content.trimEnd() + '\n');
  console.log(`Compiled ${parts.length} parts into ${outputFile}`);
}

gather();
