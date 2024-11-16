import { defineConfig } from 'wxt'
import UnoCSS from 'unocss/vite'
import { r } from './scripts/utils'

// See https://wxt.dev/api/config.html
export default defineConfig({
  srcDir: 'src',
  extensionApi: 'chrome',
  modules: ['@wxt-dev/module-vue'],
  manifest: {
    permissions: ['storage'],
  },
  imports: {
    eslintrc: {
      enabled: 9,
    },
  },
  vite: () => {
    return {
      root: r('src'),
      resolve: {
        alias: {
          '~/': `${r('src')}/`,
        },
      },
      plugins: [UnoCSS()]
    }
  },
})
