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

    const timer = setInterval(() => {
      state.count++

      if (state.count === 10) {
        clearInterval(timer)
      }
    }, 1000)


    return {
      state
    }
  }
}
