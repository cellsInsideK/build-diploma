<script setup lang="ts">
  import { useUserStore } from '#build/imports';


  const userStore = useUserStore();
</script>

<template>
  <header class="container py-5 flex items-center justify-between">
    <NuxtLink to="/">
      <NuxtImg src="/logo.svg" alt="Логотип компании" height="38px" width="65px" />
    </NuxtLink>
    <nav class="hidden md:block">
      <ul class="flex items-center gap-6 text-base">
        <li>
          <NuxtLink to="/products">
            Продукция
          </NuxtLink>
        </li>
        <li>
          <NuxtLink to="/services">
            Услуги
          </NuxtLink>
        </li>
        <li>
          <NuxtLink to="/portfolio">
            Портфолио
          </NuxtLink>
        </li>
        <li>
          <NuxtLink to="/contacts">
            Контакты
          </NuxtLink>
        </li>
        <li>
          <NuxtLink to="/about">
            О компании
          </NuxtLink>
        </li>
      </ul>
    </nav>
    <Popover>
      <PopoverTrigger>
        <NuxtImg src="/user.svg" width="40px" height="40px" />
      </PopoverTrigger>
      <PopoverContent class="rounded-lg bg-ui-accent p-2 text-white">
        <nav>
          <ul class=" flex flex-col gap-1.5">
            <template class="flex flex-col md:hidden gap-1.5">
              <li>
                <NuxtLink class="block border-b-2" to="/products">
                  Продукция
                </NuxtLink>
              </li>
              <li>
                <NuxtLink class="block px- border-b-2" to="/services">
                  Услуги
                </NuxtLink>
              </li>
              <li>
                <NuxtLink class="block px- border-b-2" to="/portfolio">
                  Портфолио
                </NuxtLink>
              </li>
              <li>
                <NuxtLink class="block px- border-b-2" to="/contacts">
                  Контакты
                </NuxtLink>
              </li>
              <li>
                <NuxtLink class="block px- border-b-2" to="/about">
                  О компании
                </NuxtLink>
              </li>
            </template>
            <template v-if="!userStore.isAuthenticated">
              <li>
                <NuxtLink class="block px- border-b-2" to="/sign-in">
                  Вход
                </NuxtLink>
              </li>
              <li>
                <NuxtLink class="block px- border-b-2" to="/sign-up">
                  Регистрация
                </NuxtLink>
              </li>
            </template>
            <template v-else>
              <li>
                <NuxtLink class="block px- border-b-2" to="/profile">
                  Профиль
                </NuxtLink>
              </li>
              <li>
                <NuxtLink class="block px- border-b-2" to="/cart">
                  Корзина
                </NuxtLink>
              </li>
              <li class=" cursor-pointer" @click="userStore.logout">
                Выход
              </li>
            </template>
          </ul>
        </nav>
      </PopoverContent>
    </Popover>
  </header>
</template>