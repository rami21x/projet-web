# 🚀 GUIDE DE DÉPLOIEMENT ARTERAL

## ✅ CHECKLIST AVANT DÉPLOIEMENT

### 📋 ÉTAPE 1 : Contenu Obligatoire

- [ ] **Musique d'ambiance** : `public/ambient-music.mp3` ajoutée
- [ ] **Email de contact** : Vérifier dans `data/content.js` → `contact@arteral.com`
- [ ] **Instagram** : Vérifier dans `data/content.js` → `@arteral`
- [ ] **Informations de marque** : Tous les textes sont finalisés

---

### 📸 ÉTAPE 2 : Images (Optionnel mais Recommandé)

Consultez `public/images/README.md` pour le guide complet.

**Minimum vital :**
- [ ] 2-3 photos de collection (si disponibles)

**Recommandé :**
- [ ] Photos d'artistes collaborateurs
- [ ] Photos du processus créatif
- [ ] Images de brand/hero

**Note :** Le site fonctionne parfaitement sans images pour l'instant !

---

### 🔧 ÉTAPE 3 : Configuration

#### A. Vérifier les Informations de Contact

```bash
# Ouvrez et modifiez si nécessaire :
nano data/content.js
```

Vérifiez ces lignes :
```javascript
export const siteConfig = {
  name: "ARTERAL",
  tagline: "Mode Philosophique",
  email: "contact@arteral.com",  // ← VOTRE EMAIL ICI
  instagram: "@arteral",          // ← VOTRE INSTAGRAM ICI
};
```

#### B. Créer un fichier .env.local (optionnel)

```bash
# Créez le fichier
touch .env.local
```

Ajoutez (si vous avez des clés API plus tard) :
```
# Analytics (optionnel)
NEXT_PUBLIC_GA_ID=your-google-analytics-id

# Newsletter (optionnel, pour plus tard)
MAILCHIMP_API_KEY=your-api-key
```

---

### 🧪 ÉTAPE 4 : Tests Locaux

#### Test 1 : Build de Production

```bash
npm run build
```

