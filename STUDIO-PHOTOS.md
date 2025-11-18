# 📸 STUDIO ARTERAL - PHOTOS RÉELLES

## ✅ CE QUI A ÉTÉ MODIFIÉ

Le Studio Arteral utilise maintenant **vos vraies photos de vêtements** au lieu d'un rendu canvas !

### Nouvelles Fonctionnalités

1. **Toggle Front/Back** ✨
   - Choisissez si votre design va sur la face avant ou arrière
   - Toggle simple avec deux boutons

2. **Photos Réelles** 📸
   - Le Studio charge vos photos depuis `/public/images/garments/`
   - Votre design est superposé sur la vraie photo
   - Export PNG avec la vraie photo + votre artwork

3. **12 Couleurs** 🎨
   - Toute la palette Arteral disponible
   - Blanc Pur, Blanc Cassé, Beige, Gris Clair
   - Anthracite, Noir, Navy, Kaki
   - Rouge Arteral, Bordeaux, Camel, Olive

4. **72 Configurations** 🎯
   - 2 types (T-Shirt, Pull)
   - 3 coupes (Oversize, Regular, Slim Fit)
   - 12 couleurs
   - 2 côtés (Front, Back)
   - = **144 photos** possibles

---

## 📁 OÙ PLACER VOS PHOTOS

### Structure des Dossiers

```
public/images/garments/
├── tshirt/
│   ├── oversize/
│   │   ├── front/
│   │   │   ├── white.png
│   │   │   ├── black.png
│   │   │   ├── red.png
│   │   │   └── ... (12 couleurs)
│   │   └── back/
│   │       └── ... (12 couleurs)
│   ├── regular/
│   │   ├── front/ (12 couleurs)
│   │   └── back/ (12 couleurs)
│   └── slim/
│       ├── front/ (12 couleurs)
│       └── back/ (12 couleurs)
└── pull/
    └── ... (même structure)
```

### Noms de Fichiers EXACTS

**IMPORTANT** : Les noms doivent être **EXACTEMENT** comme ci-dessous :

| Couleur Arteral | Nom du fichier |
|----------------|----------------|
| Blanc Pur | `white.png` |
| Blanc Cassé | `offwhite.png` |
| Beige Sable | `beige.png` |
| Gris Clair | `lightgray.png` |
| Gris Anthracite | `anthracite.png` |
| Noir Profond | `black.png` |
| Navy | `navy.png` |
| Kaki | `khaki.png` |
| Rouge Arteral | `red.png` |
| Bordeaux | `bordeaux.png` |
| Camel | `camel.png` |
| Olive | `olive.png` |

---

## 📐 SPÉCIFICATIONS DES PHOTOS

### Format
- **Extension** : PNG (recommandé) ou JPG
- **Transparence** : PNG avec fond transparent (idéal)
- **Alternative** : Fond blanc uni si pas de transparence

### Dimensions
- **Largeur** : 1200px - 1400px
- **Hauteur** : 1400px - 1600px
- **Ratio** : Environ 5:6 (portrait)

### Poids
- **Taille max** : 500 KB par photo
- **Compression** : Utilisez TinyPNG, Squoosh, ou ImageMagick

### Cadrage
**CRUCIAL** : Toutes les photos doivent avoir le **même cadrage** !

- Vêtement centré
- Même distance de la caméra
- Même éclairage
- Manches visibles
- Bas du vêtement visible

---

## ⚡ POUR TESTER RAPIDEMENT

Créez **8 photos minimum** :

```
tshirt/regular/front/white.png
tshirt/regular/front/black.png
tshirt/regular/back/white.png
tshirt/regular/back/black.png
pull/regular/front/white.png
pull/regular/front/black.png
pull/regular/back/white.png
pull/regular/back/black.png
```

Le Studio affichera un **message de fallback** si une photo manque.

---

## 🎯 EXEMPLE DE CHEMIN

**Pour un T-SHIRT SLIM FIT ROUGE ARTERAL (face avant) :**

```
public/images/garments/tshirt/slim/front/red.png
```

**Pour un PULL OVERSIZE NOIR (face arrière) :**

```
public/images/garments/pull/oversize/back/black.png
```

---

## ✅ CHECKLIST

Avant de tester le Studio :

### Photos minimales (pour test)
- [ ] `tshirt/regular/front/white.png`
- [ ] `tshirt/regular/front/black.png`
- [ ] `tshirt/regular/back/white.png`
- [ ] `tshirt/regular/back/black.png`

### Vérifications
- [ ] Les noms de fichiers sont **exactement** comme indiqué
- [ ] Toutes les photos ont le **même cadrage**
- [ ] Les photos font **< 500 KB**
- [ ] Les dossiers respectent la **structure exacte**

---

## 🛠️ COMMENT UTILISER LE STUDIO

### Flux complet :

1. **Allez sur** `/studio`
2. **Configurez** :
   - Type : T-Shirt ou Pull
   - Coupe : Oversize, Regular, ou Slim
   - Couleur : Choisissez parmi 12 couleurs
3. **Cliquez** "Commencer le design"
4. **Choisissez le côté** : Front ou Back
5. **Uploadez** votre artwork (PNG/JPG)
6. **Ajustez** :
   - Taille (30% - 250%)
   - Position horizontale
   - Position verticale
   - Rotation (-45° à +45°)
7. **Téléchargez** le rendu (optionnel)
8. **Remplissez** le formulaire
9. **Soumettez** à la galerie

---

## 🎨 RENDU FINAL

Le Canvas génère un PNG de **800x900px** avec :

1. **Photo de votre vêtement** (chargée depuis `/images/garments/`)
2. **Votre design** superposé par-dessus
3. **Watermark** "ARTERAL STUDIO" (discret)

---

## 📚 RESSOURCES

### Guide complet des photos
→ `public/images/garments/README.md`

### Documentation Studio & Galerie
→ `STUDIO-GALERIE.md`

### Outils de compression
- [TinyPNG.com](https://tinypng.com)
- [Squoosh.app](https://squoosh.app)
- [Compressor.io](https://compressor.io)

### Mockups (si vous n'avez pas les vêtements)
- [Placeit.net](https://placeit.net)
- [Smartmockups.com](https://smartmockups.com)
- [Mockup.photos](https://mockup.photos)

---

## 🆘 SI UNE PHOTO MANQUE

Si une photo n'existe pas, le Studio affichera :

```
Photo manquante
/images/garments/tshirt/regular/front/red.png
Ajoutez cette photo pour voir le rendu
```

Vous pouvez quand même :
- Visualiser votre design
- Ajuster la position/taille
- Télécharger le rendu (sans la photo)

---

## 🚀 PROCHAINES ÉTAPES

1. **Maintenant** : Ajoutez vos 8 premières photos pour tester
2. **Ensuite** : Complétez progressivement toutes les 144 photos
3. **Option** : Créez d'abord des mockups en ligne si vous n'avez pas les vêtements physiques

---

## 💡 ASTUCE

Pour créer rapidement toutes vos photos avec le **même cadrage** :

1. Fixez votre appareil/téléphone sur un trépied
2. Utilisez le **même éclairage** pour toutes
3. Placez un **repère au sol** pour la position du vêtement
4. Prenez **toutes les photos d'affilée**
5. Retouchez par batch pour enlever le fond (si transparent)

---

**📸 Vos vraies photos + les designs de la communauté = Arteral Studio ! ✨**
