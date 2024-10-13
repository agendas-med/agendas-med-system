<template>
    <div class="page-header">
        <p class="fontsize-lg preto">{{ title }}</p>
        <p class="fontsize-sm cinza">{{ subtitle }}</p>
    </div>
</template>
<script>
export default {
    props: ['title', 'subtitle']
}
</script>
<style scoped>
</style>