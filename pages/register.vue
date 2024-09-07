<template>
    <div class="register-container">
      <h1>Register</h1>
      <form @submit.prevent="handleRegister">

        <div class="input-group">
          <label for="password">Name:</label>
          <input 
            type="name" 
            id="name" 
            v-model="name" 
            required
          />
        </div>
  
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

        <div class="input-group">
          <label for="confirmPassword">Confirm Password:</label>
          <input 
            type="password" 
            id="confirmPassword" 
            v-model="confirmPassword" 
            required
          />
        </div>
  
        <button type="submit">Register</button>
      </form>
  
      <Alert v-if="errorMessage" :message="errorMessage" :onClose="clearErrorMessage" />
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref } from 'vue';
  import Alert from '../components/Alert.vue';
  import Cookies from 'js-cookie';
  import postRegister from '../handlers/users/postRegister';
  
  export default defineComponent({
    name: 'Register',
    components: {
      Alert,
    },
    setup() {
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
          Cookies.set('userToken', response.data.access_token);
          Cookies.set('sessionExpirationDate', response.data.expirationDate)
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
        name,
        confirmPassword,
        handleRegister,
        errorMessage,
        clearErrorMessage,
      };
    }
  });
  </script>
  
  <style scoped>
  </style>
  