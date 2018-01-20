import React, {Fragment} from 'react'
import './stantic/style.css'
import ReactDOM from 'react-dom'
import Home from './views/home'
import Week from './views/week'
import { Provider } from 'react-redux'
import store from './store/store'
import {HashRouter as Router, Switch, Route, Redirect} from 'react-router-dom'
ReactDOM.render(
	<Provider store = {store}>
		<Router>
			<Fragment>
				<Switch>
					<Route exact path='/' component={Home}/>
					<Route path='/week' component={Week}/>
				</Switch>
			</Fragment>
		</Router>
	</Provider>,
	document.getElementById('root')
)