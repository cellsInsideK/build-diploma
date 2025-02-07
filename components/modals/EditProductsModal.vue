<script setup lang="ts">
  import { reactive, ref, watch } from 'vue';
  import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '../ui/dialog';

  import { toast } from 'vue-sonner';
  import { Button } from '../ui/button';
  import { Input } from '../ui/input';
  import { Label } from '../ui/label';
  import { Select } from '../ui/select';
  import type { SelectProduct } from '~/server/database/schema';

  const { product } = defineProps<{ product: SelectProduct }>();
  const emit = defineEmits<{
    (e: 'updated'): void
  }>();
  const isOpen = defineModel<boolean>('isOpen');

  const isFormLoading = ref(false);
  const form = reactive<SelectProduct>({} as SelectProduct);

  watch(() => product, (newProduct) => {
    form.id = newProduct.id;
    form.name = newProduct.name;
    form.price = newProduct.price;
    form.type = newProduct.type;
    form.imageName = newProduct.imageName;
    form.description = newProduct.description;
    form.amount = newProduct.amount;
    form.createdAt = newProduct.createdAt;
    form.updatedAt = newProduct.updatedAt;
  })

  const handleSubmit = async () => {
    if (form.name === '' || form.price === 0 || form.imageName === '' || form.amount === 0 || form.description === '') {
      return toast.error('Ошибка', { description: 'Необходимо заполнить все поля' });
    }

    isFormLoading.value = true;
    const res = await $fetch('/api/product', { method: 'PATCH', body: form });
    isFormLoading.value = false;

    if (res.statusCode !== 200) {
      return toast.error('Ошибка', { description: res.message });
    }

    toast.success(res.message);
    emit('updated')
    return isOpen.value = false;
  }

  const upload = (res: any) => {
    form.imageName = res?.info?.public_id;
  }

</script>

<template>
  <Dialog v-model:open="isOpen" class="p-5">
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Изменение товара</DialogTitle>
        <DialogDescription>
          Заполните все поля для изменения товара
        </DialogDescription>
      </DialogHeader>

      <Label for="name">Наименование</Label>
      <Input v-model="form.name" id="name" type="text" placeholder="Введите наименование товара" />
      <Label for="price">Цена</Label>
      <Input v-model="form.price" id="price" type="number" placeholder="Введите цену товара" />
      <Label for="image">Изображение</Label>

      <CldUploadWidget v-slot="{ open }" @success="upload" @error="" @result="" uploadPreset="ml_default">
        <button type="button" @click="open">Загрузить новое изображение (если необходимо)</button>
      </CldUploadWidget>
      <Label>Тип</Label>
      <Select v-model="form.type">
        <SelectTrigger>
          <SelectValue placeholder="Выберите тип товара" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="cement">
              Цемент
            </SelectItem>
            <SelectItem value="microcement">
              Микроцемент
            </SelectItem>
            <SelectItem value="cement-mix">
              Цементная смесь
            </SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>

      <Label for="description">Описание</Label>
      <Input v-model="form.description" id="description" type="text" placeholder="Введите описание товара" />
      <Label for="amount">Количество</Label>
      <Input v-model="form.amount" id="amount" type="number" placeholder="Введите количество товара" />

      <DialogFooter>
        <Button @click="handleSubmit" :disabled="isFormLoading" class="bg-ui-accent w-full">Изменить товар</Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>

<style>
  iframe {
    z-index: -1;
    pointer-events: all;
  }
</style>