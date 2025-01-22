export default defineNuxtPlugin((nuxtApp) => {
    let contentObject = {
        id: 0
    }
  
    nuxtApp.provide('global', {
        contentObject
    });
  });
  