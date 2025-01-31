<template>
    <form id="informations-form" @submit.prevent="saveCustomer()" :invalid="invalidForm">
        <div class="edit-event grid grid-cols-1 gap-4">
            <div class="input-group">
                <label for="name">Nome</label>
                <input type="text" id="name" required v-model="customer.name">
            </div>
            <div class="input-group">
                <label for="birthday">Data de nascimento</label>
                <input type="date" id="birthday" required v-model="customer.birthday">
            </div>
            <div class="input-group">
                <label for="tel">Telefone</label>
                <input type="text" id="tel" required v-model="customer.tel" @input="$myFunctions.formatTelInput($event, customer.tel)">
            </div>
            <div class="input-group">
                <label>Foto de perfil</label>
                <div class="flex items-center mt-2">
                    <img :src="customer.image != undefined ? customer.image : defaultUserImage" class="avatar avatar-g">
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
        customer: function () {
            return reactive(this.$global.contentObject);
        }
    },
    methods: {
        saveCustomer: function () {
            this.$myFunctions.resetResponse(this);
            this.invalidForm = false;

            console.log(this.customer)
            this.$emit("savedContent");
        },
        onFileChange(event) {
            const file = event.target.files[0]; // Obtém o arquivo selecionado

            if (file && file.type.startsWith("image/")) {
                const reader = new FileReader();

                reader.onload = (e) => {
                    this.customer.image = e.target.result; // Define a URL base64 no estado
                };

                reader.readAsDataURL(file); // Lê o arquivo como um Data URL (base64)
            }
        },
    },
    mounted: function () {
        $("#name").focus();
        if (this.customer.tel != undefined) {
            $("#tel").val(this.$myFunctions.formatTel(this.customer.tel));
        }
    }
}
</script>
<style scoped>
</style>