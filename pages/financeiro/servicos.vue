<template>
    <section>
        <button type="button" v-on:click="newService()" class="btn btn-primary" id="new-service">
            <font-awesome icon="plus" />
            Novo serviço
        </button>
        <UtilsLoading :loading="loading" />
        <UtilsDataTable v-if="!loading" :dataTable="servicos" :rowsPerPage="7" table="serviço">
            <template #column-serviço="{ item }">
                <p>{{ item.nome }}</p>
            </template>
            <template #column-duração="{ item }">
                <p>{{ $myFunctions.formatMinutesToTime(item.tempo_duracao) }}</p>
            </template>
            <template #column-observações="{ item }">
                <p>{{ item.observacoes }}</p>
            </template>
            <template #column-valor="{ item }">
                <p>{{ $myFunctions.formatCurrency(item.valor) }}</p>
            </template>
            <template #column-ações="{ item }">
                <div class="flex space-x-2">
                    <button class="rounded-button" v-on:click="handleEditService(item)">
                        <font-awesome icon="pen" class="cinza" />
                    </button>
                </div>
            </template>
        </UtilsDataTable>
        <UtilsModal v-show="modalTitle" :title="modalTitle" :saveButton="modalSaveButton" :cancelButton="modalCancelButton" @closeModal="$myFunctions.closeModal(this)">
            <ModalContentServicos @savedContent="$myFunctions.closeModal(this, []); returnServices();" />
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
            servicos: [],
            modalTitle: "",
            modalSaveButton: "",
            modalCancelButton: ""
        }
    },
    mounted() {
        this.returnServices();
    },
    methods: {
        newService: function () {
            this.$myFunctions.openModal(this, "Novo serviço", "Criar", "Cancelar");
        },
        handleEditService: function (item) {
            this.$myFunctions.openModal(this, "Editar serviço", "Salvar", "Cancelar", {}, "", item);
        },
        returnServices: function () { //Método para retornar os pagamentos
            this.loading = true;

            setTimeout(() => {
                this.servicos = [
                {
                    id: 1,
                    nome: "Corte de Cabelo Masculino",
                    tempo_duracao: 30, // em minutos
                    observacoes: "Inclui lavagem e finalização com pomada ou spray fixador.",
                    valor: 50.00
                },
                {
                    id: 2,
                    nome: "Barba Completa",
                    tempo_duracao: 45,
                    observacoes: "Aparação, hidratação e toalha quente.",
                    valor: 40.00
                },
                {
                    id: 3,
                    nome: "Corte Infantil",
                    tempo_duracao: 25,
                    observacoes: "Corte especial para crianças até 12 anos.",
                    valor: 35.00
                }
                ]

                this.loading = false;
            }, 500)
        }
    }
}
</script>
<style scoped>
#new-service {
    position: absolute;
    right: var(--space-6);
    top: var(--space-6);
}
</style>