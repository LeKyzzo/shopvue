/*import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export const useUserStore = defineStore('user', () => {
  const user = ref<{ id: string | null; username: string | null }>({ id: null, username: null });
  const cart = ref<{ productId: string; quantity: number }[]>([]);

  const cartTotal = computed(() => {
    return cart.value.reduce((total, item) => total + item.quantity, 0);
  });

  const login = (userId: string, username: string) => {
    user.value = { id: userId, username: username };
  };

  const logout = () => {
    user.value = { id: null, username: null };
    cart.value = [];
  };

  const addToCart = (productId: string) => {
    const product = cart.value.find(item => item.productId === productId);
    if (product) {
      product.quantity++;
    } else {
      cart.value.push({ productId, quantity: 1 });
    }
  };

  const removeFromCart = (productId: string) => {
    cart.value = cart.value.filter(item => item.productId !== productId);
  };

  const updateQuantity = (productId: string, quantity: number) => {
    const product = cart.value.find(item => item.productId === productId);
    if (product) {
      product.quantity = quantity;
    }
  };

  return { user, cart, cartTotal, login, logout, addToCart, removeFromCart, updateQuantity };
});*/