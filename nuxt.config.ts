// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // Disable SSR for static generation
  ssr: false,
  
  // Configure for static hosting
  nitro: {
    preset: 'static'
  },
  
  // App configuration
  app: {
    baseURL: '/',
    buildAssetsDir: '/_nuxt/'
  },
  
  // Build configuration
  build: {
    transpile: []
  }
})
