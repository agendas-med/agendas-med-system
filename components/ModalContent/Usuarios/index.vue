<template>
    <form id="informations-form" @submit.prevent="saveService()" :invalid="invalidForm">
        <div class="edit-event grid grid-cols-1 gap-4">
            <div class="input-group">
                <label for="nome">Nome</label>
                <input type="text" id="nome" v-model="usuario.nome" required>
            </div>
            <div class="input-group">
                <label for="email">E-mail</label>
                <input type="email" id="email" v-model="usuario.email" required>
            </div>
            <div class="input-group">
                <label for="cargo">Cargo</label>
                <select id="cargo" v-model="usuario.cargo" required>
                    <option value="1">Administrador</option>
                    <option value="2">Regular</option>
                </select>
            </div>
            <div class="input-group" v-if="usuario.senha_temporaria != undefined">
                <label for="password">Senha temporária</label>
                <input type="text" id="password" v-model="usuario.senha_temporaria" disabled>
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
                nome: "",
                email: "",
                cargo: null,
                senha_temporaria: ""
            },
            response: "",
            responseType: "",
            invalidForm: true
        }
    },
    methods: {
        saveService: function () {
            this.$myFunctions.resetResponse(this);
            this.invalidForm = false;

            console.log(this.usuario)
            this.$emit("savedContent");
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