<template>
    <section>
        <UtilsPageheader title="Pacientes" subtitle="Veja todas as informações dos seus pacientes" />
        <UtilsTabs :tabs="tabs" @changedTab="$myFunctions.goToSubRoute(this, $event, 'pacientes', tabs)" />
        <NuxtPage/>
    </section>
</template>

<script>
export default {
    data() {
        return {
            tabs: [
                {
                    name: "Todos os clientes",
                    quantity: 25,
                    route: "todos",
                    default: true
                },
                {
                    name: "Não fidelizados",
                    route: "nao-fidelizados",
                    quantity: 24,
                    default: false
                },
                {
                    name: "Fidelizados",
                    route: "fidelizados",
                    quantity: 1,
                    default: false
                }
            ]       
        }
    }
}
</script>
<style>
.icon-filter {
    width: 35px;
    height: 35px;
    margin: 0;
}

.container {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
    max-width: 100%;
}
</style>