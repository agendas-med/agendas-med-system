<template>
    <section>
        <div class="flex items-center justify-between">
            <UtilsPageheader title="Clientes" subtitle="Veja todas as informações dos seus clientes" />
            <button type="button" v-on:click="newCustomer()" class="btn btn-primary">
                <font-awesome icon="plus" />
                Adicionar
            </button>
        </div>
        <UtilsTabs :tabs="tabs" @changedTab="changeCustomers($event)" />
        <UtilsLoading :loading="loading" />
        <UtilsDataTable v-if="!loading" :dataTable="clientes" :rowsPerPage="7" table="cliente">
            <template #column-cliente="{ item }">
                <div class="flex items-center">
                    <img :src="item.url_foto" class="avatar avatar-pp" alt="">
                    <div>
                        <p><strong>{{ item.nome }}</strong></p>
                    </div>
                </div>
            </template>
            <template #column-telefone="{ item }">
                <p>{{ $myFunctions.formatTel(item.telefone) }}</p>
            </template>
            <template #column-último-agendamento="{ item }">
                <p>{{ $myFunctions.formatDate(item.ultimo_agendamento) }}</p>
            </template>
            <template #column-próximo-agendamento="{ item }">
                <p>{{ $myFunctions.formatDate(item.proximo_agendamento) }}</p>
            </template>
            <template #column-acoes="{ item }">
                <div class="flex space-x-2">
                    <button class="rounded-button" v-on:click="handleCreateSchedule(item)">
                        <font-awesome icon="calendar-day" class="cinza" />
                    </button>
                    <button class="rounded-button" v-on:click="handleEditCustomer(item)">
                        <font-awesome icon="user-pen" class="cinza" />
                    </button>
                </div>
            </template>
        </UtilsDataTable>
        <UtilsModal v-show="modalTitle" :title="modalTitle" :saveButton="modalSaveButton" :cancelButton="modalCancelButton" @closeModal="$myFunctions.closeModal(this)">
            <ModalContentAgenda v-if="modalContentAgenda" :event="selectedEvent" @savedContent="$myFunctions.closeModal(this, []); goToSchedule()" />
            <ModalContentClientes v-if="modalContentClientes" @savedContent="$myFunctions.closeModal(this, [], true);" />
        </UtilsModal>
    </section>
</template>

<script>
export default {
    data() {
        return {
            tabs: [
                {
                    name: "Todos os clientes",
                    quantity: 25,
                    default: true
                },
                {
                    name: "Não fidelizados",
                    quantity: 24,
                    default: false
                },
                {
                    name: "Fidelizados",
                    quantity: 1,
                    default: false
                }
            ],
            loading: true,
            modalTitle: "",
            modalSaveButton: "",
            modalCancelButton: "",
            modalContentAgenda: false,
            modalContentClientes: false,
            clientes: []
        }
    },
    methods: {
        changeCustomers: function (event) {
            let type = "";

            switch (event) {
                case 0:
                    type = "todos";
                    break;
                case 1:
                    type = "nao-fidelizados";
                    break;
                case 2:
                    type = "fidelizados";
                    break;
            }

            this.returnCustomers(type);
        },
        returnCustomers: function (type = "") {
            //Chamada para api passando o tipo de clientes que tem que retornar
            this.loading = true;

            setTimeout(() => {
                this.clientes = [
                    { id: 6, nome: 'Rina', data_nascimento: "2024-12-03", telefone: '41998564582', ultimo_agendamento: "2024-12-03 15:30:00", proximo_agendamento: "2024-12-04 15:30:00", total_agendamentos: 7, url_foto: "https://img.freepik.com/fotos-premium/uma-filmagem-em-baixo-angulo-kawaii-anime-girl-waifu-otaku_854727-5740.jpg" },
                    { id: 7, nome: 'Yuto', data_nascimento: "2024-12-03", telefone: '41998564582',ultimo_agendamento: "2024-12-03 15:30:00", proximo_agendamento: "2024-12-04 15:30:00", total_agendamentos: 2, url_foto: "https://img.freepik.com/fotos-premium/uma-filmagem-em-baixo-angulo-kawaii-anime-girl-waifu-otaku_854727-5740.jpg" }
                ]

                this.loading = false;
            }, 1000)
        },
        handleCreateSchedule: function (user) {
            user = {
                cliente_id: user.id,
                cliente_nome: user.nome,
                servico: "",
                data: moment().format("YYYY-MM-DD") + "T09:00:00",
                duracao: "",
                observacoes: ""
            }

            this.$myFunctions.openModal(this, "Criar agendamento", "Criar", "Cancelar", {}, "modalContentAgenda", user);
        },
        handleEditCustomer: function (item) {
            this.$myFunctions.openModal(this, "Alterar cliente", "Salvar", "Cancelar", {}, 'modalContentClientes', item);
        },
        goToSchedule: function () {
            setTimeout(() => {
                this.$router.push("/agenda");
            }, 400)
        },
        newCustomer: function () {
            this.$myFunctions.openModal(this, "Cadastrar cliente", "Cadastrar", "Cancelar", {}, "modalContentClientes");
        }
    }
}
</script>
<style>
.icon-filter {
    width: 35px;
    height: 35px;
    margin: 0;
}

.container {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
    max-width: 100%;
}
</style>