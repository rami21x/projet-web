# 🎨 GUIDE D'UTILISATION - Site Arteral

Bienvenue ! Ce guide vous explique comment visualiser et utiliser le site web Arteral que j'ai créé.

---

## 📋 TABLE DES MATIÈRES

1. [Prérequis](#-prérequis)
2. [Installation](#-installation)
3. [Lancement du site](#-lancement-du-site)
4. [Navigation du site](#-navigation-du-site)
5. [Structure du projet](#-structure-du-projet)
6. [Personnalisation](#-personnalisation)
7. [Déploiement en ligne](#-déploiement-en-ligne)
8. [Résolution de problèmes](#-résolution-de-problèmes)

---

## 🔧 PRÉREQUIS

Avant de commencer, assurez-vous d'avoir installé :

- **Node.js** (version 18 ou supérieure)
  - Vérifiez : `node --version`
  - Téléchargement : https://nodejs.org

- **npm** (inclus avec Node.js)
  - Vérifiez : `npm --version`

- **Un éditeur de code** (optionnel mais recommandé)
  - VS Code : https://code.visualstudio.com
  - Cursor : https://cursor.sh

---

## 📦 INSTALLATION

### Option 1 : Si vous êtes déjà dans le dossier projet

Le projet est déjà installé ! Toutes les dépendances sont dans `node_modules/`.

### Option 2 : Si vous clonez le projet ailleurs

```bash
# 1. Naviguez vers le dossier du projet
cd /home/user/projet-web

# 2. Installez les dépendances (si nécessaire)
npm install
```

**Temps d'installation :** ~30-60 secondes

---

## 🚀 LANCEMENT DU SITE

### Méthode 1 : Mode Développement (Recommandé pour visualiser)

```bash
# Dans le terminal, depuis le dossier projet-web
npm run dev
```

**Résultat attendu :**
```
▲ Next.js 16.0.3 (Turbopack)
- Local:    http://localhost:3000
- Network:  http://XXX.XXX.XXX.XXX:3000

✓ Ready in 2.2s
```

**🎉 Ouvrez votre navigateur et allez sur :**
```
http://localhost:3000
```

**Pour arrêter le serveur :**
- Appuyez sur `Ctrl + C` dans le terminal

---

### Méthode 2 : Mode Production (Build optimisé)

```bash
# 1. Construire le site
npm run build

# 2. Lancer le serveur production
npm start
```

⚠️ **Note :** Le build peut échouer à cause des fonts Google (problème réseau de l'environnement). Utilisez le mode développement pour visualiser.

---

## 🗺️ NAVIGATION DU SITE

Une fois le site lancé, vous pouvez explorer les **6 pages** :

### 1. 🏠 **Page d'Accueil** (`/`)
- **URL :** http://localhost:3000
- **Contenu :**
  - Hero section dramatique avec ARTERAL
  - 3 features (Art Conceptuel, Philosophie, Séries Limitées)
  - Section philosophie preview
  - Teaser collection "Amour ↔ Ennuie"

### 2. 📖 **La Marque** (`/marque`)
- **URL :** http://localhost:3000/marque
- **Contenu :**
  - Vision et mission Arteral
  - Univers philosophique (Yin/Yang, Jung, Nietzsche)
  - Processus créatif en 6 étapes
  - 4 valeurs fondamentales

### 3. 🎨 **Collection** (`/collection`)
- **URL :** http://localhost:3000/collection
- **Contenu :**
  - Moodboard 3 colonnes (Amour | Artwork | Ennuie)
  - 6 éléments de la série
  - Timeline création
  - Citation philosophique Nietzsche

### 4. 👥 **Artistes** (`/artistes`)
- **URL :** http://localhost:3000/artistes
- **Contenu :**
  - Gallery de 3 artistes collaborateurs
  - Sophie Moreau, Lucas Chen, Amara Diallo
  - Contributions à la collection
  - Call-to-action collaboration

### 5. ⚙️ **Processus** (`/processus`)
- **URL :** http://localhost:3000/processus
- **Contenu :**
  - 4 sections détaillées (Recherche, Collaboration, Adaptation, Storytelling)
  - Timeline overview
  - Processus complet de création

### 6. 📧 **Contact** (`/contact`)
- **URL :** http://localhost:3000/contact
- **Contenu :**
  - Formulaire newsletter (email + nom)
  - Informations contact (email, Instagram)
  - FAQ avec 7 questions-réponses

---

## 📁 STRUCTURE DU PROJET

```
projet-web/
├── app/                          # Pages et routes Next.js
│   ├── layout.tsx               # Layout global (Navigation + Footer)
│   ├── page.tsx                 # Page d'accueil (/)
│   ├── globals.css              # Styles CSS globaux + couleurs
│   ├── marque/
│   │   ├── layout.tsx          # Metadata SEO
│   │   └── page.tsx            # Page La Marque
│   ├── collection/
│   │   ├── layout.tsx          # Metadata SEO
│   │   └── page.tsx            # Page Collection
│   ├── artistes/
│   │   ├── layout.tsx          # Metadata SEO
│   │   └── page.tsx            # Page Artistes
│   ├── processus/
│   │   ├── layout.tsx          # Metadata SEO
│   │   └── page.tsx            # Page Processus
│   └── contact/
│       ├── layout.tsx          # Metadata SEO
│       └── page.tsx            # Page Contact
│
├── components/                   # Composants réutilisables
│   ├── Navigation.tsx           # Menu navigation responsive
│   ├── Footer.tsx               # Footer avec liens
│   └── FadeIn.tsx              # Animation scroll reveal
│
├── data/
│   └── content.js              # TOUT le contenu du site (textes, données)
│
├── public/                      # Fichiers statiques (images, icônes)
│   ├── images/                 # Vos images ici
│   └── icons/                  # Vos icônes ici
│
├── package.json                 # Dépendances du projet
├── tailwind.config.ts          # Configuration Tailwind (couleurs)
├── tsconfig.json               # Configuration TypeScript
└── next.config.ts              # Configuration Next.js
```

---

## 🎨 PERSONNALISATION

### 1. Modifier les Textes

**Fichier principal :** `data/content.js`

Tous les textes du site sont centralisés ici :

```javascript
// Exemple : Modifier le hero de la page d'accueil
export const heroContent = {
  title: "ARTERAL",  // ← Modifier ici
  subtitle: "Votre nouveau texte ici...",
  description: "Mode philosophique. Art incarné.",
  cta: {
    text: "Découvrez Amour ↔ Ennuie",
    link: "/collection",
  },
};
```

**Après modification :**
- Sauvegardez le fichier
- Le site se recharge automatiquement (hot reload)

---

### 2. Modifier les Couleurs

**Fichier :** `app/globals.css`

```css
:root {
  --primary: #8B0000;     /* Rouge profond */
  --dark: #2B2B2B;        /* Noir charbon */
  --light: #E8E8E8;       /* Blanc/beige */
  --accent: #A0522D;      /* Brun/or */
}
```

Changez les codes couleur HEX selon vos préférences.

---

### 3. Ajouter des Images

**1. Placez vos images dans :** `public/images/`

Exemple :
```
public/images/
├── hero-background.jpg
├── moodboard-amour-ennuie.jpg
├── artists/
│   ├── sophie-moreau.jpg
│   ├── lucas-chen.jpg
│   └── amara-diallo.jpg
```

**2. Utilisez-les dans le code :**

```tsx
import Image from "next/image";

<Image
  src="/images/hero-background.jpg"
  alt="Description"
  width={1200}
  height={800}
/>
```

---

### 4. Modifier la Navigation

**Fichier :** `data/content.js`

```javascript
export const navigation = [
  { name: "Accueil", href: "/" },
  { name: "La Marque", href: "/marque" },
  { name: "Collection", href: "/collection" },
  { name: "Artistes", href: "/artistes" },
  { name: "Processus", href: "/processus" },
  { name: "Contact", href: "/contact" },
];
```

Ajoutez ou supprimez des pages selon vos besoins.

---

## 🌍 DÉPLOIEMENT EN LIGNE

### Option 1 : Vercel (Recommandé - Gratuit)

**Étapes :**

1. **Créez un compte :** https://vercel.com/signup

2. **Connectez votre repo GitHub :**
   - Import Git Repository
   - Sélectionnez votre repo `projet-web`

3. **Déployez :**
   - Vercel détecte automatiquement Next.js
   - Cliquez sur "Deploy"
   - ⏱️ Temps de déploiement : ~2-3 minutes

4. **Résultat :**
   - Vous obtenez une URL : `https://votre-projet.vercel.app`

**Avantages :**
- Déploiement automatique à chaque push Git
- HTTPS gratuit
- CDN mondial
- Zero configuration

---

### Option 2 : Netlify (Alternative)

1. **Compte :** https://www.netlify.com
2. **Connectez votre repo**
3. **Build settings :**
   - Build command: `npm run build`
   - Publish directory: `.next`
4. **Deploy**

---

### Option 3 : GitHub Pages (Avec export statique)

```bash
# 1. Modifier next.config.ts
export default {
  output: 'export',
};

# 2. Build
npm run build

# 3. Le dossier `out/` contient le site statique
# 4. Déployez sur GitHub Pages
```

---

## 🛠️ RÉSOLUTION DE PROBLÈMES

### ❌ Problème : "Module not found"

**Solution :**
```bash
rm -rf node_modules package-lock.json
npm install
```

---

### ❌ Problème : Port 3000 déjà utilisé

**Solution 1 : Utiliser un autre port**
```bash
PORT=3001 npm run dev
```

**Solution 2 : Tuer le processus sur le port 3000**
```bash
# Linux/Mac
lsof -ti:3000 | xargs kill -9

# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

---

### ❌ Problème : Build fail avec Google Fonts

**C'est normal !** Problème réseau de l'environnement.

**Solution :** Utilisez `npm run dev` au lieu de `npm run build`

---

### ❌ Problème : Les animations ne fonctionnent pas

**Vérifiez :**
1. Framer Motion est installé : `npm list framer-motion`
2. Si absent : `npm install framer-motion`

---

### ❌ Problème : Page blanche

**Ouvrez la console navigateur :**
- Chrome/Edge : `F12` ou `Ctrl + Shift + I`
- Firefox : `F12`
- Safari : `Cmd + Option + I`

Vérifiez les erreurs JavaScript.

---

## 📱 TESTER SUR MOBILE

### Option 1 : Depuis votre réseau local

1. **Trouvez votre IP locale :**
   ```bash
   # Linux/Mac
   ifconfig | grep "inet "

   # Windows
   ipconfig
   ```

2. **Accédez depuis votre téléphone :**
   ```
   http://VOTRE_IP:3000

   Exemple : http://192.168.1.45:3000
   ```

### Option 2 : Déployez sur Vercel

Vercel donne une URL accessible de partout.

---

## 🎯 CHECKLIST AVANT DÉPLOIEMENT

- [ ] Testez toutes les 6 pages
- [ ] Vérifiez responsive (mobile, tablet, desktop)
- [ ] Ajoutez vos vraies images
- [ ] Modifiez les textes selon vos besoins
- [ ] Testez les formulaires
- [ ] Vérifiez les liens (email, Instagram)
- [ ] Configurez analytics (optionnel)
- [ ] Ajoutez favicon personnalisé
- [ ] Testez sur plusieurs navigateurs

---

## 📞 AIDE SUPPLÉMENTAIRE

### Documentation officielle :
- **Next.js :** https://nextjs.org/docs
- **Tailwind CSS :** https://tailwindcss.com/docs
- **Framer Motion :** https://www.framer.com/motion/

### Ressources utiles :
- **Images gratuites :** https://unsplash.com
- **Icônes :** https://lucide.dev
- **Couleurs :** https://coolors.co

---

## 🎉 PROFITEZ DE VOTRE SITE !

Votre site Arteral est maintenant prêt à être utilisé.

**Commande rapide pour démarrer :**
```bash
cd /home/user/projet-web
npm run dev
```

**Puis ouvrez :** http://localhost:3000

Bon développement ! 🚀
