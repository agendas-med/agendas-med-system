<template>
    <form id="informations-form" @submit.prevent="saveService()" :invalid="invalidForm">
        <div class="edit-event grid grid-cols-1 gap-4">
            <div class="input-group">
                <label for="servico">Serviço</label>
                <input type="text" id="servico" v-model="servico.name" required>
            </div>
            <div class="input-group">
                <label for="duration">Duração</label>
                <select id="duration" v-model="servico.duration" required>
                    <option value="">* Selecione *</option>
                    <option value="15">15 minutos</option>
                    <option value="30">30 minutos</option>
                    <option value="45">45 minutos</option>
                    <option value="60">1 hora</option>
                    <option value="75">1 hora e 15 minutos</option>
                    <option value="90">1 hora e 30 minutos</option>
                    <option value="105">1 hora e 45 minutos</option>
                    <option value="120">2 horas</option>
                    <option value="135">2 horas e 15 minutos</option>
                    <option value="150">2 horas e 30 minutos</option>
                    <option value="165">2 horas e 45 minutos</option>
                    <option value="180">3 horas</option>
                    <option value="195">3 horas e 15 minutos</option>
                    <option value="210">3 horas e 30 minutos</option>
                    <option value="225">3 horas e 45 minutos</option>
                    <option value="240">4 horas</option>
                </select>
            </div>
            <div class="input-group">
                <label for="valor">Valor</label>
                <UtilsCurrencyInput propPlaceholder="R$ 0,00" propName="value" propId="valor" propRequired="required" />
            </div>
            <div class="input-group">
                <label for="observations">Observações</label>
                <textarea id="observations" v-model="servico.observations" style="height: 101px;"></textarea>
            </div>
            <UtilsLoadingResponse :msg="response" :type="responseType" styletype="small" @eraseError="$myFunctions.resetResponse(this)" />
        </div>
        <input type="submit" id="submit-button" />
    </form>
    
</template>
<script>
export default {
    data() {
        return {
            servicos: [],
            servico: {
                name: "",
                duration: null,
                observations: "",
                value: null
            },
            response: "",
            responseType: "",
            invalidForm: true,
            service_value: null
        }
    },
    methods: {
        saveService: function () {
            this.$myFunctions.resetResponse(this);
            this.invalidForm = false;

            let data = $("#informations-form").serializeArray().reduce(function (obj, item) {
                obj[item.name] = item.value;
                return obj;
            }, {});

            let valor_servico = this.$myFunctions.returnFloatNumber(data["value"]);

            this.servico.value = valor_servico;

            this.$emit("savedContent");
        }
    },
    mounted: function () {
        this.servico = reactive(this.$global.contentObject);

        if (this.servico.value != null) {
            $("#valor").val(this.$myFunctions.formatCurrency(this.servico.value));
        }
        
        $("#servico").focus();
    }
}
</script>
<style scoped>
</style>