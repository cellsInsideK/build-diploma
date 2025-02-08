<script setup lang="ts">
  import { reactive, ref, toRefs, watch } from 'vue';
  import { toast } from 'vue-sonner';
  import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '../ui/dialog';

  import { Button } from '../ui/button';
  import { Input } from '../ui/input';
  import { Label } from '../ui/label';
  import type { SelectUsers } from '~/server/database/schema';

  const { user } = defineProps<{ user: SelectUsers }>();
  const isOpen = defineModel<boolean>('isOpen');
  const emit = defineEmits<{
    (e: 'updated'): void
  }>();

  const form = reactive<SelectUsers>({} as SelectUsers);

  watch(() => user, (newUser) => {
    form.id = newUser.id;
    form.name = newUser.name;
    form.surname = newUser.surname;
    form.login = newUser.login;
    form.email = newUser.email;
    form.passwordHash = newUser.passwordHash;
    form.isAdmin = newUser.isAdmin;
    form.createdAt = newUser.createdAt;
    form.updatedAt = newUser.updatedAt;
  })

  const isFormLoading = ref(false);

  const handleSubmit = async () => {
    let dirtyPassword = false;

    if (form.name.trim() === '' || form.surname.trim() === '' || form.email.trim() === '' || form.login.trim() === '' || form.passwordHash.trim() === '') {
      return toast.error('Ошибка', { description: 'Необходимо заполнить все поля' });
    }

    if (form.passwordHash !== user.passwordHash) {
      dirtyPassword = true;
    }

    isFormLoading.value = true;
    const res = await $fetch('/api/user', { method: 'PATCH', body: { dirtyPassword, ...form } });
    isFormLoading.value = false;

    if (res.statusCode !== 200) {
      return toast.error('Ошибка', { description: res.message });
    }

    toast.success(res.message);
    emit('updated')
    return isOpen.value = false;
  }
</script>

<template>
  <Dialog v-model:open="isOpen" class="p-5">
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Изменение пользователя</DialogTitle>
        <DialogDescription>
          Заполните все поля для изменения пользвоателя
        </DialogDescription>
      </DialogHeader>

      <Label for="name">Имя</Label>
      <Input v-model="form.name" id="name" type="text" placeholder="Введите имя пользователя" />

      <Label for="surname">Фамилия</Label>
      <Input v-model="form.surname" id="surname" type="text" placeholder="Введите фамилию пользователя" />

      <Label for="login">Логин</Label>
      <Input v-model="form.login" id="login" type="text" placeholder="Введите логин пользователя" />

      <Label for="email">Email</Label>
      <Input v-model="form.email" id="email" type="text" placeholder="Введите email пользователя" />

      <Label for="passwordHash">Пароль</Label>
      <Input v-model="form.passwordHash" id="passwordHash" type="text" placeholder="Введите пароль пользователя" />

      <Label>Админ</Label>
      <input v-model="form.isAdmin" type="checkbox"></input>
      <DialogFooter>
        <Button @click="handleSubmit" :disabled="isFormLoading" class="bg-ui-accent w-full">Изменить
          пользователя</Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>