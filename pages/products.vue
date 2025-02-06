<script setup lang="ts">
  import { computed, onMounted, ref, useHead } from '#imports';
  import type { SelectProduct } from '~/server/database/schema';
  import { Input } from '~/components/ui/input';
  import { Label } from '~/components/ui/label';
  import UiProductCard from '~/components/UiProductCard.vue';
  import UiSection from '~/components/UiSection.vue';
  import UiLoader from '~/components/UiLoader.vue';

  const products = ref<SelectProduct[]>([]);

  const isLoading = ref(false);
  const search = ref('');
  const type = ref('');
  const from = ref();
  const to = ref();

  const sortedProducts = computed(() => {
    const min = from.value ?? 0;
    const max = to.value ?? Infinity;

    const searchFilter = (item: SelectProduct) => search.value ? item.name.toLowerCase().includes(search.value.toLowerCase()) : item;
    const priceFilter = (item: SelectProduct) => item.price >= min && item.price <= max;
    const categoryFilter = (item: SelectProduct) => type.value ? item.type === type.value : item

    return products.value.filter(item => searchFilter(item) && priceFilter(item) && categoryFilter(item));
  })

  useHead({ title: 'Продукция' })

  onMounted(async () => {
    isLoading.value = true;
    const res = await $fetch('/api/product');
    isLoading.value = false;

    return products.value = res.data
  })
</script>

<template>
  <UiLoader :is-loading="isLoading">
    <UiSection>
      <Input v-model="search" class=" max-w-lg mx-auto mb-4" placeholder="Поиск" />
      <div class=" flex gap-4 mb-4">
        <Popover>
          <PopoverTrigger class="rounded-lg bg-ui-accent p-2 text-white">Категория</PopoverTrigger>
          <PopoverContent class="rounded-lg bg-ui-accent p-2 text-white max-w-fit flex flex-col gap-2">
            <p @click="() => type = ''" class="cursor-pointer">Все</p>
            <p @click="() => type = 'cement'" class="cursor-pointer">Цемент</p>
            <p @click="() => type = 'microcement'" class="cursor-pointer">Микроцемент</p>
            <p @click="() => type = 'cement-mix'" class="cursor-pointer">Цементная смесь</p>
          </PopoverContent>
        </Popover>
        <Popover>
          <PopoverTrigger class="rounded-lg bg-ui-accent p-2 text-white">Цена</PopoverTrigger>
          <PopoverContent class="rounded-lg bg-ui-accent p-2 text-white max-w-fit">
            <div>
              <Label>От:</Label>
              <Input v-model="from" class="text-black" placeholder="Руб." />
            </div>
            <div>
              <Label>До:</Label>
              <Input v-model="to" class="text-black" placeholder="Руб." />
            </div>
          </PopoverContent>
        </Popover>
      </div>

      <div class="flex flex-wrap gap-10 justify-center">
        <template v-for="product in sortedProducts">
          <UiProductCard :product />
        </template>
      </div>
    </UiSection>
  </UiLoader>
</template>