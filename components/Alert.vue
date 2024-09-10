<template>
  <div class="alert">
    {{ message }}
    <button @click="dismissAlert">{{ t('alert.ok') }}</button>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import { useTranslate } from '../utils/useTranslate/useTranslate';

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
    };
  },
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
