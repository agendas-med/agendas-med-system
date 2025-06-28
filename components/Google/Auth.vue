<template>
    <GoogleLogin :callback="handleLoginSuccess">
        <button class="google-btn">
            <img src="../../assets/img/google-logo.png">
            Login com Google
        </button>
    </GoogleLogin>
    <UtilsLoadingResponse :msg="response" :type="responseType" :loading="loading" @eraseError="$myFunctions.resetResponse(this)" />
</template>
<script>
import { GoogleLogin } from 'vue3-google-login';

export default {
    data() {
        return {
            response: "",
            responseType: "",
            loading: false
        }
    },
    components: {
        GoogleLogin
    },
    methods: {
        handleLoginSuccess(response) {
            let self = this;

            self.$base.api.post("users/google-login", { token: response.code }).then((results) => {
                self.$myFunctions.setResponse(self, "Usuário autenticado com sucesso", "success");

                self.$myFunctions.setJwtInLocalStorage(self, results.data.returnObj.token);

                window.location.href = "/agenda";
            }).catch((error) => {
                self.$myFunctions.setResponse(self, error.response.data, "error");
            })
        }
    }
}
</script>
<style scoped>
.google-btn {
    white-space: nowrap;
    font-size: 1rem;
    font-weight: 600;
    background: var(--cinza-claro);
    height: 48px;
    border-radius: var(--radius-md);
    border: 1px solid var(--cinza-medio);
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: var(--space-6);
    transition: all 0.4s ease-in-out;

    & img {
        width: 35px;
        height: 35px;
        border-radius: 50%;
    }

    &:hover {
        background: var(--azul-claro);
    }
}
</style>