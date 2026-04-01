<template>
  <div>
    <NuxtLayout :name="layoutName">
      <NuxtPage />
    </NuxtLayout>
    <UtilsFeedbackModal />
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
import { ref, watch } from 'vue'

const route = useRoute()

const layoutName = ref(getLayoutName(route.path))

function getLayoutName(path) {
  if (isValidRoute(path)) {
    return 'default'
  } else {
    return 'login'
  }
}

function isValidRoute(path) {
  let routes = [
    "/agenda",
    "/vendas",
    "/clientes",
    "/relatorios",
    "/financeiro",
    "/financeiro/pagamentos",
    "/financeiro/metodos-pagamento",
    "/configuracoes",
    "/configuracoes/usuarios",
    "/configuracoes/empresa",
    "/configuracoes/cargos",
    "/configuracoes/servicos",
    "/configuracoes/produtos",
    "/configuracoes/preferencias",
    "/perfil",
    "/empresa_entrar",
    "/checkin",
    "/estoque"
  ]

  return routes.some(route => route == path);
}

watch(() => route.path, (newPath) => {
  layoutName.value = getLayoutName(newPath)
})
</script>