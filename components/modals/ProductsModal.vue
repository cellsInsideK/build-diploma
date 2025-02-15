<script setup lang="ts">
  import { reactive, ref } from 'vue';
  import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '../ui/dialog';

  import { toast } from 'vue-sonner';
  import { Button } from '../ui/button';
  import { Input } from '../ui/input';
  import { Label } from '../ui/label';
  import { Select } from '../ui/select';

  const emit = defineEmits<{
    (e: 'created'): void
  }>();
  const isOpen = defineModel<boolean>('isOpen');

  const isFormLoading = ref(false);
  const form = reactive<{ name: string, price: number, type: string, imageName: string, description: string, amount: number }>(
    { name: '', price: 0, type: '', imageName: '', description: '', amount: 0 });

  const handleSubmit = async () => {
    if (form.name === '' || form.price === 0 || form.imageName === '' || form.type === '' || form.description === '' || form.amount == 0) {
      return toast.error('Ошибка', { description: 'Необходимо заполнить все поля' });
    }

    isFormLoading.value = true;
    const res = await $fetch('/api/product', { method: 'POST', body: form });
    isFormLoading.value = false;

    if (res.statusCode !== 200) {
      return toast.error('Ошибка', { description: res.message });
    }

    toast.success(res.message);
    emit('created')
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
        <DialogTitle>Создание товара</DialogTitle>
        <DialogDescription>
          Заполните все поля для добавления нового товара
        </DialogDescription>
      </DialogHeader>

      <Label for="name">Наименование</Label>
      <Input v-model="form.name" id="name" type="text" placeholder="Введите наименование товара" />
      <Label for="price">Цена</Label>
      <Input v-model="form.price" id="price" type="number" placeholder="Введите цену товара" />

      <Label>Название изображения</Label>
      <Input readonly v-model="form.imageName"></Input>
      <Label for="image">Изображение</Label>
      <CldUploadWidget v-slot="{ open }" @success="upload" @error="" @result="" uploadPreset="ml_default">
        <button type="button" @click="open">Загрузить изображение</button>
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
        <Button @click="handleSubmit" :disabled="isFormLoading" class="bg-ui-accent w-full">Создать товар</Button>
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