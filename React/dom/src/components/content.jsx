import React from 'react'
import { HashRouter as Router, Link, Switch, Route, NavLink, Redirect } from 'react-router-dom'
import router from '../router/router.config'
// import Index from '../views/index'
// import Sex from '../views/sex'
// import Thick from '../views/thick'
// import Food from '../views/food'
// import Unlike from '../views/unlike'
// import Feeling from '../views/feelings'
let {routes} = router
class Content extends React.Component {
	render () {
		return (
			<Router>
				<Switch>
					<Route exact path='/' render={() => <Redirect to='/index'> </Redirect>}/>
					{
						routes.map((item,  index) => {
							return <Route key={index} path={item.path} render={(props) => <item.component {...props}/>}></Route>
						})
					}
					{/* <Route path='/index' render={(props) => <Index {...props}/>}/>
					<Route path='/sex' render={(props) => <Sex {...props}/>}/>
					<Route path='/thick' render={(props) => <Thick {...props}/>}/>
					<Route path='/food' render={(props) => <Food {...props}/>}/>
					<Route path='/unlike' render={(props) => <Unlike {...props}/>}/>
					<Route path='/feeling' render={(props) => <Feeling {...props}/>}/> */}
				</Switch>
                
			</Router>
		)
	}
}
export default Content