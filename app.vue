<template>
  <NuxtLayout :name="layoutName">
    <NuxtPage />
  </NuxtLayout>  
</template>

<script setup>
import { useRoute } from 'vue-router'
import { ref, watch } from 'vue'

const route = useRoute()

// Definir o layout inicial
const layoutName = ref(getLayoutName(route.path))

// Função para determinar o layout com base na rota
function getLayoutName(path) {
  if (isValidRoute(path)) {
    return 'default'
  } else {
    return 'login'
  }
}

// Função que verifica se a rota é válida
function isValidRoute(path) {
  let routes = [
    "/agenda",
    "/vendas",
    "/clientes",
    "/relatorios",
    "/agenda",
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

// Observar mudanças na rota e atualizar o layout
watch(() => route.path, (newPath) => {
  layoutName.value = getLayoutName(newPath)
})
</script>
