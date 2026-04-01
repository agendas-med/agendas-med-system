<template>
    <form id="informations-form" @submit.prevent="saveRole()">
        <div class="edit-event grid grid-cols-1 gap-4">
            <div class="input-group">
                <label for="name">Nome</label>
                <input type="text" id="name" required v-model="role.name">
            </div>
            <div class="input-group">
                <label for="permission">Permissão <font-awesome icon="circle-info" class="cinza"
                        title="Define se o usuário possui acesso administrativo à empresa. Usuários com permissão de administrador podem gerenciar configurações e outros usuários da empresa." /></label>
                <select id="permission" v-model="role.permission" required>
                    <option value="">* Selecione *</option>
                    <option value="0">Membro</option>
                    <option value="1">Administrador</option>
                </select>
            </div>
        </div>
        <input type="submit" id="submit-button" />
    </form>

</template>
<script>
export default {
    emits: ["savedContent"],
    data() {
        return {
            isEdit: this.$global.contentObject.id != 0
        }
    },
    computed: {
        role: function () {
            return this.isEdit ? reactive(this.$global.contentObject) : reactive({ name: "", permission: "", create_date: moment().format("YYYY-MM-DD HH:mm:ss") });
        }
    },
    methods: {
        saveRole: function () {
            let self = this;

            let data = {
                id: self.role.id,
                name: self.role.name,
                permission: self.role.permission
            }

            self.$base.api.post("/companies/roles" + (self.isEdit ? "/" + self.role.id : ""), data)
                .then(function (response) {
                    self.$emit("savedContent");
                    self.$myFunctions.showFeedbackModal(self, "Sucesso", response.data.message || "Cargo salvo com sucesso.", "success");
                }).catch((error) => {
                    self.$myFunctions.stopModalLoading(self);
                    self.$myFunctions.showFeedbackModal(self, "Erro", error.response?.data || "Ocorreu um erro ao salvar cargo.", "error");
                });
        }
    },
    mounted: function () {
        $("#name").focus();
    }
}
</script>
<style scoped></style>