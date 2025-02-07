<script setup lang="ts">
  import { ref } from 'vue';
  import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '../ui/dialog';

  import { toast } from 'vue-sonner';
  import { Button } from '../ui/button';
  import { Input } from '../ui/input';
  import { Label } from '../ui/label';
  import { useUserStore } from '#build/imports';

  const userStore = useUserStore();
  const name = userStore.isAuthenticated ? `${userStore.user?.surname} ${userStore.user?.name}` : '';

  const type = defineModel<string>('type');
  const isOpen = defineModel<boolean>('isOpen');
  const isLoading = ref(false);
  const form = ref({ name: name, tel: '' });

  const handleSubmit = async () => {
    if (form.value.name === '' || form.value.tel === '') {
      return toast.error('Ошибка', { description: 'Необходимо заполнить все поля' });
    }

    isLoading.value = true;
    const res = await $fetch('/api/service', { method: 'POST', body: { name: form.value.name, tel: form.value.tel, type: type.value } });
    isLoading.value = false;

    if (res.statusCode !== 200) {
      return toast.error('Ошибка', { description: res.message });
    }

    toast.success(res.message);
    return isOpen.value = false;
  }
</script>

<template>
  <Dialog v-model:open="isOpen" class="p-5">
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Заказ услуги: "{{ type }}"</DialogTitle>
        <DialogDescription>
          Напишите ваши контактные данные и мы свяжемся с вами для предоставления услуги.
        </DialogDescription>
      </DialogHeader>

      <Label for="name">Имя</Label>
      <Input v-model="form.name" id="name" type="text" placeholder="Введите ваше имя" />
      <Label for="tel">Телефон</Label>
      <Input v-model="form.tel" id="tel" type="tel" placeholder="Введите ваш номер телефона" />

      <DialogFooter>
        <Button @click="handleSubmit" class="bg-ui-accent w-full" :disabled="isLoading">Отправить заявку</Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>