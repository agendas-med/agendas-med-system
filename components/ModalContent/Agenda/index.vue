<template>
    <form id="informations-form" @submit.prevent="saveSchedule()" :invalid="invalidForm">
        <div class="edit-event grid grid-cols-1 gap-4">
            <div class="input-group">
                <label>Cliente</label>
                <UtilsAjaxAutocomplete @select="setCustomer($event)" ajaxtype="clientes" :entityid="agendamento.customer_id" :entityname="agendamento.customer_name" :required="true" />
            </div>
            <div class="input-group">
                <label for="service">Serviço</label>
                <select id="service" v-model="agendamento.service" required>
                    <option value="">* Selecione *</option>
                    <option :value="servico.id" v-for="servico in servicos">{{ servico.nome }}</option>
                </select>
            </div>
            <div class="grid grid-cols-[2fr_1fr] gap-4">
                <div class="input-group">
                    <label for="date">Data e horário</label>
                    <input type="datetime-local" v-model="agendamento.date" id="date" required>
                </div>
                <div class="input-group">
                    <label for="duration">Duração</label>
                    <select id="duration" v-model="agendamento.duration" required>
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
                <textarea id="observations" v-model="agendamento.observations" style="height: 101px;"></textarea>
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
            agendamento: {},
            response: "",
            responseType: "",
            invalidForm: true
        }
    },
    methods: {
        setCustomer: function (event) {
            if (event.id != null) {
                this.agendamento.customer_id = event.id;
                this.agendamento.customer_name = event.name;
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

            let promise;

            if (this.agendamento.id) {
                promise = this.updateSchedule();
            } else {
                promise = this.createSchedule();
            }

            promise
                .then(() => {
                    this.$emit("savedContent");
                })
                .catch((error) => {
                    this.$myFunctions.setResponse(this, "Erro ao salvar agendamento", "error");
                    console.error(error);
                });
        },
        createSchedule() {
            return new Promise((resolve, reject) => {
                this.$base.api.post("/appointments", this.agendamento)
                    .then(() => {
                        this.$myFunctions.setResponse(this, "Agendamento criado com sucesso!", "success");
                        resolve();
                    })
                    .catch((error) => {
                        this.$myFunctions.setResponse(this, "Erro ao criar agendamento", "error");
                        reject(error);
                    });
            });
        },
        updateSchedule() {
            return new Promise((resolve, reject) => {
                this.$base.api.patch(`/appointments/${this.agendamento.id}`, this.agendamento)
                    .then(() => {
                        this.$myFunctions.setResponse(this, "Agendamento atualizado com sucesso!", "success");
                        resolve();
                    })
                    .catch((error) => {
                        this.$myFunctions.setResponse(this, "Erro ao atualizar agendamento", "error");
                        reject(error);
                    });
            });
        }
    },
    mounted: function () {
        this.agendamento = reactive(this.$global.contentObject);
    }
}
</script>
<style scoped>
</style>