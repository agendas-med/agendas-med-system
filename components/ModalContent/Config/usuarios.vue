<template>
    <form id="informations-form" @submit.prevent="saveUser()" :invalid="invalidForm">
        <div class="edit-event grid grid-cols-1 gap-4">
            <div class="input-group">
                <label for="email">Usuário</label>
                <UtilsAjaxAutocomplete @select="setUser($event)" ajaxtype="usuarios" :entityid="usuario.id" :entityname="usuario.name" :handledisabled="usuario.id != 0" :required="true" />
            </div>
            <div class="input-group">
                <label for="cargo">Cargo</label>
                <select id="cargo" v-model="usuario.role" required>
                    <option value="">* Selecione *</option>
                    <option v-for="(role, index) in $global.company.roles" :value="role.id">{{ role.name }}</option>
                </select>
            </div>
            <UtilsLoadingResponse :msg="response" :type="responseType" styletype="small" @eraseError="$myFunctions.resetResponse(this)" />
        </div>
        <input type="submit" id="submit-button" />
    </form>
</template>
<script>
export default {
    data() {
        return {
            usuario: {
                id: 0,
                name: "",
                email: "",
                role: ""
            },
            response: "",
            responseType: "",
            invalidForm: true
        }
    },
    methods: {
        saveUser: function () {
            let self = this;

            self.$myFunctions.resetResponse(this);
            self.invalidForm = false;
            
            if ($(".ajax-autocomplete").attr("invalid") == "true") {
                self.$myFunctions.setResponse(self, "Campo usuário não pode ser vazio", "error");
                self.invalidForm = true;

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
                self.$myFunctions.setResponse(self, this.usuario.id != null ? "Usuário alterado com sucesso" : "Usuário convidado para a empresa com sucesso", "success");
                self.$emit("savedContent");
            }).catch((error) => {
                self.$myFunctions.setResponse(self, error.response.data, "error");
            })
        },
        setUser: function (event) {
            this.usuario = {...this.usuario, email: event.email || event.name, name: event.name};
        }
    },
    mounted: function () {
        this.usuario = reactive(Object.assign({}, this.$global.contentObject, this.usuario));
        $("#nome").focus();
    }
}
</script>
<style scoped>
</style>