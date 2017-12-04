### 中间件的概念

为了理解中间件，让我们站在框架作者的角度思考问题：如果要添加功能，你会在哪个环节添加？

    （1）Reducer：纯函数，只承担计算 State 的功能，不合适承担其他功能，也承担不了，因为理论上，纯函数不能进行读写操作。

    （2）View：与 State 一一对应，可以看作 State 的视觉层，也不合适承担其他功能。

    （3）Action：存放数据的对象，即消息的载体，只能被别人操作，自己不能进行任何操作。

想来想去，只有发送 Action 的这个步骤，即store.dispatch()方法，可以添加功能。举例来说，要添加日志功能，把 Action 和 State 打印出来，可以对store.dispatch进行如下改造。


    let next = store.dispatch;
    store.dispatch = function dispatchAndLog(action) {
      console.log('dispatching', action);
      next(action);
      console.log('next state', store.getState());
    }

上面代码中，对store.dispatch进行了重定义，在发送 Action 前后添加了打印功能。这就是中间件的雏形。

中间件就是一个函数，对store.dispatch方法进行了改造，在发出 Action 和执行 Reducer 这两步之间，添加了其他功能。

### 中间件的用法

中间件用别人写好的即可。比如，上一节的日志中间件，就有现成的redux-logger模块。这里只介绍怎么使用中间件。

```
	import { applyMiddleware,createStore} from 'redux'
	import createLogger from 'redux-logger'

	const logger = createLogger(); //-这个logger才是中间件,createLogger只是一个生成器。
	const store = createStore({
								reducer,
								applyMiddleware(logger)
							})
```

上面代码中,`redux-logger`提供了一个生成器`createLogger`,可以生成日志中间件logger,将createLogger放入applyMiddleware方法中,并且传入createStore,就完成了。

**这里有两点要注意:**
 1. `createStore`方法可以接受整个应用的初始状态作为参数，那样的话，applyMiddleware就是第三个参数了。
```
	const store = createStore(
	  reducer,
	  initial_state,
	  applyMiddleware(logger)
	);
```

 2. 中间件的次序有讲究
```
	const store = createStore(
							reducer,
							initial_state,
							applyMiddleware(thunk,promise,logger)
							)
```

上面代码中，applyMiddleware方法的三个参数，就是三个中间件。有的中间件有次序要求，使用前要查一下文档。比如，logger就一定要放在最后，否则输出结果会不正确。

### applyMiddleware()

applyMiddleware()到底是干嘛的?

答:它的作用是将参数放到一个数组里，然后依次执行。

源码:

```
	export default function applyMiddleware(...middlewares){
				return (createStore) =>(reducer,preloadState,enhancer)=>{
					var store = createStore(reducer,preloadState,enhancer);
					var dispatch = store.dispatch;
					var chain = [];

					var middlewareAPI = {
						getState:store.getState,
						dispatch:(action)=>{dispatch(action)}
					}
					chain = middlewares.map(middleware => middleware(middlewareAPI))
					dispatch = compose(...chain)(store.dispatch);

					return  {...store,dispatch}
				}
			}
```

上面代码中，所有中间件被放进了一个数组`chain`，然后嵌套执行，最后执行`store.dispatch`。可以看到，中间件内部（`middlewareAPI`）可以拿到`getState`和`dispatch`这两个方法。

### 异步操作的基本思路

同步操作只要发出一种action即可，而异步操作需要发出三种action。

* 操作发起时的action
* 操作成功时的action
* 操作失败时的action

以向服务器取出数据为例，就有两种不同的写法。

```
	// 写法一：名称相同，参数不同
	{ type: 'FETCH_POSTS' }
	{ type: 'FETCH_POSTS', status: 'error', error: 'Oops' }
	{ type: 'FETCH_POSTS', status: 'success', response: { ... } }

	// 写法二：名称不同
	{ type: 'FETCH_POSTS_REQUEST' }
	{ type: 'FETCH_POSTS_FAILURE', error: 'Oops' }
	{ type: 'FETCH_POSTS_SUCCESS', response: { ... } }

```

除了action不同，state也要进行改造，反映不同的操作状态。例如:

```
	let state = {
		isFetch : true,
		didInvalidate : true,
		lastUpdata : XXXX
	}
```

上面代码中，`State` 的属性`isFetching`表示是否在抓取数据。`didInvalidate`表示数据是否过时，`lastUpdated`表示上一次更新时间。

现在，整个异步操作的思路就很清楚了。

* 操作开始时，送出一个 Action，触发 State 更新为"正在操作"状态，View 重新渲染
* 操作结束后，再送出一个 Action，触发 State 更新为"操作结束"状态，View 再一次重新渲染


### redux-thunk

异步操作至少要送出两个 Action：用户触发第一个 Action，这个跟同步操作一样，没有问题；如何才能在操作结束时，系统自动送出第二个 Action 呢？

奥妙就在 Action Creator 之中。

```
	class AsyncApp extends Component {
	  componentDidMount() {
	    const { dispatch, selectedPost } = this.props
	    dispatch(fetchPosts(selectedPost))
	  }

	// ...

```
	
