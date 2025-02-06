<script setup lang="ts">
  import { onMounted, ref } from 'vue';
  import { toast } from 'vue-sonner';
  import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '../ui/table';
  import type { SelectServices } from '~/server/database/schema';
  import { getLocaleDate } from '#build/imports';
  import UiLoader from '../UiLoader.vue';

  const services = ref<SelectServices[]>([]);
  const isLoading = ref(false);

  onMounted(async () => {
    await getServices();
  })

  const getServices = async () => {
    isLoading.value = true;
    const data = await $fetch('/api/service');
    isLoading.value = false;

    if (data.statusCode === 200) {
      return services.value = data.data
    }

    return toast.error('Ошибка', { description: 'Не удалось получить данные' })
  }

  const handleDeleteService = async (id: string) => {
    const data = await $fetch('/api/service', { method: 'DELETE', body: { id } });

    if (data.statusCode === 200) {
      toast.success('Услуга удалена');
      await getServices();
    }
  }
</script>

<template>
  <UiLoader :is-loading="isLoading">
    <Table v-if="services.length > 0" class="border rounded-lg">
      <TableHeader class="bg-ui-accent">
        <TableRow>
          <TableHead class="text-white rounded-tl-lg w-[150px]">Id</TableHead>
          <TableHead class="text-white">Имя</TableHead>
          <TableHead class="text-white">Телефон</TableHead>
          <TableHead class="text-white">Дата создания</TableHead>
          <TableHead class="text-white">Тип усуги</TableHead>
          <TableHead class="text-white rounded-tr-lg">Удалить</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow v-for="item in services" :key="item.id">
          <TableCell>{{ item.id }}</TableCell>
          <TableCell>{{ item.name }}</TableCell>
          <TableCell>{{ item.tel }}</TableCell>
          <TableCell>{{ getLocaleDate(item.createdAt!) }}</TableCell>
          <TableCell>{{ item.type }}</TableCell>
          <TableCell>
            <img @click="handleDeleteService(item.id)" src="/delete.svg" alt="delete service"
              class="cursor-pointer ml-4">
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
    <template v-else>
      <p class="text-center">Здесь, пока что, нет данных</p>
    </template>
  </UiLoader>
</template>