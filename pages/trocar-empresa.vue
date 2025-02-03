<template>
    <div class="create-company">
      <h1>Trocar empresa</h1>
    </div>
  </template>
  
  <script>
  export default {
    layout: 'cleanPage',
    data() {
      return {
      }
    },
    mounted: function () {
      this.$myFunctions.checkIfUserIsAuthenticated(this);
    },
    methods: {
      
    }
  }
  </script>