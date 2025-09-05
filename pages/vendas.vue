<template>
  <UtilsPageheader title="Vendas" subtitle="Gerencie as vendas realizadas no estabelecimento." />
  <br>
  <UtilsDataTable :loaded="!loading" :dataTable="vendas" :rowsPerPage="7" :newButton="true" @handleNew="newSale" table="venda">
    <template #column-cliente="{ item }">
        <div class="flex items-center">
            <img :teste="item.customer_image" :src="item.customer_image == '' ? defaultUserImage : item.customer_image" class="avatar avatar-pp">
            <div>
                <p><strong>{{ item.customer_name }}</strong></p>
            </div>
        </div>
    </template>
    <template #column-serviços="{ item }">
        <p v-if="item.services.length">{{ item.services[0].name }} {{ item.services.length > 1 ? ("+ " + (item.services.length - 1)) : "" }}</p>
    </template>
    <template #column-produtos="{ item }">
        <p v-if="item.products.length">{{ item.products[0].name }} {{ item.products.length > 1 ? ("+ " + (item.products.length - 1)) : "" }}</p>
    </template>
    <template #column-total="{ item }">
        <p>{{ $myFunctions.formatCurrency(item.total) }}</p>
    </template>
    <template #column-status="{ item }">
      <UtilsBadge class="text-center" :background="item.status == 'realizada' ? 'var(--verde)' : item.status == 'em_aberto' ? 'var(--amarelo)' : 'var(--vermelho)'" :text="returnSaleStatus(item.status)" />
    </template>
    <template #column-data="{ item }">
      <p>{{ $myFunctions.formatDate(item.create_date) }}</p>
    </template>
    <template #column-ações="{ item }">
        <div class="flex space-x-2">
            <button class="rounded-button" v-on:click="handleDeleteSale(item)">
                <font-awesome icon="trash" class="vermelho" />
            </button>
            <button class="rounded-button" v-on:click="handleEditSale(item)">
                <font-awesome icon="pen" class="cinza" />
            </button>
        </div>
    </template>
</UtilsDataTable>
<UtilsModal excludepath="/sales/" @closeModal="$myFunctions.closeModal(this); returnSales()">
    <ModalContentVendas :event="selectedEvent" @savedContent="$myFunctions.closeModal(this, []); returnSales()" />
</UtilsModal>
</template>
<script>
import defaultUserImage from '@/assets/img/default-user-image.png';

  export default {
    data() {
      return {
        defaultUserImage: defaultUserImage,
        loading: true,
        modalContentVendas: false,
        vendas: []
      }
    },
    computed: {
      
    },
    mounted: function () {
      this.returnSales();
    },
    methods: {
      returnSaleStatus: function (status) {
        switch (status) {
          case "em_aberto":
            return "Em aberto";
          case "realizada":
            return "Realizada";
          case "cancelada":
            return "Cancelada";
        }
      },
      returnSales: function () {
          let self = this;

          this.$base.api.get("/sales").then(function(response){            
              self.vendas = response.data.returnObj;
              self.loading = false;
          })
      },
      handleEditSale: function (item) {
          this.$myFunctions.openModal(this, "Alterar venda", "Salvar", "Cancelar", {}, "", item);
      },
      handleDeleteSale: function (item) {
          this.$myFunctions.openModal(this, "Excluir venda", "Excluir", "Cancelar", {}, "", item);
      },
      newSale: function () {
          this.$myFunctions.openModal(this, "Incluir venda", "Cadastrar", "Cancelar");
      }
    }
  }
</script>
<style>

</style>