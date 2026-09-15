import { createRequire } from 'node:module';
import mdx from '@mdx-js/rollup';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

const require = createRequire(import.meta.url);
const { name } = require('./package.json');

export default defineConfig(({ command }) => ({
  build: {
    emptyOutDir: true,
    minify: 'terser',
    outDir: 'dist',
    rollupOptions: {
      input: {
        index: './index.html',
        'chart-health': './chart-health.html',
        'chart-security': './chart-security.html',
        'chart-trust': './chart-trust.html',
        'chart-satisfaction': './chart-satisfaction.html',
        'chart-wealth-inequality': './chart-wealth-inequality.html',
        'chart-wage-gap': './chart-wage-gap.html',
        'chart-prejudice': './chart-prejudice.html',
        'chart-emissions': './chart-emissions.html',
        'chart-data-gaps': './chart-data-gaps.html'
      },
      output: {
        // index's filename stays stable — already live in production and hardcoded into
        // unctad.org. Shared chunks (react/general-tools/ChartSection/ChartPair/D3 primitives,
        // deduplicated across all 10 entries) get a content hash instead: each entry's own
        // `import` for a shared chunk is a bare, query-string-less path, so a manual `?v=` bump
        // on the outer <script> tag can never bust a shared chunk's cache — this is the exact
        // incident already hit and documented in 2026-global_trade_update's README (bumping ?v=
        // on entry scripts didn't surface a fix that actually lived in the shared chunk; only a
        // genuinely new URL, via content hash, fixed it).
        entryFileNames: chunk => (chunk.name === 'index' ? `js/${name}.min.js` : `js/${name}.${chunk.name}.min.js`),
        chunkFileNames: `js/${name}.[name]-[hash].js`,
        assetFileNames: assetInfo => {
          if (assetInfo.name?.endsWith('.css')) {
            const base = assetInfo.name.replace('.css', '').replaceAll('-', '_');
            return base === 'index' ? `css/${name}.min.css` : `css/${name}_${base}.min.css`;
          }
          return `assets/[name][extname]`;
        }
      }
    },
    sourcemap: true,
    terserOptions: {
      compress: {
        drop_console: command === 'build'
      }
    }
  },
  define: {
    __PROJECT_NAME__: JSON.stringify(name)
  },
  plugins: [{ enforce: 'pre', ...mdx() }, react()],
  server: {
    hot: true,
    open: true,
    port: 8080,
    strictPort: false
  }
}));
