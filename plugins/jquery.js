import jQuery from 'jquery';

export default defineNuxtPlugin((nuxtApp) => {
  globalThis.$ = globalThis.jQuery = jQuery;
});
