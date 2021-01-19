import('./getComponent').then(({default:getComponent}) => getComponent().then((component) => {
    document.body.appendChild(component)
}))


