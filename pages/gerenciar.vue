<template>
    <section>
        <UtilsPageheader title="Meu perfil" subtitle="Gerencie suas informações pessoais, preferências e configurações da sua conta." />
        <UtilsTabs :tabs="tabs" @changedTab="$myFunctions.goToSubRoute(this, $event, 'gerenciar', tabs)" />
        <NuxtPage/>
    </section>
</template>

<script>
export default {
    data() {
        return {
            tabs: [
                {
                    name: "Perfil",
                    quantity: null,
                    route: "perfil",
                    default: true
                },
                {
                    name: "Configurações da conta",
                    quantity: null,
                    default: false,
                    route: "configuracoes",
                }
            ]       
        }
    }
}
</script>