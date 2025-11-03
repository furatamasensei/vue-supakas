# vue-supakas

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VS Code](https://code.visualstudio.com/) + [Vue (Official)](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Recommended Browser Setup

- Chromium-based browsers (Chrome, Edge, Brave, etc.):
  - [Vue.js devtools](https://chromewebstore.google.com/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd) 
  - [Turn on Custom Object Formatter in Chrome DevTools](http://bit.ly/object-formatters)
- Firefox:
  - [Vue.js devtools](https://addons.mozilla.org/en-US/firefox/addon/vue-js-devtools/)
  - [Turn on Custom Object Formatter in Firefox DevTools](https://fxdx.dev/firefox-devtools-custom-object-formatters/)

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) to make the TypeScript language service aware of `.vue` types.

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Project Setup

This repository depends on local `supabase-js` and `supabase/auth` package. Make sure to follow these steps in sequence.

## Setup local supabase-js package

```sh
git clone https://github.com/furatamasensei/supabase-js.git
cd supabase-js
npm install
npx nx run-many --target=build --all
```

## Spawn a new terminal and setup local supabase-auth package

```sh
git clone https://github.com/furatamasensei/auth.git
cd auth
git checkout feature/siwk
cp example.docker.env .env.docker
echo "GOTRUE_URI_ALLOW_LIST=http://localhost:5173" >> .env.docker
echo "GOTRUE_CORS_ALLOWED_HEADERS=*" >> .env.docker
echo "GOTRUE_EXTERNAL_WEB3_KASPA_ENABLED=true" >> .env.docker
echo "GOTRUE_EXTERNAL_WEB3_KASPA_MAXIMUM_VALIDITY_DURATION=10m" >> .env.docker
make build
make dev
```

## Spawn a new terminal and setup vue-supakas

```sh
pnpm install
```

## Copy and Rename Env File

```sh
cp .env.example .env
```

### Compile and Hot-Reload for Development

```sh
pnpm run dev
```

### Type-Check, Compile and Minify for Production

```sh
pnpm run build
```
