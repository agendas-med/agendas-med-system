<template>
    <section>
        <div class="flex items-center justify-between">
            <UtilsPageheader title="Pacientes" subtitle="Veja todas as informações dos seus pacientes" />
            <button type="button" v-on:click="newPatient()" class="btn btn-primary">
                <font-awesome icon="plus" />
                Adicionar
            </button>
        </div>
        <UtilsTabs :tabs="tabs" @changedTab="$myFunctions.goToSubRoute(this, $event, 'pacientes', tabs)" />
        <NuxtPage/>
        <UtilsModal v-show="modalTitle" :title="modalTitle" :saveButton="modalSaveButton" :cancelButton="modalCancelButton" @closeModal="$myFunctions.closeModal(this)">
            <ModalContentPacientes @savedContent="$myFunctions.closeModal(this, [], true);" />
        </UtilsModal>
    </section>
</template>

<script>
export default {
    data() {
        return {
            modalTitle: "",
            modalSaveButton: "",
            modalCancelButton: "",
            tabs: [
                {
                    name: "Todos os clientes",
                    quantity: 25,
                    route: "todos",
                    default: true
                },
                {
                    name: "Não fidelizados",
                    route: "nao-fidelizados",
                    quantity: 24,
                    default: false
                },
                {
                    name: "Fidelizados",
                    route: "fidelizados",
                    quantity: 1,
                    default: false
                }
            ]       
        }
    },
    methods: {
        newPatient: function () {
            this.$myFunctions.openModal(this, "Cadastrar paciente", "Cadastrar", "Cancelar");
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