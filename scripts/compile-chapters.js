import { promises as fs } from 'fs';
import path from 'path';
import yaml from 'yaml';

const chaptersDir = path.join('docs', 'chapitres_finaux');
const outputFile = path.join(chaptersDir, 'compiled_book.md');

async function gather() {
  const dirs = await fs.readdir(chaptersDir, { withFileTypes: true });
  let parts = [];
  for (const d of dirs) {
    if (!d.isDirectory()) continue;
    const m = d.name.match(/^chapitre_(\d{2})$/);
    if (!m) continue;
    const chapterNum = Number(m[1]);
    const dirPath = path.join(chaptersDir, d.name);
    const files = (await fs.readdir(dirPath)).filter(f => /^part_\d{2}\.md$/.test(f)).sort();
    files.forEach((f) => {
      const pMatch = f.match(/^part_(\d{2})\.md$/);
      const partNum = Number(pMatch[1]);
      parts.push({ chapter: chapterNum, part: partNum, file: path.join(d.name, f) });
    });
  }
  parts.sort((a, b) => a.chapter - b.chapter || a.part - b.part);

  let content = '';
  for (const p of parts) {
    const text = await fs.readFile(path.join(chaptersDir, p.file), 'utf8');
    content += text.trimEnd() + '\n\n';
  }
  await fs.writeFile(outputFile, content.trimEnd() + '\n');
  console.log(`Compiled ${parts.length} parts into ${outputFile}`);

  const min = Number(300) || 0;
  const words = content.split(/\s+/).filter(Boolean).length;
  const pages = Math.ceil(words / 300);
  if (min) {
    if (pages < min) {
      console.warn(
        `Warning: compiled book has ${pages} pages, below required ${min}`
      );
    } else {
      console.log(`Book length check passed with ${pages} pages`);
    }
  }
}

gather();
