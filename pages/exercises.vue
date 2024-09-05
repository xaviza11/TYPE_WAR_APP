<template>
  <div class="exercises-page">
    <div v-if="exerciseList.length === 0">
      Loading exercises...
    </div>
    <div v-else>
      <ul>
        <li v-for="(exercise, index) in exerciseList" :key="index" @click.prevent="navigateTypePage(exercise)">
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
import getTexts from '../handlers/texts/getTexts';
import ExerciseList from '../components/ExerciseList.vue';
import NavBar from '../components/NavBar.vue'

export default defineComponent({
  name: 'ExercisesPage',
  components: {
    ExerciseList,
  },

  setup() {
    const exerciseList = ref<Array<{_id: string, title: string}>>([]);
    const router = useRouter();

    const getTextHandle = async () => {
      const response = await getTexts('exercise', false);
      if (response.success) {
        exerciseList.value = response.data;
      } else {
        console.error(response.message);
      }
    };

    const navigateTypePage = (exercise: {_id: string, title: string}) => {
      router.push({ path: '/typePage', query: { title: exercise.title, _id: exercise._id } });
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
