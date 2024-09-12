<template>
  <div class="signin-container">
    <form @submit.prevent="handleSignIn" class="signin-form">
      <h2 class="title">{{ t('signinPage.signin') }}</h2>

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

      <button type="submit" class="signin-button">{{ t('signinPage.signin') }}</button>
      <div class="links-container">
        <router-link to="/" class="link">{{ t('signinPage.home') }}</router-link>
        <router-link to="/register" class="link">{{ t('signinPage.register') }}</router-link>
      </div>
      
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
.signin-container {
  background-color: black;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  color: black;
}

.title {
  color: black;
  margin-bottom: 6vh;
}

.signin-form {
  background-color: white;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 4px 8px var(--transparent-color);
  width: 100%;
  max-width: 400px;
  text-align: left;
}

.input-group {
  margin-bottom: 1.5rem;
}

.input-group label {
  font-size: 1.1rem;
  color: black;
  margin-bottom: 0.5rem;
  display: block;
}

.input-group input {
  width: 100%;
  padding: 0.75rem;
  font-size: 1rem;
  border: 1px solid black;
  border-radius: 5px;
  box-sizing: border-box;
}

.signin-button {
  background-color: black;
  color: white;
  padding: 0.75rem 1.5rem;
  font-size: 1.1rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  width: 100%;
  transition: background-color 0.3s;
}

.signin-button:hover {
  background-color: #4caf50;
}

.links-container {
  margin-bottom: 2rem;
  display: flex;
  flex-direction: column;
  text-align: center;
  justify-content: space-between;
}

.link {
  color: blue;
  margin-top: 2vh;
  font-size: 0.9rem;
  transition: color 0.3s;
}
</style>
