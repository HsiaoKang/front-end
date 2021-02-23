import React from 'react'
import ReactDOM from './react-dom'
import './index.css'
// import App from './App'
import reportWebVitals from './reportWebVitals'

// 继承类
function Component(props){
  this.props = props
}
Component.prototype.type ='classComponent'
// 类组件
class AClassComponent extends Component{
  render(){
    return (
    <div>这是class 组件{this.props.name}</div>
    )
  }
}
// 函数组件
function Acomponent({name}){
  return(
  <p>函数组件{name}</p> 
  )
}
const jsx = (
  <div className="border">dom1
    <div>kkf</div>
    <Acomponent name="外部传入的name"/>
    <AClassComponent name="xkkk"/>
  </div>
)

ReactDOM.render(jsx, document.getElementById('root'))

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
