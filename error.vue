<template>
    <div class="not-found">
      <h2>{{ t('404.title') }}</h2>
      <p>{{ t('404.text') }}</p>
      <router-link to="/">{{ t('404.return') }}</router-link>
    </div>
  </template>
  
  <script setup>
  import { useTranslate } from './utils/useTranslate/useTranslate'

  const { t } = useTranslate();
  </script>
  
  <style scoped>
  .not-found {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #f8f9fa;
    color: #343a40;
    font-family: Arial, sans-serif;
    padding: 10px
  }
  
  h2 {
    font-size: 3rem;
  }
  
  p {
    font-size: 1.2rem;
    margin-bottom: 20px;
  }
  
  a {
    color: #007bff;
    text-decoration: none;
    font-weight: bold;
  }
  
  a:hover {
    text-decoration: underline;
  }
  </style>
  