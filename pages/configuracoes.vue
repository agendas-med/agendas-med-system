<template>
    <section>
        <UtilsPageheader title="Configurações" subtitle="Personalize e configure o sistema de acordo com suas necessidades." />
        <UtilsTabs :tabs="tabs" @changedTab="$myFunctions.goToSubRoute(this, $event, 'configuracoes', tabs)" />
        <NuxtPage/>
    </section>
</template>

<script>
export default {
    data() {
        return {
            tabs: [
                {
                    name: "Usuários",
                    quantity: null,
                    route: "usuarios",
                    default: true
                },
                {
                    name: "Preferências",
                    quantity: null,
                    route: "preferencias",
                    default: false
                }
            ]       
        }
    }
}
</script>