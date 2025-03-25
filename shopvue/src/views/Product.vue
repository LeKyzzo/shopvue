<template>
  <div class="product-page">
    <h1>Nos Produits</h1>

    <div class="products">
      <ProductCard
        v-for="product in products"
        :key="product.id"
        :product="product"
      />
    </div>

    <div v-if="showPopup" class="popup">
      <div class="popup-content">
        <h3>Produit ajouté au panier</h3>
        <p>Que souhaitez-vous faire maintenant ?</p>
        <div class="popup-buttons">
          <button @click="continueShopping">Continuer les achats</button>
          <button @click="goToCart">Aller au panier</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useCartStore } from "../stores/cartStore"; 
import { useRouter } from 'vue-router';
import ProductCard from '../components/ProductCard.vue';  

export default defineComponent({
  name: "ProductPage",
  components: {
    ProductCard
  },
  setup() {
    const cartStore = useCartStore();
    const router = useRouter();
    const showPopup = ref(false);

    const products = [
      {
        id: 1,
        name: "Iphone 16",
        description: "Le même que le 15 avec un fausse caméra en plus !",
        price: 1299.99,
        image: "https://im.qccdn.fr/node/comparatif-smartphone-431/thumbnail_800x480px-115798.png", 
      },
      {
        id: 2,
        name: "Poire bio",
        description: "Le bio c'est cher.",
        price: 52.99,
        image: "https://www.fruits-vaud-geneve.ch/kcfinder/upload/images/fruits/poire.png",
      },
      {
        id: 3,
        name: "Destop",
        description: "Pour déboucher les gros cac*",
        price: 29.99,
        image: "https://eu-images.contentstack.com/v3/assets/blt434d6fd2be5465d7/bltaef730c60997c04b/677543ff93d3a1e500c56375/fr-FR-3665468000312_destop_gel_original_950ml_fop_bd_removebg_preview.png",
      },
    ];

    const continueShopping = () => {
      showPopup.value = false;  
    };

    const goToCart = () => {
      showPopup.value = false;  
      router.push("/cart"); 
    };

    return { products, showPopup, continueShopping, goToCart };
  },
});
</script>

<style scoped>
.product-page {
  padding: 20px;
  text-align: center;
}

h1 {
  font-size: 2.5rem;
  margin-bottom: 30px;
  color: #333;
}

.products {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  gap: 20px;
}

.popup {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.popup-content {
  background-color: white;
  padding: 30px;
  border-radius: 10px;
  text-align: center;
  width: 300px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.popup-buttons {
  display: flex;
  justify-content: space-around;
  margin-top: 20px;
}

.popup-buttons button {
  padding: 10px 20px;
  background-color: #2ecc71;
  color: white;
  border: none;
  font-size: 1rem;
  cursor: pointer;
  border-radius: 5px;
  transition: background-color 0.3s ease;
}

.popup-buttons button:hover {
  background-color: #27ae60;
}
</style>
