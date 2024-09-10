<template>
    <div class="signin-container">
      <h1>{{ t('signinPage.signin') }}</h1>
      <form @submit.prevent="handleSignIn">
        <div class="input-group">
          <label for="email">{{ t('signinPage.email') }}</label>
          <input 
            type="email" 
            id="email" 
            v-model="email" 
            required
          />
        </div>
  
        <div class="input-group">
          <label for="password">{{ t('signinPage.password') }}</label>
          <input 
            type="password" 
            id="password" 
            v-model="password" 
            required
          />
        </div>
  
        <button type="submit">{{ t('signinPage.signin') }}</button>
      </form>
  
      <Alert v-if="errorMessage" :message="errorMessage" :onClose="clearErrorMessage" />
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref } from 'vue';
  import postAuth from '../handlers/auth/postAuth';
  import Cookies from 'js-cookie'; 
  import Alert from '../components/Alert.vue'; 
  import { useTranslate } from '../utils/useTranslate/useTranslate';
  import {useHead} from '@unhead/vue'
  
  export default defineComponent({
    name: 'SignIn',
    components: {
      Alert, 
    },
    setup() {

      const {t} = useTranslate()

      useHead({
        title: t('signinPage.title'),
        meta: [
          {
            name: 'description',
            content: t('signinPage.description')
          },
          {
            name: 'title:description',
            content: t('signinPage.title')
          },
          {
            name: 'og:description',
            content: t('signinPage.description')
          }
        ]
      })

      const email = ref('');
      const password = ref('');
      const errorMessage = ref(''); 
    
      const handleSignIn = async () => {
        const response = await postAuth(email.value, password.value);
  
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
        handleSignIn,
        errorMessage,
        clearErrorMessage,
        t
      };
    }
  });
  </script>
  
  <style scoped>
  </style>
  