<script setup lang="ts">
  import { definePageMeta, navigateTo, useUserStore } from '#build/imports';
  import { useHead } from '#imports';
  import { onMounted, reactive, ref, watch } from 'vue';
  import { toast } from 'vue-sonner';
  import { Input } from '~/components/ui/input';
  import { Label } from '~/components/ui/label';
  import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '~/components/ui/table';
  import UiLoader from '~/components/UiLoader.vue';
  import UiSection from '~/components/UiSection.vue';
  import { type SelectOrderItems, type SelectOrders, type SelectProduct } from '~/server/database/schema';

  type Orders = Array<SelectOrders & { items: Array<{ orderItem: SelectOrderItems, product: SelectProduct }> }>

  const orders = ref<Orders>([]);
  const form = reactive({ name: '', surname: '', login: '' });
  const isLoading = ref(false);
  const userStore = useUserStore();

  const statusMap = {
    'process': 'В обработке',
    'completed': 'Завершен',
    'canceled': 'Отменен',
    'accepted': 'Принят',
  }

  const handleEditUser = async () => {
    const res = await $fetch('/api/user', { method: 'PATCH', body: { id: userStore.user?.id!, ...form } });

    if (res.statusCode === 200) {
      return toast.success('Данные обновлены')
    }
  }

  const handleCancleOrder = async (id: string) => {
    const res = await $fetch(`/api/cart/${id}`, { method: 'PATCH', body: { status: 'canceled' } });

    await getOrders();
  }

  onMounted(async () => {
    if (userStore.user?.isAdmin) {
      return navigateTo('/admin')
    }
    await getOrders();
  })

  watch(() => userStore.user?.id, async () => {
    await getOrders();
  })

  useHead({ title: 'Профиль' });
  definePageMeta({ middleware: 'auth' })

  const getOrders = async () => {
    isLoading.value = true;
    const res = await $fetch(`/api/cart/${userStore.user?.id}`);
    isLoading.value = false;
    orders.value = res.data;
  }
</script>

<template>
  <UiSection>
    <UiLoader :is-loading="isLoading">
      <h2 class="font-bold text-3xl">Профиль</h2>
      <div class="flex flex-col justify-center w-full max-w-xl gap-1.5 bg-white rounded-xl p-6 mt-5">
        <Label for="name">Имя</Label>
        <Input v-model="form.name" id="name" type="text" :placeholder="userStore.user?.name" />
        <Label class="mt-2" for="surname">Фамилия</Label>
        <Input v-model="form.surname" id="surnmae" type="text" :placeholder="userStore.user?.surname" />
        <Label class="mt-2" for="login">Логин</Label>
        <Input v-model="form.login" id="login" type="text" :placeholder="userStore.user?.login" />
        <Button @click="handleEditUser" class="bg-ui-accent w-full md:w-fit self-center mt-4 p-5 px-8">Изменить</Button>
      </div>
      <h2 class="font-bold text-3xl mt-4">Заказы</h2>
      <div v-if="orders.length > 0" class="flex flex-col gap-4">
        <template v-for="order in orders">
          <p class="mt-8">Заказ №{{ order.id }}</p>
          <p>Статус заказа: {{ statusMap[order.status] }}</p>
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
              <TableRow v-for="item in order.items" :key="order.id">
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
            <Button @click="handleCancleOrder(order.id)" v-if="order.status === 'process'" class="bg-ui-accent">Отменить
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
  </UiSection>
</template>