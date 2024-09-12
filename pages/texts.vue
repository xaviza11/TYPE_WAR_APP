<template>
  <div class="texts-page">
    <div v-if="exerciseList.length === 0">
      {{ t('textsPage.loadingExercises') }}
    </div>
    <div class="content-container" v-else>
      <ul>
        <li v-for="(exercise, index) in exerciseList" :key="exercise._id" @click.prevent="navigateTypePage(exercise.title, exercise._id)">
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
import getTexts  from '../handlers/texts/getTexts';
import NavBar from '../components/NavBar.vue'
import { useTranslate } from '../utils/useTranslate/useTranslate';
import { useHead } from '@unhead/vue'
import Alert from '../components/Alert.vue'

export default defineComponent({
  name: 'ExercisesPage',
  setup() {
    const router = useRouter(); 
    const exerciseList = ref<Array<{ _id: string; title: string }>>([]);
    const {t} = useTranslate()
    const errorMessage = ref('')

    useHead({
      title: t('textsPage.title'),
      meta: [
        {
          name: 'description',
          content: t('textsPage.description')
        },
        {
          property: 'og:title',
          content: t('textsPage.ogTitle')
        },
        {
          property: 'og:description',
          content: t('textsPage.OgDescription')
        }
      ]
    })

    const getTextHandle = async () => {
      const response = await getTexts('text', true);
      if (response.success) {
        exerciseList.value = response.data;
      } else {
        errorMessage.value = response.message
      }
    };

    const navigateTypePage = (title: string, id: string) => {
      router.push({ path: '/typePage', query: { title: title, _id: id } });
    };

    const clearErrorMessage = () => {
        errorMessage.value = '';
      };


    getTextHandle();

    return {
      exerciseList,
      navigateTypePage,
      clearErrorMessage,
      errorMessage,
      t
    };
  },
});
</script>

<style scoped>
.texts-page {
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
  box-shadow: 0 4px 6px var(--transparent-color), 0 1px 3px var(--transparent-color); 
  border: 1px solid var(--grey-color); 
  font-family: 'Times New Roman', serif; 
  line-height: 1.6; 
  color: var(--grey-color); 
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
