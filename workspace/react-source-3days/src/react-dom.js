// import {} from 'react'
function render(vnode, container) {
    console.log(vnode, container)
    const node = createNode(vnode)

    container.appendChild(node)
}

// 创建原生DOM
function createNode(vNode) {
    if (vNode === undefined) {
        return updateTextComponet(vNode)
    }
    const { type } = vNode
    let node = null
    // 存在type
    if (typeof type === 'string') {
        node = updateHostComponet(vNode)
    } else if (typeof type === 'function') {
        if (type.prototype.type === 'classComponent') {
            node = updateClassComponent(vNode)
        } else {
            node = updateFunctionComponent(vNode)
        }
    } else {
        node = updateTextComponet(vNode)
    }
    return node
}

// class 组件
function updateClassComponent(vnode) {
    const { type, props } = vnode
    const component = new type(props)
    console.log(component);
    
    const _vnode = component.render()
    console.log(_vnode);
    
    return createNode(_vnode)
}
// 函数组件
function updateFunctionComponent(vnode) {
    const { type, props } = vnode
    const _vnode = type(props)
    return createNode(_vnode)
}
// 原生标签
function updateHostComponet(vnode) {
    const {
        type,
        props: { children, key, ...restProps },
    } = vnode
    const node = document.createElement(type)

    // 添加属性
    if (restProps) {
        Object.keys(restProps).forEach((K) => {
            console.log(K)

            node[K] = restProps[K]
        })
    }
    // 处理子级
    if (children instanceof Array) {
        for (const childVNode of children) {
            render(childVNode, node)
        }
    } else if (children) {
        render(children, node)
    }
    return node
}

// 原生文本
function updateTextComponet(vnode) {
    return document.createTextNode(vnode)
}

export default { render }
