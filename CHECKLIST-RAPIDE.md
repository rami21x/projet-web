# ⚡ CHECKLIST RAPIDE DE DÉPLOIEMENT

## 🎯 VERSION EXPRESS (15 MINUTES)

### ✅ CE QUI EST DÉJÀ PRÊT
- ✅ Site complet et fonctionnel
- ✅ Dark mode
- ✅ Toutes les animations
- ✅ Navigation complète
- ✅ Formulaires fonctionnels
- ✅ Responsive mobile/tablet/desktop
- ✅ SEO configuré

---

## 📋 CE QU'IL VOUS RESTE À FAIRE

### 1. 🎵 MUSIQUE (5 min)

**Téléchargez une musique d'ambiance :**
→ [YouTube Audio Library](https://studio.youtube.com/channel/UCxxx/music)
→ [Free Music Archive](https://freemusicarchive.org/)
→ [Pixabay Music](https://pixabay.com/music/)

**Cherchez :** "ambient museum", "minimal piano", "art gallery music"

**Placez-la ici :**
```bash
public/ambient-music.mp3
```

**Taille max recommandée :** 5 MB

---

### 2. ✏️ VÉRIFIEZ VOS INFOS (2 min)

Ouvrez `data/content.js` et vérifiez :

```javascript
email: "contact@arteral.com",  // ← VOTRE EMAIL
instagram: "@arteral",          // ← VOTRE INSTAGRAM
```

---

### 3. 🚀 DÉPLOYEZ SUR VERCEL (5 min)

1. **Allez sur** → [vercel.com](https://vercel.com)
2. **Sign up** avec GitHub
3. **Import** votre projet `rami21x/projet-web`
4. **Deploy** (cliquez juste "Deploy", tout est auto)
5. **Attendez 3 min** ⏱️

**TERMINÉ !** Vous avez une URL :
```
https://projet-web-xxxx.vercel.app
```

---

### 4. ✅ TESTEZ (3 min)

Visitez votre site et testez :
- [ ] Page d'accueil → Citations changent toutes les 15s
- [ ] `/manifeste` → Manifeste s'écrit
- [ ] `/livre-or` → Laissez un message test
- [ ] Bouton musique → Testez ON/OFF
- [ ] Dark mode → Testez le toggle

---

## 🎉 C'EST TOUT !

**Votre site est en ligne et accessible au monde entier !**

---

## 📸 IMAGES (OPTIONNEL - À faire plus tard)

Quand vous aurez des photos de vos vêtements :

```bash
# Créez les dossiers
mkdir -p public/images/collection

# Ajoutez vos photos
cp mes-photos/*.jpg public/images/collection/

# Committez
git add public/images
git commit -m "Add collection photos"
git push
```

Vercel redéploie automatiquement !

---

## 🆘 SI PROBLÈME

**La musique ne joue pas ?**
→ Vérifiez que le fichier s'appelle exactement `ambient-music.mp3`
→ Vérifiez qu'il est dans `public/`

**Le build échoue ?**
→ Regardez les logs dans Vercel Dashboard
→ Warnings sur Google Fonts = NORMAL, ignorez

**Besoin d'aide ?**
→ Consultez `GUIDE-DEPLOIEMENT.md` pour le guide complet

---

## 📱 APRÈS LE DÉPLOIEMENT

**Partagez votre site :**

Instagram story :
```
🎨 ARTERAL est en ligne !

✨ Musée d'art digital
📜 Manifeste philosophique
🏆 Concours 5000€

Visitez avec le son activé 🎵
🔗 votre-url.vercel.app

#Arteral #ModePhilosophique
```

**Domaine personnalisé (optionnel) :**
Dans Vercel → Settings → Domains → Add votre domaine

---

## ⏱️ TIMELINE

- **Maintenant** : Musique + déploiement (15 min)
- **Semaine 1** : Ajoutez des photos de collection
- **Semaine 2** : Configurez un domaine personnalisé
- **Mois 1** : Connectez Analytics, Newsletter

---

**GO ! Lancez votre musée d'art digital ! 🚀**
