import React from 'react'
import ReactDOM from 'react-dom'
import './stantic/css/style.css'
import './stantic/js/fontSize'
import './stantic/font/iconfont.css'
import { HashRouter as Router, Link, Switch, Route, NavLink, Redirect } from 'react-router-dom'
import store from './store/store'
import {Provider} from 'react-redux'
import Header from './components/header'
import Content from './components/content'
ReactDOM.render(
	<Provider store={store}>
		<React.Fragment>
			<Header/>
			<Content/>
		</React.Fragment>
	</Provider>,
	document.getElementById('root')
)