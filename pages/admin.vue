<script setup lang="ts">
  import { definePageMeta, navigateTo, useHead, useUserStore, watch } from '#imports'
  import AdminContacts from '~/components/admin/AdminContacts.vue';
  import AdminOrders from '~/components/admin/AdminOrders.vue';
  import AdminProducts from '~/components/admin/AdminProducts.vue';
  import AdminServices from '~/components/admin/AdminServices.vue';
  import AdminUsers from '~/components/admin/AdminUsers.vue';
  import { Tabs, TabsContent, TabsList, TabsTrigger } from '~/components/ui/tabs';
  import UiSection from '~/components/UiSection.vue';

  useHead({ title: 'Админ панель' })
  const userStore = useUserStore();

  watch(() => userStore.isAuthenticated, (newVal) => {
    if (newVal === false) {
      return navigateTo('/')
    }
  })

  definePageMeta({ middleware: 'auth' });
</script>

<template>
  <UiSection>
    <h1 class="font-bold text-4xl">Админ-панель</h1>
    <Tabs default-value="orders" class="mt-4">
      <TabsList class="grid w-full grid-cols-5 gap-3">
        <TabsTrigger value="orders"
          class="bg-ui-accent p-2 text-white text-md rounded-lg data-[state=active]:text-ui-accent">
          Заказы
        </TabsTrigger>
        <TabsTrigger value="products"
          class="bg-ui-accent p-2 text-white text-md rounded-lg data-[state=active]:text-ui-accent">
          Товары
        </TabsTrigger>
        <TabsTrigger value="users"
          class="bg-ui-accent p-2 text-white text-md rounded-lg data-[state=active]:text-ui-accent">
          Пользователи
        </TabsTrigger>
        <TabsTrigger value="services"
          class="bg-ui-accent p-2 text-white text-md rounded-lg data-[state=active]:text-ui-accent">
          Заявки на услуги
        </TabsTrigger>
        <TabsTrigger value="contact"
          class="bg-ui-accent p-2 text-white text-md rounded-lg data-[state=active]:text-ui-accent">
          Обратная связь
        </TabsTrigger>
      </TabsList>
      <TabsContent value="orders">
        <AdminOrders />
      </TabsContent>
      <TabsContent value="products">
        <AdminProducts />
      </TabsContent>
      <TabsContent value="users">
        <AdminUsers />
      </TabsContent>
      <TabsContent value="services">
        <AdminServices />
      </TabsContent>
      <TabsContent value="contact">
        <AdminContacts />
      </TabsContent>
    </Tabs>
  </UiSection>
</template>