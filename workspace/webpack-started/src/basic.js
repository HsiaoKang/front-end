import './style.css'

import someText from './someText.txt'
import msg from './msg.xml'
import someData from './someData.csv'
import yaml from './data.yaml'
import toml from './data.toml'
import json5 from './data.json5'

import printMe from './print'
import {cube} from './math'
function component() {
    const element = document.createElement('div')
    console.log(msg);
    console.log(someData);
    console.log(yaml);
    console.log(toml);
    console.log(json5);
        
    // _:lodash
    element.innerHTML = join(['Hello', 'webpack', someText,cube(5)], ' ')

    element.classList.add('hello')

    element.onclick = printMe
    return element
}

document.body.appendChild(component())
