# 2026-beyond_gdp

**Live demo** https://unctad-infovis.github.io/2026-beyond_gdp/

## About

Looking Beyond GDP is a UNCTAD minisite illustrating the UN Secretary-General's High-Level Expert Group's proposed dashboard of indicators for measuring progress beyond gross domestic product (GDP). It presents selected data comparing economic output with outcomes for well-being, equity, sustainability and resilience, alongside a timeline of milestones on the way to the dashboard and a discussion of remaining data gaps.

Content is authored in MDX (`src/Article.mdx`) and rendered as a standalone React application embeddable within UNCTAD's Drupal platform. Charts are native D3 (line, grouped bar, bar-pair, dual-bar-rows, log-scale scatter), each animating in on scroll and offering hover tooltips with exact values.

## Embedding

```html
<script type="module" crossorigin="" src="https://storage.unctad.org/2026-beyond_gdp/js/2026-beyond_gdp.min.js?v=1"></script>
<link rel="stylesheet" crossorigin="" href="https://storage.unctad.org/2026-beyond_gdp/css/2026-beyond_gdp.min.css?v=1">
<div class="app-root-2026-beyond_gdp" id="app-root-2026-beyond_gdp">
  Loading...
</div>
<noscript>Your browser does not support Javascript!</noscript>
```

Update the `?v=` query parameter to match the current build version to bust the cache.

## Rights of usage

Contact Teemo Tebest.

## How to build and develop

This is a Vite + React project.

* `npm install`
* `npm run start`

Project should start at: http://localhost:8080

For developing please refer to `package.json`

## Files and folders

All public assets go to folder `public`.

All source code goes to folder `src`.

### Data files

`public/assets/data/2026-beyond_gdp_*.json` power the charts, one file per dataset (healthy life expectancy, homicides, trust, satisfaction, wealth inequality, wage gap, prejudice, emissions, and the two data-gap charts). They are generated from `tmp/BeyondGDP data.xlsx` by `scripts/convert_beyond_gdp_data.py`, a one-off Python script (requires `openpyxl`, not part of the npm build):

```
python3 scripts/convert_beyond_gdp_data.py
```

Run it manually whenever the source spreadsheet changes, then rebuild.

## Packages

The following packages are used in this project by default.

### Shared UNCTAD packages

* **@unctad-infovis/general-tools** — shared React components (`ButtonAnchor`, `ButtonShare`, `ChartDataWrapper`, `Image`, `ProgressBar`, `Quote`, `Select`, `Tooltip`, `UNCTADSiteHeader`, `BackToTop`, …), helpers (`BasePath`, `LoadFile`, `CsvToJson`, `FormatNr`, `RoundNr`, `UseIsVisible`, …) and base design-token styles
* **@unctad-infovis/minisite-tools** — report/minisite layout components (`Header`, `HeaderChapter`, `Footer`, `SideScrollingText`)

These packages are published from the [`un-init-project`](https://github.com/unctad-infovis/un-init-project) monorepo to GitHub Packages, so installing needs an `.npmrc` with `@unctad-infovis:registry=https://npm.pkg.github.com` and a `GITHUB_PACKAGES_TOKEN` environment variable.

### Project specific

* **d3** — used to build the line, bar and scatter chart primitives

### Build & Dev Server

* **vite** — development server with hot module replacement and production bundler, replaces webpack
* **@vitejs/plugin-react** — adds React and JSX support to Vite

### React

* **react** — UI component library
* **react-dom** — renders React components to the DOM

### Formatter & Linter

* **@biomejs/biome** — formats and lints JS, JSX and CSS files on save, replaces ESLint + Prettier

### Minification

* **terser** — minifies the production JavaScript bundle, removes console.logs in production builds

### MDX

* **@mdx-js/rollup** — Vite/Rollup plugin that compiles MDX files into React components
* **@mdx-js/react** — provides React context for MDX components