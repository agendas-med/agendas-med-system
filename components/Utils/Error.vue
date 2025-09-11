<template>
    <p class="fontsize-md text-center" :class="typeClass" v-if="msg != ''" v-html="$myFunctions.sanitizeHtml(msg)"></p>
</template>
<script>
export default {
    emits: ["eraseError"],
    props: ["msg", "type"],
    computed: {
        typeClass: function () {
            let typeClass = "verde-escuro";

            if (this.type == "error") {
                typeClass = "vermelho";
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