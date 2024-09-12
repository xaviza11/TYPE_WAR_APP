<template>
    <div class="server-down">
      <div class="server-down-content">
        <h2>500</h2>
        <h2>{{ t('500.title') }}</h2>
        <p>{{ t('500.text') }}</p>
        <router-link to="/">{{ t('500.return') }}</router-link>
      </div>
    </div>
  </template>

<script setup>
import { useTranslate } from '../utils/useTranslate/useTranslate'

const { t } = useTranslate();
</script>
  
  <style scoped>
  .server-down {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
    font-family: Arial, sans-serif;
    background-color: black;
  }
  
  .server-down-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 50vh;
    max-width: 80vw;
    text-align: center;
    background: white;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }
  </style>
  