<template>
  <NuxtLayout :name="layoutName">
    <NuxtPage />
  </NuxtLayout>  
</template>
<script setup>
import { useRoute } from 'vue-router'

const route = useRoute()

function isValidRoute (path) {
  let routes = [
      "/agenda",
      "/clientes",
      "/relatorios",
      "/agenda",
      "/financeiro",
      "/financeiro/pagamentos",
      "/financeiro/servicos",
      "/financeiro/metodos-pagamento",
      "/configuracoes",
      "/configuracoes/usuarios",
      "/configuracoes/preferencias",
      "/perfil"
  ]
  
  return routes.some(route => route == path);
}

const layoutName = isValidRoute(route.path) ? 'default' : 'login';

</script>

