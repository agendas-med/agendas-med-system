<template>
    <form id="informations-form" @submit.prevent="saveSchedule()" :invalid="invalidForm">
        <div class="edit-event grid grid-cols-1 gap-4">
            <div class="input-group">
                <label>Cliente</label>
                <UtilsAjaxAutocomplete @select="setCustomer($event)" ajaxtype="clientes" :entityid="agendamento.customer_id" :entityname="agendamento.customer_name" :required="true" />
            </div>
            <div class="input-group">
                <label for="service">Serviço</label>
                <UtilsMultiselect :selectedOptions="agendamento.services" @updateSelectedOptions="agendamento.services = $event" :options="servicos" :required="true"></UtilsMultiselect>
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
                        <option v-for="option in durations" :key="option.value" :value="option.value">
                        {{ option.label }}
                        </option>
                    </select>
                </div>
            </div>
            <div class="input-group">
                <label for="status">Status</label>
                <select id="status" v-model="agendamento.status" required>
                    <option value="">* Selecione *</option>
                    <option value="agendado">Agendado</option>
                    <option value="iniciado">Iniciado</option>
                    <option value="realizado">Realizado</option>
                    <option value="cancelado">Cancelado</option>
                </select>
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
    emits: ["savedContent"],
    data() {
        return {
            response: "",
            responseType: "",
            invalidForm: true,
            durations: JSON.parse(JSON.stringify(this.$global.durations))
        }
    },
    watch: {
        'agendamento.services': {
            handler(newValue, oldValue) {
                let selectedServices = this.servicos.filter((service) => {
                    return this.agendamento.services.some(agService => agService.id === service.id);
                });

                let durationSum = 0;

                for (let i = 0; i < selectedServices.length; i++) {
                    let currentService = selectedServices[i];

                    durationSum += parseInt(currentService.duration);
                }

                if (!this.durations.some(duration => duration.value == durationSum)) {
                    this.durations.push({
                        value: durationSum,
                        label: this.formatDuration(durationSum)
                    });

                    this.durations.sort((a, b) => a.value - b.value);
                }

                if (selectedServices.length > 0) {
                    this.agendamento.duration = durationSum;
                } else {
                    this.agendamento.duration = "";
                }
            },
            deep: true 
        }
    },
    computed: {
        servicos: function () {
            return this.$global.company.services;
        },
        agendamento: function () {
            let agendamento;

            agendamento = reactive(this.$global.contentObject);
            agendamento.date = moment(agendamento.date).format("YYYY-MM-DD HH:mm:ss");
            agendamento.status = agendamento.status || "agendado";

            return agendamento;
        }
    },
    methods: {
        formatDuration(minutes) {
            const hours = Math.floor(minutes / 60);
            const remainingMinutes = minutes % 60;

            if (hours > 0 && remainingMinutes > 0) {
            return `${hours} hora${hours > 1 ? 's' : ''} e ${remainingMinutes} minuto${remainingMinutes > 1 ? 's' : ''}`;
            } else if (hours > 0) {
            return `${hours} hora${hours > 1 ? 's' : ''}`;
            } else {
            return `${remainingMinutes} minuto${remainingMinutes > 1 ? 's' : ''}`;
            }
        },
        setCustomer: function (event) {
            if (event.id != null) {
                this.agendamento.customer_id = event.id;
                this.agendamento.customer_name = event.name;
            }
        },
        saveSchedule: function () {
            let promise;
            this.$myFunctions.resetResponse(this);
            this.invalidForm = false;
            if ($(".custom-invalid[invalid='true']").length) {
                $(".custom-invalid[invalid='true']").addClass("invalid");
                this.$myFunctions.setResponse(this, "Campos não podem ser vazios", "error");
                this.invalidForm = true;

                return;
            } else {
                $(".custom-invalid[invalid='true']").removeClass("invalid");
            }

            if (this.agendamento.customer_id == null) {
                this.$myFunctions.setResponse(this, "Cliente não cadastrado", "error");
                this.invalidForm = true;

                return;
            }

            this.agendamento.duration = this.agendamento.duration.toString();

            let data = {
                customer_id: this.agendamento.customer_id, 
                customer_name: this.agendamento.customer_name, 
                date: this.agendamento.date, 
                duration: this.agendamento.duration, 
                observations: this.agendamento.observations, 
                services: this.agendamento.services,
                status: this.agendamento.status
            }

            if (this.agendamento.id) {
                promise = this.updateSchedule(data);
            } else {
                promise = this.createSchedule(data);
            }

            promise.then(() => {
                this.$emit("savedContent");
            }).catch((error) => {
                this.invalidForm = true;
                this.$myFunctions.setResponse(this, error.response.data, "error");
            });
        },
        createSchedule(data) {
            return new Promise((resolve, reject) => {
                this.$base.api.post("/appointments", data)
                    .then(() => {
                        this.$myFunctions.setResponse(this, "Agendamento criado com sucesso!", "success");
                        resolve();
                    })
                    .catch((error) => {
                        reject(error);
                    });
            });
        },
        updateSchedule(data) {
            return new Promise((resolve, reject) => {
                this.$base.api.patch(`/appointments/${this.agendamento.id}`, data)
                    .then(() => {
                        this.$myFunctions.setResponse(this, "Agendamento atualizado com sucesso!", "success");
                        resolve();
                    })
                    .catch((error) => {
                        reject(error);
                    });
            });
        }
    }
}
</script>
<style scoped>
</style>