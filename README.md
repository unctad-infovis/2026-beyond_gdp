# 2026-beyond_gdp

**Live demo** https://unctad-infovis.github.io/2026-beyond_gdp/

## About

Looking Beyond GDP is a UNCTAD minisite illustrating the UN Secretary-General's High-Level Expert Group's proposed dashboard of indicators for measuring progress beyond gross domestic product (GDP). It presents selected data comparing economic output with outcomes for well-being, equity, sustainability and resilience, alongside a timeline of milestones on the way to the dashboard and a discussion of remaining data gaps.

Content is authored in MDX (`src/Article.mdx`) and rendered as a standalone React application embeddable within UNCTAD's Drupal platform. Charts are native D3 (line, grouped bar, bar-pair, dual-bar-rows, log-scale scatter), each animating in on scroll and offering hover tooltips with exact values.

## Embedding

Besides the full minisite (below), each of the 9 charts is also built as its own standalone embeddable widget — see "Embedding individual charts" further down, for use in news articles and other pages that only need one chart.

**Current live version: `?v=13`.** Every snippet in this README is kept at this number to match what's actually pasted into the live Drupal pages (the full "Looking Beyond GDP" publication page and the embedded charts in the English/French/Spanish news article). Whenever a new build is deployed to `storage.unctad.org` with a content change, bump `?v=` by one **everywhere it appears in this README, and in every live Drupal embed simultaneously** — a mismatch between what's documented here and what's actually pasted into Drupal is exactly the kind of drift that caused the full-page embed to go stale (still on `?v=11` with only one CSS link) after this file's CSS was split into 11 files.

```html
<script type="module" crossorigin="" src="https://storage.unctad.org/2026-beyond_gdp/js/2026-beyond_gdp.min.js?v=13"></script>
<link rel="stylesheet" crossorigin="" href="https://storage.unctad.org/2026-beyond_gdp/css/2026-beyond_gdp_styles.min.css?v=13">
<link rel="stylesheet" crossorigin="" href="https://storage.unctad.org/2026-beyond_gdp/css/2026-beyond_gdp_ChartCaption.min.css?v=13">
<link rel="stylesheet" crossorigin="" href="https://storage.unctad.org/2026-beyond_gdp/css/2026-beyond_gdp_d3Locale.min.css?v=13">
<link rel="stylesheet" crossorigin="" href="https://storage.unctad.org/2026-beyond_gdp/css/2026-beyond_gdp_ScatterLog.min.css?v=13">
<link rel="stylesheet" crossorigin="" href="https://storage.unctad.org/2026-beyond_gdp/css/2026-beyond_gdp_ChartLegend.min.css?v=13">
<link rel="stylesheet" crossorigin="" href="https://storage.unctad.org/2026-beyond_gdp/css/2026-beyond_gdp_ChartPair.min.css?v=13">
<link rel="stylesheet" crossorigin="" href="https://storage.unctad.org/2026-beyond_gdp/css/2026-beyond_gdp_DualBarRowsLoader.min.css?v=13">
<link rel="stylesheet" crossorigin="" href="https://storage.unctad.org/2026-beyond_gdp/css/2026-beyond_gdp_LineChartMulti.min.css?v=13">
<link rel="stylesheet" crossorigin="" href="https://storage.unctad.org/2026-beyond_gdp/css/2026-beyond_gdp_ChartYTicks.min.css?v=13">
<link rel="stylesheet" crossorigin="" href="https://storage.unctad.org/2026-beyond_gdp/css/2026-beyond_gdp_GroupedBarChart.min.css?v=13">
<link rel="stylesheet" crossorigin="" href="https://storage.unctad.org/2026-beyond_gdp/css/2026-beyond_gdp_BarPair.min.css?v=13">
<link rel="stylesheet" crossorigin="" href="https://storage.unctad.org/2026-beyond_gdp/css/2026-beyond_gdp.min.css?v=13">
<div class="app-root-2026-beyond_gdp" id="app-root-2026-beyond_gdp">
  Loading...
</div>
<noscript>Your browser does not support Javascript!</noscript>
```

The full page now needs all of the above stylesheet links, not just the last one — since the 9 standalone chart entries were added, Vite splits shared chart CSS (`ChartPair`, `LineChartMulti`, `GroupedBarChart`, etc.) into their own chunk files instead of bundling everything into `2026-beyond_gdp.min.css`, because those chunks are now shared across multiple entries. `2026-beyond_gdp.min.css` still exists but now only holds what's exclusive to the full page (header/nav/footer/etc.) — regenerate this list from `dist/index.html`'s own `<link rel="stylesheet">` tags (skip `modulepreload` links) if it changes on a future build. Update the `?v=` query parameter on the entry `.js`/`.css` files to match the current build version to bust the cache. Don't add a `?v=` to (or hand-write a preload link for) the shared chunk file(s) each entry imports internally (visible in `dist/js/` as e.g. `2026-beyond_gdp.styles-XXXXXXXX.js`) — their filename carries a content hash that changes on every build specifically so they never need manual versioning; a query string on that file would do nothing anyway, since each entry's own `import` statement for it is a bare, query-string-less path resolved independently of the outer `<script>` tag's URL. (This was a real incident on `2026-global_trade_update`: bumping `?v=` on the entry scripts alone did not surface a content fix that actually lived in the shared chunk — only a rebuild's new content hash, i.e. a genuinely new URL, fixed it. `2026-beyond_gdp`'s build config follows the same pattern to avoid repeating that incident.)

