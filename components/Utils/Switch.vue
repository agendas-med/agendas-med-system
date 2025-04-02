<template>
    <div class="switch-group flex items-center">
      <label class="switch" :class="type == 'big' ? 'big' : ''">
        <input type="checkbox" id="switch-input" v-model="active" @change="handleChange">
        <span class="slider round"></span>
      </label>
      <label class="fontsize-sm cinza" for="switch-input">{{ label }}</label>
    </div>
  </template>
  
  <script>
  export default {
    emits: ["changedState"],
    props: ["label", "type", "isactive"],
    data() {
      return {
        active: false
      }
    },
    methods: {
      handleChange() {
        this.$emit("changedState", this.active);
      }
    },
    mounted: function () {
      this.active = this.isactive ? this.isactive : false;
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

  .switch.big {
    width: 60px;
    height: 27px;
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

  .switch.big .slider:before {
    height: 23px;
    width: 23px;
  }
  
  input:checked + .slider {
    background-color: var(--verde-escuro);
  }
  
  input:checked + .slider:before {
    transform: translateX(21.6px);
  }

  .switch.big input:checked + .slider:before {
    transform: translateX(33px);
  }
  
  .slider.round {
    border-radius: 34px;
  }
  
  .slider.round:before {
    border-radius: 50%;
  }
  </style>
  