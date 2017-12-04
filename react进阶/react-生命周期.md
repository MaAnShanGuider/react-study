### react的生命周期
先看图:
![Image text](./img/one.png)

#### 组件在初始化的时候会一次触发这五个钩子函数:
1. getDefaultProps

 > 在使用es6的class语法时是没有这个钩子函数的，可以直接在constructor中定义this.defaultProps设置组件的默认属性。

2. getInitialState

 > 在使用es6的class语法时是没有这个钩子函数的，可以直接在constructor中定义this.state。此时可以访问this.props。

3. componentWillMount

 > 组件初始化时只调用，以后组件更新不调用，整个生命周期只调用一次，此时可以修改state。

4. render

 > react最重要的步骤，创建虚拟dom，进行diff算法，更新dom树都在此进行。此时就不能更改state了。

5. getDidMount

 > 组件渲染之后触发，可以通过this.getDOMNode()获取和操作节点，也只是在初始化时被调用，只调用一次。

#### 组件更新时也会触发五个钩子函数:
1. componentWillReceivePorps(nextProps)

 > 组件初始化时不调用，接收新的props时调用

2. shouldComponentUpdate(nextProps,nextState)

> react性能优化非常重要的一环。组件接受新的state或者props时调用，我们可以设置在此对比前后两个props和state是否相同，如果相同则返回false阻止更新，因为相同的属性状态一定会生成相同的dom树，这样就不需要创造新的dom树和旧的dom树进行diff算法对比，节省大量性能，尤其是在dom结构复杂的时候。不过调用this.forceUpdate会跳过此步骤。
> 这一步必须返回一个布尔值，为true，则执行render；false，则不执行render。
```
	shouldComponentUpdate(nextProps,nextState){
		console.log('我是将要更新的props:'+nextProps.wocao);
		console.log('我是老的props:'+this.props.wocao);
		console.log('我是将要更新的state:'+nextState.nima);
		console.log('我是老的state:'+this.state.nima);
		return false;
	}
```
对老新两个props,state进行比较，根据结果选择返回true还是false。

3. componentWillUpdate(nextProps, nextState)

 > 组件初始化时不调用，只有在组件将要更新时才调用，此时可以修改state

4. render

 > 渲染

5. componentDidUpdate()

 > 组件初始化时不调用，组件更新完成后调用，此时可以获取dom节点。

### 除此之外，还要一个销毁时被触发的钩子

componentWillUnmount();

以上可以看出来react总共有10个周期函数（render重复一次），这个10个函数可以满足我们所有对组件操作的需求，利用的好可以提高开发效率和组件性能。