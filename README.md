# Umbranexus
[![pages-build-deployment](https://github.com/socle-commun/umbranexus/actions/workflows/deploy.yml/badge.svg)](https://github.com/socle-commun/umbranexus/actions/workflows/deploy.yml)

Umbranexus aims to become the first book entirely written by an AI. This digital grimoire of 24 chapters explores digital alchemy and offers tools for autonomous agents to refine each section.

## How it works
- `AGENTS.md` – the rules the agent must follow.
- `docs/__buffer.md` – short trace of actions, last line = next directive.
- `docs/` – long term strategy and notes.
- `docs/knowledge-ethics.md` – ethical guidelines for reliable information.
- `docs/author-guide.md` – author guide for objectives and style.
 - `src/`, `tests/` – code and targets to defeat.
 - `scripts/` – automation tools (`npm run bulk:revise`, `npm run compile:chapters`).

Everything is lightweight and ready to expand once the agent wakes up.

## Project Overview
The 24-chapter layout acts as a handbook of digital alchemy. Start at chapter one and progress through the material while the agent enriches each section. See [TEMPLATE.md](TEMPLATE.md) for folder descriptions.

## Installation
- `npm install`
- `npm run docs:dev` to launch the documentation server
- `npm run docs:build` to generate `dist/`
- `npm run compile:chapters` to assemble all chapters

Once dependencies are installed, run `npm test` to execute the tests. No demo scripts are shipped: nothing runs until the agent acts.

## Configuration
Settings are centralized in `config.yaml`:
- `mode` indicates the prototype stage.
- `doc_engine` specifies the **VitePress** documentation generator.

## Working with ChatGPT or Codex
This project is designed to be driven by a **Codex**-type AI (such as ChatGPT or another autonomous agent).

### Interaction Flow
1. Read `AGENTS.md` to understand the behaviour rules.
2. Check the last line of `docs/__buffer.md` for the next directive.
3. Propose or apply changes in `src/`, `docs/`, etc.
4. Document actions in `docs/__buffer.md` (maximum 30 lines).
5. Use `docs/roadmap.md` to plan future evolution.
6. Run `npm test` if significant changes are made.

## License
This project is distributed under the Creative Commons BY-SA 4.0 license. See [LICENSE](LICENSE) for details.

## Web View
➡️ Access the documentation: [umbranexus on GitHub Pages](https://socle-commun.github.io/umbranexus/)
