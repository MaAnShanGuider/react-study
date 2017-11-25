
import React ,{Component} from "react";
import ReactDOM from "react-dom";

import ReactCSSTransitionGroup from 'react-addons-css-transition-group'; // ES6

import "./css/index.css";

class Father extends Component{
	constructor(props){
		super(props);
		this.state = {
			list:[]
		}
	}

	render(){
		this.state.list.map((ele,index)=>{
			console.log(ele.toString()+index);
		})
		var styleObj = {background:'red',height:'20px',width:'50px',marginTop:'10px'};
		var listDom = this.state.list.map((ele,index)=>(
			<li style={styleObj} key={index} onClick={this.deleteDOM.bind(this,index)}>{ele}</li>))
		return (
			<div>
			<input type="text" ref='xixi'/><button onClick={this.Change.bind(this)}>点击我</button>
			 
				
			<ReactCSSTransitionGroup
          transitionName="donghua"
          transitionEnterTimeout={500}
          transitionLeaveTimeout={300}
            component="ul">
					{listDom}
					</ReactCSSTransitionGroup>
				
			
				
			</div>
			)
	}
	Change(){
		console.log('触发我');
		this.setState({
			list:[...this.state.list,this.refs.xixi.value]
		})
	}
	deleteDOM(index){
		console.log(index);
		var arr = [...this.state.list];
			arr.splice(index,1);
			this.setState({
				list:[...arr]
			})
	}
}
ReactDOM.render(<Father/>,document.getElementById('box'));


/*
	<ReactCSSTransitionGroup
          transitionName="donghua"
          transitionEnterTimeout={500}
          transitionLeaveTimeout={300}
            component="ul">
					{listDom}
					</ReactCSSTransitionGroup>


 <ReactCSSTransitionGroup
          transitionName="example"
          transitionEnterTimeout={500}
          transitionLeaveTimeout={300}>
          {
            this.state.list.map((item,index)=>
              <li key={item}>{item}

                <button onClick={this.handleDelClick.bind(this,index)}>del</button>
              </li>
            )
          }
          </ReactCSSTransitionGroup>
 */