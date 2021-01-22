import printMe from './print'

import {cube} from './math'

// 使用 import() 方法导入的将被拆成独立的chunk，
import('./getComponent').then(({ default: getComponent }) =>
    getComponent().then((component) => {
        document.body.appendChild(component)
        console.log('appendComponent')
    })
)

// HMR 例子
function component() {
    const element = document.createElement('div')
    const btn = document.createElement('button')

    element.innerHTML = _.join(['Hello', 'webpack'+cube(5)], ' ')

    btn.innerHTML = 'Click me and check the console!'
    btn.onclick = printMe // onclick event is bind to the original printMe function

    element.appendChild(btn)

    return element
}

let element = component() // Store the element to re-render on print.js changes
document.body.appendChild(element)

// 把需要HMR的文件 关联起来，并手动更新，否则依旧是全局的更新
if (module.hot) {
    module.hot.accept('./getComponent.js', function () {
        import('./getComponent').then(({ default: getComponent }) =>
            getComponent().then((component) => {
                document.body.appendChild(component)
                console.log('appendComponent')
            })
        )
    }),
        module.hot.accept('./print.js', function () {
            console.log('Accepting the updated printMe module!')
            // printMe()

            document.body.removeChild(element)
            element = component() // Re-render the "component" to update the click handler
            document.body.appendChild(element)
        })
}
