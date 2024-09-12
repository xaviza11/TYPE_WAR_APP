<template>
    <div v-if="!cookiesAccepted" class="cookie-consent">
      <div class="content">
        <div class="text-content">
        <p>{{ t('cookieComponent.text') }} <a :href="privacyPolicyLink" target="_blank">{{ t('cookieComponent.text2') }}</a>.</p>
        <button @click="acceptCookies">{{ t('cookieComponent.accept') }}</button>
      </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import Cookies from 'js-cookie';
  import { useTranslate } from '../utils/useTranslate/useTranslate';
  
  const { t } = useTranslate();
  
  const cookiesAccepted = ref(false);
  
  onMounted(() => {
    cookiesAccepted.value = Cookies.get('cookiesAccepted') === 'true';
  });
  
  const acceptCookies = () => {
    Cookies.set('cookiesAccepted', 'true', { expires: 365 });
    cookiesAccepted.value = true;
  };
  
  const privacyPolicyLink = '/privacyPolicy';
  </script>
  
  <style scoped>

  .cookie-consent {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(52, 52, 52, 0.431);
    color: rgb(0, 0, 0);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
  }
  
  .content {
    display: flex;
    flex-direction: column-reverse;
    align-items: center;
    justify-content: center;
    text-align: center;
    height: 60vh;
    width: 50vw;
    background-color: #ffffff;
    padding: 1rem;
    border-radius: 8px;
  }

  .text-content {
    width: 30vw;
  }
  
  .cookie-consent p {
    margin-bottom: 2vh;
    font-size: 16px;
  }
  
  .cookie-consent a {
    color: #4CAF50;
    text-decoration: none;
  }
  
  .cookie-consent a:hover {
    text-decoration: underline;
  }
  
  .cookie-consent button {
    background-color: #4CAF50;
    border: none;
    color: white;
    padding: 0.5rem 1rem;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    margin: 0.5rem 0;
    cursor: pointer;
    border-radius: 4px;
  }
  
  .cookie-consent button:hover {
    background-color: #45a049;
  }
  </style>
  