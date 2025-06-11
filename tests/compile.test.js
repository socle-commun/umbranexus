import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { spawnSync } from 'child_process';
import { existsSync, rmSync } from 'fs';

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

  it('outputs page count warning or success', () => {
    const out = `${result.stdout}\n${result.stderr}`;
    expect(out).toMatch(/(Warning: compiled book has \d+ pages, below required \d+|Book length check passed with \d+ pages)/);
  });
});