### Languages

The full minisite ships in English, French and Spanish from a single build — there's no separate French/Spanish `index.html`. `src/jsx/i18n.js`'s `resolveLanguage()` picks the language at runtime, in priority order: a `?lang=fr`/`?lang=es` query param, a `lang="fr"`/`lang="es"` attribute on the embed's root `<div>`, an `/fr/`/`/es/` segment in the page's own URL path (how unctad.org serves translated pages), falling back to English. There's no in-page language switcher — the embedding page's language decides. Content lives in parallel `Article.mdx`/`Article.fr.mdx`/`Article.es.mdx` and `meta.json`/`meta.fr.json`/`meta.es.json` files; every component that renders copy (chart "Source:"/"Note:" labels, the "← Back to dashboard" link, Header/Footer CTAs, dashboard framework labels, etc.) takes that copy as a prop rather than hardcoding it, so the same components serve all three languages.

The 9 standalone chart embeds don't use runtime language resolution — each language is a separate build entry/bootstrap file (e.g. `chart-health.html` / `chart-health-fr.html` / `chart-health-es.html`), matching the pattern already used to keep each standalone embed's content self-contained. Pick the snippet for the language the embedding page is actually in.

### Embedding individual charts

All 28 pages (the full minisite plus each of the 9 standalone charts × 3 languages) share the `app-root-2026-beyond_gdp` **class** (a project-wide styling hook), but each needs its own **id** — because more than one of these embeds can sit on the same article page at once, and reusing one id across them would make `getElementById` resolve to only the first, leaving the others unmounted.

The `storage.unctad.org` CDN only returns `Access-Control-Allow-Origin` for the `https://unctad.org` origin specifically — since `<script type="module">` always fetches cross-origin in CORS mode, these snippets will fail to load silently (no console error, requests just come back without the CORS header) if pasted into a test page served from any other origin, including `localhost`. Test embedding changes on an actual unctad.org page, not a local HTML file.

Each chart's stylesheet list below isn't arbitrary — a chart pulls in a different combination of shared CSS chunks depending on which chart primitives it uses internally (e.g. a `ChartPair` two-panel layout, `LineChartMulti`, `GroupedBarChart`, etc.), so the exact set of `<link>` tags differs per chart. Copy the full list for the chart you need; omitting one will leave part of that chart unstyled.

#### Health

```html
<script type="module" crossorigin="" src="https://storage.unctad.org/2026-beyond_gdp/js/2026-beyond_gdp.chart-health.min.js?v=13"></script>
<link rel="stylesheet" crossorigin="" href="https://storage.unctad.org/2026-beyond_gdp/css/2026-beyond_gdp_styles.min.css?v=13">
<link rel="stylesheet" crossorigin="" href="https://storage.unctad.org/2026-beyond_gdp/css/2026-beyond_gdp_ChartPair.min.css?v=13">
<link rel="stylesheet" crossorigin="" href="https://storage.unctad.org/2026-beyond_gdp/css/2026-beyond_gdp_ChartLegend.min.css?v=13">
<link rel="stylesheet" crossorigin="" href="https://storage.unctad.org/2026-beyond_gdp/css/2026-beyond_gdp_ChartCaption.min.css?v=13">
<link rel="stylesheet" crossorigin="" href="https://storage.unctad.org/2026-beyond_gdp/css/2026-beyond_gdp_d3Locale.min.css?v=13">
<link rel="stylesheet" crossorigin="" href="https://storage.unctad.org/2026-beyond_gdp/css/2026-beyond_gdp_LineChartMulti.min.css?v=13">
<div class="app-root-2026-beyond_gdp" id="app-root-2026-beyond_gdp-chart-health">
  Loading...
</div>
<noscript>Your browser does not support Javascript!</noscript>
```

#### Security

```html
<script type="module" crossorigin="" src="https://storage.unctad.org/2026-beyond_gdp/js/2026-beyond_gdp.chart-security.min.js?v=13"></script>
<link rel="stylesheet" crossorigin="" href="https://storage.unctad.org/2026-beyond_gdp/css/2026-beyond_gdp_styles.min.css?v=13">
<link rel="stylesheet" crossorigin="" href="https://storage.unctad.org/2026-beyond_gdp/css/2026-beyond_gdp_ChartPair.min.css?v=13">
<link rel="stylesheet" crossorigin="" href="https://storage.unctad.org/2026-beyond_gdp/css/2026-beyond_gdp_ChartLegend.min.css?v=13">
<link rel="stylesheet" crossorigin="" href="https://storage.unctad.org/2026-beyond_gdp/css/2026-beyond_gdp_ChartCaption.min.css?v=13">
<link rel="stylesheet" crossorigin="" href="https://storage.unctad.org/2026-beyond_gdp/css/2026-beyond_gdp_d3Locale.min.css?v=13">
<link rel="stylesheet" crossorigin="" href="https://storage.unctad.org/2026-beyond_gdp/css/2026-beyond_gdp_LineChartMulti.min.css?v=13">
<div class="app-root-2026-beyond_gdp" id="app-root-2026-beyond_gdp-chart-security">
  Loading...
</div>
<noscript>Your browser does not support Javascript!</noscript>
```

#### Social cohesion

