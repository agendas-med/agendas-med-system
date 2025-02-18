<template>
    <section>
        <UtilsDataTable :loaded="!loading" :dataTable="users" :rowsPerPage="7" table="usuário" @handleNew="newUser" :newButton="true">
            <template #column-serviço="{ item }">
                <p>{{ item.name }}</p>
            </template>
            <template #column-email="{ item }">
                <p>{{ item.email }}</p>
            </template>
            <template #column-cargo="{ item }">
                <p>{{ item.roleName }}</p>
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
            <ModalContentConfigUsuarios @savedContent="$myFunctions.closeModal(this, []); returnUsers();" />
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
            users: [],
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
        returnUsers: function () {
            let self = this;

            self.loading = true;
            
            self.$base.api.get("/companies/return_users", self.usuario).then((response) => {
                self.users = response.data.returnObj;
                self.$emit("savedContent");
            }).catch((error) => {
                console.log(error.response.data)
            }).then(() => {
                self.loading = false;
            })
        }
    }
}
</script>