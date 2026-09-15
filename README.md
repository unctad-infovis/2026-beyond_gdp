# 2026-beyond_gdp

**Live demo** https://unctad-infovis.github.io/2026-beyond_gdp/

## About

Looking Beyond GDP is a UNCTAD minisite illustrating the UN Secretary-General's High-Level Expert Group's proposed dashboard of indicators for measuring progress beyond gross domestic product (GDP). It presents selected data comparing economic output with outcomes for well-being, equity, sustainability and resilience, alongside a timeline of milestones on the way to the dashboard and a discussion of remaining data gaps.

Content is authored in MDX (`src/Article.mdx`) and rendered as a standalone React application embeddable within UNCTAD's Drupal platform. Charts are native D3 (line, grouped bar, bar-pair, dual-bar-rows, log-scale scatter), each animating in on scroll and offering hover tooltips with exact values.

## Embedding

Besides the full minisite (below), each of the 9 charts is also built as its own standalone embeddable widget — see "Embedding individual charts" further down, for use in news articles and other pages that only need one chart.

```html
<script type="module" crossorigin="" src="https://storage.unctad.org/2026-beyond_gdp/js/2026-beyond_gdp.min.js?v=1"></script>
<link rel="stylesheet" crossorigin="" href="https://storage.unctad.org/2026-beyond_gdp/css/2026-beyond_gdp.min.css?v=1">
<div class="app-root-2026-beyond_gdp" id="app-root-2026-beyond_gdp">
  Loading...
</div>
<noscript>Your browser does not support Javascript!</noscript>
```

Update the `?v=` query parameter on the entry `.js`/`.css` files to match the current build version to bust the cache. Don't add a `?v=` to (or hand-write a preload link for) the shared chunk file(s) each entry imports internally (visible in `dist/js/` as e.g. `2026-beyond_gdp.styles-XXXXXXXX.js`) — their filename carries a content hash that changes on every build specifically so they never need manual versioning; a query string on that file would do nothing anyway, since each entry's own `import` statement for it is a bare, query-string-less path resolved independently of the outer `<script>` tag's URL. (This was a real incident on `2026-global_trade_update`: bumping `?v=` on the entry scripts alone did not surface a content fix that actually lived in the shared chunk — only a rebuild's new content hash, i.e. a genuinely new URL, fixed it. `2026-beyond_gdp`'s build config follows the same pattern to avoid repeating that incident.)

### Embedding individual charts

All 10 pages (the full minisite plus each of the 9 standalone charts) share the `app-root-2026-beyond_gdp` **class** (a project-wide styling hook), but each needs its own **id** — because more than one of these embeds can sit on the same article page at once, and reusing one id across them would make `getElementById` resolve to only the first, leaving the others unmounted.

The `storage.unctad.org` CDN only returns `Access-Control-Allow-Origin` for the `https://unctad.org` origin specifically — since `<script type="module">` always fetches cross-origin in CORS mode, these snippets will fail to load silently (no console error, requests just come back without the CORS header) if pasted into a test page served from any other origin, including `localhost`. Test embedding changes on an actual unctad.org page, not a local HTML file.

Each chart's stylesheet list below isn't arbitrary — a chart pulls in a different combination of shared CSS chunks depending on which chart primitives it uses internally (e.g. a `ChartPair` two-panel layout, `LineChartMulti`, `GroupedBarChart`, etc.), so the exact set of `<link>` tags differs per chart. Copy the full list for the chart you need; omitting one will leave part of that chart unstyled.

#### Health