```html
<script type="module" crossorigin="" src="https://storage.unctad.org/2026-beyond_gdp/js/2026-beyond_gdp.chart-trust.min.js?v=13"></script>
<link rel="stylesheet" crossorigin="" href="https://storage.unctad.org/2026-beyond_gdp/css/2026-beyond_gdp_styles.min.css?v=13">
<link rel="stylesheet" crossorigin="" href="https://storage.unctad.org/2026-beyond_gdp/css/2026-beyond_gdp_ChartLegend.min.css?v=13">
<link rel="stylesheet" crossorigin="" href="https://storage.unctad.org/2026-beyond_gdp/css/2026-beyond_gdp_ChartPair.min.css?v=13">
<link rel="stylesheet" crossorigin="" href="https://storage.unctad.org/2026-beyond_gdp/css/2026-beyond_gdp_ChartCaption.min.css?v=13">
<link rel="stylesheet" crossorigin="" href="https://storage.unctad.org/2026-beyond_gdp/css/2026-beyond_gdp_ChartYTicks.min.css?v=13">
<link rel="stylesheet" crossorigin="" href="https://storage.unctad.org/2026-beyond_gdp/css/2026-beyond_gdp_GroupedBarChart.min.css?v=13">
<div class="app-root-2026-beyond_gdp" id="app-root-2026-beyond_gdp-chart-trust">
  Loading...
</div>
<noscript>Your browser does not support Javascript!</noscript>
```

#### Satisfaction with public services

```html
<script type="module" crossorigin="" src="https://storage.unctad.org/2026-beyond_gdp/js/2026-beyond_gdp.chart-satisfaction.min.js?v=13"></script>
<link rel="stylesheet" crossorigin="" href="https://storage.unctad.org/2026-beyond_gdp/css/2026-beyond_gdp_styles.min.css?v=13">
<link rel="stylesheet" crossorigin="" href="https://storage.unctad.org/2026-beyond_gdp/css/2026-beyond_gdp_DualBarRowsLoader.min.css?v=13">
<div class="app-root-2026-beyond_gdp" id="app-root-2026-beyond_gdp-chart-satisfaction">
  Loading...
</div>
<noscript>Your browser does not support Javascript!</noscript>
```

#### Wealth inequality

```html
<script type="module" crossorigin="" src="https://storage.unctad.org/2026-beyond_gdp/js/2026-beyond_gdp.chart-wealth-inequality.min.js?v=13"></script>
<link rel="stylesheet" crossorigin="" href="https://storage.unctad.org/2026-beyond_gdp/css/2026-beyond_gdp_styles.min.css?v=13">
<link rel="stylesheet" crossorigin="" href="https://storage.unctad.org/2026-beyond_gdp/css/2026-beyond_gdp_ChartPair.min.css?v=13">
<link rel="stylesheet" crossorigin="" href="https://storage.unctad.org/2026-beyond_gdp/css/2026-beyond_gdp_ChartLegend.min.css?v=13">
<link rel="stylesheet" crossorigin="" href="https://storage.unctad.org/2026-beyond_gdp/css/2026-beyond_gdp_ChartCaption.min.css?v=13">
<link rel="stylesheet" crossorigin="" href="https://storage.unctad.org/2026-beyond_gdp/css/2026-beyond_gdp_d3Locale.min.css?v=13">
<link rel="stylesheet" crossorigin="" href="https://storage.unctad.org/2026-beyond_gdp/css/2026-beyond_gdp_LineChartMulti.min.css?v=13">
<div class="app-root-2026-beyond_gdp" id="app-root-2026-beyond_gdp-chart-wealth-inequality">
  Loading...
</div>
<noscript>Your browser does not support Javascript!</noscript>
```

#### Wage gap

```html
<script type="module" crossorigin="" src="https://storage.unctad.org/2026-beyond_gdp/js/2026-beyond_gdp.chart-wage-gap.min.js?v=13"></script>
<link rel="stylesheet" crossorigin="" href="https://storage.unctad.org/2026-beyond_gdp/css/2026-beyond_gdp_styles.min.css?v=13">
<link rel="stylesheet" crossorigin="" href="https://storage.unctad.org/2026-beyond_gdp/css/2026-beyond_gdp_ChartPair.min.css?v=13">
<link rel="stylesheet" crossorigin="" href="https://storage.unctad.org/2026-beyond_gdp/css/2026-beyond_gdp_ChartLegend.min.css?v=13">
<link rel="stylesheet" crossorigin="" href="https://storage.unctad.org/2026-beyond_gdp/css/2026-beyond_gdp_ChartCaption.min.css?v=13">
<link rel="stylesheet" crossorigin="" href="https://storage.unctad.org/2026-beyond_gdp/css/2026-beyond_gdp_ChartYTicks.min.css?v=13">
<link rel="stylesheet" crossorigin="" href="https://storage.unctad.org/2026-beyond_gdp/css/2026-beyond_gdp_BarPair.min.css?v=13">
<div class="app-root-2026-beyond_gdp" id="app-root-2026-beyond_gdp-chart-wage-gap">
  Loading...
</div>
<noscript>Your browser does not support Javascript!</noscript>
```

#### Prejudice

```html
<script type="module" crossorigin="" src="https://storage.unctad.org/2026-beyond_gdp/js/2026-beyond_gdp.chart-prejudice.min.js?v=13"></script>
<link rel="stylesheet" crossorigin="" href="https://storage.unctad.org/2026-beyond_gdp/css/2026-beyond_gdp_styles.min.css?v=13">
<link rel="stylesheet" crossorigin="" href="https://storage.unctad.org/2026-beyond_gdp/css/2026-beyond_gdp_ChartCaption.min.css?v=13">
<link rel="stylesheet" crossorigin="" href="https://storage.unctad.org/2026-beyond_gdp/css/2026-beyond_gdp_d3Locale.min.css?v=13">
<link rel="stylesheet" crossorigin="" href="https://storage.unctad.org/2026-beyond_gdp/css/2026-beyond_gdp_ScatterLog.min.css?v=13">
<div class="app-root-2026-beyond_gdp" id="app-root-2026-beyond_gdp-chart-prejudice">
  Loading...
</div>
<noscript>Your browser does not support Javascript!</noscript>
```

