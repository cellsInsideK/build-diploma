<script setup lang="ts">
  import { useHead } from '#imports';

  useHead({ title: 'О Betonika' })
</script>

<template>
  <section
    class="bg-[url('https://res.cloudinary.com/detxwiyvk/image/upload/v1738599644/about_un5gkb.jpg')] bg-cover bg-bottom bg-black bg-blend-color bg-opacity-50">
    <div class=" container">
      <h2 class=" text-white text-4xl sm:text-6xl font-medium my-24 sm:my-48">Betonika —<br>мастерство в красоте!
      </h2>
    </div>
  </section>
  <UiSection>
    <h2 class="text-center text-4xl font-medium">История</h2>
    <div class="flex flex-col md:flex-row gap-4 md:gap-10 items-center mt-5">
      <div class=" shrink-0">
        <div class="block md:hidden">
          <NuxtImg provider="cloudinary" src="history1_ekukky" class=" w-full max-w-fit" width="300px" height="235px"
            placeholder loading="lazy" />
        </div>
        <div class="hidden md:grid grid-cols-2 gap-3 w-full grid-flow-row">
          <NuxtImg provider="cloudinary" src="history1_ekukky" class=" w-full max-w-fit" width="300px" height="235px"
            placeholder loading="lazy" />
          <NuxtImg provider="cloudinary" src="history2_ofilpo" class=" w-full max-w-fit" width="300px" height="235px"
            placeholder loading="lazy" />
          <NuxtImg provider="cloudinary" src="history3_ipoc3u" class=" w-full max-w-fit" width="300px" height="235px"
            placeholder loading="lazy" />
          <NuxtImg provider="cloudinary" src="history4_ecd99b" class=" w-full max-w-fit" width="300px" height="235px"
            placeholder loading="lazy" />
        </div>
      </div>
      <p class="font-medium ">
        Компания "Betonika" была основана в 2001 году с миссией сделать строительство и ремонт доступными,
        качественными и надежными для каждого клиента. Начав с небольшой команды профессионалов, мы стремились создать
        компанию, которая не только выполняет работы на высоком уровне, но и заботится о своих клиентах.
        За годы работы мы накопили огромный опыт, реализовав сотни проектов разной сложности — от строительства частных
        домов до крупных коммерческих объектов. Мы гордимся тем, что наши клиенты становятся нашими партнерами на долгие
        годы, доверяя нам свои мечты и планы.
        Сегодня "Betonika" — это команда высококвалифицированных специалистов, использующих современные технологии и
        материалы. Мы продолжаем развиваться, чтобы оставаться надежным партнером в строительстве и ремонте.
      </p>
    </div>
  </UiSection>
  <UiSection>
    <h2 class="text-center text-4xl font-medium">Миссия</h2>
    <div class="flex flex-col md:flex-row-reverse gap-4 md:gap-10 items-center mt-5">
      <div class=" shrink-0">
        <div class="block md:hidden">
          <NuxtImg provider="cloudinary" src="mission1_zbca91" class="w-screen max-h-72 object-cover" placeholder
            loading="lazy" />
        </div>
        <div class="hidden md:grid grid-cols-2 gap-3 w-full grid-flow-row">
          <NuxtImg provider="cloudinary" src="mission1_zbca91" class=" w-full max-w-fit " width="300px" height="235px"
            placeholder loading="lazy" />
          <NuxtImg provider="cloudinary" src="mission2_w0sxku" class=" w-full max-w-fit" width="300px" height="235px"
            placeholder loading="lazy" />
          <NuxtImg provider="cloudinary" src="mission3_nk3ej4" class=" w-full max-w-fit" width="300px" height="235px"
            placeholder loading="lazy" />
          <NuxtImg provider="cloudinary" src="mission4_imunhb" class=" w-full max-w-fit" width="300px" height="235px"
            placeholder loading="lazy" />
        </div>
      </div>
      <p class="font-medium ">
        Миссия компании "Betonika" — создавать комфортные и долговечные пространства, которые вдохновляют и радуют
        наших клиентов. Мы стремимся к тому, чтобы каждый наш проект стал примером качества, надежности и внимательного
        отношения к деталям.
        Мы верим, что строительство и ремонт — это не просто технические процессы, а возможность воплотить мечты в
        жизнь. Поэтому мы уделяем особое внимание индивидуальному подходу, учитываем пожелания клиентов и предлагаем
        решения, которые соответствуют их потребностям и бюджету.
        Наша цель — не просто выполнять работы, а создавать ценность для каждого клиента, делая их жизнь лучше и
        комфортнее.
      </p>
    </div>
  </UiSection>
</template>