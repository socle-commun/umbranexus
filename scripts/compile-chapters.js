import { promises as fs } from 'fs';
import path from 'path';

const chaptersDir = path.join('docs', 'chapitres_finaux');
const outputFile = path.join(chaptersDir, 'compiled_book.md');

async function gather() {
  // Recherche tous les fichiers chapitre_XX.md à la racine de chaptersDir
  const files = (await fs.readdir(chaptersDir, { withFileTypes: true }))
    .filter(f => f.isFile() && /^chapitre_\d{2}\.md$/.test(f.name))
    .map(f => f.name)
    .sort((a, b) => {
      // Tri naturel par numéro de chapitre
      const nA = parseInt(a.match(/chapitre_(\d{2})\.md/)[1], 10);
      const nB = parseInt(b.match(/chapitre_(\d{2})\.md/)[1], 10);
      return nA - nB;
    });

  let content = '';
  // Ajout du frontmatter YAML pour Pandoc
  content += '---\ntitle: "Umbranexus"\n---\n\n';
  for (const file of files) {
    const text = await fs.readFile(path.join(chaptersDir, file), 'utf8');
    content += text.trimEnd() + '\n\n';
  }
  await fs.writeFile(outputFile, content.trimEnd() + '\n');
  console.log(`Compiled ${files.length} chapters into ${outputFile}`);

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
