<template>
    <section>
        <UtilsPageheader title="Clientes" subtitle="Veja todas as informações dos seus clientes" />
        <UtilsTabs :tabs="tabs" @changedTab="changeCustomers($event)" />
        <UtilsDataTable :loaded="!loading" :dataTable="filteredClientes" :rowsPerPage="7" :newButton="true" @handleNew="newCustomer" table="cliente">
            <template #column-cliente="{ item }">
                <div class="flex items-center">
                    <img :teste="item.image" :src="item.image == '' ? defaultUserImage : item.image" class="avatar avatar-pp">
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
                    <button class="rounded-button" v-on:click="handleDeleteCustomer(item)">
                        <font-awesome icon="trash" class="vermelho" />
                    </button>
                    <button class="rounded-button" v-on:click="handleEditCustomer(item)">
                        <font-awesome icon="user-pen" class="cinza" />
                    </button>
                </div>
            </template>
        </UtilsDataTable>
        <UtilsModal excludepath="/customers/" @closeModal="$myFunctions.closeModal(this); returnCustomers()">
            <ModalContentAgenda v-if="modalContentAgenda" :event="selectedEvent" @savedContent="$myFunctions.closeModal(this, [], true); goToSchedule()" />
            <ModalContentClientes v-if="modalContentClientes" @savedContent="$myFunctions.closeModal(this, []); returnCustomers()" />
        </UtilsModal>
    </section>
</template>

<script>
import defaultUserImage from '@/assets/img/default-user-image.png';

export default {
    data() {
        return {
            defaultUserImage: defaultUserImage,
            tabs: [
                {
                    name: "Todos os clientes",
                    quantity: null,
                    default: true
                },
                {
                    name: "Já agendaram",
                    quantity: null,
                    default: false
                },
                {
                    name: "Nunca agendaram",
                    quantity: null,
                    default: false
                }
            ],
            loading: true,
            modalContentAgenda: false,
            modalContentClientes: false,
            clientes: [],
            filteredClientes: []
        }
    },
    mounted: function () {
        this.returnCustomers();
    },
    methods: {
        changeCustomers: function (event) {
            if (this.clientes.length == 0) return;

            switch (event) {
                case 0: //todos
                    this.filteredClientes = this.clientes;
                    break;
                case 1: //fidelizados
                    this.filteredClientes = this.clientes.filter((cliente) => { return cliente.last_appointment != "" || cliente.next_appointment != "" });
                    break;
                case 2: //nao-fidelizados
                    this.filteredClientes = this.clientes.filter((cliente) => { return cliente.last_appointment == "" && cliente.next_appointment == "" });
                    break;
            }
        },
        returnCustomers: function () {
            let self = this;

            this.$base.api.get("/customers").then(function(response){            
                self.clientes = response.data.returnObj;
                self.filteredClientes = response.data.returnObj;
                self.loading = false;
            })
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
        handleDeleteCustomer: function (item) {
            this.$myFunctions.openModal(this, "Excluir cliente", "Excluir", "Cancelar", {}, "", item);
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