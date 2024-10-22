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

  const goToSubRoute = (instance, index, mainRoute, tabs = []) => {
    instance.$router.push("/" + mainRoute + "/" + tabs[index].route);
  }

  nuxtApp.provide('myFunctions', {
      setResponse,
      resetResponse,
      goToSubRoute
  });
});
