### react事件

**先上代码**
```
	var React = require('react');
	var ReactDom = require('react-dom');

	var Wocao = React.createClass({
		render(){

			return (
					<button onClick={this.myMethod}>我操你妈</button>
				)
		},
		myMethod(){
			console.log('嘻嘻哈哈');
		}
	})

	ReactDom.render(<Wocao></Wocao>,document.getElementById('box'));
```

解析:组件里的模板里创建了一个`<button></button>`标签，然后注意了！点击事件是用*驼峰*命名法写的,不是原生里的全都小写。然后里面用花括号包裹住`this.myMethod`,这个`this`就是指`Wocao`。

### 深入点ref
```
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
```

