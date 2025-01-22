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
  const openModal = (instance, title, saveButton, cancelButton, props = {}, modalContentVariable = "", contentObject = null) => {
    instance.modalTitle = title;
    instance.modalSaveButton = saveButton;
    instance.modalCancelButton = cancelButton;

    if (contentObject) instance.$global.contentObject = JSON.parse(JSON.stringify(contentObject));

    for (const [key, value] of Object.entries(props)) {
      instance[key] = value;
    }

    if (modalContentVariable != "") {
      instance[modalContentVariable] = true;
    }
  }

  const closeModal = (instance, props = [], reload = false) => {
    instance.modalTitle = "";
    instance.modalSaveButton = "";
    instance.modalCancelButton = "";

    for (let i = 0; i < props.length; i++) { 
      instance[props[i]] = "";
    }

    instance.$global.contentObject = {id: 0};

    let targets = Object.keys(instance.$data).filter((key) => key.includes('modalContent'));

    for (let i = 0; i < targets.length; i++) {
      instance[targets[i]] = false;
    }

    if (reload) {
      instance.$router.go(0);
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

  const formatTelInput = (event, tel) => {
    let element = event.target;
    let cleaned = tel.replace(/\D/g, '');
    
    if (cleaned.length === 11) {
      cleaned = cleaned.replace(/^(\d{2})(\d{1})(\d{4})(\d{4})$/, '($1) $2 $3-$4');
    } else if (cleaned.length === 10) {
      cleaned = cleaned.replace(/^(\d{2})(\d{4})(\d{4})$/, '($1) $2-$3');
    }
    
    element.value = cleaned;
  }

  const formatDate = (date) => {
    return date.trim() != "" ? moment(date).format("DD/MM/YYYY") : "";
  }

  const returnAge = (birthday) => {  
    const dataNasc = moment(birthday, 'YYYY-MM-DD');
    const hoje = moment();

    // Calcula a diferença em anos
    const anos = hoje.diff(dataNasc, 'years');

    // Retorna a idade formatada
    return anos === 1 ? `${anos} Ano` : `${anos} Anos`;
  }

  nuxtApp.provide('myFunctions', {
      setResponse,
      resetResponse,
      goToSubRoute,
      openModal,
      closeModal,
      formatTel,
      formatTelInput,
      formatDate,
      returnAge
  });
});
