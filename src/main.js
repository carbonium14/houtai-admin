import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import installElementPlus from './plugins/element'
import '@/styles/index.scss'
import installIcons from '@/icons/index.js'
import './permission.js'
import i18n from './i18n'
import installFilter from '@/filters/index'
import installDirectives from '@/directives/index'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
const app = createApp(App)
installElementPlus(app)
installIcons(app)
installFilter(app)
installDirectives(app)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
app.use(store).use(router).use(i18n).mount('#app')
