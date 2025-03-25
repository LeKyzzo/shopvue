<template>
  <div class="cart-page">
    <h1>Votre Panier</h1>

    <div v-if="cartProducts.length === 0" class="empty-cart">
      <p>Votre panier est vide. Ajoutez des produits !</p>
    </div>

    <div v-else>
      <div v-for="item in cartProducts" :key="item.id" class="cart-item">
        <img :src="item.image" alt="Product image" class="cart-item-image" />
        <div class="cart-item-info">
          <h3>{{ item.name }}</h3>
          <p>{{ item.description }}</p>
          <p>{{ formatCurrency(item.price) }}</p>

          <div class="quantity-control">
            <label for="quantity">Quantité :</label>
            <input 
              type="number"
              v-model.number="item.quantity"
              min="1"
              @input="updateQuantity(item.id, item.quantity)"
            />
          </div>

          <button @click="removeFromCart(item.id)">Retirer du panier</button>
        </div>
      </div>

      <div class="cart-summary">
        <p>Total: {{ totalPrice }}</p>
        <button @click="checkout">Procéder au paiement</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useCartStore } from "../stores/cartStore";

const cartStore = useCartStore();

const cartProducts = computed(() => cartStore.cart || []);

const totalPrice = computed(() => {
  return cartProducts.value
    .reduce((total, item) => total + item.price * item.quantity, 0)
    .toFixed(2);
});

const formatCurrency = (value: number) => {
  return value.toLocaleString('fr-FR', {
    style: 'currency',
    currency: 'EUR'
  });
};

const updateQuantity = (id: number, quantity: number) => {
  cartStore.updateProductQuantity(id, quantity);
};

const removeFromCart = (id: number) => {
  cartStore.removeProduct(id);
};

const checkout = () => {
  alert("Procéder au paiement !");
};
</script>

<style scoped>
.cart-page {
  padding: 20px;
}

h1 {
  font-size: 2.5rem;
  margin-bottom: 30px;
  color: #333;
}

.empty-cart {
  text-align: center;
  font-size: 1.5rem;
  color: #999;
}

.cart-item {
  display: flex;
  align-items: center;
  padding: 15px;
  border-bottom: 1px solid #ddd;
  margin-bottom: 15px;
}

.cart-item-image {
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 8px;
  margin-right: 20px;
}

.cart-item-info h3 {
  font-size: 1.2rem;
  margin-bottom: 5px;
}

.quantity-control {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 10px;
}

.quantity-control input {
  width: 60px;
  padding: 5px;
  text-align: center;
}

.cart-summary {
  text-align: center;
  font-size: 1.5rem;
  margin-top: 30px;
}

.cart-summary button {
  padding: 10px 20px;
  background-color: #27ae60;
  color: white;
  border: none;
  font-size: 1rem;
  cursor: pointer;
  border-radius: 5px;
  transition: background-color 0.3s ease;
}

.cart-summary button:hover {
  background-color: #2ecc71;
}
</style>
