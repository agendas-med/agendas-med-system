import vue3GoogleLogin from 'vue3-google-login';

export default defineNuxtPlugin(nuxtApp => {
  nuxtApp.vueApp.use(vue3GoogleLogin, {
    clientId: "434780586987-g5nnt17nfg774gsamkg1bq3g1t977odc.apps.googleusercontent.com"
  });
});