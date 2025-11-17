# 🎨 ARTERAL - Mode Philosophique

Site web vitrine pour **Arteral**, une marque de mode artistique conceptuelle où chaque pièce raconte un paradoxe philosophique brodé.

**Collection actuelle :** Amour ↔ Ennuie

---

## ✨ Aperçu

Site moderne et minimaliste présentant :
- 6 pages complètes et responsive
- Animations fluides avec Framer Motion
- Design dramatique et contemplatif
- SEO optimisé

**Stack technique :**
- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Framer Motion

---

## 🚀 Démarrage Rapide

```bash
# 1. Installer les dépendances (si nécessaire)
npm install

# 2. Lancer le serveur de développement
npm run dev

# 3. Ouvrir dans votre navigateur
# http://localhost:3000
```

---

## 📄 Pages du Site

| Page | URL | Description |
|------|-----|-------------|
| **Accueil** | `/` | Hero + Features + Teaser collection |
| **La Marque** | `/marque` | Philosophie, valeurs, processus créatif |
| **Collection** | `/collection` | Moodboard Amour ↔ Ennuie complet |
| **Artistes** | `/artistes` | Gallery des collaborateurs |
| **Processus** | `/processus` | Making-of détaillé |
| **Contact** | `/contact` | Newsletter + FAQ |

---

## 🎨 Identité Visuelle

### Palette de couleurs

```css
--primary: #8B0000  /* Rouge profond - Passion, feu */
--dark: #2B2B2B     /* Noir charbon - Ombre, profondeur */
--light: #E8E8E8    /* Blanc/beige - Clarté, conscience */
--accent: #A0522D   /* Brun/or - Transformation */
```

### Typographie

- **Display :** Playfair Display (Titres élégants)
- **Body :** Inter (Texte lisible)
- **Mono :** JetBrains Mono (Citations)

---

## 📁 Structure du Projet

```
app/               # Pages Next.js (routes)
components/        # Composants réutilisables
data/             # Contenu du site (content.js)
public/           # Images et fichiers statiques
```

---

## 🛠️ Personnalisation

### Modifier les textes

**Fichier :** `data/content.js`

Tous les textes sont centralisés dans ce fichier.

### Ajouter des images

1. Placez vos images dans `public/images/`
2. Utilisez le composant Next.js Image :

```tsx
import Image from "next/image";

<Image src="/images/votre-image.jpg" alt="..." width={1200} height={800} />
```

---

## 📚 Documentation Complète

Pour un guide détaillé, consultez :
- **[GUIDE_UTILISATION.md](GUIDE_UTILISATION.md)** - Guide complet pas à pas

---

## 🌍 Déploiement

### Vercel (Recommandé)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

1. Connectez votre repo GitHub
2. Vercel détecte automatiquement Next.js
3. Cliquez sur "Deploy"

**Résultat :** Site en ligne en ~2 minutes avec URL gratuite

---

## 🎯 Fonctionnalités

- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Navigation sticky avec menu hamburger mobile
- ✅ Animations scroll-reveal
- ✅ SEO metadata pour chaque page
- ✅ Formulaire newsletter
- ✅ FAQ accordion
- ✅ Performance optimisée
- ✅ Accessibilité WCAG

---

## 📦 Commandes Disponibles

```bash
npm run dev      # Serveur développement (hot reload)
npm run build    # Build production
npm start        # Serveur production
npm run lint     # Vérifier le code
```

---

## 🤝 Contribution

Ce projet a été généré par Claude Code pour présenter la marque Arteral.

---

## 📄 Licence

Tous droits réservés - Arteral © 2025

---

## 📞 Contact

- **Email :** contact@arteral.com
- **Instagram :** @arteral

---

**Mode philosophique. Art incarné. Chaque pièce raconte un paradoxe.**
