<template>
    <div>
        <SidebarMenu class="sidebar" ref="sidebar" :class="isResponsive ? sidebarOpen  ? 'sidebar-opened' : 'sidebar-closed' : ''" />
        <div class="sidebar-menu-wrapper" v-show="isResponsive && sidebarOpen" v-on:click="toggleSidebar()"></div>
        <Header class="header" @toggleMenu="toggleSidebar()" />
        <div class="slot">
            <slot></slot>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            sidebarOpen: false,
            isResponsive: window.innerWidth <= 1029
        }
    },
    methods: {
        toggleSidebar: function () {
            this.sidebarOpen = !this.sidebarOpen;
        }
    },
    mounted: function () {
        window.onresize = () => {
            this.isResponsive = window.innerWidth <= 1029;
        }
    }
}
</script>
<style>
    .sidebar {
        position: fixed;
        top: 0;
        left: 0;
        height: 100vh;
        width: 300px;
        border-right: 1px solid var(--cinza-medio);
        transition: transform 0.4s;
        z-index: 2;
    }

    .sidebar-menu-wrapper {
        width: 100vw;
        height: 100vh;
        position: fixed;
        top: 0;
        left: 0;
        z-index: 1;
    }

    .header {
        height: 60px;
        width: calc(100vw - 300px);
        position: fixed;
        top: 0;
        right: 0;
        z-index: 3;
        background: white;
        border-bottom: 1px solid var(--cinza-medio);
    }

    .slot {
        width: calc(100vw - 300px);
        height: calc(100vh - 60px);
        position: fixed;
        top: 60px;
        left: 300px;
        transition: transform 0.4s;
        padding: var(--space-6);
    }

    @media (max-width: 1029px) {
        .sidebar:not(.sidebar-opened) {
            transform: translateX(-300px);
        }

        .sidebar {
            height: calc(100vh - 60px);
            top: 60px;
        }

        .slot {
            transform: translateX(-300px);
        }

        .header, .slot {
            width: 100vw;
        }
    }

    @media (max-width: 480px) {
        .sidebar {
            width: 100vw;
        }

        .sidebar:not(.sidebar-opened) {
            transform: translateY(-100vh);
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