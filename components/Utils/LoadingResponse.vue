<template>
    <div class="loading-response">
        <UtilsError v-if="!loading" :msg="msg" :type="type" @eraseError="$emit('eraseError')" />
        <UtilsLoading :loading="loading" v-if="loading" />
    </div>
</template>
<script>
export default {
    props: ["msg", "type", "loading"]
}
</script>
<style scoped>
.loading-response {
    height: 40px;
    width: 100%;
    margin: var(--space-7) 0;
}
</style>