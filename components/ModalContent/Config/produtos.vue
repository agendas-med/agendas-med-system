<template>
    <form id="informations-form" @submit.prevent="saveProduct()">
        <div class="edit-event grid grid-cols-1 gap-4">
            <div class="input-group">
                <label for="name">Nome</label>
                <input type="text" id="name" required v-model="product.name">
            </div>
            <div class="input-group">
                <label for="value">Valor</label>
                <input type="text" id="value" required @input="$myFunctions.inputMoneyCheck($event)">
            </div>
            <div class="input-group">
                <label for="cost">Custo (Despesa)</label>
                <input type="text" id="cost" required @input="$myFunctions.inputMoneyCheck($event)">
            </div>
            <div class="input-group">
                <label for="description">Descrição</label>
                <input type="text" id="description" v-model="product.description">
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
            isEdit: this.$global.contentObject.id != 0
        }
    },
    computed: {
        product: function () {
            return this.isEdit ? reactive(this.$global.contentObject) : reactive({ name: "", value: 0, cost: 0, description: "" });
        }
    },
    methods: {
        saveProduct: function () {
            let self = this;

            self.$myFunctions.resetResponse(this);

            let data = {
                name: self.product.name,
                value: self.$myFunctions.returnFloatNumber($("#value").val()),
                cost: self.$myFunctions.returnFloatNumber($("#cost").val()),
                description: self.product.description
            }

            self.$base.api.post("/companies/products" + (self.isEdit ? "/" + self.product.id : ""), data) 
            .then(function (response) { 
                self.$myFunctions.setResponse(self, response.data.message, "success");                
                self.$emit("savedContent");
            }).catch((error) => {
                self.$myFunctions.setResponse(self, error.response.data, "error");
            })
        }
    },
    mounted: function () {
        $("#name").focus();
        $("#value").val(this.$myFunctions.formatCurrency(this.product.value));
        $("#cost").val(this.$myFunctions.formatCurrency(this.product.cost));
    }
}
</script>
<style scoped>
</style>