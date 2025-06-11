import { describe, it, expect } from 'vitest';
import { readdirSync, readFileSync } from 'fs';
import { join } from 'path';

function getPartFiles() {
  const base = 'docs/chapitres_finaux';
  return readdirSync(base, { withFileTypes: true })
    .filter(dir => dir.isDirectory() && dir.name.startsWith('chapitre_'))
    .flatMap(dir => {
      const dirPath = join(base, dir.name);
      return readdirSync(dirPath)
        .filter(f => f.startsWith('part_') && f.endsWith('.md'))
        .map(f => join(dirPath, f));
    });
}

describe('Final chapters length', () => {
  const files = getPartFiles();
  files.forEach(file => {
    it(`${file} should not exceed 100 lines`, () => {
      const content = readFileSync(file, 'utf8');
      const lineCount = content.split(/\r?\n/).length;
      expect(lineCount).toBeLessThanOrEqual(100);
    });
  });
});
