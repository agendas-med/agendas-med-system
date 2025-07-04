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
                <label>Produtos</label>
                <UtilsMultiselect :selectedOptions="sale.products" @updateSelectedOptions="sale.products = $event" :options="$global.company.products" :required="true"></UtilsMultiselect>
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
            invalidForm: true
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
                products: this.sale.products.map((product) => {
                    return {
                        id: product.id,
                        name: product.name,
                        value: product.value,
                        description: product.description,
                        cost: product.cost
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
        
    }
}
</script>
<style scoped>
</style>