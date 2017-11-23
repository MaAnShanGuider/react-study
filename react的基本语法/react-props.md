### react中关于props的知识点

子组件在写好props的位置，然后父组件在引用子组件的模板时，给他们的props属性设置属性值。

**一个最基本的代码示例:**

```
	import React,{Component} from 'react'
	import ReactDOM from 'react-dom'

	//------父组件
	class Wocao extends Component{

		render(){
			let obj = {
				name:'张学友',
				age:44
			};
			return (
				<div>
				{
					//<div>{obj.name}</div>
				}
					
					<WocaoChild name={obj.name} age={obj.age}></WocaoChild>
				</div>
				)
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
					<div>{this.props.name}</div>
					<div>{this.props.age}</div>
					
				</div>
				)
		}
	}

	//-----导出组件
	ReactDOM.render(<Wocao></Wocao>,document.getElementById('box'));
```

**更深层次的探究:**

```
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
```

结论:
1. 通过三目运算返回的结果也得包裹一层根标签
2. 渲染之后，再改变父组件的props值并不会重新渲染。