<template>
  <div class="create-company">
    <div class="text-left">
      <h1 class="fontsize-xl-bold preto">Criar empresa</h1>
      <p class="fontsize-md cinza">Crie sua empresa no AgendasPro e ative automaticamente sua conta de recebimentos
        Asaas.</p>
    </div>
    <form @submit.prevent="createCompany">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div class="form-group">
          <label for="name">Nome da Empresa / Titular</label>
          <input type="text" v-model="name" id="name" required placeholder="Ex. Barbearia do João">
        </div>
        <div class="form-group">
          <label for="role">Tipo de negócio</label>
          <select id="role" v-model="business_type" required>
            <option value="">* Selecione *</option>
            <option :value="type.id" v-for="(type, index) in $global.business_types.types" :key="index">{{ type.name }}
            </option>
          </select>
        </div>

        <div class="form-group">
          <label for="email">E-mail Comercial (Login Asaas)</label>
          <input type="email" id="email" v-model="email" required placeholder="contato@empresa.com">
        </div>
        <div class="form-group">
          <label for="phone">Celular (com DDD)</label>
          <input type="text" id="phone" v-model="phone" required placeholder="(00) 00000-0000" @input="formatPhone">
        </div>

        <div class="form-group">
          <label for="document">CPF ou CNPJ</label>
          <input type="text" id="document" v-model="document" required placeholder="000.000.000-00"
            @input="formatDocument">
        </div>

        <div class="form-group">
          <label for="incomeValue">Faturamento Mensal Aproximado (R$)</label>
          <input type="number" id="incomeValue" v-model="incomeValue" required placeholder="Ex: 5000" min="0"
            step="0.01">
        </div>

        <div class="form-group" v-if="documentLength === 11">
          <label for="birthDate">Data de Nascimento do Titular</label>
          <input type="date" id="birthDate" v-model="birthDate" required>
        </div>
        <div class="form-group" v-if="documentLength === 14">
          <label for="companyType">Tipo Jurídico</label>
          <select id="companyType" v-model="companyType" required>
            <option value="">* Selecione *</option>
            <option value="MEI">MEI</option>
            <option value="LIMITED">Limitada (LTDA)</option>
            <option value="INDIVIDUAL">Empresário Individual</option>
            <option value="ASSOCIATION">Associação</option>
          </select>
        </div>
      </div>

      <h3 class="fontsize-lg-bold preto mt-6 mb-2">Endereço</h3>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div class="form-group">
          <label for="cep">CEP</label>
          <input type="text" id="cep" v-model="cep" required>
        </div>
        <div class="form-group">
          <label for="adress">Endereço (Rua/Avenida)</label>
          <input type="text" id="adress" v-model="address" required>
        </div>
        <div class="form-group">
          <label for="address_number">Número</label>
          <input type="text" id="address_number" v-model="address_number" required>
        </div>
        <div class="form-group">
          <label for="complement">Complemento</label>
          <input type="text" id="complement" v-model="complement" placeholder="Sala, Apto, etc">
        </div>
        <div class="form-group">
          <label for="city">Cidade</label>
          <input type="text" id="city" v-model="city" required>
        </div>
        <div class="form-group">
          <label for="state">Estado</label>
          <select id="state" v-model="state" required>
            <option value="">* Selecione *</option>
            <option :value="state.sigla" v-for="(state, index) in $global.estados" :key="index">{{ state.nome }}
            </option>
          </select>
        </div>
      </div>

      <button type="submit" class="btn btn-primary mt-4 w-full" :disabled="loading"
        :class="{ 'btn-loading': loading }">Criar Empresa e Conta Asaas</button>
    </form>
  </div>
</template>

<script>
export default {
  layout: 'cleanPage',
  data() {
    return {
      name: "", business_type: "", email: "", phone: "", document: "",
      birthDate: "", companyType: "", cep: "", address: "",
      address_number: "", complement: "", city: "", state: "",
      loading: false, incomeValue: ""
    }
  },
  computed: {
    documentLength() {
      return this.document.replace(/\D/g, '').length;
    }
  },
  watch: {
    cep: function () {
      this.cep = this.cep.replace(/\D/g, '');
      if (this.cep.length == 8) {
        this.cep = this.cep.replace(/(\d{5})(\d{3})/, '$1-$2');
        this.$myFunctions.getAddressData(this.cep).then((results) => {
          this.address = results.logradouro;
          this.city = results.localidade;
          this.state = results.uf;
        })
      }
    }
  },
  methods: {
    formatDocument() {
      let v = this.document.replace(/\D/g, '');
      if (v.length <= 11) {
        v = v.replace(/(\d{3})(\d)/, '$1.$2');
        v = v.replace(/(\d{3})(\d)/, '$1.$2');
        v = v.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
      } else {
        v = v.replace(/^(\d{2})(\d)/, '$1.$2');
        v = v.replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3');
        v = v.replace(/\.(\d{3})(\d)/, '.$1/$2');
        v = v.replace(/(\d{4})(\d)/, '$1-$2');
      }
      this.document = v.substring(0, 18);
    },
    formatPhone() {
      let v = this.phone.replace(/\D/g, '');
      v = v.replace(/^(\d{2})(\d)/g, '($1) $2');
      v = v.replace(/(\d)(\d{4})$/, '$1-$2');
      this.phone = v.substring(0, 15);
    },
    createCompany: function () {
      let self = this;

      if (this.documentLength === 11 && !this.birthDate) {
        return this.$myFunctions.showFeedbackModal(this, "Atenção", "Data de Nascimento obrigatória para CPF.", "warning");
      }
      if (this.documentLength === 14 && !this.companyType) {
        return this.$myFunctions.showFeedbackModal(this, "Atenção", "Tipo Jurídico obrigatório para CNPJ.", "warning");
      }

      let payload = {
        name: this.name, address: this.address, zip_code: this.cep, city: this.city, state: this.state,
        business_type: this.business_type, email: this.email, phone: this.phone, document: this.document,
        address_number: this.address_number, complement: this.complement, birthDate: this.birthDate, companyType: this.companyType, incomeValue: this.incomeValue
      };

      this.loading = true;

      this.$base.api.post("/companies/create_company", payload)
        .then(function (response) {
          self.loading = false;

          self.$myFunctions.showFeedbackModal(self, "Sucesso!", "Empresa e Conta criadas com sucesso!", "success");

          setTimeout(() => {
            window.location.href = "/trocar-empresa";
          }, 2000);
        }).catch((error) => {
          self.loading = false;

          const msg = error.response?.data?.message || error.response?.data || "Ocorreu um erro ao criar a empresa.";
          self.$myFunctions.showFeedbackModal(self, "Erro na criação", msg, "error");
        });
    }
  }
}
</script>
<style scoped>
form {
  max-height: 75vh;
  padding: 0 var(--space-1) 20px;
  margin-top: var(--space-6);
}
</style>