// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  css: ['~/assets/css/main.scss'],
   modules: ['@nuxt/ui', '@vueuse/nuxt' ],
   ui: {
    colorMode: false,
  },    
   vue: {
    compilerOptions: {
      isCustomElement: (tag: any) => tag === 'iconify-icon',
    },
  },

})
