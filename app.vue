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
  } else if (isCleanPage(path)) {
    return 'cleanPage'
  } else {
    return 'login'
  }
}

// Função que verifica se a rota é válida
function isValidRoute(path) {
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
    "/configuracoes/empresa",
    "/configuracoes/cargos",
    "/configuracoes/servicos",
    "/configuracoes/preferencias",
    "/perfil",
    "/checkin"
  ]
  
  return routes.some(route => route == path);
}

// Função que verifica se a página deve ter um layout limpo
function isCleanPage(path) {
  let routes = [
    "/trocar-empresa"
  ]
  
  return routes.some(route => route == path);
}

// Observar mudanças na rota e atualizar o layout
watch(() => route.path, (newPath) => {
  layoutName.value = getLayoutName(newPath)
})
</script>
