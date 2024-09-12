<template>
  <div class="auto-typing">
    <h2 v-html="renderText()"></h2>
    <table class="stats-table">
      <tr>
        <td>{{ t('autoType.seconds') }}</td>
        <td>{{ seconds }}</td>
        <td>{{ t('autoType.pulsations') }}</td>
        <td>{{ pulsations }}</td>
      </tr>
      <tr>
        <td>{{ t('autoType.totalErrors') }}</td>
        <td>{{ totalErrors }}</td>
        <td>{{ t('autoType.pps') }}</td>
        <td>{{ pps }}</td>
      </tr>
    </table>
  </div>
</template>

  
  <script lang="ts">
  import { defineComponent, ref, onMounted, onUnmounted, computed } from 'vue';
  import { useTranslate } from '../utils/useTranslate/useTranslate';
  
  export default defineComponent({
    name: 'AutoTyping',
    setup() {
      const {t} = useTranslate()

      const txt1 = t('texts.t1')
      const txt2 = t('texts.t2')
      const txt3 = t('texts.t3')

      const texts = [
        txt1,
        txt2,
        txt3
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
        return seconds.value > 0 ? ((pulsations.value / seconds.value)).toFixed(2) : '0';
      });
  
      return {
        seconds,
        pulsations,
        totalErrors,
        pps,
        renderText,
        t
      };
    }
  });
  </script>
  
  <style scoped>
  .auto-typing {
    font-family: Arial, sans-serif;
    padding: 20px;
  }
  
  .stats-table {
    width: 100%;
    margin-top: 20px;
    border-collapse: collapse;
  }
  
  .stats-table td {
    padding: 10px;
    border: 1px solid #ddd;
    text-align: left;
    font-size: 14px;
  }
  
  .stats-table td:first-child {
    font-weight: bold;
  }
  </style>
  