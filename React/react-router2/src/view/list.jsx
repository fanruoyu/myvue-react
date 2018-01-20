import React from 'react'
import  {BrowserRouter, Link, Route, NavLink, Redirect} from 'react-router-dom'
import New1 from './new1'
import New2 from './new2'
import New3 from './new3'
class List extends React.Component{
	constructor() {
		super();
	}
	render () {
		let {url} = this.props.match
		return (
			<div className='list'>
				<NavLink to={ url + '/news1'} activeClassName='active'><span>列表一</span></NavLink>
				<NavLink to={ url + '/news2'} activeClassName='active'><span>列表二</span></NavLink>
				<NavLink to={ url + '/news3'} activeClassName='active'><span>列表三</span></NavLink>

				<div>
					<Route exact path={ url + '/'} render={() => <Redirect to={ url + '/news1'}/>}></Route>
					<Route path={ url + '/news1'} component={New1}></Route>
					<Route path={ url + '/news2'} component={New2}></Route>
					<Route path={ url + '/news3'} component={New3}></Route>
				</div>
			</div>
		)
	}
}
export default List