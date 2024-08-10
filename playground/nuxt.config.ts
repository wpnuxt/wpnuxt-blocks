export default defineNuxtConfig({
  modules: [
    '../src/module',
    '@wpnuxt/core'
  ],
  wpNuxt: {
    wordpressUrl: 'https://wordpress.wpnuxt.com',
    frontendUrl: 'https://demo.wpnuxt.com',
    logLevel: 4
  },
  future: {
    compatibilityVersion: 4
  },
  devtools: { enabled: true },
  compatibilityDate: '2024-08-08'
})
