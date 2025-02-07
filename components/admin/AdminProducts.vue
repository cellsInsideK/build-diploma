<script setup lang="ts">
  import { onMounted, ref } from 'vue';
  import { toast } from 'vue-sonner';
  import ProductsModal from '../modals/ProductsModal.vue';
  import UiLoader from '../UiLoader.vue';
  import { Button } from '../ui/button';
  import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '../ui/table';
  import type { SelectProduct } from '~/server/database/schema';
  import { getLocaleDate } from '#build/imports';
  import EditProductsModal from '../modals/EditProductsModal.vue';

  const products = ref<SelectProduct[]>([]);
  const isLoading = ref(false);
  const isModalOpen = ref(false);
  const isEditModalOpen = ref(false);
  const selectedProduct = ref<SelectProduct>({} as SelectProduct);

  const typeMap = {
    'cement': 'Цемент',
    'microcement': 'Микроцемент',
    'cement-mix': 'Цементная смесь'
  }

  onMounted(async () => {
    await getProducts();
  })

  const getProducts = async () => {
    isLoading.value = true;
    const data = await $fetch('/api/product');
    isLoading.value = false

    if (data.statusCode === 200) {
      return products.value = data.data
    }

    return toast.error('Ошибка', { description: 'Не удалось получить данные' })
  }

  const handleDeleteProduct = async (id: string) => {
    const data = await $fetch('/api/product', { method: 'DELETE', body: { id } });

    if (data.statusCode === 200) {
      toast.success('Товар удален');
      await getProducts();
    }
  }

  const handleEditProduct = async (product: SelectProduct) => {
    isEditModalOpen.value = true;
    selectedProduct.value = product;
  }
</script>

<template>
  <ProductsModal v-model:is-open="isModalOpen" @created="getProducts" />
  <EditProductsModal v-model:is-open="isEditModalOpen" :product="selectedProduct" @updated="getProducts" />
  <UiLoader :isLoading="isLoading">
    <Button @click="isModalOpen = true" class="bg-ui-accent w-full mb-2">Создать товар</Button>
    <Table v-if="products.length > 0" class="border rounded-lg">
      <TableHeader class="bg-ui-accent">
        <TableRow>
          <TableHead class="text-white rounded-tl-lg w-[150px]">Id</TableHead>
          <TableHead class="text-white">Наименование</TableHead>
          <TableHead class="text-white">Цена</TableHead>
          <TableHead class="text-white">Тип товара</TableHead>
          <TableHead class="text-white">Изображение</TableHead>
          <TableHead class="text-white">Описание</TableHead>
          <TableHead class="text-white">Количество</TableHead>
          <TableHead class="text-white">Дата создания</TableHead>
          <TableHead class="text-white">Дата обновления</TableHead>
          <TableHead class="text-white">Удалить</TableHead>
          <TableHead class="text-white rounded-tr-lg">Изменить</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody class="bg-white">
        <TableRow v-for="item in products" :key="item.id">
          <TableCell>{{ item.id }}</TableCell>
          <TableCell>{{ item.name }}</TableCell>
          <TableCell>{{ item.price }}</TableCell>
          <TableCell>{{ typeMap[item.type] }}</TableCell>
          <TableCell>{{ item.imageName }}</TableCell>
          <TableCell>{{ item.description }}</TableCell>
          <TableCell>{{ item.amount }}</TableCell>
          <TableCell>{{ getLocaleDate(item.createdAt!) }}</TableCell>
          <TableCell>{{ getLocaleDate(item.updatedAt!) }}</TableCell>
          <TableCell>
            <img @click="handleDeleteProduct(item.id)" src="/delete.svg" alt="delete product"
              class="cursor-pointer ml-4">
          </TableCell>
          <TableCell>
            <img @click="handleEditProduct(item)" src="/edit.svg" alt="edit product" class="cursor-pointer ml-4">
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
    <template v-else>
      <p class="text-center">Здесь, пока что, нет данных</p>
    </template>
  </UiLoader>
</template>