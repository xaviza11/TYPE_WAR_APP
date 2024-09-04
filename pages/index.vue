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
import NavBar from '../components/NavBar.vue';
import getRanking from '../handlers/completedTexts/getRanking';
import RankingPanel from '../components/RankingPanel.vue';

export default defineComponent({
  name: 'Home',
  components: {
    AutoType,
    NavBar
  },
  setup() {
    onMounted(async () => {
      try {
        const ranking = await getRanking();
        console.log(ranking);
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
