<template>
    <div class="header-user">
        <div class="user-container flex items-center" v-on:click="toggleDropdown()">
            <img src="https://cademint-test.s3.amazonaws.com/2024-09-04T02_10_20.206Z126018478_1648490771979717_7245151950313189709_o.jpg" alt="Imagem usuário" class="avatar avatar-pp">
            <div class="informacoes-usuario">
                <p class="fontsize-md preto">Saymon Felipe</p>
                <p class="fontsize-sm cinza">Paciente</p>
            </div>
            <font-awesome icon="angle-down" class="dropdown-button cinza" :class="dropdownOpened ? 'rotated' : ''" />
        </div>
        <transition name="fade">
            <div v-if="dropdownOpened" class="user-dropdown">
                <ul>
                <li v-on:click="toggleDropdown()">Meu perfil</li>
                <li v-on:click="toggleDropdown()">Configurações</li>
                <li v-on:click="toggleDropdown()">Sair</li>
                </ul>
            </div>
        </transition>   
        <div class="dropdown-wrapper" v-show="dropdownOpened" v-on:click="toggleDropdown()"></div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            dropdownOpened: false
        }
    },
    methods: {
        toggleDropdown: function () {
            this.dropdownOpened = !this.dropdownOpened;
        }
    }
}
</script>
<style scoped>
.header-user {
    cursor: pointer;
    position: relative;
}

.informacoes-usuario {
    margin-right: var(--space-3);
}

.user-dropdown {
    width: fit-content;
    height: fit-content;
    background: var(--branco);
    border-radius: var(--radius-md);
    border: 1px solid var(--cinza-medio);
    box-shadow: var(--boxshadow-regular);
    position: absolute;
    top: 110%;
    z-index: 5;
}

li {
    padding: var(--space-3) var(--space-6);
    transition: background 0.4s;
}

    li:hover {
        background: var(--cinza-medio);
    }

.dropdown-wrapper {
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 4;
    cursor: default
}

.dropdown-button {
    transition: transform 0.4s;
}

.rotated {
    transform: rotate(-180deg);
}
</style>