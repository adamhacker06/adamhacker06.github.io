// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: true,
  app: {
    // For user/organization pages (username.github.io), use '/'
    baseURL: '/'
  },
  nitro: {
    prerender: {
      routes: ['/']
    }
  }
})
