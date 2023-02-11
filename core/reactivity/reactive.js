// reactive

import { Dep } from './dep.js'

let targetMap = new Map()

function getDep (target, key) {
  let depsMap = targetMap.get(target)
  if (!depsMap) {
    depsMap = new Map()
    targetMap.set(target, depsMap)
  }

  let dep = depsMap.get(key)
  if (!dep) {
    dep = new Dep()
    depsMap.set(key, dep)
  }

  return dep
}

// proxy 响应
export function reactive (raw) {
  const handler = {
    get (target, key) {
      const dep = getDep(target, key)
      dep.addDep()

      if (typeof target[key] === 'object' && target[key] !== null) {
        return new Proxy(target[key], handler)
      }

      return Reflect.get(target, key)
    },

    set (target, key, value) {
      const dep = getDep(target, key)
      const result = Reflect.set(target, key, value)
      dep.notify()

      return result
    }
  }

  return new Proxy(raw, handler)
}
