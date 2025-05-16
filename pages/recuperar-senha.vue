<template>
    <div class="authentication-page-internal">
      <div class="authentication-header text-left">
        <h1 class="fontsize-xl-bold preto">Recuperar senha</h1>
        <p class="fontsize-md cinza">Um link de redefinição será enviado para o seu email.</p>
      </div>
      <form @submit.prevent="requestPasswordReset" id="login-form">
        <div class="grid grid-cols-1 gap-4">
          <div class="form-group">
            <label for="email">Email da sua conta</label>
            <input type="email" v-model="email" id="email" required>
          </div>
        </div>
        <UtilsLoadingResponse :msg="response" :type="responseType" :loading="loading" @eraseError="$myFunctions.resetResponse(this)" />
        <button type="submit" class="btn btn-primary">Enviar email de recuperação</button>
      </form>
    </div>
  </template>
  <script>
  export default {
    layout: 'entrar',
    data() {
      return {
        email: "",
        response: "",
        responseType: "",
        loading: false
      }
    },
    methods: {
      requestPasswordReset: function () {
        let self = this;

        self.loading = true;

        self.$base.api.post("/users/request-reset-password", { email: self.email })
        .then((response) => {            
          self.$myFunctions.setResponse(self, "Email de redefinição enviado com sucesso", "success");
        }).catch((error) => {
          self.$myFunctions.setResponse(self, "Ocorreu um erro ao enviar o email de redefinição", "error");
        }).then(() => {
          self.loading = false;
        })
      }
    }
  }
  </script>