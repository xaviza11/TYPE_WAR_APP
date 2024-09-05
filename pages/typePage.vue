<template>
  <div class="TypePage">
    <TypePanel :title="title" :text="text" :language="language" :createdAt="createdAt" />
    <NavBar></NavBar>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import TypePanel from '../components/TypePanel.vue';
import getOneText from '../handlers/texts/getTextById';
import NavBar from '../components/NavBar.vue';

export default defineComponent({
  name: 'TypePage',
  components: {
    TypePanel
  },
  setup() {
    const route = useRoute();
    const title = ref('');
    const text = ref('');
    const language = ref('');
    const createdAt = ref('');

    const getTitleFromRoute = async () => {
      const queryId = route.query._id as string;
      const response = await getOneText(queryId);
      title.value = response.data.title;
      text.value = response.data.text;
      language.value = response.data.language;
      createdAt.value = response.data.createdAt;
    };

    onMounted(() => {
      getTitleFromRoute();
    });

    return {
      title,
      text,
      language,
      createdAt
    };
  }
});
</script>

<style scoped>
.TypePage {
  text-align: center;
  margin-top: 50px;
}
</style>
