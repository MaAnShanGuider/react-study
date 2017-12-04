### react路由机制

在React Router4.0中，已经正式发布。

RR4 本次采用单代码仓库模型架构（monorepo），这意味者这个仓库里面有若干相互独立的包，分别是：
* react-router React Router 核心
* react-router-dom 用于 DOM 绑定的 React Router
* react-router-native 用于 React Native 的 React Router
* react-router-config 静态路由配置的小助手

#### 引用

**react-router 还是 react-router-dom？**

在99.99%的情况下，都应该使用react-router-dom.

安装时则是两个都必须安装:

```
		npm install --save-dev react-router

		npm install --save-dev react-router-dom
```

**注意:react-router-dom中没有IndexRoute。**

### 路径结构

一般而言，路径结构都应该是:
```
		--router
			index.js  //----路由js文件,负责路由,根据浏览器地址栏上的地址，渲染不同的views中的页面组件
		--components
		    detail.js  //---组件，这是三个小组件，也就是页面中的各个小部件
		    home.js
		    nav.js
		--views
			index.js   //---页面组件，页面主体，由小组件构成。
			wocao.js
			xixihaha.js

```

### 路由组件

```
	import {
	  HashRouter,
	  BrowserRouter,
	  Route,
	  Redirect,
	  link,
	  NavLink,
	  Prompt,
	  Switch
	} from 'react-router-dom'
```

-----------

#### HashRouter,BrowserRouter:

这两个放到一起讲,作用是包裹那些路由标签，。。区别在于,HashRouter在浏览器的地址栏上会多出一个`/#`,并且HashRouter不支持 `location.key`和 `location.state`。

这两个相当于vue中的`<Router-View></Router-View>`。

**不能用自己写的组件包裹BrowserRouter组件，但是原生标签，和Provider可以包裹它。**

 组件支持的属性:
1. **basename: string**

作用：为所有位置添加一个基准URL

使用场景：假如你需要把页面部署到服务器的二级目录，你可以使用 basename 设置到此目录。

```
	<BrowserRouter basename="/minooo" />
	<Link to="/react" /> // 最终渲染为 <a href="/minooo/react">
```

2. **getUserConfirmation: func**

作用：导航到此页面前执行的函数，默认使用 window.confirm

使用场景：当需要用户进入页面前执行什么操作时可用，不过一般用到的不多

```
	const getConfirmation = (message, callback) => {
	  const allowTransition = window.confirm(message)
	  callback(allowTransition)
	}

	<BrowserRouter getUserConfirmation={getConfirmation('Are you sure?', yourCallBack)} />
```

3. **forceRefresh: bool**

作用：当浏览器不支持 HTML5 的 history API 时强制刷新页面。

使用场景：同上。

```
const supportsHistory = 'pushState' in window.history
<BrowserRouter forceRefresh={!supportsHistory} />
```

4.  **keyLength: number**

作用：设置它里面路由的 location.key 的长度。默认是6。（key的作用：点击同一个链接时，每次该路由下的 location.key都会改变，可以通过 key 的变化来刷新页面。）

使用场景：按需设置。

`<BrowserRouter keyLength={12} />`

5. **children: node**

作用：渲染唯一子元素。

使用场景：作为一个 React组件，天生自带 children 属性。

--------

#### <Route></Route>

Route组件是react路由机制中，最为重要的组件。它最基本的职责就是当页面的访问地址与 Route 上的 path 匹配时，就渲染出对应的 UI 界面。

`<Route>` 自带三个 `render method` 和三个 `props` 。

render method分别是:
* `<Route component={}></Route>`
* `<Route render={}></Route>`
* `<Route children={}></Route>`

props 分别是：

* match
* location
* history

   所有的 render method 无一例外都将被传入这些 props。

**每种 render method 都有不同的应用场景，同一个<Route> 应该只使用一种 render method ，大部分情况下你将使用 component 。**

**component**:

只有浏览器输入栏地址和path匹配时，才会渲染出React Component。此时组件接受route props(match,location,history)。

当使用 component 时，router 将使用 React.createElement 根据给定的 component 创建一个新的 React 元素。这意味着如果你使用内联函数（inline function）传值给 component将会产生不必要的重复装载。对于内联渲染（inline rendering）, 建议使用 render prop。

