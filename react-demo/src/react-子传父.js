import React,{Component} from 'react'
import ReactDOM from 'react-dom'

class Child extends Component{
	constructor(){
		super();

	}
	render(){

		return (
			<input type="text" ref='haha' onChange={childMethod}/>
			)
	}
	childMethod(){
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
				<Child emailText={this.fatherMethod.bind(this)}></Child>
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