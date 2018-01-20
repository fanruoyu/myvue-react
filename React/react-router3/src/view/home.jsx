import React from 'react'
import { HashRouter as Router, Link, Switch, Route, NavLink, Redirect } from 'react-router-dom'
import Index from './index'
import List from './list'
import More from './more'
import My from './my'
import Content from '../components/content'
import Footer from '../components/footer'
class Home extends React.Component {
	constructor() {
		super()
	}
	render() {
		let {url} = this.props.match
		return (
			<div className='home'>
				<Content>
					<Switch>
						<Route exact={true} path= { url + '/'} render={() => <Redirect to={ url + '/index'}> </Redirect>}></Route>
						<Route path={ url + '/index'}  render={(props) => <Index {...props}/>}></Route>
						<Route path={ url + '/list'}  render={(props) => <List {...props}/>}></Route>
						<Route path={ url + '/more'}  render={(props) => <More {...props}/>}></Route>
						<Route path={ url + '/my'}  render={(props) => <My {...props}/>}></Route>
					</Switch>
				</Content>
				<Footer>
					<NavLink to=  { url + '/index'} activeClassName='active'>
						<span>首页</span>
					</NavLink>
					<NavLink to= { url + '/list'} activeClassName='active'>
						<span>列表页</span>
					</NavLink>
					<NavLink to= { url + '/more'} activeClassName='active'>
						<span>购物车</span>
					</NavLink>
					<NavLink to= { url + '/my'} activeClassName='active'>
						<span>我的</span>
					</NavLink>
				</Footer>
			</div>
		)
	}
}
export default Home