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
                    name: "Empresa",
                    quantity: null,
                    route: "empresa",
                    default: false
                },
                {
                    name: "Cargos",
                    quantity: null,
                    route: "cargos",
                    default: false
                },
                {
                    name: "Serviços",
                    quantity: null,
                    route: "servicos",
                    default: false
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