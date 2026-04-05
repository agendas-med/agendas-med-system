<template>
    <form id="informations-form" @submit.prevent="saveSale" :invalid="invalidForm">
        <div class="edit-event grid grid-cols-1 gap-4">
            <div class="input-group">
                <label>Cliente</label>
                <UtilsAjaxAutocomplete @select="setUser($event)" ajaxtype="clientes" :entityid="sale.customer_id"
                    :entityname="sale.customer_name" :required="true" />
            </div>
            <div class="input-group">
                <label>Serviços <font-awesome icon="circle-info" class="cinza"
                        title="Os serviços são incluídos/alterados no agendamento vinculado à venda." /></label>
                <div class="flex gap-6">
                    <router-link :to="'/agenda?appointment=' + sale.appointment_id"
                        v-if="sale?.appointment_id">Agendamento Nº {{ sale.appointment_id }}</router-link>
                    <div class="flex gap-6 flex-wrap items-center">
                        <UtilsBadge v-for="(servico, index) in sale.services" :key="index" :text="servico.name" />
                        <p v-if="sale.services.length == 0" class="mt-2 cinza">Nenhum agendamento vinculado à esta venda
                        </p>
                    </div>
                </div>
            </div>
            <div class="input-group">
                <div class="dual-input half confirm-button">
                    <div class="input-group">
                        <label for="product">Adicione um produto</label>
                        <select v-model="idProductToAdd">
                            <option value="">* Selecione *</option>
                            <option :value="product.id" v-for="(product, index) in $global.company.products">{{
                                product.name }} ({{ product.available_quantity > 0 ? "Disponível" : "Indisponível" }})
                            </option>
                        </select>
                    </div>
                    <div class="input-group">
                        <label for="quantity">Quantidade</label>
                        <input type="number" v-model="quantityProductToAdd">
                    </div>
                    <button type="button" class="btn btn-primary" v-on:click="addProduct()">Adicionar</button>
                </div>
                <UtilsDataTable :loaded="true" :dataTable="sale.products" :rowsPerPage="2" table="produto" @handleNew=""
                    :newButton="false">
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

                <table class="sale-subtotal mt-2" style="border-top: 1px solid #eee; padding-top: 10px;">
                    <tbody>
                        <tr>
                            <td class="text-left"><span class="fontsize-sm-bold"
                                    style="color: var(--primary-color);">Total
                                    Pago</span></td>
                            <td class="text-right fontsize-sm-bold" style="color: var(--primary-color);">{{
                                $myFunctions.formatCurrency(totalPaid) }}</td>
                        </tr>
                        <tr>
                            <td class="text-left"><span class="fontsize-sm-bold">Restante a Pagar</span></td>
                            <td class="text-right fontsize-sm-bold"
                                :style="{ color: remainingAmount > 0 ? '#ef4444' : '#10b981' }">
                                {{ remainingAmount > 0 ? $myFunctions.formatCurrency(remainingAmount) : 'PAGO' }}
                            </td>
                        </tr>
                    </tbody>
                </table>
                <UtilsDataTable :loaded="true" :dataTable="sale.payments" :rowsPerPage="2" table="pagamento"
                    @handleNew="" :newButton="false">
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
                            <button type="button" class="rounded-button" v-on:click="handleDeletePayment(item)"
                                title="Cancelar Pagamento" v-if="item.payment_type != 'dinheiro'">
                                <font-awesome icon="rotate-left" class="vermelho" />
                            </button>
                        </div>
                    </template>
                </UtilsDataTable>
                <button class="btn btn-blue" id="insert-payment-button" type="button" @click="openPaymentModal">Inserir
                    pagamento</button>
            </div>
        </div>
        <input type="submit" id="submit-button" />
        <input type="submit" id="submit-button2" />
    </form>
    <div class="payment-modal-wrapper" v-if="showPaymentModal" v-on:click="showPaymentModal = !showPaymentModal"></div>
    <div class="payment-modal-wrapper" v-if="showPaymentModal" v-on:click="showPaymentModal = !showPaymentModal"></div>
    <div class="small-modal" :class="{ 'show': showPaymentModal }" data-title="Adicionar pagamento">

        <form @submit.prevent="insertPayment" v-if="!pixData">
            <div class="form-group">
                <label for="payment_type">Forma de pagamento</label>
                <select id="payment_type" required v-model="paymentType">
                    <option value="">* Selecione *</option>
                    <option value="pix_asaas">Pix Automático (Gerar QR Code Asaas)</option>
                    <option value="pix">Pix (Conferência Manual)</option>
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

        <div v-else-if="pixData && pixData.payload" class="flex flex-col items-center justify-center p-2 text-center">
            <p class="fontsize-sm cinza mb-4">Escaneie o QR Code abaixo no app do seu banco.</p>

            <img :src="`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(pixData.payload)}`"
                class="w-48 h-48 border p-2 mb-4 bg-white" style="border-radius: 8px;" alt="QR Code PIX" />

            <div class="w-full relative mb-4 text-left">
                <label class="text-xs cinza font-bold">Pix Copia e Cola:</label>
                <input type="text" readonly :value="pixData.payload" class="w-full text-sm bg-gray-100 p-2 border mt-1"
                    style="border-radius: 4px; padding-right: 40px;" />
                <button type="button" @click="copyPix" class="absolute right-2 bottom-2" title="Copiar PIX"
                    style="color: var(--primary-color)">
                    <font-awesome icon="copy" />
                </button>
            </div>

            <div class="flex items-center justify-center mb-4 text-sm" style="color: var(--primary-color)">
                <font-awesome icon="circle-notch" spin class="mr-2" />
                Aguardando pagamento...
            </div>

            <button type="button" @click="cancelarPix" class="btn btn-red w-full text-sm">
                Cancelar este PIX
            </button>
        </div>

    </div>
