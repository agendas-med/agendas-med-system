<template>
    <form id="informations-form" @submit.prevent="saveRole()">
        <div class="edit-event grid grid-cols-1 gap-4">
            <div class="input-group">
                <label for="name">Nome</label>
                <input type="text" id="name" required v-model="role.name">
            </div>
            <div class="input-group">
                <label for="permission">Permissão <font-awesome icon="circle-info" class="cinza" title="Define se o usuário possui acesso administrativo à empresa. Usuários com permissão de administrador podem gerenciar configurações e outros usuários da empresa." /></label>
                <select id="permission" v-model="role.permission" required>
                    <option value="">* Selecione *</option>
                    <option value="0">Não</option>
                    <option value="1">Sim</option>
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
            response: "",
            responseType: "",
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

            self.$myFunctions.resetResponse(this);

            self.$base.api.post("/companies/roles" + (self.isEdit ? "/" + self.role.id : ""), self.role) 
            .then(function (response) { 
                self.$myFunctions.setResponse(self, response.data.message, "success");                
                self.$emit("savedContent");
            }).catch((error) => {
                self.$myFunctions.setResponse(self, error.response.data, "error");
            })
        }
    },
    mounted: function () {
        $("#name").focus();
    }
}
</script>
<style scoped>
</style>