import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

import '@mdi/font/css/materialdesignicons.css'
import colors from 'vuetify/lib/util/colors'
import 'vuetify/styles'

const light_theme = {
  dark: false,
  colors: {
    background: '#FFFFFF',
    primary: '#01321f',
    secondary: '#212121',
    accent: colors.amber.accent4,
    error: colors.red.accent4,
    info: colors.yellow.accent4,
    success: colors.green.darken4,
    warning: colors.orange.accent4,
  }
}

export default defineNuxtPlugin(nuxtApp => {
  const vuetify = createVuetify({
    components,
    directives,
    theme: {
      defaultTheme: 'light_theme',
      themes: {
        light_theme,
      }
    },
    defaultAssets: false,
    icons: {
      defaultSet: 'mdi'
    },
    ssr: true
  })

  nuxtApp.vueApp.use(vuetify)
})