<template>
    <section>
        <button type="button" v-on:click="newUser()" class="btn btn-primary" id="new-user">
            <font-awesome icon="plus" />
            Novo usuário
        </button>
        <UtilsLoading :loading="loading" />
        <UtilsDataTable v-if="!loading" :dataTable="usuarios" :rowsPerPage="7" table="usuário">
            <template #column-serviço="{ item }">
                <p>{{ item.nome }}</p>
            </template>
            <template #column-email="{ item }">
                <p>{{ item.email }}</p>
            </template>
            <template #column-cargo="{ item }">
                <p>{{ item.cargo == 1 ? "Administrador" : "Regular" }}</p>
            </template>
            <template #column-ações="{ item }">
                <div class="flex space-x-2">
                    <button class="rounded-button" v-on:click="handleEditUser(item)">
                        <font-awesome icon="user-pen" class="cinza" />
                    </button>
                </div>
            </template>
        </UtilsDataTable>
        <UtilsModal v-show="modalTitle" :title="modalTitle" :saveButton="modalSaveButton" :cancelButton="modalCancelButton" @closeModal="$myFunctions.closeModal(this)">
            <ModalContentUsuarios @savedContent="$myFunctions.closeModal(this, []); returnUsers();" />
        </UtilsModal>
    </section>   
</template>

<script>
export default {
    data() {
        return {
            response: "",
            responseType: "",
            loading: true,
            usuarios: [],
            modalTitle: "",
            modalSaveButton: "",
            modalCancelButton: ""
        }
    },
    mounted() {
        this.returnUsers();
    },
    methods: {
        newUser: function () {
            this.$myFunctions.openModal(this, "Cadastrar usuário", "Criar", "Cancelar");
        },
        handleEditUser: function (item) {
            this.$myFunctions.openModal(this, "Editar usuário", "Salvar", "Cancelar", {}, "", item);
        },
        returnUsers: function () { //Método para retornar os pagamentos
            this.loading = true;

            setTimeout(() => {
                this.usuarios = [
                    {
                        id: 1,
                        nome: "Saymon",
                        email: "linnubr@gmail.com",
                        cargo: 1,
                        senha_temporaria: "a7dce39b1c85d102be12"
                    },
                    {
                        id: 2,
                        nome: "Mariana",
                        email: "mariana.santos@gmail.com",
                        cargo: 2,
                        senha_temporaria: "8f43d1a1d43e0bcbe987"
                    },
                    {
                        id: 3,
                        nome: "João",
                        email: "joao.silva@gmail.com",
                        cargo: 1,
                        senha_temporaria: "2ba8f385209b74b98b23"
                    },
                    {
                        id: 4,
                        nome: "Camila",
                        email: "camila.almeida@gmail.com",
                        cargo: 2,
                        senha_temporaria: "4c0a1d63d840d02f6b4f"
                    },
                    {
                        id: 5,
                        nome: "Ricardo",
                        email: "ricardo.monteiro@gmail.com",
                        cargo: 1,
                        senha_temporaria: "3f5edca82427ed671a82"
                    }
                ]


                this.loading = false;
            }, 500)
        }
    }
}
</script>
<style scoped>
#new-user {
    position: absolute;
    right: var(--space-6);
    top: var(--space-6);
}
</style>