<template>
    <section>
        <UtilsPageheader title="Relatórios" subtitle="Visualize suas consultas e ganhos em relatórios completos." />
        <UtilsTabs :tabs="tabs" @changedTab="$myFunctions.goToSubRoute(this, $event, 'relatorios', ['consultas', 'faturamento'])" />
        <NuxtPage/>
    </section>
</template>

<script>
export default {
    data() {
        return {
            tabs: [
                {
                    name: "Consultas realizadas",
                    quantity: 25,
                    default: true
                },
                {
                    name: "Faturamento",
                    quantity: null,
                    default: false
                }
            ]      
        }
    },
    mounted: function () {
        this.$router.push('/relatorios/consultas');
    }
}
</script>
<style>

</style>