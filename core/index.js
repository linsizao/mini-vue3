import { effectWatch } from './reactivity/dep.js'

export function createdApp (rootComponent) {
  return {
    mount (rootContainer) {
      const ctx = rootComponent.setup()

      effectWatch(() => {
        rootContainer.innerHTML = ''
        const ele = rootComponent.render(ctx)
        rootContainer.append(ele)
      })
    }
  }
}
