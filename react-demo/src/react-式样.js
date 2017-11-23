var React = require('react');
var ReactDom = require('react-dom');


//----从外部引入css文件
require('./css/index.css');

var Wocao = React.createClass({
		render(){
			var myStyle={background:'blue',font:"700 40px/100px ''"};
			var myStyle2={background:'#ff0e32',font:"700 40px/100px ''"};
			var myBoolean = false;
			return (
				<div>
				{
				//用class会报错
				}
					<div className='haha'>caonima</div>
					<div style={myStyle}>shishileni</div>

				{
					//通过三目运算来达到不同样式的转换
				}
					<div className={myBoolean?'haha':'xixi'}>shishileni</div>
					<div style={myBoolean?myStyle:myStyle2}>xixihaha</div>
				</div>
				)
		}
})
//组件首字母大写！！！千万不能忘！！！
ReactDom.render(<Wocao/>,document.getElementById('box'));