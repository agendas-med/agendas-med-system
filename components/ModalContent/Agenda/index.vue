<template>
    <form id="informations-form" @submit.prevent="saveSchedule()" :invalid="invalidForm">
        <div class="edit-event grid grid-cols-1 gap-4">
            <div class="input-group">
                <label>Cliente</label>
                <UtilsAjaxAutocomplete @select="setCustomer($event)" ajaxtype="clientes"
                    :entityid="agendamento.customer_id" :entityname="agendamento.customer_name" :required="true" />
            </div>
            <div class="input-group">
                <label for="service">Serviço</label>
                <UtilsMultiselect :selectedOptions="agendamento.services"
                    @updateSelectedOptions="agendamento.services = $event" :options="servicos" :required="true">
                </UtilsMultiselect>
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
            <div v-if="acceptsCustomLocation" class="mt-4 border-t pt-4">
                <p class="font-bold mb-2">Local do Atendimento</p>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div class="input-group">
                        <label for="zip_code">CEP</label>
                        <input type="text" id="zip_code" v-model="agendamento.zip_code">
                    </div>
                    <div class="input-group">
                        <label for="address">Endereço</label>
                        <input type="text" id="address" v-model="agendamento.address">
                    </div>
                    <div class="input-group">
                        <label for="number">Número</label>
                        <input type="text" id="number" v-model="agendamento.number">
                    </div>
                    <div class="input-group">
                        <label for="complement">Complemento</label>
                        <input type="text" id="complement" v-model="agendamento.complement">
                    </div>
                    <div class="input-group">
                        <label for="city">Cidade</label>
                        <input type="text" id="city" v-model="agendamento.city">
                    </div>
                    <div class="input-group">
                        <label for="state">Estado</label>
                        <select id="state" v-model="agendamento.state">
                            <option value="">* Selecione *</option>
                            <option :value="state.sigla" v-for="(state, index) in $global.estados" :key="index">{{
                                state.nome }}</option>
                        </select>
                    </div>
                </div>
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
                    if (this.agendamento.duration < durationSum) {
                        this.agendamento.duration = durationSum;
                    }
                } else {
                    this.agendamento.duration = "";
                }
            },
            deep: true
        },
        "agendamento.zip_code": function () {
            if (!this.agendamento.zip_code) return;

            this.agendamento.zip_code = this.agendamento.zip_code.replace(/\D/g, '');

            if (this.agendamento.zip_code.length == 8) {
                this.agendamento.zip_code = this.agendamento.zip_code.replace(/(\d{5})(\d{3})/, '$1-$2');

                this.$myFunctions.getAddressData(this.agendamento.zip_code).then((results) => {
                    this.agendamento.address = results.logradouro;
                    this.agendamento.city = results.localidade;
                    this.agendamento.state = results.uf;
                });
            }
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
        },
        acceptsCustomLocation() {
            if (!this.$global.company || !this.$global.company.configurations) return false;

            let pref = this.$global.company.configurations.notifications.find(p => p.code === 'accept_custom_location');
            return pref ? pref.active : false;
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

            if (!this.$myFunctions.formCustomValidate(this)) {
                this.$myFunctions.stopModalLoading(this);
                return;
            }

            if (this.agendamento.customer_id == null) {
                this.invalidForm = true;
                this.$myFunctions.stopModalLoading(this);
                this.$myFunctions.showFeedbackModal(this, "Atenção", "O cliente não está cadastrado.", "warning");
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
                status: this.agendamento.status,
                zip_code: this.agendamento.zip_code,
                address: this.agendamento.address,
                number: this.agendamento.number,
                complement: this.agendamento.complement,
                city: this.agendamento.city,
                state: this.agendamento.state
            }

            if (this.agendamento.id) {
                promise = this.updateSchedule(data);
            } else {
                promise = this.createSchedule(data);
            }

            promise.then((message) => {
                this.$emit("savedContent");
                this.$myFunctions.showFeedbackModal(this, "Sucesso", message, "success");
            }).catch((error) => {
                this.invalidForm = true;
                this.$myFunctions.stopModalLoading(this);
                this.$myFunctions.showFeedbackModal(this, "Erro", error.response?.data || "Ocorreu um erro ao salvar agendamento.", "error");
            });
        },
        createSchedule(data) {
            return new Promise((resolve, reject) => {
                this.$base.api.post("/appointments", data)
                    .then(() => resolve("Agendamento criado com sucesso!"))
                    .catch(reject);
            });
        },
        updateSchedule(data) {
            return new Promise((resolve, reject) => {
                this.$base.api.patch(`/appointments/${this.agendamento.id}`, data)
                    .then(() => resolve("Agendamento atualizado com sucesso!"))
                    .catch(reject);
            });
        }
    }
}
</script>
<style scoped></style>