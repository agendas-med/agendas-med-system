<template>
    <section>
        <UtilsDataTable :loaded="true" :dataTable="services" :rowsPerPage="7" table="serviço" @handleNew="newService"
            :newButton="true">
            <template #column-nome="{ item }">
                <p>{{ item.name }}</p>
            </template>
            <template #column-duração="{ item }">
                <p>{{ $myFunctions.formatDuration(item.duration) }}h</p>
            </template>
            <template #column-observações="{ item }">
                <p>{{ item.observations }}</p>
            </template>
            <template #column-valor="{ item }">
                <p>{{ $myFunctions.formatCurrency(item.value) }}</p>
            </template>
            <template #column-custo="{ item }">
                <p>{{ $myFunctions.formatCurrency(item.cost) }}</p>
            </template>
            <template #column-ações="{ item }">
                <div class="flex space-x-2">
                    <button class="rounded-button" v-on:click="handleEditService(item)">
                        <font-awesome icon="pen" class="cinza" />
                    </button>
                    <button class="rounded-button" v-on:click="handleDeleteService(item)">
                        <font-awesome icon="trash" class="vermelho" />
                    </button>
                </div>
            </template>
        </UtilsDataTable>
        <UtilsModal excludepath="/companies/services/" @closeModal="$myFunctions.closeModal(this);"
            @excluded="$myFunctions.getCompany(this)">
            <ModalContentConfigServicos
                @savedContent="$myFunctions.closeModal(this, []); $myFunctions.getCompany(this)" />
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
        services: function () {
            return this.$global.company.services;
        }
    },
    methods: {
        newService: function () {
            this.$myFunctions.openModal({
                instance: this,
                title: "Cadastrar serviço",
                saveButton: "Criar",
                cancelButton: "Cancelar"
            });
        },
        handleEditService: function (item) {
            this.$myFunctions.openModal({
                instance: this,
                title: "Editar serviço",
                saveButton: "Salvar",
                cancelButton: "Cancelar",
                contentObject: item
            });
        },
        handleDeleteService: function (item) {
            this.$myFunctions.openModal({
                instance: this,
                title: "Excluir serviço",
                saveButton: "Excluir",
                cancelButton: "Cancelar",
                contentObject: item
            });
        }
    }
}
</script>