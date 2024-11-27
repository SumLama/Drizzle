// https://nuxt.com/docs/api/configuration/nuxt-config
import { createResolver } from 'nuxt/kit'
const { resolve } = createResolver(import.meta.url)
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: ['@nuxt/ui'],
  colorMode:{
    preferences:'light'
  },
  runtimeConfig:{
    dbDir: resolve('./server/db'),
  },
  nitro: {
    preset: "cloudflare-pages",
    //enable database
    experimental: {
      database: true
    },
    database: {
      myDatabase: {
        connector: "cloudflare-d1",
        options: {
          bindingName: "D1"
        }
      }
    }
  },
  

})