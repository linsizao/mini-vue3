// 响应函数

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

const dep = new Dep(10)


// test
let b

effectWatch(() => {
  b = dep.value + 10
  console.log('b', b)
})

dep.value = 20 // change value