```html
<script type="module" crossorigin="" src="https://storage.unctad.org/2026-beyond_gdp/js/2026-beyond_gdp.chart-health.min.js?v=1"></script>
<link rel="stylesheet" crossorigin="" href="https://storage.unctad.org/2026-beyond_gdp/css/2026-beyond_gdp_styles.min.css?v=1">
<link rel="stylesheet" crossorigin="" href="https://storage.unctad.org/2026-beyond_gdp/css/2026-beyond_gdp_ChartPair.min.css?v=1">
<link rel="stylesheet" crossorigin="" href="https://storage.unctad.org/2026-beyond_gdp/css/2026-beyond_gdp_ChartLegend.min.css?v=1">
<link rel="stylesheet" crossorigin="" href="https://storage.unctad.org/2026-beyond_gdp/css/2026-beyond_gdp_ChartCaption.min.css?v=1">
<link rel="stylesheet" crossorigin="" href="https://storage.unctad.org/2026-beyond_gdp/css/2026-beyond_gdp_d3Locale.min.css?v=1">
<link rel="stylesheet" crossorigin="" href="https://storage.unctad.org/2026-beyond_gdp/css/2026-beyond_gdp_LineChartMulti.min.css?v=1">
<div class="app-root-2026-beyond_gdp" id="app-root-2026-beyond_gdp-chart-health">
  Loading...
</div>
<noscript>Your browser does not support Javascript!</noscript>
```

#### Security

```html
<script type="module" crossorigin="" src="https://storage.unctad.org/2026-beyond_gdp/js/2026-beyond_gdp.chart-security.min.js?v=1"></script>
<link rel="stylesheet" crossorigin="" href="https://storage.unctad.org/2026-beyond_gdp/css/2026-beyond_gdp_styles.min.css?v=1">
<link rel="stylesheet" crossorigin="" href="https://storage.unctad.org/2026-beyond_gdp/css/2026-beyond_gdp_ChartPair.min.css?v=1">
<link rel="stylesheet" crossorigin="" href="https://storage.unctad.org/2026-beyond_gdp/css/2026-beyond_gdp_ChartLegend.min.css?v=1">
<link rel="stylesheet" crossorigin="" href="https://storage.unctad.org/2026-beyond_gdp/css/2026-beyond_gdp_ChartCaption.min.css?v=1">
<link rel="stylesheet" crossorigin="" href="https://storage.unctad.org/2026-beyond_gdp/css/2026-beyond_gdp_d3Locale.min.css?v=1">
<link rel="stylesheet" crossorigin="" href="https://storage.unctad.org/2026-beyond_gdp/css/2026-beyond_gdp_LineChartMulti.min.css?v=1">
<div class="app-root-2026-beyond_gdp" id="app-root-2026-beyond_gdp-chart-security">
  Loading...
</div>
<noscript>Your browser does not support Javascript!</noscript>
```

#### Social cohesion

```html
<script type="module" crossorigin="" src="https://storage.unctad.org/2026-beyond_gdp/js/2026-beyond_gdp.chart-trust.min.js?v=1"></script>
<link rel="stylesheet" crossorigin="" href="https://storage.unctad.org/2026-beyond_gdp/css/2026-beyond_gdp_styles.min.css?v=1">
<link rel="stylesheet" crossorigin="" href="https://storage.unctad.org/2026-beyond_gdp/css/2026-beyond_gdp_ChartLegend.min.css?v=1">
<link rel="stylesheet" crossorigin="" href="https://storage.unctad.org/2026-beyond_gdp/css/2026-beyond_gdp_ChartPair.min.css?v=1">
<link rel="stylesheet" crossorigin="" href="https://storage.unctad.org/2026-beyond_gdp/css/2026-beyond_gdp_ChartCaption.min.css?v=1">
<link rel="stylesheet" crossorigin="" href="https://storage.unctad.org/2026-beyond_gdp/css/2026-beyond_gdp_ChartYTicks.min.css?v=1">
<link rel="stylesheet" crossorigin="" href="https://storage.unctad.org/2026-beyond_gdp/css/2026-beyond_gdp_GroupedBarChart.min.css?v=1">
<div class="app-root-2026-beyond_gdp" id="app-root-2026-beyond_gdp-chart-trust">
  Loading...
</div>
<noscript>Your browser does not support Javascript!</noscript>
```

#### Satisfaction with public services

