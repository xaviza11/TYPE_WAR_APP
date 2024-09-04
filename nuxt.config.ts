// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: [],
  runtimeConfig: {
    public: {
      apiUrl: 'http://localhost:4000',
    },
  },
  alias: {
    '@components': '~/indexers/components',
    '@store': '~/indexers/store',
    '@handlers': '~/indexers/handlers',
    '@utils': '~/indexers/utils',
    '@composables': '~/indexers/composables'
  },
})