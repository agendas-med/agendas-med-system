<template>
    <aside class="sidebar-container">
        <div class="brand">
            <router-link to="/"><img src="@/assets/img/agendaspro-logo.png" alt="Logotipo AgendasPro"></router-link>
        </div>
        <SidebarConnectedUser />
        <SidebarNav @closeSidebar="$emit('closeSidebar')" />
    </aside>
</template>
<script>
export default {
    emits: ["closeSidebar"]
}
</script>
<style scoped>
.sidebar-container {
    padding: var(--space-10) var(--space-6);
    background: var(--branco);
}

.brand img {
    margin-left: var(--space-6);
    width: 160px;
}
</style>