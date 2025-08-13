// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // Disable SSR for static generation
  ssr: false,

  // Configure for static hosting
  nitro: {
    preset: "static",
  },

  // App configuration
  app: {
    baseURL: "/",
    buildAssetsDir: "/_nuxt/",
  },

  // Build configuration
  build: {
    transpile: [],
  },

  modules: ["@nuxtjs/tailwindcss", "@nuxtjs/google-fonts"],

  css: ["~/assets/css/main.css"],

  googleFonts: {
    families: {
      Roboto: true,
      "Martian Mono": [100, 800],
    },
    display: "swap",
    download: true,
  },

  // Ensure proper static generation
  experimental: {
    payloadExtraction: false,
  },
});
