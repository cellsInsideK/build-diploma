<script setup lang="ts">
  import { onMounted, ref } from 'vue';
  import { toast } from 'vue-sonner';
  import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '../ui/table';
  import type { SelectContacts } from '~/server/database/schema';
  import UiLoader from '../UiLoader.vue';

  const contacts = ref<SelectContacts[]>([]);
  const isLoading = ref(false);

  onMounted(async () => {
    await getContacts();
  })

  const getContacts = async () => {
    isLoading.value = true;
    const data = await $fetch('/api/contact');
    isLoading.value = false;

    if (data.statusCode === 200) {
      return contacts.value = data.data
    }

    return toast.error('Ошибка', { description: 'Не удалось получить данные' })
  }

  const handleDeleteContact = async (id: string) => {
    const data = await $fetch('/api/contact', { method: 'DELETE', body: { id } });

    if (data.statusCode === 200) {
      toast.success('Услуга удалена');
      await getContacts();
    }
  }
</script>

<template>
  <UiLoader :is-loading="isLoading">
    <Table v-if="contacts.length > 0" class="border rounded-lg">
      <TableHeader class="bg-ui-accent">
        <TableRow>
          <TableHead class="text-white rounded-tl-lg w-[150px]">Id</TableHead>
          <TableHead class="text-white">Имя</TableHead>
          <TableHead class="text-white">Фамилия</TableHead>
          <TableHead class="text-white">Телефон</TableHead>
          <TableHead class="text-white">Email</TableHead>
          <TableHead class="text-white">Комментарий</TableHead>
          <TableHead class="text-white rounded-tr-lg">Удалить</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow v-for="item in contacts" :key="item.id">
          <TableCell>{{ item.id }}</TableCell>
          <TableCell>{{ item.name }}</TableCell>
          <TableCell>{{ item.surname }}</TableCell>
          <TableCell>{{ item.tel }}</TableCell>
          <TableCell>{{ item.email }}</TableCell>
          <TableCell>{{ item.comment }}</TableCell>
          <TableCell>
            <img @click="handleDeleteContact(item.id)" src="/delete.svg" alt="delete contact"
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