<template>
    <section>
        <UtilsDataTable :loaded="true" :dataTable="roles" :rowsPerPage="7" table="cargo" @handleNew="newRole" :newButton="true">
            <template #column-nome="{ item }">
                <p>{{ item.name }}</p>
            </template>
            <template #column-permissão="{ item }">
                <p>{{ item.permission == 1 ? "Sim" : "Não" }}</p>
            </template>
            <template #column-data-de-criação="{ item }">
                <p>{{ $myFunctions.formatDate(item.create_date) }}</p>
            </template>
            <template #column-ações="{ item }">
                <div class="flex space-x-2">
                    <button class="rounded-button" v-on:click="handleEditRole(item)">
                        <font-awesome icon="pen" class="cinza" />
                    </button>
                    <button class="rounded-button" v-on:click="handleDeleteRole(item)">
                        <font-awesome icon="trash" class="vermelho" />
                    </button>
                </div>
            </template>
        </UtilsDataTable>
        <UtilsModal excludepath="/companies/roles/" @closeModal="$myFunctions.closeModal(this);" @excluded="$myFunctions.getCompany(this)">
            <ModalContentConfigCargos @savedContent="$myFunctions.closeModal(this, []); $myFunctions.getCompany(this)" />
        </UtilsModal>
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
        roles: function () {
            return this.$global.company.roles;
        }   
    },
    methods: {
        newRole: function () {
            this.$myFunctions.openModal(this, "Cadastrar cargo", "Criar", "Cancelar");
        },
        handleEditRole: function (item) {
            this.$myFunctions.openModal(this, "Editar cargo", "Salvar", "Cancelar", {}, "", item);
        },
        handleDeleteRole: function (item) {
            this.$myFunctions.openModal(this, "Excluir cargo", "Excluir", "Cancelar", {}, "", item);
        }
    }
}
</script>