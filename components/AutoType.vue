<template>
    <div class="auto-typing">
      <h5>Segundos: {{ seconds }}</h5>
      <h5>Pulsaciones: {{ pulsations }}</h5>
      <h5>Total errores: {{ totalErrors }}</h5>
      <h5>PPS: {{ pps }}</h5>
      <h2 v-html="renderText()"></h2>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref, onMounted, onUnmounted, computed } from 'vue';
  
  export default defineComponent({
    name: 'AutoTyping',
    setup() {
      const texts = [
        `La mecanografía (comúnmente escrito como mecanografia) es el proceso de escribir con todos los dedos sin mirar el teclado.`,
        `Es una manera rápida y eficiente de escribir.`,
        `AgileFingers es un curso online gratuito de mecanografía que te enseña a dominar esta técnica.`,
      ];
  
      const visibleLength = 20;
      const currentIndex = ref(0);
      const textIndex = ref(0);
      const seconds = ref(0);
      const pulsations = ref(0);
      const totalErrors = ref(0);
      const errorPositions = ref<number[]>([]);
  
      let intervalId: number | null = null;
  
      const startTypingAnimation = () => {
          intervalId = window.setInterval(() => {
            if (currentIndex.value < texts[textIndex.value].length) {
              currentIndex.value += 1;
              pulsations.value += 1;
  
              if (Math.random() < 0.02 && currentIndex.value < texts[textIndex.value].length - 1) {
                errorPositions.value.push(currentIndex.value);
                totalErrors.value += 1;
              }
  
            } else {
              if (textIndex.value < texts.length - 1) {
                textIndex.value += 1; 
              } else {
                textIndex.value = 0; 
              }
              currentIndex.value = 0;
              pulsations.value = 0;
              totalErrors.value = 0;
              errorPositions.value = [];
              seconds.value = 0;
            }
          }, 150); 
      };
  
      const stopTypingAnimation = () => {
        if (intervalId !== null) {
          clearInterval(intervalId);
          intervalId = null;
        }
      };
  
      onMounted(() => {
        startTypingAnimation();
        setInterval(() => {
          seconds.value += 1;
        }, 1000);
      });
  
      onUnmounted(() => {
        stopTypingAnimation();
      });
  
      const renderText = () => {
        const start = Math.max(0, currentIndex.value - Math.floor(visibleLength / 2));
        const end = Math.min(texts[textIndex.value].length, start + visibleLength);
        const visibleText = texts[textIndex.value].substring(start, end);
  
        return visibleText.split('').map((char, index) => {
          const actualIndex = start + index;
          let backgroundColor = 'white';
  
          if (actualIndex < currentIndex.value) {
            if (errorPositions.value.includes(actualIndex)) {
              backgroundColor = 'lightcoral'; 
            } else {
              backgroundColor = 'lightgreen'; 
            }
          }
  
          return `<span style="background-color: ${backgroundColor}; padding-top: 2px; padding-bottom: 2px;">${char}</span>`;
        }).join('');
      };
  
      const pps = computed(() => {
        return seconds.value > 0 ? ((pulsations.value / seconds.value) * 60).toFixed(2) : '0';
      });
  
      return {
        seconds,
        pulsations,
        totalErrors,
        pps,
        renderText
      };
    }
  });
  </script>
  
  <style scoped>
  .auto-typing {
    font-family: Arial, sans-serif;
    padding: 20px;
  }
  </style>
  