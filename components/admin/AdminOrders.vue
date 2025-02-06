<script setup lang="ts">
  import { getLocaleDate } from '#build/imports';
  import { onMounted, ref, } from 'vue';
  import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '~/components/ui/table';
  import UiLoader from '~/components/UiLoader.vue';
  import { type SelectOrderItems, type SelectOrders, type SelectProduct, type SelectUsers } from '~/server/database/schema';
  type Orders = Array<{ orders: SelectOrders, user: SelectUsers, items: Array<{ orderItem: SelectOrderItems, product: SelectProduct }> }>

  const allOrders = ref<Orders>([]);
  const isLoading = ref(false);

  const statusMap = {
    'process': 'В обработке',
    'completed': 'Завершен',
    'canceled': 'Отменен',
    'accepted': 'Принят',
  } as const;

  const typeMap = {
    'pickup': 'Самовывоз',
    'courier': 'Доставка'
  } as const;

  const handleOrderStatus = async (id: string, status: 'canceled' | 'accepted') => {
    const res = await $fetch(`/api/cart/${id}`, { method: 'PATCH', body: { status } });

    await getOrders();
  }

  onMounted(async () => {
    await getOrders();
  })

  const getOrders = async () => {
    isLoading.value = true;
    const res = await $fetch(`/api/cart`);
    isLoading.value = false;
    allOrders.value = res.data;
  }
</script>

<template>
  <UiLoader :is-loading="isLoading">
    <div v-if="allOrders.length > 0" class="flex flex-col gap-4">
      <template v-for="order in allOrders">
        <p class="mt-8">Заказ №{{ order.orders?.id }}</p>
        <p>Статус заказа: {{ statusMap[order.orders?.status] }}</p>
        <p>Тип заказа: {{ typeMap[order.orders?.type] }}</p>
        <p v-if="order.orders.type === 'courier'">Адрес: {{ order.orders?.address }}</p>
        <p>Заказчик: {{ `${order.user.surname} ${order.user.name}` }}</p>
        <p>Оформлен: {{ getLocaleDate(order.orders.createdAt!) }}</p>
        <Table class="border rounded-lg max-w-3xl">
          <TableHeader class="bg-ui-accent">
            <TableRow>
              <TableHead class="text-white rounded-tl-lg">Изображение</TableHead>
              <TableHead class="text-white">Название</TableHead>
              <TableHead class="text-white">Количество</TableHead>
              <TableHead class="text-white">Стоимость</TableHead>
              <TableHead class="text-white rounded-tr-lg">Общая стоимость</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow v-for="item in order.items" :key="order.orders?.id">
              <TableCell>
                <NuxtImg provider="cloudinary" height="100" width="100" :src="item.product.imageName" placeholder
                  loading="lazy" />
              </TableCell>
              <TableCell>{{ item.product.name }}</TableCell>
              <TableCell class="text-center">{{ item.orderItem.quantity }}</TableCell>
              <TableCell class="text-center">{{ item.product.price }}</TableCell>
              <TableCell class="text-center">{{ item.product.price * item.orderItem.quantity }}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <div class="flex flex-row md:flex-col gap-4 justify-between items-end max-w-3xl">
          <Button @click="handleOrderStatus(order.orders.id, 'canceled')" v-if="order.orders?.status === 'process'"
            class="bg-ui-accent">Отменить
            заказ</Button>
          <Button @click="handleOrderStatus(order.orders.id, 'accepted')" v-if="order.orders?.status === 'process'"
            class="bg-green-500">Принять
            заказ</Button>
          <p>Общая стоимость:
            <span class="font-bold">
              {{ order.items.reduce((sum, item) => sum += (item.orderItem.quantity * item.product.price), 0) }}
            </span>
          </p>
        </div>
      </template>
    </div>
    <template v-else>
      <p class="text-center">Вы еще не сделали заказ 😢</p>
    </template>
  </UiLoader>
</template>