#### Emissions

```html
<script type="module" crossorigin="" src="https://storage.unctad.org/2026-beyond_gdp/js/2026-beyond_gdp.chart-emissions.min.js?v=13"></script>
<link rel="stylesheet" crossorigin="" href="https://storage.unctad.org/2026-beyond_gdp/css/2026-beyond_gdp_styles.min.css?v=13">
<link rel="stylesheet" crossorigin="" href="https://storage.unctad.org/2026-beyond_gdp/css/2026-beyond_gdp_ChartLegend.min.css?v=13">
<link rel="stylesheet" crossorigin="" href="https://storage.unctad.org/2026-beyond_gdp/css/2026-beyond_gdp_ChartPair.min.css?v=13">
<link rel="stylesheet" crossorigin="" href="https://storage.unctad.org/2026-beyond_gdp/css/2026-beyond_gdp_ChartCaption.min.css?v=13">
<link rel="stylesheet" crossorigin="" href="https://storage.unctad.org/2026-beyond_gdp/css/2026-beyond_gdp_d3Locale.min.css?v=13">
<link rel="stylesheet" crossorigin="" href="https://storage.unctad.org/2026-beyond_gdp/css/2026-beyond_gdp_LineChartMulti.min.css?v=13">
<div class="app-root-2026-beyond_gdp" id="app-root-2026-beyond_gdp-chart-emissions">
  Loading...
</div>
<noscript>Your browser does not support Javascript!</noscript>
```

#### Data gaps

```html
<script type="module" crossorigin="" src="https://storage.unctad.org/2026-beyond_gdp/js/2026-beyond_gdp.chart-data-gaps.min.js?v=13"></script>
<link rel="stylesheet" crossorigin="" href="https://storage.unctad.org/2026-beyond_gdp/css/2026-beyond_gdp_styles.min.css?v=13">
<link rel="stylesheet" crossorigin="" href="https://storage.unctad.org/2026-beyond_gdp/css/2026-beyond_gdp_ChartLegend.min.css?v=13">
<link rel="stylesheet" crossorigin="" href="https://storage.unctad.org/2026-beyond_gdp/css/2026-beyond_gdp_ChartCaption.min.css?v=13">
<link rel="stylesheet" crossorigin="" href="https://storage.unctad.org/2026-beyond_gdp/css/2026-beyond_gdp_ChartYTicks.min.css?v=13">
<link rel="stylesheet" crossorigin="" href="https://storage.unctad.org/2026-beyond_gdp/css/2026-beyond_gdp_GroupedBarChart.min.css?v=13">
<div class="app-root-2026-beyond_gdp" id="app-root-2026-beyond_gdp-chart-data-gaps">
  Loading...
</div>
<noscript>Your browser does not support Javascript!</noscript>
```

### Embedding individual charts (French)

#### Santé

```html
<script type="module" crossorigin="" src="https://storage.unctad.org/2026-beyond_gdp/js/2026-beyond_gdp.chart-health-fr.min.js?v=13"></script>
<link rel="stylesheet" crossorigin="" href="https://storage.unctad.org/2026-beyond_gdp/css/2026-beyond_gdp_styles.min.css?v=13">
<link rel="stylesheet" crossorigin="" href="https://storage.unctad.org/2026-beyond_gdp/css/2026-beyond_gdp_ChartPair.min.css?v=13">
<link rel="stylesheet" crossorigin="" href="https://storage.unctad.org/2026-beyond_gdp/css/2026-beyond_gdp_ChartLegend.min.css?v=13">
<link rel="stylesheet" crossorigin="" href="https://storage.unctad.org/2026-beyond_gdp/css/2026-beyond_gdp_ChartCaption.min.css?v=13">
<link rel="stylesheet" crossorigin="" href="https://storage.unctad.org/2026-beyond_gdp/css/2026-beyond_gdp_d3Locale.min.css?v=13">
<link rel="stylesheet" crossorigin="" href="https://storage.unctad.org/2026-beyond_gdp/css/2026-beyond_gdp_LineChartMulti.min.css?v=13">
<div class="app-root-2026-beyond_gdp" id="app-root-2026-beyond_gdp-chart-health-fr">
  Loading...
</div>
<noscript>Your browser does not support Javascript!</noscript>
```

#### Sécurité