</template>
<script>
export default {
    emits: ["savedContent"],
    data() {
        return {
            invalidForm: true,
            idProductToAdd: "",
            quantityProductToAdd: 0,
            paymentType: "",
            showPaymentModal: false,
            pixData: null,
            pollingInterval: null
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
        },
        totalPaid: function () {
            if (!this.sale || !this.sale.payments) return 0;
            return this.sale.payments.reduce((acc, currentPayment) => {
                return acc + parseFloat(currentPayment.amount || 0);
            }, 0);
        },
        remainingAmount: function () {
            if (!this.sale) return 0;
            let total = parseFloat(this.sale.total || 0);
            let remaining = total - this.totalPaid;

            return remaining > 0 ? remaining : 0;
        }
    },
    unmounted() {
        if (this.pollingInterval) {
            clearInterval(this.pollingInterval);
        }
    },
    methods: {
        openPaymentModal() {
            if (this.sale.pix_payload) {
                let expDate = new Date(this.sale.pix_expiration_date);
                if (expDate > new Date()) {
                    this.pixData = {
                        payload: this.sale.pix_payload
                    };
                    this.iniciarPollingDePagamento();
                } else {
                    this.pixData = null;
                    this.$myFunctions.showFeedbackModal(this, "Aviso", "O PIX gerado anteriormente expirou. Por favor, gere um novo.", "warning");
                }
            } else {
                this.pixData = null;
            }
            this.showPaymentModal = true;
        },
        handleDeletePayment: function (payment) {
            console.log("Estornar pagamento: ", payment)
        },
        retornaMetodo: function (metodo) {
            switch (metodo) {
                case "pix_asaas":
                    return "Pix Asaas";
                case "pix":
                    return "Pix Manual";
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
                    this.$myFunctions.showFeedbackModal(this, "Atenção", "Produto indisponível no estoque!", "warning");
                    return;
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
            let amountValue = this.$myFunctions.returnFloatNumber($("#amount").val());

            if (this.paymentType === 'pix_asaas' && amountValue < 5) {
                self.$myFunctions.showFeedbackModal(self, "Atenção", "O valor mínimo estipulado pelo Banco Central para gerar um QRCode Pix via API é de R$ 5,00.", "warning");
                return;
            }

            let payment = {
                sale_id: this.sale.id,
                amount: amountValue,
                payment_type: this.paymentType,
                customer_id: this.sale.customer_id
            };

            self.$base.api.post("/sales/insert_payment", payment).then((response) => {
                if (response.data && response.data.pix) {
                    self.pixData = response.data.pix;
                    self.sale.pix_payload = response.data.pix.payload;
                    self.sale.pix_expiration_date = response.data.pix.expirationDate;

                    self.iniciarPollingDePagamento();

                } else {
                    if (!self.sale.payments) {
                        self.sale.payments = [];
                    }

                    self.sale.payments.push({
                        amount: amountValue,
                        payment_type: self.paymentType
                    });

                    self.paymentType = "";
                    $("#amount").val("");
                    self.showPaymentModal = false;
                    self.$myFunctions.showFeedbackModal(self, "Sucesso", "Pagamento registrado com sucesso!", "success");
                }
            }).catch((error) => {
                self.$myFunctions.showFeedbackModal(self, "Erro", "Erro ao processar o pagamento.", "error");
            });
        },
        iniciarPollingDePagamento() {
            let self = this;

            if (self.pollingInterval) {
                clearInterval(self.pollingInterval);
            }

            self.pollingInterval = setInterval(() => {

                self.$base.api.get(`/sales/${self.sale.id}`).then((response) => {
                    let vendaAtualizada = response.data;

                    self.sale.payments = vendaAtualizada.payments || [];

                    let pixConfirmado = self.sale.payments.find(p => p.payment_type === 'pix_asaas');

                    if (pixConfirmado) {
                        clearInterval(self.pollingInterval);

                        self.pixData = null;
                        self.sale.pix_payload = null;
                        self.sale.pix_expiration_date = null;
                        self.paymentType = "";

                        self.showPaymentModal = false;

                        self.$emit("savedContent");

                        self.$myFunctions.showFeedbackModal(self, "Sucesso!", "Pagamento via PIX recebido e confirmado na hora!", "success");
                    }
                }).catch(() => {
                });

            }, 5000);
        },
        copyPix: function () {
            navigator.clipboard.writeText(this.pixData.payload);
            this.$myFunctions.showFeedbackModal(this, "Sucesso", "Código PIX copiado!", "success");
        },
        cancelarPix: function () {
            let self = this;
            clearInterval(self.pollingInterval);

            if (self.sale.id) {
                self.$base.api.post("/sales/cancel_pix", { sale_id: self.sale.id }).then(() => {
                    self.pixData = null;
                    self.sale.pix_payload = null;
                    self.sale.pix_expiration_date = null;
                    self.paymentType = "";
                    self.showPaymentModal = false;
                });
            } else {
                self.pixData = null;
                self.showPaymentModal = false;
            }
        },
        saveSale: function (event) {
            let self = this;

            if (!this.$myFunctions.formCustomValidate(this)) {
                self.$myFunctions.stopModalLoading(self);
                return;
            }

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
                self.$myFunctions.stopModalLoading(self);
                self.$myFunctions.showFeedbackModal(self, "Atenção", "Impossível concluir a venda, existem produtos indisponíveis!", "warning");
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
                    self.$myFunctions.showFeedbackModal(self, "Sucesso", "Venda atualizada com sucesso.", "success");
                }).catch((error) => {
                    self.$myFunctions.stopModalLoading(self);
                    self.$myFunctions.showFeedbackModal(self, "Erro", error.response?.data || "Erro ao atualizar venda.", "error");
                });
            } else {
                self.$base.api.post("/sales", sale).then(function () {
                    self.$myFunctions.getCompany(self);
                    self.$emit("savedContent");
                    self.$myFunctions.showFeedbackModal(self, "Sucesso", "Venda registrada com sucesso.", "success");
                }).catch((error) => {
                    self.$myFunctions.stopModalLoading(self);
                    self.$myFunctions.showFeedbackModal(self, "Erro", error.response?.data || "Erro ao registrar venda.", "error");
                });
            }
        }
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

    &>p {
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