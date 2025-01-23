<template>
    <div class="ajax-autocomplete" invalid="true">
        <div class="ajax-autocomplete-wrapper" v-on:click="clearContainer()" v-if="entity_search.length > 2 && !force_close"></div>
        <div class="ajax-autocomplete-container">
            <input type="text" id="ajax-autocomplete-input" :placeholder="entity_object.id == null ? '*** para todos' : ''" v-model="entity_search">
            <div class="selected-entity" v-if="entity_object.id != null">
                {{ entity_object.nome }}
                <font-awesome icon="times" v-on:click="deselectEntity()" class="cursor-pointer" />
            </div>
            <div class="entities-list" v-if="entity_search.length > 2 && !force_close">
                <div class="empty-search" v-if="entity_search.length > 2 && entities_list.length == 0">
                    <p>Nenhum resultado encontrado</p>
                </div>
                <div class="entities-list-inner" v-if="entity_search.length > 2 && entities_list.length > 0">
                    <div class="entity" v-for="(entityObj, index) in entities_list" :key="index" v-on:click="selectEntity(entityObj)">
                        <div class="customers-entity" v-if="ajaxtype == 'clientes'">
                            <div class="entity-line">
                                <p>{{ entityObj.nome }}</p>
                            </div>
                            <div class="entity-line cinza">
                                <p class="cinza">{{ entityObj.telefone }}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
//import api from "../configs/api";

export default {
    name: "ajaxAutoComplete",
    props: ["ajaxtype", "entityid", "entityname", "required"],
    data() {
        return {
            entity_id: null,
            entity_search: "",
            entity_object: {
                nome: "",
                id: null,
                telefone: ""
            },
            entities_list: [],
            force_close: false
        }
    },
    watch: {
        entityid: function () {
            this.entity_object.id = this.entityid;
            if (this.entityid == null) {
                this.entity_search = this.entityname;
                this.force_close = true;
                this.checkValidity();
            } else {
                this.entity_object.id = this.entityid;
                this.entity_object.nome = this.entityname;
                this.force_close = false;
                this.checkValidity();
            }
        },
        entity_search: function () {
            if (this.entity_search.length > 2) {
                let searchString = this.entity_search;
                setTimeout(() => {
                    if (this.entity_search == searchString) {
                        this.searchEntity();
                    }
                }, 150)
            }

            this.checkValidity();
        }
    },
    methods: {
        checkValidity: function () {
            if (this.entity_search.trim().length == 0 && this.entity_object.nome == "") {
                $(".ajax-autocomplete").attr("invalid", true);
                this.force_close = false;
            } else {
                $(".ajax-autocomplete").attr("invalid", false);
            }
        },
        selectEntity: function (selected_entity) {
            this.entity_object = selected_entity;
            this.entity_search = "";
            this.checkValidity();
            this.$emit("select", this.entity_object);
        },
        deselectEntity: function () {
            this.entity_object = {
                nome: "",
                id: null
            }
            this.entity_search = "";
            this.checkValidity();
        },
        clearContainer: function () {
            this.entities_list = [];
            this.force_close = true;
            this.entity_object = {
                nome: this.entity_search,
                id: null,
                telefone: ""
            }

            this.$emit("select", this.entity_object);
        },
        searchEntity: function () {
            let self = this;
            let domain = "";

            self.force_close = false;

            switch (this.ajaxtype) {
                case "clientes":
                    domain = "/customers/";
                    break;
                default: 
                    return;
            }

            let data = {
                search_string: this.entity_search
            }

            this.entities_list = [
                {
                    nome: "Saymon",
                    id: 0,
                    telefone: "(41) 9 9635-2536"
                },
                {
                    nome: "João",
                    id: 1,
                    telefone: "(99) 9 9999-9999"
                }
            ]
            console.log(this.entities_list)
            /*api.post(domain + "search", data).then((response) => {
                self.entities_list = response.data.returnObj;
            }).catch((error) => {
                console.log(error);
            })*/
        }
    }
}
</script>
<style scoped>
.ajax-autocomplete-wrapper {
    background: transparent;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 5;
}

.ajax-autocomplete-container {
    z-index: 6;
}

.ajax-autocomplete, .ajax-autocomplete-container {
    position: relative;
}

.selected-entity, .entities-list {
    position: absolute;
}

.selected-entity {
    top: 4px;
    left: 4px;
    background: var(--azul);
    color: var(--branco);
    display: flex;
    align-items: center;
    padding: var(--space-2);
    border-radius: var(--radius-sm);

    & svg {
        margin-left: var(--space-3);
    }
}

.entities-list {
    background: var(--branco);
    border: 1px solid var(--cinza-medio);
    border-radius: var(--radius-sm);
    z-index: 5;
    width: 100%;
    overflow: hidden;
}
.entity-line {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.empty-search {
    padding: var(--space-3);
    text-align: center;
}

.entity {
    padding: var(--space-3);
    cursor: pointer;
}

    .entity:hover {
        background: var(--cinza-medio);
    }
</style>