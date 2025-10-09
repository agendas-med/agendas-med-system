<template>
    <section>
        <UtilsDataTable :loaded="true" :dataTable="products" :rowsPerPage="7" table="produto" @handleNew="newProduct"
            :newButton="true">
            <template #column-nome="{ item }">
                <p>{{ item.name }}</p>
            </template>
            <template #column-descrição="{ item }">
                <p>{{ item.description }}</p>
            </template>
            <template #column-valor="{ item }">
                <p>{{ $myFunctions.formatCurrency(item.value) }}</p>
            </template>
            <template #column-custo="{ item }">
                <p>{{ $myFunctions.formatCurrency(item.cost) }}</p>
            </template>
            <template #column-unidade-de-medida="{ item }">
                <p>{{ item.unit_of_measure_name }} ({{ item.unit_of_measure_abbreviation }})</p>
            </template>
            <template #column-ações="{ item }">
                <div class="flex space-x-2">
                    <button class="rounded-button" v-on:click="handleEditProduct(item)">
                        <font-awesome icon="pen" class="cinza" />
                    </button>
                    <button class="rounded-button" v-on:click="handleDeleteProduct(item)">
                        <font-awesome icon="trash" class="vermelho" />
                    </button>
                </div>
            </template>
        </UtilsDataTable>
        <UtilsModal excludepath="/companies/products/" @closeModal="$myFunctions.closeModal(this);"
            @excluded="$myFunctions.getCompany(this)">
            <ModalContentConfigProdutos
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
        products: function () {
            return this.$global.company.products;
        }
    },
    methods: {
        newProduct: function () {
            this.$myFunctions.openModal({
                instance: this,
                title: "Cadastrar produto",
                saveButton: "Criar",
                cancelButton: "Cancelar"
            });
        },
        handleEditProduct: function (item) {
            this.$myFunctions.openModal({
                instance: this,
                title: "Editar produto",
                saveButton: "Salvar",
                cancelButton: "Cancelar",
                contentObject: item
            });
        },
        handleDeleteProduct: function (item) {
            this.$myFunctions.openModal({
                instance: this,
                title: "Excluir produto",
                saveButton: "Excluir",
                cancelButton: "Cancelar",
                contentObject: item
            });
        }
    }
}
</script>