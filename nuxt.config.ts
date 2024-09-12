export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  plugins: [{ src: '~/plugins/guestToken', mode: 'client'},
    { src: '~/plugins/sessionToken', mode: 'client'},
    {src: '~/plugins/cookieConsent', mode: 'client' }
  ],
  runtimeConfig: {
    public: {
      apiUrl: 'http://localhost:4000',
    },
  },
  alias: {
    '@components': '~/components',
  },
  css: [
    '~/normalize.css'
  ]
})