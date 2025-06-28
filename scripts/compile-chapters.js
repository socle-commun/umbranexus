/**
 * compile-chapters.js
 *
 * Ce script concatène les fragments Markdown de chaque chapitre d'un livre collaboratif.
 *
 * Fonctionnement :
 * 1. Pour chaque dossier docs/chapitres_finaux/chapitre_XX/ :
 *    - Concatène tous les fragments .md du dossier (triés par nom) dans un fichier chapitre_XX.md à la racine de chapitres_finaux.
 *    - Affiche pour chaque chapitre le nombre de lignes, de mots et de caractères (hors espaces).
 *    - Les fichiers chapitre_XX.md sont ignorés par git (voir .gitignore).
 *
 * 2. Compile tous les fichiers chapitre_XX.md dans un unique fichier compiled_book.md avec :
 *    - Un frontmatter YAML enrichi (titre, auteur, date, langue, description).
 *    - Un saut de page (\\newpage) entre chaque chapitre pour Pandoc.
 *    - Un résumé global du nombre de pages et de mots.
 *
 * Utilisation :
 *   node scripts/compile-chapters.js
 *
 * Prérequis :
 *   - Node.js >= 14
 *   - Les dossiers de chapitres doivent être nommés chapitre_XX (XX = numéro sur 2 chiffres)
 *   - Les fragments doivent être des fichiers .md dans chaque dossier chapitre_XX
 *
 * Sorties :
 *   - docs/chapitres_finaux/chapitre_XX.md (un par chapitre)
 *   - docs/chapitres_finaux/compiled_book.md (livre complet)
 */

import { promises as fs } from 'fs';
import path from 'path';

const chaptersDir = path.join('docs', 'chapitres_finaux');
const outputFile = path.join(chaptersDir, 'compiled_book.md');

async function generateChapterFiles() {
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

  for (const dir of chapterDirs) {
    const chapterPath = path.join(chaptersDir, dir);
    const fragments = (await fs.readdir(chapterPath, { withFileTypes: true }))
      .filter(f => f.isFile() && f.name.endsWith('.md'))
      .map(f => f.name)
      .sort();
    let chapterContent = '';
    for (const frag of fragments) {
      let text = await fs.readFile(path.join(chapterPath, frag), 'utf8');
      text = text.replace(/^---\s*$/gm, '***');
      chapterContent += text.trimEnd() + '\n\n';
    }
    const chapterFile = path.join(chaptersDir, `${dir}.md`);
    await fs.writeFile(chapterFile, chapterContent.trimEnd() + '\n');

    // Statistiques du chapitre
    const lines = chapterContent.split(/\r?\n/).length;
    const words = chapterContent.split(/\s+/).filter(Boolean).length;
    const chars = chapterContent.replace(/\s+/g, '').length; // ignore les caractères blancs
    console.log(`Chapitre ${dir}: ${lines} lignes, ${words} mots, ${chars} caractères (hors espaces)`);
  }
}

async function compileBook() {
  // Recherche tous les fichiers chapitre_XX.md
  const chapterFiles = (await fs.readdir(chaptersDir, { withFileTypes: true }))
    .filter(f => f.isFile() && /^chapitre_\d{2}\.md$/.test(f.name))
    .map(f => f.name)
    .sort((a, b) => {
      const nA = parseInt(a.match(/chapitre_(\d{2})/)[1], 10);
      const nB = parseInt(b.match(/chapitre_(\d{2})/)[1], 10);
      return nA - nB;
    });

  let content = '';
  // Frontmatter YAML amélioré
  content += `---\ntitle: "Umbranexus"\nauthor: "Collectif"\ndate: "${new Date().toISOString().slice(0, 10)}"\nlang: fr\ndescription: "Roman collaboratif généré par la communauté Umbranexus."\n---\n\n`;

  let totalChapters = 0;
  for (const file of chapterFiles) {
    let text = await fs.readFile(path.join(chaptersDir, file), 'utf8');
    content += text.trimEnd() + '\n\n';
    // Saut de page Pandoc
    content += '\n\\newpage\n\n';
    totalChapters++;
  }
  await fs.writeFile(outputFile, content.trimEnd() + '\n');
  console.log(`Compiled ${totalChapters} chapters into ${outputFile}`);

  // Statistiques
  const words = content.split(/\s+/).filter(Boolean).length;
  const pages = Math.ceil(words / 300);
  console.log(`Book length: ~${pages} pages (${words} words)`);
}

async function main() {
  await generateChapterFiles();
  await compileBook();
}

main();
