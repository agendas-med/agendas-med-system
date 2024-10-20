<template>
    <section>
        <div class="container">
            <UtilsInputSearch placeholder="Procure um cliente" />
            <font-awesome v-if="showResponsiveFilter" icon="filter" class="sidebar-icons icon-filter" />
            <font-awesome v-else icon="arrow-down-wide-short" class="sidebar-icons icon-filter" />
        </div>
        <TableMain />
    </section>
</template>

<script>
export default {
    data() {
        return {
            showResponsiveFilter: true, 
        }
    },
    mounted() {
        this.checkScreenWidth();
        window.addEventListener('resize', this.checkScreenWidth);
    },
    beforeDestroy() {
        window.removeEventListener('resize', this.checkScreenWidth);
    },
    methods: {
        checkScreenWidth() {
            this.showElement = window.innerWidth > 682;
        }
    }
}
</script>