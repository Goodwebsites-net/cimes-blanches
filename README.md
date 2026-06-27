# Template master — Site vitrine éleveur (GoodWebsites.ch)

Site bilingue FR/EN piloté par un CMS. Construit avec **Eleventy** (générateur statique) + **Decap CMS** (édition de contenu) + **Netlify** (hébergement et build automatique).

Le client modifie lui-même **photos, prix, textes, disponibilités, témoignages, annonces et coordonnées** depuis une interface simple, sans toucher au code. À chaque enregistrement, le site se reconstruit et se met à jour automatiquement.

---

## 1. Lancer le site en local

```bash
npm install      # une seule fois
npm start        # serveur de dev sur http://localhost:8080
```

`npm run build` génère le site final dans `_site/`.

---

## 2. Architecture

```
src/
├── _data/
│   ├── site.json          ← coordonnées, slogan, Formspree, domaine (éditable CMS)
│   └── annonces.json       ← bandeau défilant (éditable CMS)
├── _includes/
│   ├── layouts/base.njk    ← coquille HTML : <head>, nav, footer, widget CMS
│   └── partials/            ← nav.njk + footer.njk (bilingues)
├── chiots/*.md             ← 1 fichier = 1 chiot (éditable CMS)
├── galerie/*.md            ← 1 fichier = 1 photo (éditable CMS)
├── temoignages/*.md        ← 1 fichier = 1 avis (éditable CMS)
├── css/ js/ images/        ← assets (copiés tels quels)
├── admin/                  ← interface CMS (index.html + config.yml)
├── *.njk                   ← pages FR (racine du site)
└── en/*.njk                ← pages EN (sous /en/)
```

**Principe clé :** les fichiers `.md` et `.json` sont la *source de vérité*. Eleventy lit ces données et génère les pages. Le CMS écrit dans ces mêmes fichiers. C'est ce qui fait que les modifs du client apparaissent vraiment sur le site.

Une seule source pilote **FR et EN** : chaque fiche a des champs `_fr` et `_en` (ex. `texte_fr`, `texte_en`). Pas de double saisie de structure.

---

## 3. Déploiement Netlify (première fois)

1. Pousser le dossier sur un dépôt GitHub.
2. Sur Netlify : **Add new site → Import an existing project →** choisir le dépôt.
3. Netlify lit `netlify.toml` automatiquement :
   - Build command : `npm run build`
   - Publish directory : `_site`
   - (si besoin de le saisir à la main : exactement ces deux valeurs)
4. Déployer.

### Activer le CMS (Decap + Netlify Identity)

1. **Site settings → Identity →** Enable Identity.
2. **Identity → Services → Git Gateway →** Enable (nécessite le dépôt GitHub connecté).
3. **Identity → Registration →** mettre sur **Invite only**.
4. **Identity → Invite users →** inviter l'email du client (ou le sien).
5. Le client reçoit un email → clique le lien → **crée son mot de passe** → atterrit sur `/admin/`.

> ⚠️ Le widget Netlify Identity est **déjà intégré** dans `base.njk` et `admin/index.html`.
> C'est lui qui valide l'invitation et la connexion. Ne pas le retirer.

L'admin est accessible sur `https://LE-SITE/admin/`.

---

## 4. RÉUTILISER ce template pour un nouveau client

C'est le but de ce master. Pour partir d'un nouveau site :

### a) Coordonnées et identité — `src/_data/site.json`
Changer : `nom`, `localite`, `telephone`, `email`, `adresse`, `formspree_id`, `domaine`, slogans, horaires, réseaux.

### b) Contenu dynamique
- **Chiots** : vider `src/chiots/` et créer les fiches du nouveau client (ou les saisir via le CMS).
- **Galerie** : remplacer `src/galerie/`.
- **Témoignages** : remplacer `src/temoignages/`.
- **Annonces** : éditer `src/_data/annonces.json`.

### c) Images — `src/images/`
Remplacer les visuels. Garder des **noms sans accents ni espaces**. Mettre à jour les chemins `photo:` / `image:` dans les fiches.

### d) Pages de contenu (textes stables)
Les pages races / conseils / santé / FAQ etc. sont dans `src/*.njk` (FR) et `src/en/*.njk` (EN). Éditer directement le HTML à l'intérieur (au-dessus, le bloc `---` est la config de la page : titre, description, liens de langue).

### e) Design — `src/css/style.css`
Les couleurs sont des variables CSS en haut du fichier (`--or`, `--glacier`, etc.). Les changer suffit à reskinner tout le site.

### f) Formspree (formulaire de contact)
Créer un formulaire sur formspree.io, récupérer l'ID, le mettre dans `site.json` (`formspree_id`). Les deux formulaires de contact (FR + EN) l'utilisent automatiquement.

### g) Le CMS suit
`src/admin/config.yml` décrit les champs éditables. Si la structure d'une fiche change (ajout d'un champ), mettre à jour `config.yml` **en miroir** — les noms de champs doivent correspondre **exactement** entre les `.md`, les pages `.njk` et `config.yml`. C'est la règle d'or : si un champ ne matche pas, il n'apparaît pas.

---

## 5. Points de vigilance (déjà gérés ici, à garder à l'œil)

- **Chemins assets** : les pages FR (racine) utilisent des chemins absolus `/css/`, `/js/`, `/images/`. Les pages EN (`/en/`) utilisent `../css/`, `../js/`, mais les **images restent en `/images/`** (galerie partagée unique). Géré automatiquement par `base.njk`.
- **Filtres Nunjucks custom** (dans `.eleventy.js`) : `stars`, `prixCH`, `lignes`, `limite`. Le `split` natif n'existe pas dans cette version — utiliser `lignes`.
- **Fiches sans page individuelle** : les `*.json` dans chaque dossier de collection (`chiots.json` etc.) portent `permalink: false`. Ne pas supprimer, sinon chaque fiche génère une page parasite.
- **netlify.toml** : c'est lui qui force le build Eleventy. Sans ce fichier, Netlify sert les fichiers bruts et le CMS ne pilote rien.

---

## 6. Stack

| Brique | Rôle | Coût |
|---|---|---|
| Eleventy | Génère le site à partir des données | gratuit |
| Decap CMS | Interface d'édition | gratuit |
| Netlify Identity + Git Gateway | Connexion CMS + écriture Git | gratuit |
| Netlify Hosting | Hébergement + build auto | gratuit (palier de base) |
| Formspree | Réception des formulaires | gratuit (50 envois/mois) |

---

*Template GoodWebsites.ch · goodwebsites@proton.me · +41 78 309 54 94*
