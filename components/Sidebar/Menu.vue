<template>
    <aside class="sidebar-container">
        <div class="brand">
            <img src="@/assets/img/agendasmed-logo.png" alt="Logotipo AgendasMed">
        </div>
        <SidebarConnectedUser />
        <SidebarNav />
    </aside>
</template>
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