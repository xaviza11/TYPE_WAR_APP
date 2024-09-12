<template>
   <div class="overlay">
      <div class="alert">
    {{ translatedMessage }}
    <button @click="dismissAlert">{{ t('alert.ok') }}</button>
  </div>
</div>
</template>

<script lang="ts">
import { defineComponent, onMounted, computed } from 'vue';
import { useTranslate } from '../utils/useTranslate/useTranslate';
import { useTranslateErrors } from '../utils/useTranslate/useTranslateErrors';

export default defineComponent({
  name: 'Alert',
  props: {
    message: {
      type: String as any,
      required: true,
    },
  },
  setup(props, { emit }) {
    const { t } = useTranslate(); 
    const { translateError } = useTranslateErrors();

    const translatedMessage = computed(() => {
      return translateError(props.message);
    });

    const dismissAlert = () => {
      emit('close'); 
    };

    onMounted(() => {
      setTimeout(() => {
        dismissAlert();
      }, 5000); 
    });

    return {
      t,
      dismissAlert,
      translatedMessage,
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
  height: 50vh;
  width: 100%;
  max-width: 500px; 
  text-align: center;
  color: black;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
}

.alert h2 {
  margin-bottom: 1rem;
  font-size: 1.5rem;
  color: #333;
}

.alert p {
  margin-bottom: 2rem;
  font-size: 1rem;
  color: #666;
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