```html
<script type="module" crossorigin="" src="https://storage.unctad.org/2026-beyond_gdp/js/2026-beyond_gdp.chart-security-fr.min.js?v=13"></script>
<link rel="stylesheet" crossorigin="" href="https://storage.unctad.org/2026-beyond_gdp/css/2026-beyond_gdp_styles.min.css?v=13">
<link rel="stylesheet" crossorigin="" href="https://storage.unctad.org/2026-beyond_gdp/css/2026-beyond_gdp_ChartPair.min.css?v=13">
<link rel="stylesheet" crossorigin="" href="https://storage.unctad.org/2026-beyond_gdp/css/2026-beyond_gdp_ChartLegend.min.css?v=13">
<link rel="stylesheet" crossorigin="" href="https://storage.unctad.org/2026-beyond_gdp/css/2026-beyond_gdp_ChartCaption.min.css?v=13">
<link rel="stylesheet" crossorigin="" href="https://storage.unctad.org/2026-beyond_gdp/css/2026-beyond_gdp_d3Locale.min.css?v=13">
<link rel="stylesheet" crossorigin="" href="https://storage.unctad.org/2026-beyond_gdp/css/2026-beyond_gdp_LineChartMulti.min.css?v=13">
<div class="app-root-2026-beyond_gdp" id="app-root-2026-beyond_gdp-chart-security-fr">
  Loading...
</div>
<noscript>Your browser does not support Javascript!</noscript>
```

#### Cohésion sociale

```html
<script type="module" crossorigin="" src="https://storage.unctad.org/2026-beyond_gdp/js/2026-beyond_gdp.chart-trust-fr.min.js?v=13"></script>
<link rel="stylesheet" crossorigin="" href="https://storage.unctad.org/2026-beyond_gdp/css/2026-beyond_gdp_styles.min.css?v=13">
<link rel="stylesheet" crossorigin="" href="https://storage.unctad.org/2026-beyond_gdp/css/2026-beyond_gdp_ChartLegend.min.css?v=13">
<link rel="stylesheet" crossorigin="" href="https://storage.unctad.org/2026-beyond_gdp/css/2026-beyond_gdp_ChartPair.min.css?v=13">
<link rel="stylesheet" crossorigin="" href="https://storage.unctad.org/2026-beyond_gdp/css/2026-beyond_gdp_ChartCaption.min.css?v=13">
<link rel="stylesheet" crossorigin="" href="https://storage.unctad.org/2026-beyond_gdp/css/2026-beyond_gdp_ChartYTicks.min.css?v=13">
<link rel="stylesheet" crossorigin="" href="https://storage.unctad.org/2026-beyond_gdp/css/2026-beyond_gdp_GroupedBarChart.min.css?v=13">
<div class="app-root-2026-beyond_gdp" id="app-root-2026-beyond_gdp-chart-trust-fr">
  Loading...
</div>
<noscript>Your browser does not support Javascript!</noscript>
```

#### Satisfaction à l'égard des services publics

```html
<script type="module" crossorigin="" src="https://storage.unctad.org/2026-beyond_gdp/js/2026-beyond_gdp.chart-satisfaction-fr.min.js?v=13"></script>
<link rel="stylesheet" crossorigin="" href="https://storage.unctad.org/2026-beyond_gdp/css/2026-beyond_gdp_styles.min.css?v=13">
<link rel="stylesheet" crossorigin="" href="https://storage.unctad.org/2026-beyond_gdp/css/2026-beyond_gdp_DualBarRowsLoader.min.css?v=13">
<div class="app-root-2026-beyond_gdp" id="app-root-2026-beyond_gdp-chart-satisfaction-fr">
  Loading...
</div>
<noscript>Your browser does not support Javascript!</noscript>
```

#### Inégalités de richesse

```html
<script type="module" crossorigin="" src="https://storage.unctad.org/2026-beyond_gdp/js/2026-beyond_gdp.chart-wealth-inequality-fr.min.js?v=13"></script>
<link rel="stylesheet" crossorigin="" href="https://storage.unctad.org/2026-beyond_gdp/css/2026-beyond_gdp_styles.min.css?v=13">
<link rel="stylesheet" crossorigin="" href="https://storage.unctad.org/2026-beyond_gdp/css/2026-beyond_gdp_ChartPair.min.css?v=13">
<link rel="stylesheet" crossorigin="" href="https://storage.unctad.org/2026-beyond_gdp/css/2026-beyond_gdp_ChartLegend.min.css?v=13">
<link rel="stylesheet" crossorigin="" href="https://storage.unctad.org/2026-beyond_gdp/css/2026-beyond_gdp_ChartCaption.min.css?v=13">
<link rel="stylesheet" crossorigin="" href="https://storage.unctad.org/2026-beyond_gdp/css/2026-beyond_gdp_d3Locale.min.css?v=13">
<link rel="stylesheet" crossorigin="" href="https://storage.unctad.org/2026-beyond_gdp/css/2026-beyond_gdp_LineChartMulti.min.css?v=13">
<div class="app-root-2026-beyond_gdp" id="app-root-2026-beyond_gdp-chart-wealth-inequality-fr">
  Loading...
</div>
<noscript>Your browser does not support Javascript!</noscript>
```

#### Écart salarial

```html
<script type="module" crossorigin="" src="https://storage.unctad.org/2026-beyond_gdp/js/2026-beyond_gdp.chart-wage-gap-fr.min.js?v=13"></script>
<link rel="stylesheet" crossorigin="" href="https://storage.unctad.org/2026-beyond_gdp/css/2026-beyond_gdp_styles.min.css?v=13">
<link rel="stylesheet" crossorigin="" href="https://storage.unctad.org/2026-beyond_gdp/css/2026-beyond_gdp_ChartPair.min.css?v=13">
<link rel="stylesheet" crossorigin="" href="https://storage.unctad.org/2026-beyond_gdp/css/2026-beyond_gdp_ChartLegend.min.css?v=13">
<link rel="stylesheet" crossorigin="" href="https://storage.unctad.org/2026-beyond_gdp/css/2026-beyond_gdp_ChartCaption.min.css?v=13">
<link rel="stylesheet" crossorigin="" href="https://storage.unctad.org/2026-beyond_gdp/css/2026-beyond_gdp_ChartYTicks.min.css?v=13">
<link rel="stylesheet" crossorigin="" href="https://storage.unctad.org/2026-beyond_gdp/css/2026-beyond_gdp_BarPair.min.css?v=13">
<div class="app-root-2026-beyond_gdp" id="app-root-2026-beyond_gdp-chart-wage-gap-fr">
  Loading...
</div>
<noscript>Your browser does not support Javascript!</noscript>
```

