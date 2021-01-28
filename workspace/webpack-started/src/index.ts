// import printMe from './print'
import _ from 'lodash'

// HMR 例子
function component() {
    const element = document.createElement('div')
    const btn = document.createElement('button')
    element.innerHTML = _.join(['Hello', 'webpack'], ' ')

    btn.innerHTML = 'ts btn'

    element.appendChild(btn)

    return element
}

let element = component() // Store the element to re-render on print.js changes
document.body.appendChild(element)

// 把需要HMR的文件 关联起来，并手动更新，否则依旧是全局的更新