<template>
    <div class="authentication-page-internal">
      <div class="authentication-header text-left">
        <h1 class="fontsize-xl-bold preto">Convite recebido!</h1>
        <p class="fontsize-md cinza">Você foi convidado para entrar na empresa {{ companyName }}</p>
      </div>
      <button class="btn btn-primary" v-on:click="goToAuth()">Aceitar convite</button>
    </div>  
  </template>
  
  <script>
  export default {
    layout: 'empresa_entrar',
    data() {
      return {
        companyName: "",
        haveAccount: false,
        token: ""
      }
    },
    methods: {
      goToAuth: function () {
        this.$myFunctions.logoutUser();

        if (this.haveAccount) {
          window.location.href = "/entrar?enter_token=" + this.token;
        } else {
          window.location.href = "/registro?enter_token=" + this.token;
        }
      }
    },
    mounted: function () {
      let url = new URLSearchParams(window.location.search);
      this.companyName = decodeUriComponent(url.get("empresa"));
      this.haveAccount = url.get("account") == 1 ? true : false;
      this.token = url.get("token");
    }
  }
  </script>