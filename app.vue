<script setup lang="ts">
  import { onMounted } from 'vue';
  import { useUserStore } from '#build/imports';
  import { Toaster } from './components/ui/sonner';
  import { useRouter } from 'vue-router';

  const userStore = useUserStore();
  const router = useRouter();

  onMounted(async () => {
    const res = await $fetch('/api/session');
    userStore.user = res;
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