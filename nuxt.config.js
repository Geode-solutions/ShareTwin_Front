import colors from "vuetify/lib/util/colors"

export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      API_URL:
        process.env.NODE_ENV === "production"
          ? "api.share-twin.com"
          : "localhost",
      VIEWER_PROTOCOL: process.env.NODE_ENV === "production" ? "wss" : "ws",
      GEODE_PROTOCOL: process.env.NODE_ENV === "production" ? "https" : "http",
      VIEWER_PORT: process.env.NODE_ENV === "production" ? "443" : "1234",
      GEODE_PORT: process.env.NODE_ENV === "production" ? "443" : "5000",
      SITE_URL: process.env.SITE_URL,
      SITE_BRANCH:
        process.env.NODE_ENV === "production" ? process.env.SITE_BRANCH : "",
      PROJECT: "sharetwin",
      NODE_ENV: process.env.NODE_ENV,
      RECAPTCHA_SITE_KEY: "6LdPWi8jAAAAACH7JQZcWOK1Agmqpt4h6C5DCOlw",
    },
  },

  extends: ["@geode/opengeodeweb-front"],

  app: {
    head: {
      titleTemplate: "Share Twin",
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        {
          hid: "description",
          name: "description",
          content: "Platform for urban and geological data visualization",
        },
      ],
      link: [{ rel: "icon", type: "image/ico", href: "/icon_share_twin.ico" }],
    },
  },
  // devtools: process.env.NODE_ENV === 'production' ? false : true,
  ssr: false,
  target: "static",

  // ** Customize the progress-bar color
  loading: { color: "#fff" },

  // ** Global CSS
  css: ["vuetify/lib/styles/main.sass"],

  // ** Nuxt.js modules
  modules: [
    "@vueuse/nuxt",
    [
      "@dargmuesli/nuxt-cookie-control",
      {
        controlButton: true,
        domain: "geode-solutions.com",
        colors: {
          modalOverlay: "#000",
          barBackground: colors.teal.darken1,
          barButtonColor: "#000",
          modalTextColor: "#000",
          modalOverlayOpacity: 0,
          modalButtonColor: "#fff",
          modalUnsavedColor: "#000",
          modalButtonBackground: colors.teal.darken1,
          controlButtonIconColor: colors.teal.darken1,
          checkboxActiveBackground: colors.teal.darken1,
          checkboxInactiveBackground: "#000",
          modalButtonHoverBackground: "#333",
          checkboxDisabledBackground: "#ddd",
          controlButtonIconHoverColor: colors.amber.accent4,
          controlButtonHoverBackground: colors.brown.darken4,
        },
        isModalForced: false,
        closeModalOnClickOutside: true,
        cookies: {
          necessary: [
            {
              description: {
                en: "Functionnal cookies",
              },
              targetCookieIds: ["functionnal_cookies"],
              name: {
                en: "Mandatory",
              },
              links: {
                "https://share-twin.com/terms_of_use": "Terms of Use",
                "https://share-twin.com/personal_data_policy":
                  "Personal Data Policy",
              },
            },
          ],
        },
      },
    ],
    [
      "@pinia/nuxt",
      {
        autoImports: ["storeToRefs", "defineStore"],
      },
    ],
    "@nuxt/devtools",
  ],

  imports: {
    dirs: ["stores", "@geode/opengeodeweb-front/stores"],
  },

  // ** Build configuration
  build: {
    transpile: ["vuetify"],
  },
  vue: {
    compilerOptions: {
      isCustomElement: (tag) => ["md-linedivider"].includes(tag),
    },
  },

  devtools: {
    enabled: process.env.NODE_ENV === "production" ? false : true,
  },

  vite: {
    optimizeDeps: {
      include: [
        "fast-deep-equal",
        "seedrandom",
        "lodash",
        "@geode/opengeodeweb-front",
        "ajv",
        "globalthis",
      ],
    },
  },
})
