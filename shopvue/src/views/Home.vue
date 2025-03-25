<template>
  <div class="home">
    <div class="welcome-message">
      <h1>Bienvenue sur notre plateforme e-commerce</h1>
      <p>Nous avons tout ce dont vous avez besoin ! Parcourez nos produits, ajoutez-les à votre panier et passez à l'achat en toute simplicité.</p>

      <div v-if="!authStore.user.email" class="auth-links">
        <router-link to="/login" class="auth-btn">Se connecter</router-link>
        <router-link to="/register" class="auth-btn">S'inscrire</router-link>
      </div>

      <div v-else>
        <p>Bienvenue, {{ authStore.user.email }} !</p>
        <router-link to="/products" class="shop-btn">Commencer à magasiner</router-link>
        <button @click="logout" class="logout-btn">Se déconnecter</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useAuthStore } from '../stores/authStore'; 

export default defineComponent({
  name: 'Home',
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
.home {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f8f8f8;
  padding: 0 20px;
}

.welcome-message {
  text-align: center;
  max-width: 600px;
  background-color: #fff;
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

h1 {
  font-size: 2.5rem;
  color: #333;
  margin-bottom: 20px;
}

p {
  font-size: 1.1rem;
  color: #555;
  line-height: 1.6;
}

.auth-links {
  margin-top: 30px;
}

.auth-btn {
  display: inline-block;
  padding: 10px 20px;
  margin: 10px;
  background-color: #3498db;
  color: white;
  text-decoration: none;
  border-radius: 5px;
  font-size: 1.1rem;
  transition: background-color 0.3s;
}

.auth-btn:hover {
  background-color: #2980b9;
}

.shop-btn {
  display: inline-block;
  padding: 12px 25px;
  margin-top: 20px;
  margin-right: 20px;
  background-color: #2ecc71;
  color: white;
  text-decoration: none;
  border-radius: 5px;
  font-size: 1.2rem;
  transition: background-color 0.3s;
}

.shop-btn:hover {
  background-color: #27ae60;
}

.logout-btn {
  background-color: #e74c3c;
  color: white;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  font-size: 1.1rem;
  border-radius: 5px;
  transition: background-color 0.3s;
}

.logout-btn:hover {
  background-color: #c0392b;
}

@media (max-width: 600px) {
  .welcome-message {
    padding: 20px;
    max-width: 90%;
  }

  h1 {
    font-size: 2rem;
  }

  p {
    font-size: 1rem;
  }

  .auth-btn, .shop-btn, .logout-btn {
    font-size: 1rem;
    padding: 8px 15px;
  }
}
</style>
