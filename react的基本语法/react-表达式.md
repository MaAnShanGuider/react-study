### react表达式

用单花括号包裹变量,花括号里能写三木运算，能写自执行函数，但是！！！就是不能写if语句。

```
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
	<-------加了这段会报错	{if(boolean){return '我是if真'}else{return '我是if假'}}  ------>
					{boolean?'我是真':'我是假'}
					<p dangerouslySetInnerHTML={{__html:msg3}}></p>
					{(()=>{return '梁朝伟'})()}
				</div>
		}
	})

	ReactDom.render(<Child></Child>,document.getElementById('box'))

```

在react中，直接在花括号里写html标签并不会被渲染出来，这是防止xss。但是可以这样写：
`<p dangerouslySetInnerHTML={{__html:msg}}></p>`

`dangerouselySetInnerHTML`是与`__html`搭配一起的。

之所以是有2个{{}}，是因为第一{}代表jsx语法开始，第二个是代表dangerouslySetInnerHTML接收的是一个对象键值对