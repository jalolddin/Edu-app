export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: "edu-nuxt",
    htmlAttrs: {
      lang: "en",
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" },
      { name: "format-detection", content: "telephone=no" },
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
    script: [
      {
        hid: "stripe",
        src: "https://mozilla.github.io/pdf.js/build/pdf.js",
        defer: true,
      },
      {
        hid: "stripe",
        src: "https://cdn.jsdelivr.net/npm/cleave.js@1",
        defer: true,
      },
      {
        hid: "stripe",
        src: "https://cdn.jsdelivr.net/npm/vue-cleave-component@2",
        defer: true,
      },
    ],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    "~/assets/scss/app.scss",
    "~/assets/fonts/inter/stylesheet.css",
    "~/assets/fonts/OpenSans/stylesheet.css",
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    // '~/plugins/vue-google-oauth2.js',
    "~/plugins/axios",
    "~/plugins/perfect-scrollbar",
    { src: "~/plugins/router", mode: "client" },
    { src: "~/plugins/vue-awesome-countdown", mode: "client" },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/tailwindcss
    // '@nuxtjs/tailwindcss',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: ["@nuxtjs/axios", "@nuxtjs/auth-next", "vue-toastification/nuxt"],

  toast: {
    // Vue Toastification plugin options
    timeout: 2000,
    closeOnClick: false
  },

  auth: {
    strategies: {
      google: {
        clientId:
          "925671647243-8mpe56so3b3iou81vetlcuai4cpg5nkf.apps.googleusercontent.com",
        codeChallengeMethod: "",
        responseType: "code",
        endpoints: {
          // token: 'http://localhost:8000/user/google/', // somm backend url to resolve your auth with google and give you the token back
          // userInfo: 'http://localhost:8000/auth/user/' // the endpoint to get the user info after you recived the token
        },
      },
    },
  },
  axios: {
    // baseURL: 'http://abuhanifa.loc/api/v1/',
    baseURL: "http://api.ittech.uz/api/v1/",
    proxy: true,
    common: {
      "Content-Type": "application/x-www-form-urlencoded",
      Accept: "application/json, text/plain, */*",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
    },
  },

  proxy: {
    "/api/": {
      target: "http://api.ittech.uz/api/v1/",
      pathRewrite: { "^/api/": "" },
    },
    // '/api/': 'http://abuhanifa.loc/api',
  },

  // publicRuntimeConfig: {
  //   axios: {
  //     browserBaseURL: process.env.BROWSER_BASE_URL
  //   }
  // },

  // privateRuntimeConfig: {
  //   axios: {
  //     baseURL: process.env.BASE_URL
  //   }
  // },

  router: {
    base: "/",
    middleware: "index",
  },

  // publicRuntimeConfig: {
  //   axios: {
  //     browserBaseURL: process.env.BROWSER_BASE_URL
  //   }
  // },
  // privateRuntimeConfig: {
  //   axios: {
  //     baseURL: process.env.BASE_URL
  //   }
  // },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    postcss: null,
    transpile: [],
  },
};
