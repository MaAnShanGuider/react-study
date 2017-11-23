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