上面代码是一个异步组件的例子。加载成功后（`componentDidMount`方法），它送出了（`dispatch`方法）一个`Action`，向服务器要求数据 `fetchPosts(selectedSubreddit)`。这里的`fetchPosts`就是 `Action Creator`。

下面就是fetchPosts的代码，关键之处就在里面。

```
	const fetchPOsts = (postTitle) =>(dispatch,getstate)=>{
			dispatch(requestPosts(postTitle));
			return fetch(`/some/API/${postTitle}.json`)					
					.then(response => response.json())
					.then(json => dispatch(receivePosts(postTitle, json)));
		}
	}

	//---使用方法一:
	store.dispatch(fetchPosts('reactjs'));

	// 使用方法二
	store.dispatch(fetchPosts('reactjs')).then(() =>
	  console.log(store.getState())
	);
```

上面代码中，`fetchPosts`是一个`Action Creator`（动作生成器），返回一个函数。这个函数执行后，先发出一个`Action(requestPosts(postTitle))`，然后进行异步操作。拿到结果后，先将结果转成 JSON 格式，然后再发出一个 `Action( receivePosts(postTitle, json))`。

上面代码中，有几个地方需要注意。

* fetchPosts返回了一个函数，而普通的 Action Creator 默认返回一个对象。

* 返回的函数的参数是dispatch和getState这两个 Redux 方法，普通的 Action Creator 的参数是 Action 的内容。

* 在返回的函数之中，先发出一个 Action（requestPosts(postTitle)），表示操作开始。

* 异步操作结束之后，再发出一个 Action（receivePosts(postTitle, json)），表示操作结束。

这样的处理，就解决了自动发送第二个 `Action` 的问题。但是，又带来了一个新的问题，`Action` 是由`store.dispatch`方法发送的。而`store.dispatch`方法正常情况下，参数只能是对象，不能是函数。

这时，就要使用中间件`redux-thunk`。

```
	import {createStore,applyMiddlware} from 'redux'
	import chunk from 'redux-chunk'
	import reducer from './reducer'

	const store = createStore(reducer,appliMiddleware(thunk));
```

上面代码使用redux-thunk中间件，改造store.dispatch，使得后者可以接受函数作为参数。

因此，异步操作的第一种解决方案就是，写出一个返回函数的 Action Creator，然后使用redux-thunk中间件改造store.dispatch。

### redux-promise中间件

既然 `Action Creator` 可以返回函数，当然也可以返回其他值。另一种异步操作的解决方案，就是让 `Action Creator` 返回一个`Promise` 对象。

这就需要使用`redux-promise`中间件。

```	
	import { createStore, applyMiddleware } from 'redux';
	import promiseMiddleware from 'redux-promise';
	import reducer from './reducers';

	const store = createStore(
	  reducer,
	  applyMiddleware(promiseMiddleware)
	); 

```

这个中间件使得`store.dispatch`方法可以接受 Promise 对象作为参数。这时，`Action Creator` 有两种写法。写法一，返回值是一个 `Promise` 对象。

```
	const fetchPosts = 
	  (dispatch, postTitle) => new Promise(function (resolve, reject) {
	     dispatch(requestPosts(postTitle));
	     return fetch(`/some/API/${postTitle}.json`)
	       .then(response => {
	         type: 'FETCH_POSTS',
	         payload: response.json()
	       });
	});
```

写法二，`Action` 对象的`payload`属性是一个 `Promise` 对象。这需要从`redux-actions`模块引入`createAction`方法，并且写法也要变成下面这样。

```
	import { createAction } from 'redux-actions';

	class AsyncApp extends Component {
	  componentDidMount() {
	    const { dispatch, selectedPost } = this.props
	    // 发出同步 Action
	    dispatch(requestPosts(selectedPost));
	    // 发出异步 Action
	    dispatch(createAction(
	      'FETCH_POSTS', 
	      fetch(`/some/API/${postTitle}.json`)
	        .then(response => response.json())
	    ));
	  }
```

上面代码中，第二个`dispatch`方法发出的是异步 `Action`，只有等到操作结束，这个 `Action` 才会实际发出。注意，`createAction`的第二个参数必须是一个 Promise 对象。

看一下redux-promise的源码，就会明白它内部是怎么操作的。

```
	export default function promiseMiddleware({ dispatch }) {
	  return next => action => {
	    if (!isFSA(action)) {
	      return isPromise(action)
	        ? action.then(dispatch)
	        : next(action);
	    }

	    return isPromise(action.payload)
	      ? action.payload.then(
	          result => dispatch({ ...action, payload: result }),
	          error => {
	            dispatch({ ...action, payload: error, error: true });
	            return Promise.reject(error);
	          }
	        )
	      : next(action);
	  };
	}
```

从上面代码可以看出，如果 `Action` 本身是一个 `Promise`，它 `resolve` 以后的值应该是一个 `Action` 对象，会被`dispatch`方法送出（`action.then(dispatch)`），但 `reject` 以后不会有任何动作；如果 Action 对象的payload属性是一个 Promise 对象，那么无论 `resolve` 和 `reject`，`dispatch`方法都会发出 `Action`。