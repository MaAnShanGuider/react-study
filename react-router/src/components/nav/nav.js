import React,{Component} from 'react'
import ReactDOM from 'react-dom'
import './nav.css'

class NavChild extends Component{
	constructor(props){
		super(props);
		this.state = {name:'我是nav'}
	}
	render(){
		return (
			<div className='navBox'>{this.state.name}</div>
			)
	}
}

export default NavChild;