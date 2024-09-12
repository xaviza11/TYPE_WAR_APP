<template>
  <div class="container">
    <div class="create-text" v-if="userType === 'admin'">
      <form @submit.prevent="handleCreateText" class="create-text-form">
        <h2 class="title">{{ t('createTextPage.createText') }}</h2>
        <div class="input-group">
          <label for="title">{{ t('createTextPage.title') }}</label>
          <input
            type="text"
            id="title"
            v-model="title"
            required
          />
        </div>
        <div class="input-group">
          <label for="text">{{ t('createTextPage.text') }}</label>
          <textarea
            id="text"
            v-model="text"
            rows="4"
            required
          ></textarea>
        </div>
        <div class="input-group">
          <label for="type">{{ t('createTextPage.type') }}</label>
          <select id="type" v-model="type" required>
            <option value="exercise">{{ t('createTextPage.exerciseOption') }}</option>
            <option value="text">{{ t('createTextPage.textOption') }}</option>
          </select>
        </div>
        <div class="input-group">
          <label for="language">{{ t('createTextPage.language') }}</label>
          <input
            type="text"
            id="language"
            v-model="language"
            required
          />
        </div>
        <button type="submit" class="submit-button">{{ t('createTextPage.submit') }}</button>
      </form>
      <Alert v-if="errorMessage" :message="errorMessage" @close="clearErrorMessage" />
    </div>
    <div v-else class="access-denied">
      <p class="message">{{ t('createTextPage.accessDenied') }}</p>
      <router-link to="/" class="link">{{ t('createTextPage.return') }}</router-link>
    </div>
    <NavBar></NavBar>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import Alert from '../components/Alert.vue'; 
import postCreateText from '../handlers/texts/postCreateText';
import NavBar from '../components/NavBar.vue'
import { useTranslate } from '../utils/useTranslate/useTranslate';
import Cookies from 'js-cookie';

export default defineComponent({
  name: 'CreateText',
  components: {
    Alert,
  },
  setup() {
    const userType = Cookies.get('userType')
    const { t } = useTranslate()
    const title = ref('')
    const text = ref('');
    const type = ref('text');
    const language = ref('');
    const errorMessage = ref('');

    const handleCreateText = async () => {
      try {
        const response = await postCreateText(title.value, text.value, type.value, language.value);

        if (response.success) {
          alert('Text created successfully');
          resetForm();
        } else {
          errorMessage.value = response.message;
        }
      } catch (error: any) {
        errorMessage.value = 'An unexpected error occurred.';
      }
    };

    const resetForm = () => {
      text.value = '';
      type.value = 'text';
      language.value = '';
      title.value = ''
    };

    const clearErrorMessage = () => {
      errorMessage.value = '';
    };

    return {
      title,
      text,
      type,
      language,
      handleCreateText,
      errorMessage,
      clearErrorMessage,
      t,
      userType
    };
  }
});
</script>

<style scoped>
.container {
  background-color: black;
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.create-text {
  background-color: black; 
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
}

.create-text-form {
  background-color: #fff;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 80vw;
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

.input-group input,
.input-group textarea,
.input-group select {
  width: 100%;
  padding: 0.75rem;
  font-size: 1rem;
  border: 1px solid #ddd;
  border-radius: 5px;
  box-sizing: border-box;
}

.submit-button {
  background-color: #333;
  color: #fff;
  padding: 0.75rem 1.5rem;
  font-size: 1.1rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  width: 100%;
  transition: background-color 0.3s;
}

.submit-button:hover {
  background-color: #4caf50;
}
</style>
