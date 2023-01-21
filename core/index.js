import { effectWatch } from './reactivity/dep.js'
import { mountElement } from './render/index.js'

export function createdApp (rootComponent) {
  return {
    mount (rootContainer) {
      const ctx = rootComponent.setup()

      effectWatch(() => {
        rootContainer.innerHTML = ''
        const render = rootComponent.render(ctx)
        mountElement(render, rootContainer)
      })
    }
  }
}
