<template>
    <section>
        <div class="profile-configurations">
            <form @submit.prevent="changeCompanyConfigurations">
                <p class="fontsize-sm cinza mt-8">INFORMAÇÕES PRINCIPAIS</p>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div class="form-group">
                        <label for="name" class="block">Nome</label>
                        <input type="text" v-model="company.name" id="name" required placeholder="Ex. Cognito.inc"
                            class="w-full p-2 border rounded-md">
                    </div>
                    <div class="form-group">
                        <label for="role" class="block">Tipo de negócio</label>
                        <select id="role" v-model="company.business_type" required class="w-full p-2 border rounded-md">
                            <option value="">* Selecione *</option>
                            <option :value="type.id" v-for="(type, index) in $global.business_types.types" :key="index">
                                {{ type.name }}</option>
                        </select>
                    </div>

                    <div class="form-group">
                        <label for="cep" class="block">CEP</label>
                        <input type="text" id="cep" v-model="company.zip_code" required
                            class="w-full p-2 border rounded-md">
                    </div>

                    <div class="form-group">
                        <label for="address" class="block">Endereço</label>
                        <input type="text" id="address" v-model="company.address" required
                            class="w-full p-2 border rounded-md">
                    </div>

                    <div class="form-group">
                        <label for="city" class="block">Cidade</label>
                        <input type="text" id="city" v-model="company.city" required
                            class="w-full p-2 border rounded-md">
                    </div>

                    <div class="form-group">
                        <label for="state" class="block">Estado</label>
                        <select id="state" v-model="company.state" required class="w-full p-2 border rounded-md">
                            <option value="">* Selecione *</option>
                            <option :value="state.sigla" v-for="(state, index) in $global.estados" :key="index">{{
                                state.nome }}</option>
                        </select>
                    </div>
                </div>
                <p class="fontsize-sm cinza mt-7">HORÁRIO DE ATENDIMENTO</p>
                <UtilsOpeningScheduled @changed="setNewSchedules($event, index)" :openinghour="day"
                    v-for="(day, index) in company.configurations.opening_hours" />
                <button type="submit" class="btn btn-primary mt-8">Salvar informações</button>
                <UtilsLoadingResponse :msg="response" :type="responseType" :loading="false"
                    @eraseError="$myFunctions.resetResponse(this)" />
            </form>
            <div v-if="isAdmin" class="mt-8 border border-red-500 rounded-lg p-6" style="background-color: #fef2f2;">
                <h3 class="fontsize-lg-bold mb-2" style="color: #b91c1c;">Zona de Perigo</h3>
                <p class="fontsize-sm mb-4" style="color: #991b1b;">
                    A exclusão da empresa é uma ação irreversível. Todos os clientes, agendamentos, estoque e fluxo de
                    caixa serão apagados permanentemente.
                </p>
                <button type="button" @click="openDeleteModal" class="btn btn-red">
                    Excluir Empresa Permanentemente
                </button>
            </div>
        </div>
    </section>
    <UtilsModal @closeModal="$myFunctions.closeModal(this)">
        <div class="prompt-modal-content flex flex-col justify-center p-2">

            <div class="text-center mb-6 w-full">
                <font-awesome icon="triangle-exclamation" class="vermelho mb-4" style="font-size: 3rem;" />
                <h3 class="fontsize-lg-bold preto">Exclusão Permanente</h3>
                <p class="fontsize-sm cinza mt-2 w-full">
                    Esta ação <strong>não pode ser desfeita</strong>. Isso excluirá permanentemente a empresa
                    <strong class="preto">{{ company.name }}</strong> e todos os dados associados a ela do sistema.
                </p>
            </div>

            <div class="form-group w-full text-left">
                <label class="block mb-2 fontsize-sm">Para confirmar, digite <strong>{{ company.name }}</strong>
                    abaixo:</label>
                <input type="text" v-model="confirmCompanyName" class="w-full p-3 border fontsize-md preto"
                    style="border-radius: 8px; background-color: #f9fafb;" placeholder="Nome da empresa...">
            </div>

            <div class="w-full mt-2">
                <button type="button" class="btn btn-red w-full"
                    style="padding: 12px; font-weight: 600; max-width: 100%"
                    :disabled="confirmCompanyName !== company.name" @click="confirmDeleteCompany">
                    Entendo as consequências, excluir empresa
                </button>
            </div>

        </div>
    </UtilsModal>
