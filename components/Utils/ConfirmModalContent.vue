<template>
    <div class="confirm-modal-content">
        <div class="confirm-icon">
            <font-awesome icon="triangle-exclamation" class="amarelo fontsize-lg" />
        </div>
        <div class="texts">
            <h2 class="fontsize-md-bold">{{ internalTitle }}</h2>
        </div>
        <input type="submit" id="submit-button" v-on:click="confirm()" style="display: none;">
    </div>
</template>
<script>
export default {
    emit: ["confirmed"],
    props: ["internalTitle"],
    data() {
        return {
            
        }
    },
    methods: {
        confirm: function () {
            this.$emit("confirmed");
        }
    }
}
</script>
<style scoped>

.confirm-modal-content {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    text-align: center;
    height: 100%;
}

.confirm-icon {
    background: var(--amarelo-claro);
    width: 80px;
    height: 80px;
    border-radius: var(--radius-full);
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: var(--space-5);
}
</style>