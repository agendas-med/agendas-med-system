<template>
    <section>
        <UtilsPageheader title="Estoque" subtitle="Gerencie os produtos em estoque" />
        <br>
        <UtilsDataTable :loaded="!loading" :dataTable="estoque" :rowsPerPage="7" table="produto" newButtonText="Inserir movimentação" @handleNew="newMovement" :newButton="true">
            <template #column-produto="{ item }">
                <p>{{ $myFunctions.formatTel(item.produto) }}</p>
            </template>
            <template #column-status="{ item }">
                <p class="tag" :class="chooseTagClass(item.status)">{{ item.status }}</p>
            </template>
            <template #column-quantidade-em-estoque="{ item }">
                <p>{{ item.quantidade }}</p>
            </template>
        </UtilsDataTable>
        <UtilsModal @closeModal="$myFunctions.closeModal(this);">
            <ModalContentEstoque @savedContent="$myFunctions.closeModal(this, []); returnStock()" />
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
            estoque: []
        }
    },
    mounted() {
        this.returnStock();
    },
    methods: {
        newMovement: function () {
            this.$myFunctions.openModal(this, "Inserir movimentação", "Inserir", "Cancelar");
        },
        chooseTagClass: function (status) {
            switch (status) {
                case "Vazio":
                    return "red";
                case "Normal":
                    return "green";
            }
        },
        returnStock: function () {
            let self = this;

            this.$base.api.get("/stock").then(function(response){            
                self.estoque = response.data.returnObj;
                self.loading = false;
            })
        }
    }
}
</script>
<style scoped>

</style>