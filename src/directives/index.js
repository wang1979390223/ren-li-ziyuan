export const imgerror = {
  // 什么时候去换图片
  // oneerror
  inserted(el, binding, vnode) {
    // el dom
    console.log(el)
    // 当前指令的·相关信息
    console.log(binding)
    // vnode 虚拟节点
    console.log(vnode)
    el.onerror = function() {
      el.src = binding.value
    }
  }
}
