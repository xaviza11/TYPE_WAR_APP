<template>
  <div class="alert">
    {{ translatedMessage }}
    <button @click="dismissAlert">{{ t('alert.ok') }}</button>
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
.alert {
  color: red;
  font-weight: bold;
}
button {
  margin-left: 10px;
}
</style>
