var React = require('react');
var ReactDom = require('react-dom');

var msg1 = '张学友';
var msg2 = '<b>刘德华</b>'
var msg3 = '<b>周润发</b>'
var boolean = false;
var Child = React.createClass({
	render(){
		return <div>
				{
				//我是单行注释啊
				}
				{
				/*
					我是多行注释啊
				 */
				}
				{msg1} 
				{msg2}
				{if(boolean){return '我是if真'}else{return '我是if假'}}
				{boolean?'我是真':'我是假'}
				<p dangerouslySetInnerHTML={{__html:msg3}}></p>
				{(()=>{return '梁朝伟'})()}
			</div>
	}
})

ReactDom.render(<Child></Child>,document.getElementById('box'))