#### Préjugés

```html
<script type="module" crossorigin="" src="https://storage.unctad.org/2026-beyond_gdp/js/2026-beyond_gdp.chart-prejudice-fr.min.js?v=13"></script>
<link rel="stylesheet" crossorigin="" href="https://storage.unctad.org/2026-beyond_gdp/css/2026-beyond_gdp_styles.min.css?v=13">
<link rel="stylesheet" crossorigin="" href="https://storage.unctad.org/2026-beyond_gdp/css/2026-beyond_gdp_ChartCaption.min.css?v=13">
<link rel="stylesheet" crossorigin="" href="https://storage.unctad.org/2026-beyond_gdp/css/2026-beyond_gdp_d3Locale.min.css?v=13">
<link rel="stylesheet" crossorigin="" href="https://storage.unctad.org/2026-beyond_gdp/css/2026-beyond_gdp_ScatterLog.min.css?v=13">
<div class="app-root-2026-beyond_gdp" id="app-root-2026-beyond_gdp-chart-prejudice-fr">
  Loading...
</div>
<noscript>Your browser does not support Javascript!</noscript>
```

#### Émissions

```html
<script type="module" crossorigin="" src="https://storage.unctad.org/2026-beyond_gdp/js/2026-beyond_gdp.chart-emissions-fr.min.js?v=13"></script>
<link rel="stylesheet" crossorigin="" href="https://storage.unctad.org/2026-beyond_gdp/css/2026-beyond_gdp_styles.min.css?v=13">
<link rel="stylesheet" crossorigin="" href="https://storage.unctad.org/2026-beyond_gdp/css/2026-beyond_gdp_ChartLegend.min.css?v=13">
<link rel="stylesheet" crossorigin="" href="https://storage.unctad.org/2026-beyond_gdp/css/2026-beyond_gdp_ChartPair.min.css?v=13">
<link rel="stylesheet" crossorigin="" href="https://storage.unctad.org/2026-beyond_gdp/css/2026-beyond_gdp_ChartCaption.min.css?v=13">
<link rel="stylesheet" crossorigin="" href="https://storage.unctad.org/2026-beyond_gdp/css/2026-beyond_gdp_d3Locale.min.css?v=13">
<link rel="stylesheet" crossorigin="" href="https://storage.unctad.org/2026-beyond_gdp/css/2026-beyond_gdp_LineChartMulti.min.css?v=13">
<div class="app-root-2026-beyond_gdp" id="app-root-2026-beyond_gdp-chart-emissions-fr">
  Loading...
</div>
<noscript>Your browser does not support Javascript!</noscript>
```

#### Lacunes de données

```html
<script type="module" crossorigin="" src="https://storage.unctad.org/2026-beyond_gdp/js/2026-beyond_gdp.chart-data-gaps-fr.min.js?v=13"></script>
<link rel="stylesheet" crossorigin="" href="https://storage.unctad.org/2026-beyond_gdp/css/2026-beyond_gdp_styles.min.css?v=13">
<link rel="stylesheet" crossorigin="" href="https://storage.unctad.org/2026-beyond_gdp/css/2026-beyond_gdp_ChartLegend.min.css?v=13">
<link rel="stylesheet" crossorigin="" href="https://storage.unctad.org/2026-beyond_gdp/css/2026-beyond_gdp_ChartCaption.min.css?v=13">
<link rel="stylesheet" crossorigin="" href="https://storage.unctad.org/2026-beyond_gdp/css/2026-beyond_gdp_ChartYTicks.min.css?v=13">
<link rel="stylesheet" crossorigin="" href="https://storage.unctad.org/2026-beyond_gdp/css/2026-beyond_gdp_GroupedBarChart.min.css?v=13">
<div class="app-root-2026-beyond_gdp" id="app-root-2026-beyond_gdp-chart-data-gaps-fr">
  Loading...
</div>
<noscript>Your browser does not support Javascript!</noscript>
```

### Embedding individual charts (Spanish)

#### Salud

```html
<script type="module" crossorigin="" src="https://storage.unctad.org/2026-beyond_gdp/js/2026-beyond_gdp.chart-health-es.min.js?v=13"></script>
<link rel="stylesheet" crossorigin="" href="https://storage.unctad.org/2026-beyond_gdp/css/2026-beyond_gdp_styles.min.css?v=13">
<link rel="stylesheet" crossorigin="" href="https://storage.unctad.org/2026-beyond_gdp/css/2026-beyond_gdp_ChartPair.min.css?v=13">
<link rel="stylesheet" crossorigin="" href="https://storage.unctad.org/2026-beyond_gdp/css/2026-beyond_gdp_ChartLegend.min.css?v=13">
<link rel="stylesheet" crossorigin="" href="https://storage.unctad.org/2026-beyond_gdp/css/2026-beyond_gdp_ChartCaption.min.css?v=13">
<link rel="stylesheet" crossorigin="" href="https://storage.unctad.org/2026-beyond_gdp/css/2026-beyond_gdp_d3Locale.min.css?v=13">
<link rel="stylesheet" crossorigin="" href="https://storage.unctad.org/2026-beyond_gdp/css/2026-beyond_gdp_LineChartMulti.min.css?v=13">
<div class="app-root-2026-beyond_gdp" id="app-root-2026-beyond_gdp-chart-health-es">
  Loading...
</div>
<noscript>Your browser does not support Javascript!</noscript>
```

