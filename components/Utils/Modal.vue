<template>
    <div class="modal flex items-center justify-center" v-if="title != ''" :class="showModal ? 'show' : ''">
        <div class="modal-wrapper" v-on:click="closeModal()"></div>
        <div class="modal-container">
            <div class="modal-header flex justify-between items-center">
                <p class="fontsize-lg preto">{{ title }}</p>
                <font-awesome icon="times" v-on:click="closeModal()" class="cursor-pointer" />
            </div>
            <div class="modal-body">
                <div v-if="title.indexOf('Excluir') == -1">
                    <slot />
                </div>
                <div class="flex items-center justify-center h-full w-full" v-else>
                    <UtilsExcludeModalContent :excludepath="excludepath + $global.contentObject.id" @excludedContent="closeModal(true)"></UtilsExcludeModalContent>
                </div>
            </div>
            <div class="modal-footer flex justify-end">
                <button type="button" class="btn" :class="title.indexOf('Excluir') == -1 ? 'btn-primary' : 'btn-red'" id="modal-submit-button" v-if="saveButton" v-on:click="saveData()">{{ saveButton }}</button>
                <button type="button" class="btn btn-cinza" v-if="cancelButton" v-on:click="closeModal()">{{ cancelButton }}</button>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props: ["title", "saveButton", "cancelButton", "excludepath"],
    data() {
        return {
            showModal: false
        }
    },
    watch: {
        title: function () {
            if (this.title != "") {
                setTimeout(() => {
                    this.showModal = true;

                    $("#submit-button").off("click").on("click", () => {
                        let informationsForm = $("#informations-form");
                        
                        if (informationsForm.find(":invalid").length > 0 || informationsForm.attr("invalid") == "true") {
                            $("#modal-submit-button").removeAttr("disabled").removeClass("btn-loading");
                        }
                    })
                }, 50)
            } else {
                setTimeout(() => {
                    this.showModal = false;
                }, 50)
            }
        }
    },
    methods: {
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
        }
    }
}
</script>
<style scoped>
.btn-cinza {
    margin-left: var(--space-4);
}

.modal, .modal-wrapper {
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

.modal-header, .modal-body, .modal-footer {
    padding: var(--space-5);
}

.modal-header {
    border-bottom: 1px solid var(--cinza-medio);
}

.modal-footer {
    border-top: 1px solid var(--cinza-medio);

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