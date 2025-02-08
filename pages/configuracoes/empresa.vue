<template>
    <section>
        <div class="profile-configurations">
            <form @submit.prevent="changeCompanyConfigurations">
                <p class="fontsize-sm cinza mt-8">INFORMAÇÕES PRINCIPAIS</p>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div class="form-group">
                        <label for="name" class="block">Nome</label>
                        <input type="text" v-model="company.name" id="name" required placeholder="Ex. Cognito.inc" class="w-full p-2 border rounded-md">
                    </div>
                    <div class="form-group">
                        <label for="role" class="block">Tipo de negócio</label>
                        <select id="role" v-model="company.business_type" required class="w-full p-2 border rounded-md">
                            <option value="">* Selecione *</option>
                            <option :value="type.id" v-for="(type, index) in $global.business_types.types" :key="index">{{ type.name }}</option>
                        </select>
                    </div>

                    <div class="form-group">
                        <label for="cep" class="block">CEP</label>
                        <input type="text" id="cep" v-model="company.zip_code" required class="w-full p-2 border rounded-md">
                    </div>

                    <div class="form-group">
                        <label for="address" class="block">Endereço</label>
                        <input type="text" id="address" v-model="company.address" required class="w-full p-2 border rounded-md">
                    </div>

                    <div class="form-group">
                        <label for="city" class="block">Cidade</label>
                        <input type="text" id="city" v-model="company.city" required class="w-full p-2 border rounded-md">
                    </div>

                    <div class="form-group">
                        <label for="state" class="block">Estado</label>
                        <select id="state" v-model="company.state" required class="w-full p-2 border rounded-md">
                        <option value="">* Selecione *</option>
                        <option :value="state.sigla" v-for="(state, index) in $global.estados" :key="index">{{ state.nome }}</option>
                        </select>
                    </div>
                </div>
                <p class="fontsize-sm cinza mt-7">HORÁRIO DE ATENDIMENTO</p>
                <UtilsOpeningScheduled @changed="setNewSchedules($event, index)" :openinghour="day" v-for="(day, index) in company.configurations.opening_hours" />
                <p class="fontsize-sm cinza mt-8">NOTIFICAÇÕES</p>
                <div class="input-checkbox-group" v-for="notification in company.configurations.notifications" :key="notification.id">
                    <label :for="notification.id" class="fontsize-md preto">{{ notification.name }}</label>
                    <input
                        type="checkbox"
                        :id="notification.id"
                        :checked="getNotificationActive(notification.id)"
                        @change="setNotificationActive(notification.id, $event.target.checked)"
                    >
                </div>
                <button type="submit" class="btn btn-primary mt-8">Salvar informações</button>
                <UtilsLoadingResponse :msg="response" :type="responseType" :loading="false" @eraseError="$myFunctions.resetResponse(this)" />
            </form>
        </div>
    </section>   
</template>

<script>
export default {
    data() {
        return {
            response: "",
            responseType: ""
        }
    },
    computed: {
        company: function () {
            return reactive(JSON.parse(JSON.stringify(this.$global.company)));
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

            self.$base.api.patch("/companies", self.company)
            .then(function(response){            
                self.$myFunctions.setResponse(self, response.data.message, "success");
            }).catch((error) => {
                self.$myFunctions.setResponse(self, error.response.data, "error");
            }).then(() => {
                self.loading = false;
            })
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

@media (max-width: 768px) {
    .profile-configurations {
        & button[type="submit"], & button[type="button"] {
            width: 100%;
            max-width: 100%;
        }
    } 
}
</style>