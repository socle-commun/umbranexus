import { promises as fs } from 'fs';
import path from 'path';

const docsDir = 'docs';
const outputIndex = path.join(docsDir, 'index.json');
const summariesDir = path.join(docsDir, 'summaries');

const folders = [
  { dir: path.join(docsDir, 'chapitres_finaux'), type: 'chapitre' },
  { dir: path.join(docsDir, 'explications'), type: 'explication' },
  { dir: path.join(docsDir, 'critiques'), type: 'critique' },
];

await fs.mkdir(summariesDir, { recursive: true });

const index = [];

for (const { dir, type } of folders) {
  const files = await fs.readdir(dir);
  for (const file of files) {
    if (!file.endsWith('.md')) continue;
    const filePath = path.join(dir, file);
    const relPath = path.relative(docsDir, filePath);
    const content = await fs.readFile(filePath, 'utf8');

    const title =
      content.split('\n').find(l => l.startsWith('#'))?.replace(/^#+\s*/, '').trim() || file;

    const plain = content
      .replace(/```[^]*?```/g, '')
      .replace(/#+\s*/g, '')
      .replace(/>.*\n/g, '')
      .replace(/\[(.*?)\]\(.*?\)/g, '$1')
      .replace(/[\\`*_{}\[\]()#+>!-]/g, '')
      .replace(/\s+/g, ' ')
      .trim();
    const summaryWords = plain.split(' ').filter(Boolean).slice(0, 50);
    const summary = summaryWords.join(' ');
    await fs.writeFile(path.join(summariesDir, file.replace(/\.md$/, '.md')), summary + '\n');

    index.push({ path: relPath, title, type });
  }
}

await fs.writeFile(outputIndex, JSON.stringify(index) + '\n');
