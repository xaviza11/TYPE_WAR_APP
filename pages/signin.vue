<template>
    <div class="signin-container">
      <h1>Sign In</h1>
      <form @submit.prevent="handleSignIn">
        <div class="input-group">
          <label for="email">Email:</label>
          <input 
            type="email" 
            id="email" 
            v-model="email" 
            required
          />
        </div>
  
        <div class="input-group">
          <label for="password">Password:</label>
          <input 
            type="password" 
            id="password" 
            v-model="password" 
            required
          />
        </div>
  
        <button type="submit">Sign In</button>
      </form>
  
      <Alert v-if="errorMessage" :message="errorMessage" :onClose="clearErrorMessage" />
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref } from 'vue';
  import postAuth from '../handlers/auth/postAuth';
  import Cookies from 'js-cookie'; 
  import Alert from '../components/Alert.vue'; 
  
  export default defineComponent({
    name: 'SignIn',
    components: {
      Alert, 
    },
    setup() {
      const email = ref('');
      const password = ref('');
      const errorMessage = ref(''); 
    
      const handleSignIn = async () => {
        const response = await postAuth(email.value, password.value);
  
        if (response.success) {
          Cookies.set('userToken', response.data.access_token); 
          Cookies.set('userName', response.data.name)
          Cookies.set('userType', response.data.type)
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
      };
    }
  });
  </script>
  
  <style scoped>
  </style>
  