<template>
  <NuxtLayout :name="layoutName">
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup>
import { useRoute } from 'vue-router'

const route = useRoute()

const layoutName = ['login', 'registro'].includes(route.name) ? 'login' : 'default'
</script>
