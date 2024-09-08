<template>
    <div class="overlay">
      <div class="info-box">
        <h3>Statistics</h3>
        <p>Time: {{ formattedTime }}</p>
        <p>Pulsations: {{ pulsations }}</p>
        <p>Total Errors: {{ totalErrors }}</p>
        <p>Pulsations Per Second: {{ pulsationsPerSecond }}</p>
        <p>Errors Per Second: {{ errorsPerSecond }}</p>
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, computed } from 'vue';
  
  export default defineComponent({
    props: {
      seconds: {
        type: Number,
        required: true
      },
      pulsations: {
        type: Number,
        required: true
      },
      totalErrors: {
        type: Number,
        required: true
      },
      pulsationsPerSecond: {
        type: [Number, String], 
        required: true
      }
    },
    setup(props) {
      const formattedTime = computed(() => {
        const minutes = Math.floor(props.seconds / 60);
        const seconds = props.seconds % 60;
        return `${minutes}m ${seconds}s`;
      });
  
      const errorsPerSecond = computed(() => {
        return props.seconds > 0 ? (props.totalErrors / props.seconds).toFixed(2) : '0';
      });
  
      return {
        formattedTime,
        errorsPerSecond
      };
    }
  });
  </script>
  
  <style scoped>
  .overlay {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 1000;
    background: rgba(0, 0, 0, 0.5);
    padding: 20px;
    border-radius: 8px;
  }
  
  .info-box {
    background: white;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  }
  </style>
  