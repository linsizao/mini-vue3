import { looseEqual } from '../shared/index.js'

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
          newVnode.el.setAttribute(key, newVal)
        }
      })
    }

    if (oldProps) {
      // 处理删除 prop
      Object.keys(oldProps).forEach(key => {
        if (!newProps[key]) {
          newVnode.el.removeAttribute(key)
        }
      })
    }
  }

  // change children(string/array)
  // 1. newChildren: string; oldChildren: string/array
  // 2. newChildren: array; oldChildren: string/array
  const { children: oldChildren } = oldVnode
  const { children: newChildren } = newVnode

  if (!looseEqual(oldChildren, newChildren)) {
    if (typeof newChildren === 'string' && newChildren !== oldChildren) {
      newVnode.el.textContent = newChildren
    }

    if (Array.isArray(newChildren)) {
      if (typeof oldChildren === 'string') {
        newVnode.el.innerText = ''
        mountElement(newVnode, newVnode.el)
      } else if (Array.isArray(oldChildren)) {
        const minLength = Math.min(newChildren.length, oldChildren.length)

        // 最小长度内使用 diff
        for (let i = 0; i < minLength; i++) {
          const oldChildrenVnode = oldChildren[i]
          const newChildrenVnode = newChildren[i]
          diff(oldChildrenVnode, newChildrenVnode)
        }

        if (newChildren.length > minLength) {
          // 创建节点
          for (let i = minLength; i < newChildren.length; i++) {
            const newChildrenVnode = newChildren[i]
            mountElement(newChildrenVnode, newVnode.el)
          }
        } else if (newChildren < minLength) {
          // 移除节点
          for (let i = 0; i < oldChildren.length; i++) {
            const oldChildrenVnode = oldChildren[i]
            oldChildrenVnode.el.parent.removeChild(oldChildrenVnode.el)
          }
        }
      }
    }
  }

}
