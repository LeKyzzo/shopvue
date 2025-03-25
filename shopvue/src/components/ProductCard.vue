<template>
    <div class="product-card">
      <img :src="product.image" alt="Image du produit" class="product-image" />
      <h3>{{ product.name }}</h3>
      <p class="product-description">{{ product.description }}</p>
      <p class="product-price">{{ formatCurrency(product.price) }}</p>
      <button @click="addToCart(product)">Ajouter au panier</button>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, PropType } from "vue";
  import { useCartStore } from "../stores/cartStore"; 
  
  export default defineComponent({
    name: "ProductCard",
    props: {
      product: {
        type: Object as PropType<{ id: number; name: string; description: string; price: number; image: string }>,
        required: true
      }
    },
    setup(props) {
      const cartStore = useCartStore();
  
      const addToCart = (product: any) => {
        cartStore.addProduct(product);
      };
  
      const formatCurrency = (value: number) => {
        return value.toLocaleString('fr-FR', {
          style: 'currency',
          currency: 'EUR'
        });
      };
  
      return { addToCart, formatCurrency };
    }
  });
  </script>
  
  <style scoped>
  .product-card {
    width: 250px;
    background-color: #fff;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    text-align: center;
    transition: transform 0.3s ease;
  }
  
  .product-card:hover {
    transform: translateY(-10px);
  }
  
  .product-image {
    width: 100%;
    height: auto;
    border-radius: 8px;
    margin-bottom: 15px;
  }
  
  .product-description {
    font-size: 1rem;
    color: #777;
    margin-bottom: 15px;
  }
  
  .product-price {
    font-size: 1.2rem;
    color: #e74c3c;
    margin-bottom: 20px;
  }
  
  button {
    padding: 10px 20px;
    background-color: #3498db;
    color: white;
    border: none;
    font-size: 1rem;
    cursor: pointer;
    border-radius: 5px;
    transition: background-color 0.3s ease;
  }
  
  button:hover {
    background-color: #2980b9;
  }
  </style>
  