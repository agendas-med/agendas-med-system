<template>
    <form id="informations-form" @submit.prevent="saveSale()" :invalid="invalidForm">
        <div class="edit-event grid grid-cols-1 gap-4">
            <div class="input-group">
                <label>Cliente</label>
                <UtilsAjaxAutocomplete @select="setUser($event)" ajaxtype="clientes" :entityid="sale.customer_id" :entityname="sale.customer_name" :required="true" />
            </div>
            <div class="input-group">
                <label>Serviços <font-awesome icon="circle-info" class="cinza" title="Os serviços são incluídos/alterados no agendamento vinculado à venda." /></label>
                <div class="flex gap-6">
                    <router-link :to="'/agenda?appointment=' + sale.appointment_id" v-if="sale?.appointment_id">Agendamento Nº {{ sale.appointment_id }}</router-link>
                    <div class="flex gap-6 flex-wrap items-center">
                        <UtilsBadge v-for="(servico, index) in sale.services" :key="index" :text="servico.name" />
                        <p v-if="sale.services.length == 0" class="mt-2 cinza">Nenhum agendamento vinculado à esta venda</p>
                    </div>
                </div>
            </div>
            <div class="input-group">
                <div class="dual-input half confirm-button">
                    <div class="input-group">
                        <label for="product">Adicione um produto</label>
                        <select v-model="idProductToAdd">
                            <option value="">* Selecione *</option>
                            <option :value="product.id" v-for="(product, index) in $global.company.products">{{ product.name }}</option>
                        </select>
                    </div>
                    <div class="input-group">
                        <label for="quantity">Quantidade</label>
                        <input type="number" v-model="quantityProductToAdd">
                    </div>
                    <button type="button" class="btn btn-primary" v-on:click="addProduct()">Adicionar</button>
                </div>
                <UtilsDataTable :loaded="true" :dataTable="sale.products" :rowsPerPage="2" table="produto" @handleNew="" :newButton="false">
                    <template #column-id="{ item }">
                        <p>{{ item.id }}</p>
                    </template>
                    <template #column-nome="{ item }">
                        <p>{{ item.name }}</p>
                    </template>
                    <template #column-quantidade="{ item }">
                        <p>{{ item.quantity }}</p>
                    </template>
                    <template #column-ações="{ item }">
                        <div class="flex space-x-2">
                            <button class="rounded-button" v-on:click="handleDeleteProduct(item)">
                                <font-awesome icon="trash" class="vermelho" />
                            </button>
                        </div>
                    </template>
                </UtilsDataTable>
            </div>
            <div class="input-group">
                <label for="status">Status</label>
                <select name="status" v-model="sale.status">
                    <option value="em_aberto">Em aberto</option>
                    <option value="realizada">Realizada</option>
                    <option value="cancelada">Cancelada</option>
                </select>
            </div>
            <UtilsLoadingResponse :msg="response" :type="responseType" styletype="small" @eraseError="$myFunctions.resetResponse(this)" />
        </div>
        <input type="submit" id="submit-button" />
    </form>
    
</template>
<script>

export default {
    emits: ["savedContent"],
    data() {
        return {
            response: "",
            responseType: "",
            invalidForm: true,
            idProductToAdd: "",
            quantityProductToAdd: 0
        }
    },
    computed: {
        sale: function () {
            let sale;

            if (this.$global.contentObject.id != 0) {
                sale = this.$global.contentObject;
            } else {
                sale = {
                    id: null, 
                    products: [], 
                    services: [], 
                    customer_id: null, 
                    customer_name: "",
                    company_id: this.$global.company.id,
                    appointment_id: null,
                    status: "em_aberto"
                }
            }

            return reactive(sale);
        }
    },
    methods: {
        addProduct: function () {
            if (this.idProductToAdd != "" && this.quantityProductToAdd != 0) {
                let indexTargetProduct = this.$global.company.products.findIndex(product => product.id == this.idProductToAdd);
                let targetProduct = this.$global.company.products[indexTargetProduct];

                targetProduct.quantity = this.quantityProductToAdd;

                this.sale.products.push(targetProduct);
                this.idProductToAdd = "";
                this.quantityProductToAdd = 0;
            }
        },
        handleDeleteProduct: function (product) {
            let productIndex = this.sale.products.findIndex(item => item.id == product.id);

            this.sale.products.splice(productIndex, 1);
        },
        setUser: function (event) {
            this.sale.customer_id = event.id;
            this.sale.customer_name = event.name;
        },
        saveSale: function () {
            let self = this;

            self.$myFunctions.resetResponse(this);

            if (!this.$myFunctions.formCustomValidate(this)) return; 

            let sale = {
                company_id: this.sale.company_id,
                customer_id: this.sale.customer_id,
                appointment_id: this.sale.appointment_id,
                status: this.sale.status,
                products: this.sale.products.map((product) => {
                    return {
                        id: product.id,
                        name: product.name,
                        value: product.value,
                        description: product.description,
                        cost: product.cost,
                        quantity: product.quantity
                    }
                })
            }

            if (self.sale.id) {
                self.$base.api.patch("/sales/" + self.sale.id, sale).then(function () {            
                    self.$emit("savedContent");
                })
            } else {
                self.$base.api.post("/sales", sale).then(function () {            
                    self.$emit("savedContent");
                })
            }
        }
    },
    mounted: function () {
        console.log(this.sale)
    }
}
</script>
<style scoped>
</style>