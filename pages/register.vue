<template>
    <div class="register-container">
      <h1>{{ t('registerPage.register') }}</h1>
      <form @submit.prevent="handleRegister">

        <div class="input-group">
          <label for="password">{{ t('registerPage.name') }}</label>
          <input 
            type="name" 
            id="name" 
            v-model="name" 
            required
          />
        </div>
  
        <div class="input-group">
          <label for="email">{{ t('registerPage.email') }}</label>
          <input 
            type="email" 
            id="email" 
            v-model="email" 
            required
          />
        </div>
  
        <div class="input-group">
          <label for="password">{{ t('registerPage.password') }}</label>
          <input 
            type="password" 
            id="password" 
            v-model="password" 
            required
          />
        </div>

        <div class="input-group">
          <label for="confirmPassword">{{ t('registerPage.confirmPassword') }}</label>
          <input 
            type="password" 
            id="confirmPassword" 
            v-model="confirmPassword" 
            required
          />
        </div>
  
        <button type="submit">{{ t('registerPage.register') }}</button>
      </form>
  
      <Alert v-if="errorMessage" :message="errorMessage" :onClose="clearErrorMessage" />
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref } from 'vue';
  import Alert from '../components/Alert.vue';
  import Cookies from 'js-cookie';
  import postRegister from '../handlers/users/postRegister';
  import { useTranslate } from '../utils/useTranslate/useTranslate';
  import {useHead} from '@unhead/vue'
  
  export default defineComponent({
    name: 'Register',
    components: {
      Alert,
    },
    setup() {

      const {t} = useTranslate()

      useHead({
        title: t('registerPage.title'),
        meta: [
          {
            name: t('description'),
            content: t('registerPage.description')
          },
          {
            name: t('og:title'),
            content: t('registerPage.title')
          },
          {
            name: t('og:description'),
            content: t('registerPage.description')
          }
        ]
      })

      const email = ref('');
      const password = ref('');
      const confirmPassword = ref('');
      const name = ref('')
      const errorMessage = ref('');
  
      const handleRegister = async () => {

        if (password.value !== confirmPassword.value) {
          errorMessage.value = "Passwords do not match!";
          return;
        }
  
        const response = await postRegister(email.value, password.value, name.value);
        if (response.success) {
          Cookies.set('userToken', response.data.access_token, {expires: 7});
          Cookies.set('sessionExpirationDate', response.data.expirationDate, {expires: 7})
          Cookies.set('userName', response.data.name, {expires: 7})
          Cookies.set('userType', response.data.type, {expires: 7})
          window.location.href = '/';
        } else {
          errorMessage.value = response.message;
        }
      };
  
      const clearErrorMessage = () => {
        errorMessage.value = '';
      };
  
      return {
        email,
        password,
        name,
        confirmPassword,
        handleRegister,
        errorMessage,
        clearErrorMessage,
        t
      };
    }
  });
  </script>
  
  <style scoped>
  </style>
  