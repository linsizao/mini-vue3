// 挂载节点（vNode -> dom）
export function mountElement (vnode, container) {
  const { tag, props, children } = vnode

  // tar
  const el = (vnode.el = document.createElement(tag))

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

// TODO: 简单的 diff 算法
export function diff (oldVnode, newVnode) {

  if (oldVnode.tag !== newVnode.tag) {
    // change tag
    oldVnode.el.replaceWith(document.createElement(newVnode.tag))
  } else {
    // change props
    newVnode.el = oldVnode.el
    const { props: oldProps } = oldVnode
    const { props: newProps } = newVnode

    if (newProps && oldProps) {
      // 处理不同 prop
      Object.keys(newProps).forEach(key => {
        const newVal = newProps[key]
        const oldVal = oldProps[key]
        if (newVal !== oldVal) {
          oldVnode.el.setAttribute(key, newVal)
        }
      })
    }

    if (oldProps) {
      // 处理删除 prop
      Object.keys(oldProps).forEach(key => {
        if (!newProps[key]) {
          oldVnode.el.removeAttribute(key)
        }
      })
    }
  }

  // TODO: change children

}
