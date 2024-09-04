<template>
    <div class="alert">
      {{ message }}
      <button @click="dismissAlert">OK</button>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue';
  
  export default defineComponent({
    name: 'Alert',
    props: {
      message: {
        type: String as any,
        required: true,
      },
    },
    methods: {
      dismissAlert() {
        this.$emit('close');
      }
    },
    mounted() {
      setTimeout(() => {
        this.dismissAlert();
      }, 5000); 
    }
  });
  </script>
  
  <style scoped>
  .alert {
    color: red;
    font-weight: bold;
  }
  button {
    margin-left: 10px;
  }
  </style>
  