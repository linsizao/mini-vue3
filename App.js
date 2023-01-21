import { reactive } from './core/reactivity/reactive.js'

export default {
  render (ctx) {
    const div = document.createElement('div')
    div.innerHTML = `count: ${ctx.state.count}`

    return div
  },

  setup () {
    const state = reactive({
      count: 0
    })

    setInterval(() => {
      state.count++
    }, 1000)

    return {
      state
    }
  }
}