✅ **Résultat attendu :** Build réussi sans erreurs critiques
⚠️ **Notes :** Les warnings sur Google Fonts sont normaux (problème de TLS, n'affecte pas le déploiement)

#### Test 2 : Serveur de Production Local

```bash
npm run build && npm start
```

✅ Visitez http://localhost:3000 et testez :
- [ ] Toutes les pages se chargent
- [ ] Navigation fonctionne
- [ ] Dark mode fonctionne
- [ ] Musique se lance (si fichier ajouté)
- [ ] Formulaires répondent
- [ ] Responsive (testez sur mobile avec DevTools)

#### Test 3 : Performance

Ouvrez la console (F12) et vérifiez :
- [ ] Aucune erreur rouge critique
- [ ] Pas de warnings majeurs
- [ ] Images se chargent

---

## 🌐 ÉTAPE 5 : DÉPLOIEMENT SUR VERCEL

### Méthode 1 : Déploiement via Git (Recommandé)

#### A. Créer un compte Vercel

1. Allez sur [vercel.com](https://vercel.com)
2. Cliquez "Sign Up"
3. **Connectez avec GitHub**

#### B. Déployer le projet

1. Dans Vercel, cliquez **"Add New Project"**
2. **Importez votre repository** `rami21x/projet-web`
3. Vercel détecte automatiquement Next.js
4. **Configurez** :
   - Framework Preset : **Next.js** ✅ (auto-détecté)
   - Root Directory : `.` (racine)
   - Build Command : `npm run build` (auto)
   - Output Directory : `.next` (auto)

5. **Variables d'environnement** (optionnel pour l'instant)
   - Laissez vide pour le moment

6. Cliquez **"Deploy"** 🚀

#### C. Attendez le déploiement

⏱️ Temps : 2-5 minutes

✅ **Succès !** Vercel vous donne une URL :
```
https://projet-web-xxxx.vercel.app
```

#### D. Configurez un domaine personnalisé (optionnel)

1. Dans Vercel, allez dans **Settings** → **Domains**
2. Ajoutez votre domaine (ex: `arteral.com`)
3. Suivez les instructions DNS

---

### Méthode 2 : Déploiement CLI (Alternative)

```bash
# Installez Vercel CLI
npm install -g vercel

# Déployez
vercel

# Suivez les instructions
# Projet détecté : Next.js
# Confirmez les paramètres
# Déploiement automatique !
```

---

## 🎵 AJOUTER LA MUSIQUE APRÈS DÉPLOIEMENT

### Option A : Via Git (Recommandé)

```bash
# 1. Ajoutez votre fichier musique
cp /chemin/vers/votre-musique.mp3 public/ambient-music.mp3

# 2. Vérifiez la taille (< 5 MB recommandé)
ls -lh public/ambient-music.mp3

# 3. Committez
git add public/ambient-music.mp3
git commit -m "feat: Add ambient museum music"
git push

# 4. Vercel redéploie automatiquement ! ✨
```

### Option B : Via Vercel Dashboard

Si le fichier est trop gros pour Git (> 10 MB) :
1. Utilisez un service de stockage externe (Cloudinary, AWS S3)
2. Modifiez `components/AmbientMusic.tsx` :

```tsx
// Changez la ligne :
<source src="/ambient-music.mp3" type="audio/mpeg" />

// Par :
<source src="https://votre-cdn.com/ambient-music.mp3" type="audio/mpeg" />
```

---

## 🔐 ÉTAPE 6 : SÉCURITÉ & SEO

### A. Ajouter un robots.txt

```bash
# Créez le fichier
touch public/robots.txt
```

Contenu :
```
User-agent: *
Allow: /

Sitemap: https://votre-domaine.com/sitemap.xml
```

### B. Créer un sitemap.xml (optionnel)

```bash
# Installez le package
npm install next-sitemap

# Créez la config
touch next-sitemap.config.js
```

Contenu de `next-sitemap.config.js` :
```javascript
/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://arteral.com', // ← VOTRE DOMAINE
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
      },
    ],
  },
}
```

Ajoutez dans `package.json` :
```json
"scripts": {
  "postbuild": "next-sitemap"
}
```

### C. Métadonnées SEO (déjà configuré ✅)

Vérifiez dans `app/layout.tsx` :
- ✅ Titre : "ARTERAL - Mode Philosophique"
- ✅ Description
- ✅ Keywords
- ✅ OpenGraph pour réseaux sociaux

---

## 📊 ÉTAPE 7 : ANALYTICS (Optionnel)

### Ajouter Google Analytics

1. Créez un compte [Google Analytics](https://analytics.google.com)
2. Obtenez votre ID (ex: `G-XXXXXXXXXX`)
3. Installez le package :

```bash
npm install @next/third-parties
```

4. Modifiez `app/layout.tsx` :

```tsx
import { GoogleAnalytics } from '@next/third-parties/google'

// Dans le <body> :
<GoogleAnalytics gaId="G-XXXXXXXXXX" />
```

---

## 🚨 DÉPANNAGE

### Problème : Build échoue

**Erreur Google Fonts :**
```
Failed to fetch fonts from Google
```

**Solution :** C'est un warning normal, n'empêche PAS le déploiement. Ignorez.

---

### Problème : Musique ne joue pas

**Causes possibles :**
1. Fichier manquant → Vérifiez `public/ambient-music.mp3`
2. Fichier trop gros (> 50 MB) → Compressez
3. Format incompatible → Utilisez MP3 128-192 kbps

**Test local :**
```bash
# Vérifiez le fichier
ls -lh public/ambient-music.mp3

# Testez dans le navigateur
open http://localhost:3000
```

---

### Problème : Images ne s'affichent pas

**Solution :** Vérifiez les chemins :
```javascript
// Bon ✅
src="/images/collection/piece-1.jpg"

// Mauvais ❌
src="./images/collection/piece-1.jpg"
src="images/collection/piece-1.jpg"
```

Tous les chemins doivent commencer par `/` (racine public)

---

## 📱 ÉTAPE 8 : TESTS POST-DÉPLOIEMENT

### Checklist sur le site en ligne :

- [ ] **Homepage** : Chargement rapide, animations fonctionnent
- [ ] **Manifeste** : Machine à écrire fonctionne
- [ ] **Livre d'Or** : Formulaire fonctionne
- [ ] **Contact** : Formulaire fonctionne
- [ ] **Musique** : Bouton toggle répond
- [ ] **Dark Mode** : Basculement fluide
- [ ] **Responsive** : Testez sur téléphone réel
- [ ] **Easter Eggs** : Tapez "ArteralPhilosophie"

### Tests navigateurs :

- [ ] Chrome (desktop + mobile)
- [ ] Firefox
- [ ] Safari (si Mac/iPhone disponible)
- [ ] Edge

### Tests performance :

1. Allez sur [PageSpeed Insights](https://pagespeed.web.dev/)
2. Entrez votre URL Vercel
3. Visez un score > 80

---

## 🎯 ÉTAPE 9 : PARTAGE & PROMOTION

### A. Préparer les partages sociaux

Testez comment votre site apparaît :
- [Facebook Debugger](https://developers.facebook.com/tools/debug/)
- [Twitter Card Validator](https://cards-dev.twitter.com/validator)

### B. Créer des assets de promo

- [ ] Screenshot homepage (pour Instagram)
- [ ] Vidéo courte du manifeste animé
- [ ] GIF du slider dualité
- [ ] Capture du livre d'or

---

## 🎊 ÉTAPE 10 : LANCEMENT !

### Jour J :

1. **Annoncez sur Instagram** :
   ```
   🎨 ARTERAL est en ligne !

   Visitez notre musée d'art digital :
   🔗 https://arteral.com

   ✨ Activez le son pour l'expérience complète
   📜 Découvrez notre manifeste
   🏆 Participez au concours 5000€

   #Arteral #ModePhilosophique #ArtIncarne
   ```

2. **Partagez avec amis/famille**
3. **Collectez les premiers retours**
4. **Ajustez si nécessaire**

---

## 📈 APRÈS LE LANCEMENT

### Maintenance :

- **Mettez à jour** les contenus régulièrement
- **Ajoutez** de nouvelles photos de collection
- **Modérez** le Livre d'Or si nécessaire
- **Analysez** les statistiques (si GA activé)
- **Optimisez** en fonction des retours

### Évolutions futures :

- [ ] Intégrer une vraie base de données (Firebase, Supabase)
- [ ] Ajouter un système de paiement (Stripe)
- [ ] Newsletter automatisée (Mailchimp, ConvertKit)
- [ ] Blog/Articles philosophiques
- [ ] Galerie 3D interactive

---

## 🆘 SUPPORT

**Si vous avez des problèmes :**

1. **Vérifiez les logs Vercel** : Dashboard → Deployments → Logs
2. **Consultez la console** : F12 dans le navigateur
3. **Testez localement** : `npm run build && npm start`

**Documentation utile :**
- [Vercel Docs](https://vercel.com/docs)
- [Next.js Docs](https://nextjs.org/docs)
- [Troubleshooting Next.js](https://nextjs.org/docs/messages)

---

## ✅ RÉCAPITULATIF EXPRESS

**Pour déployer MAINTENANT (minimum) :**

```bash
# 1. Ajoutez la musique
cp votre-musique.mp3 public/ambient-music.mp3

# 2. Vérifiez les infos de contact
nano data/content.js

# 3. Committez
git add .
git commit -m "feat: Ready for deployment"
git push

# 4. Déployez sur Vercel
# → Allez sur vercel.com
# → Import GitHub repo
# → Deploy !
```

**C'est tout ! Votre site sera en ligne en 5 minutes ! 🚀**

---

**Bon lancement ! 🎉**
