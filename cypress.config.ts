import { defineConfig } from 'cypress'

export default defineConfig({
  viewportWidth: 1000,
  viewportHeight: 1000,
  component: {
    devServer: {
      framework: 'vue',
      bundler: 'vite',
    },
  },
})
