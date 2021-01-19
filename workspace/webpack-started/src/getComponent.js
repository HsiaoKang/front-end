export default function getComponent() {
    // import() 可以使用动态表达式来导入
    return import(`${'lo'}dash`)
        .then(({ default: _ }) => {
            const element = document.createElement('div')
            element.innerHTML = _.join(['Hello', 'dynamic', 'import'], ' ')
            return element
        })
        .catch((error) => 'An error occurred while loading the component')
}