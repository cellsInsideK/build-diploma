<script setup lang="ts">
  import { onMounted, watch } from 'vue';
  import { navigateTo, useUserStore } from '#build/imports';
  import { Toaster } from './components/ui/sonner';

  const userStore = useUserStore();

  onMounted(async () => {
    const res = await $fetch('/api/session');
    userStore.user = res;
  })

  watch(() => userStore.user, (user) => {
    if (user === undefined) {
      return navigateTo('/');
    }
  })
</script>

<template>
  <UiHeader />
  <main class=" flex flex-col flex-1 bg-ui-bg">
    <NuxtPage />
  </main>
  <UiFooter />
  <Toaster />
</template>

<style>
  body {
    font-family: "Roboto Condensed", serif;
    font-optical-sizing: auto;
    font-weight: 400;
    font-style: normal;
    color: black;
  }

  body>#__nuxt {
    min-height: 100dvh;
    display: flex;
    flex-direction: column;
  }
</style>