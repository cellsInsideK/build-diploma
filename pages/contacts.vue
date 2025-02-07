<script setup lang="ts">
  import { ref } from 'vue';
  import { toast } from 'vue-sonner';
  import { navigateTo, useHead, useUserStore } from '#imports';
  import { Input } from '~/components/ui/input';
  import { Label } from '~/components/ui/label';
  import { validateEmail, validateTel } from '#build/imports'

  useHead({ title: 'Связаться с нами' })

  const userStore = useUserStore();
  const surname = userStore.isAuthenticated ? userStore.user?.surname : '';
  const name = userStore.isAuthenticated ? userStore.user?.name : ''

  const form = ref({ surname, name, tel: '', email: '', comment: '' });
  const loading = ref(false);

  const handleSubmit = async () => {
    if (form.value.email === '' || form.value.name === '' || form.value.surname === '' || form.value.tel === '')
      return toast.error('Ошибка', { description: 'Необходимо заполнить все поля' })

    if (!validateTel(form.value.tel))
      return toast.error('Ошибка', { description: 'Неверно указан номер телефона' })

    if (!validateEmail(form.value.email))
      return toast.error('Ошибка', { description: 'Неверно указан email' });

    loading.value = true;
    const data = await $fetch('/api/contact', { body: form.value, method: 'POST' })
    loading.value = false;

    if (data.statusCode !== 200) {
      return toast.error('Ошибка', { description: data.message })
    }

    toast.success(data.message);
    return navigateTo('/');
  }
</script>

<template>
  <UiSection>
    <h2 class="text-center text-4xl font-medium">Связаться с нами</h2>
    <div class="flex flex-col justify-center mx-auto w-full max-w-xl gap-1.5 bg-white rounded-xl p-6 mt-5">
      <Label for="surname">Фамилия</Label>
      <Input v-model="form.surname" id="surname" type="text" placeholder="Введите вашу фамилию" />
      <Label for="name" class="mt-4">Имя</Label>
      <Input v-model="form.name" id="name" type="text" placeholder="Введите ваше имя" />
      <Label for="tel" class="mt-4">Телефон</Label>
      <Input v-model="form.tel" id="tel" type="tel" placeholder="Введите ваш номер телефона" />
      <Label for="email" class="mt-4">E-mail</Label>
      <Input v-model="form.email" id="email" type="email" placeholder="Введите вашу почту" />
      <Label for="comment" class="mt-4">Комментарий</Label>
      <Input v-model="form.comment" id="comment" type="text" placeholder="Введите комментарий" />
      <Button :disabled="loading" @click="handleSubmit"
        class="bg-ui-accent mt-4 max-w-72 mx-auto w-full">Отправить</Button>
    </div>
  </UiSection>
</template>