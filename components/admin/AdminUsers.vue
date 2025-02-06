<script setup lang="ts">
  import { onMounted, ref } from 'vue';
  import { toast } from 'vue-sonner';
  import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '../ui/table';
  import type { SelectUsers } from '~/server/database/schema';
  import { getLocaleDate } from '#build/imports';
  import UiLoader from '../UiLoader.vue';
  import EditUserModal from '../modals/EditUserModal.vue';

  const users = ref<SelectUsers[]>([]);

  const isLoading = ref(false);
  const isOpen = ref(false);
  const selectedUser = ref<SelectUsers>({} as SelectUsers);

  onMounted(async () => {
    await getUsers();
  })

  const getUsers = async () => {
    isLoading.value = true;
    const data = await $fetch('/api/user');
    isLoading.value = false

    if (data.statusCode === 200) {
      return users.value = data.data
    }

    return toast.error('Ошибка', { description: 'Не удалось получить данные' })
  }

  const handleDeleteUser = async (id: string) => {
    const data = await $fetch('/api/user', { method: 'DELETE', body: { id } });

    if (data.statusCode === 200) {
      toast.success('Пользователь удален');
      await getUsers();
    }
  }

  const handleEditUser = async (user: SelectUsers) => {
    selectedUser.value = user;
    isOpen.value = true;
  }
</script>

<template>
  <EditUserModal v-model:isOpen="isOpen" v-model:user="selectedUser" @updated="getUsers" />
  <UiLoader :isLoading="isLoading">
    <Table v-if="users.length > 0" class="border rounded-lg">
      <TableHeader class="bg-ui-accent">
        <TableRow>
          <TableHead class="text-white rounded-tl-lg w-[150px]">Id</TableHead>
          <TableHead class="text-white">Имя</TableHead>
          <TableHead class="text-white">Фамилия</TableHead>
          <TableHead class="text-white">Логин</TableHead>
          <TableHead class="text-white">Email</TableHead>
          <TableHead class="text-white w-[150px]">Пароль</TableHead>
          <TableHead class="text-white">Админ</TableHead>
          <TableHead class="text-white">Дата создания</TableHead>
          <TableHead class="text-white">Дата обновления</TableHead>
          <TableHead class="text-white">Удалить</TableHead>
          <TableHead class="text-white rounded-tr-lg">Изменить</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow v-for="item in users" :key="item.id">
          <TableCell>{{ item.id }}</TableCell>
          <TableCell>{{ item.name }}</TableCell>
          <TableCell>{{ item.surname }}</TableCell>
          <TableCell>{{ item.login }}</TableCell>
          <TableCell>{{ item.email }}</TableCell>
          <TableCell class="break-all">{{ item.passwordHash }}</TableCell>
          <TableCell>{{ item.isAdmin ? 'Да' : 'Нет' }}</TableCell>
          <TableCell>{{ getLocaleDate(item.createdAt!) }}</TableCell>
          <TableCell>{{ getLocaleDate(item.updatedAt!) }}</TableCell>
          <TableCell>
            <img @click="handleDeleteUser(item.id)" src="/delete.svg" alt="delete user" class="cursor-pointer ml-4">
          </TableCell>
          <TableCell>
            <img @click="handleEditUser(item)" src="/edit.svg" alt="edit user" class="cursor-pointer ml-4">
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
    <template v-else>
      <p class="text-center">Здесь, пока что, нет данных</p>
    </template>
  </UiLoader>
</template>