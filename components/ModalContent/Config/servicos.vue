<template>
    <form id="informations-form" @submit.prevent="saveService()">
        <div class="edit-event grid grid-cols-1 gap-4">
            <div class="input-group">
                <label for="name">Nome</label>
                <input type="text" id="name" required v-model="service.name">
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
                <label for="duration">Duração</label>
                <select id="duration" v-model="service.duration" required>
                    <option value="">* Selecione *</option>
                    <option v-for="option in $global.durations" :key="option.value" :value="option.value">
                        {{ option.label }}
                    </option>
                </select>
            </div>
            <div class="input-group">
                <label for="observations">Observações</label>
                <input type="text" id="observations" required v-model="service.observations">
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
            isEdit: this.$global.contentObject.id != 0
        }
    },
    computed: {
        service: function () {
            return this.isEdit ? reactive(this.$global.contentObject) : reactive({ name: "", value: 0, cost: 0, observations: "", duration: "" });
        }
    },
    methods: {
        saveService: function () {
            let self = this;

            let data = {
                name: self.service.name,
                value: self.$myFunctions.returnFloatNumber($("#value").val()),
                cost: self.$myFunctions.returnFloatNumber($("#cost").val()),
                observations: self.service.observations,
                duration: self.service.duration
            }

            self.$base.api.post("/companies/services" + (self.isEdit ? "/" + self.service.id : ""), data)
                .then(function (response) {
                    self.$emit("savedContent");
                    self.$myFunctions.showFeedbackModal(self, "Sucesso", response.data.message || "Serviço salvo com sucesso.", "success");
                }).catch((error) => {
                    self.$myFunctions.stopModalLoading(self);
                    self.$myFunctions.showFeedbackModal(self, "Erro", error.response?.data || "Ocorreu um erro ao salvar o serviço.", "error");
                });
        }
    },
    mounted: function () {
        $("#name").focus();
        $("#value").val(this.$myFunctions.formatCurrency(this.service.value));
        $("#cost").val(this.$myFunctions.formatCurrency(this.service.cost));
    }
}
</script>
<style scoped></style>