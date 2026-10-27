# fallow: aliased asset import reported as unlisted dependency

`fallow dead-code --unlisted-deps` reports an import of a non-code asset (e.g. `.png`) through a
tsconfig `paths` alias as an **unlisted dependency**, but only when `paths` is declared in a
referenced tsconfig (solution-style root `tsconfig.json` with `files: []` + `references`).

## Reproduce

```sh
npm install
npx fallow dead-code --unlisted-deps
```

Actual (fallow 3.35.0 and 3.36.0):

```
● Unlisted dependencies (1)
  @circle-assets/images
```

Expected: no findings. `@circle-assets/*` maps to `./app/assets/*` and the file exists.

## What works and what doesn't

| Setup | Result |
| --- | --- |
| `paths` in `tsconfig.app.json`, referenced from root, import `@circle-assets/images/logo.png` | reported as unlisted (bug) |
| same setup, import `@lib/greet` (aliased `.ts`) | resolved |
| same setup, import `@circle-assets/styles.css` (aliased `.css`) | resolved |
| `paths` moved into the single root `tsconfig.json`, same PNG import | resolved |

Control for the last row: replace `tsconfig.json` with
`{ "compilerOptions": { "paths": { "@circle-assets/*": ["./app/assets/*"] } }, "include": ["./app/javascript/**/*"] }`
and delete `tsconfig.app.json`.
