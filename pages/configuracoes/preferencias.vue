<template>
    <section>
        <div class="profile-configurations">
            <p class="fontsize-sm cinza">HORÁRIO DE ATENDIMENTO</p>
            <form @submit.prevent="changeProfileConfigurations">
                <UtilsOpeningScheduled @changed="setNewSchedules($event, index)" :openinghour="day" v-for="(day, index) in company.configurations.opening_hours" />
                <p class="fontsize-sm cinza mt-8">NOTIFICAÇÕES</p>
                <div class="input-checkbox-group" v-for="notification in company.configurations.notifications" :key="notification.id">
                    <label :for="notification.id" class="fontsize-md preto">{{ notificationLabel(notification.id) }}</label>
                    <input
                        type="checkbox"
                        :id="notification.id"
                        :checked="getNotificationActive(notification.id)"
                        @change="setNotificationActive(notification.id, $event.target.checked)"
                    >
                </div>
                <button type="submit" class="btn btn-primary mt-8">Salvar informações</button>
                <UtilsLoadingResponse :msg="response" :type="responseType" :loading="false" @eraseError="$myFunctions.resetResponse(this)" />
            </form>
        </div>
    </section>   
</template>

<script>
export default {
    data() {
        return {
            response: "",
            responseType: ""
        }
    },
    computed: {
        company: function () {
            return reactive(JSON.parse(JSON.stringify(this.$global.company)));
        }
    },
    mounted() {
    },
    beforeDestroy() {
    },
    methods: {
        getNotificationActive(id) {
            const notification = this.company.configurations.notifications.find(n => n.id === id);
            return notification ? notification.active : false;
        },
        setNotificationActive(id, value) {
            const notification = this.company.configurations.notifications.find(n => n.id === id);
            if (notification) {
                notification.active = value;
            }
        },
        notificationLabel(id) {
            switch(id) {
                case "schedule_made":
                    return "Agendamento realizado";
                case "in_app_payment":
                    return "Pagamento no App";
                case "schedule_cancelation":
                    return "Cancelamento de agendamento";
                default:
                    return "Notificação";
            }
        },
        setNewSchedules: function (event, index) {
            this.company.configurations.opening_hours[index] = event;
        },
        changeProfileConfigurations: function () {
            this.response = "Informações alteradas com sucesso";
            this.responseType = "success";
            console.log(this.company.configurations)
        }
    }
}
</script>
<style scoped>
.profile-header {
    margin: var(--space-7) 0;
}

.profile-informations > p {
    margin-bottom: var(--space-3);
}

.avatar {
    margin-right: var(--space-6);
}

@media (max-width: 768px) {
    .profile-configurations {
        & button[type="submit"], & button[type="button"] {
            width: 100%;
            max-width: 100%;
        }
    } 
}
</style>