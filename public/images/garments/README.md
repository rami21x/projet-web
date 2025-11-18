# 📸 GUIDE DES PHOTOS DE VÊTEMENTS ARTERAL

## 📁 STRUCTURE DES DOSSIERS

Vos photos doivent être placées dans cette structure **EXACTE** :

```
public/images/garments/
├── tshirt/
│   ├── oversize/
│   │   ├── front/
│   │   │   ├── white.png
│   │   │   ├── offwhite.png
│   │   │   ├── beige.png
│   │   │   ├── lightgray.png
│   │   │   ├── anthracite.png
│   │   │   ├── black.png
│   │   │   ├── navy.png
│   │   │   ├── khaki.png
│   │   │   ├── red.png
│   │   │   ├── bordeaux.png
│   │   │   ├── camel.png
│   │   │   └── olive.png
│   │   └── back/
│   │       ├── white.png
│   │       ├── offwhite.png
│   │       └── ... (mêmes couleurs)
│   ├── regular/
│   │   ├── front/
│   │   │   └── ... (mêmes couleurs)
│   │   └── back/
│   │       └── ... (mêmes couleurs)
│   └── slim/
│       ├── front/
│       │   └── ... (mêmes couleurs)
│       └── back/
│           └── ... (mêmes couleurs)
└── pull/
    ├── oversize/
    │   ├── front/
    │   │   └── ... (mêmes couleurs)
    │   └── back/
    │       └── ... (mêmes couleurs)
    ├── regular/
    │   ├── front/
    │   │   └── ... (mêmes couleurs)
    │   └── back/
    │       └── ... (mêmes couleurs)
    └── slim/
        ├── front/
        │   └── ... (mêmes couleurs)
        └── back/
            └── ... (mêmes couleurs)
```

---

## 🎨 NOMS DES FICHIERS PAR COULEUR

| Couleur Arteral | Nom du fichier | Exemple complet |
|----------------|----------------|-----------------|
| Blanc Pur | `white.png` | `tshirt/oversize/front/white.png` |
| Blanc Cassé | `offwhite.png` | `tshirt/regular/front/offwhite.png` |
| Beige Sable | `beige.png` | `pull/slim/back/beige.png` |
| Gris Clair | `lightgray.png` | `tshirt/oversize/front/lightgray.png` |
| Gris Anthracite | `anthracite.png` | `pull/regular/front/anthracite.png` |
| Noir Profond | `black.png` | `tshirt/slim/back/black.png` |
| Navy | `navy.png` | `pull/oversize/front/navy.png` |
| Kaki | `khaki.png` | `tshirt/regular/back/khaki.png` |
| Rouge Arteral | `red.png` | `pull/oversize/front/red.png` |
| Bordeaux | `bordeaux.png` | `tshirt/slim/front/bordeaux.png` |
| Camel | `camel.png` | `pull/regular/back/camel.png` |
| Olive | `olive.png` | `tshirt/oversize/front/olive.png` |

---

## 📊 TOTAL DE PHOTOS NÉCESSAIRES

**Calcul :**
- 2 types (t-shirt, pull)
- × 3 coupes (oversize, regular, slim)
- × 2 côtés (front, back)
- × 12 couleurs

**= 144 photos** au total

---

## 📐 SPÉCIFICATIONS TECHNIQUES DES PHOTOS

### Format
- **Extension** : PNG (recommandé) ou JPG
- **Transparence** : PNG avec fond transparent (idéal)
- **Alternative** : Fond blanc uni si pas de transparence

### Dimensions
- **Largeur** : 1200px - 2400px
- **Hauteur** : 1400px - 2800px
- **Ratio** : Environ 5:6 (portrait)
- **Résolution** : 72-150 DPI

### Poids
- **Taille max** : 500 KB par photo (compressées)
- **Format optimisé** : PNG-8 ou WebP pour meilleure compression

### Cadrage
**IMPORTANT :** Toutes les photos doivent avoir le même cadrage !

#### FRONT (Face avant) :
```
┌─────────────┐
│             │
│    👕 ←──   │  Vêtement centré
│             │  Col visible
│             │  Manches visibles
│             │  Bas du vêtement visible
└─────────────┘
```

#### BACK (Face arrière) :
```
┌─────────────┐
│             │
│   ──→ 👕    │  Vêtement centré
│             │  Col arrière visible
│             │  Manches visibles
│             │  Bas du vêtement visible
└─────────────┘
```

---

## 🎯 EXEMPLE COMPLET

### Pour un T-SHIRT OVERSIZE ROUGE ARTERAL :

**Face avant :**
```
Chemin : public/images/garments/tshirt/oversize/front/red.png
```

**Face arrière :**
```
Chemin : public/images/garments/tshirt/oversize/back/red.png
```

---

## 📸 COMMENT PRENDRE LES PHOTOS

### Option 1 : Flat Lay (à plat)
1. Posez le vêtement à plat sur fond blanc
2. Lissez bien les plis
3. Centrez le vêtement
4. Prenez la photo de haut (90°)
5. Retouchez pour enlever le fond (ou gardez blanc uni)

### Option 2 : Mannequin invisible
1. Utilisez un mannequin transparent
2. Habillez avec le vêtement
3. Photographiez de face et de dos
4. Retouchez pour enlever le mannequin

