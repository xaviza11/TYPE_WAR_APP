<template>
  <div :class="['navbar', { 'navbar-collapsed': isCollapsed }]">
    <div class="menu-container">
      <div class="collapse-button" @click="toggleCollapse">
        <span v-if="isCollapsed">➤</span>
        <span v-else>◀</span>
      </div>

      <div class="menu-content" v-if="!isCollapsed">
        <div class="user-info">
          <h3>{{ userName || t('navbar.welcome') }} </h3>
        </div>

        <nav class="nav-links">
          <router-link to="/" class="nav-item">{{ t('navbar.home') }}</router-link>
          <router-link to="/exercises" class="nav-item">{{ t('navbar.exercises') }}</router-link>
          <router-link to="/texts" class="nav-item">{{ t('navbar.texts') }}</router-link>
          <router-link to="/createText" v-if="userName && userType === 'admin'" class="nav-item">{{ t('navbar.createText') }}</router-link>
          <router-link to="/privacyPolicy" class="nav-item">{{ t('navbar.privacyPolicy') }}</router-link>
          <router-link to="/settings" v-if="userName" class="nav-item">{{ t('navbar.settings') }}</router-link>
        </nav>

        <div class="settings">
          <div class="language-selector">
            <label for="language">{{ t('navbar.language') }}</label>
            <select id="language" v-model="selectedLanguage" @change="changeLanguage">
              <option value="es-ES">{{ t('languages.spanish') }}</option>
              <option value="it-IT">{{ t('languages.italian') }}</option>
              <option value="de-DE">{{ t('languages.german') }}</option>
              <option value="en-US">{{ t('languages.americanEnglish') }}</option>
              <option value="en-UK">{{ t('languages.english') }}</option>
              <option value="fr-FR">{{ t('languages.french') }}</option>
            </select>
          </div>

          <div class="mode-selector">
            <label for="mode">{{ t('navbar.mode') }}</label>
            <select id="mode" v-model="selectedMode" @change="changeMode">
              <option value="normal">{{ t('navbar.normal') }}</option>
              <option value="master">{{ t('navbar.master') }}</option>
            </select>

            <div v-if="userName !== undefined" class="signout-button">
                <button @click="signOut">{{ t('navbar.closeSession') }}</button>
            </div>
            <div class="sessionContainer" v-else>
              <router-link to="/signin"  v-if="!userName" class="sessionButton">{{ t('navbar.signin') }}</router-link>
              <router-link to="/register" v-if="!userName" class="sessionButton">{{ t('navbar.register') }}</router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import Cookies from 'js-cookie';
import { useTranslate } from '../utils/useTranslate/useTranslate';
import { HAS_LANGUAGE } from '../utils/validators/appValidators';


export default defineComponent({
  name: 'Navbar',
  setup() {

    const {t} = useTranslate()

    let language = Cookies.get('language') || 'none'
    if(HAS_LANGUAGE(language)) Cookies.set('language', language, {expires: 365*10})
    else{
      language = navigator?.languages ? navigator?.languages[0] : navigator?.language
      Cookies.set('language', language, {expires: 365*10})
    } 

    const userName = ref(Cookies.get('userName'))
    const userType = ref(Cookies.get('userType'))
    const hasUser = typeof userName === 'string'
    const selectedLanguage = ref(language);
    const selectedMode = ref(Cookies.get('mode') || 'normal');
    const isCollapsed = ref(true);
    const toggleCollapse = () => {
      isCollapsed.value = !isCollapsed.value;
    };

    const changeLanguage = () => {
      Cookies.set('language', selectedLanguage.value, { expires:  365*10});
      window.location.reload();
    };

    const changeMode = () => {
      Cookies.set('mode', selectedMode.value, { expires: 365*10});
      window.location.reload();
    };

    const signOut = () => {
      Cookies.remove('userType');
      Cookies.remove('userToken');
      Cookies.remove('userName');
      Cookies.remove('sessionExpirationDate');
      window.location.reload()
    };

    return {
      userName,
      selectedLanguage,
      selectedMode,
      isCollapsed,
      toggleCollapse,
      changeLanguage,
      changeMode,
      userType,
      hasUser,
      signOut,
      t
    };
  },
});
</script>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  background-color: #ffffff;
  color: #000000;
  display: flex;
  flex-direction: column;
  padding: 20px;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
  transition: width 0.3s ease;
  width: 18vw;
}

@media screen and (orientation: portrait) {
  .navbar {
    width: 70vw;
    z-index: 1000;
  }
}

.navbar-collapsed {
  width: 50px;
  padding: 20px 5px;
}

.menu-container {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  transition: width 0.3s ease;
}

.menu-content {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: calc(100% - 40px); 
}

.navbar-collapsed {
  width: 10px;
  background-color: black;
}

.navbar:not(.navbar-collapsed) .menu-container {
  width: 200px;
}

.navbar:not(.navbar-collapsed) .collapse-button {
  background-color: #000000;
  color: white
}

.collapse-button {
  position: absolute;
  top: 50%;
  right: -20px;
  transform: translateY(-50%);
  background-color: #ffffff;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.2);
}

.user-info {
  width: 90%;
  text-align: center;
  font-size: 18px;
  margin-bottom: 4px;
}

.nav-links {
  width: 90%;
  display: flex;
  flex-direction: column;
  gap: 10px;
  border-top: 2px solid rgb(0, 0, 0);
}

.nav-item {
  color: #000000;
  text-decoration: none;
  text-align: center;
  padding: 10px;
  border-radius: 4px;
  transition: background-color 0.3s ease;
}

.nav-item:hover {
  background-color: #ffffff;
}

.settings {
  width: 90%;
  margin-top: auto;
  padding-top: 12px;
  border-top: 2px solid rgb(0, 0, 0);
}

.settings select {
  background-color: #34495e;
  color: #ecf0f1;
  border: none;
  padding: 5px;
  border-radius: 4px;
  width: 100%;
  margin-bottom: 10px;
}

label {
  margin-bottom: 5px;
  font-size: 14px;
  display: block;
}

.signout-button button {
  background-color: #000000; 
  color: #ffffff;
  border: none;
  padding: 5px;
  border-radius: 4px;
  width: 100%; 
  cursor: pointer;
  transition: background-color 0.3s ease;
  font-size: 14px;
}

.signout-button button:hover {
  background-color: #c0392b;
}

.sessionContainer {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-top: 20px;
}

.sessionButton {
  display: inline-block;
  padding: 5px;
  margin: 5px 0;
  text-align: center;
  border-radius: 4px;
  width: 100%;
  background-color: #000000;
  color: white;
  border: none;
  text-decoration: none;
  font-size: 14px;
  transition: background-color 0.3s ease, transform 0.2s ease;
}

.sessionButton:hover {
  background-color: #007b2f;
  transform: translateY(-2px);
}
</style>
