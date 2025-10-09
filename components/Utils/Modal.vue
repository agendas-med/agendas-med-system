<template>
    <div class="modal flex items-center justify-center" v-if="$global.modalUtils.modalTitle != ''"
        :class="showModal ? 'show' : ''">
        <div class="modal-wrapper" v-on:click="closeModal()"></div>
        <div class="modal-container"
            :style="$global.modalUtils.modalTitle.indexOf('Confirmar') != -1 ? 'height: 35vh;' : ''">
            <div class="modal-header flex justify-between items-center">
                <p class="fontsize-lg preto">{{ $global.modalUtils.modalTitle }}</p>
                <font-awesome icon="times" v-on:click="closeModal()" class="cursor-pointer" />
            </div>
            <div class="modal-body">
                <div
                    v-if="$global.modalUtils.modalTitle.indexOf('Excluir') == -1 && $global.modalUtils.modalTitle.indexOf('Confirmar') == -1">
                    <slot />
                </div>
                <div class="flex items-center justify-center h-full w-full"
                    v-if="$global.modalUtils.modalTitle.indexOf('Excluir') != -1">
                    <UtilsExcludeModalContent :excludepath="excludepath + $global.contentObject.id"
                        @excludedContent="closeModal(true)"></UtilsExcludeModalContent>
                </div>
                <div class="flex items-center justify-center h-full w-full"
                    v-if="$global.modalUtils.modalTitle.indexOf('Confirmar') != -1">
                    <UtilsConfirmModalContent @confirmed="closeModal(true); callbackConfirm();"
                        :internalTitle="$global.modalUtils.internalTitle"></UtilsConfirmModalContent>
                </div>
            </div>
            <div class="modal-footer flex justify-end">
                <button type="button" class="btn btn-blue" v-if="$global.modalUtils.modalSaveButton2"
                    v-on:click="saveData2()" id="modal-submit-button2">{{ $global.modalUtils.modalSaveButton2
                    }}</button>
                <button type="button" class="btn"
                    :class="$global.modalUtils.modalTitle.indexOf('Excluir') == -1 ? 'btn-primary' : 'btn-red'"
                    id="modal-submit-button" v-if="$global.modalUtils.modalSaveButton" v-on:click="saveData()">{{
                        $global.modalUtils.modalSaveButton }}</button>
                <button type="button" class="btn btn-cinza" v-if="$global.modalUtils.modalCancelButton"
                    v-on:click="closeModal()">{{ $global.modalUtils.modalCancelButton }}</button>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    emits: ["excluded", "closeModal", "confirm"],
    props: ["excludepath"],
    data() {
        return {
            showModal: false
        }
    },
    watch: {
        "$global.modalUtils.modalTitle": function () {
            if (this.$global.modalUtils.modalTitle != "") {
                setTimeout(() => {
                    this.showModal = true;

                    $("#submit-button").off("click").on("click", () => {
                        setTimeout(() => {
                            let informationsForm = $("#informations-form");

                            if (informationsForm.attr("invalid") == "true") {
                                $("#modal-submit-button").removeAttr("disabled").removeClass("btn-loading");
                                $("#modal-submit-button2").removeAttr("disabled").removeClass("btn-loading");
                            }
                        }, 100)
                    })
                }, 100)
            } else {
                setTimeout(() => {
                    this.showModal = false;
                }, 50)
            }
        }
    },
    methods: {
        callbackConfirm: function () {
            this.$emit("confirm");
        },
        closeModal: function (exclude = false) {
            this.showModal = false;
            setTimeout(() => {
                if (exclude) {
                    this.$emit("excluded");
                }

                this.$emit("closeModal");
            }, 400);
        },
        saveData: function () {
            $("#modal-submit-button").attr("disabled", "disabled").addClass("btn-loading");

            $("#submit-button").click();
        },
        saveData2: function () {
            $("#modal-submit-button2").attr("disabled", "disabled").addClass("btn-loading");

            $("#submit-button2").click();
        }
    },
    beforeUnmount: function () {
        this.$emit("closeModal");
    }
}
</script>
<style scoped>
.modal,
.modal-wrapper {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 2;
    transition: opacity 0.4s;
    overflow: none;
}

.modal-wrapper {
    background-color: rgba(0, 0, 0, 0.6);
    z-index: 3;
    opacity: 0;
}

.show {
    & .modal-container {
        overflow: hidden;
        transform: translateY(0);
        opacity: 1;
    }

    & .modal-wrapper {
        opacity: 1;
    }
}

.modal-container {
    transition: transform 0.4s, opacity 0.4s;
    transform: translateY(-20px);
    opacity: 0;
    z-index: 4;
    width: 95vw;
    max-width: 700px;
    height: 95vh;
    max-height: 630px;
    border-radius: var(--radius-lg);
    border: 1px solid var(--cinza-medio);
    background: white;
    display: flex;
    flex-direction: column;
}

.modal-header,
.modal-body,
.modal-footer {
    padding: var(--space-5);
}

.modal-header {
    border-bottom: 1px solid var(--cinza-medio);
}

.modal-footer {
    border-top: 1px solid var(--cinza-medio);
    display: flex;
    align-items: center;
    gap: var(--space-4);

    & button {
        max-width: inherit;
        width: 50%;
    }
}

@media (max-width: 480px) {
    .modal-container {
        opacity: 1 !important;
        transform: translateY(100vh);
        width: 100vw;
        height: 100%;
        max-height: 100%;
        border-radius: 0;
    }
}

.modal-body {
    flex: 1;
    overflow-y: auto;
}
</style>