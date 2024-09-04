<template>
  <div class="home">
    <NavBar></NavBar>
    <AutoType></AutoType>
  </div>
</template>

<script lang="ts">
import AutoType from '../components/AutoType.vue';
import NavBar from '../components/NavBar.vue';

export default {
  name: 'Home',
};
</script>

<style scoped>
.home {
  text-align: center;
  margin-top: 50px;
}
</style>
