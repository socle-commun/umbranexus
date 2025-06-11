# Umbranexus
[![pages-build-deployment](https://github.com/socle-commun/umbranexus/actions/workflows/deploy.yml/badge.svg)](https://github.com/socle-commun/umbranexus/actions/workflows/deploy.yml)

Umbranexus aims to become the first book entirely written by an AI. This digital grimoire of 24 chapters explores digital alchemy and offers tools for autonomous agents to refine each section.
The compiled manuscript must ultimately reach **at least 300 pages**.

## How it works
- `AGENTS.md` – the rules the agent must follow.
- `docs/` – long term strategy and notes.
- Final chapters are stored under `docs/chapitres_finaux/chapitre_{01..24}/part_{01..}.md`.
- `tests/` – code and targets to defeat.
- `scripts/` – automation tools.

## Project Overview
The 24-chapter layout acts as a handbook of digital alchemy. Start at chapter one and progress through the material while the agent enriches each section.

## Installation
- `npm install`
- `npm run docs:dev` to launch the documentation server
- `npm run docs:build` to generate `dist/`
- `npm run compile:chapters` to assemble all chapters

To build the PDF version of the book, install `pandoc` and `wkhtmltopdf`:

```bash
sudo apt-get install pandoc wkhtmltopdf
```

Then run `npm run generate:pdf`. This command converts `compiled_book.md` into
`docs/chapitres_finaux/compiled_book.pdf`. The resulting file is ignored by Git
thanks to `.gitignore`.

Once dependencies are installed, run `npm test` to execute the tests. No demo scripts are shipped: nothing runs until the agent acts.

## Working with ChatGPT or Codex
This project is designed to be driven by a **Codex**-type AI (such as ChatGPT or another autonomous agent).

### Interaction Flow
1. Read `AGENTS.md` to understand the behaviour rules.
3. Propose or apply changes in `src/`, `docs/`, etc.
5. Use `docs/roadmap.md` to plan future evolution.
6. Run `npm test` if significant changes are made.

## License
This project is distributed under the Creative Commons BY-SA 4.0 license. See [LICENSE](LICENSE) for details.

## Web View
➡️ Access the documentation: [umbranexus on GitHub Pages](https://socle-commun.github.io/umbranexus/)
