### react式样
在react文件中，是可以直接引入外部的css文件，也可以自己在组件中声明式样。

```
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
	
```

1. **在组件的标签元素中，class必须用className代替，我估计这是因为class是关键字，因为在原生js中也是只用className来获取标签的class类名。**
2. **而style则必须用花括号包裹住，里面写自己定义好的式样变量**,
3. **className与style都可以用三目运算来实现切换。**


