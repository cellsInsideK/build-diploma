<script setup lang="ts">
  import { useRouter } from 'vue-router';
  import { ref, useHead } from '#imports';

  import { Carousel, CarouselContent, CarouselItem } from '~/components/ui/carousel';
  import Button from '~/components/ui/button/Button.vue';
  import ServiceModal from '~/components/modals/ServiceModal.vue';

  const router = useRouter();

  const isOpen = ref(false);
  const type = ref('test');

  const handleServicesModal = (serviceType: string) => {
    isOpen.value = true;
    type.value = serviceType;
  }

  const handleServices = () => {
    return router.push('/services')
  }

  const handleAbout = () => {
    return router.push('/about')
  }

  useHead({ title: 'СтройМастер' })
</script>

<template>
  <ServiceModal v-model:is-open="isOpen" v-model:type="type"></ServiceModal>
  <section
    class=" bg-[url('https://res.cloudinary.com/detxwiyvk/image/upload/v1738600429/hero_b5iow8.png')] bg-cover bg-bottom py-20">
    <div class="container h-72 md:h-96 flex flex-col items-start justify-center">
      <h2 class="text-4xl md:text-5xl font-medium">СтройМастер — мастерство, создающее комфорт!</h2>
      <Button @click="handleAbout" class="rounded-lg bg-ui-accent w-56 mt-24 px-8 py-5 text-white">Подробнее</Button>
    </div>
  </section>
  <UiSection>
    <h2 class="text-center text-4xl font-medium">Наши преимущества</h2>
    <div class="mt-9 gap-9 justify-center flex-wrap hidden md:flex">
      <div class=" rounded-lg bg-white max-w-72">
        <NuxtImg provider="cloudinary" src="advantage1_rk7fh3" loading="lazy" width="300px" height="235px" placeholder
          class="w-full rounded-t-lg" alt="text" />
        <p class="text-center p-5 font-medium">
          Наша команда состоит из опытных специалистов, которые работают в строительстве более 10
          лет. Мы гарантируем
          высокое качество выполнения работ.</p>
      </div>
      <div class=" rounded-lg bg-white max-w-72">
        <NuxtImg provider="cloudinary" src="advantage2_onhpff" loading="lazy" placeholder class="w-full rounded-t-lg"
          alt="text" />
        <p class="text-center p-5 font-medium">
          Мы используем передовые технологии и материалы, чтобы сократить сроки строительства и ремонта, а также
          повысить их долговечность..</p>
      </div>
      <div class=" rounded-lg bg-white max-w-72">
        <NuxtImg provider="cloudinary" src="advantage3_ssvbdy" loading="lazy" placeholder class="w-full rounded-t-lg"
          alt="text" />
        <p class="text-center p-5 font-medium">
          Каждый проект для нас уникален. Мы учитываем пожелания клиентов, предлагаем варианты решений и создаем
          комфортное пространство, которое в точности соответствует вашим ожиданиям.</p>
      </div>
      <div class=" rounded-lg bg-white max-w-72">
        <NuxtImg provider="cloudinary" src="advantage4_c50xto" loading="lazy" placeholder class="w-full rounded-t-lg"
          alt="text" />
        <p class="text-center p-5 font-medium">
          Мы предоставляем гарантию на все выполненные работы, что подтверждает нашу уверенность в их качестве. Ваше
          доверие для нас — главный приоритет.</p>
      </div>
    </div>
    <Carousel class="pt-5 w-full block md:hidden" :opts="{
      align: 'center',
    }">
      <CarouselContent class="mx-[auto]">
        <CarouselItem>
          <div class=" rounded-lg bg-white ">
            <NuxtImg provider="cloudinary" src="advantage1_rk7fh3" loading="lazy" width="300px" height="235px"
              placeholder class="w-full rounded-t-lg" alt="text" />
            <p class="text-center p-5 font-medium">
              Наша команда состоит из опытных специалистов, которые работают в строительстве более 10
              лет. Мы гарантируем
              высокое качество выполнения работ.</p>
          </div>
        </CarouselItem>
        <CarouselItem>
          <div class=" rounded-lg bg-white ">
            <NuxtImg provider="cloudinary" src="advantage2_onhpff" loading="lazy" placeholder
              class="w-full rounded-t-lg" alt="text" />
            <p class="text-center p-5 font-medium">
              Мы используем передовые технологии и материалы, чтобы сократить сроки строительства и ремонта, а также
              повысить их долговечность..</p>
          </div>
        </CarouselItem>
        <CarouselItem>
          <div class=" rounded-lg bg-white">
            <NuxtImg provider="cloudinary" src="advantage3_ssvbdy" loading="lazy" placeholder
              class="w-full rounded-t-lg" alt="text" />
            <p class="text-center p-5 font-medium">
              Каждый проект для нас уникален. Мы учитываем пожелания клиентов, предлагаем варианты решений и создаем
              комфортное пространство, которое в точности соответствует вашим ожиданиям.</p>
          </div>
        </CarouselItem>
        <CarouselItem>
          <div class=" rounded-lg bg-white">
            <NuxtImg provider="cloudinary" src="advantage4_c50xto" loading="lazy" placeholder
              class="w-full rounded-t-lg" alt="text" />
            <p class="text-center p-5 font-medium">
              Мы предоставляем гарантию на все выполненные работы, что подтверждает нашу уверенность в их качестве. Ваше
              доверие для нас — главный приоритет.</p>
          </div>
        </CarouselItem>
      </CarouselContent>
    </Carousel>
  </UiSection>
  <UiSection>
    <h2 class="text-center text-4xl font-medium mb-9">Услуги</h2>
    <div class="flex flex-wrap justify-center gap-7">
      <div class="hidden sm:flex">
        <NuxtImg provider="cloudinary" src="service1_vkm5cb" placeholder loading="lazy" width="296px" height="449px" />
        <div class="flex flex-col justify-between p-8 bg-white">
          <h3 class="font-bold uppercase text-ui-accent">Строительство домов</h3>
          <p class="font-medium max-w-60">
            Мы предлагаем полный цикл строительства домов "под ключ", включая проектирование, возведение стен,
            устройство кровли и внутреннюю отделку. Используем современные технологии и качественные материалы, чтобы
            каждый дом стал надежной крепостью для вашей семьи.
          </p>
          <Button @click="handleServicesModal('Строительство домов')" class="bg-ui-accent">Заказать</Button>
        </div>
      </div>
      <div class="hidden sm:flex xl:flex-row-reverse">
        <NuxtImg provider="cloudinary" src="service2_ubeibc" placeholder loading="lazy" width="296px" height="449px" />
        <div class="flex flex-col justify-between p-8 bg-white">
          <h3 class="font-bold uppercase text-ui-accent">ремонт и отделка помещений</h3>
          <p class="font-medium max-w-60">
            Наша команда выполняет как косметический, так и капитальный ремонт квартир, офисов и коммерческих помещений.
            Мы помогаем воплотить ваши дизайнерские идеи, создавая комфортные и стильные интерьеры.
          </p>
          <Button @click="handleServicesModal('Ремонт и отделка помещений')" class="bg-ui-accent">Заказать</Button>
        </div>
      </div>
      <div class="hidden sm:flex">
        <NuxtImg provider="cloudinary" src="service3_oxkmqs" placeholder loading="lazy" width="296px" height="449px" />
        <div class="flex flex-col justify-between p-8 bg-white">
          <h3 class="font-bold uppercase text-ui-accent">Фасадные работы</h3>
          <p class="font-medium max-w-60">
            Утепление, облицовка и реставрация фасадов — наши специализации. Мы используем современные материалы и
            технологии, чтобы ваш дом выглядел красиво и сохранял тепло долгие годы.
          </p>
          <Button @click="handleServicesModal('Фасадные работы')" class="bg-ui-accent">Заказать</Button>
        </div>
      </div>
      <div class="hidden sm:flex xl:flex-row-reverse">
        <NuxtImg provider="cloudinary" src="service4_zycg11" placeholder loading="lazy" width="296px" height="449px" />
        <div class="flex flex-col justify-between p-8 bg-white">
          <h3 class="font-bold uppercase text-ui-accent">ландшафтный дизайн</h3>
          <p class="font-medium max-w-60">
            Мы создаем гармоничные и функциональные ландшафты, включая благоустройство участков, установку систем
            полива, строительство дорожек и площадок. Ваш участок станет местом для отдыха и вдохновения.
          </p>
          <Button @click="handleServicesModal('Ландшафтный дизайн')" class="bg-ui-accent">Заказать</Button>
        </div>
      </div>
      <div class="sm:hidden">
        <div>
          <NuxtImg provider="cloudinary" src="service1_vkm5cb" class="mx-[auto]" width="300px" height="235px" />
          <h3 class="font-bold uppercase text-ui-accent p-3">Строительство домов</h3>
          <p class="font-medium px-3">
            Мы предлагаем полный цикл строительства домов "под ключ", включая проектирование, возведение стен,
            устройство кровли и внутреннюю отделку. Используем современные технологии и качественные материалы, чтобы
            каждый дом стал надежной крепостью для вашей семьи.
          </p>
        </div>
      </div>
    </div>
    <div class="flex justify-center mt-7">
      <Button class="bg-ui-accent px-9 py-5" @click="handleServices">Дополнительно</Button>
    </div>
  </UiSection>
  <UiSection>
    <h2 class="text-center text-4xl font-medium mb-9">Готовые объекты</h2>
    <Carousel class="relative sm:container" :opts="{
      align: 'center',
    }">
      <CarouselContent class="flex ">
        <CarouselItem class="flex justify-center">
          <NuxtImg provider="cloudinary" src="object1_hweeme" class="w-full max-w-[80%]" loading="lazy" placeholder />
        </CarouselItem>
        <CarouselItem class="flex justify-center items-center">
          <NuxtImg provider="cloudinary" src="object2_h8kbon" class="w-full max-w-[80%]" loading="lazy" placeholder />
        </CarouselItem>
        <CarouselItem class="flex justify-center items-center">
          <NuxtImg provider="cloudinary" src="object3_aopvtn" class="w-full max-w-[80%]" loading="lazy" placeholder />
        </CarouselItem>
      </CarouselContent>
    </Carousel>
  </UiSection>
</template>