<template>
    <div class="authentication-page-internal">
      <div class="authentication-header text-left">
        <h1 class="fontsize-xl-bold preto">Cadastre-se</h1>
        <p class="fontsize-md cinza">Cadastre-se no AgendasMed para começar a gerenciar o seu consultório.</p>
      </div>
      <form @submit.prevent="login">
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
        email: "",
        password: "",
        repeat_password: "",
        response: "",
        responseType: "",
        loading: false
      }
    },
    methods: {
      login: function () {
        let data = {
          email: this.email,
          password: this.password
        }

        if (this.password != this.repeat_password) {
            this.$myFunctions.setResponse(this, "As senhas não coincidem", "error");
            return;
        }

        this.loading = true;
        this.$myFunctions.setResponse(this, "Erro ao cadastrar", "error")

        setTimeout(() => {
          this.loading = false;
        }, 5000)

        console.log(data);
      }
    }
  }
  </script>
  