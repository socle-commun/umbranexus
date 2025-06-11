import { execSync } from 'child_process';
import { existsSync } from 'fs';
import path from 'path';

const base = path.join('docs', 'chapitres_finaux');
const input = path.join(base, 'compiled_book.md');
const output = path.join(base, 'compiled_book.pdf');

if (!existsSync(input)) {
  console.error('Missing compiled book: ' + input);
  process.exit(1);
}

const command = `pandoc ${input} -o ${output} --pdf-engine=wkhtmltopdf`;
execSync(command, { stdio: 'inherit' });
console.log(`PDF generated at ${output}`);
