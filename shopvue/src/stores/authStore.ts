import { defineStore } from 'pinia';
import { ref, computed, watch } from 'vue';
import bcrypt from 'bcryptjs';

export const useAuthStore = defineStore('auth', () => {
  const user = ref<{ email: string | null }>({ email: localStorage.getItem('userEmail') || null });
  const errorMessage = ref<string | null>(null);

  const users = ref<{ email: string; password: string }[]>(JSON.parse(localStorage.getItem('users') || '[]'));

  const isAuthenticated = computed(() => !!user.value.email);

  const login = (email: string, password: string) => {
    console.log('Tentative de connexion');

    const foundUser = users.value.find(user => user.email === email);

    if (foundUser && bcrypt.compareSync(password, foundUser.password)) {
      console.log('Connexion réussie');
      user.value.email = email;
      localStorage.setItem('userEmail', email);
      errorMessage.value = null;
      return true;
    } else {
      console.log('Échec de la connexion');
      errorMessage.value = 'Email ou mot de passe incorrect.';
      return false;
    }
  };

  const register = (email: string, password: string) => {
    console.log("Tentative d'inscription");

    const existingUser = users.value.find(user => user.email === email);

    if (existingUser) {
      console.log('Cet email est déjà utilisé');
      errorMessage.value = 'Cet email est déjà utilisé.';
      return false;
    } else {
      const hashedPassword = bcrypt.hashSync(password, 10); 
      users.value.push({ email, password: hashedPassword });

      localStorage.setItem('users', JSON.stringify(users.value));

      console.log('Inscription réussie');
      user.value.email = email;
      localStorage.setItem('userEmail', email);
      errorMessage.value = null;
      return true;
    }
  };

  const logout = () => {
    console.log('Déconnexion');
    user.value.email = null;
    localStorage.removeItem('userEmail');
  };

  watch(users, (newUsers) => {
    localStorage.setItem('users', JSON.stringify(newUsers));
  }, { deep: true });

  return {
    user,
    errorMessage,
    isAuthenticated,
    login,
    register,
    logout,
  };
});
