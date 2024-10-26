<template>
    <section>
        <div class="profile-configurations">
            <p class="fontsize-sm cinza">HORÁRIO DE ATENDIMENTO</p>
            <form @submit.prevent="changeProfileConfigurations">
                <UtilsOpeningScheduled @changed="setNewSchedules($event, index)" :openinghour="day" v-for="(day, index) in configurations.opening_hours" />
                <button type="submit" class="btn btn-primary">Salvar informações</button>
            </form>
        </div>
    </section>   
</template>

<script>
export default {
    data() {
        return {
            configurations: {
                opening_hours: [
                    {
                        day: 1, // Segunda-feira
                        hours: [
                            {
                                initial_date: "09:00",
                                final_date: "12:00"
                            },
                            {
                                initial_date: "13:00",
                                final_date: "18:00"
                            }
                        ]
                    },
                    {
                        day: 2, // Terça-feira
                        hours: [
                            {
                                initial_date: "09:00",
                                final_date: "12:00"
                            },
                            {
                                initial_date: "13:00",
                                final_date: "18:00"
                            }
                        ]
                    },
                    {
                        day: 3, // Quarta-feira
                        hours: [] // Sem horário
                    },
                    {
                        day: 4, // Quinta-feira
                        hours: [
                            {
                                initial_date: "09:00",
                                final_date: "12:00"
                            },
                            {
                                initial_date: "13:00",
                                final_date: "18:00"
                            }
                        ]
                    },
                    {
                        day: 5, // Sexta-feira
                        hours: [
                            {
                                initial_date: "09:00",
                                final_date: "12:00"
                            },
                            {
                                initial_date: "13:00",
                                final_date: "18:00"
                            }
                        ]
                    },
                    {
                        day: 6, // Sábado
                        hours: [] // Sem horário
                    },
                    {
                        day: 7, // Domingo
                        hours: [] // Sem horário
                    }
                ],
                notifications: [
                    {
                        id: "scheduled_consultation",
                        active: false
                    },
                    {
                        id: "in_app_payment",
                        active: true
                    },
                    {
                        id: "consultation_cancelation",
                        active: true
                    }
                ]
            }
        }
    },
    mounted() {
    },
    beforeDestroy() {
    },
    methods: {
        setNewSchedules: function (event, index) {
            this.configurations.opening_hours[index] = event;
        },
        changeProfileConfigurations: function () {
            console.log(this.configurations)
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
</style>