#### Seguridad

```html
<script type="module" crossorigin="" src="https://storage.unctad.org/2026-beyond_gdp/js/2026-beyond_gdp.chart-security-es.min.js?v=13"></script>
<link rel="stylesheet" crossorigin="" href="https://storage.unctad.org/2026-beyond_gdp/css/2026-beyond_gdp_styles.min.css?v=13">
<link rel="stylesheet" crossorigin="" href="https://storage.unctad.org/2026-beyond_gdp/css/2026-beyond_gdp_ChartPair.min.css?v=13">
<link rel="stylesheet" crossorigin="" href="https://storage.unctad.org/2026-beyond_gdp/css/2026-beyond_gdp_ChartLegend.min.css?v=13">
<link rel="stylesheet" crossorigin="" href="https://storage.unctad.org/2026-beyond_gdp/css/2026-beyond_gdp_ChartCaption.min.css?v=13">
<link rel="stylesheet" crossorigin="" href="https://storage.unctad.org/2026-beyond_gdp/css/2026-beyond_gdp_d3Locale.min.css?v=13">
<link rel="stylesheet" crossorigin="" href="https://storage.unctad.org/2026-beyond_gdp/css/2026-beyond_gdp_LineChartMulti.min.css?v=13">
<div class="app-root-2026-beyond_gdp" id="app-root-2026-beyond_gdp-chart-security-es">
  Loading...
</div>
<noscript>Your browser does not support Javascript!</noscript>
```

#### Cohesión social

```html
<script type="module" crossorigin="" src="https://storage.unctad.org/2026-beyond_gdp/js/2026-beyond_gdp.chart-trust-es.min.js?v=13"></script>
<link rel="stylesheet" crossorigin="" href="https://storage.unctad.org/2026-beyond_gdp/css/2026-beyond_gdp_styles.min.css?v=13">
<link rel="stylesheet" crossorigin="" href="https://storage.unctad.org/2026-beyond_gdp/css/2026-beyond_gdp_ChartLegend.min.css?v=13">
<link rel="stylesheet" crossorigin="" href="https://storage.unctad.org/2026-beyond_gdp/css/2026-beyond_gdp_ChartPair.min.css?v=13">
<link rel="stylesheet" crossorigin="" href="https://storage.unctad.org/2026-beyond_gdp/css/2026-beyond_gdp_ChartCaption.min.css?v=13">
<link rel="stylesheet" crossorigin="" href="https://storage.unctad.org/2026-beyond_gdp/css/2026-beyond_gdp_ChartYTicks.min.css?v=13">
<link rel="stylesheet" crossorigin="" href="https://storage.unctad.org/2026-beyond_gdp/css/2026-beyond_gdp_GroupedBarChart.min.css?v=13">
<div class="app-root-2026-beyond_gdp" id="app-root-2026-beyond_gdp-chart-trust-es">
  Loading...
</div>
<noscript>Your browser does not support Javascript!</noscript>
```

#### Satisfacción con los servicios públicos

```html
<script type="module" crossorigin="" src="https://storage.unctad.org/2026-beyond_gdp/js/2026-beyond_gdp.chart-satisfaction-es.min.js?v=13"></script>
<link rel="stylesheet" crossorigin="" href="https://storage.unctad.org/2026-beyond_gdp/css/2026-beyond_gdp_styles.min.css?v=13">
<link rel="stylesheet" crossorigin="" href="https://storage.unctad.org/2026-beyond_gdp/css/2026-beyond_gdp_DualBarRowsLoader.min.css?v=13">
<div class="app-root-2026-beyond_gdp" id="app-root-2026-beyond_gdp-chart-satisfaction-es">
  Loading...
</div>
<noscript>Your browser does not support Javascript!</noscript>
```

#### Desigualdad de la riqueza

```html
<script type="module" crossorigin="" src="https://storage.unctad.org/2026-beyond_gdp/js/2026-beyond_gdp.chart-wealth-inequality-es.min.js?v=13"></script>
<link rel="stylesheet" crossorigin="" href="https://storage.unctad.org/2026-beyond_gdp/css/2026-beyond_gdp_styles.min.css?v=13">
<link rel="stylesheet" crossorigin="" href="https://storage.unctad.org/2026-beyond_gdp/css/2026-beyond_gdp_ChartPair.min.css?v=13">
<link rel="stylesheet" crossorigin="" href="https://storage.unctad.org/2026-beyond_gdp/css/2026-beyond_gdp_ChartLegend.min.css?v=13">
<link rel="stylesheet" crossorigin="" href="https://storage.unctad.org/2026-beyond_gdp/css/2026-beyond_gdp_ChartCaption.min.css?v=13">
<link rel="stylesheet" crossorigin="" href="https://storage.unctad.org/2026-beyond_gdp/css/2026-beyond_gdp_d3Locale.min.css?v=13">
<link rel="stylesheet" crossorigin="" href="https://storage.unctad.org/2026-beyond_gdp/css/2026-beyond_gdp_LineChartMulti.min.css?v=13">
<div class="app-root-2026-beyond_gdp" id="app-root-2026-beyond_gdp-chart-wealth-inequality-es">
  Loading...
</div>
<noscript>Your browser does not support Javascript!</noscript>
```

