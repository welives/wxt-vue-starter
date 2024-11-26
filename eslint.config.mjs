import antfu from '@antfu/eslint-config'
import { FlatCompat } from '@eslint/eslintrc'
import autoImports from './.wxt/eslint-auto-imports.mjs'

const compat = new FlatCompat()

export default antfu(
  {
    unocss: true,
    vue: true,
  },
  ...compat.config(autoImports),
  // shadcn, unocss, scripts
  ...compat.config({
    ignorePatterns: ['src/components/ui/*', 'src/lib/utils.ts', 'scripts/*', 'postcss.config.mjs', 'uno.config.ts'],
  })
)
