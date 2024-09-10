<template>
  <div class="create-text">
    <h2>{{ t('createTextPage.createText') }}</h2>
    <form @submit.prevent="handleCreateText">
      <div>
        <label for="language">{{ t('createTextPage.title') }}</label>
        <input
          type="text"
          id="title"
          v-model="title"
          required
        />
      </div>
      <div>
        <label for="text">{{ t('createTextPage.text') }}</label>
        <textarea
          id="text"
          v-model="text"
          rows="4"
          required
        ></textarea>
      </div>
      <div>
        <label for="type">{{ t('createTextPage.type') }}</label>
        <select id="type" v-model="type" required>
          <option value="exercise">{{ t('createTextPage.exerciseOption') }}</option>
          <option value="text">{{ t('createTextPage.textOption') }}</option>
        </select>
      </div>
      <div>
        <label for="language">{{ t('createTextPage.language') }}</label>
        <input
          type="text"
          id="language"
          v-model="language"
          required
        />
      </div>
      <button type="submit">{{ t('createTextPage.submit') }}</button>
    </form>
    <Alert v-if="errorMessage" :message="errorMessage" @close="clearErrorMessage" />
    <NavBar></NavBar>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import  Alert  from '../components/Alert.vue'; 
import postCreateText from '../handlers/texts/postCreateText';
import NavBar from '../components/NavBar.vue'
import { useTranslate } from '../utils/useTranslate/useTranslate';

export default defineComponent({
  name: 'CreateText',
  components: {
    Alert,
  },
  setup() {
    const {t} = useTranslate()
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
      t
    };
  }
});
</script>

<style scoped>
.create-text {
  max-width: 600px;
  margin: auto;
  padding: 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

form {
  display: flex;
  flex-direction: column;
}

div {
  margin-bottom: 1rem;
}

label {
  font-weight: bold;
}

textarea {
  width: 100%;
  box-sizing: border-box;
}

button {
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}
</style>
