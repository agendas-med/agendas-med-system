<template>
    <form id="informations-form" @submit.prevent="saveSchedule()" :invalid="invalidForm">
        <div class="edit-event grid grid-cols-1 gap-4">
            <div class="input-group">
                <label>Paciente</label>
                <UtilsAjaxAutocomplete @select="setPatient($event)" ajaxtype="pacientes" :entityid="agendamento.paciente_id" :entityname="agendamento.paciente_nome" :required="true" />
            </div>
            <div class="input-group">
                <label for="specialty">Especialidade</label>
                <select id="specialty" v-model="agendamento.especialidade" required>
                    <option value="">* Selecione *</option>
                    <option :value="especialidade.id" v-for="especialidade in especialidadesMedicas">{{ especialidade.nome }}</option>
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
            especialidadesMedicas: [
                { id: 1, nome: "Alergologia e Imunologia" },
                { id: 2, nome: "Anestesiologia" },
                { id: 3, nome: "Angiologia" },
                { id: 4, nome: "Cardiologia" },
                { id: 5, nome: "Cirurgia Cardiovascular" },
                { id: 6, nome: "Cirurgia Geral" },
                { id: 7, nome: "Cirurgia Oncológica" },
                { id: 8, nome: "Cirurgia Pediátrica" },
                { id: 9, nome: "Cirurgia Plástica" },
                { id: 10, nome: "Cirurgia Torácica" },
                { id: 11, nome: "Cirurgia Vascular" },
                { id: 12, nome: "Clínica Médica" },
                { id: 13, nome: "Dermatologia" },
                { id: 14, nome: "Endocrinologia e Metabologia" },
                { id: 15, nome: "Endoscopia" },
                { id: 16, nome: "Gastroenterologia" },
                { id: 17, nome: "Genética Médica" },
                { id: 18, nome: "Geriatria" },
                { id: 19, nome: "Ginecologia e Obstetrícia" },
                { id: 20, nome: "Hematologia e Hemoterapia" },
                { id: 21, nome: "Homeopatia" },
                { id: 22, nome: "Infectologia" },
                { id: 23, nome: "Mastologia" },
                { id: 24, nome: "Medicina de Emergência" },
                { id: 25, nome: "Medicina do Esporte" },
                { id: 26, nome: "Medicina do Trabalho" },
                { id: 27, nome: "Medicina de Família e Comunidade" },
                { id: 28, nome: "Medicina Física e Reabilitação" },
                { id: 29, nome: "Medicina Intensiva" },
                { id: 30, nome: "Medicina Legal e Perícia Médica" },
                { id: 31, nome: "Medicina Nuclear" },
                { id: 32, nome: "Medicina Preventiva e Social" },
                { id: 33, nome: "Nefrologia" },
                { id: 34, nome: "Neurocirurgia" },
                { id: 35, nome: "Neurologia" },
                { id: 36, nome: "Nutrologia" },
                { id: 37, nome: "Oftalmologia" },
                { id: 38, nome: "Oncologia" },
                { id: 39, nome: "Ortopedia e Traumatologia" },
                { id: 40, nome: "Otorrinolaringologia" },
                { id: 41, nome: "Patologia" },
                { id: 42, nome: "Patologia Clínica/Medicina Laboratorial" },
                { id: 43, nome: "Pediatria" },
                { id: 44, nome: "Pneumologia" },
                { id: 45, nome: "Psiquiatria" },
                { id: 46, nome: "Radiologia e Diagnóstico por Imagem" },
                { id: 47, nome: "Radioterapia" },
                { id: 48, nome: "Reumatologia" },
                { id: 49, nome: "Urologia" }
            ],
            agendamento: {
                paciente_id: null,
                paciente_nome: "",
                especialidade: "",
                data: "",
                duracao: "",
                observacoes: ""
            },
            response: "",
            responseType: "",
            invalidForm: true
        }
    },
    methods: {
        setPatient: function (event) {
            if (event.id != null) {
                this.agendamento.paciente_id = event.id;
                this.agendamento.paciente_nome = event.nome;
            }
        },
        saveSchedule: function () {
            this.$myFunctions.resetResponse(this);
            this.invalidForm = false;

            if ($(".ajax-autocomplete").attr("invalid") == "true") {
                this.$myFunctions.setResponse(this, "Campo paciente não pode ser vazio", "error");
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