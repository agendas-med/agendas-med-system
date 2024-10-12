<template>
    <header class="flex items-center justify-end ">
        <div class="responsive-menu-button">
            <font-awesome icon="bars" id="responsive-menu-button" v-on:click="$emit('toggleMenu')" />
        </div>
        <HeaderUser />
    </header>
</template>
<style scoped>
    header {
        padding: 0 var(--space-6);
    }

    #responsive-menu-button {
        font-size: 25px;
        cursor: pointer;
        color: var(--cinza);
    }

    .responsive-menu-button {
        display: none;
    }

    @media (max-width: 1029px) {
        .responsive-menu-button {
            display: block;
        }

        header {
            justify-content: space-between !important;
        }
    }
</style>