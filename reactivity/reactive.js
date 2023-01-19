// import { Dep, effectWatch } from "./dep"

let currentEffect

// 依赖
class Dep {
  // 收集依赖
  constructor(val) {
    this.effects = new Set()
    this._value = val
  }

  get value () {
    this.addDep()
    return this._value
  }

  set value (newVal) {
    this._value = newVal
    this.notify()
  }

  // 添加依赖
  addDep () {
    if (currentEffect) {
      this.effects.add(currentEffect)
    }
  }

  // 触发依赖
  notify () {
    this.effects.forEach(effect => {
      effect()
    })
  }
}

// 收集依赖
function effectWatch (effect) {
  currentEffect = effect
  effect()
  currentEffect = null
}


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
function reactive (raw) {
  return new Proxy(raw, {
    get (target, key) {
      const dep = getDep(target, key)
      dep.addDep()

      return Reflect.get(target, key)
    },

    set (target, key, value) {
      const dep = getDep(target, key)
      const result = Reflect.set(target, key, value)
      dep.notify()

      return result
    }
  })
}

const user = reactive({
  age: 10
})

let plus
effectWatch(() => {
  plus = user.age + 1
  console.log(plus)
})
user.age = 20 // change value

