// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  imports: {
    autoImport: false
  },
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxt/fonts',
    '@nuxt/image',
    '@nuxtjs/color-mode',
    "@nuxtjs/cloudinary",
    'shadcn-nuxt',
    '@pinia/nuxt',
  ],

  pinia: {
    storesDirs: ['./stores/**']
  },

  image: {
    cloudinary: {
      baseURL: 'https://res.cloudinary.com/detxwiyvk/image/upload/'
    }
  },

  fonts: {
    provider: 'google'
  },

  colorMode: {
    classPrefix: ''
  }, 
  
  shadcn: {
    prefix: '',
    componentDir: './components/ui'
  }
})