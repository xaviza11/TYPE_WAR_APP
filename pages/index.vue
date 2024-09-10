<template>
  <div class="home">
    <NavBar></NavBar>
    <AutoType></AutoType>
    <RankingPanel></RankingPanel>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue';
import AutoType from '../components/AutoType.vue';
import NavBar from '../components/NavBar.vue'
import getUsersRanking from '../handlers/completedTexts/getUsersRanking';
import RankingPanel from '../components/RankingPanel.vue';
import { useTranslate } from '../utils/useTranslate/useTranslate';
import { useHead } from '@unhead/vue';

export default defineComponent({
  name: 'Home',
  components: {
    AutoType,
    NavBar
  },
  setup() {

    const {t} = useTranslate()

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
    })

    onMounted(async () => {
      try {
        const ranking = await getUsersRanking();
      } catch (error) {
        console.error('Error fetching ranking:', error);
      }
    });

    return {};
  },
});
</script>

<style scoped>
.home {
  text-align: center;
  margin-top: 50px;
}
</style>
