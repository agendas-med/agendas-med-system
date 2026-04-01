<template>
    <form id="informations-form" @submit.prevent="insertMovement()" :invalid="invalidForm">
        <div class="edit-event grid grid-cols-1 gap-4">
            <div class="input-group">
                <label for="type">Tipo da movimentação</label>
                <select id="type" required v-model="stockMovement.type">
                    <option value="">* Selecione *</option>
                    <option value="add">Adicionar</option>
                    <option value="remove">Remover</option>
                </select>
            </div>
            <div class="input-group">
                <label for="product">Produto</label>
                <select id="product" required v-model="stockMovement.product">
                    <option :value="productModel">* Selecione *</option>
                    <option v-for="(product, index) in $global.company.products" :key="index" :value="product">{{
                        product.name }}</option>
                </select>
            </div>
            <div class="input-group">
                <label for="quantity">Quantidade {{ stockMovement.product.unit_of_measure_abbreviation ?
                    `(${stockMovement.product.unit_of_measure_abbreviation})` : "" }}</label>
                <input type="number" required v-model="stockMovement.quantity">
            </div>
        </div>
        <input type="submit" id="submit-button" />
    </form>

</template>
<script>
export default {
    emits: ["savedContent"],
    data() {
        return {
            stockMovement: {
                type: "",
                product: {
                    unit_of_measure_abbreviation: "",
                    id: null
                },
                quantity: null
            },
            invalidForm: true,
            productModel: {
                unit_of_measure_abbreviation: "",
                id: null
            }
        }
    },
    methods: {
        insertMovement: function () {
            let data = {
                product_id: this.stockMovement.product.id,
                quantity: this.stockMovement.quantity
            }

            let self = this;

            this.$base.api.post("/stock/" + this.stockMovement.type, data).then(function (response) {
                self.$myFunctions.getCompany(self);
                self.$emit("savedContent");
                self.$myFunctions.showFeedbackModal(self, "Sucesso", "Movimentação registrada com sucesso.", "success");
            }).catch((error) => {
                self.$myFunctions.stopModalLoading(self);
                self.invalidForm = true;
                self.$myFunctions.showFeedbackModal(self, "Erro", error.response?.data || "Ocorreu um erro ao registrar movimentação.", "error");
            });
        }
    }
}
</script>
<style scoped></style>