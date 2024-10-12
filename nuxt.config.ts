// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: false },
  css: ['~/assets/css/main.css', '@fortawesome/fontawesome-svg-core/styles.css'],
  fontawesome: {
    icons: {
      solid: ['face-smile', 'child', 'archive', 'envelope', 'pen-clip', 'circle', 'comment', 'times', 'user-doctor', 'calendar-day', 'user-group', 'chart-simple', 'wallet'],
      regular: ['comment', 'face-smile'],
      brands: ['twitter'],
    },
  },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  modules: ['@vesp/nuxt-fontawesome'],
})