# FANGA GLOBAL

SPA vitrine en anglais et en français pour l’accompagnement à la digitalisation et à l’exploitation des données IoT du secteur minier au Mali et en Afrique de l’Ouest. L’anglais est la langue par défaut ; le sélecteur EN/FR mémorise le choix du visiteur dans son navigateur.

## Démarrer

Node.js suffit, aucune dépendance à installer :

```sh
npm run dev
```

Le répertoire `dist` contient le site statique complet, directement hébergeable. `npm run check` vérifie la syntaxe du JavaScript.

## Déployer sur Railway avec Docker

Le `Dockerfile` à la racine utilise Node.js 24 Alpine, sans installation de dépendances, et exécute le serveur avec un utilisateur non privilégié. L’image contient uniquement `server.mjs` et les fichiers publics de `dist`.

1. Envoyer le projet dans le dépôt GitHub à connecter à Railway, en incluant `Dockerfile`, `.dockerignore`, `server.mjs` et `dist/`.
2. Créer un service Railway depuis ce dépôt, avec la racine du projet comme répertoire de travail. Railway détecte automatiquement le `Dockerfile`.
3. Conserver la commande de démarrage du Dockerfile (`node server.mjs`) ; aucune commande de build ou d’installation supplémentaire n’est nécessaire.
4. Après le déploiement, générer un domaine dans les paramètres réseau du service. Le chemin `/` peut servir de contrôle de santé HTTP.

Le conteneur écoute sur `0.0.0.0` et utilise la variable `PORT` fournie à l’exécution par Railway (8080 par défaut dans l’image). Il ne faut pas forcer un autre port cible dans le domaine si le service utilise un port différent. Le serveur de développement local conserve `127.0.0.1:4173` par défaut.

Test local avec Docker :

```sh
docker build -t fanga-global .
docker run --rm -p 8080:8080 fanga-global
```

Ouvrir http://localhost:8080. Pour vérifier un autre port fourni à l’exécution :

```sh
docker run --rm -e PORT=9000 -p 9000:9000 fanga-global
```

## Modifier

- `dist/index.html` : contenu, navigation et coordonnées.
- `dist/translations.js` : traductions anglaises et françaises des contenus, liens e-mail et libellés d’accessibilité. Le HTML contient la version anglaise par défaut.
- `dist/styles.css` : mise en page responsive, couleurs et typographie.
- `dist/ai.css` : présentation de l’offre IA, schéma multi-agents, valeurs et coordonnées.
- `dist/app.js` : changement de langue, traductions des fiches d’expertise et agents IA, menu mobile et navigation active.
- `dist/assets` : logo et visuels fournis, images optimisées pour le web.
