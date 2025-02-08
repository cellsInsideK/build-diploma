<script setup lang="ts">
  import { watch } from 'vue';
  import { useCartStore, type CartItem } from '~/stores/cart';
  import { NumberField, NumberFieldContent, NumberFieldDecrement, NumberFieldIncrement, NumberFieldInput } from './ui/number-field';

  const { item } = defineProps<{ item: CartItem }>();
  const cart = useCartStore();

  watch(() => item.quantity, () => {
    if (Number.isNaN(item.quantity)) {
      item.quantity = 1;
    }
  })
</script>

<template>
  <div class="flex flex-col sm:flex-row gap-6 sm:gap-28 mb-2 border-b-2">
    <NuxtImg class="self-center mb-2" provider="cloudinary" :src="item.imageName" width="200" height="200" placeholder
      loading="lazy" />
    <div class="flex flex-col gap-4 justify-between mb-6">
      <h2 class="text-2xl text-center md:text-left">{{ item.name }}</h2>
      <div class="flex justify-between items-center sm:justify-normal gap-4">
        <div class="flex gap-2 bg-ui-accent text-white text-xl w-fit p-2 px-2 rounded-lg">
          <NumberField v-model="item.quantity" :default-value="1" :min="1" :max="item.amount">
            <NumberFieldContent>
              <NumberFieldDecrement />
              <NumberFieldInput class="bg-ui-accent border-none " />
              <NumberFieldIncrement />
            </NumberFieldContent>
          </NumberField>
        </div>
        <span class="font-bold text-2xl">{{ item.price * item.quantity }} руб.</span>
        <img @click="cart.deleteItem(item.id)" class="cursor-pointer" src="/delete.svg" alt="delete item from cart">
      </div>
    </div>
  </div>
</template>