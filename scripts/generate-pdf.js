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

// Preserve line breaks from the markdown sources so the PDF keeps the
// intended formatting. The `hard_line_breaks` extension forces Pandoc to
// treat every newline as a real line break.
const command = `pandoc ${input} -o ${output} --pdf-engine=wkhtmltopdf -f markdown+hard_line_breaks`;
execSync(command, { stdio: 'inherit' });
console.log(`PDF generated at ${output}`);
