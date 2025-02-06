<script setup lang="ts">
  import { ref } from 'vue';
  import { toast } from 'vue-sonner';
  import { navigateTo, useHead, useUserStore } from '#imports';
  import { Input } from '~/components/ui/input';
  import { Label } from '~/components/ui/label';

  useHead({ title: 'Авторизация' })

  const form = ref({ email: '', password: '' });
  const loading = ref(false);

  const userStore = useUserStore();

  const handleRegister = async () => {
    if (form.value.email === '' || form.value.password === '') {
      return toast.error('Ошибка', { description: 'Необходимо заполнить все поля' })
    }

    loading.value = true;
    const res = await userStore.login(form.value.email, form.value.password);
    loading.value = false;

    if (res.statusCode !== 200) {
      return toast.error('Ошибка', { description: res.message })
    }

    toast.success(res.message);
    return navigateTo('/');
  }
</script>

<template>
  <UiSection>
    <h2 class="text-center text-4xl font-medium">Авторизация</h2>
    <div class="flex flex-col justify-center mx-auto w-full max-w-xl gap-1.5 bg-white rounded-xl p-6 mt-5">
      <Label for="email" class="mt-4">E-mail</Label>
      <Input v-model="form.email" id="email" type="email" placeholder="Введите вашу почту" />
      <Label for="password" class="mt-4">Пароль</Label>
      <Input v-model="form.password" id="password" type="password" placeholder="Введите ваш пароль" />
      <Button :disabled="loading" @click="handleRegister" class="bg-ui-accent mt-4 max-w-72 mx-auto w-full">Войти в
        аккаунт</Button>
    </div>
  </UiSection>
</template>