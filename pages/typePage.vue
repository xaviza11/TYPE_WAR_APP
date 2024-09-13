<template>
  <div class="TypePage">
    <div class="components-container">
    <TypePanel v-if="title" :text_id="text_id" :title="title" :text="text" :language="language" :createdAt="createdAt" />
    <NavBar></NavBar>
    <Alert v-if="errorMessage" :message="errorMessage" :onClose="clearErrorMessage" />
  </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import TypePanel from '../components/TypePanel.vue';
import getOneText from '../handlers/texts/getTextById';
import NavBar from '../components/NavBar.vue';
import { useTranslate } from '../utils/useTranslate/useTranslate'
import { useHead } from '@unhead/vue'
import Alert from '../components/Alert.vue';

export default defineComponent({
  name: 'TypePage',
  components: {
    TypePanel
  },
  setup() {

    const { t } = useTranslate()

    useHead({
      title: t('typePage.title'),
      meta: [
        {
          name: 'description',
          content: t('typePage.description')
        },
        {
          property: 'og:title',
          content: t('typePage.ogTitle')
        },
        {
          property: 'og:description',
          content: t('typePage.ogDescription')
        }
      ]
    });

    const route = useRoute();
    const text_id = ref('')
    const title = ref('');
    const text = ref('');
    const language = ref('');
    const createdAt = ref('');
    const errorMessage = ref('');

    const getTitleFromRoute = async () => {
      const queryId = route.query._id as string;
      const response = await getOneText(queryId);
      if (response.success) {
        text_id.value = response.data._id
        title.value = response.data.title;
        text.value = response.data.text;
        language.value = response.data.language;
        createdAt.value = response.data.createdAt;
      }else {
        errorMessage.value = response.message
      }
    };

    const clearErrorMessage = () => {
        errorMessage.value = '';
      };

    onMounted(() => {
      getTitleFromRoute();
    });

    return {
      title,
      text_id,
      text,
      language,
      createdAt,
      errorMessage,
      clearErrorMessage
    };
  }
});
</script>

<style scoped>
.TypePage {
  background-color: white;
  height: 100vh;
  width: 100vw;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: black;
}

.components-container {
  background-color: white;
  height: 90vh;
  width: 80vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  border-radius: 10px; 
  box-shadow: 0 4px 6px black, 0 1px 3px black; 
  border: 1px solid #ddd; 
  font-family: 'Times New Roman', serif; 
  line-height: 1.6; 
  color: var(--lightBlack-color); 
  background-image: url('../public/images/paperBackGound.png'); 
  background-size: cover;
}

.components-container h1, .components-container h2, .components-container h3 {
  font-family: 'Georgia', serif; 
  text-transform: uppercase;
  margin-bottom: 1rem;
  border-bottom: 2px solid var(--lightBlack-color);
  padding-bottom: 0.5rem;
}

.components-container p {
  text-align: justify;
}

.components-container::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: -1;
  background: linear-gradient(to bottom, #f9f9f9, #eee);
  border-radius: 10px;
}
</style>
