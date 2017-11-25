import React,{Component} from 'react'
import ReactDOM from 'react-dom'

class Child extends Component{
	constructor(){
		super();
		this.defaultProps={
			wocao:'张学友'
		}
		this.state = {
			nima:'我是老的state'
		}
		;

	}
	//----componentWillMount
	//在初始化时会被调用一次。
	//然后不会在出现了。
	componentWillMount(){
		console.log('我是componentWillMount');
	}
	
	//----在初始化的时候不会触发，只会在这个子组件重新(注意：是重新)render之前时，会触发它。
	componentWillUpdate(nextProps,nextState){
		console.log(nextProps.wocao);
		console.log(nextState.nima);
		console.log('我是componentWillUpdate');
	}
	render(){
		console.log('我是render');
		return (
			<div>
				<p>{this.state.nima}</p>
				{this.props.wocao}
			
			</div>
			)
	}
	shouldComponentUpdate(nextProps,nextState){
		console.log('我是将要更新的props:'+nextProps.wocao);
		console.log('我是老的props:'+this.props.wocao);
		console.log('我是将要更新的state:'+nextState.nima);
		console.log('我是老的state:'+this.state.nima);
		return true;
	}

	//----在初始化的时候不会触发，只会在这个子组件重新(注意：是重新)render之后时，会触发它。
	componentDidUpdate(){
		console.log('我是componentDidUpdate');
	}

}

class Father extends Component{
	constructor(){
		super();
		this.state = {
			name:''
		}
	}
	render(){
		console.log('我是父组件的render');
		return (
			<div><input type="text" ref='xixi'/>
					<button onClick={this.change.bind(this)}>提交</button>
					<Child wocao={this.state.name}></Child>
			</div>
			)
	}
	change(event){
		this.setState({
			name:this.refs.xixi.value
		})
	}
}

ReactDOM.render(<Father></Father>,document.getElementById('box'));