#### Brecha salarial

```html
<script type="module" crossorigin="" src="https://storage.unctad.org/2026-beyond_gdp/js/2026-beyond_gdp.chart-wage-gap-es.min.js?v=13"></script>
<link rel="stylesheet" crossorigin="" href="https://storage.unctad.org/2026-beyond_gdp/css/2026-beyond_gdp_styles.min.css?v=13">
<link rel="stylesheet" crossorigin="" href="https://storage.unctad.org/2026-beyond_gdp/css/2026-beyond_gdp_ChartPair.min.css?v=13">
<link rel="stylesheet" crossorigin="" href="https://storage.unctad.org/2026-beyond_gdp/css/2026-beyond_gdp_ChartLegend.min.css?v=13">
<link rel="stylesheet" crossorigin="" href="https://storage.unctad.org/2026-beyond_gdp/css/2026-beyond_gdp_ChartCaption.min.css?v=13">
<link rel="stylesheet" crossorigin="" href="https://storage.unctad.org/2026-beyond_gdp/css/2026-beyond_gdp_ChartYTicks.min.css?v=13">
<link rel="stylesheet" crossorigin="" href="https://storage.unctad.org/2026-beyond_gdp/css/2026-beyond_gdp_BarPair.min.css?v=13">
<div class="app-root-2026-beyond_gdp" id="app-root-2026-beyond_gdp-chart-wage-gap-es">
  Loading...
</div>
<noscript>Your browser does not support Javascript!</noscript>
```

#### Prejuicios

```html
<script type="module" crossorigin="" src="https://storage.unctad.org/2026-beyond_gdp/js/2026-beyond_gdp.chart-prejudice-es.min.js?v=13"></script>
<link rel="stylesheet" crossorigin="" href="https://storage.unctad.org/2026-beyond_gdp/css/2026-beyond_gdp_styles.min.css?v=13">
<link rel="stylesheet" crossorigin="" href="https://storage.unctad.org/2026-beyond_gdp/css/2026-beyond_gdp_ChartCaption.min.css?v=13">
<link rel="stylesheet" crossorigin="" href="https://storage.unctad.org/2026-beyond_gdp/css/2026-beyond_gdp_d3Locale.min.css?v=13">
<link rel="stylesheet" crossorigin="" href="https://storage.unctad.org/2026-beyond_gdp/css/2026-beyond_gdp_ScatterLog.min.css?v=13">
<div class="app-root-2026-beyond_gdp" id="app-root-2026-beyond_gdp-chart-prejudice-es">
  Loading...
</div>
<noscript>Your browser does not support Javascript!</noscript>
```

#### Emisiones

```html
<script type="module" crossorigin="" src="https://storage.unctad.org/2026-beyond_gdp/js/2026-beyond_gdp.chart-emissions-es.min.js?v=13"></script>
<link rel="stylesheet" crossorigin="" href="https://storage.unctad.org/2026-beyond_gdp/css/2026-beyond_gdp_styles.min.css?v=13">
<link rel="stylesheet" crossorigin="" href="https://storage.unctad.org/2026-beyond_gdp/css/2026-beyond_gdp_ChartLegend.min.css?v=13">
<link rel="stylesheet" crossorigin="" href="https://storage.unctad.org/2026-beyond_gdp/css/2026-beyond_gdp_ChartPair.min.css?v=13">
<link rel="stylesheet" crossorigin="" href="https://storage.unctad.org/2026-beyond_gdp/css/2026-beyond_gdp_ChartCaption.min.css?v=13">
<link rel="stylesheet" crossorigin="" href="https://storage.unctad.org/2026-beyond_gdp/css/2026-beyond_gdp_d3Locale.min.css?v=13">
<link rel="stylesheet" crossorigin="" href="https://storage.unctad.org/2026-beyond_gdp/css/2026-beyond_gdp_LineChartMulti.min.css?v=13">
<div class="app-root-2026-beyond_gdp" id="app-root-2026-beyond_gdp-chart-emissions-es">
  Loading...
</div>
<noscript>Your browser does not support Javascript!</noscript>
```

#### Lagunas de datos

```html
<script type="module" crossorigin="" src="https://storage.unctad.org/2026-beyond_gdp/js/2026-beyond_gdp.chart-data-gaps-es.min.js?v=13"></script>
<link rel="stylesheet" crossorigin="" href="https://storage.unctad.org/2026-beyond_gdp/css/2026-beyond_gdp_styles.min.css?v=13">
<link rel="stylesheet" crossorigin="" href="https://storage.unctad.org/2026-beyond_gdp/css/2026-beyond_gdp_ChartLegend.min.css?v=13">
<link rel="stylesheet" crossorigin="" href="https://storage.unctad.org/2026-beyond_gdp/css/2026-beyond_gdp_ChartCaption.min.css?v=13">
<link rel="stylesheet" crossorigin="" href="https://storage.unctad.org/2026-beyond_gdp/css/2026-beyond_gdp_ChartYTicks.min.css?v=13">
<link rel="stylesheet" crossorigin="" href="https://storage.unctad.org/2026-beyond_gdp/css/2026-beyond_gdp_GroupedBarChart.min.css?v=13">
<div class="app-root-2026-beyond_gdp" id="app-root-2026-beyond_gdp-chart-data-gaps-es">
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