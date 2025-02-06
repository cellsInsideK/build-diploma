<script setup lang="ts">
  import { ref } from 'vue';
  import { toast } from 'vue-sonner';
  import { navigateTo, useHead, useUserStore } from '#imports';
  import { Input } from '~/components/ui/input';
  import { Label } from '~/components/ui/label';
  import { validateEmail } from '#build/imports';

  useHead({ title: 'Регистрация' })

  const form = ref({ surname: '', name: '', login: '', email: '', password: '', confirmPassword: '' });
  const loading = ref(false);

  const userStore = useUserStore();

  const handleRegister = async () => {
    if (form.value.surname === '' || form.value.name === '' || form.value.login === '' ||
      form.value.email === '' || form.value.password === '' || form.value.confirmPassword === '') {
      return toast.error('Ошибка', { description: 'Необходимо заполнить все поля' })
    }

    if (!validateEmail(form.value.email))
      return toast.error('Ошибка', { description: 'Неверно указана почта' })

    if (form.value.password.length < 6)
      return toast.error('Ошибка', { description: 'Длина пароля должна быть от 6 символов' })

    if (form.value.password !== form.value.confirmPassword)
      return toast.error('Ошибка', { description: 'Пароли не совпадают' })

    loading.value = true;
    const data = await $fetch('/api/register', { body: form.value, method: 'POST' })
    loading.value = false;

    if (data.statusCode !== 200) {
      return toast.error('Ошибка', { description: data.message })
    }

    userStore.user = data.user;

    toast.success(data.message);
    return navigateTo('/');
  }
</script>

<template>
  <UiSection>
    <h2 class="text-center text-4xl font-medium">Регистрация</h2>
    <div class="flex flex-col justify-center mx-auto w-full max-w-xl gap-1.5 bg-white rounded-xl p-6 mt-5">
      <Label for="surname">Фамилия</Label>
      <Input v-model="form.surname" id="surname" type="text" placeholder="Введите вашу фамилию" />
      <Label for="name" class="mt-4">Имя</Label>
      <Input v-model="form.name" id="name" type="text" placeholder="Введите ваше имя" />
      <Label for="login" class="mt-4">Логин</Label>
      <Input v-model="form.login" id="login" type="login" placeholder="Введите ваш логин" />
      <Label for="email" class="mt-4">E-mail</Label>
      <Input v-model="form.email" id="email" type="email" placeholder="Введите вашу почту" />
      <Label for="password" class="mt-4">Пароль</Label>
      <Input v-model="form.password" id="password" type="password" placeholder="Введите ваш пароль (от 6 символов)" />
      <Label for="confirmPassword" class="mt-4">Подтвердите пароль</Label>
      <Input v-model="form.confirmPassword" id="confirmPassword" type="password" placeholder="Подтвердите пароль" />
      <Button :disabled="loading" @click="handleRegister"
        class="bg-ui-accent mt-4 max-w-72 mx-auto w-full">Зарегестрироваться</Button>
    </div>
  </UiSection>
</template>