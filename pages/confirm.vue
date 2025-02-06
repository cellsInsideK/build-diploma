<script setup lang="ts">
  import { onMounted, ref } from 'vue';
  import { toast } from 'vue-sonner';
  import { navigateTo, useCartStore, useHead, useUserStore } from '#imports';
  import { Input } from '~/components/ui/input';
  import { Label } from '~/components/ui/label';
  import { validateTel } from '#build/imports';

  useHead({ title: 'Оформление заказа' })

  const form = ref({ tel: '', address: '' });
  const type = ref<'courier' | 'pickup' | undefined>();
  const loading = ref(false);

  const cartStore = useCartStore();
  const userStore = useUserStore();

  const handleConfirm = async () => {
    if (type.value === undefined || form.value.tel === '')
      return toast.error('Ошибка', { description: 'Необходимо заполнить все поля' })

    if (type.value === 'courier' && form.value.address === '')
      return toast.error("Ошибка", { description: 'При доставке курьером необходимо указать адрес' });

    if (!validateTel(form.value.tel))
      return toast.error('Ошибка', { description: 'Неверно указан телефон' })

    loading.value = true;

    const cartBody = cartStore.cart.map(product => ({ id: product.id, quantity: product.quantity }));
    const body = { userId: userStore.user?.id, items: cartBody, tel: form.value.tel, type: type.value, address: form.value.address };
    const res = await $fetch('/api/cart', { method: 'POST', body });
    loading.value = false;

    if (res.statusCode !== 200) {
      return toast.error('Ошибка', { description: res.message });
    }

    cartStore.clearCart();
    toast.success(res.message);
    return navigateTo('/');
  }

  onMounted(() => {
    if (cartStore.cart.length === 0) {
      return navigateTo('/')
    }
  })
</script>

<template>
  <UiSection>
    <h2 class="text-center text-4xl font-medium">Оформление заказа</h2>
    <div class="flex flex-col justify-center mx-auto w-full max-w-xl gap-1.5 bg-white rounded-xl p-6 mt-5">
      <Label for="tel" class="mt-4">Телефон</Label>
      <Input v-model="form.tel" id="tel" type="tel" placeholder="Введите ваш телефон" />
      <Label class="mt-4">Способ доставки</Label>
      <Select v-model="type">
        <SelectTrigger>
          <SelectValue placeholder="Выберите тип доставки" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="courier">
              Курьер
            </SelectItem>
            <SelectItem value="pickup">
              Самовывоз
            </SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
      <template v-if="type === 'courier'">
        <Label for="address" class="mt-4">Адрес доставки</Label>
        <Input v-model="form.address" id="address" type="address" placeholder="Введите ваш адрес" />
      </template>
      <Button :disabled="loading" @click="handleConfirm" class="bg-ui-accent mt-4 max-w-72 mx-auto w-full">
        Оформить заказ
      </Button>
    </div>
  </UiSection>
</template>