# Umbranexus
[![pages-build-deployment](https://github.com/socle-commun/umbranexus/actions/workflows/deploy.yml/badge.svg)](https://github.com/socle-commun/umbranexus/actions/workflows/deploy.yml)

Umbranexus aims to become the first book entirely written by an AI. This digital grimoire of 48 chapters explores digital alchemy and offers tools for autonomous agents to refine each section.
The compiled manuscript must ultimately reach **exactly 419 pages**.
This project requires **Node.js 20 or higher**.

## How it works
- `AGENTS.md` – the rules the agent must follow.
- `docs/` – long term strategy and notes.
- Final chapters are stored under `docs/chapitres_finaux/chapitre_{01..48}.md`.
- `tests/` – code and targets to defeat.
- `scripts/` – automation tools.

## Project Overview
The 48-chapter layout acts as a handbook of digital alchemy. Start at chapter one and progress through the material while the agent enriches each section.

## Installation
- Ensure **Node.js 20 or higher** is installed
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

## AI-driven Iterative Writing Workflow

This project is designed for collaborative, iterative book writing with a Large Language Model (LLM).

### Objective
The goal is to have an LLM write, improve, and critique a 48-chapter book through multiple iterations, using structured feedback and guidelines.

### Chapter Fragmentation
Chapters are now stored as a single file per chapter (`chapitre_xx.md`). The previous fragmentation in `part_XX.md` files has been removed for clarity and coherence. All references to `part_XX.md` are obsolete.

### Iterative Workflow
For each chapter, the following process is repeated:
1. **Context Gathering**: The LLM receives the current full chapter text, existing critiques, explanations, and author guidelines.
2. **Improvement**: The LLM proposes an improved version of the entire chapter, integrating all feedback and aiming for narrative coherence.
3. **Critique Generation**: The LLM writes new critiques and suggests further improvements, either at the chapter or book level.
4. **Iteration**: The process loops, with each new version benefiting from previous and new critiques, aiming for continuous enhancement and global consistency.

### Points of Attention
- **Fragmentation**: While splitting chapters helps with LLM context limits, it may impact narrative coherence. Periodic full-chapter or book-wide passes are recommended.
- **Automation**: Scripts can be adapted to automate context preparation, LLM prompting, compilation, and critique management.

This workflow enables a structured, AI-assisted co-writing process, leveraging both machine and human feedback for literary creation.

## Génération automatique du manuscrit

Le script `scripts/compile-chapters.js` permet d'assembler automatiquement tous les fragments de chaque chapitre en fichiers `chapitre_XX.md`, puis de compiler l'ensemble dans `compiled_book.md` avec statistiques et frontmatter enrichi. Utilisez la commande :

```bash
node scripts/compile-chapters.js
```

Ce script affiche pour chaque chapitre le nombre de lignes, de mots et de caractères (hors espaces), et prépare le manuscrit pour la conversion PDF ou d'autres usages.

## License
This project is distributed under the Creative Commons BY-SA 4.0 license. See [LICENSE](LICENSE) for details.

## Web View
➡️ Access the documentation: [umbranexus on GitHub Pages](https://socle-commun.github.io/umbranexus/)
