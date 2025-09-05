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
                    <option v-for="(product, index) in $global.company.products" :key="index" :value="product">{{ product.name }}</option>
                </select>
            </div>
            <div class="input-group">
                <label for="quantity">Quantidade {{ stockMovement.product.unit_of_measure_abbreviation ? `(${stockMovement.product.unit_of_measure_abbreviation})` : "" }}</label>
                <input type="number" required v-model="stockMovement.quantity">
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
            stockMovement: {
                type: "",
                product: {
                    unit_of_measure_abbreviation: "",
                    id: null
                },
                quantity: null
            },
            responseType: "",
            invalidForm: true,
            productModel: {
                unit_of_measure_abbreviation: "",
                id: null
            }
        }
    },
    methods: {
        insertMovement: function () {
            this.$myFunctions.resetResponse(this);

            let data = {
                product_id: this.stockMovement.product.id,
                quantity: this.stockMovement.quantity
            }

            let self = this;

            this.$base.api.post("/stock/" + this.stockMovement.type, data).then(function(response){     
                self.$myFunctions.getCompany(self);       
                self.$emit("savedContent");
            }).catch((error) => {
                this.invalidForm = true;
                this.$myFunctions.setResponse(this, error.response.data, "error");
            });
        }
    }
}
</script>
<style scoped>
</style>