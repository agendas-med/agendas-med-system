// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  app: {
    head: {
      htmlAttrs: {
        lang: 'pt-BR',
      },
      link: [
        { rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css' }
      ]
    },
  },
  devtools: { enabled: false },
  css: ['~/assets/css/main.css', '@fortawesome/fontawesome-svg-core/styles.css'],
  fontawesome: {
    icons: {
      solid: ['face-smile', 'child', 'archive', 'envelope', 'pen-clip', 'circle', 'comment', 'times', 'store', 'calendar-day', 'user-group', 
        'chart-simple', 'wallet', 'bars', 'angle-down','search', 'filter', 'arrow-down-wide-short', 'trash', 'circle-plus', 'user-lock', 'angle-left', 'angle-right',
        'backward-step', 'forward-step', 'plus', 'user-pen', 'gear', 'pen'],
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
  plugins: [
    '~/plugins/myFunctions.js',
    '~/plugins/global.js',
    { src: '~/plugins/fullcalendar.js', mode: 'client' },
    { src: '~/plugins/jquery.js', mode: 'client' },
    { src: '~/plugins/moment.js', mode: 'client' }
  ],
  modules: ['@vesp/nuxt-fontawesome']
})