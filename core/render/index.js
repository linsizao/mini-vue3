export function mountElement (vnode, container) {
  const { tag, props, children } = vnode

  // tar
  const el = document.createElement(tag)

  // props
  if (props) {
    for (const key in props) {
      const prop = props[key]
      el.setAttribute(key, prop)
    }
  }

  // children
  if (children) {
    // string or number
    if (['string', 'number'].includes(typeof children)) {
      const textNode = document.createTextNode(children)
      el.append(textNode)
    } else if (children instanceof Array) {
      // array
      children.forEach(v => {
        mountElement(v, el)
      })
    }
  }


  container.append(el)
}
