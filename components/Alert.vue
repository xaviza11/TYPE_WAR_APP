<template>
  <div class="overlay">
    <div class="alert">
      {{ message }} 
      <button @click="dismissAlert">OK</button> 
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Alert',
  props: {
    message: {
      type: String,
      required: true, 
    },
  },
  setup(props, { emit }) {
    const dismissAlert = () => {
      emit('close'); 
    };

    return {
      dismissAlert,
    };
  },
});
</script>

<style scoped>
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5); 
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000; 
}

.alert {
  background-color: #fff;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(5, 5, 5, 0.667);
  height: 30vh;
  width: vw;
  max-width: 500px; 
  text-align: center;
  color: black;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
}

.alert button {
  background-color: #007bff;
  color: #fff;
  padding: 0.4rem 0.75rem;
  font-size: 1rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
  width: 10vw;
}

.alert button:hover {
  background-color: #0056b3;
}
</style>
