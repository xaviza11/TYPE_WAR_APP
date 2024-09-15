<template>
  <div class="update-user-container">
    <form @submit.prevent="handleUpdate" class="update-user-form">
      <h3 class="title">{{ t('settings.updateUser') }}</h3>
      <div class="input-group">
        <label for="newName">{{ t('settings.newName') }}</label>
        <input v-model="form.newName" id="newName" type="text" />
      </div>
      <div class="input-group">
        <label for="newEmail">{{ t('settings.newEmail') }}</label>
        <input v-model="form.newEmail" id="newEmail" type="email" />
      </div>
      <div class="input-group">
        <label for="newPassword">{{ t('settings.newPassword') }}</label>
        <input v-model="form.newPassword" id="newPassword" type="password" />
      </div>
      <div class="input-group">
        <label for="repeatNewPassword">{{ t('settings.repeatPassword') }}</label>
        <input v-model="form.repeatNewPassword" id="repeatNewPassword" type="password" />
      </div>
      <div class="input-group">
        <label for="updatePassword">{{ t('settings.currentPassword') }}</label>
        <input v-model="form.updatePassword" id="updatePassword" type="password" />
      </div>
      <button type="submit" class="update-button">{{ t('settings.updateUser') }}</button>
    </form>

    <div class="right-side">
      <div class="delete-user">
        <h3>{{ t('settings.deleteUser' )}}</h3>
        <div class="input-group">
          <p>{{ t('settings.deletePermanent') }}</p>
          <label for="deletePassword">{{ t('settings.currentPassword') }}</label>
          <input v-model="form.deletePassword" id="deletePassword" type="password" />
        </div>
        <button @click="handleDelete" class="delete-button">{{ t('settings.deleteUser') }}</button>
      </div>

      <div class="reset-stats">
        <h3>{{ t('settings.resetStats') }}</h3>
        <div class="input-group">
          <p>{{ t('settings.resetPermanent') }}</p>
          <label for="resetStatsPassword">{{ t('settings.currentPassword') }}</label>
          <input v-model="form.resetStatsPassword" id="resetStatsPassword" type="password" />
        </div>
        <button @click="handleResetStats" class="reset-button">{{ t('settings.resetStats') }}</button>
      </div>
    </div>
    <Alert v-if="errorMessage" :message="errorMessage" :onClose="clearErrorMessage" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import deleteUser from '../handlers/users/deleteUser'
import putUpdateUser from '../handlers/users/putUpdateUser'
import deleteCompletedExercises from '../handlers/completedTexts/deleteCompletedExercises'
import Cookies from 'js-cookie'
import { useTranslate } from '../utils/useTranslate/useTranslate';
import { useTranslateSuccess } from '../utils/useTranslate/useTranslateSuccess';
import { useTranslateErrors } from '../utils/useTranslate/useTranslateErrors'

import Alert from '../components/Alert.vue'

const router = useRouter()
const errorMessage = ref('')
const {t} = useTranslate()
const { translateSuccess } = useTranslateSuccess();

const form = ref({
  newName: '',
  newEmail: '', 
  newPassword: '',
  repeatNewPassword: '',
  updatePassword: '',
  deletePassword: '',
  resetStatsPassword: '' 
})

const handleUpdate = async () => {
  if (form.value.newPassword !== form.value.repeatNewPassword) {
    errorMessage.value = useTranslateErrors('Passwords do not match')
    return
  }

  if(form.value.newName === '') form.value.newName = null
  if(form.value.newEmail === '') form.value.newEmail = null
  if(form.value.newPassword === '') form.value.newPassword = null

  console.log(form.value)
  console.log(form.value.updatePassword, form.value.newName, form.value.newPassword, form.value.newEmail)
  const res = await putUpdateUser(form.value.updatePassword, form.value.newName, form.value.newPassword, form.value.newEmail)

  if (res.success) {
    Cookies.set('userToken', res.data.access_token, { expires: 7 })
    Cookies.set('sessionExpirationDate', res.data.expirationDate, { expires: 7 })
    Cookies.set('userName', res.data.name, { expires: 7 })
    Cookies.set('userType', res.data.type, { expires: 7 })
    errorMessage.value = translateSuccess('User updated successfully')
  } else {
    errorMessage.value = res.message
  }
}

const handleDelete = async () => {
  const res = await deleteUser(form.value.deletePassword)
  if (res.success) {
    Cookies.remove('userToken')
    Cookies.remove('sessionExpirationDate')
    Cookies.remove('userName')
    Cookies.remove('userType')
    router.push('/')
  } else {
    errorMessage.value = res.message
  }
}

const handleResetStats = async () => {
  const res = await deleteCompletedExercises(form.value.resetStatsPassword)
  if (res.success) {
    errorMessage.value = translateSuccess('Stats reset successfully')
  } else {
    errorMessage.value = res.message
  }
}

const clearErrorMessage = () => {
  errorMessage.value = ''
}
</script>

<style scoped>
.update-user-container {
  background-color: #f0f0f0;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  color: black;
  padding: 2rem;
  flex-wrap: wrap; 
}

.title {
  color: black;
  margin-bottom: 1vh;
}

.update-user-form {
  background-color: white;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 45%;
  text-align: left;
  height: 90vh;
  box-sizing: border-box;
}

.right-side {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 45%;
}

.delete-user, .reset-stats {
  background-color: white;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
  height: 42.5vh;
  box-sizing: border-box;
}

.input-group {
  margin-bottom: 1.5rem;
}

.input-group label {
  font-size: 0.8rem;
  color: black;
  margin-bottom: 0.3rem;
  display: block;
}

p {
  font-size: 0.8rem;
  margin-bottom: 2rem;
}

.input-group input, .input-group checkbox {
  width: 100%;
  padding: 0.75rem;
  font-size: 0.8rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-sizing: border-box;
}

.update-button, .delete-button, .reset-button {
  background-color: black;
  color: white;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  width: 100%;
  transition: background-color 0.3s;
  margin-top: 0.3rem;
}

.update-button:hover, .reset-button:hover {
  background-color: #4caf50;
}

.delete-button {
  background-color: red;
}

.delete-button:hover {
  background-color: #e60000;
}

@media (max-width: 768px) {
  .update-user-container {
    flex-direction: column;
    align-items: center;
  }

  .update-user-form, .right-side {
    width: 100%;
    height: auto;
    margin-bottom: 1rem;
  }

  .delete-user, .reset-stats {
    height: auto;
    margin-bottom: 1rem;
  }
}
</style>
