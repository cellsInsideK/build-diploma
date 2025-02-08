import { defineStore } from "pinia";
import { computed, ref } from "vue";
import type { SelectProduct } from "~/server/database/schema";

export type CartItem = {quantity: number} & SelectProduct; 

export const useCartStore = defineStore('cart', () => {
  const cart = ref<Array<CartItem>>([]);

  const summaryPrice = computed(() => {
    return cart.value.reduce((sum, product) => sum += (product.quantity * product.price), 0)
  })

  const addProduct = (item: SelectProduct) => {
    const hasInCart = cart.value.find(product => product.id === item.id)
    
    if (hasInCart) {
      return increaseItem(item.id);
    }
    
    const newItem = Object.assign({}, {quantity: 1}, item);
    
    return cart.value.push(newItem)
  }
  
  const increaseItem = (id: string) => {
    const idx = cart.value.findIndex(item => item.id === id);

    if (cart.value[idx].quantity === cart.value[idx].amount)
      return;
    
    return cart.value[idx].quantity += 1;
  }

  const decreaseItem = (id: string) => {
    const idx = cart.value.findIndex(item => item.id === id);
    
    if (!(cart.value[idx].quantity === 1))
      return cart.value[idx].quantity -= 1;
  }

  const deleteItem = (id: string) => {
    const idx = cart.value.findIndex(item => item.id === id);

    return cart.value = cart.value.filter((_, index) => index !== idx);
  }

  const clearCart = () => {
    return cart.value = []
  }

  return { cart, summaryPrice, addProduct, increaseItem, decreaseItem, deleteItem, clearCart }
})