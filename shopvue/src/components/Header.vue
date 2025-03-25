<template>
  <header class="navbar">
    <div class="logo">
      <router-link to="/" class="brand">Boris-Shop</router-link>
    </div>
    <nav class="nav-links">
      <router-link to="/" class="nav-link">Accueil</router-link>
      <router-link to="/products" class="nav-link">Produits</router-link>

      <div v-if="authStore.user.email" class="nav-link">
        <router-link class="nav-link" to="/cart">Panier</router-link>
      </div>

      <div v-if="authStore.user.email" class="nav-link">
        <button @click="logout" class="logout-btn">Se déconnecter</button>
      </div>

      <div v-else>
        <router-link to="/login" class="nav-link">Se connecter</router-link>
        <router-link to="/register" class="nav-link">S'inscrire</router-link>
      </div>
    </nav>
  </header>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useAuthStore } from '../stores/authStore'; 

export default defineComponent({
  name: 'Header',
  setup() {
    const authStore = useAuthStore(); 

    const logout = () => {
      authStore.logout(); 
    };

    return { authStore, logout }; 
  },
});
</script>

<style scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #333;
  padding: 10px 20px;
  color: #fff;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.logo {
  font-size: 1.5rem;
  font-weight: bold;
}

.brand {
  color: #fff;
  text-decoration: none;
}

.nav-links {
  display: flex;
  align-items: center;
}

.nav-link {
  margin-left: 20px;
  color: #fff;
  text-decoration: none;
  font-size: 1rem;
  transition: color 0.3s;
}

.nav-link:hover {
  color: #f1c40f;
}

.logout-btn {
  background-color: #e74c3c;
  color: white;
  border: none;
  padding: 8px 16px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s;
}

.logout-btn:hover {
  background-color: #c0392b;
}

@media (max-width: 768px) {
  .nav-links {
    flex-direction: column;
    align-items: flex-start;
  }
  .nav-link {
    margin: 10px 0;
  }
}
</style>
