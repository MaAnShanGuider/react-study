import React,{Component} from 'react'
import ReactDOM from 'react-dom'
import './detail.css'

class DetailChild extends Component{
	constructor(props){
		super(props);
		this.state = {name:'我是detail'}
	}
	render(){
		return (
			<div className='detailBox'>{this.state.name}</div>
			)
	}
}

export default DetailChild;