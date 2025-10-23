import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import type { OutputChunk, OutputAsset } from 'rollup'

// small rollup plugin to prepend css import into generated bundles
function prependCssPlugin(cssPath = './ui-kit.css') {
  return {
    name: 'prepend-css',
    generateBundle(_options: any, bundle: Record<string, OutputChunk | OutputAsset>) {
      for (const [fileName, chunkOrAsset] of Object.entries(bundle)) {
        if (chunkOrAsset && 'type' in chunkOrAsset && chunkOrAsset.type === 'chunk') {
          const chunk = chunkOrAsset as OutputChunk;
          if (fileName.endsWith('.mjs') || fileName.endsWith('.cjs')) {
            const importLine = fileName.endsWith('.mjs') ? `import '${cssPath}';\n` : `require('${cssPath}');\n`;
            chunk.code = importLine + chunk.code;
          }
        }
      }
    },
  };
}

export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'UiKit',
      formats: ['es', 'cjs'],
      fileName: (format) => `index.${format === 'es' ? 'mjs' : 'cjs'}`,
    },
    sourcemap: true,
    rollupOptions: {
      external: ['react', 'react-dom', 'react/jsx-runtime', 'react/jsx-dev-runtime'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
      },
      plugins: [prependCssPlugin()],
    },
  },
  
})
