<template>
  <div class="overlay">
    <div class="info-box">
      <h3>{{ t('finishTextPanel.stats') }}</h3>
      <table class="stats-table">
        <tr>
          <th>{{ t('finishTextPanel.time') }}</th>
          <td>{{ formattedTime }}</td>
        </tr>
        <tr>
          <th>{{ t('finishTextPanel.pulsations') }}</th>
          <td>{{ pulsations }}</td>
        </tr>
        <tr>
          <th>{{ t('finishTextPanel.totalErrors') }}</th>
          <td>{{ totalErrors }}</td>
        </tr>
        <tr>
          <th>{{ t('finishTextPanel.pulsationsPerSecond') }}</th>
          <td>{{ pulsationsPerSecond }}</td>
        </tr>
        <tr>
          <th>{{ t('finishTextPanel.errorsPerSecond') }}</th>
          <td>{{ errorsPerSecond }}</td>
        </tr>
      </table>
      <div class="actions">
        <button class="button" @click="reloadPage">{{ t('finishTextPanel.again') }}</button>
      </div>
    </div>

    <Alert v-if="errorMessage" :message="errorMessage" :onClose="clearErrorMessage" />
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from 'vue';
import { useTranslate } from '../utils/useTranslate/useTranslate';
import completedExercises from '../handlers/completedTexts/completedExercises';
import Cookies from 'js-cookie';
import Alert from './Alert.vue';
import { useRouter } from 'vue-router';

export default defineComponent({
  props: {
    text_id: {
      type: String,
      required: true
    },
    seconds: {
      type: Number,
      required: true
    },
    pulsations: {
      type: Number,
      required: true
    },
    totalErrors: {
      type: Number,
      required: true
    },
    pulsationsPerSecond: {
      type: Number,
      required: true
    }
  },
  setup(props) {
    const { t } = useTranslate();
    const errorMessage = ref('');
    const router = useRouter();

    const handleCompletedExercise = async () => {
      const user_name = Cookies.get('userName');
      const mode = Cookies.get('mode');

      if (!user_name || !mode) return;

      const pps = props.pulsationsPerSecond;
      const seconds = props.seconds;
      const numberErrors = props.totalErrors;
      const res = await completedExercises(user_name, props.text_id, pps, mode, seconds, numberErrors);
      if (!res.success) errorMessage.value = res.message;
    };

    handleCompletedExercise();

    const formattedTime = computed(() => {
      const minutes = Math.floor(props.seconds / 60);
      const seconds = props.seconds % 60;
      return `${minutes}m ${seconds}s`;
    });

    const errorsPerSecond = computed(() => {
      return props.seconds > 0 ? (props.totalErrors / props.seconds).toFixed(2) : '0';
    });

    const clearErrorMessage = () => {
      errorMessage.value = '';
    };

    const reloadPage = () => {
      window.location.reload();
    };


    return {
      formattedTime,
      errorsPerSecond,
      clearErrorMessage,
      errorMessage,
      reloadPage,
      t
    };
  }
});
</script>

<style scoped>
.overlay {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1000;
  padding: 2rem;
  border-radius: 10px;
  width: 80vw;
  max-width: 600px;
}

.info-box {
  background-color: white;
  padding: 2rem;
  border-radius: 10px;
  font-family: 'Times New Roman', serif;
  line-height: 1.6;
}

.stats-table {
  width: 100%;
  margin-bottom: 1rem;
  font-family: 'Times New Roman', serif;
  text-align: left;
}

.stats-table th, .stats-table td {
  padding: 0.5rem;
  font-size: 0.8rem;
  border-bottom: 1px solid #ddd;
}

.stats-table th {
  font-weight: bold;
}

.stats-table td {
  text-align: right;
}

h3 {
  font-family: 'Georgia', serif;
  text-transform: uppercase;
  margin-bottom: 1.5rem;
  border-bottom: 2px solid #333;
  padding-bottom: 0.5rem;
  text-align: center;
}

.actions {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.button {
  background-color: #4CAF50;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-family: 'Times New Roman', serif;
  font-size: 0.8rem;
  margin: 0.5rem 0;
  text-align: center;
  width: 100%;
  max-width: 200px;
  display: inline-block;
}

.button:hover {
  background-color: #45a049;
}
</style>