```html
<script type="module" crossorigin="" src="https://storage.unctad.org/2026-beyond_gdp/js/2026-beyond_gdp.chart-satisfaction.min.js?v=1"></script>
<link rel="stylesheet" crossorigin="" href="https://storage.unctad.org/2026-beyond_gdp/css/2026-beyond_gdp_styles.min.css?v=1">
<link rel="stylesheet" crossorigin="" href="https://storage.unctad.org/2026-beyond_gdp/css/2026-beyond_gdp_DualBarRowsLoader.min.css?v=1">
<div class="app-root-2026-beyond_gdp" id="app-root-2026-beyond_gdp-chart-satisfaction">
  Loading...
</div>
<noscript>Your browser does not support Javascript!</noscript>
```

#### Wealth inequality

```html
<script type="module" crossorigin="" src="https://storage.unctad.org/2026-beyond_gdp/js/2026-beyond_gdp.chart-wealth-inequality.min.js?v=1"></script>
<link rel="stylesheet" crossorigin="" href="https://storage.unctad.org/2026-beyond_gdp/css/2026-beyond_gdp_styles.min.css?v=1">
<link rel="stylesheet" crossorigin="" href="https://storage.unctad.org/2026-beyond_gdp/css/2026-beyond_gdp_ChartPair.min.css?v=1">
<link rel="stylesheet" crossorigin="" href="https://storage.unctad.org/2026-beyond_gdp/css/2026-beyond_gdp_ChartLegend.min.css?v=1">
<link rel="stylesheet" crossorigin="" href="https://storage.unctad.org/2026-beyond_gdp/css/2026-beyond_gdp_ChartCaption.min.css?v=1">
<link rel="stylesheet" crossorigin="" href="https://storage.unctad.org/2026-beyond_gdp/css/2026-beyond_gdp_d3Locale.min.css?v=1">
<link rel="stylesheet" crossorigin="" href="https://storage.unctad.org/2026-beyond_gdp/css/2026-beyond_gdp_LineChartMulti.min.css?v=1">
<div class="app-root-2026-beyond_gdp" id="app-root-2026-beyond_gdp-chart-wealth-inequality">
  Loading...
</div>
<noscript>Your browser does not support Javascript!</noscript>
```

#### Wage gap

```html
<script type="module" crossorigin="" src="https://storage.unctad.org/2026-beyond_gdp/js/2026-beyond_gdp.chart-wage-gap.min.js?v=1"></script>
<link rel="stylesheet" crossorigin="" href="https://storage.unctad.org/2026-beyond_gdp/css/2026-beyond_gdp_styles.min.css?v=1">
<link rel="stylesheet" crossorigin="" href="https://storage.unctad.org/2026-beyond_gdp/css/2026-beyond_gdp_ChartPair.min.css?v=1">
<link rel="stylesheet" crossorigin="" href="https://storage.unctad.org/2026-beyond_gdp/css/2026-beyond_gdp_ChartLegend.min.css?v=1">
<link rel="stylesheet" crossorigin="" href="https://storage.unctad.org/2026-beyond_gdp/css/2026-beyond_gdp_ChartCaption.min.css?v=1">
<link rel="stylesheet" crossorigin="" href="https://storage.unctad.org/2026-beyond_gdp/css/2026-beyond_gdp_ChartYTicks.min.css?v=1">
<link rel="stylesheet" crossorigin="" href="https://storage.unctad.org/2026-beyond_gdp/css/2026-beyond_gdp_BarPair.min.css?v=1">
<div class="app-root-2026-beyond_gdp" id="app-root-2026-beyond_gdp-chart-wage-gap">
  Loading...
</div>
<noscript>Your browser does not support Javascript!</noscript>
```

#### Prejudice

