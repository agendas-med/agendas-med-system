<template>
    <form id="informations-form" @submit.prevent="saveSale" :invalid="invalidForm">
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
                            <option :value="product.id" v-for="(product, index) in $global.company.products">{{ product.name }} ({{ product.available_quantity > 0 ? "Disponível" : "Indisponível" }})</option>
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
            <div class="sale-summary" v-if="sale.id">
                <p class="fontsize-md-bold">Resumo da venda</p>
                <table>
                    <thead>
                        <tr>
                            <th class="text-left">Item</th>
                            <th class="text-right">Valor</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr class="sale-item" v-for="(item, index) in sale.debts_list">
                            <td class="text-left">{{ index + 1 }} - {{ item.name }}</td>
                            <td class="text-right">{{ $myFunctions.formatCurrency(item.value) }}</td>
                        </tr>
                    </tbody>
                </table>
                <table class="sale-subtotal">
                    <tbody>
                        <tr>
                            <td class="text-left"><span class="fontsize-md-bold">Sub total</span></td>
                            <td class="text-right fontsize-md">{{ $myFunctions.formatCurrency(sale.total) }}</td>
                        </tr>
                    </tbody>
                </table>
                <!--<table class="sale-paid">
                    <tbody>
                        <tr v-if="sale.payments_summary.pix">
                            <td class="text-left"><span class="fontsize-sm">Pix</span></td>
                            <td class="text-right fontsize-sm">{{ $myFunctions.formatCurrency(sale.payments_summary.pix) }}</td>
                        </tr>
                        <tr v-if="sale.payments_summary.cartao_debito">
                            <td class="text-left"><span class="fontsize-sm">Cartão de débito</span></td>
                            <td class="text-right fontsize-sm">{{ $myFunctions.formatCurrency(sale.payments_summary.cartao_debito) }}</td>
                        </tr>
                        <tr v-if="sale.payments_summary.cartao_credito">
                            <td class="text-left"><span class="fontsize-sm">Cartão de Crédito</span></td>
                            <td class="text-right fontsize-sm">{{ $myFunctions.formatCurrency(sale.payments_summary.cartao_credito) }}</td>
                        </tr>
                        <tr v-if="sale.payments_summary.dinheiro">
                            <td class="text-left"><span class="fontsize-sm">Dinheiro</span></td>
                            <td class="text-right fontsize-sm">{{ $myFunctions.formatCurrency(sale.payments_summary.dinheiro) }}</td>
                        </tr>
                        <tr>
                            <td class="text-left"><span class="fontsize-sm-bold">Total Pago</span></td>
                            <td class="text-right fontsize-sm-bold">{{ $myFunctions.formatCurrency(sale.total_paid) }}</td>
                        </tr>
                        <tr>
                            <td class="text-left"><span class="fontsize-sm-bold">Restante</span></td>
                            <td class="text-right fontsize-sm-bold">{{ $myFunctions.formatCurrency(sale.total - sale.total_paid) }}</td>
                        </tr>
                    </tbody>
                </table>-->
                <UtilsDataTable :loaded="true" :dataTable="sale.payments" :rowsPerPage="2" table="pagamento" @handleNew="" :newButton="false">
                    <template #column-id="{ item }">
                        <p>{{ item.id }}</p>
                    </template>
                    <template #column-método-pagamento="{ item }">
                        <p>{{ retornaMetodo(item.payment_type) }}</p>
                    </template>
                    <template #column-valor="{ item }">
                        <p>{{ $myFunctions.formatCurrency(item.amount) }}</p>
                    </template>
                    <template #column-ações="{ item }">
                        <div class="flex space-x-2">
                            <button type="button" class="rounded-button" v-on:click="handleDeletePayment(item)" title="Cancelar Pagamento" v-if="item.payment_type != 'dinheiro'">
                                <font-awesome icon="rotate-left" class="vermelho" />
                            </button>
                        </div>
                    </template>
                </UtilsDataTable>
                <button class="btn btn-blue" id="insert-payment-button" type="button" v-on:click="showPaymentModal = !showPaymentModal">Inserir pagamento</button>
            </div>
            <UtilsLoadingResponse :msg="response" :type="responseType" styletype="small" @eraseError="$myFunctions.resetResponse(this)" />
        </div>
        <input type="submit" id="submit-button" />
        <input type="submit" id="submit-button2" />
    </form>
    <div class="payment-modal-wrapper" v-if="showPaymentModal" v-on:click="showPaymentModal = !showPaymentModal"></div>
    <div class="small-modal" :class="{'show': showPaymentModal}" data-title="Adicionar pagamento">
        <form @submit.prevent="insertPayment">
            <div class="form-group">
                <label for="payment_type">Forma de pagamento</label>
                <select id="payment_type" required v-model="paymentType">
                    <option value="">* Selecione *</option>
                    <option value="pix">Pix</option>
                    <option value="cartao_debito" v-if="false">Cartão de Débito</option>
                    <option value="cartao_credito" v-if="false">Cartão de Crédito</option>
                    <option value="dinheiro">Dinheiro</option>
                </select>
            </div>
            <div class="form-group">
                <label for="amount">Valor</label>
                <input type="text" id="amount" value="R$ 0,00" required @input="$myFunctions.inputMoneyCheck($event)">
            </div>
            <button class="btn btn-primary" type="submit">Adicionar</button>
        </form>
    </div>
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
            quantityProductToAdd: 0,
            paymentType: "",
            showPaymentModal: false
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
        handleDeletePayment: function (payment) {
            console.log("Estornar pagamento: ", payment)
        },
        retornaMetodo: function (metodo) {
            switch (metodo) {
                case "pix":
                    return "Pix";
                case "cartao_debito":
                    return "Cartão de Débito";
                case "cartao_credito":
                    return "Cartão de Crédito";
                case "dinheiro":
                    return "Dinheiro";
            }
        },
        addProduct: function () {
            if (this.idProductToAdd != "" && this.quantityProductToAdd != 0) {
                let indexTargetProduct = this.$global.company.products.findIndex(product => product.id == this.idProductToAdd);
                let targetProduct = this.$global.company.products[indexTargetProduct];

                if (targetProduct.available_quantity <= 0) {
                    this.$myFunctions.setResponse(this, "Produto indisponível!", "error");
                    document.querySelector(".loading-response").scrollIntoView({ behavior: "smooth" });
                    return
                }

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
        insertPayment: function () {
            let self = this;

            self.$myFunctions.resetResponse(this);

            let payment = {
                sale_id: this.sale.id,
                amount: this.$myFunctions.returnFloatNumber($("#amount").val()),
                payment_type: this.paymentType,
                customer_id: this.sale.customer_id
            }

            self.$base.api.post("/sales/insert_payment", payment).then(() => {    
                self.$myFunctions.getCompany(self); 
                self.sale.payments.push(payment);       
                self.showPaymentModal = false;
            }).catch((error) => {
                this.$myFunctions.setResponse(this, error.response.data, "error");
                document.querySelector(".loading-response").scrollIntoView({ behavior: "smooth" });
            })
        },
        saveSale: function (event) {
            let self = this;

            self.$myFunctions.resetResponse(this);

            if (!this.$myFunctions.formCustomValidate(this)) return; 

            let saleProducts = this.sale.products.map((product) => {
                return {
                    id: product.id,
                    name: product.name,
                    value: product.value,
                    description: product.description,
                    cost: product.cost,
                    quantity: product.quantity,
                    available_quantity: product.available_quantity
                }
            })

            let someUnavailable = saleProducts.some(product => product.available_quantity <= 0);

            if (this.sale.status == "realizada" && someUnavailable) {
                this.$myFunctions.setResponse(this, "Impossível concluir a venda, existem produtos indisponíveis!", "error");
                document.querySelector(".loading-response").scrollIntoView({ behavior: "smooth" });
                return;
            }

            let sale = {
                company_id: this.sale.company_id,
                customer_id: this.sale.customer_id,
                appointment_id: this.sale.appointment_id,
                status: this.sale.status,
                products: saleProducts
            }

            if (self.sale.id) {
                self.$base.api.patch("/sales/" + self.sale.id + (event.submitter.id == "submit-button2" ? "?finish=true" : ""), sale).then(function () {    
                    self.$myFunctions.getCompany(self);     
                     
                    self.$emit("savedContent");
                }).catch((error) => {
                    this.$myFunctions.setResponse(this, error.response.data, "error");
                    document.querySelector(".loading-response").scrollIntoView({ behavior: "smooth" });
                })
            } else {
                self.$base.api.post("/sales", sale).then(function () {   
                    self.$myFunctions.getCompany(self);         
                    self.$emit("savedContent");
                }).catch((error) => {
                    this.$myFunctions.setResponse(this, error.response.data, "error");
                    document.querySelector(".loading-response").scrollIntoView({ behavior: "smooth" });
                })
            }
        }
    },
    mounted: function () {
        
    }
}
</script>
<style scoped>
.sale-summary {
    display: flex;
    flex-direction: column;
    gap: var(--space-3);

    & table {
        width: 100%;
    }

    & > p {
        margin-bottom: var(--space-6);
    }
}

.sale-subtotal {
    margin-top: var(--space-3);
}

#insert-payment-button {
    align-self: flex-end;
    width: 180px;
}
</style>