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

  await Promise.all(chapterDirs.map(async (dir) => {
    const chapterPath = path.join(chaptersDir, dir);
    const fragments = (await fs.readdir(chapterPath, { withFileTypes: true }))
      .filter(f => f.isFile() && f.name.endsWith('.md'))
      .map(f => f.name)
      .sort();

    const fragmentData = await Promise.all(fragments.map(async (frag) => {
      try {
        let text = await fs.readFile(path.join(chapterPath, frag), 'utf8');
        const lines = text.split(/\r?\n/).length; // Calculate lines for this fragment
        return { name: frag, content: text.replace(/^---\s*$/gm, '***').trimEnd(), lines: lines };
      } catch (error) {
        console.error(`Error reading fragment ${frag} in ${dir}:`, error);
        return { name: frag, content: '', lines: 0 };
      }
    }));

    const chapterContent = fragmentData.filter(d => d.content).map(d => d.content).join('\n\n') + '\n';
    const chapterFile = path.join(chaptersDir, `${dir}.md`);
    try {
      await fs.writeFile(chapterFile, chapterContent.trimEnd() + '\n');
    } catch (error) {
      console.error(`Error writing chapter file ${chapterFile}:`, error);
    }

    // Statistiques du chapitre
    const lines = chapterContent.split(/\r?\n/).length;
    const words = chapterContent.split(/\s+/).filter(Boolean).length;
    const chars = chapterContent.replace(/\s+/g, '').length; // ignore les caractères blancs
    console.log(`Chapitre ${dir}: ${lines} lignes, ${words} mots, ${chars} caractères (hors espaces)`);

    // New: Log lines per part
    console.log(`  Détail des parties pour ${dir}:`);
    fragmentData.forEach(data => {
      console.log(`    - ${data.name}: ${data.lines} lignes`);
    });
  }));
}

async function updateTOC(chapterFiles) {
  // Génère une table des matières Markdown simple
  const tocLines = [
    '# Table des matières',
    '',
    
    ...chapterFiles.map(f => {
      const num = f.match(/chapitre_(\d{2})/)[1];
      return `- [Chapitre ${num}](chapitre_${num}.md)`;
    })
  ];
  const tocPath = path.join(chaptersDir, 'toc.md');
  await fs.writeFile(tocPath, tocLines.join('\n') + '\n');
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

  // Met à jour la table des matières
  await updateTOC(chapterFiles);

  let content = '';
  // Frontmatter YAML amélioré
  content += `---\ntitle: "Umbranexus"\nauthor: "Collectif"\ndate: "${new Date().toISOString().slice(0, 10)}"\nlang: fr\ndescription: "Roman collaboratif généré par la communauté Umbranexus."\n---\n\n`;

  const chapterContents = await Promise.all(chapterFiles.map(async (file) => {
    try {
      let text = await fs.readFile(path.join(chaptersDir, file), 'utf8');
      return text.trimEnd() + '\n\n' + '\n\\newpage\n\n';
    } catch (error) {
      console.error(`Error reading chapter file ${file}:`, error);
      return '';
    }
  }));

  let totalChapters = chapterFiles.length;
  content += chapterContents.filter(Boolean).join('');
  await fs.writeFile(outputFile, content.trimEnd() + '\n');
  console.log(`Compiled ${totalChapters} chapters into ${outputFile}`);

  // Statistiques
  const words = content.split(/\s+/).filter(Boolean).length;
  const pages = Math.ceil(words / 300);
  console.log(`Book length: ~${pages} pages (${words} words)`);
  if (pages >= 419) {
    console.log(`Book length check passed with ${pages} pages`);
  } else {
    console.log(`Warning: compiled book has ${pages} pages, below required 419`);
  }
}

export async function main() {
  await generateChapterFiles();
  await compileBook();
}

// Si le script est exécuté directement via `node scripts/compile-chapters.js`
// (et non importé comme module), on lance la fonction main automatiquement.
import { fileURLToPath } from 'url';

const isDirectRun = process.argv[1] &&
  path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);

if (isDirectRun) {
  main().catch(err => {
    console.error(err);
    process.exit(1);
  });
}
