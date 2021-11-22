import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import "bootstrap/dist/css/bootstrap.css"
import DateFormat from './Pipeline/DateFormat';

var app = createApp(App)

app.config.globalProperties.$DateFormat = DateFormat;

app.config.globalProperties.$filters = {
    DateFormat(value) {
      return DateFormat(value)
    }
}

app.use(ElementPlus).use(router).mount('#app')
