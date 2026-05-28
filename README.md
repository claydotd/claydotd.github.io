# AGD Creative Services Website

React + Vite website for audio, web, and photography services.

## Run locally

```bash
npm install
npm run dev
```

## Deploy to GitHub Pages

1. Create a GitHub repository named `agdwebsite` (or update the base path in `vite.config.js`).
2. Push your code to the repository.
3. Run:

```bash
npm run deploy
```

This publishes the `dist` folder to the `gh-pages` branch.

## If your repository name is different

Update the default `base` value in `vite.config.js` from:

```js
'/agdwebsite/'
```

to:

```js
'/your-repo-name/'
```
