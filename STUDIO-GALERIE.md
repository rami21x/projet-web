# 🎨 STUDIO & GALERIE ARTERAL

## ✨ NOUVELLES FONCTIONNALITÉS

Votre site Arteral dispose maintenant de **2 nouvelles pages ultra-créatives** :

### 📍 **1. STUDIO** (`/studio`)
Outil de création où les artistes peuvent :
- Uploader leur œuvre
- Visualiser sur un t-shirt blanc ou noir
- Ajuster taille, position, rotation
- Télécharger le rendu final
- Soumettre à la galerie communautaire

### 🖼️ **2. GALERIE** (`/galerie`)
Galerie communautaire avec :
- Affichage de tous les designs soumis
- Système de likes/votes
- Commentaires philosophiques
- Filtres (Tous / Récents / Populaires)
- Modal de détail pour chaque design

---

## 🎯 COMMENT ÇA FONCTIONNE

### 🔄 FLUX UTILISATEUR

```
┌─────────────┐
│   STUDIO    │  1. Artiste upload son œuvre
└──────┬──────┘
       │
       ▼
┌─────────────┐
│  AJUSTEMENT │  2. Ajuste taille/position sur t-shirt
└──────┬──────┘
       │
       ▼
┌─────────────┐
│ TÉLÉCHARGE  │  3. Télécharge le rendu (PNG)
└──────┬──────┘
       │
       ▼
┌─────────────┐
│  SOUMETTRE  │  4. Remplit formulaire + soumet
└──────┬──────┘
       │
       ▼
┌─────────────┐
│   GALERIE   │  5. Design apparaît dans la galerie
└──────┬──────┘
       │
       ▼
┌─────────────┐
│ COMMUNAUTÉ  │  6. Autres peuvent liker/commenter
└─────────────┘
```

---

## 🛠️ FONCTIONNALITÉS DÉTAILLÉES

### 📐 STUDIO DE DESIGN

#### Upload d'Image
- **Formats acceptés** : PNG, JPG, JPEG, GIF, WebP
- **Taille max** : 5 MB
- **Validation** : Automatique (type + taille)

#### Ajustements Disponibles
1. **Taille** : 30% à 200% (slider)
2. **Position Horizontale** : 25% à 75%
3. **Position Verticale** : 20% à 60%
4. **Rotation** : -45° à +45°

#### Couleurs de T-shirt
- ⚪ Blanc (par défaut)
- ⚫ Noir

#### Rendu Canvas
- **Résolution** : 600x700px
- **Watermark** : "ARTERAL STUDIO" (discret)
- **Export** : PNG haute qualité

#### Formulaire de Soumission
Champs requis :
- ✅ Nom de l'artiste
- ✅ Email
- ✅ Titre de l'œuvre
- ✅ Philosophie / Inspiration (textarea)
- ⚪ Instagram (optionnel)

---

### 🖼️ GALERIE COMMUNAUTAIRE

#### Affichage
- **Layout** : Grid responsive (1/2/3 colonnes)
- **Tri** : Plus récent d'abord (par défaut)
- **Animations** : Fade in progressif

#### Filtres
1. **Tous** : Tous les designs
2. **Récents** : Derniers 7 jours
3. **Populaires** : Avec au moins 1 like

#### Système de Likes
- ❤️ Click pour liker
- ❤️ (rempli) = Déjà liké
- **Stockage** : localStorage (`arteral-liked`)
- **Persistance** : Entre sessions
- **Décompte** : Temps réel

#### Commentaires
- 💬 Illimités par design
- **Champs** : Nom + Texte
- **Tri** : Plus récent d'abord
- **Affichage** : Dans modal de détail

#### Modal de Détail
**Click sur un design → Modal avec :**
- Image plein format
- Titre + Artiste
- Instagram (si fourni)
- Philosophie complète
- Date de création
- Bouton Like
- Liste des commentaires
- Formulaire d'ajout de commentaire

---

## 💾 STOCKAGE DES DONNÉES

### LocalStorage Keys

#### 1. `arteral-designs`
**Structure :**
```json
[
  {
    "id": "design-1700000000000",
    "artistName": "Sophie Martin",
    "email": "sophie@example.com",
    "title": "Chaos Intérieur",
    "philosophy": "Exploration de la dualité...",
    "imageData": "data:image/png;base64,...",
    "designData": "data:image/png;base64,...",
    "timestamp": 1700000000000,
    "likes": 5,
    "comments": [
      {
        "id": "comment-1700000000001",
        "author": "Marc",
        "text": "Magnifique création !",
        "timestamp": 1700000000001
      }
    ],
    "social": "@sophieart"
  }
]
```

#### 2. `arteral-liked`
**Structure :**
```json
["design-1700000000000", "design-1700000000123"]
```

---

## 🎨 DESIGN SYSTEM

### Couleurs
- **Primary** : `#8B0000` (Rouge Arteral)
- **Accent** : `#A0522D` (Or)
- **Dark** : `#2B2B2B`
- **Light** : `#E8E8E8`

### Typographie
- **Titres** : Playfair Display (font-display)
- **Corps** : Inter (font-body)
- **Code** : JetBrains Mono (font-mono)

