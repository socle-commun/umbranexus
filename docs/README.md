# Project Documentation

Umbranexus aims to craft the first book fully written by AI. This folder stores
long-term notes, chapter analyses and references used to expand that goal.

## Structure des chapitres finaux

Les chapitres finaux sont désormais fragmentés dans des dossiers distincts :

- Chaque dossier `chapitre_XX/` (par exemple : `chapitre_01/`, `chapitre_02/`...) contient les fragments du chapitre sous forme de fichiers Markdown (`part_01.md`, `part_02.md`, etc.).
- L'ordre des fragments est déterminé par l'ordre alphanumérique de leur nom (par exemple, `part_01.md`, `part_02.md`, ...).
- Le script `scripts/compile-chapters.js` assemble automatiquement tous les fragments de chaque chapitre dans l'ordre des dossiers, puis compile le livre complet dans `compiled_book.md`.

## Compilation du livre

Pour compiler le livre :

```bash
node scripts/compile-chapters.js
```

Le résultat sera dans `docs/chapitres_finaux/compiled_book.md`.
