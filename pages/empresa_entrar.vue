<template>
    <div class="authentication-page-internal">
      <div class="authentication-header text-left">
        <h1 class="fontsize-xl-bold preto">Convite recebido!</h1>
        <p class="fontsize-md cinza">Você foi convidado para entrar em uma empresa</p>
      </div>
      <UtilsLoadingResponse :msg="response" :type="responseType" :loading="loading" />
      <button class="btn btn-primary" v-if="!loading && !invalid" v-on:click="goToAuth()">Aceitar convite</button>
    </div>  
  </template>
  
  <script>
  export default {
    layout: 'empresa_entrar',
    data() {
      return {
        companyName: "",
        haveAccount: false,
        token: "",
        response: "",
        responseType: "",
        loading: true,
        invalid: false
      }
    },
    methods: {
      goToAuth: function () {
        let self = this;

        if (this.haveAccount) {
          this.loading = true;

          if (this.token != null) {
            this.$myFunctions.enterCompanyWithToken(this, this.token).then(() => {
              self.loading = false;
              this.$myFunctions.logoutUser();
            });
          }
        } else {
          window.location.href = "/registro?token=" + this.token;
        }
      },
      checkIfUserHaveAccount: function () {
        let self = this;

        self.$base.api.post("/companies/find_user_by_token", { token: this.token }).then((response) => {
          self.haveAccount = response.data.returnObj;
        }).catch((error) => {
          self.invalid = true;
          self.$myFunctions.setResponse(self, error.response.data, "error");
        }).then(() => {
          self.loading = false;
        })
      }
    },
    mounted: function () {
      let url = new URLSearchParams(window.location.search);

      this.companyName = decodeURIComponent(url.get("empresa"));
      this.haveAccount = url.get("account") == 1 ? true : false;
      this.token = url.get("token");

      this.checkIfUserHaveAccount();
    }
  }
  </script>