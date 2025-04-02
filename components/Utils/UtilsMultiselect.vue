<template>
    <div class="input custom-invalid" :class="isOpen ? 'focus' : ''" :invalid="required ? selectedItems.length == 0 ? true : false : false">
      <div class="selected-items" @click="toggleDropdown">
        <span v-if="selectedItems.length === 0" class="placeholder">* Selecione *</span>
        <span v-else class="selected">
          {{ selectedItems.map(item => item.name).join(', ') }}
        </span>
        <font-awesome icon="angle-down" class="arrow" />
      </div>
      <ul v-if="isOpen" class="dropdown">
        <li v-for="item in options" :key="item.id" @click="toggleSelection(item)" :class="{ selected: isSelected(item) }">
          {{ item.name }} ({{ item.value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) }})
        </li>
      </ul>
    </div>
    <div class="wrapper" v-on:click="toggleDropdown()" v-if="isOpen"></div>
  </template>
  
  <script>
  export default {
    emits: ["updateSelectedOptions"],
    props: {
      options: {
        type: Array,
        required: true
      },
      required: {
        type: Boolean,
        required: false
      },
      selectedOptions: {
        type: Array,
        required: true
      }
    },
    data() {
      return {
        selectedItems: [],
        isOpen: false
      };
    },
    mounted: function () {
        for (let i = 0; i < this.selectedOptions.length; i++) {
            this.toggleSelection(this.selectedOptions[i]);
        }
    },
    methods: {
      toggleDropdown() {
        this.isOpen = !this.isOpen;
      },
      toggleSelection(item) {
        const index = this.selectedItems.findIndex(i => i.id === item.id);
        if (index === -1) {
          this.selectedItems.push(item);
        } else {
          this.selectedItems.splice(index, 1);
        }
        this.$emit('updateSelectedOptions', this.selectedItems);
      },
      isSelected(item) {
        return this.selectedItems.some(i => i.id === item.id);
      }
    }
  };
  </script>
  
  <style scoped>
  .selected-items {
    height: 100%;
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .placeholder {
    color: var(--preto);
  }
  .arrow {
    margin-left: auto;
  }
  .wrapper {
    position: fixed;
    background-color: transparent;
    top: -100vh;
    left: -100vw;
    width: 1000vh;
    height: 1000vh;
    z-index: 9;
  }
  .dropdown {
    position: absolute;
    left: 0;
    top: 102%;
    width: 100%;
    background: white;
    border: 1px solid var(--cinza-medio);
    border-radius: 5px;
    margin-top: 5px;
    list-style: none;
    padding: 0;
    max-height: 200px;
    overflow-y: auto;
    z-index: 10;
  }
  .dropdown li {
    padding: 10px;
    cursor: pointer;
    transition: background 0.3s;
  }
  .dropdown li:hover {
    background: #f0f0f0;
  }
  .dropdown li.selected {
    background: var(--verde-escuro);
    color: var(--branco);
  }
  </style>