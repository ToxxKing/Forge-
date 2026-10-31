# FORGE

Application de musculation mobile, installable sur téléphone et **utilisable sans connexion** (PWA).
Programme de recomposition sur 12 semaines, séance guidée série par série, 79 exercices détaillés, suivi complet.

## Stack

| Outil | Rôle | Pourquoi |
|---|---|---|
| JavaScript (modules ES) + lit-html | Interface | Rendu déclaratif et efficace pour ~7 Ko, sans framework lourd |
| Vite | Développement et build | Build rapide, découpage en modules, intégration PWA |
| vite-plugin-pwa (Workbox) | Service Worker, cache, manifeste | App installable et 100 % fonctionnelle hors ligne |
| IndexedDB (`idb`) | Base locale | Pas de limite à 5 Mo, photos stockées en Blob |
| Fontsource (Barlow, Barlow Condensed) | Polices auto-hébergées | Disponibles hors ligne |
| Lucide | Icônes | Jeu cohérent, seules les icônes utilisées sont incluses |
| Graphiques SVG maison | Courbes et barres | Aucune dépendance, net à toutes les tailles |

## Lancer en local

```bash
npm install
npm run dev       # développement
npm run build     # build de production dans dist/
npm run preview   # tester le build (Service Worker actif)
```

## Organisation

```
src/
  main.js                 démarrage, polices, Service Worker
  app.js                  écran courant, navigation, feuilles, toasts
  core/
    state.js              modèle de données v5 + migration des versions précédentes
    storage.js            IndexedDB + miroir de secours, photos, export/import
    store.js              état, rendu planifié, navigation
    training.js           calendrier, prescription hebdo, suggestion de charge, records, stats
    alerts.js             fin de repos : son, vibration, notification, écran allumé
  data/
    exercises.js          79 exercices (fiche complète, remplacements)
    program-template.js   programme Recomposition 12 semaines
    muscles.js            régions musculaires, groupes, matériel
  components/             schéma musculaire, graphiques, éléments d'interface
  features/
    home/                 tableau de bord
    training/             programme, calendrier, historique, éditeur de séance
    library/              bibliothèque, fiche, sélecteur d'exercice
    workout/              séance en cours (logique + écran) et bilan
    progress/             poids, mensurations, photos, performances, records
    profile/              profil, réglages, données
    onboarding/           premier lancement
  styles/                 tokens, base, composants, écrans, séance
```

## Progression des charges (double progression)

- Toutes les séries au sommet de la fourchette → palier suivant (+2,5 kg barre, +2 kg haltères…).
- Une série sous la fourchette → même charge. Deux séances de suite → −5 %.
- Semaine allégée (S4, S8, S12) → une série de moins, −10 %.
- Sans historique, l'app donne une consigne (RIR cible), jamais un chiffre inventé.

## Déploiement

Chaque push sur `main` publie l'app sur GitHub Pages via `.github/workflows/deploy.yml`.
À activer une seule fois : **Settings → Pages → Source : GitHub Actions**.

## Données

Tout est stocké sur l'appareil. Les données des versions précédentes sont migrées automatiquement (pesées, tour de taille, photos).
Exporte une sauvegarde régulièrement depuis Profil → Données.
