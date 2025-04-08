<template>
    <section v-if="!loading">
        <div class="input-checkbox-group" v-for="preference in preferences" :key="preference.id">
            <label :for="preference.id" class="fontsize-md preto">{{ preference.name }}</label>
            <input
                type="checkbox"
                :id="preference.id"
                :checked="preference.active"
                @change="preference.active = !preference.active"
            >
        </div>
        <button type="button" class="btn btn-primary mt-10" v-on:click="savePreferences()">Salvar</button>
        <UtilsLoadingResponse :msg="response" :type="responseType" :loading="false" @eraseError="$myFunctions.resetResponse(this)" />
    </section>   
</template>

<script>
export default {
    data() {
        return {
            response: "",
            responseType: "",
            preferences: [],
            loading: true
        }
    },
    methods: {
        getPreferences: function () {
            let self = this;

            this.loading = true;

            self.$base.api.get("/companies/preferences")
            .then(function(response){      
                self.preferences = response.data.returnObj;
            }).catch((error) => {
                self.$myFunctions.setResponse(self, error.response.data, "error");
            }).then(() => {
                self.loading = false;
            })
        },
        savePreferences: function () {
            let self = this;

            this.loading = true;

            self.$base.api.post("/companies/preferences", { preferences: self.preferences })
            .then(function(response){      
                self.$myFunctions.setResponse(self, response.data.message, "success");
                self.getPreferences();
            }).catch((error) => {
                self.$myFunctions.setResponse(self, error.response.data, "error");
            }).then(() => {
                self.loading = false;
            })
        }
    },
    mounted: function () {
        this.getPreferences();
    }
}
</script>