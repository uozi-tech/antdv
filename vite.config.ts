import { defineConfig } from 'vite'
import { resolve } from 'path'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import dts from 'vite-plugin-dts'
// import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'core/index.ts'),
      name: 'Bundle',
      fileName: 'index',
    },
    rollupOptions: {
      external: ['vue', 'element-plus'],
    },
  },
  server: {
    proxy: {
      '/api': {
        target: 'https://mock.apifox.com/m2/3871056-3505026-default/171999476',
        changeOrigin: true,
        secure: false,
        ws: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
  plugins: [
    vue({
      script: {
        defineModel: true,
      },
    }),
    vueJsx(),
    dts({
      exclude: ['example', 'vite.config.ts', 'commitlint.config.ts', '**/__tests__/**'],
    }),
    Components({
      resolvers: [AntDesignVueResolver({ importStyle: false })],
      directoryAsNamespace: true,
    }),
  ],
  test: {
    clearMocks: true,
    environment: 'happy-dom',
    setupFiles: [resolve(__dirname, 'core/__tests__/setup.ts')],
    reporters: ['default'],
    coverage: {
      include: ['core'],
      exclude: ['core/**.cy.ts'],
      reporter: ['text', 'json-summary', 'json'],
    },
  },
})
