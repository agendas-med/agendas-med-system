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

  const goToSubRoute = (instance, index, mainRoute, subRoutes = []) => {
    instance.$router.push("/" + mainRoute + "/" + subRoutes[index]);
  }

  nuxtApp.provide('myFunctions', {
      setResponse,
      resetResponse,
      goToSubRoute
  });
});
