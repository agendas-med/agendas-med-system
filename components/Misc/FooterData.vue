<template>
    <footer>
        <span class="fontsize-sm cinza">© {{ year }} AgendasMed - Todos os direitos reservados</span>
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
    position: fixed;
    left: 5vw;
    bottom: 5vw;
}

@media (min-width: 1023px) {
    footer {
        position: fixed;
        left: 9vw;
    }
}
</style>