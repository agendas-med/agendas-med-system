<template>
    <form id="informations-form" @submit.prevent="savePatient()" :invalid="invalidForm">
        <div class="edit-event grid grid-cols-1 gap-4">
            <div class="input-group">
                <label for="name">Nome</label>
                <input type="text" id="name" required v-model="patient.nome">
            </div>
            <div class="input-group">
                <label for="birthday">Data de nascimento</label>
                <input type="date" id="birthday" required v-model="patient.data_nascimento">
            </div>
            <div class="input-group">
                <label for="tel">Telefone</label>
                <input type="text" id="tel" required v-model="patient.telefone" @input="$myFunctions.formatTelInput($event, patient.telefone)">
            </div>
            <div class="input-group">
                <label>Foto de perfil</label>
                <div class="flex items-center mt-2">
                    <img :src="patient.url_foto != undefined ? patient.url_foto : defaultUserImage" class="avatar avatar-g">
                    <input type="file" @change="onFileChange" accept="image/*">
                </div>
            </div>
            <UtilsLoadingResponse :msg="response" :type="responseType" styletype="small" @eraseError="$myFunctions.resetResponse(this)" />
        </div>
        <input type="submit" id="submit-button" />
    </form>
    
</template>
<script>
import defaultUserImage from '@/assets/img/default-user-image.png';

export default {
    data() {
        return {
            response: "",
            responseType: "",
            invalidForm: true,
            defaultUserImage: defaultUserImage
        }
    },
    computed: {
        patient: function () {
            return reactive(this.$global.contentObject);
        }
    },
    methods: {
        savePatient: function () {
            this.$myFunctions.resetResponse(this);
            this.invalidForm = false;

            console.log(this.patient)
            this.$emit("savedContent");
        },
        onFileChange(event) {
            const file = event.target.files[0]; // Obtém o arquivo selecionado

            if (file && file.type.startsWith("image/")) {
                const reader = new FileReader();

                reader.onload = (e) => {
                    this.patient.url_foto = e.target.result; // Define a URL base64 no estado
                };

                reader.readAsDataURL(file); // Lê o arquivo como um Data URL (base64)
            }
        },
    },
    mounted: function () {
        $("#name").focus();
    }
}
</script>
<style scoped>
</style>