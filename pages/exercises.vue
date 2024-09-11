<template>
  <div class="exercises-page">
    <div v-if="exerciseList.length === 0">
      {{ t('exercisesPage.loadingPage') }}
    </div>
    <div v-else>
      <ul>
        <li v-for="(exercise, index) in exerciseList" :key="index" @click.prevent="navigateTypePage(exercise)">
          {{ index + 1 }}. {{ exercise.title }}
        </li>
      </ul>
    </div>
    <NavBar></NavBar>
    
    <Alert v-if="errorMessage" :message="errorMessage" :onClose="clearErrorMessage" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router';
import getTexts from '../handlers/texts/getTexts';
import ExerciseList from '../components/ExerciseList.vue';
import NavBar from '../components/NavBar.vue'
import { useTranslate } from '../utils/useTranslate/useTranslate';
import { useHead } from '@unhead/vue';
import Alert from '../components/Alert.vue'

export default defineComponent({
  name: 'ExercisesPage',
  components: {
    ExerciseList,
  },

  setup() {
    const {t} = useTranslate()
    const errorMessage = ref('')

    useHead({
      title: t('exercisesPage.title'),
      meta: [
        {
          name: 'description',
          content: t('exercisesPage.description'),
        },
        {
          name: 'og:description',
          content: t('exercisesPage.ogDescription')
        },
        {
          name: 'og:title',
          content: t('exercisesPage.ogTitle')
        }
      ]
    })

    const exerciseList = ref<Array<{_id: string, title: string}>>([]);
    const router = useRouter();

    const getTextHandle = async () => {
      const response = await getTexts('exercise', false);
      if (response.success) {
        exerciseList.value = response.data;
      } else {
        errorMessage.value = response.message
      }
    };

    const navigateTypePage = (exercise: {_id: string, title: string}) => {
      router.push({ path: '/typePage', query: { title: exercise.title, _id: exercise._id } });
    };

    const clearErrorMessage = () => {
        errorMessage.value = '';
      };

    getTextHandle();

    return {
      exerciseList,
      navigateTypePage,
      errorMessage,
      clearErrorMessage,
      t
    };
  },
});
</script>

<style scoped>
.exercises-page {
  padding: 20px;
}
</style>
