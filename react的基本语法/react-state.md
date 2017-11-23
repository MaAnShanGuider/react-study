### react中关于state的知识点

**代码示例：**
```
import React,{Component} from 'react'
import ReactDOM from 'react-dom'

class Child extends Component{
	constructor(){
		//------super()一定要写！！！不然会报错。
			super();
		this.state={

			name:'张学友'
		};
	}
	render(){
		return (
			<div>{this.state.name}</div>
			)
	}
	
}

ReactDOM.render(<Child></Child>,document.getElementById('box'));
```

注意点：
1. 在`constructor`里一定要写`super()`,否则会报错。
2. `state`是写在constructor里面的。

### 下面是操作state

代码示例:

```
	import React,{Component} from 'react'
	import ReactDOM from 'react-dom'

	class Child extends Component{
		constructor(){
			//------super()一定要写！！！不然会报错。
				super();
			this.state={

				name:'张学友',
				num:1
			};
		}
		render(){
			return (
				
					/*
				<div onClick={this.change}>{this.state.name}</div>
				这个this是指向Child这个组件，但是change()里面的this则不是。
				*/
				
				<div onClick={this.change.bind(this)}>{this.state.name}---{this.state.num}</div>
				)
		}
	
			change(){
			console.log(this);
			//像下面这样直接改动state值，是和props的改动一样，同样不会触发重新渲染。
			// this.state.name='刘德华';
			
			//通过this.setState()可以改变state的属性值并且重新渲染依赖于state的视图
			// this.setState({
			// 	name:'刘德华'
			// })
			

			//-多个this.setState()对state的同一个属性操作，会只会执行最后一步。
			this.setState({num:this.state.num+1});
			this.setState({num:this.state.num+'aaa'});
			this.setState({num:this.state.num+'bbb'});
			this.setState({num:this.state.num+2});

		}

	}

	ReactDOM.render(<Child></Child>,document.getElementById('box'));
```

**结论:**
1. react通过this.setState()来改变组件的state
2. setState()的参数可以是对象，第二个参数也可以是函数。

###当setState的参数为一个函数时

```
	import React,{Component} from 'react'
	import ReactDOM from 'react-dom'

	class Big extends Component{
		constructor(){
			super();
			this.state = {
				name:'刘德华'
			};
		}
		render(){
			return (
				<div onClick = {this.change.bind(this)}>
					<div>{this.state.name}</div>
					<Small name='wocaonima'></Small>
	 				<div>{this.props.xixi}</div>
				</div>
				)
		}
		change(){
		/*	
		this.setState((prevState,props)=>{
				console.log(prevState,props);
				//--props是来自父组件的，并且自组件是不能更改的。
				console.log(this.props.xixi);
				return {
					name:'莱安纳多'
				}
			})
		*/

			this.setState((prevState,props)=>{name:'汤姆克鲁斯'})
		}
	}

	class Small extends Component{
		constructor(){
			super();
		}
		render(){
			return (
				<div>{this.props.name}</div>
				)
		}
	}

	ReactDOM.render(<Big xixi='天才'></Big>,document.getElementById('box'));
	
```

关于props，react与vue不同的地方在于，在react中，只要写个`this.props.属性名`，然后在父组件中给这个属性值赋值就可以了。子组件不用自己再定义一个props对象集合。因为本来就被创建了。



点击变色:

```
	import React,{Component} from 'react'
	import ReactDOM from 'react-dom'

	class Big extends Component{
		constructor(){
			super();
			this.state = {
				name:'刘德华',
				bg:{background:'red'}
			};
		}
		render(){
			return (
				<div onClick = {this.change.bind(this)}>
					<div style={this.state.bg}>{this.state.name}</div>
					<Small name='wocaonima'></Small>
	 				<div>{this.props.xixi}</div>
				</div>
				)
		}
		change(){
			this.setState((prevState,props)=>{
				if(prevState.bg.background == 'red'){
					return {
						bg:{background:'green'}
					}
				}
				else{
					return {
						bg:{background:'red'}
					}
				}
			
			})
		}
	}

	class Small extends Component{
		constructor(){
			super();
		}
		render(){
			return (
				<div>{this.props.name}</div>
				)
		}
	}

	ReactDOM.render(<Big xixi='天才'></Big>,document.getElementById('box'));

```


todoList:

```
	
	import React ,{Component} from "react";
	import ReactDOM from "react-dom";

	import "./css/index.css";

	class Big extends Component{
		constructor(){
			super();
			this.state = {
				current:null,
				list:['张学友','刘德华','梁朝伟','黎明']
			};
		}
		render(){
			return (
				<div>
				<div><button onClick={this.tellMe.bind(this)}>告诉我</button></div>
					<input type="text" ref='addList'/><button onClick={this.addList.bind(this)}>add</button>
					{
						this.state.list.map((ele,index)=>
							<div key={index} className={this.state.current==index?'xixi':''} onClick={this.colorChange.bind(this,index)} >{ele}<button key={index} onClick={this.Delete.bind(this,index)}>删除</button></div>
							
						)
					}
				</div>
				)
		}
		addList(){
			console.log(this.state.list);
			this.setState({list:[...this.state.list,this.refs.addList.value]})
		}
		Delete(index){
			console.log('被删除的是：'+index);
			this.setState((prevState,props)=>{
				prevState.list.splice(index,1);
				//-老哥，切记这里的preState是整个上一个state对象，你还得访问他的属性。
				return {
					list:[...prevState.list]
					// list:['嘻嘻','哈哈','嘿嘿']
				}
			})
		}
		tellMe(){
			//----------打印组件的state
			console.log(this.state.list);
		}
		colorChange(index){
			console.log('颜色改变');
			this.setState((prevState,props)=>{
				return {
					current:index
				}
			});
		}
		enterChange(){

		}
	}

	ReactDOM.render(<Big/>,document.getElementById("box"));



```

要注意的点有那么几个:
1. react的里面没有for(至少老师没写),可以用数组的map方法代替。
2. 在jsx里面的写数组方法是:array.map(()=());后面原本的大括号用小括号代替。
3. setState里的prevState是上一个state对象。