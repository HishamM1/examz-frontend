// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  devtools: { enabled: false },
  modules: ['@nuxtjs/tailwindcss', '@pinia/nuxt', '@tailvue/nuxt', '@vueuse/nuxt' ],
  imports: {
    dirs: ['stores']
  },
  runtimeConfig: {
    public: {
      PUSHER_KEY: process.env.PUSHER_KEY,
    }
  }
})
