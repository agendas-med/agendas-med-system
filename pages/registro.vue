<template>
    <div class="authentication-page-internal">
      <div class="authentication-header text-left">
        <h1 class="fontsize-xl-bold preto">Cadastre-se</h1>
        <p class="fontsize-md cinza">Cadastre-se no AgendasPro para começar a gerenciar o seu negócio.</p>
      </div>
      <form @submit.prevent="register">
        <div class="grid grid-cols-1 gap-4">
          <div class="form-group">
            <label for="name">Seu nome</label>
            <input type="text" v-model="name" id="name" required>
          </div>
          <div class="form-group">
            <label for="email">Seu email</label>
            <input type="email" v-model="email" id="email" required placeholder="usuario@dominio.com">
          </div>
          <div class="form-group">
            <label for="password">Sua senha</label>
            <input type="password" v-model="password" id="password" required>
          </div>
          <div class="form-group">
            <label for="repeat-password">Repita a senha</label>
            <input type="password" v-model="repeat_password" id="repeat-password" required>
          </div>
          <span class="mt-3">Já tem conta? <a class="cursor-pointer underline" v-on:click="$router.push('/entrar')">Entrar</a></span>
        </div>
        <UtilsLoadingResponse :msg="response" :type="responseType" :loading="loading" @eraseError="$myFunctions.resetResponse(this)" />
        <button type="submit" class="btn btn-primary">Registrar</button>
      </form>
      <div class="or-separator">
        <span class="fontsize-sm preto">ou</span>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    layout: 'login',
    data() {
      return {
        name: "",
        email: "",
        password: "",
        repeat_password: "",
        response: "",
        responseType: "",
        loading: false
      }
    },
    methods: {
      setTemporaryEmail: function (email) {
        sessionStorage.setItem("temporary_email", email);
      },
      register: function () {
        let self = this;
        let data = {
          name: this.name,
          email: this.email,
          password: this.password
        }

        if (this.password != this.repeat_password) {
            this.$myFunctions.setResponse(this, "As senhas não coincidem", "error");
            return;
        }

        this.$myFunctions.resetResponse(this);
        this.loading = true;

        this.$base.api.post("/users/register", data)
        .then(function(response2){            
          if (self.token != null) {
            self.$myFunctions.enterCompanyWithToken(self, self.token, data.email);
          }

          self.$myFunctions.setResponse(self, response2.data.message, "success");
          self.setTemporaryEmail(response2.data.returnObj.email);
          self.$myFunctions.logoutUser();            
        }).catch(() => {
            self.$myFunctions.setResponse(self, "Ocorreu um erro ao registrar", "error");
        }).then(() => {
          self.loading = false;
        })
      }
    },
    mounted: function () {
      let url = new URLSearchParams(window.location.search);

      this.token = url.get("token");
      this.email = url.get("email");

      if (this.token && this.email) {
        $("#email").attr("disabled", "disabled");
      }
    }
  }
  </script>
  