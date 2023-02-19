import { App } from 'vue'
import registerElement from './register-element'

const register = [registerElement]
export function registerGlobal(app: App) {
  register.forEach((ele) => app.use(ele))
}

//# app.use()
//# 函数中可以传函数或者是对象{install(app){}}
