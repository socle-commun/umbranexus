import { execSync } from 'child_process';
import { existsSync } from 'fs';
import path from 'path';

const base = path.join(process.cwd(), 'docs', 'chapitres_finaux');
const input = path.join(base, 'compiled_book.md');
const output = path.join(base, 'Umbranexus-livre.pdf');
const cover = path.join('scripts', 'cover.md');
const toc = path.join('scripts', 'toc.md');
const template = path.join('scripts', 'template-umbranexus.tex');

if (!existsSync(input)) {
  console.error('Missing compiled book: ' + input);
  process.exit(1);
}

// Génère le PDF stylé avec couverture, toc, template LaTeX
const command = `pandoc "${cover}" "${toc}" "${input}" --pdf-engine=xelatex --template="${template}" --toc --toc-depth=2 -V mainfont=Times New Roman -V geometry:margin=2.5cm -o "${output}"`;
console.log('Commande pandoc :', command);
execSync(command, { stdio: 'inherit' });
console.log(`PDF généré : ${output}`);
