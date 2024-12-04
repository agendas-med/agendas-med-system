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

  //Métodos de manipulação de valores
  const formatTel = (tel) => {
    const cleaned = tel.replace(/\D/g, '');
    
    if (cleaned.length === 11) {
        return cleaned.replace(/^(\d{2})(\d{1})(\d{4})(\d{4})$/, '($1) $2 $3-$4');
    } else if (cleaned.length === 10) {
        return cleaned.replace(/^(\d{2})(\d{4})(\d{4})$/, '($1) $2-$3');
    }
    
    return tel;
  }

  const formatDate = (date) => {
    return date.trim() != "" ? moment(date).format("DD/MM/YYYY") : "";
  }

  nuxtApp.provide('myFunctions', {
      setResponse,
      resetResponse,
      goToSubRoute,
      openModal,
      closeModal,
      formatTel,
      formatDate
  });
});
