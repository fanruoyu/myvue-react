import React from 'react'
import ReactDom from 'react-dom'
import './stantic/style.css'
import '../../react-libs/js/fontSize'
import { HashRouter as Router, Link, Switch, Route, NavLink, Redirect } from 'react-router-dom'
import Home from './view/home'
import Login from './view/login'
ReactDom.render(
	<Router>
		<div id='root'>
			<Route exact path='/' render={(props) => {return <Login {...props}/>}}></Route>
			<Route path='/home' render={(props) => <Home {...props}/>}></Route>
		</div>
	</Router>
	,
	document.getElementById('root')
)
