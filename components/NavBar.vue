<template>
    <div :class="['navbar', { 'navbar-collapsed': isCollapsed }]">
      <div class="menu-container">
        <div class="collapse-button" @click="toggleCollapse">
          <span v-if="isCollapsed">➤</span>
          <span v-else>◀</span>
        </div>
  
        <div class="menu-content" v-if="!isCollapsed">
          <div class="user-info">
            <p>{{ userName || 'Welcome to TypeWar' }} </p>
          </div>
  
          <nav class="nav-links">
            <router-link to="/" class="nav-item">Home</router-link>
            <router-link to="/exercises" class="nav-item">Exercises</router-link>
            <router-link to="/texts" class="nav-item">Texts</router-link>
            <router-link to="/createText" v-if="userName && userType === 'admin'" class="nav-item">Create Texts</router-link>
            <router-link to="/signin" v-if="!userName" class="nav-item">signin</router-link>
            <router-link to="/register" v-if="!userName" class="nav-item">register</router-link>
          </nav>
  
          <div class="settings">
            <div class="language-selector">
              <label for="language">Language:</label>
              <select id="language" v-model="selectedLanguage" @change="changeLanguage">
                <option value="en">English</option>
                <option value="es">Español</option>
              </select>
            </div>
  
            <div class="mode-selector">
              <label for="mode">Mode:</label>
              <select id="mode" v-model="selectedMode" @change="changeMode">
                <option value="normal">Normal</option>
                <option value="master">Master</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref } from 'vue';
  import Cookies from 'js-cookie';
  
  export default defineComponent({
    name: 'Navbar',
    setup() {
      const userName = ref(Cookies.get('userName'))
      const userType = ref(Cookies.get('userType'))
      const hasUser = typeof userName === 'string'
      const selectedLanguage = ref(Cookies.get('language') || 'en');
      const selectedMode = ref(Cookies.get('mode') || 'normal');
      const isCollapsed = ref(true);
      const toggleCollapse = () => {
        isCollapsed.value = !isCollapsed.value;
      };

      const changeLanguage = () => {
        Cookies.set('language', selectedLanguage.value, { expires: 7 });
        window.location.reload();
      };
  
      const changeMode = () => {
        Cookies.set('mode', selectedMode.value, { expires: 7 });
        window.location.reload();
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
        hasUser
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
    background-color: #2c3e50;
    color: #ecf0f1;
    display: flex;
    flex-direction: column;
    padding: 20px;
    box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
    transition: width 0.3s ease;
    width: 200px;
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
  }
  
  .navbar:not(.navbar-collapsed) .menu-container {
    width: 200px;
  }
  
  .collapse-button {
    position: absolute;
    top: 50%;
    right: -15px;
    transform: translateY(-50%);
    background-color: #34495e;
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
    border-top: 2px solid white;
  }
  
  .nav-item {
    color: #ecf0f1;
    text-decoration: none;
    padding: 10px;
    border-radius: 4px;
    transition: background-color 0.3s ease;
  }
  
  .nav-item:hover {
    background-color: #34495e;
  }
  
  .settings {
    width: 90%;
    margin-top: auto;
    padding-top: 12px;
    border-top: 2px solid white;
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
  </style>
  