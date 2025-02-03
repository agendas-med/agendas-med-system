<template>
    <section>
        <UtilsPageheader title="Meu perfil" subtitle="Gerencie suas informações pessoais, preferências e configurações da sua conta." />
        <UtilsTabs :tabs="tabs" @changedTab="$myFunctions.goToSubRoute(this, $event, 'perfil', tabs)" />
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
                        <input type="text" id="cep" v-model="user.cep" required>
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
                            <option :value="state.sigla" v-for="(state, index) in $global.value.estados" :key="index">{{ state.nome }}</option>
                        </select>
                    </div>
                    <div class="input-group"> 
                        <label for="country">País</label>
                        <input type="text" id="country" v-model="user.country" required>
                    </div>
                    <div class="input-group">
                        <button type="submit" class="btn btn-primary">Salvar</button>
                    </div>
                </div>
            </form>
            <p class="fontsize-sm cinza mt-10">SEGURANÇA DA CONTA</p>
            <button type="button" class="btn btn-primary-alt my-4" v-on:click="resetPassword()">
                <font-awesome icon="user-lock" />
                Redefinir senha
            </button>
        </div>
    </section>   
</template>

<script>
export default {
    data() {
        return {
            tabs: [
                {
                    name: "Perfil",
                    quantity: null,
                    route: "",
                    default: true
                }
            ]
        }
    },
    watch: {
        "user.cep": function () {
            this.user.cep = this.user.cep.replace(/\D/g, '');

            if (this.user.cep.length == 8) {
                this.user.cep = this.user.cep.replace(/(\d{5})(\d{3})/, '$1-$2');

                //Executa busca automatica do cep
                console.log(this.user.cep)
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
        changeProfileInformations: function () {
            console.log(this.user)
        },
        resetPassword: function () {
            console.log("Alterar senha");
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