### Composants Réutilisés
- ✅ `FadeIn` (animations d'entrée)
- ✅ `motion` (Framer Motion)
- ✅ Navigation cohérente
- ✅ Dark mode supporté

---

## 🚀 UTILISATION

### Pour les Artistes

**Créer un design :**
```
1. Allez sur /studio
2. Cliquez "Choisir une image"
3. Uploadez votre œuvre (PNG/JPG)
4. Ajustez avec les sliders
5. Changez la couleur du t-shirt si besoin
6. Téléchargez le rendu (optionnel)
7. Remplissez le formulaire
8. Cliquez "Soumettre à la galerie"
9. Votre design apparaît dans /galerie !
```

**Interagir avec la communauté :**
```
1. Allez sur /galerie
2. Filtrez par Récents/Populaires si besoin
3. Cliquez ❤️ pour liker un design
4. Cliquez sur un design pour voir les détails
5. Ajoutez un commentaire philosophique
6. Partagez votre appréciation !
```

---

## 📱 RESPONSIVE

### Mobile (< 768px)
- Grid galerie : 1 colonne
- Studio : Ajustements verticaux
- Modal : Scroll optimisé

### Tablet (768px - 1024px)
- Grid galerie : 2 colonnes
- Studio : Layout 2 colonnes

### Desktop (> 1024px)
- Grid galerie : 3 colonnes
- Studio : Layout 2 colonnes spacieux
- Modal : 2 colonnes (image + détails)

---

## 🔒 SÉCURITÉ & VALIDATION

### Upload d'Image
- ✅ Validation de type MIME
- ✅ Limite de taille (5 MB)
- ✅ Conversion en base64
- ❌ **Pas de validation de contenu** (à ajouter pour production)

### Formulaire
- ✅ Champs requis validés
- ✅ Email validé (HTML5)
- ✅ XSS basique évité (React escape)
- ⚠️ **Pas de sanitization backend** (localStorage uniquement)

### Données
- 💾 **LocalStorage** : Côté client uniquement
- ⚠️ **Pas de persistence serveur** (perdu si cache vidé)
- ⚠️ **Limite** : ~5-10 MB par domaine

---

## 🎯 MIGRATION VERS PRODUCTION

### Pour un déploiement réel, migrez vers :

#### Option 1 : Firebase (Recommandé)
```bash
npm install firebase

# Créez firebaseConfig.js
# Remplacez localStorage par Firestore
```

**Avantages :**
- Gratuit jusqu'à 1 GB
- Temps réel
- Authentification intégrée
- Hébergement d'images (Storage)

#### Option 2 : Supabase
```bash
npm install @supabase/supabase-js

# Configuration similaire à Firebase
```

**Avantages :**
- Open-source
- PostgreSQL
- Auth + Storage inclus
- API REST automatique

#### Option 3 : Custom Backend
```bash
# API Node.js/Express
# Base MongoDB/PostgreSQL
# Upload S3/Cloudinary
```

---

## 📊 STATISTIQUES

### Composants Créés
- ✅ `/studio/page.tsx` (420 lignes)
- ✅ `/galerie/page.tsx` (580 lignes)
- ✅ Navigation mise à jour

### Fonctionnalités
- ✅ Upload d'images
- ✅ Canvas rendering
- ✅ Ajustements temps réel
- ✅ Download PNG
- ✅ Système de likes
- ✅ Système de commentaires
- ✅ Filtres de galerie
- ✅ Modal de détails
- ✅ Formulaires validés

### Lignes de Code
**Total** : ~1000 lignes

---

## 🐛 LIMITATIONS ACTUELLES

### LocalStorage
- ❌ Données perdues si cache vidé
- ❌ Limite de ~5-10 MB
- ❌ Pas de synchronisation entre appareils
- ❌ Pas de modération

### Recommandations pour Production
1. **Migrer vers Firebase/Supabase**
2. **Ajouter modération des images** (AI Content Moderation)
3. **Limiter uploads** (rate limiting)
4. **Authentification** pour commenter/liker
5. **CDN** pour les images (Cloudinary, S3)
6. **Newsletter** quand design liké/commenté

---

## 🔮 ÉVOLUTIONS FUTURES

### Court Terme (1-2 semaines)
- [ ] Migration Firebase/Supabase
- [ ] Authentification utilisateur
- [ ] Email notifications
- [ ] Modération basique

### Moyen Terme (1-2 mois)
- [ ] Partage sur réseaux sociaux
- [ ] Export haute résolution
- [ ] Galerie privée (mes designs)
- [ ] Recherche par artiste/titre

### Long Terme (3-6 mois)
- [ ] Boutique e-commerce (acheter les designs)
- [ ] Impression à la demande
- [ ] Collaboration en temps réel
- [ ] AR (essayer virtuellement)

---

## ✅ CHECKLIST DE TEST

Avant de partager avec le public :

**Studio :**
- [ ] Upload fonctionne (PNG, JPG)
- [ ] Validation taille (> 5 MB rejeté)
- [ ] Ajustements sliders fonctionnent
- [ ] Toggle blanc/noir fonctionne
- [ ] Download génère un PNG correct
- [ ] Formulaire valide les champs requis
- [ ] Soumission ajoute à la galerie

**Galerie :**
- [ ] Designs s'affichent en grid
- [ ] Filtres fonctionnent (Tous/Récents/Populaires)
- [ ] Likes fonctionnent (toggle on/off)
- [ ] Modal s'ouvre au click
- [ ] Commentaires s'ajoutent
- [ ] Instagram links fonctionnent
- [ ] Responsive (mobile/tablet/desktop)

**Général :**
- [ ] Navigation Studio/Galerie visible
- [ ] Dark mode fonctionne partout
- [ ] Animations fluides
- [ ] Aucune erreur console

---

## 📞 SUPPORT

**Pour tester localement :**
```bash
npm run dev
# Visitez http://localhost:3000/studio
# Visitez http://localhost:3000/galerie
```

**Pour déployer :**
```bash
git add .
git commit -m "feat: Add Studio and Gallery features"
git push
# Vercel redéploie automatiquement
```

---

**🎨 Votre communauté Arteral peut maintenant créer, partager et s'inspirer ! ✨**
