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

- Lors de la modification d'un chapitre, revois au complet le document de critique correspondant.

### Méthode pour Assurer la Cohérence Narrative Inter-Chapitres

**Objectif :** Garantir une transition fluide et logique entre les chapitres, en maintenant la cohérence narrative, thématique et stylistique de l'ensemble du manuscrit.

**Étapes :**

1.  **Lecture Contextuelle du Chapitre Précédent (Chapitre N) :**
    *   Lire attentivement la dernière partie du `Chapitre N` (ou le chapitre entier si nécessaire) pour en saisir le dénouement narratif, l'état émotionnel et intellectuel du protagoniste, et les thèmes clés abordés.
    *   Identifier les éléments narratifs (événements, révélations, cliffhangers) et thématiques (concepts, émotions, symboles) qui concluent ce chapitre.

2.  **Lecture Contextuelle du Chapitre Suivant (Chapitre N+1) :**
    *   Lire attentivement la première partie du `Chapitre N+1` (ou le chapitre entier si nécessaire) pour comprendre son introduction, les nouveaux éléments narratifs ou thématiques qu'il introduit, et l'état initial de son protagoniste.
    *   Identifier les éléments narratifs et thématiques qui ouvrent ce chapitre.

3.  **Analyse de la Transition :**
    *   **Flux Narratif :** La transition est-elle logique ? Y a-t-il des sauts abrupts ou des informations manquantes qui pourraient désorienter le lecteur ? Les événements du `Chapitre N` ont-ils une répercussion claire sur le `Chapitre N+1` ?
    *   **Cohérence Thématique :** Les thèmes principaux sont-ils repris, développés ou introduits de manière harmonieuse ? Y a-t-il une progression ou un contraste intentionnel ?
    *   **État du Personnage :** L'état psychologique et la situation du protagoniste à la fin du `Chapitre N` sont-ils cohérents avec le début du `Chapitre N+1` ?
    *   **Ton et Style :** Le ton et le style d'écriture se fondent-ils naturellement d'un chapitre à l'autre, ou y a-t-il une rupture involontaire ?

4.  **Modification Ciblée (Conclusion du Chapitre N) :**
    *   Basé sur l'analyse de la transition, réviser la conclusion du `Chapitre N`. L'objectif n'est pas de résumer le chapitre suivant, mais de créer un pont naturel.
    *   Cela peut inclure :
        *   L'ajout d'une phrase ou d'un paragraphe qui fait écho à un élément clé du début du `Chapitre N+1`.
        *   L'ajustement de la résonance émotionnelle pour préparer le lecteur au ton du chapitre suivant.
        *   La subtile introduction d'un indice ou d'une question qui sera explorée dans le chapitre suivant.
        *   La variation du phrasé pour éviter la répétition, tout en conservant l'essence thématique.

5.  **Vérification Post-Modification :**
    *   Relire la conclusion révisée du `Chapitre N` et le début du `Chapitre N+1` ensemble pour confirmer que la transition est désormais fluide et cohérente.

<!-- Ajout : automatisation du manuscrit -->

> ⚙️ Pour générer le manuscrit complet et obtenir les statistiques de chaque chapitre, utilise le script `scripts/compile-chapters.js` (voir README). Ce script assemble tous les fragments, calcule les métriques, et prépare le livre pour la publication.

## Vérification automatisée des contraintes du manuscrit

Des tests automatisés (voir `tests/compile.test.js`) assurent :

- **50 lignes max par partie** (`part_yy.md`)
- **2000 mots min par chapitre** (`chapitre_xx.md`)
- **419 pages min pour le livre** (`compiled_book.md`, 300 mots/page)

### Comment utiliser les tests

1. Compiler le livre : `npm run compile:chapters`
2. Lancer les tests : `npm test`

Tout échec indique une contrainte non respectée (voir le détail dans la sortie du test).

