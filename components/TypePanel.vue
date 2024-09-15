<template>
  <div class="typePanel">
    <div v-if="!isFinish">
      <h2>{{ title }} </h2>
      <div class="stats-container">
        <h2 v-html="renderText()"></h2>
        <table class="stats-table">
          <tr>
            <td>{{ t('typePanel.seconds') }}</td>
            <td>{{ seconds }}</td>
            <td>{{ t('typePanel.pulsations') }}</td>
            <td>{{ pulsations }}</td>
          </tr>
          <tr>
            <td v-if="mood === 'normal'">{{ t('typePanel.totalErrors') }}</td>
            <td v-if="mood === 'normal'">{{ totalErrors }}</td>
            <td>{{ t('typePanel.pps') }}</td>
            <td>{{ pulsationsPerSecond }}</td>
          </tr>
        </table>
      </div>
      <div class="additional-info">
        <h5>{{ t('typePanel.language') }} {{ language }}</h5>
        <h5>{{ t('typePanel.createdAt') }} {{ formattedCreatedAt }}</h5>
      </div>
    </div>
    <div v-if="isFinish">
      <FinishTextPanel :text_id="text_id" :seconds="seconds" :pulsations="pulsations" :totalErrors="totalErrors"
        :pulsationsPerSecond="pulsationsPerSecond" />
    </div>
    <Alert v-if="errorMessage" :message="errorMessage" @close="clearErrorMessage" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, onUnmounted, computed } from 'vue';
import Cookies from 'js-cookie';
import FinishTextPanel from './FinishTextPanel.vue';
import { useTranslate } from '../utils/useTranslate/useTranslate';
import Alert from './Alert.vue';

export default defineComponent({
  props: {
    text_id: {
      type: String,
      required: true
    },
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
    const { t } = useTranslate();
    const seconds = ref(0);
    const pulsations = ref(0);
    const userInput = ref('');
    const isRunning = ref(false);
    const timerStarted = ref(false);
    const deadKey = ref(false);
    const totalErrors = ref(0);
    const isFinish = ref(false);
    let intervalId: number | null = null;
    const errorMessage = ref('');

    const mood: string = Cookies.get('mode') || 'normal';
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
          alert(t('typePanel.end'));
          resetGame();
          return;
        }

        userInput.value = newUserInput;
        pulsations.value += 1;

        if (mood === 'normal') {
          const expectedChar = props.text[userInput.value.length - 1];
          if (expectedChar !== event.key) {
            totalErrors.value += 1;
          }
        }

        if (newUserInput.trim() === props.text.trim()) {
          alert('you win');
          isRunning.value = false;
          stopTimer();
          isFinish.value = true;
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
      return seconds.value > 0 ? Math.floor(pulsations.value / seconds.value) : 0;
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

    
    const clearErrorMessage = () => {
      errorMessage.value = '';
    };

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
      isFinish,
      errorMessage,
      clearErrorMessage,
      t
    };
  }
});
</script>

<style scoped>
.typePanel {
  font-family: Arial, sans-serif;
}

.stats-container {
  padding: 6vh
}

.additional-info {
  margin-top: 20px;
}

.stats-table {
  width: 100%;
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
