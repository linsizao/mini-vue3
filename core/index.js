import { effectWatch } from './reactivity/dep.js'
import { mountElement, diff } from './render/index.js'

export function createdApp (rootComponent) {
  return {
    mount (rootContainer) {
      const ctx = rootComponent.setup()
      let isMounted = false // 是否挂载
      let pervSubTree // 先前的结构树

      effectWatch(() => {

        if (!isMounted) {
          // init
          isMounted = true
          rootContainer.innerHTML = ''
          const subTree = rootComponent.render(ctx)
          mountElement(subTree, rootContainer)
          pervSubTree = subTree
        } else {
          // update
          const subTree = rootComponent.render(ctx)
          console.log('pervSubTree', pervSubTree)
          diff(pervSubTree, subTree) // diff 算法
          pervSubTree = subTree
        }
      })
    }
  }
}
