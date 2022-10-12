// import PageTools from './PageTools/index.vue'
// const components = [PageTools]
// 引入·要注册的组件
// 把组件用数组收集起来
// Vue.use(pligin)
// pligin对象，install 属性==>第一个参数Vue
// 函数 被install方法==>会被执行 函数 第一个函数Vue
// Vue.use({})
// export default {
//   install: function(Vue) {
//     components.forEach(ele => {
//       // ele.name组件名称，
//       Vue.component(ele.name, ele)
//     })
//   }
// }
// import * as filters from '@/filters'

const fn = require.context('./', true, /\.vue$/)
console.log(fn.keys())// 路径
console.log(fn('./PageTools/index.vue'))

// 一次性导入所有模块
// fn.keys()==>返回所有模块['./PageTools/index.vue]
const components = fn.keys().map(ele => {
  return fn(ele)
})
export default (Vue) => {
  components.forEach(ele => {
    console.log(ele)
    Vue.component(ele.default.name, ele.default)
  })
  // Vue.filter()
  // Object.keys(filters).forEach(key => {
  //   // Vue.filters('过滤器名称',过滤器的方法)
  //   Vue.filter(key, filters[key])
  // })
}

