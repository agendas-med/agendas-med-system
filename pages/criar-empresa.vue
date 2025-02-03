<template>
    <div class="create-company">
      <div class="text-left">
        <h1 class="fontsize-xl-bold preto">Criar empresa</h1>
        <p class="fontsize-md cinza">Crie sua empresa no AgendasPro e gerencie usuários, agendamentos e configurações de forma prática e centralizada.</p>
      </div>
      <form @submit.prevent="createCompany">
        <div class="form-group">
          <label for="name">Nome</label>
          <input type="text" v-model="name" id="name" required placeholder="Ex. Cognito.inc">
        </div>
        <div class="form-group">
          <label for="role">Tipo de negócio</label>
          <select id="role" v-model="business_type" required>
            <option value="">* Selecione *</option>
            <option :value="type.id" v-for="(type, index) in business_types" :key="index">{{ type.name }}</option>
          </select>
        </div>
        <div class="form-group"> 
            <label for="cep">CEP</label>
            <input type="text" id="cep" v-model="cep" required>
        </div>
        <div class="form-group"> 
            <label for="adress">Endereço</label>
            <input type="text" id="adress" v-model="address" required>
        </div>
        <div class="form-group"> 
            <label for="city">Cidade</label>
            <input type="text" id="city" v-model="city" required>
        </div>
        <div class="form-group"> 
            <label for="state">Estado</label>
            <select id="state" v-model="state" required>
                <option value="">* Selecione *</option>
                <option :value="state.sigla" v-for="(state, index) in $global.estados" :key="index">{{ state.nome }}</option>
            </select>
        </div>
        <UtilsLoadingResponse :msg="response" :type="responseType" :loading="loading" @eraseError="$myFunctions.resetResponse(this)" />
        <button type="submit" class="btn btn-primary">Entrar</button>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    layout: 'cleanPage',
    data() {
      return {
        cep: "",
        name: "",
        address: "",
        city: "",
        state: "",
        response: "",
        responseType: "",
        loading: false,
        business_type: "",
        business_types: []
      }
    },
    watch: {
        cep: function () {
            this.cep = this.cep.replace(/\D/g, '');

            if (this.cep.length == 8) {
                this.cep = this.cep.replace(/(\d{5})(\d{3})/, '$1-$2');

                //Executa busca automatica do cep
                this.$myFunctions.getAddressData(this.cep).then((results) => {
                  this.address = results.logradouro;
                  this.city = results.localidade;
                  this.state = results.uf;
                })
            }
        }
    },
    methods: {
      createCompany: function () {
        let data = {
          name: this.name,
          address: this.address,
          city: this.city,
          state: this.state,
          business_type: this.business_type
        }

        console.log(data)
      },
      returnBusinessTypes: function () {
        let self = this;

        this.$base.api.get("/companies/business_types") 
        .then(function (response) { 
            self.business_types = response.data.returnObj;
        })
      }
    },
    mounted: function () {
      console.log(this.$global.user)
      this.returnBusinessTypes();
    }
  }
  </script>
 <style scoped>
 form {
  max-height: 55vh;
  padding: 0 var(--space-1);
  overflow-y: auto;
  margin-top: var(--space-6);
 }
</style>