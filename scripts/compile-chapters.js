import { promises as fs } from 'fs';
import path from 'path';

const chaptersDir = path.join('docs', 'chapitres_finaux');
const outputFile = path.join(chaptersDir, 'compiled_book.md');

async function gather() {
  // Recherche tous les dossiers chapitre_XX/
  const chapterDirs = (await fs.readdir(chaptersDir, { withFileTypes: true }))
    .filter(f => f.isDirectory() && /^chapitre_\d{2}$/.test(f.name))
    .map(f => f.name)
    .sort((a, b) => {
      // Tri naturel par numéro de chapitre
      const nA = parseInt(a.match(/chapitre_(\d{2})/)[1], 10);
      const nB = parseInt(b.match(/chapitre_(\d{2})/)[1], 10);
      return nA - nB;
    });

  let content = '';
  // Ajout du frontmatter YAML pour Pandoc
  content += '---\ntitle: "Umbranexus"\n---\n\n';
  let totalFragments = 0;
  for (const dir of chapterDirs) {
    const chapterPath = path.join(chaptersDir, dir);
    // Récupère tous les fragments .md du dossier, triés par nom (ex: part_01.md, part_02.md...)
    const fragments = (await fs.readdir(chapterPath, { withFileTypes: true }))
      .filter(f => f.isFile() && f.name.endsWith('.md'))
      .map(f => f.name)
      .sort();
    for (const frag of fragments) {
      let text = await fs.readFile(path.join(chapterPath, frag), 'utf8');
      // Remplace tout bloc '---' seul sur une ligne par '***' pour éviter les faux frontmatters YAML
      text = text.replace(/^---\s*$/gm, '***');
      content += text.trimEnd() + '\n\n';
      totalFragments++;
    }
  }
  await fs.writeFile(outputFile, content.trimEnd() + '\n');
  console.log(`Compiled ${chapterDirs.length} chapters (${totalFragments} fragments) into ${outputFile}`);

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