```html
<script type="module" crossorigin="" src="https://storage.unctad.org/2026-beyond_gdp/js/2026-beyond_gdp.chart-prejudice.min.js?v=1"></script>
<link rel="stylesheet" crossorigin="" href="https://storage.unctad.org/2026-beyond_gdp/css/2026-beyond_gdp_styles.min.css?v=1">
<link rel="stylesheet" crossorigin="" href="https://storage.unctad.org/2026-beyond_gdp/css/2026-beyond_gdp_ChartCaption.min.css?v=1">
<link rel="stylesheet" crossorigin="" href="https://storage.unctad.org/2026-beyond_gdp/css/2026-beyond_gdp_d3Locale.min.css?v=1">
<link rel="stylesheet" crossorigin="" href="https://storage.unctad.org/2026-beyond_gdp/css/2026-beyond_gdp_ScatterLog.min.css?v=1">
<div class="app-root-2026-beyond_gdp" id="app-root-2026-beyond_gdp-chart-prejudice">
  Loading...
</div>
<noscript>Your browser does not support Javascript!</noscript>
```

#### Emissions

```html
<script type="module" crossorigin="" src="https://storage.unctad.org/2026-beyond_gdp/js/2026-beyond_gdp.chart-emissions.min.js?v=1"></script>
<link rel="stylesheet" crossorigin="" href="https://storage.unctad.org/2026-beyond_gdp/css/2026-beyond_gdp_styles.min.css?v=1">
<link rel="stylesheet" crossorigin="" href="https://storage.unctad.org/2026-beyond_gdp/css/2026-beyond_gdp_ChartLegend.min.css?v=1">
<link rel="stylesheet" crossorigin="" href="https://storage.unctad.org/2026-beyond_gdp/css/2026-beyond_gdp_ChartPair.min.css?v=1">
<link rel="stylesheet" crossorigin="" href="https://storage.unctad.org/2026-beyond_gdp/css/2026-beyond_gdp_ChartCaption.min.css?v=1">
<link rel="stylesheet" crossorigin="" href="https://storage.unctad.org/2026-beyond_gdp/css/2026-beyond_gdp_d3Locale.min.css?v=1">
<link rel="stylesheet" crossorigin="" href="https://storage.unctad.org/2026-beyond_gdp/css/2026-beyond_gdp_LineChartMulti.min.css?v=1">
<div class="app-root-2026-beyond_gdp" id="app-root-2026-beyond_gdp-chart-emissions">
  Loading...
</div>
<noscript>Your browser does not support Javascript!</noscript>
```

#### Data gaps

```html
<script type="module" crossorigin="" src="https://storage.unctad.org/2026-beyond_gdp/js/2026-beyond_gdp.chart-data-gaps.min.js?v=1"></script>
<link rel="stylesheet" crossorigin="" href="https://storage.unctad.org/2026-beyond_gdp/css/2026-beyond_gdp_styles.min.css?v=1">
<link rel="stylesheet" crossorigin="" href="https://storage.unctad.org/2026-beyond_gdp/css/2026-beyond_gdp_ChartLegend.min.css?v=1">
<link rel="stylesheet" crossorigin="" href="https://storage.unctad.org/2026-beyond_gdp/css/2026-beyond_gdp_ChartCaption.min.css?v=1">
<link rel="stylesheet" crossorigin="" href="https://storage.unctad.org/2026-beyond_gdp/css/2026-beyond_gdp_ChartYTicks.min.css?v=1">
<link rel="stylesheet" crossorigin="" href="https://storage.unctad.org/2026-beyond_gdp/css/2026-beyond_gdp_GroupedBarChart.min.css?v=1">
<div class="app-root-2026-beyond_gdp" id="app-root-2026-beyond_gdp-chart-data-gaps">
  Loading...
</div>
<noscript>Your browser does not support Javascript!</noscript>
```

The exact stylesheet list per chart can shift on future builds if a chart's internal composition changes (e.g. it starts/stops using a `ChartPair` layout) — regenerate the snippet from that chart's own `dist/chart-<slug>.html` `<head>` (every `<link rel="stylesheet">` line, skipping `modulepreload` links, which are an optional performance hint the browser doesn't strictly need) rather than assuming this list stays fixed forever.

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