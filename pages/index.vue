<template>
  <div class="home">
    <NavBar></NavBar>
    <AutoType></AutoType>
    <RankingPanel :rankings="rankings" />
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
  text-align: center;
  margin-top: 50px;
}
</style>
