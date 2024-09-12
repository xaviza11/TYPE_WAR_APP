<template>
  <div class="home">
    <div class="components-container">
    <NavBar></NavBar>
    <AutoType></AutoType>
    <RankingPanel :rankings="rankings" />
    <Alert v-if="errorMessage" :message="errorMessage" :onClose="clearErrorMessage" />
  </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import AutoType from '../components/AutoType.vue';
import NavBar from '../components/NavBar.vue';
import RankingPanel from '../components/RankingPanel.vue';
import { useTranslate } from '../utils/useTranslate/useTranslate';
import { useHead } from '@unhead/vue';
import getUsersRanking from '../handlers/completedTexts/getUsersRanking';
import Alert from '../components/Alert.vue'

export default defineComponent({
  name: 'Home',
  components: {
    AutoType,
    NavBar,
    RankingPanel
  },
  setup() {
    const { t } = useTranslate();
    const rankings = ref([]);
    const errorMessage = ref('')

    const loadRankings = async () => {
      const result = await getUsersRanking();
      if(result.success) rankings.value = result.data;
      else errorMessage.value = result.message
    };

    useHead({
      title: t('homePage.title'),
      meta: [
        {
          name: 'description',
          content: t('homePage.description')
        },
        {
          name: 'og:title',
          content: t('homePage.ogTitle')
        },
        {
          name: 'og:description',
          content: t('homePage.ogDescription')
        }
      ]
    });

    onMounted(loadRankings);

    const clearErrorMessage = () => {
        errorMessage.value = '';
      };

    return {
      rankings,
      clearErrorMessage,
      errorMessage,
      t
    };
  },
});
</script>

<style scoped>
.home {
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
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08); 
  border: 1px solid #ddd; 
  font-family: 'Times New Roman', serif; 
  line-height: 1.6; 
  color: #333; 
  background-image: url('../public/images/paperBackGound.png'); 
  background-size: cover;
}

.components-container h1, .components-container h2, .components-container h3 {
  font-family: 'Georgia', serif; 
  text-transform: uppercase;
  margin-bottom: 1rem;
  border-bottom: 2px solid #333;
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
