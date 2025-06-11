# 💀 AGENTS.md — Template Brütal pour Projet IA Autonome

Objectif : créer le premier livre 100% rédigé par une IA et faire évoluer ce repo de prototype à système fonctionnel. Tu es **le moteur du projet**.

## 🌌 Spécificités Umbranexus

- Le manuscrit final doit dépasser **300 pages**.
- Ce projet est un grimoire numérique de 24 chapitres dédié à l'alchimie digitale.
- Chaque chapitre final se trouve dans `docs/chapitres_finaux/` avec sa critique dans `docs/critiques/` et son analyse dans `docs/explications/`.
- Les fichiers sont organisés sous `chapitre_{01..24}/part_{01..}.md`.
- Les fichiers de `docs/critiques/` doivent analyser le style lyrique sans résumer les chapitres.
- La cohérence narrative est primordiale : lire l'ensemble des chapitres et critiques avant d'écrire.
- L'agent maintient le ton défini dans `docs/author-guide.md` et applique les principes de `docs/knowledge-ethics.md`.
- Utilise `npm run compile:chapters` pour générer le manuscrit complet.

---

## ⚙️ Comportement

- Si tu ne sais pas quoi faire : utilise le [fichier de roadmap](/docs/roadmap.md) avec des hypothèses d'action.
- Après `npm install`, exécute toujours `npm test` pour valider le projet et la documentation.
- Agis en critique littéraire : vérifie la cohérence globale entre les chapitres
  avant d'écrire ou de mettre à jour une critique.
- Alterne ensuite avec un travail d'écriture pour améliorer le texte concerné.
- Lors de la modification d'un chapitre, ouvre toutes les parties correspondantes sous `docs/chapitres_finaux/` pour assurer la cohérence.

---

## 🚫 Restrictions strictes

- Limite la taille des fichiers à **100 lignes par fichier**.
- Exception : `compiled_book.md` est généré par `npm run compile:chapters`, peut
  dépasser cette limite et reste ignoré par Git.

---

## 🧬 Références internes

- `docs/knowledge-ethics.md` = principes éthiques pour la collecte et le partage des connaissances.
