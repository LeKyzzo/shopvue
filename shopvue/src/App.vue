<template>
  <div>
    <header-component />
    <router-view />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import HeaderComponent from './components/Header.vue';

export default defineComponent({
  name: 'App',
  components: {
    HeaderComponent,
  },
});
</script>
<style>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap');

body {
    font-family: 'Poppins', sans-serif;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    background-color: #f9f9f9; /* Optionnel : ajoute un fond léger pour améliorer le design */
    color: #333; /* Couleur de texte principale */
    line-height: 1.6;
}
</style>
