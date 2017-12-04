import React,{Component} from 'react'
import ReactDOM from 'react-dom'
import {
  HashRouter as Router,
  Route,
  Redirect,
  Switch,
  Link,
  NavLink
} from 'react-router-dom'
import Home from '@/components/home/home'
import Detail from '@/components/detail/detail'
import Nav from '@/components/nav/nav'

class Child extends Component{
	constructor(){
		super();
	}
	render(){

		return (
			<div>
				<div>我aa</div>
				
			<Router keyLength={12}>
					
					<div>
						<Link to='/home'>跳到home页面</Link>
						<NavLink to={{
							pathname: '/detail',
							search: 'sort=name',
							state: { price: 18 }
						}}>跳到detail页面</NavLink>
						<Link to='/nav'>跳到nav页面</Link>
						<Switch>
						<Route path='/home' component={Home}></Route>		
						<Route path='/detail' component={Detail}></Route>		
						<Route path='/nav' component={Nav}></Route>	
					</Switch>
					</div>
				
					
					
				
			</Router>
			</div>
		
			)
	}
}

ReactDOM.render(<Child></Child>,document.getElementById('box'));