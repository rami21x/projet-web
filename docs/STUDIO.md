# Page Studio - Guide Complet

## Concept

La page Studio est un **parcours créatif en 4 étapes** qui guide l'artiste à travers le processus de création d'un design pour ARTERAL. Le thème central est **"Narcisse Amoureux"** - l'exploration de la dualité entre l'amour et l'égoïsme.

## Les 4 Étapes

### 1. COMPRENDRE
L'artiste découvre la philosophie d'ARTERAL:
- Série "Harmonie du Chaos"
- Philosophes inspirants (Nietzsche, Jung, Lao-Tzu)
- Artistes de référence (Bacon, Dubuffet, de Kooning)
- Symboles visuels de la dualité
- Questions de réflexion

**Validation**: L'utilisateur doit cocher "J'ai compris le concept"

### 2. INTERPRÉTER
L'artiste répond à 4 questions philosophiques:
- Quelle dualité explorez-vous?
- Comment l'harmonie émerge du chaos?
- Quel sentiment souhaitez-vous transmettre?
- Quel message portera votre création?

**Validation**: Minimum 20 caractères par réponse

### 3. CRÉER
L'artiste upload son design:
- Formats acceptés: PNG, JPEG, WebP
- Taille max: 10 MB
- Fond transparent recommandé

**Validation**: Une image doit être uploadée

### 4. VISUALISER
Prévisualisation et soumission:
- Choix du type (T-shirt, Pull)
- Choix de la coupe (Slim, Regular, Oversize)
- Choix de la couleur (6 options)
- Informations de l'artiste
- Soumission finale

## Photos et Artwork

### Emplacement des fichiers
```
public/images/studio/
├── nietzsche.jpeg      # Portrait philosophe
├── Jung.jpeg           # Portrait philosophe
├── laotzu.jpeg         # Portrait philosophe
├── bacon.jpeg          # Portrait artiste
├── Dubuffet.jpeg       # Portrait artiste
├── kooning.jpeg        # Portrait artiste
└── artwork/            # Tableaux supplémentaires (à créer)
    ├── narcisse.jpeg
    ├── amour.jpeg
    └── ...
```

### Résolution recommandée
- **Portraits**: 600x800 px minimum (aspect 3:4)
- **Tableaux**: 800x600 px minimum (paysage) ou 600x800 px (portrait)
- **Pour écrans Retina**: Doubler la résolution (1200x1600 px)

## API de Soumission

**Endpoint**: `POST /api/designs`

**Corps de la requête**:
```json
{
  "name": "Nom de l'artiste",
  "artistName": "Pseudonyme (optionnel)",
  "email": "email@exemple.com",
  "title": "Titre de l'oeuvre",
  "philosophy": "Texte des 4 réponses",
  "garmentType": "tshirt" | "pull",
  "garmentFit": "slim" | "regular" | "oversize",
  "garmentColor": "#FFFFFF",
  "imageData": "data:image/png;base64,..."
}
```

**Réponse**: Le design créé avec status `pending` (en attente de modération)

## Traductions

Les textes sont dans `data/content.js` (EN) et `data/content-fr.js` (FR).

Chercher `studioPageContent` pour modifier:
- Titres et sous-titres
- Questions
- Noms des philosophes/artistes
- Labels des boutons
- Messages de succès/erreur
