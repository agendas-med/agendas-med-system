<template>
    <section>
        <UtilsPageheader title="Relatórios" subtitle="Visualize suas consultas e ganhos em relatórios completos." />
        <UtilsTabs :tabs="tabs" @changedTab="$myFunctions.goToSubRoute(this, $event, 'relatorios', tabs)" />
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
                    quantity: null,
                    route: "consultas",
                    default: true
                },
                {
                    name: "Faturamento",
                    route: "faturamento",
                    quantity: null,
                    default: false
                }
            ]       
        }
    }
}
</script>
<style>

</style>