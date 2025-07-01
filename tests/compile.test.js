import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { spawnSync } from 'child_process';
import { existsSync, rmSync } from 'fs';
import fs from 'fs';
import path from 'path';

const outputFile = 'docs/chapitres_finaux/compiled_book.md';

const compileBook = () => {
  return spawnSync('npm', ['run', 'compile:chapters'], { encoding: 'utf8' });
};

describe('Compile chapters', () => {
  let result;

  beforeAll(() => {
    result = compileBook();
  });

  afterAll(() => {
    if (existsSync(outputFile)) {
      rmSync(outputFile);
    }
  });

  it('creates compiled_book.md', () => {
    expect(existsSync(outputFile)).toBe(true);
  });

  
});

describe('Book structure constraints (autonomous)', () => {
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

  it('the reconstructed book must have at least 419 pages (300 words/page)', () => {
    // Rebuild the book in memory from chapter files
    const chapterFiles = fs.readdirSync(chaptersDir)
      .filter(f => /^chapitre_\d{2}\.md$/.test(f))
      .sort();
    let bookContent = '';
    for (const file of chapterFiles) {
      bookContent += fs.readFileSync(path.join(chaptersDir, file), 'utf8') + '\n';
    }
    const words = bookContent.split(/\s+/).filter(Boolean).length;
    const pages = Math.ceil(words / 300);
    expect(pages).toBeGreaterThanOrEqual(419);
  });
});
