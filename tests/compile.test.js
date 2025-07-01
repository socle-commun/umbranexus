import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { existsSync, rmSync } from 'fs';
import fs from 'fs';
import path from 'path';
import { main as compileChaptersMain } from '../scripts/compile-chapters.js';

const outputFile = 'docs/chapitres_finaux/compiled_book.md';

const compileBook = async () => {
  await compileChaptersMain();
};

describe('Compile chapters', () => {
  beforeAll(async () => {
    await compileBook();
  });

  

  it('creates compiled_book.md', () => {
    expect(existsSync(outputFile)).toBe(true);
  });

  
});

describe('Book structure constraints (autonomous)', () => {
  beforeAll(async () => {
    await compileBook();
  });
  
  const chaptersDir = path.join('docs', 'chapitres_finaux');

  it('each chapter part must not exceed 50 lines', () => {
    const chapterFolders = fs.readdirSync(chaptersDir, { withFileTypes: true })
      .filter(f => f.isDirectory() && /^chapitre_\d{2}$/.test(f.name));
    for (const folder of chapterFolders) {
      const parts = fs.readdirSync(path.join(chaptersDir, folder.name))
        .filter(f => f.endsWith('.md'));
      for (const part of parts) {
        const content = fs.readFileSync(path.join(chaptersDir, folder.name, part), 'utf8');
        const lines = content.split(/\r?\n/).length;
        expect(lines).toBeLessThanOrEqual(50);
      }
    }
  });

  it('each chapter must have at least 2000 words', () => {
    const chapterFiles = fs.readdirSync(chaptersDir)
      .filter(f => /^chapitre_\d{2}\.md$/.test(f));
    for (const file of chapterFiles) {
      const content = fs.readFileSync(path.join(chaptersDir, file), 'utf8');
      const words = content.split(/\s+/).filter(Boolean).length;
      expect(words).toBeGreaterThanOrEqual(2000);
    }
  });

  it('the compiled book must have at least 419 pages (300 words/page)', async () => {
    // Add a small delay and retry mechanism to ensure the file is written
    let compiledBookContent = '';
    for (let i = 0; i < 5; i++) {
      try {
        compiledBookContent = fs.readFileSync(outputFile, 'utf8');
        break;
      } catch (error) {
        if (error.code === 'ENOENT') {
          await new Promise(resolve => setTimeout(resolve, 100)); // Wait 100ms
        } else {
          throw error;
        }
      }
    }
    expect(compiledBookContent).not.toBe(''); // Ensure content is not empty
    const words = compiledBookContent.split(/\s+/).filter(Boolean).length;
    const pages = Math.ceil(words / 300);
    expect(pages).toBeGreaterThanOrEqual(419);
  });
});
