<template>
    <div class="exercise-list">
      <h2>{{ title }}</h2>
      <ul>
        <li v-for="exercise in exercises" :key="exercise.id">
          {{ exercise.title }}
        </li>
      </ul>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue';
  
  interface Exercise {
    id: number;
    title: string;
  }
  
  export default defineComponent({
    name: 'ExerciseList',
    props: {
      exercises: {
        type: Array as any,
        required: true,
      },
      title: {
        type: String,
        required: true
      }
    },
  });
  </script>
  
  <style scoped>
  .exercise-list {
    font-family: Arial, sans-serif;
    padding: 20px;
  }
  
  .exercise-list ul {
    list-style-type: none;
    padding: 0;
  }
  
  .exercise-list li {
    padding: 10px;
    border-bottom: 1px solid #ddd;
  }
  
  .exercise-list h2 {
    margin-bottom: 20px;
  }
  </style>
  