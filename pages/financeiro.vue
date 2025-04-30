<template>
    <section>
        <UtilsPageheader title="Financeiro" subtitle="Organize as finanças do seu negócio com facilidade." />
        <UtilsTabs :tabs="tabs" @changedTab="$myFunctions.goToSubRoute(this, $event, 'financeiro', tabs)" />
        <NuxtPage/>
    </section>
</template>
<script>
export default {
    data() {
        return {
            tabs: [
                {
                    name: "Pagamentos",
                    quantity: null,
                    route: "pagamentos",
                    default: true
                },
                {
                    name: "Métodos de pagamento",
                    quantity: null,
                    default: false,
                    route: "metodos-pagamento",
                }
            ]       
        }
    },
    mounted: function () {
        if (!this.$myFunctions.hasPermission(this)) {
            this.$router.push("/entrar");
        }
    }
}
</script>