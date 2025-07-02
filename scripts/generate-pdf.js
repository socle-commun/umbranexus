import { execSync } from 'child_process';
import { existsSync, statSync, readdirSync } from 'fs';
import path from 'path';

const base = path.join(process.cwd(), 'docs', 'chapitres_finaux');
const input = path.join(base, 'compiled_book.md');
const output = path.join(base, 'Umbranexus-livre.pdf');
const cover = path.join('scripts', 'cover.md');
const toc = path.join('scripts', 'toc.md');
const template = path.join('scripts', 'template-umbranexus.tex');

function checkFile(file, label) {
  if (!existsSync(file)) {
    console.error(`Fichier manquant : ${label} (${file})`);
    process.exit(1);
  }
  try {
    const stats = statSync(file);
    if (stats.size === 0) {
      console.error(`Fichier vide : ${label} (${file})`);
      process.exit(1);
    }
  } catch (e) {
    console.error(`Impossible de lire ${label} (${file}) :`, e);
    process.exit(1);
  }
}

function checkPandoc() {
  try {
    execSync('pandoc --version', { stdio: 'ignore' });
  } catch {
    console.error('Pandoc n\'est pas installé ou n\'est pas dans le PATH.');
    process.exit(1);
  }
}

function checkXeLaTeX() {
  try {
    execSync('xelatex --version', { stdio: 'ignore' });
  } catch {
    console.error('XeLaTeX n\'est pas installé ou n\'est pas dans le PATH.');
    process.exit(1);
  }
}

function listDir(dir) {
  try {
    const files = readdirSync(dir);
    console.log(`Contenu de ${dir}:`);
    files.forEach(f => console.log('  -', f));
  } catch (e) {
    console.error(`Impossible de lister le dossier ${dir}:`, e);
  }
}

// Vérifications préalables
checkPandoc();
checkXeLaTeX();
checkFile(input, 'compiled_book.md');
checkFile(cover, 'cover.md');
checkFile(toc, 'toc.md');
checkFile(template, 'template-umbranexus.tex');
listDir(base);
listDir('scripts');

// Génère le PDF stylé avec couverture, toc, template LaTeX
const command = `pandoc "${cover}" "${toc}" "${input}" --pdf-engine=xelatex --template="${template}" --toc --toc-depth=2 -V mainfont=Times New Roman -V geometry:margin=2.5cm -o "${output}"`;
console.log('Commande pandoc :', command);
try {
  execSync(command, { stdio: 'inherit' });
  console.log(`PDF généré : ${output}`);
} catch (e) {
  console.error('Erreur lors de la génération du PDF :');
  if (e.stdout) {
    console.error('--- stdout ---');
    console.error(e.stdout.toString());
  }
  if (e.stderr) {
    console.error('--- stderr ---');
    console.error(e.stderr.toString());
  }
  if (e.message) {
    console.error('--- message ---');
    console.error(e.message);
  }
  if (e.stack) {
    console.error('--- stack ---');
    console.error(e.stack);
  }
  process.exit(1);
}
