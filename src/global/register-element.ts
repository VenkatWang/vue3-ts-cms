import { App } from 'vue'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

export default function registerElement(app: App) {
  app.use(ElementPlus)
}
