<template>
    <div class="connected-user flex items-center">
        <font-awesome icon="store" class="sidebar-icons" />
        <div class="connected-user-informations w-full">
            <p class="fontsize-md sidebar-text line-clamp-1">{{ $global.company.name }}</p>
            <p class="fontsize-sm sidebar-text line-clamp-1">{{ $global.company.adress }}</p>
        </div>
    </div>
</template>
<style scoped>
    .connected-user {
        border-radius: var(--radius-md);
        border: 1px solid var(--cinza-medio);
        padding: var(--space-3) var(--space-6);
        margin: var(--space-10) 0;
    }
</style>