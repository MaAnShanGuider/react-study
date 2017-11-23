### react父传子

#### 子传父
```
	import React,{Component} from 'react'
	import ReactDOM from 'react-dom'

	class Child extends Component{
		constructor(){
			super();

		}
		render(){

			return (
				<input type="text" ref='haha' onChange={childMethod}/> //--a段
				)
		}
		childMethod(){   //--b段
				console.log(this.refs);
				this.props.emailText(this.refs.haha.value);
		}
	}


	class Father extends Component{
		constructor(){
			super();
			this.state={
				txt:null
			}
		}
		render(){
			return (
				<div>
					<p>{this.state.txt}</p>
					<Child emailText={this.fatherMethod.bind(this)}></Child>   //-c段
				</div>
				)
		}
		fatherMethod(str){    
			console.log('输入');
			this.setState({
				txt:str
			})
		}
	}

	ReactDOM.render(<Father></Father>,document.getElementById('box'));
```

步骤一步一步来看，
1. a段代码里写了ref属性，onChange绑定了子组件的childMethod()方法。
2. b段代码里就是childMethod(),函数内部写了调用this.props.emailText方法，而emailText是来自于父组件的。
3. c段代码里父组件将父组件的fatherMethod方法赋值给了emailText。
4. 所以，当被子组件的onChange被触发时,就会按照上面的流程来，先执行子组件的childMethod()方法，里面又执行了this.props.emailText。而this.props.emailText绑定了父组件的fatherMethod,执行this.props.emailText也就是执行fatherMethod,然后数据作为参数，从子组件的childMethod里传到了fatherMethod里。


#### 父传子

```
	import React,{Component} from 'react'
	import ReactDOM from 'react-dom'

	class Child extends Component{
		constructor(){
			super();

		}
		render(){

			return (
				<input type="text" ref='haha' value={this.props.wocao}/>
				)
		}
	}

	class Father extends Component{
		constructor(){
			super();
			this.state={
				txt:''
			}
		}
		render(){
			return (
				<div>
					<input type="text" ref='xixi' onChange={this.fatherMethod.bind(this)}/>
					<Child wocao={this.state.txt}></Child>
				</div>
				)
		}
		fatherMethod(str){
			console.log('输入');
			this.setState({
				txt:this.refs.xixi.value
			})
		}
	}

	ReactDOM.render(<Father></Father>,document.getElementById('box'));
```

父组件改变传给子组件的props，就可以让子组件重新渲染。