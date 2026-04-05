<template>
    <footer>
        <span class="fontsize-sm cinza">© {{ year }} AgendasPro - Todos os direitos reservados</span>
    </footer>
</template>
<script>
export default {
    data() {
        return {
            year: new Date().getFullYear()
        }
    }
}
</script>
<style scoped>
footer {
    margin: var(--space-10) 0;
        position: absolute;
    bottom: var(--space-3);
    right: var(--space-16);
}
</style>