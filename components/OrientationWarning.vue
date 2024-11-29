<template>
    <div v-if="showWarning" class="orientation-warning">
      <p>{{ t('orientationWarning.text') }}</p>
    </div>
  </template>
  
  <script>
  import { ref, onMounted, onUnmounted } from 'vue';
  import { useTranslate } from '../utils/useTranslate/useTranslate';
  
  export default {
    name: 'OrientationWarning',
    setup() {
      const { t } = useTranslate();
      const showWarning = ref(false);
  
      const checkOrientation = () => {
        const isLandscape = window.innerWidth > window.innerHeight;
        const isMobile = /Mobi|Android/i.test(navigator.userAgent);
        showWarning.value = isLandscape && isMobile;
      };
  
      onMounted(() => {
        checkOrientation();
        window.addEventListener('resize', checkOrientation);
      });
  
      onUnmounted(() => {
        window.removeEventListener('resize', checkOrientation);
      });
  
      return {
        t,
        showWarning,
      };
    },
  };
  </script>
  
  <style scoped>
  .orientation-warning {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.8);
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    z-index: 1000;
    font-size: 1.5rem;
    padding: 1rem;
  }
  </style>
  