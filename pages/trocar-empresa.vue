<template>
    <div class="authentication-page-internal">
      <div class="authentication-header text-left">
        <h1 class="fontsize-xl-bold preto">Trocar de empresa</h1>
        <p class="fontsize-md cinza">Entre em outra empresa que você faz parte ou crie uma nova.</p>
        <div class="companies-list">
          <div class="company" v-for="(company, index) in companiesList" :key="index" v-on:click="goToCompany(company.id)">
            <p class="fontsize-md cinza">{{ company.name }}</p>
            <i class="fa-solid fa-angle-right"></i>
          </div>
        </div>
        <button type="button" class="btn btn-primary" v-on:click="createCompany()">Criar empresa</button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    layout: 'cleanPage',
    data() {
      return {
        companiesList: []
      }
    },
    mounted: function () {
      this.returnCompaniesList();
    },
    methods: {
      returnCompaniesList: function () {
        let self = this;
        
        this.$base.api.get("/users/return_companies", { headers: { Authorization: "Bearer " + localStorage.getItem("agendaspro_jwt") } })
        .then(function(response){            
          self.companiesList = response.data.returnObj;          
        })
      },
      goToCompany: function (company_id) {
        localStorage.setItem("selected_company", company_id);
        this.$router.push("/agenda");
      },
      createCompany: function () {
        this.$router.push("/criar-empresa");
      }
    }
  }
  </script>
<style scoped>
.companies-list {
  margin: var(--space-10) 0;
}

.company {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--space-4) 0;
  border-bottom: 1px solid var(--cinza-medio);
  cursor: pointer;

  & i {
    transition: transform 0.4s ease-in-out;
    transform: translateX(-7px);
  }

  &:hover {    
    & p {
      transition: color 0.4s ease-in-out;
      color: var(--black);
    }

    & i {
      transform: translateX(-3px);
    }
  }

  &:last-child {
    border-bottom: none;
  }
}
</style>