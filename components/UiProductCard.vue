<script setup lang="ts">
  import { useCartStore } from '#build/imports';
  import { toast } from 'vue-sonner';
  import type { SelectProduct } from '~/server/database/schema';

  const { product } = defineProps<{ product: SelectProduct }>();

  const cart = useCartStore();

  const handleAdd = () => {
    cart.addProduct(product);

    return toast.success('Успешно', { description: 'Товар добавлен в корзину' })
  }
</script>

<template>
  <div class="flex flex-col bg-white rounded-lg max-w-[300px] p-4 items-center">
    <NuxtImg provider="cloudinary" :src="product.imageName" width="200" height="200" />
    <h2 class=" max-w-44 mt-4 mb-auto text-lg">{{ product.name }}</h2>
    <div class="flex w-full justify-between items-center mt-2">
      <Button @click="handleAdd" type="button" class="bg-ui-accent">В корзину</Button>
      <span class="font-bold">{{ product.price }} ₽</span>
    </div>
  </div>
</template>