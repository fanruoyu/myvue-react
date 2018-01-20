import React from 'react'
import ReactDom from 'react-dom'
import './stantic/style.css'
import '../../react-libs/js/fontSize'
import  {BrowserRouter as Router, Link, Route, NavLink} from 'react-router-dom'
import Home from './view/home'
import Index from './view/index'
import List from './view/list'
import Shopping from './view/shopping'
import My from './view/my'
import Content from './components/content'
import Footer from './components/footer'
ReactDom.render(
	
	<Router>
		<Home>
			<Content>
				<Route exact path='/' component={Index}></Route>
				<Route path='/list/:arr' component={List}></Route>
				<Route path='/shopping' component={Shopping}></Route>
				<Route path='/my' component={My}></Route>
			</Content>
			<Footer>
				<NavLink to='/' activeClassName='active'>
					<span>首页</span>
				</NavLink>
				<NavLink to='/list/[1,2,3]' activeClassName='active'>
					<span>列表页</span>
				</NavLink>
				<NavLink to='/shopping' activeClassName='active'>
					<span>购物车</span>
				</NavLink>
				<NavLink to='/my' activeClassName='active'>
					<span>我的</span>
				</NavLink>
			</Footer>
		</Home>
	</Router>
	,
	document.getElementById('root')
)
