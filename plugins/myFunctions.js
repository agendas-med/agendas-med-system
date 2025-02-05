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

  const formatCurrency = (value) => {  
    if (isNaN(value)) return "Valor inválido";

    return value.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
    });
  }

  const returnFloatNumber = (string) => {
    let cleaned = string.toString().replace("R$ ", "").replace(",", '.');
    let formattedNumber = parseFloat(cleaned);

    return formattedNumber.toFixed(2);
  }

  const capitalize = (str) => {
    if (!str) return "";
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  }

  const formatMinutesToTime = (minutes) => {
      const duration = moment.duration(minutes, "minutes");
      
      // Calcula horas e minutos
      const hours = Math.floor(duration.asHours());
      const mins = duration.minutes();
      
      // Formata como HH:mm
      return `${String(hours).padStart(2, '0')}:${String(mins).padStart(2, '0')}h`;
  }

  //Métodos validação

  const isValidRoute = (path) => {
    let routes = [
        "/agenda",
        "/clientes",
        "/relatorios",
        "/agenda",
        "/financeiro",
        "/financeiro/pagamentos",
        "/financeiro/servicos",
        "/financeiro/metodos-pagamento",
        "/configuracoes",
        "/configuracoes/usuarios",
        "/configuracoes/preferencias",
        "/perfil"
    ]
    
    return routes.some(route => route == path);
  }

  //Metodos autenticação
  const setJwtInLocalStorage = (instance, token) => {
    localStorage.setItem("agendaspro_jwt", token);
  }

  const getJwtInLocalStorage = () => {
    return localStorage.getItem("agendaspro_jwt");
  }

  const removeJwtFromLocalStorage = () => {
    localStorage.removeItem("agendaspro_jwt");
  }

  const checkIfUserIsAuthenticated = (instance, first = false) => {
    return new Promise((resolve) => {
        let pathName = window.location.pathname;
        let jwt = "Bearer " + getJwtInLocalStorage();

        if (jwt == "Bearer null") {
          if (isValidRoute(pathName)) {
            window.location.href ="/entrar";
            return;
          }
        } else {
          let data = {
              token: jwt
          }

          instance.$base.api.post("/users/check_jwt", data) // Se ja estiver logado no sistema e acessar a página de login, é checkado a valia do token JWT e então redirecionado para a index.
          .then(function (res) { 
              setJwtInLocalStorage(instance, res.data.returnObj.newToken); // Setando o novo jwt que foi resetado
              if (pathName == "/entrar") { // Se o usuário estiver logado e entrar em login, o mesmo é logado novamente e direcionado para a index.
                
                let loginForm = $("#login-form");
                loginForm.find("input").attr("disabled", "disabled");
                loginForm.find("button").attr("disabled", "disabled").addClass("btn-loading");

                setTimeout(() => {
                  window.location.href ="/agenda";
                }, 1000);
              }
              resolve();
          })
          .catch(function () { // Caso contrário ele é deslogado e enviado para login.
            logoutUser();
            return;
          })
          .then(function () { // Chamada recursiva da função se o usuario estiver na home
              if (isValidRoute(pathName) && first) {
                setTimeout(() => {
                  checkIfUserIsAuthenticated(instance, first);
                }, 10 * 1000)
              }
          })
        }
    })
  }

  const logoutUser = () => {
    removeJwtFromLocalStorage();
    window.location.href ="/entrar";
  }

  //Métodos de retorno

  const getAddressData = (cep) => {
    return new Promise((resolve) => {
      if (!/^\d{5}-?\d{3}$/.test(cep)) {
        throw new Error('CEP inválido');
      }
  
      fetch(`https://viacep.com.br/ws/${cep}/json/`).then((response) => {
        if (!response.ok) {
          throw new Error('Falha ao consultar o ViaCEP');
        }
    
        response.json().then((results) => {
          if (results.erro) {
            throw new Error('CEP não encontrado');
          }
      
          resolve(results);
        })
      });
    })
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
      returnAge,
      formatCurrency,
      capitalize,
      formatMinutesToTime,
      returnFloatNumber,
      logoutUser,
      checkIfUserIsAuthenticated,
      removeJwtFromLocalStorage,
      getJwtInLocalStorage,
      setJwtInLocalStorage,
      isValidRoute,
      getAddressData
  });
});
