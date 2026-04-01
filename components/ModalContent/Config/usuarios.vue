<template>
    <form id="informations-form" @submit.prevent="saveUser()" :invalid="invalidForm">
        <div class="edit-event grid grid-cols-1 gap-4">
            <div class="input-group">
                <label for="email">Usuário</label>
                <UtilsAjaxAutocomplete @select="setUser($event)" ajaxtype="usuarios" :entityid="usuario.id"
                    :entityname="usuario.name" :handledisabled="usuario.id != 0" :required="true" />
            </div>
            <div class="input-group">
                <label for="cargo">Cargo</label>
                <select id="cargo" v-model="usuario.role" required>
                    <option value="">* Selecione *</option>
                    <option v-for="(role, index) in $global.company.roles" :value="role.id">{{ role.name }}</option>
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
            usuario: {
                id: 0,
                name: "",
                email: "",
                role: ""
            },
            invalidForm: true
        }
    },
    methods: {
        saveUser: function () {
            let self = this;
            self.invalidForm = false;

            if ($(".ajax-autocomplete").attr("invalid") == "true") {
                self.invalidForm = true;
                self.$myFunctions.stopModalLoading(self);
                self.$myFunctions.showFeedbackModal(self, "Atenção", "O campo usuário não pode ser vazio.", "warning");
                return;
            }

            let path = "invite_user";

            if (this.usuario.id != 0) {
                path = "change_user_role";
            }

            let data = {
                id: this.usuario.id,
                name: this.usuario.name,
                email: this.usuario.email,
                role: this.usuario.role
            }

            self.$base.api.post("/companies/" + path, data).then((response) => {
                self.$emit("savedContent");
                self.$myFunctions.showFeedbackModal(self, "Sucesso", this.usuario.id != 0 ? "Usuário alterado com sucesso." : "Usuário convidado para a empresa com sucesso.", "success");
            }).catch((error) => {
                self.$myFunctions.stopModalLoading(self);
                self.$myFunctions.showFeedbackModal(self, "Erro", error.response?.data || "Ocorreu um erro ao salvar usuário.", "error");
            });
        },
        setUser: function (event) {
            this.usuario = { ...this.usuario, email: event.email || event.name, name: event.name };
        }
    },
    mounted: function () {
        nextTick(() => {
            this.usuario = reactive(Object.assign(this.usuario, this.$global.contentObject));
            $("#nome").focus();
        })
    }
}
</script>
<style scoped></style>