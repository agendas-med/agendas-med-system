<template>
    <div>
        <SidebarMenu class="sidebar" ref="sidebar" />
        <Header class="header" />
        <div class="slot">
            <slot></slot>
        </div>
    </div>
</template>
<style>
    .sidebar {
        position: fixed;
        top: 0;
        left: 0;
        height: 100vh;
        width: 300px;
        border-right: 1px solid var(--cinza-medio);
        transition: transform 0.4s;
    }

    .header {
        height: 60px;
        width: calc(100vw - 300px);
        position: fixed;
        top: 0;
        right: 0;
        border: 1px solid blue;
    }

    .slot {
        width: calc(100vw - 300px);
        height: calc(100vh - 60px);
        position: fixed;
        top: 60px;
        left: 300px;
        transition: transform 0.4s;
    }

    @media (max-width: 1029px) {
        .sidebar {
            transform: translateX(-300px);
        }

        .slot {
            transform: translateX(-300px);
        }

        .header, .slot {
            width: 100vw;
        }
    }

    .sidebar-icons {
        width: 26.4px;
        height: 26.4px;
        color: var(--cinza);
        margin-right: var(--space-6);
        transition: color 0.4s;
    }

    .sidebar-text {
        color: var(--cinza);
    }
</style>