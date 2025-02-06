<script setup lang="ts">
  import { useHead } from '#imports'
  import AdminOrders from '~/components/admin/AdminOrders.vue';
  import AdminProducts from '~/components/admin/AdminProducts.vue';
  import AdminServices from '~/components/admin/AdminServices.vue';
  import AdminUsers from '~/components/admin/AdminUsers.vue';
  import { Tabs, TabsContent, TabsList, TabsTrigger } from '~/components/ui/tabs';
  import UiSection from '~/components/UiSection.vue';

  useHead({ title: 'Админ панель' })
</script>

<template>
  <UiSection>
    <h1 class="font-bold text-4xl">Админ-панель</h1>
    <Tabs default-value="orders" class="mt-4">
      <TabsList class="grid w-full grid-cols-4 gap-3">
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
          Заявки
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
    </Tabs>
  </UiSection>
</template>