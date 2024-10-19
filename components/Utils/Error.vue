<template>
    <p class="fontsize-md text-center" :class="typeClass" v-if="msg != ''">{{ msg }}</p>
</template>
<script>
export default {
    props: ["msg", "type"],
    computed: {
        typeClass: function () {
            let typeClass = "verde-escuro";

            if (this.type == "error") {
                typeClass = "vermelho-suave";
            }

            return typeClass;
        }
    },
    mounted: function () {
        setTimeout(() => {
            this.$emit("eraseError");
        }, 5000)
    }
}
</script>