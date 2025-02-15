<template>
    <form id="informations-form" @submit.prevent="saveUser()" :invalid="invalidForm">
        <div class="edit-event grid grid-cols-1 gap-4">
            <div class="input-group">
                <label for="email">Usuário</label>
                <UtilsAjaxAutocomplete @select="setUser($event)" ajaxtype="usuarios" :entityid="usuario.id" :entityname="usuario.name" :required="true" />
            </div>
            <div class="input-group">
                <label for="cargo">Cargo</label>
                <select id="cargo" v-model="usuario.role" required>
                    <option value="1">Administrador</option>
                    <option value="2">Regular</option>
                </select>
            </div>
            <div class="input-group" v-if="usuario.temporary_password != undefined">
                <label for="password">Senha temporária</label>
                <input type="text" id="password" v-model="usuario.temporary_password" disabled>
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
                id: null,
                name: "",
                email: "",
                role: null,
                temporary_password: ""
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

            self.$base.api.post("/companies/invite_user", self.usuario).then((response) => {
                self.$myFunctions.setResponse(self, "Usuário convidado para a empresa com sucesso", "success");
                self.$emit("savedContent");
            }).catch((error) => {
                self.$myFunctions.setResponse(self, error.response.data, "error");
            })
        },
        setUser: function (event) {
            this.usuario = {...this.usuario, email: event.name, name: event.name};
        }
    },
    mounted: function () {
        this.usuario = reactive(this.$global.contentObject);
        $("#nome").focus();
    }
}
</script>
<style scoped>
</style>