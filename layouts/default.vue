<template>
    <div class="w-full h-full flex items-center justify-center absolute" v-if="systemLoading">
        <UtilsLoading :loading="true" />
    </div>
    <div v-else>
        <SidebarMenu class="sidebar" ref="sidebar" :class="isResponsive ? sidebarOpen  ? 'sidebar-opened' : 'sidebar-closed' : ''" @closeSidebar="sidebarOpen = false" />
        <div class="sidebar-menu-wrapper" v-show="isResponsive && sidebarOpen" v-on:click="toggleSidebar()"></div>
        <Header class="header" @toggleMenu="toggleSidebar()" />
        <div class="slot">
            <slot></slot>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            sidebarOpen: false,
            isResponsive: window.innerWidth <= 1029,
            systemLoading: true
        }
    },
    methods: {
        toggleSidebar: function () {
            this.sidebarOpen = !this.sidebarOpen;
        },
        getCompany: function () {
            return new Promise((resolve, reject) => {
                this.$global.company = {
                    id: 1,
                    name: "Barbearia Estilo & Barba",
                    adress: "Rua dos Cabelos, 123 - Centro, São Paulo, SP",
                    configurations: {
                        opening_hours: [
                            {
                                day: 1, // Domingo
                                hours: []
                            },
                            {
                                day: 2, // Segunda-feira
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
                                day: 3, // Terça-feira
                                hours: [] // Sem horário
                            },
                            {
                                day: 4, // Quarta-feira
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
                                day: 5, // Quinta-feira
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
                                day: 6, // Sexta-feira
                                hours: [] // Sem horário
                            },
                            {
                                day: 7, // Sábado
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

                resolve();
            })
        },
        getUser: function () {
            return new Promise((resolve, reject) => {
                this.$global.user = {
                    id: 1,
                    name: "Saymon",
                    email: "linnubr@gmail.com",
                    url_photo: "https://cademint-test.s3.amazonaws.com/2024-09-04T02_10_20.206Z126018478_1648490771979717_7245151950313189709_o.jpg",
                    tel: "43996352536",
                    cep: "83322070",
                    adress: "Rua Brasholanda 556",
                    city: "Pinhais",
                    state: "PR",
                    country: "Brasil"
                }

                resolve();
            })
        },
        isValidRoute: function (path) {
            let routes = [
                "/agenda",
                "/clientes",
                "/relatorios",
                "/agenda",
                "/financeiro",
                "/financeiro/pagamentos",
                "/financeiro/servicos",
                "/financeiro/metodos-pagamento",
                "/configuracoes",
                "/configuracoes/usuarios",
                "/configuracoes/preferencias",
                "/perfil",
                "/entrar",
                "/registro"
            ]
            
            return routes.some(route => route == path);
        }
    },
    mounted: function () {
        window.onresize = () => {
            this.isResponsive = window.innerWidth <= 1029;
        }
    },
    async created() {
        if (!this.isValidRoute(this.$route.path)) {
            //window.location.href = "/entrar";
        }

        this.getCompany().then(() => {
            this.getUser().then(() => {
                setTimeout(() => {
                    this.systemLoading = false;
                }, 500)
            })
        })
    }
}
</script>

<style>
    .sidebar {
        position: fixed;
        top: 0;
        left: 0;
        height: 100vh;
        width: 300px;
        border-right: 1px solid var(--cinza-medio);
        transition: transform 0.4s;
        z-index: 2;
    }

    .sidebar-menu-wrapper {
        width: 100vw;
        height: 100vh;
        position: fixed;
        top: 0;
        left: 0;
        z-index: 1;
    }

    .header {
        height: 60px;
        width: calc(100vw - 300px);
        position: fixed;
        top: 0;
        right: 0;
        z-index: 3;
        background: white;
        border-bottom: 1px solid var(--cinza-medio);
    }

    .slot {
        width: calc(100vw - 300px);
        height: calc(100vh - 60px);
        position: fixed;
        top: 60px;
        left: 300px;
        transition: transform 0.4s;
        padding: var(--space-6);
        overflow-y: auto;
    }

    @media (max-width: 1029px) {
        .sidebar:not(.sidebar-opened) {
            transform: translateX(-300px);
        }

        .sidebar {
            height: calc(100vh - 60px);
            top: 60px;
        }

        .slot {
            transform: translateX(-300px);
        }

        .header, .slot {
            width: 100vw;
        }
    }
    @media (max-width: 480px) {
        .sidebar {
            width: 100vw;
        }

        .sidebar:not(.sidebar-opened) {
            transform: translateY(-100vh);
        }
    }

    .sidebar-icons {
        width: 26.4px;
        height: 26.4px;
        color: var(--cinza);
        margin-right: var(--space-6);
        transition: color 0.4s;
    }

    .sidebar-text {
        color: var(--cinza);
    }
</style>