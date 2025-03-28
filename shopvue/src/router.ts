import { createRouter, createWebHistory } from 'vue-router';
import Home from './views/Home.vue';
import Login from './views/Login.vue';
import Register from './views/Register.vue';
import Products from './views/Product.vue';
import Cart from './views/CartPage.vue';
import { useAuthStore } from './stores/authStore'; 

const routes = [
  { path: '/', component: Home },
  { path: '/login', component: Login },
  { path: '/register', component: Register },
  {
    path: '/products',
    component: Products,
    meta: { requiresAuth: true },
  },
  {
    path: '/cart',
    component: Cart,
    meta: { requiresAuth: true }, 
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();

  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next('/login'); 
  } else {
    next(); 
  }
});

export default router;
