<script setup lang="ts">
  import { onMounted, ref, watch } from 'vue';
  import { useRoute } from 'vue-router';
  import UiLoader from '~/components/UiLoader.vue';
  import UiSection from '~/components/UiSection.vue';
  import type { SelectProduct } from '~/server/database/schema';
  import { navigateTo, useCartStore, useHead, useUserStore } from '#imports';
  import { Button } from '~/components/ui/button';
  import { toast } from 'vue-sonner';

  const route = useRoute();
  const data = ref<SelectProduct | undefined>(undefined);
  const isLoading = ref(true);
  const cartStore = useCartStore();
  const userStore = useUserStore();

  const handleAddCart = () => {
    if (userStore.isAuthenticated) {
      if (data.value?.amount === 0) {
        return toast.error('Товар закончился, ожидайте поставок')
      }

      cartStore.addProduct(data.value!);
      toast.success('Товар добавлен в корзину');

      return navigateTo('/cart')
    }

    return toast.error('Необходимо войти в аккаунт')
  }

  onMounted(async () => {
    const res = await $fetch(`/api/product/${route.params.id}`);
    isLoading.value = false;

    data.value = res.data;
  })

  watch(data, () => {
    useHead({ title: data.value?.name })
  })
</script>

<template>
  <UiLoader :is-loading="isLoading">
    <UiSection>
      <template v-if="data">
        <h2 class="font-bold uppercase text-2xl md:text-3xl md:text-center">{{ data?.name }}</h2>
        <div class="flex flex-col md:flex-row gap-5 md:gap-10 md:mt-5 w-full items-center justify-center">
          <NuxtImg provider="cloudinary" fit="minCover" class="max-h-[350px] object-contain" :src="data?.imageName"
            placeholder loading="lazy" height="350" />
          <div class="flex flex-col gap-4">
            <p class="max-w-lg text-xl text-justify">{{ data?.description }}</p>
            <p class="text-xl text-right">Цена: <span class="font-bold">{{ data?.price }}</span> руб.</p>
            <Button @click="handleAddCart" class="bg-ui-accent w-full text-md">Добавить в корзину</Button>
          </div>
        </div>
      </template>
      <template v-else>
        <p class="text-center text-2xl">Не удалось получить данные, попробуйте позеж 😢</p>
      </template>
    </UiSection>
  </UiLoader>
</template>