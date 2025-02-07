import { defineNuxtRouteMiddleware, navigateTo, useUserStore } from "#imports";

export default defineNuxtRouteMiddleware((to)=> {
  const userStore = useUserStore();

  if (!userStore.user?.isAdmin && to.path === '/admin') {
    return navigateTo('/')
  }

  if (!userStore.isAuthenticated) {
    return navigateTo('/');
  }
})