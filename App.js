import { reactive } from './core/reactivity/reactive.js'
import { h } from './core/h.js'

export default {
  render (ctx) {
    const html = `count: ${ctx.state.count}`

    return h('div', { id: 'id-' + ctx.state.count }, [
      h('p', null, html),
      h('p', null, html)
    ])
  },

  setup () {
    const state = reactive({
      count: 0
    })

    const timer = setInterval(() => {
      state.count++

      if (state.count === 5) {
        clearInterval(timer)
      }
    }, 1000)

    return {
      state
    }
  }
}
