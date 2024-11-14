import { defineConfig } from 'wxt'
import UnoCSS from 'unocss/vite'

// See https://wxt.dev/api/config.html
export default defineConfig({
  srcDir: 'src',
  extensionApi: 'chrome',
  modules: ['@wxt-dev/module-vue'],
  manifest: {
    permissions: ['storage'],
  },
  vite: () => {
    return {
      plugins: [UnoCSS()]
    }
  },
})
