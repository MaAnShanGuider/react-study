var React = require('react');
var ReactDom = require('react-dom');

var Wocao = React.createClass({
	render(){

		return (
				<div>
					<input type="text" ref='xixi'/>
					<p ref='haha'>张学友啊</p>
					<button onClick={this.myMethod}>点击我</button>
				</div>
			)
	},
	myMethod(){
		// this.refs是一个集合，里面成员是所有设了ref属性的dom，记住了！！！是原生dom！！！
		// 通过访问ref值来读取dom对象。
		console.log(this.refs.xixi.value,this.refs.haha.innerHTML);
	}
})

ReactDom.render(<Wocao></Wocao>,document.getElementById('box'));