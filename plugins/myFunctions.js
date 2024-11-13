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

  //Métodos de navegação
  const goToSubRoute = (instance, index, mainRoute, tabs = []) => {
    instance.$router.push("/" + mainRoute + "/" + tabs[index].route);
  }

  //Métodos de modal
  const openModal = (instance, title, saveButton, cancelButton, props = {}) => {
    instance.modalTitle = title;
    instance.modalSaveButton = saveButton;
    instance.modalCancelButton = cancelButton;

    for (const [key, value] of Object.entries(props)) {
      instance[key] = value;
    }
  }

  const closeModal = (instance, props = []) => {
    instance.modalTitle = "";
    instance.modalSaveButton = "";
    instance.modalCancelButton = "";

    for (let i = 0; i < props.length; i++) { 
      instance[props[i]] = "";
    }
  }

  nuxtApp.provide('myFunctions', {
      setResponse,
      resetResponse,
      goToSubRoute,
      openModal,
      closeModal
  });
});
