// test

import { effectWatch } from "./reactivity/dep.js"
import { reactive } from "./reactivity/reactive.js"

const user = reactive({
  age: 10
})

let plus

effectWatch(() => {
  plus = user.age + 1
  console.log('---effectWatch---')
  console.log('user.age: ', user.age)
  console.log('plus: ', plus)
})

user.age = 20 // change value