</template>

<script>
export default {
    data() {
        return {
            response: "",
            responseType: "",
            showDeleteModal: false,
            confirmCompanyName: "",
        }
    },
    computed: {
        company: function () {
            return this.$global.company;
        },
        isAdmin() {
            const rolePermission = this.$global.user?.permission;
            return rolePermission == 1;
        }
    },
    watch: {
        "company.zip_code": function () {
            this.company.zip_code = this.company.zip_code.replace(/\D/g, '');

            if (this.company.zip_code.length == 8) {
                this.company.zip_code = this.company.zip_code.replace(/(\d{5})(\d{3})/, '$1-$2');

                this.$myFunctions.getAddressData(this.company.zip_code).then((results) => {
                    this.company.address = results.logradouro;
                    this.company.city = results.localidade;
                    this.company.state = results.uf;
                })
            }
        }
    },
    beforeDestroy() {
    },
    methods: {
        getNotificationActive(id) {
            const notification = this.company.configurations.notifications.find(n => n.id === id);
            return notification ? notification.active : false;
        },
        setNotificationActive(id, value) {
            const notification = this.company.configurations.notifications.find(n => n.id === id);
            if (notification) {
                notification.active = value;
            }
        },
        setNewSchedules: function (event, index) {
            this.company.configurations.opening_hours[index] = event;
        },
        changeCompanyConfigurations: function () {
            let self = this;

            this.loading = true;

            self.$base.api.patch("/companies/" + self.company.id, self.company)
                .then(function (response) {
                    self.$myFunctions.setResponse(self, response.data.message, "success");
                }).catch((error) => {
                    self.$myFunctions.setResponse(self, error.response.data, "error");
                }).then(() => {
                    self.loading = false;
                })
        },
        openDeleteModal: function () {
            this.confirmCompanyName = "";

            this.$myFunctions.openModal({
                instance: this,
                title: "Você tem certeza absoluta?",
                cancelButton: "Cancelar"
            });
        },
        confirmDeleteCompany: function () {
            if (this.confirmCompanyName !== this.company.name) return;

            let self = this;

            this.$global.modalUtils.isLoading = true;

            this.$base.api.delete(`/companies/${this.company.id}`).then(() => {
                self.$myFunctions.stopModalLoading(self);

                self.$myFunctions.closeModal(self);

                self.$myFunctions.showFeedbackModal(self, "Adeus!", "Sua empresa foi excluída de nossos servidores.", "success");

                setTimeout(() => {
                    self.$global.company = null;
                    window.location.href = "/trocar-empresa";
                }, 2000);

            }).catch((error) => {
                self.$myFunctions.stopModalLoading(self);
                const msg = error.response?.data?.message || "Erro desconhecido ao excluir empresa.";
                self.$myFunctions.showFeedbackModal(self, "Erro", msg, "error");
            });
        }
    }
}
</script>
<style scoped>
.profile-header {
    margin: var(--space-7) 0;
}

.profile-informations>p {
    margin-bottom: var(--space-3);
}

.avatar {
    margin-right: var(--space-6);
}

.prompt-modal-content {
    min-height: 50vh;
}

.prompt-modal-content .form-group input:focus {
    border-color: var(--vermelho);
    outline: none;
    box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.1);
}

@media (max-width: 768px) {
    .profile-configurations {

        & button[type="submit"],
        & button[type="button"] {
            width: 100%;
            max-width: 100%;
        }
    }
}
</style>