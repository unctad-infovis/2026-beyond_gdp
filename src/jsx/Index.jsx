import UNCTADSiteHeader from '@unctad-infovis/general-tools/components/UNCTADSiteHeader.jsx';
import { createRoot } from 'react-dom/client';

import ArticleEn from './../Article.mdx';
import ArticleEs from './../Article.es.mdx';
import ArticleFr from './../Article.fr.mdx';
import metaEn from './../meta.json';
import metaEs from './../meta.es.json';
import metaFr from './../meta.fr.json';
import App from './App.jsx';
import { resolveLanguage } from './i18n.js';

const ARTICLES = { en: ArticleEn, es: ArticleEs, fr: ArticleFr };
const METAS = { en: metaEn, es: metaEs, fr: metaFr };

const container = document.getElementById(`app-root-${__PROJECT_NAME__}`);
const lang = resolveLanguage(container);
const Article = ARTICLES[lang];
const meta = METAS[lang];

document.documentElement.lang = lang;
document.title = meta.hero.title;

const showSiteHeader = meta.show_site_header && !window.location.hostname.includes('unctad.org');

const root = createRoot(container);
root.render(
  showSiteHeader ? (
    <UNCTADSiteHeader>
      <App Article={Article} meta={meta} />
    </UNCTADSiteHeader>
  ) : (
    <App Article={Article} meta={meta} />
  )
);
