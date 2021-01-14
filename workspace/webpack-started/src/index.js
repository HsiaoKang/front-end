import _ from 'lodash'
import './style.css'
import someText from './someText.txt'
import msg from './msg.xml'
import someData from './someData.csv'
import yaml from './data.yaml'
import toml from './data.toml'
import json5 from './data.json5'

function component() {
    const element = document.createElement('div')
    console.log(msg);
    console.log(someData);
    console.log(yaml);
    console.log(toml);
    console.log(json5);
        
    // _:lodash
    element.innerHTML = _.join(['Hello', 'webpack', someText], ' ')

    element.classList.add('hello')

    return element
}

document.body.appendChild(component())
