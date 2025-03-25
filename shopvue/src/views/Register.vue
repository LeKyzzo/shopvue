<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../stores/authStore';

const router = useRouter();
const authStore = useAuthStore();

const email = ref('');
const password = ref('');
const confirmPassword = ref('');
const errorMessage = ref<string | null>(null);

const handleSubmit = () => {
  console.log('Inscription soumise');
  console.log('Email:', email.value);
  console.log('Mot de passe:', password.value);
  console.log('Confirmer le mot de passe:', confirmPassword.value);

  if (password.value !== confirmPassword.value) {
    errorMessage.value = "Les mots de passe ne correspondent pas.";
    console.log('Les mots de passe ne correspondent pas.');
    return;
  }

  const success = authStore.register(email.value, password.value);

  if (success) {
    console.log('Redirection vers la page d\'accueil');
    router.push('/');  
  } else {
    errorMessage.value = authStore.errorMessage;  
    console.log('Erreur lors de l\'inscription:', errorMessage.value);
  }
};
</script>

<template>
  <div class="auth-container">
    <h2>Inscription</h2>

    <form @submit.prevent="handleSubmit">
      <div>
        <label for="email">Email :</label>
        <input type="email" id="email" v-model="email" placeholder="Email" required />
      </div>
      <div>
        <label for="password">Mot de passe :</label>
        <input type="password" id="password" v-model="password" placeholder="Mot de passe" required />
      </div>
      <div>
        <label for="confirmPassword">Confirmer le mot de passe :</label>
        <input type="password" id="confirmPassword" v-model="confirmPassword" placeholder="Confirmer le mot de passe" required />
      </div>

      <button type="submit">S'inscrire</button>
    </form>

    <p v-if="errorMessage" class="error">{{ errorMessage }}</p>

    <p>
      Déjà un compte? <router-link to="/login">Connectez-vous</router-link>
    </p>
  </div>
</template>

<style scoped>
.auth-container {
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  background-color: #fff;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  transition: all 0.3s ease;
}

h2 {
  text-align: center;
  font-size: 2rem;
  margin-bottom: 20px;
  color: #333;
}

form {
  display: flex;
  flex-direction: column;
}

div {
  margin-bottom: 15px;
}

label {
  font-size: 1rem;
  margin-bottom: 5px;
  color: #555;
}

input {
  padding: 10px;
  font-size: 1rem;
  border-radius: 4px;
  border: 1px solid #ccc;
  margin-top: 5px;
  outline: none;
  transition: border-color 0.3s ease;
}

input:focus {
  border-color: #3498db;
}

button {
  background-color: #3498db;
  color: white;
  border: none;
  padding: 12px 0;
  font-size: 1rem;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-top: 20px;
}

button:hover {
  background-color: #2980b9;
}

.error {
  color: red;
  font-size: 1rem;
  margin-top: 10px;
  text-align: center;
}

p {
  text-align: center;
  margin-top: 20px;
  color: #666;
}

p a {
  color: #3498db;
  text-decoration: none;
}

p a:hover {
  text-decoration: underline;
}

p small {
  display: block;
  margin-top: 10px;
  font-size: 0.85rem;
  color: #999;
}

@media (max-width: 600px) {
  .auth-container {
    width: 90%;
    padding: 15px;
  }

  h2 {
    font-size: 1.8rem;
  }

  button {
    padding: 10px 0;
    font-size: 1.1rem;
  }

  input {
    padding: 8px;
    font-size: 0.95rem;
  }
}
</style>
