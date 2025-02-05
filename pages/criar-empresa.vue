<template>
    <div class="create-company">
      <div class="text-left">
        <h1 class="fontsize-xl-bold preto">Criar empresa</h1>
        <p class="fontsize-md cinza">Crie sua empresa no AgendasPro e gerencie usuários, agendamentos e configurações de forma prática e centralizada.</p>
      </div>
      <form @submit.prevent="createCompany">
        <div class="grid grid-cols-1 gap-4">
          <div class="form-group">
            <label for="name">Nome</label>
            <input type="text" v-model="name" id="name" required placeholder="Ex. Cognito.inc">
          </div>
          <div class="form-group">
            <label for="role">Tipo de negócio</label>
            <select id="role" v-model="business_type" required>
              <option value="">* Selecione *</option>
              <option :value="type.id" v-for="(type, index) in $global.business_types.types" :key="index">{{ type.name }}</option>
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
        </div>
        <UtilsLoadingResponse :msg="response" :type="responseType" :loading="loading" @eraseError="$myFunctions.resetResponse(this)" />
        <button type="submit" class="btn btn-primary">Criar</button>
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
        business_type: ""
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
        let self = this;
        let data = {
          name: this.name,
          address: this.address,
          zip_code: this.cep,
          city: this.city,
          state: this.state,
          business_type: this.business_type
        }

        this.loading = true;

        this.$base.api.post("/companies/create_company", data) 
        .then(function (response) { 
          self.$myFunctions.setResponse(self, response.data.message, "success");
          window.location.href = "/configuracoes";
        }).catch((error) => {
          error = error.response.data.errors[0].message + " Campo: " + error.response.data.errors[0].field;
          self.$myFunctions.setResponse(self, error, "error");
        }).then(() => {
          self.loading = false;
        })
      }
    },
    mounted: function () {
      console.log(this.$global.user)
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