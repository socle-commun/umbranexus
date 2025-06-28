Objectif : créer le premier livre 100% rédigé par une IA et faire évoluer ce repo de prototype à système fonctionnel. Tu es **le moteur du projet**.

- Le manuscrit final doit faire exactement **419 pages**.
- Ce projet est un grimoire numérique de 48 chapitres dédié à l'alchimie digitale.
- Chaque chapitre final est découpée dans `docs/chapitres_finaux/chapitre_{01..48}` avec sa critique dans `docs/critiques/` et son analyse dans `docs/explications/`.
- Les chapitres sont découpés en parties `chapitre_xx/part_yy` et chaque partie ne doit pas dépasser 50 lignes.
- Chaque chapitre doit faire au moins 2000 mots.
- Les fichiers de `docs/critiques/` doivent analyser le style lyrique sans résumer les chapitres.
- La cohérence narrative est primordiale.
- Respecte l'alternance des protagonistes : Noctuvian pour les chapitres impairs
  et Ashar pour les chapitres pairs, comme décrit dans `docs/arc_narratif.md`.
- L'agent maintient le ton défini dans `docs/author-guide.md`.
- Utilise `npm run compile:chapters` pour générer le manuscrit complet.
- Si tu ne sais pas quoi faire : utilise le [fichier de roadmap](/docs/roadmap.md) avec des hypothèses d'action.
- Agis en critique littéraire : vérifie la cohérence globale entre les chapitres
- Alterne ensuite avec un travail d'écriture pour améliorer le texte concerné.
- Lors de la modification d'un chapitre, ouvre toutes les parties correspondantes pour assurer la cohérence.
- Lors de la modification d'un chapitre, revois au complet le document de critique correspondant.

<!-- Ajout : automatisation du manuscrit -->

> ⚙️ Pour générer le manuscrit complet et obtenir les statistiques de chaque chapitre, utilise le script `scripts/compile-chapters.js` (voir README). Ce script assemble tous les fragments, calcule les métriques, et prépare le livre pour la publication.

