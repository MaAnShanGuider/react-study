### 做项目时，关于redux的一些记录

### 最重要的一点:一旦发送了一个action，那么所有的子reducers都会被触发!!!记住是所有的都会被触发!!!

  这就是为什么我们要给那些子reducers设置switch，并且每个子reducers的switch的default都是返回自己本身！！！就是因为当接受action，但是这个action的type不是自己管理的时，必须得有一个返回值，而这个值就是它管理的子state自身。

### 另个重要的一点！！！

  每个子reducer都必须返回新的对象!!!不能在修改老的state，然后将return它。必须!!!必须!!!必须!!!返回一个新的对象!!!如果返回旧对象或者与旧对象有相同的引用，也就是说内存地址相同，不会是不会触发组件的自动渲染的!!!必须要新的内存地址，才能重新渲染组件。

**看这个例子一**

```
	const MY_SUM = (a=defaultState,action)=>{
		switch(action.type){
			case 'wocao':
				a.id++;
				return a;
			drfault:
				return a;
		}
	}

```

  这个例子，当action.type为wocoa时，a.id会自增，但是a还是那个a，地址并没有变。所以这个改动不会触发，组件的视图render().

**例子二**

```
	const MY_SUM = (a=defaultState,action)=>{
		switch(action.type){
			case 'wocao':
				a.id++;
				let b = a;
				return b;
			drfault:
				return a;
		}
	}
```

a和b的引用地址是一样，所以同样不会触发视图的render.

**例子三**

```

	const MY_SUM = (a=defaultState,action)=>{
		switch(action.type){
			case 'wocao':
				a.id++;
				return Object.assign({},a);
			drfault:
				return a;
		}
	}
```

只有这样做，才能改变地址。才会触发组件重新render()。

**但是要注意一点:Object.assign()是伪深拷贝，只能复制第一层，也就是根对象。**

#### 一: combineReducer({})
当使用combineReducer组成大Reducer时，每个子Reducers(也就是那些函数)的名字最好与子state的key值对应。

而且,**combineReducers的参数是一个对象，他的属性的key值必须与state的属性的key值保持一致!!!**
```
	import { combineReducers } from 'redux'

	const defaultState = {
			CARD_DETAIL:{num:0,price:0},
			FROM_SG_DATA:{'xixi':'haha'},
			TEXT:['刘德华']
	}
	//-----(1)下面的三个函数的第一个参数，都是与type其对应的子state，而不是整个state
	//		例如CARD_DETALL函数里第一个参数，就是对应了state里的CARD_DETALL属性。
	//		
	//		
	//-------(2)每个函数里的return，都是给总state里的key值为函数名的子state赋值。
	//
	//
	//-------(3)所有的子reducers在每个dispatch触发时，都会被触发，所以我们要利用switch来
	//		判断action.type,因为第二点的缘故，这些字reducer被触发时都必须返回一个值，
	//		如果不加switch，那么所有的子reducer都会执行Object.assign({},a,action.payload);
	//		combineReducers并不会自动根据action.type来选择执行哪个子reducers，而是所有的都
	//		会被执行。然后根据执行后的返回值再进行下一步的操作。
	//		
	const CARD_DETAIL = (a=defaultState.CARD_DETAIL,action)=>{
		switch (action.type){
			case 'CARD_DETAIL':
				return Object.assign({},a,action.payload);
			default:
				return a;
		}
	}

	const FROM_SG_DATA = (b=defaultState.FROM_SG_DATA,action)=>{
		
		switch (action.type){
			case 'FROM_SG_DATA':
				return Object.assign({},b,action.payload);
			default:
				return b;
		}
	}

	const TEXT = (c=defaultState.TEXT,action)=>{

		return '张学友';
	}
	const reducer = combineReducers({
			CARD_DETAIL,
			FROM_SG_DATA,
			TEXT
	})



	export default reducer;

```

