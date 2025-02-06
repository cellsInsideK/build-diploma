<script setup lang="ts">
  import { useCartStore, type CartItem } from '~/stores/cart';

  const { item } = defineProps<{ item: CartItem }>();
  const cart = useCartStore();
</script>

<template>
  <div class="flex flex-col sm:flex-row gap-6 sm:gap-28 mb-2 border-b-2">
    <NuxtImg class="self-center mb-2" provider="cloudinary" :src="item.imageName" width="200" height="200" placeholder
      loading="lazy" />
    <div class="flex flex-col gap-4 justify-between mb-6">
      <h2 class="text-2xl text-center">{{ item.name }}</h2>
      <div class="flex justify-between items-center sm:justify-normal gap-4">
        <div class="flex gap-2 bg-ui-accent text-white text-xl w-fit p-2 px-2 rounded-lg">
          <span @click="cart.decreaseItem(item.id)" class="cursor-pointer px-2">-</span>
          <span>{{ item.quantity }}</span>
          <span @click="cart.increaseItem(item.id)" class="cursor-pointer px-2">+</span>
        </div>
        <span class="font-bold text-2xl">{{ item.price * item.quantity }} руб.</span>
        <img @click="cart.deleteItem(item.id)" class="cursor-pointer" src="/delete.svg" alt="delete item from cart">
      </div>
    </div>
  </div>
</template>