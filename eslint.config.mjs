// @ts-check
import { createConfigForNuxt } from '@nuxt/eslint-config/flat'

export default createConfigForNuxt({
  features: {
    tooling: true,
    stylistic: {
      commaDangle: 'never',
      braceStyle: '1tbs'
    }
  },
  dirs: {
    src: [
      './playground'
    ]
  }
},
{
  rules: {
    'vue/multi-word-component-names': 0
  },
  ignores: [
    'dist',
    'node_modules',
    '.output',
    '.nuxt'
  ]
})
