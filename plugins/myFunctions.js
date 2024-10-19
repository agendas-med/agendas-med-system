export default defineNuxtPlugin((nuxtApp) => {
  // Métodos de resposta
  const setResponse = (instance, msg, type) => {
      instance.response = msg;
      instance.responseType = type;
  };

  const resetResponse = (instance) => {
      instance.response = "";
      instance.responseType = "";
  };

  nuxtApp.provide('myFunctions', {
      setResponse,
      resetResponse
  });
});
