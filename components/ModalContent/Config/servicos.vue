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

            <div class="input-checkbox-group" v-if="acceptCustomLocationActive">
                <label for="require-location">
                    Este serviço é realizado em domicílio (Exigirá endereço)
                </label>
                <input type="checkbox" v-model="service.requires_location" id="require-location">
            </div>

            <div class="input-checkbox-group">
                <label for="accepts-quantity">
                    Permitir informar quantidade neste serviço
                </label>
                <input type="checkbox" v-model="service.accepts_quantity" id="accepts-quantity">
            </div>

            <div class="input-group mt-3" v-if="service.accepts_quantity">
                <label for="measurement_unit_id">Unidade de Medida (Como será cobrado?)</label>
                <select id="measurement_unit_id" v-model.number="service.measurement_unit_id" required>
                    <option value="1">Unidade(s) / Padrão</option>
                    <option value="2">Por Pessoa(s)</option>
                    <option value="3">Por Peça(s) (Sofá, Tapete, etc)</option>
                    <option value="4">Por Hora(s)</option>
                    <option value="5">Por Sessão(ões)</option>
                    <option value="6">Por Metro(s) Quadrado(s)</option>
                    <option value="7">Por Quilômetro(s)</option>
                </select>
            </div>

        </div>
        <input type="submit" id="submit-button" />
    </form>
</template>

<script>
import { reactive } from 'vue';

export default {
    emits: ["savedContent"],
    data() {
        return {
            isEdit: this.$global.contentObject.id != 0,
            reverseUnitMap: {
                'unidade': 1, 'pessoa': 2, 'peca': 3, 'hora': 4, 'sessao': 5, 'm2': 6, 'km': 7
            }
        }
    },
    computed: {
        service: function () {
            return this.isEdit ? reactive(this.$global.contentObject) : reactive({ name: "", value: 0, cost: 0, observations: "", duration: "", requires_location: false, accepts_quantity: false });
        },
        acceptCustomLocationActive() {
            const preferences = this.$global.company?.configurations?.notifications || [];
            const pref = preferences.find(p => p.code === 'accept_custom_location');
            return pref ? pref.active : false;
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
                duration: self.service.duration,
                requires_location: self.service.requires_location,
                accepts_quantity: self.service.accepts_quantity,
                measurement_unit_id: self.service.measurement_unit_id
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

        if (this.isEdit) {
            this.service.requires_location = this.service.requires_location == 1 || this.service.requires_location === true;
            this.service.accepts_quantity = this.service.accepts_quantity == 1 || this.service.accepts_quantity === true;
            this.service.measurement_unit_id = this.reverseUnitMap[this.service.measurement_unit] || 1;
        } else {
            this.service.measurement_unit_id = 1;
        }
    }
}
</script>
<style scoped></style>