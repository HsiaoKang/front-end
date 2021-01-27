import  './style.css'
export default function getComponent() {
    // import() 可以使用动态表达式来导入
    return import(/* webpackChunkName: "lodash2"*/ `${'lo'}dash`)
        .then(({ default: _ }) => {
            const element = document.createElement('div')
            element.innerHTML = _.join(['Hello', 'this is dynamic', 'import'], ' ')
            element.classList.add('hello')
            return element
        })
        .catch((error) => 'An error occurred while loading the component')
}