// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: false },
  css: ['~/assets/css/main.css', '@fortawesome/fontawesome-svg-core/styles.css'],
  fontawesome: {
    icons: {
      solid: ['face-smile', 'child', 'archive', 'envelope', 'pen-clip', 'circle', 'comment', 'times', 'user-doctor', 'calendar-day', 'user-group', 'chart-simple', 'wallet', 'bars', 'angle-down','search', 'filter', 'arrow-down-wide-short'],
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
  ssr: false,
  modules: ['@vesp/nuxt-fontawesome']
})