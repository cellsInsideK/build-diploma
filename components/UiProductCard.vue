<script setup lang="ts">
  import { useCartStore, useUserStore } from '#build/imports';
  import { toast } from 'vue-sonner';
  import type { SelectProduct } from '~/server/database/schema';

  const { product } = defineProps<{ product: SelectProduct }>();

  const cart = useCartStore();
  const userStore = useUserStore();

  const handleAdd = () => {
    if (userStore.isAuthenticated) {
      if (product.amount === 0)
        return toast.error('Товар закончился, ожидайте поставок')

      cart.addProduct(product);

      return toast.success('Успешно', { description: 'Товар добавлен в корзину' })
    }
    return toast.error('Необходимо войти в аккаунт')
  }
</script>

<template>
  <NuxtLink :to="`/products/${product.id}`" class="flex flex-col bg-white rounded-lg max-w-[300px] p-4 items-center">
    <NuxtImg provider="cloudinary" :src="product.imageName" width="200" height="200" />
    <h2 class=" max-w-44 mt-4 mb-auto text-lg">{{ product.name }}</h2>
    <div class="flex w-full justify-between items-center mt-2">
      <Button @click.prevent="handleAdd" type="button" class="bg-ui-accent">В корзину</Button>
      <span class="font-bold">{{ product.price }} ₽</span>
    </div>
  </NuxtLink>
</template>