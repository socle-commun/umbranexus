# Roadmap du Projet Umbranexus

Ce document décrit les prochaines étapes pour faire évoluer le dépôt de prototype à système fonctionnel et finaliser le manuscrit.

## Objectif Principal
Créer le premier livre 100% rédigé par une IA, atteignant exactement 419 pages, et assurer la cohérence narrative et stylistique de l'ensemble.

## Étapes Détaillées

### 1. Audit et Priorisation des Chapitres Existants
- **Vérifier les chapitres existants :** S'assurer que tous les chapitres respectent la limite de 50 lignes par partie et le minimum de 2000 mots par chapitre.
- **Vérifier les critiques et analyses :** Confirmer la présence et la qualité des critiques (`docs/critiques/`) et des analyses (`docs/explications/`) pour chaque chapitre, en veillant à ce que les critiques se concentrent sur le style lyrique sans résumer le contenu.
- **Identifier les lacunes :** Lister les chapitres qui nécessitent une expansion ou une amélioration de leur critique/analyse.

### 2. Cycle Itératif d'Écriture et de Révision
Pour chaque chapitre identifié comme nécessitant du travail (en commençant par les plus courts ou ceux avec des critiques manquantes) :
- **Lecture approfondie :** Lire toutes les parties du chapitre concerné ainsi que sa critique et son analyse.
- **Expansion/Amélioration du texte :**
    - Si le chapitre est trop court, l'étendre en ajoutant du contenu pertinent, en respectant le ton, le style (H.P. Lovecraft, Baudelaire, Mary Shelley, Jules Verne, Italo Calvino) et la cohérence narrative.
    - Maintenir l'alternance des protagonistes (Noctuvian pour les chapitres impairs, Ashar pour les chapitres pairs).
    - S'assurer que chaque nouvelle partie ne dépasse pas 50 lignes.
    - Intégrer les notions d'hermétisme, théologie celte, tablettes d'émeraude, civilisations perdues si pertinent.
- **Révision de la critique/analyse :**
    - Si la critique est manquante ou insuffisante, la rédiger ou l'améliorer en se concentrant sur le style lyrique et l'impact émotionnel, sans résumer l'intrigue.
    - Si l'analyse est manquante ou insuffisante, la rédiger ou l'améliorer en approfondissant les thèmes ésotériques et les liens avec l'univers.
- **Vérification des métriques :** Exécuter `npm run compile:chapters` après chaque modification significative pour suivre le nombre de mots et la longueur totale du livre.

### 3. Cohérence Globale et Relecture Finale
- **Relecture narrative :** Une fois tous les chapitres complétés et les métriques atteintes, effectuer une relecture complète du manuscrit pour assurer une cohérence narrative, des arcs de personnages fluides et une progression thématique harmonieuse.
- **Ajustements finaux :** Apporter les dernières retouches pour atteindre l'objectif de 419 pages et peaufiner le style.

### 4. Génération du Manuscrit Final
- **Compilation :** Utiliser `npm run compile:chapters` pour générer la version finale du manuscrit.
- **Préparation à la publication :** S'assurer que le manuscrit est prêt pour la publication (formatage, métadonnées, etc.).

## Prochaines Actions Immédiates
- **Audit des chapitres existants :**
    - Vérifier et étendre les chapitres en dessous de 2000 mots (actuellement : Chapitre 01, 03, 06, 46).
    - S'assurer que toutes les parties de chaque chapitre respectent la limite de 50 lignes.
    - Vérifier la qualité et la pertinence des critiques et analyses, en s'assurant qu'elles se concentrent sur le style lyrique et les thèmes ésotériques.
- **Maintenir la cohérence narrative et stylistique :** Lors de l'écriture ou de l'expansion, veiller à l'alternance des protagonistes, au ton (Lovecraft, Baudelaire, Shelley, Verne, Calvino) et à l'intégration des notions ésotériques.
- **Relecture continue :** Effectuer des relectures régulières pour assurer la fluidité, la progression thématique et la cohérence globale entre les chapitres.

