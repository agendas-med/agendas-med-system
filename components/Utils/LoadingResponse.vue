<template>
    <div class="loading-response" :style="styletype == 'small' ? 'margin: 5px !important;' : 'margin: var(--space-7) 0;'">
        <UtilsError v-if="!loading" :msg="msg" :type="type" @eraseError="$emit('eraseError')" />
        <UtilsLoading :loading="loading" v-if="loading" />
    </div>
</template>
<script>
export default {
    props: ["msg", "type", "loading", "styletype"]
}
</script>
<style scoped>
.loading-response {
    height: 40px;
    width: 100%;
}
</style>