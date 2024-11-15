import {
  defineConfig,
  presetUno,
  presetAttributify,
  presetIcons,
  transformerDirectives,
  toEscapedSelector
} from 'unocss'
import presetAnimations from 'unocss-preset-animations'
import { builtinColors, presetShadcn } from 'unocss-preset-shadcn'

export default defineConfig({
  content: {
    filesystem: ['**/*.{html,js,ts,jsx,tsx,vue,svelte,astro}'],
    pipeline: {
      include: [
        // the default
        /\.(vue|svelte|[jt]sx|mdx?|astro|elm|php|phtml|html)($|\?)/,
        // include js/ts files
        '(components|src)/**/*.{js,ts}',
      ],
    },
  },
  presets: [
    presetUno({
      dark: 'media',
    }),
    presetAttributify(),
    presetIcons({
      extraProperties: {
        display: 'inline-block',
        'vertical-align': 'middle',
      },
    }),
    presetAnimations(),
    presetShadcn(builtinColors.map((c) => ({ color: c ?? 'zinc' })))
  ],
  transformers: [
    transformerDirectives(),
  ],
  shortcuts: [
    {
      'absolute-center': 'absolute top-1/2 left-1/2 -translate-1/2',
      'flex-center': 'flex justify-center items-center',
      'flex-col-center': 'flex flex-col justify-center items-center',
      'no-bar-container': 'scrollbar-hide overflow-x-hidden overflow-y-auto w-full h-full'
    }
  ],
  rules: [
    [
      /^scrollbar-hide$/,
      ([_], { rawSelector }) => {
        const selector = toEscapedSelector(rawSelector)
        return `${selector}::-webkit-scrollbar{display:none}`
      },
    ],
  ],
})
