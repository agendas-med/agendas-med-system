<template>
    <div class="switch-group flex items-center">
      <label class="switch">
        <input type="checkbox" id="switch-input" v-model="active">
        <span class="slider round"></span>
      </label>
      <label class="fontsize-sm cinza" for="switch-input">{{ label }}</label>
    </div>
  </template>
  
  <script>
  export default {
    props: ["label"],
    data() {
      return {
        active: false
      }
    },
    watch: {
        active: function () {
            this.$emit("changedState", this.active);
        }
    }
  }
  </script>
  
  <style scoped>
.switch-group {
    cursor: pointer;
}

  .switch {
    position: relative;
    display: inline-block;
    width: 37px;
    height: 16px;
    margin-right: var(--space-3);
  }
  
  .switch input {
    opacity: 0;
    width: 0;
    height: 0;
  }
  
  .slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ccc;
    transition: .4s;
    border-radius: 34px;
  }
  
  .slider:before {
    position: absolute;
    content: "";
    height: 12px;
    width: 12px;
    left: 2px;
    bottom: 2px;
    background-color: white;
    transition: .4s;
    border-radius: 50%;
  }
  
  input:checked + .slider {
    background-color: var(--verde-escuro);
  }
  
  input:checked + .slider:before {
    transform: translateX(21.6px);
  }
  
  .slider.round {
    border-radius: 34px;
  }
  
  .slider.round:before {
    border-radius: 50%;
  }
  </style>
  