像a段代码那里，
也可以改写成:
```
	const reducer = combineReducers({  //-a段代码
			a:CARD_DETAIL(state.a,action),
			b:FROM_SG_DATA(state.b,action),
			c:TEXT(state.c,action)
	})
```



(1)下面的三个函数的第一个参数，都是与type其对应的子state，而不是整个state
		例如CARD_DETALL函数里第一个参数，就是对应了state里的CARD_DETALL属性。
		

(2)每个函数里的return，都是给总state里的key值为函数名的子state赋值。


(3)所有的子reducers在每个dispatch触发时，都会被触发，所以我们要利用switch来
		判断action.type,因为第二点的缘故，这些字reducer被触发时都必须返回一个值，
		如果不加switch，那么所有的子reducer都会执行Object.assign({},a,action.payload);
		combineReducers并不会自动根据action.type来选择执行哪个子reducers，而是所有的都
		会被执行。然后根据执行后的返回值再进行下一步的操作。
(4)所以，每个子reducers只会对自己的子state负责，而干涉不了其他的子state。
	
#### 二: redux-devtools插件的使用

1. 必须现在浏览器中安装redux-devtools
2. 然后在项目中安装插件:`npm install  redux-devtools-extension --save-dev`
3. 核心的一步: 在store中引入
```
	import { createStore } from 'redux'
	import { composeWithDevTools } from 'redux-devtools-extension'
	import Reducer from './reducer'

	const store = createStore(Reducer,composeWithDevTools());

	export default store;
```
	
	**搭配中间件**
```
	import { createStore, applyMiddleware } from 'redux';
	import { composeWithDevTools } from 'redux-devtools-extension';

	const store = createStore(reducer, composeWithDevTools(
	  applyMiddleware(...middleware),
	  // other store enhancers if any
	));
```

像我们自己的项目:

```
	import { createStore,applyMiddleware } from 'redux'
	import { composeWithDevTools } from 'redux-devtools-extension'
	import thunk from 'redux-thunk'
	import Reducer from './reducer'


	const store = createStore(Reducer,composeWithDevTools(
			applyMiddleware(thunk)
		));

	export default store;
```

#### 三: mapDispatchToProps

先贴两个别人写的文章:
1. https://www.cnblogs.com/xianyulaodi/p/5399264.html
2. https://yq.aliyun.com/articles/59428

```
	const mapDispatchToProps = (dispatch,props) =>{
		return {
			sendClickMsg1:()=>{ dispatch(genaction(1))},
			sendClickMsg2:()=>{ dispatch(genaction(2))},
			sendClickMsg3:()=>{ dispatch(genaction(3))},
			sendClickMsg4:()=>{ dispatch(genaction(4))},
		}
	}
```

我们写了这么多，都会被添加进组件的props里，而且属性值都是方法，如果中间那个括号里加了参数，则这个参数就是event。
```
	<li onClick={this.props.sendClickMsg1} >热门促销</li>
	<li onClick={this.props.sendClickMsg2} >最新推荐</li>
	<li onClick={this.props.sendClickMsg3} >排行榜</li>
	<li onClick={this.props.sendClickMsg4} >预售抢先</li>
```
通过事件来触发props的那些方法，然后就会接着触发mapDispatchToProps,


#### 四: 一个标签元素绑定多个事件:

方法一:
```
	var Test = React.createClass({
	   onClick: function(event){
	      func1();
	      func2();
	   },
	   render: function(){
	      return (
	         <a href="#" onClick={this.onClick}>Test Link</a>
	      );
	   }
	});
```

方法二:
```
	<a href="#" onClick={function(event){ func1(); func2()}}>Test Link</a>
```

方法二(es6写法):
```
	<a href="#" onClick={()=>{func1();func2();}}></a>
```

#### 五: redux-thunk中间件

thunk的作用是可以dispatch一个函数，但是不是随便的一个函数，这个函数不管过程如何，最终的结果也必须返回一个对象。我们就是在这个过程中做文章。

#### 六:

遍历出来带有key值的jsx的dom，其同辈标签也必须带有key。