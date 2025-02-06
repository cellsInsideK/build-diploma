<script setup lang="ts">
  import { navigateTo, useCartStore, useHead } from '#build/imports';
  import UiSection from '~/components/UiSection.vue';

  const cart = useCartStore();

  useHead({ title: 'Корзина' })
</script>

<template>
  <UiSection>
    <template v-if="cart.cart.length > 0">
      <div class="bg-white rounded-lg max-w-5xl shadow-xl mx-auto p-6 ">
        <div class="flex justify-between pb-2 border-b-2">
          <h1 class="font-bold text-2xl uppercase">Корзина</h1>
          <img @click="cart.clearCart" class="cursor-pointer" src="/delete.svg" alt="clear cart">
        </div>
        <div class="flex flex-col">
          <div class="mt-4 flex flex-col gap-4">
            <template v-for="item in cart.cart">
              <UiCartItem :item />
            </template>
          </div>
          <div class="flex flex-col sm:flex-row justify-between items-center mt-4 gap-4">
            <p class="text-2xl self-end">
              Итого: <span class="text-ui-accent font-bold">{{ cart.summaryPrice }}</span> руб.
            </p>
            <Button @click="navigateTo('/confirm')" class="bg-ui-accent text-xl p-6 rounded-lg w-full sm:w-fit">
              Оформить заказ
            </Button>
          </div>
        </div>
      </div>
    </template>
    <template v-else>
      <p class="flex justify-center items-center h-96 text-center text-2xl font-bold">Кажется, вы ничего не добавили в
        корзину
        😢</p>
    </template>
  </UiSection>
</template>