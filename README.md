# HuntArt

Application web full stack construite avec Express et React pour partager et découvrir des photos de street art.

## 📋 Description

HuntArt est une plateforme communautaire dédiée au street art qui permet aux utilisateurs de partager, commenter et explorer des œuvres d'art urbain. L'application offre des fonctionnalités sociales telles que les commentaires, les favoris et les réactions émotionnelles, ainsi qu'un système de modération pour maintenir la qualité du contenu.

## ✨ Fonctionnalités

- **Partage d'œuvres** - Téléchargement et description de photos de street art
- **Géolocalisation** - Localisation des œuvres pour faciliter leur découverte
- **Interactions sociales** - Commentaires, favoris et réactions aux œuvres
- **Profils utilisateurs** - Gestion des publications et des préférences
- **Modération de contenu** - Système de signalement et modération des contenus inappropriés
- **Optimisation d'images** - Redimensionnement et conversion automatiques des images
- **Responsive design** - Adaptation à tous les types d'appareils

## 🛠️ Architecture technique

### Frontend (React/Vite)
- **Framework UI** : React avec Vite comme bundler
- **Gestion d'état** : Zustand pour l'état global
- **Gestion des formulaires** : React Hook Form avec validation Yup
- **Requêtes API** : React Query (TanStack Query)
- **Routing** : React Router DOM
- **Gestion des erreurs** : React Error Boundary
- **Styling** : TailwindCSS
- **Notifications** : React Toastify

### Backend (Node.js/Express)
- **API REST** : Express.js
- **Base de données** : MySQL
- **Authentification** : JWT avec bcrypt pour le hachage des mots de passe
- **Validation** : Express Validator
- **Sécurité** : Helmet
- **Upload d'images** : Multer avec Sharp pour le traitement d'images
- **Communication par email** : Nodemailer

## 🏗️ Structure du projet

```
huntart/
├── client/                # Frontend React
│   ├── src/               # Code source React
│   ├── tailwind.config.js # Configuration TailwindCSS
│   └── package.json       # Dépendances frontend
├── server/                # Backend Express
│   ├── database/          # Migrations et seeds de base de données
│   │   ├── migrations/    # Scripts de migration de tables
│   │   └── seeds/         # Scripts pour les données de test
│   ├── src/
│   │   ├── config/        # Configuration du serveur
│   │   ├── middlewares/   # Middlewares Express
│   │   ├── scripts/       # Scripts utilitaires
│   │   └── utils/         # Fonctions utilitaires
│   └── package.json       # Dépendances backend
├── .github/workflows/     # Workflows CI/CD GitHub Actions
└── package.json           # Configuration racine du projet
```

## 💻 Installation

### Prérequis
- Node.js (v18+)
- MySQL (v8+)
- Git

### Installation complète

1. Cloner le dépôt
```bash
git clone git@github.com:techmefr/huntart.git
cd huntart
```

2. Installer les dépendances racines
```bash
npm install
```

3. Configurer le serveur
```bash
cd server
cp .env.example .env
# Modifier le fichier .env avec vos paramètres de base de données
```

4. Créer et amorcer la base de données
```bash
npm run migrate
```

5. Installer les dépendances du client
```bash
cd ../client
npm install
```

6. Démarrer le développement
```bash
# Dans le dossier racine, démarrer le serveur
cd ../server
npm run dev

# Dans un autre terminal, démarrer le client
cd ../client
npm run dev
```

## 📊 Modèle de données

La base de données comprend les tables suivantes:
- `user` - Gestion des utilisateurs et authentification
- `author` - Artistes de street art
- `streetart` - Œuvres d'art urbain
- `tag` - Mots-clés pour catégoriser les œuvres
- `comment` - Commentaires sur les œuvres
- `favorite` - Favoris des utilisateurs
- `emotion` - Réactions émotionnelles aux œuvres
- `report` - Signalements de contenu inapproprié
- `sanction` - Mesures prises contre les comportements abusifs

## 🔒 Sécurité

HuntArt implémente plusieurs mesures de sécurité:

- **Hachage des mots de passe** avec bcrypt
- **Authentification par JWT** avec délai d'expiration
- **Protection contre les attaques** par limitation de tentatives de connexion
- **Validation des entrées utilisateur** avec Express Validator
- **Protection des en-têtes HTTP** avec Helmet
- **Politique CORS** configurée pour limiter les origines
- **Vérification CAPTCHA** pour prévenir les bots

## 🚀 Linting et CI/CD

Le projet utilise:
- ESLint pour l'analyse statique du code
- Prettier pour le formatage du code
- Husky pour les hooks de pre-commit
- GitHub Actions pour l'intégration continue

```bash
# Linting
npm run lint

# Formatage du code
npm run format
```

## 📝 Licence

Ce projet est sous licence [GNU GPL v3](LICENSE).

---

Développé par [Gaëtan Compigni](https://github.com/techmefr)
