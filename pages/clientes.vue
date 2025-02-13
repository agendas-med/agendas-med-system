<template>
    <section>
        <div class="flex items-center justify-between">
            <UtilsPageheader title="Clientes" subtitle="Veja todas as informações dos seus clientes" />
            <button type="button" v-on:click="newCustomer()" class="btn btn-primary">
                <font-awesome icon="plus" />
                Cadastrar cliente
            </button>
        </div>
        <UtilsTabs :tabs="tabs" @changedTab="changeCustomers($event)" />
        <UtilsDataTable :loaded="!loading" :dataTable="clientes" :rowsPerPage="7" table="cliente">
            <template #column-cliente="{ item }">
                <div class="flex items-center">
                    <img :src="item.image" class="avatar avatar-pp" alt="">
                    <div>
                        <p><strong>{{ item.name }}</strong></p>
                    </div>
                </div>
            </template>
            <template #column-telefone="{ item }">
                <p>{{ $myFunctions.formatTel(item.tel) }}</p>
            </template>
            <template #column-último-agendamento="{ item }">
                <p>{{ $myFunctions.formatDate(item.last_appointment) }}</p>
            </template>
            <template #column-próximo-agendamento="{ item }">
                <p>{{ $myFunctions.formatDate(item.next_appointment) }}</p>
            </template>
            <template #column-ações="{ item }">
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
            <ModalContentAgenda v-if="modalContentAgenda" :event="selectedEvent" @savedContent="$myFunctions.closeModal(this, [], true); goToSchedule()" />
            <ModalContentClientes v-if="modalContentClientes" @savedContent="$myFunctions.closeModal(this, []);" />
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
                    { id: 6, name: 'Rina', birthday: "2024-12-03", tel: '41998564582', last_appointment: "2024-12-03 15:30:00", next_appointment: "2024-12-04 15:30:00", all_appointments: 7, image: "https://img.freepik.com/fotos-premium/uma-filmagem-em-baixo-angulo-kawaii-anime-girl-waifu-otaku_854727-5740.jpg" },
                    { id: 7, name: 'Yuto', birthday: "2024-12-03", tel: '41998564582',last_appointment: "2024-12-03 15:30:00", next_appointment: "2024-12-04 15:30:00", all_appointments: 2, image: "https://img.freepik.com/fotos-premium/uma-filmagem-em-baixo-angulo-kawaii-anime-girl-waifu-otaku_854727-5740.jpg" },
                    { id: 8, name: 'Miyo', birthday: "2024-12-03", tel: '41998564582',last_appointment: "2024-12-03 15:30:00", next_appointment: "2024-12-04 15:30:00", all_appointments: 2, image: "https://img.freepik.com/fotos-premium/uma-filmagem-em-baixo-angulo-kawaii-anime-girl-waifu-otaku_854727-5740.jpg" }
                ]

                this.loading = false;
            }, 1000)
        },
        handleCreateSchedule: function (user) {
            let rowUser = {
                customer_id: user.id,
                customer_name: user.name,
                service: "",
                date: moment().format("YYYY-MM-DD") + "T09:00:00",
                duration: "",
                observations: ""
            }

            this.$myFunctions.openModal(this, "Criar agendamento", "Criar", "Cancelar", {}, "modalContentAgenda", rowUser);
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