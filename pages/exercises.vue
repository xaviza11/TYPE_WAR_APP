<template>
  <div class="exercises-page">
    <div v-if="exerciseList.length === 0">
      {{ t('exercisesPage.loadingPage') }}
    </div>
    <div class="content-container" v-else>
      <ul>
        <li v-for="(exercise, index) in exerciseList" :key="index" @click.prevent="navigateTypePage(exercise)">
          <p>{{ index + 1 }}. {{ exercise.title }}</p>
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
import NavBar from '../components/NavBar.vue'
import { useTranslate } from '../utils/useTranslate/useTranslate';
import { useHead } from '@unhead/vue';
import Alert from '../components/Alert.vue'

export default defineComponent({
  name: 'ExercisesPage',

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
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: black;
  height: 100vh;
}

.content-container {
  background-color: white;
  height: 90vh;
  width: 30vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  border-radius: 10px; 
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08); 
  border: 1px solid #ddd; 
  font-family: 'Times New Roman', serif; 
  line-height: 1.6; 
  color: #333; 
  background-image: url('../public/images/paperBackGound.png'); 
  background-size: cover;
}

@media (orientation: portrait) {
  .content-container {
    width: 70vw;
  }
}

.content-container h1, .content-container h2, .content-container p {
  font-family: 'Georgia', serif; 
  text-transform: uppercase;
  padding-bottom: 0.5rem;
  cursor: pointer
}

</style>
