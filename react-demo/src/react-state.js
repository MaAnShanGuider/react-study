
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


