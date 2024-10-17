<template>
    <section>
        <div class="container">
            <UtilsInputSearch />
            <font-awesome v-if="showElement" icon="filter" class="sidebar-icons icon-filter" />
            <font-awesome v-else icon="arrow-down-wide-short" class="sidebar-icons icon-filter" />
            
        </div>
        <TableMain />
    </section>
</template>

<script>
export default {
    data() {
        return {
            showElement: true, 
        };
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
};

</script>
<style scoped>
    .container {
        display: flex;
        justify-content: space-between;
        margin-bottom: 20px;
        max-width: 100%;
    }

    .icon-filter {
        width: 35px;
        height: 35px;
        margin: 0;

    }
</style>