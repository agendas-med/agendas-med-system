<template>
    <div class="authentication-page-internal">
      <div class="authentication-header text-left">
        <h1 class="fontsize-xl-bold preto">Entrar</h1>
        <p class="fontsize-md cinza">Faça login na sua conta do AgendasPro para acompanhar seus agendamentos.</p>
      </div>
      <form @submit.prevent="login" id="login-form">
        <div class="grid grid-cols-1 gap-4">
          <div class="form-group">
            <label for="email">Seu email</label>
            <input type="email" v-model="email" id="email" required placeholder="usuario@dominio.com">
          </div>
          <div class="form-group">
            <label for="password">Sua senha</label>
            <input type="password" v-model="password" id="password" required>
            <div class="login-utils mt-3">
              <span>Ainda não tem uma conta? <a class="cursor-pointer underline" v-on:click="$router.push('/registro')">Registre-se</a></span>
              <router-link to="/recuperar-senha">Esqueci minha senha</router-link>
            </div>
            <UtilsSwitch v-if="showLembrar" label="Lembrar-me" @changedState="lembrar = $event" style="margin-top: var(--space-3);" />
          </div>
        </div>
        <UtilsLoadingResponse :msg="response" :type="responseType" :loading="loading" @eraseError="$myFunctions.resetResponse(this)" />
        <button type="submit" class="btn btn-primary">Entrar</button>
      </form>
      <div class="or-separator">
        <span class="fontsize-sm preto">ou</span>
      </div>
      <GoogleAuth></GoogleAuth>
    </div>
  </template>
  
  <script>

  export default {
    layout: 'entrar',
    data() {
      return {
        email: "",
        password: "",
        response: "",
        responseType: "",
        loading: false,
        lembrar: false,
        showLembrar: true
      }
    },
    watch: {
      email: function () {
        if (this.email == localStorage.getItem("email")) {
          this.showLembrar = false;
        } else {
          this.showLembrar = true;
        }
      }
    },
    mounted: function () {
      let localStorageEmail = localStorage.getItem("email");

      if (localStorageEmail) this.email = localStorageEmail;
      
      this.$myFunctions.checkIfUserIsAuthenticated(this);
    },
    methods: {
      login: function () {
        let self = this;
        let data = {
          email: this.email,
          password: this.password
        }

        this.loading = true;

        this.$base.api.post("/users/login", data)
        .then(function(response2){            
          self.$myFunctions.setJwtInLocalStorage(self, response2.data.returnObj.jwtToken);
          self.$myFunctions.setResponse(self, response2.data.message, "success");

          if (self.lembrar) {
            localStorage.setItem("email", self.email);
          }

          window.location.href = "/agenda";
        }).catch(() => {
          self.$myFunctions.setResponse(self, "Falha na autenticação", "error");
        }).then(() => {
          self.loading = false;
        })
      }
    }
  }
  </script>
  <style scoped>
  .login-utils {
    display: flex;
    justify-content: space-between;
    align-items: center;

    & a {
      text-decoration: underline;
    }
  }
</style>