import React,{Component} from 'react'
import ReactDOM from 'react-dom'

//------父组件
class Wocao extends Component{

	render(){
		let obj = {
			name:'张学友',
			age:44,
			boolean:true,
		};
		return (
			<div>
			{
				//这个obj就是我们的render()里的obj对象。
				//通过props传递的值，只会渲染一次。改变props属性并不会再次渲染。
				//
				<div onClick={()=>{console.log('aaa');obj.name = '周润发';console.log(obj.name)}}>{obj.name}</div>
			}
				
				<WocaoChild name={obj.name} age={obj.age} boolean={obj.boolean}></WocaoChild>
			</div>
			)
	}
	change(){
		console.log(this.refs);
	}
}

//------子组件
class WocaoChild extends Component{
	render(){
		let obj2 = {
			name:'刘德华',
			age:55
		} 
		return (
			<div>
			{	//通过三目得出的结果必须也得被一个根标签包裹，不然会出错。
				this.props.boolean?
				<div>
					<div>{this.props.name}</div>
					<div>{this.props.age}</div>
				</div>
				:null
			}
				
				
			</div>
			)
	}
}

//-----导出组件
ReactDOM.render(<Wocao></Wocao>,document.getElementById('box'));