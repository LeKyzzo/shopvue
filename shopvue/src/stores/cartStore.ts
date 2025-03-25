import { defineStore } from 'pinia';
import { useAuthStore } from './authStore';
import { useRouter } from 'vue-router';

export const useCartStore = defineStore('cart', {
  state: () => ({
    cart: JSON.parse(localStorage.getItem('cart') || '[]') as any[] 
  }),

  actions: {
    addProduct(product: any) {
      const authStore = useAuthStore();
      const router = useRouter();

      if (!authStore.isAuthenticated) {
        router.push('/login');  
        return;
      }

      const existingProduct = this.cart.find((item) => item.id === product.id);
      if (existingProduct) {
        existingProduct.quantity += 1;
      } else {
        this.cart.push({ ...product, quantity: 1 });
      }
      this.saveCart();
    },

    removeProduct(id: number) {
      this.cart = this.cart.filter((product) => product.id !== id);
      this.saveCart();
    },

    updateProductQuantity(id: number, quantity: number) {
      const product = this.cart.find((item) => item.id === id);
      if (product) {
        product.quantity = quantity > 0 ? quantity : 1;
      }
      this.saveCart();
    },

    clearCart() {
      this.cart = [];
      this.saveCart();
    },

    saveCart() {
      localStorage.setItem('cart', JSON.stringify(this.cart));
    }
  },

  getters: {
    totalPrice: (state) =>
      state.cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2),

    totalItems: (state) =>
      state.cart.reduce((total, item) => total + item.quantity, 0)
  }
});
