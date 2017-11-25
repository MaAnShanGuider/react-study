import React,{Component} from 'react'
import ReactDOM from 'react-dom'
import './home.css'

class HomeChild extends Component{
	constructor(props){
		super(props);
		this.state = {name:'我是home'}
	}
	render(){
		return (
			<div className='homeBox'>{this.state.name}</div>
			)
	}
}

export default HomeChild;