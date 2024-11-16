import { FlatCompat } from '@eslint/eslintrc'
import autoImports from './.wxt/eslint-auto-imports.mjs'

const compat = new FlatCompat()

export default [
  autoImports,
  // shadcn/ui
  ...compat.config({
    ignorePatterns: ['src/components/ui/*', 'src/lib/utils.ts'],
  })
]
