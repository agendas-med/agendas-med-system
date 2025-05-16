<template>
    <section>
        <UtilsPageheader title="Meu perfil" subtitle="Gerencie suas informações pessoais, preferências e configurações da sua conta." />
        <div class="profile-header flex items-center">
            <img :src="user.url_photo" class="avatar avatar-g">
            <div class="profile-header-informations">
                <p class="fontsize-lg cinza">{{ user.name }}</p>
                <p class="fontsize-sm cinza">{{ user.email }}</p>
            </div>
        </div>
        <div class="profile-informations">
            <p class="fontsize-sm cinza">INFORMAÇÕES PESSOAIS</p>
            <form @submit.prevent="changeProfileInformations">
                <div class="input-list grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div class="input-group">
                        <label for="tel">Telefone</label>
                        <input type="tel" id="tel" v-model="user.tel" @input="$myFunctions.formatTelInput($event, user.tel)" required>
                    </div>
                    <div class="input-group"> 
                        <label for="cep">CEP</label>
                        <input type="text" id="cep" v-model="user.zip_code" required>
                    </div>
                    <div class="input-group"> 
                        <label for="adress">Endereço</label>
                        <input type="text" id="adress" v-model="user.address" required>
                    </div>
                    <div class="input-group"> 
                        <label for="city">Cidade</label>
                        <input type="text" id="city" v-model="user.city" required>
                    </div>
                    <div class="input-group"> 
                        <label for="state">Estado</label>
                        <select id="state" v-model="user.state" required>
                            <option value="">* Selecione *</option>
                            <option :value="state.sigla" v-for="(state, index) in $global.estados" :key="index">{{ state.nome }}</option>
                        </select>
                    </div>
                    <UtilsLoadingResponse :msg="response" :type="responseType" :loading="loading" @eraseError="$myFunctions.resetResponse(this)" />
                    <div class="input-group">
                        <button type="submit" class="btn btn-primary">Salvar</button>
                    </div>
                </div>
            </form>
            <p class="fontsize-sm cinza mt-10">SEGURANÇA DA CONTA</p>
            <button type="button" class="btn btn-primary-alt my-4" v-on:click="handleResetPassword()">
                <font-awesome icon="user-lock" />
                Redefinir senha
            </button>
            <UtilsModal v-show="modalTitle" :internalTitle="internalTitle" :title="modalTitle" :saveButton="modalSaveButton" :cancelButton="modalCancelButton" @confirm="resetPassword()" @closeModal="$myFunctions.closeModal(this)"></UtilsModal>
        </div>
    </section>   
</template>

<script>
export default {
    data() {
        return {
            response: "",
            loading: false,
            responseType: "",
            modalTitle: "",
            modalSaveButton: "",
            modalCancelButton: "",
            internalTitle: ""
        }
    },
    watch: {
        "user.zip_code": function () {
            this.user.zip_code = this.user.zip_code.replace(/\D/g, '');

            if (this.user.zip_code.length == 8) {
                this.user.zip_code = this.user.zip_code.replace(/(\d{5})(\d{3})/, '$1-$2');

                this.$myFunctions.getAddressData(this.user.zip_code).then((results) => {
                    this.user.address = results.logradouro;
                    this.user.city = results.localidade;
                    this.user.state = results.uf;
                })
            }
        }
    },
    computed: {
        user: function () {
            return reactive(JSON.parse(JSON.stringify(this.$global.user)));
        }
    },
    mounted() {
    },
    beforeDestroy() {
    },
    methods: {
        resetPassword: function () {
            let self = this;

            self.loading = true;

            this.$base.api.post("/users/request-reset-password", { email: self.$global.user.email }).then(function(response){            
                self.$myFunctions.setResponse(self, response.data.message, "success");   
                self.loading = false;
            })
        },
        changeProfileInformations: function () {
            let self = this;

            let data = {
                address: this.user.address,
                zip_code: this.user.zip_code,
                city: this.user.city,
                state: this.user.state,
                tel: this.user.tel
            }

            this.$myFunctions.resetResponse(this);
            this.loading = true;

            this.$base.api.post("/users/change-profile", data)
            .then(function(response){            
                self.$myFunctions.setResponse(self, response.data.message, "success");        
            }).catch(() => {
                self.$myFunctions.setResponse(self, "Ocorreu um erro ao salvar as informações", "error");
            }).then(() => {
                self.loading = false;
                self.$myFunctions.getUser();
            })
        },
        handleResetPassword: function () {
            this.$myFunctions.openModal(this, "Confirmar ação?", "Confirmar", "Cancelar", {}, "", { internalTitle: "Tem certeza que deseja solicitar a redefinição de senha?" });
        }
    }
}
</script>
<style scoped>
.profile-header {
    margin: var(--space-7) 0;
}

.profile-informations > p {
    margin-bottom: var(--space-3);
}

.avatar {
    margin-right: var(--space-6);
}
</style>