<template>
    <div class="authentication-page-internal">
      <div class="authentication-header text-left">
        <h1 class="fontsize-xl-bold preto">Entrar</h1>
        <p class="fontsize-md cinza">Faça login na sua conta do AgendasPro para acompanhar seus agendamentos.</p>
      </div>
      <form @submit.prevent="login">
        <div class="form-group">
          <label for="email">Seu email</label>
          <input type="email" v-model="email" id="email" required placeholder="usuario@dominio.com">
        </div>
        <div class="form-group">
          <label for="password">Sua senha</label>
          <input type="password" v-model="password" id="password" required>
          <UtilsSwitch label="Lembrar-me" @changedState="lembrar" style="margin-top: var(--space-3);" />
        </div>
        <UtilsLoadingResponse :msg="response" :type="responseType" :loading="loading" @eraseError="$myFunctions.resetResponse(this)" />
        <button type="submit" class="btn btn-primary">Entrar</button>
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

        this.loading = true;
        this.$myFunctions.setResponse(this, "Falha na autenticação", "error");

        setTimeout(() => {
          this.loading = false;
        }, 5000)

        console.log(data);
      },
      lembrar: function (active) {
        console.log("lembrar email? " + active)
      }
    }
  }
  </script>