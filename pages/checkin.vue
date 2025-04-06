<template>
    <section>
        <UtilsPageheader title="Painel de Check-in" subtitle="Realize o check-in e check-out dos agendamentos do dia." />
        <UtilsDataTable class="mt-10" :loaded="!loading" :dataTable="appointments" :rowsPerPage="7" :newButton="false" table="agendamento">
            <template #column-cliente="{ item }">
                <div class="flex items-center">
                    <img :teste="item.image" :src="item.image == '' ? defaultUserImage : item.image" class="avatar avatar-pp">
                    <div>
                        <p><strong>{{ item.customer_name }}</strong></p>
                    </div>
                </div>
            </template>
            <template #column-agendamento="{ item }">
                <p>{{ item.services[0].name }}</p>
            </template>
            <template #column-hora="{ item }">
                <p class="items-center">{{ $myFunctions.formatHour(item.date) }}</p>
            </template>
            <template #column-status="{ item }">
                <p>
                    <UtilsBadge class="text-center" :background="item.status == 'agendado' ? 'var(--amarelo)' : item.status == 'iniciado' ? 'var(--azul)' : item.status == 'realizado' ? 'var(--verde-escuro)' : 'var(--vermelho)'" :text="item.status" />
                </p>
            </template>
            <template #column-ações="{ item }">
                <div class="flex space-x-2">
                    <button class="rounded-button" v-on:click="handleInitAppointment(item)" v-if="item.status == 'agendado'" title="Iniciar agendamento">
                        <font-awesome icon="circle-play" class="azul" />
                    </button>
                    <button class="rounded-button" v-on:click="handleStopAppointment(item)" v-if="item.status == 'iniciado'" title="Terminar agendamento">
                        <font-awesome icon="circle-stop" class="verde" />
                    </button>
                    <button class="rounded-button" v-on:click="handleCancelAppointment(item)" v-if="item.status == 'agendado'" title="Cancelar agendamento">
                        <font-awesome icon="circle-xmark" class="vermelho" />
                    </button>
                </div>
            </template>
        </UtilsDataTable>
    </section>
</template>

<script>
import defaultUserImage from '@/assets/img/default-user-image.png';

export default {
    data() {
        return {  
            defaultUserImage: defaultUserImage,
            appointments: [],
            loading: true
        }
    },
    methods: {
        getAppointments: function () {
            let self = this;

            self.$base.api.get("/appointments?today=true")
            .then((response) => {
                self.appointments = response.data.returnObj;
                self.loading = false;
            })
            .catch((error) => {
                console.error("Erro ao buscar os agendamentos:", error);
            });
        },
        handleInitAppointment: function (item) {
            let self = this;

            self.$base.api.post("/appointments/init/" + item.id).then(function () {            
                self.getAppointments();
            })
        },
        handleStopAppointment: function (item) {
            let self = this;

            self.$base.api.post("/appointments/stop/" + item.id).then(function () {            
                self.getAppointments();
            })
        },
        handleCancelAppointment: function (item) {
            let self = this;

            self.$base.api.post("/appointments/cancel/" + item.id).then(function () {            
                self.getAppointments();
            })
        }
    },
    mounted: function () {
        this.getAppointments();
    }
}
</script>