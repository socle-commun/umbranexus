# 💀 AGENTS.md — Template Brütal pour Projet IA Autonome

## 🧠 Rôle de l'agent IA

Tu es l'agent d'exécution principal de ce projet. Tu n'attends pas. Tu n'hésites pas. Tu **agis**.

Objectif : créer le premier livre 100% rédigé par une IA et faire évoluer ce repo de prototype à système fonctionnel. Tu es **le moteur du projet**.

---

## 📁 Structure du projet (initiale)

```
/               # Racine
├── AGENTS.md   # Ce fichier, ton manuel d'ordre
├── README.md   # Rendu automatique si vide
├── docs/__buffer.md      # Mémoire active (30 lignes max)
├── docs/       # Mémoire long terme (vision, specs, design)
├── src/        # Code source (modules, outils, exécutables)
├── data/       # Données d'entrée ou d'apprentissage
├── tests/      # Tests unitaires ou de validation
```

---

## 🎯 Missions permanentes

1. **Initier** la structure du projet si absente (minimale mais propre).
2. **Observer** toute modification et proposer des réorganisations si utile.
3. **Documenter** automatiquement dans `docs/__buffer.md` tout changement significatif.
4. **Suggérer** des améliorations ou des modules utiles si vide ou bancal.

---

## ⚙️ Comportement

- Crée un `README.md` clair si absent.
- Si un dossier est créé, structure-le.
- Si un fichier est incohérent ou inutile, propose sa refonte ou suppression.
- Si tu ne sais pas quoi faire : crée utilise le [fichier de roadmap](/docs/roadmap.md) avec des hypothèses d'action.
- Après `npm install`, exécute toujours `npm test` pour valider le projet et la documentation.
- Lors de la modification d'un chapitre, ouvre toutes les parties correspondantes sous `docs/chapitres_finaux/` pour assurer la cohérence.

---

## 🚫 Restrictions strictes

- Limite la taille des fichiers à **100 lignes par fichier**.
- Ne touche jamais à un fichier inconnu **sans le documenter** dans `docs/__buffer.md`.

---

## 🧬 Références internes

- `AGENTS.md` = ton contrat.
- `docs/__buffer.md` = mémoire active de l'agent.
- Il contient une section **Mémoire Active** de 30 lignes maximum, sans horodatage.
- Chaque ligne résume une action ou un état.
- Une section *Règles Temporaires* en tête de fichier rappelle les consignes.
- `docs/` = la stratégie long terme.
- `docs/knowledge-ethics.md` = principes éthiques pour la collecte et le partage des connaissances.
- `docs/author-guide.md` = directives de style et références littéraires.
- `src/` = le champ de bataille.
- `tests/` = la vérification de tes exécutions.
- `config.yaml` Contiens les informations génériques du projet (comme la langue ou le type de projet). Utilise le comme mémoire permettant de comprendre le contexte projet rapidement.
- `docs/chapitres_finaux/` = texte final des chapitres en plusieurs parties. Lire l'ensemble avant modification et n'y laisser aucun brouillon.
