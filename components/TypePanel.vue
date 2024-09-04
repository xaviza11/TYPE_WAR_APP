<template>
  <div class="app">
    <h1>{{ title }}</h1>
    <h5>Segundos: {{ seconds }}</h5>
    <h5>Pulsaciones: {{ pulsations }}</h5>
    <h5 v-if="mood === 'normal'">Total errores: {{ totalErrors }}</h5>
    <h5>Pulsaciones por segundo: {{ pulsationsPerSecond }}</h5>
    <h2 v-html="renderText()"></h2>
    <div class="additional-info">
      <h5>Language: {{ language }}</h5>
      <h5>Created At: {{ formattedCreatedAt }}</h5>
    </div>
    <div v-if="isFinish">
     <FinishTextPanel
      :seconds="seconds"
      :pulsations="pulsations"
      :totalErrors="totalErrors"
      :pulsationsPerSecond="pulsationsPerSecond"
    />
  </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, onUnmounted, computed } from 'vue';
import Cookies from 'js-cookie';
import FinishTextPanel from './FinishTextPanel.vue';

export default defineComponent({
  props: {
    title: {
      type: String,
      required: true
    },
    text: {
      type: String,
      required: true
    },
    language: {
      type: String,
      required: true
    },
    createdAt: {
      type: String,
      required: true
    }
  },
  components: {
    FinishTextPanel
  },
  setup(props) {
    const seconds = ref(0);
    const pulsations = ref(0);
    const userInput = ref('');
    const isRunning = ref(false);
    const timerStarted = ref(false);
    const deadKey = ref(false);
    const totalErrors = ref(0);
    const isFinish = ref(false)
    let intervalId: number | null = null;

    const mood: string = Cookies.get('mode');
    const visibleLength = 20;

    const startTimer = () => {
      intervalId = window.setInterval(() => {
        seconds.value += 1;
      }, 1000);
    };

    const stopTimer = () => {
      if (intervalId !== null) {
        clearInterval(intervalId);
        intervalId = null;
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey || event.altKey || event.metaKey || event.key === 'Shift') {
        return;
      }

      if (event.key === 'Dead') {
        deadKey.value = true;
        return;
      }

      if (event.key === 'Backspace') {
        if (userInput.value.length > 0) {
          userInput.value = userInput.value.slice(0, -1);
          pulsations.value += 1;
        }
        return;
      }

      const validKey = event.key.length === 1;

      if (validKey) {
        if (deadKey.value) {
          deadKey.value = false;
        }

        if (!timerStarted.value) {
          timerStarted.value = true;
          isRunning.value = true;
          startTimer(); 
        }

        const newUserInput = userInput.value + event.key;

        if (mood === 'master' && props.text[userInput.value.length] !== event.key) {
          console.log(mood);
          alert('¡Juego terminado! Cometiste un error.');
          resetGame();
          return;
        }

        userInput.value = newUserInput;
        pulsations.value += 1;

        if (mood === 'normal') {
          const expectedChar = props.text[userInput.value.length - 1];
          if (expectedChar !== event.key) {
            console.log(expectedChar, event.key);
            totalErrors.value += 1;
          }
        }

        if (newUserInput === props.text) {
          isRunning.value = false;
          stopTimer(); 
          isFinish.value === true
        }
      }
    };

    const resetGame = () => {
      stopTimer(); 
      seconds.value = 0;
      pulsations.value = 0;
      userInput.value = '';
      isRunning.value = false;
      timerStarted.value = false;
      deadKey.value = false;
      totalErrors.value = 0;
    };

    onMounted(() => {
      window.addEventListener('keydown', handleKeyDown);
    });

    onUnmounted(() => {
      window.removeEventListener('keydown', handleKeyDown);
      stopTimer();
    });

    const pulsationsPerSecond = computed(() => {
      return seconds.value > 0 ? (pulsations.value / seconds.value).toFixed(2) : '0';
    });

    const renderText = () => {
      const start = Math.max(0, userInput.value.length - Math.floor(visibleLength / 2));
      const end = Math.min(props.text.length, start + visibleLength);
      const visibleText = props.text.substring(start, end);

      return visibleText.split('').map((char, index) => {
        let backgroundColor = 'white';
        const actualIndex = start + index;
        if (actualIndex < userInput.value.length) {
          if (userInput.value[actualIndex] === char) {
            backgroundColor = 'lightgreen'; 
          } else {
            backgroundColor = 'lightcoral';
          }
        }
        return `<span style="background-color: ${backgroundColor}; padding-top: 2px; padding-bottom: 2px;">${char}</span>`;
      }).join('');
    };

    const formattedCreatedAt = computed(() => {
      if (!props.createdAt) return '';
      const date = new Date(props.createdAt);
      return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
    });

    return {
      seconds,
      pulsations,
      userInput,
      isRunning,
      timerStarted,
      deadKey,
      totalErrors,
      mood,
      renderText,
      pulsationsPerSecond,
      resetGame,
      title: props.title,
      formattedCreatedAt,
      isFinish
    };
  }
});
</script>

<style scoped>
.app {
  font-family: Arial, sans-serif;
  padding: 20px;
}
.additional-info {
  margin-top: 20px;
}
</style>
