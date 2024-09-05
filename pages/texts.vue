<template>
  <div class="exercises-page">
    <div v-if="exerciseList.length === 0">
      Loading exercises...
    </div>
    <div v-else>
      <ul>
        <li v-for="(exercise, index) in exerciseList" :key="exercise._id" @click.prevent="navigateTypePage(exercise.title, exercise._id)">
          {{ index + 1 }}. {{ exercise.title }}
        </li>
      </ul>
    </div>
    <NavBar></NavBar>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router';
import ExerciseList from '../components/ExerciseList.vue';
import getTexts  from '../handlers/texts/getTexts';
import NavBar from '../components/NavBar.vue'

export default defineComponent({
  name: 'ExercisesPage',
  components: {
    ExerciseList,
  },
  setup() {
    const router = useRouter(); 
    const exerciseList = ref<Array<{ _id: string; title: string }>>([]);

    const getTextHandle = async () => {
      const response = await getTexts('text', true);
      if (response.success) {
        exerciseList.value = response.data;
      } else {
        console.error(response.message);
      }
    };

    const navigateTypePage = (title: string, id: string) => {
      router.push({ path: '/typePage', query: { title: title, _id: id } });
    };

    getTextHandle();

    return {
      exerciseList,
      navigateTypePage
    };
  },
});
</script>

<style scoped>
.exercises-page {
  padding: 20px;
}
</style>
