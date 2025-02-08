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
    position: absolute;
    bottom: 3rem;
}
</style>