### Option 3 : Mockups en ligne
**Si vous n'avez pas encore les vêtements physiques :**
- [Placeit.net](https://placeit.net) - Mockups t-shirts
- [Smartmockups.com](https://smartmockups.com) - Vêtements réalistes
- [Mockup.photos](https://mockup.photos) - Templates gratuits

---

## 🚀 PROCESSUS D'AJOUT

### Étape 1 : Préparez vos photos
```bash
# Créez un dossier temporaire sur votre ordinateur
mkdir arteral-photos
cd arteral-photos

# Organisez comme ceci :
tshirt-oversize-front-white.png
tshirt-oversize-front-black.png
tshirt-oversize-back-white.png
# etc...
```

### Étape 2 : Renommez selon la convention
```bash
# Exemple de script de renommage (bash)
# Renomme "tshirt-oversize-front-white.png"
# en structure de dossiers
```

### Étape 3 : Copiez dans le projet
```bash
# Dans le terminal du projet
cd public/images/garments

# Copiez vos dossiers organisés
# Assurez-vous que les chemins correspondent exactement
```

---

## 🔍 VÉRIFICATION

### Checklist avant de lancer :

**T-SHIRT OVERSIZE :**
- [ ] `public/images/garments/tshirt/oversize/front/white.png`
- [ ] `public/images/garments/tshirt/oversize/front/black.png`
- [ ] `public/images/garments/tshirt/oversize/back/white.png`
- [ ] `public/images/garments/tshirt/oversize/back/black.png`
- [ ] ... (toutes les 12 couleurs × 2 côtés)

**T-SHIRT REGULAR :**
- [ ] `public/images/garments/tshirt/regular/front/` (12 couleurs)
- [ ] `public/images/garments/tshirt/regular/back/` (12 couleurs)

**T-SHIRT SLIM :**
- [ ] `public/images/garments/tshirt/slim/front/` (12 couleurs)
- [ ] `public/images/garments/tshirt/slim/back/` (12 couleurs)

**PULL OVERSIZE :**
- [ ] `public/images/garments/pull/oversize/front/` (12 couleurs)
- [ ] `public/images/garments/pull/oversize/back/` (12 couleurs)

**PULL REGULAR :**
- [ ] `public/images/garments/pull/regular/front/` (12 couleurs)
- [ ] `public/images/garments/pull/regular/back/` (12 couleurs)

**PULL SLIM :**
- [ ] `public/images/garments/pull/slim/front/` (12 couleurs)
- [ ] `public/images/garments/pull/slim/back/` (12 couleurs)

---

## ⚡ PHOTOS MINIMALES POUR COMMENCER

**Si vous voulez tester rapidement, créez AU MINIMUM :**

```
tshirt/regular/front/white.png   ← Le plus important !
tshirt/regular/front/black.png
tshirt/regular/back/white.png
tshirt/regular/back/black.png
pull/regular/front/white.png
pull/regular/front/black.png
pull/regular/back/white.png
pull/regular/back/black.png
```

**= 8 photos minimum pour tester**

Le Studio affichera une image de fallback si une photo manque.

---

## 🎨 OPTIMISATION DES IMAGES

### Avant d'ajouter, compressez :

**En ligne :**
1. [TinyPNG.com](https://tinypng.com) - Compression PNG
2. [Squoosh.app](https://squoosh.app) - Conversion WebP
3. [Compressor.io](https://compressor.io)

**Ligne de commande :**
```bash
# Avec ImageMagick
convert photo.png -resize 1200x1400 -quality 85 photo-optimized.png

# Batch conversion
for file in *.png; do
  convert "$file" -resize 1200x1400 -quality 85 "optimized/$file"
done
```

---

## 🆘 DÉPANNAGE

### "Photo ne s'affiche pas"
✅ Vérifiez le chemin exact (sensible à la casse)
✅ Vérifiez l'extension (.png ou .jpg)
✅ Rechargez la page (Ctrl+Shift+R)
✅ Vérifiez la console (F12) pour erreurs

### "Mauvais cadrage"
✅ Toutes les photos doivent avoir le même cadrage
✅ Utilisez un template/grid pour cohérence
✅ Centrez toujours le vêtement de la même façon

### "Fichier trop gros"
✅ Compressez avec TinyPNG
✅ Redimensionnez à 1200px largeur max
✅ Utilisez PNG-8 au lieu de PNG-24 si possible

---

## 📝 TEMPLATE DE LISTE

Copiez cette liste et cochez au fur et à mesure :

```
T-SHIRT OVERSIZE FRONT:
[ ] white.png
[ ] offwhite.png
[ ] beige.png
[ ] lightgray.png
[ ] anthracite.png
[ ] black.png
[ ] navy.png
[ ] khaki.png
[ ] red.png
[ ] bordeaux.png
[ ] camel.png
[ ] olive.png

T-SHIRT OVERSIZE BACK:
[ ] white.png
[ ] offwhite.png
... (même liste)

T-SHIRT REGULAR FRONT:
... (même liste)

T-SHIRT REGULAR BACK:
... (même liste)

T-SHIRT SLIM FRONT:
... (même liste)

T-SHIRT SLIM BACK:
... (même liste)

PULL OVERSIZE FRONT:
... (même liste)

PULL OVERSIZE BACK:
... (même liste)

PULL REGULAR FRONT:
... (même liste)

PULL REGULAR BACK:
... (même liste)

PULL SLIM FRONT:
... (même liste)

PULL SLIM BACK:
... (même liste)
```

---

## 🎯 RÉSUMÉ EXPRESS

**Où mettre les photos ?**
→ `public/images/garments/[type]/[coupe]/[côté]/[couleur].png`

**Exemple :**
→ `public/images/garments/tshirt/oversize/front/red.png`

**Combien ?**
→ 144 photos total (ou 8 minimum pour tester)

**Format ?**
→ PNG transparent, 1200x1400px, < 500 KB

---

**Une fois vos photos ajoutées, le Studio les chargera automatiquement ! 📸✨**
