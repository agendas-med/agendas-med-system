<template>
    <section>
        <UtilsPageheader title="Pacientes" subtitle="Veja todas as informações dos seus pacientes" />
        <UtilsTabs :tabs="tabs" @changedTab="changeChart($event)" />
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
                }]       
        }
    },
    methods: {
        changeChart() {

        }
    }
}
</script>

<style>

</style>