<template>
    <div class="flex items-center p-2 bg-white">
      <img :src="image" alt="Profile Image" class="w-12 h-12 rounded-full object-cover">
      <div class="ml-4">
        <h2 class="text-lg font-semibold">{{ name }}</h2>
        <p class="text-gray-600">{{ age }} anos</p>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      image: {
        type: String,
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      age: {
        type: Number,
        required: true,
      },
    },
  };
  </script>
  
  <style scoped>
  /* Você pode adicionar estilos adicionais aqui, se necessário */
  </style>
  