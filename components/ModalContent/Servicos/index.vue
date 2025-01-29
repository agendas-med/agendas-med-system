<template>
    <form id="informations-form" @submit.prevent="saveService()" :invalid="invalidForm">
        <div class="edit-event grid grid-cols-1 gap-4">
            <div class="input-group">
                <label for="servico">Serviço</label>
                <input type="text" id="servico" v-model="servico.nome" required>
            </div>
            <div class="input-group">
                <label for="duration">Duração</label>
                <select id="duration" v-model="servico.tempo_duracao" required>
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
                <UtilsCurrencyInput propPlaceholder="R$ 0,00" propName="valor_servico" propId="valor" propRequired="required" />
            </div>
            <div class="input-group">
                <label for="observations">Observações</label>
                <textarea id="observations" v-model="servico.observacoes" style="height: 101px;"></textarea>
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
            servicos: [
                { id: 1, nome: 'Corte de cabelo' },
                { id: 2, nome: 'Barba completa' },
                { id: 3, nome: 'Sobrancelha' },
                { id: 4, nome: 'Corte de cabelo + Barba' },
                { id: 5, nome: 'Lavagem de cabelo' },
                { id: 6, nome: 'Corte de cabelo infantil' },
                { id: 7, nome: 'Corte de cabelo e design de barba' },
                { id: 8, nome: 'Tinte de cabelo' },
                { id: 9, nome: 'Penteado' },
                { id: 10, nome: 'Tratamento capilar' }
            ],
            servico: {
                nome: "",
                duracao: null,
                observacoes: "",
                valor: null
            },
            response: "",
            responseType: "",
            invalidForm: true
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

            let valor_servico = this.$myFunctions.returnFloatNumber(data["valor_servico"]);

            this.servico.valor = valor_servico;

            console.log(this.servico)
            this.$emit("savedContent");
        }
    },
    mounted: function () {
        this.servico = reactive(this.$global.contentObject);

        $("#valor").val(this.$myFunctions.formatCurrency(this.servico.valor));
        $("#servico").focus();
    }
}
</script>
<style scoped>
</style>