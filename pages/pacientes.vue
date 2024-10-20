<template>
    <section>
        <UtilsPageheader title="Pacientes" subtitle="Veja todas as informações dos seus pacientes" />
        <UtilsTabs :tabs="tabs" @changedTab="$myFunctions.goToSubRoute(this, $event, 'pacientes', ['todos', 'nao-fidelizados', 'fidelizados'])" />
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
                    default: true
                },
                {
                    name: "Não fidelizados",
                    quantity: null,
                    default: false
                },
                {
                    name: "Fidelizados",
                    quantity: null,
                    default: false
                }
            ]       
        }
    },
    mounted: function () {
        this.$router.push('/pacientes/todos');
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