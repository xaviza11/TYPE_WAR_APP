<template>
  <div class="register-container">
    <form @submit.prevent="handleRegister" class="register-form">
      <h2 class="title">{{ t('registerPage.register') }}</h2>
      <div class="input-group">
        <label for="name">{{ t('registerPage.name') }}</label>
        <input 
          type="text" 
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

      <button type="submit" class="register-button">{{ t('registerPage.register') }}</button>

      <div class="links-container">
        <router-link to="/" class="link">{{ t('registerPage.home') }}</router-link>
        <router-link to="/signin" class="link">{{ t('registerPage.signin') }}</router-link>
      </div>
    </form>

    <Alert v-if="errorMessage" :message="errorMessage" :onClose="clearErrorMessage" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import postRegister from '../handlers/users/postRegister';
import Alert from '../components/Alert.vue';
import { useTranslate } from '../utils/useTranslate/useTranslate';
import { useHead } from '@unhead/vue';

export default defineComponent({
  name: 'Register',
  components: {
    Alert,
  },
  setup() {
    const { t } = useTranslate();

    useHead({
      title: t('registerPage.title'),
      meta: [
        {
          name: 'description',
          content: t('registerPage.description')
        },
        {
          name: 'og:description',
          content: t('registerPage.description')
        }
      ]
    });

    const name = ref('');
    const email = ref('');
    const password = ref('');
    const errorMessage = ref('');

    const handleRegister = async () => {
      const response = await postRegister(name.value, email.value, password.value);

      if (response.success) {
        window.location.href = '/signin';
      } else {
        errorMessage.value = response.message;
      }
    };

    const clearErrorMessage = () => {
      errorMessage.value = '';
    };

    return {
      name,
      email,
      password,
      handleRegister,
      errorMessage,
      clearErrorMessage,
      t,
    };
  }
});
</script>

<style scoped>
.register-container {
  background-color: #000;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
}

.title {
  color: black;
  margin-bottom: 6vh;
}

.register-form {
  background-color: #fff; 
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
  text-align: left;
}

.input-group {
  margin-bottom: 1.5rem;
}

.input-group label {
  font-size: 1.1rem;
  color: #333;
  margin-bottom: 0.5rem;
  display: block;
}

.input-group input {
  width: 100%;
  padding: 0.75rem;
  font-size: 1rem;
  border: 1px solid #000000;
  border-radius: 5px;
  box-sizing: border-box;
}

.register-button {
  background-color: #333333;
  color: #fff;
  padding: 0.75rem 1.5rem;
  font-size: 1.1rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  width: 100%;
  transition: background-color 0.3s;
}

.register-button:hover {
  background-color: #4caf50;;
}

.links-container {
  margin-bottom: 2rem;
  display: flex;
  flex-direction: column;
  text-align: center;
  justify-content: space-between;
}

.link {
  color: #0051ff;
  margin-top: 2vh;
  font-size: 0.9rem;
  transition: color 0.3s;
}
</style>
