# ARTERAL - Documentation

## Structure du Projet

```
projet-web/
├── app/                    # Pages Next.js (App Router)
│   ├── api/               # Routes API
│   │   ├── designs/       # Soumission de designs
│   │   ├── contact/       # Formulaire contact
│   │   └── newsletter/    # Inscription newsletter
│   ├── studio/            # Page Studio (parcours créatif)
│   ├── collection/        # Page Collection
│   ├── brand/             # Page Marque
│   └── page.tsx           # Page d'accueil
│
├── components/            # Composants React réutilisables
│   ├── Navigation.tsx     # Barre de navigation
│   ├── Footer.tsx         # Pied de page
│   ├── AmbientMusic.tsx   # Musique d'ambiance
│   └── ...
│
├── data/                  # Contenus et traductions
│   ├── content.js         # Contenu anglais
│   └── content-fr.js      # Contenu français
│
├── public/                # Fichiers statiques
│   ├── images/
│   │   ├── logo.gif       # Logo animé
│   │   ├── studio/        # Photos pour la page Studio
│   │   └── garments/      # Photos des vêtements
│   └── ambient-music.mp3  # Musique d'ambiance
│
├── lib/                   # Utilitaires et configurations
│   ├── prisma.ts          # Client Prisma (base de données)
│   └── validations.ts     # Schémas de validation Zod
│
├── hooks/                 # Hooks React personnalisés
│   └── useContent.ts      # Hook pour les traductions
│
└── docs/                  # Documentation (ce dossier)
```

## Pages Principales

### Page Studio (`/studio`)
Parcours créatif en 4 étapes pour soumettre un design:
1. **Comprendre** - Philosophie et inspirations
2. **Interpréter** - Questions sur la vision de l'artiste
3. **Créer** - Upload du design
4. **Visualiser** - Prévisualisation et soumission

### Page Collection (`/collection`)
Galerie des designs approuvés et produits disponibles.

### Page Brand (`/brand`)
Histoire de la marque et philosophie.

## Guides

- [Guide Studio](./STUDIO.md) - Comment fonctionne la page Studio
- [Guide Images](./IMAGES.md) - Comment ajouter des images
- [Guide Traductions](./TRADUCTIONS.md) - Comment modifier les textes

## Configuration Requise

- Node.js 18+
- npm ou pnpm
- Base de données SQLite (développement) ou PostgreSQL (production)

## Commandes

```bash
# Développement
npm run dev

# Build production
npm run build

# Lancer en production
npm start

# Vider le cache
rm -rf .next && npm run dev
```