```
<Route path="/user/:username" component={User} />
const User = ({ match }) => {
  return <h1>Hello {match.params.username}!</h1>
}
```

当地址栏上为`localhost:8088/#/user/anyStr`时，就会渲染出这个组件,显示`Hello anyStr`

**render:func()**

这个方法适用于内联方法，而且不会发生上面那样的重载问题。

**children:func()**

```
	<ul>
	  <ListItemLink to="/somewhere" />
	  <ListItemLink to="/somewhere-ele" />
	</ul>

	const ListItemLink = ({ to, ...rest }) => (
	  <Route path={to} children={({ match }) => (
	    <li className={match ? 'active' : ''}>
	      <Link to={to} {...rest} />
	    </li>
	  )}
	  </Route>
	)
```

**path:string**

任何可以被 path-to-regexp解析的有效 URL 路径

`<Route path="/users/:id" component={User} />`

如果不给path，那么路由将总是匹配。

**exact: bool**

如果为 true，path 为 '/one' 的路由将不能匹配 '/one/two'，反之，亦然。

**strict: bool**

对路径末尾斜杠的匹配。如果为 true。path 为 '/one/' 将不能匹配 '/one' 但可以匹配 '/one/two'。

如果要确保路由没有末尾斜杠，那么 strict 和 exact 都必须同时为 true

--------

#### <link><link/>

为你的应用提供声明式，无障碍导航。链接，点击跳转路由规则跳转页面。

**to: string**

作用：跳转到指定路径

使用场景：如果只是单纯的跳转就直接用字符串形式的路径。

`<Link to="/courses" />`

**to: object**

作用：携带参数跳转到指定路径

作用场景：比如你点击的这个链接将要跳转的页面需要展示此链接对应的内容，又比如这是个支付跳转，需要把商品的价格等信息传递过去。

```
<Link to={{
  pathname: '/course',
  search: '?sort=name',
  state: { price: 18 }
}} />
```

**replace: bool**

为 true 时，点击链接后将使用新地址替换掉上一次访问的地址，什么意思呢，比如：你依次访问 '/one' '/two' '/three' ’/four' 这四个地址，如果回退，将依次回退至 '/three' '/two' '/one' ，这符合我们的预期，假如我们把链接 '/three' 中的 replace 设为 true 时。依次点击 one two three four 然后再回退会发生什么呢？会依次退至 '/three' '/one'！ 为此我做了个在线 demo，大家可以调试体会一下 !

----------

#### <NavLink></NavLink>

这是 `<Link>` 的特殊版，顾名思义这就是为页面导航准备的。因为导航需要有 “激活状态”。

**activeClassName: string**

导航选中激活时候应用的样式名，默认样式名为 active

```<NavLink
  to="/about"
  activeClassName="selected"
>MyBlog</NavLink>
```

**activeStyle: object**

如果不想使用样式名就直接写style

```<NavLink
  to="/about"
  activeStyle={{ color: 'green', fontWeight: 'bold' }}
>MyBlog</NavLink>
```

**exact: bool**

若为 true，只有当访问地址严格匹配时激活样式才会应用

**strict: bool**

若为 true，只有当访问地址后缀斜杠严格匹配（有或无）时激活样式才会应用

**isActive: func**

决定导航是否激活，或者在导航激活时候做点别的事情。不管怎样，它不能决定对应页面是否可以渲染。

**其他的属性都是和link一样，区别就是多了个激活状态。**

-----

#### <Switch></Switch>

只渲染出第一个与当前访问地址匹配的 `<Route>` 或 `<Redirect>`。

思考如下代码，如果你访问 /about，那么组件 About User Nomatch 都将被渲染出来，因为他们对应的路由与访问的地址 /about 匹配。这显然不是我们想要的，我们只想渲染出第一个匹配的路由就可以了，于是 <Switch> 应运而生！

	<Route path="/about" component={About}/>
	<Route path="/:user" component={User}/>
	<Route component={NoMatch}/>

另外，`<Switch> `对于转场动画也非常适用，因为被渲染的路由和前一个被渲染的路由处于同一个节点位置！

```
<Fade>
  <Switch>
    {/* 用了Switch 这里每次只匹配一个路由，所有只有一个节点。 */}
    <Route/>
    <Route/>
  </Switch>
</Fade>

<Fade>
  <Route/>
  <Route/>
  {/* 不用 Switch 这里可能就会匹配多个路由了，即便匹配不到，也会返回一个null，使动画计算增加了一些麻烦。 */}
</Fade>
```

