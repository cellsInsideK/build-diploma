<script setup lang="ts">
  import { ref } from 'vue';
  import ServiceModal from '~/components/modals/ServiceModal.vue';
  import { Button } from '~/components/ui/button';
  import UiSection from '~/components/UiSection.vue';
  import { useHead } from '#imports';

  const isOpen = ref(false);
  const type = ref('test');

  const handleServicesModal = (serviceType: string) => {
    isOpen.value = true;
    type.value = serviceType;
  }

  useHead({ title: 'Дополнительные услуги' })
</script>

<template>
  <ServiceModal v-model:is-open="isOpen" v-model:type="type" />
  <UiSection class="max-w-screen-lg">
    <h2 class="text-center text-4xl font-medium">Дополнительные услуги</h2>
    <div class=" flex flex-col gap-7 mt-8">
      <div class=" flex flex-row gap-7 bg-white rounded-lg">
        <NuxtImg provider="cloudinary" class="hidden md:block object-cover max-w-md" fit="cover" width="450" placeholder
          loading="lazy" src="services1_prq4mh" alt="" />
        <div class="flex flex-col justify-between gap-4 m-4 text-center uppercase">
          <h3 class="text-ui-accent font-bold text-lg">Доставка материалов</h3>
          <p>Мы предлагаем удобную и надежную доставку строительных материалов прямо на объект. Наша служба доставки
            работает оперативно, чтобы вы могли сфокусироваться на строительстве, а не на логистике. Мы гарантируем
            сохранность груза и соблюдение сроков, чтобы ваш проект не задерживался.
          </p>
          <Button @click="handleServicesModal('Доставка материалов')"
            class="bg-ui-accent py-5 rounded-xl">Заказать</Button>
        </div>
      </div>
      <div class=" flex flex-row gap-7 bg-white rounded-lg">
        <NuxtImg provider="cloudinary" class="hidden md:block object-cover max-w-md" fit="cover" width="450" placeholder
          loading="lazy" src="services2_fxcows" alt="" />
        <div class="flex flex-col justify-between gap-4 m-4 text-center uppercase">
          <h3 class="text-ui-accent font-bold text-lg">Консультация специалистов</h3>
          <p>Наши опытные специалисты всегда готовы ответить на ваши вопросы и помочь с выбором оптимальных решений.
            Мы
            предоставляем бесплатные консультации по всем аспектам строительства и ремонта: от выбора материалов до
            разработки проекта. Наша цель — сделать процесс строительства максимально простым и понятным для вас.
          </p>
          <Button @click="handleServicesModal('Консультация специалистов')"
            class="bg-ui-accent py-5 rounded-xl">Заказать</Button>
        </div>
      </div>
      <div class=" flex flex-row gap-7 bg-white rounded-lg">
        <NuxtImg provider="cloudinary" class="hidden md:block object-cover max-w-md" fit="cover" width="450" placeholder
          loading="lazy" src="services3_uwhxse" alt="" />
        <div class="flex flex-col justify-between gap-4 m-4 text-center uppercase">
          <h3 class="text-ui-accent font-bold text-lg">Монтаж и установка</h3>
          <p>Мы не только поставляем материалы, но и выполняем монтажные работы любой сложности. Наши мастера быстро и
            качественно установят конструкции, системы или оборудование, чтобы вы могли сразу начать эксплуатацию. Мы
            используем только профессиональное оборудование и соблюдаем все стандарты безопасности.
          </p>
          <Button @click="handleServicesModal('Монтаж и установка')"
            class="bg-ui-accent py-6 rounded-xl">Заказать</Button>
        </div>
      </div>
    </div>
  </UiSection>
</template>