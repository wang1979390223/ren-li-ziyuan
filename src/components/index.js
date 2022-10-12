import PageTools from './PageTools/index.vue'
const components = [PageTools]
import * as filters from '@/filters'

// 引入·要注册的组件
// 把组件用数组收集起来
// Vue.use(pligin)
// pligin对象，install 属性==>第一个参数Vue
// 函数 被install方法==>会被执行 函数 第一个函数Vue
// Vue.use({})
export default {
  install: function(Vue) {
    components.forEach(ele => {
      // ele.name组件名称，
      Vue.component(ele.name, ele)
    })
    Object.keys(filters).forEach(key => {
    // Vue.filters('过滤器名称',过滤器的方法)
      Vue.filter(key, filters[key])
    })
  }

}

