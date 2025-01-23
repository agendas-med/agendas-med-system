<template>
    <form id="informations-form" @submit.prevent="saveSchedule()" :invalid="invalidForm">
        <div class="edit-event grid grid-cols-1 gap-4">
            <div class="input-group">
                <label>Cliente</label>
                <UtilsAjaxAutocomplete @select="setCustomer($event)" ajaxtype="clientes" :entityid="agendamento.cliente_id" :entityname="agendamento.cliente_nome" :required="true" />
            </div>
            <div class="input-group">
                <label for="specialty">Serviço</label>
                <select id="specialty" v-model="agendamento.servico" required>
                    <option value="">* Selecione *</option>
                    <option :value="servico.id" v-for="servico in servicos">{{ servico.nome }}</option>
                </select>
            </div>
            <div class="grid grid-cols-[2fr_1fr] gap-4">
                <div class="input-group">
                    <label for="date">Data e horário</label>
                    <input type="datetime-local" v-model="agendamento.data" id="date" required>
                </div>
                <div class="input-group">
                    <label for="duration">Duração</label>
                    <select id="duration" v-model="agendamento.duracao" required>
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
            </div>
            <div class="input-group">
                <label for="observations">Observações</label>
                <textarea id="observations" v-model="agendamento.observacoes" style="height: 101px;"></textarea>
            </div>
            <UtilsLoadingResponse :msg="response" :type="responseType" styletype="small" @eraseError="$myFunctions.resetResponse(this)" />
        </div>
        <input type="submit" id="submit-button" />
    </form>
    
</template>
<script>
export default {
    props: ["event"],
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
            agendamento: {
                cliente_id: null,
                cliente_nome: "",
                servico: "",
                data: "",
                duracao: "",
                observacoes: ""
            },
            response: "",
            responseType: "",
            invalidForm: true
        }
    },
    computed: {
        agendamento: function () {
            return reactive(this.$global.contentObject);
        }
    },
    methods: {
        setCustomer: function (event) {
            if (event.id != null) {
                this.agendamento.cliente_id = event.id;
                this.agendamento.cliente_nome = event.nome;
            }
        },
        saveSchedule: function () {
            this.$myFunctions.resetResponse(this);
            this.invalidForm = false;

            if ($(".ajax-autocomplete").attr("invalid") == "true") {
                this.$myFunctions.setResponse(this, "Campo cliente não pode ser vazio", "error");
                this.invalidForm = true;

                return;
            }

            console.log(this.agendamento)
            this.$emit("savedContent");
        }
    },
    mounted: function () {
        this.agendamento = this.event;
    }
}
</script>
<style scoped>
</style>