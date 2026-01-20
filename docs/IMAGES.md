# Guide des Images

## Structure des Dossiers

```
public/
├── images/
│   ├── logo.gif                    # Logo animé ARTERAL
│   ├── brand-hero-dark.png         # Hero page Brand (mode sombre)
│   ├── brand-hero-light.png        # Hero page Brand (mode clair)
│   ├── studio/                     # Images page Studio
│   │   ├── nietzsche.jpeg          # Portrait philosophe
│   │   ├── Jung.jpeg               # Portrait philosophe
│   │   ├── laotzu.jpeg             # Portrait philosophe
│   │   ├── bacon.jpeg              # Portrait artiste
│   │   ├── Dubuffet.jpeg           # Portrait artiste
│   │   ├── kooning.jpeg            # Portrait artiste
│   │   └── artwork/                # Tableaux célèbres
│   │       ├── narcissus.jpg       # Narcisse - Caravaggio
│   │       ├── kiss.jpg            # Le Baiser - Klimt
│   │       ├── echo.jpg            # Echo et Narcisse - Waterhouse
│   │       └── pygmalion.jpg       # Pygmalion et Galatée - Gérôme
│   └── garments/                   # Photos vêtements
│       └── ...
├── videos/
│   └── splash-intro.mp4           # Vidéo splash screen
└── ambient-music.mp3              # Musique d'ambiance
```

## Résolutions Recommandées

| Type | Minimum | Idéal (Retina) | Aspect Ratio |
|------|---------|----------------|--------------|
| Logo | 200x200 | 400x400 | 1:1 |
| Portraits Studio | 600x800 | 1200x1600 | 3:4 |
| Artistes Studio | 600x750 | 1200x1500 | 4:5 |
| Tableaux | 800x600 | 1600x1200 | Variable |
| Hero Brand | 1920x1080 | 3840x2160 | 16:9 |
| Produits | 800x800 | 1600x1600 | 1:1 |

## Formats Acceptés

- **JPEG** (.jpg, .jpeg) - Photos, portraits
- **PNG** (.png) - Logos, images avec transparence
- **WebP** (.webp) - Optimisé pour le web
- **GIF** (.gif) - Animations (logo uniquement)

## Optimisation

### Compression recommandée
- JPEG: qualité 80-85%
- PNG: compression sans perte
- WebP: qualité 80%

### Outils
- [Squoosh](https://squoosh.app/) - Compression en ligne
- [TinyPNG](https://tinypng.com/) - Compression PNG/JPEG
- ImageOptim (Mac) / FileOptimizer (Windows)

## Ajouter une Image

### 1. Préparer le fichier
- Résolution correcte
- Format approprié
- Nom en minuscules, sans espaces (utiliser `-` ou `_`)

### 2. Placer le fichier
```bash
# Exemple: ajouter un tableau
cp mon-tableau.jpeg public/images/studio/artwork/
```

### 3. Référencer dans le code
```tsx
// Dans un composant React
import Image from "next/image";

<Image
  src="/images/studio/artwork/mon-tableau.jpeg"
  alt="Description du tableau"
  width={800}
  height={600}
/>
```

### 4. Pour les GIFs animés
```tsx
// Ajouter unoptimized pour préserver l'animation
<Image
  src="/images/logo.gif"
  alt="Logo"
  width={200}
  height={200}
  unoptimized
/>
```

## Vider le Cache après Modification

Si les nouvelles images ne s'affichent pas:

```bash
# 1. Supprimer le cache Next.js
rm -rf .next

# 2. Relancer le serveur
npm run dev

# 3. Hard refresh dans le navigateur
# Mac: Cmd + Shift + R
# Windows/Linux: Ctrl + Shift + R
```

## Tableaux Célèbres (Artwork)

Les tableaux pour la section "Inspirations Visuelles" du Studio:

| Fichier | Tableau | Artiste | Où trouver |
|---------|---------|---------|------------|
| `narcissus.jpg` | Narcisse | Caravaggio | [Wikipedia](https://en.wikipedia.org/wiki/Narcissus_(Caravaggio)) |
| `kiss.jpg` | Le Baiser | Gustav Klimt | [Wikipedia](https://en.wikipedia.org/wiki/The_Kiss_(Klimt)) |
| `echo.jpg` | Echo et Narcisse | John William Waterhouse | [Wikipedia](https://en.wikipedia.org/wiki/Echo_and_Narcissus_(Waterhouse)) |
| `pygmalion.jpg` | Pygmalion et Galatée | Jean-Léon Gérôme | [Wikipedia](https://en.wikipedia.org/wiki/Pygmalion_and_Galatea_(G%C3%A9r%C3%B4me)) |

### Comment télécharger

1. Aller sur la page Wikipedia du tableau
2. Cliquer sur l'image pour l'agrandir
3. Cliquer sur "Télécharger en pleine résolution"
4. Renommer le fichier selon le tableau ci-dessus
5. Placer dans `public/images/studio/artwork/`

### Résolution recommandée
- Minimum: 800x1000 px
- Ces œuvres sont dans le domaine public (libres de droits)

## Commandes Git pour Images

```bash
# Voir les images modifiées
git status

# Ajouter les images
git add public/images/

# Commit
git commit -m "feat: Add new artwork images"

# Push
git push
```