**children:node**

`<Switch></Switch>`里的子节点只能是`<Route></Route>`和`<Redirect></Redirect>`。

`<Route></Route>`通过path匹配路径。

`<Redirect></Redirect>`通过from匹配路径。

----------

####  <Redirect></Redirect>

`<Redirect></Redirect>`渲染时将导航到一个新地址，这个新地址覆盖在访问历史信息里面的本该访问的那个地址。

**to: string**

重定向的 URL 字符串

**to: object**

重定向的 location 对象

**push: bool**

若为真，重定向操作将会把新地址加入到访问历史记录里面，并且无法回退到前面的页面。

**from: string**

需要匹配的将要被重定向路径。


----------

 history

histoty 是 RR4 的两大重要依赖之一（另一个当然是 React 了），在不同的 javascript 环境中， history 以多种能够行驶实现了对会话（session）历史的管理。

history 对象通常具有以下属性和方法：

* length: number 浏览历史堆栈中的条目数
* action: string 路由跳转到当前页面执行的动作，分为 PUSH, REPLACE, POP
* location: object 当前访问地址信息组成的对象，具有如下属性：
		* pathname: string URL路径
		* search: string URL中的查询字符串
		* hash: string URL的 hash 片段
		* state: string 例如执行 push(path, state) 操作时，location 的 state 将被提供到堆栈信息里，state 只有在 browser 和 memory history 有效。
* push(path, [state]) 在历史堆栈信息里加入一个新条目。
* replace(path, [state]) 在历史堆栈信息里替换掉当前的条目
* go(n) 将 history 堆栈中的指针向前移动 n。
* goBack() 等同于 go(-1)
* goForward 等同于 go(1)
* block(prompt) 阻止跳转

history 对象是可变的，因为建议从 <Route> 的 prop 里来获取 location，而不是从 history.location 直接获取。这样可以保证 React 在生命周期中的钩子函数正常执行，例如以下代码：

```
class Comp extends React.Component {
  componentWillReceiveProps(nextProps) {
    // locationChanged
    const locationChanged = nextProps.location !== this.props.location

    // 错误方式，locationChanged 永远为 false，因为history 是可变的
    const locationChanged = nextProps.history.location !== this.props.history.location
  }
}
```

-----

### location

location 是指你当前的位置，将要去的位置，或是之前所在的位置.

 location 是指你当前的位置，将要去的位置，或是之前所在的位置

```
{
  key: 'sdfad1'
  pathname: '/about',
  search: '?name=minooo'
  hash: '#sdfas',
  state: {
    price: 123
  }
}
```

在以下情境中可以获取 location 对象:

  在 Route component 中，以 this.props.location 获取

  在 Route render 中，以 ({location}) => () 方式获取

  在 Route children 中，以 ({location}) => () 方式获取

  在 withRouter 中，以 this.props.location 的方式获取

location 对象不会发生改变，因此可以在生命周期的回调函数中使用 location 对象来查看当前页面的访问地址是否发生改变。这种技巧在获取远程数据以及使用动画时非常有用

```
componentWillReceiveProps(nextProps) {
  if (nextProps.location !== this.props.location) {
    // 已经跳转了！
  }
}
```

可以在不同情境中使用 location：

`<Link to={location}
 />`

`<NaviveLink
 to={location} />`

`<Redirect
 to={location />`

`history.push(location)`

`history.replace(location)`

------

#### match

match 对象包含了 <Route path> 如何与 URL 匹配的信息，具有以下属性：

  params: object 路径参数，通过解析 URL 中的动态部分获得键值对

  isExact: bool 为 true 时，整个 URL 都需要匹配

  path: string 用来匹配的路径模式，用于创建嵌套的 <Route>

  url: string URL 匹配的部分，用于嵌套的 <Link>

在以下情境中可以获取 match 对象：

 在 Route component 中，以 this.props.match获取
 
 在 Route render 中，以 ({match}) => () 方式获取

 在 Route children 中，以 ({match}) => () 方式获取

 在 withRouter 中，以 this.props.match的方式获取

  matchPath 的返回值

当一个 Route 没有 path 时，它会匹配一切路径。