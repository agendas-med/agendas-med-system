<template>
    <div class="exclude-modal-content">
        <div class="exclude-icon">
            <font-awesome icon="trash" class="vermelho fontsize-lg" />
        </div>
        <div class="texts">
            <h2 class="fontsize-md-bold">Tem certeza que deseja excluir?</h2>
            <h3>Essa ação é irreversível</h3>
        </div>

        <input type="submit" id="submit-button" v-on:click="deleteItem()" style="display: none;">
    </div>
</template>

<script>
export default {
    emit: ["excludedContent"],
    props: ["excludepath"],
    methods: {
        deleteItem: function () {
            let self = this;

            self.$base.api.delete(self.excludepath).then((response) => {
                self.$myFunctions.stopModalLoading(self);

                self.$emit("excludedContent", true);

                const msg = response.data.message || "Registro excluído com sucesso.";
                self.$myFunctions.showFeedbackModal(self, "Sucesso!", msg, "success");

            }).catch((error) => {
                self.$myFunctions.stopModalLoading(self);

                const errorMsg = error.response?.data?.message || error.response?.data || "Ocorreu um erro ao tentar excluir.";
                self.$myFunctions.showFeedbackModal(self, "Não foi possível excluir", errorMsg, "error");
            });
        }
    }
}
</script>

<style scoped>
.exclude-modal-content {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    text-align: center;
    height: 100%;
}

.exclude-icon {
    background: var(--vermelho-claro-2);
    width: 80px;
    height: 80px;
    min-height: 80px;
    border-radius: var(--radius-full);
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: var(--space-5);
}
</style>