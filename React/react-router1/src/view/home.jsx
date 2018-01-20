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
	componentDidMount () {
		let ls = localStorage
		if (ls.getItem('userObj')) {
			setTimeout(() => {
				ls.removeItem('userObj')
			},1000 * 300)
		}
	}
	render() {
		let { url } = this.props.match
		return (
			<div className='home'>
				<Content>
					<Switch>
						<Route exact={true} path={url + '/'} render={() => <Redirect to={url + '/index'}> </Redirect>}></Route>
						<Route path={url + '/index'} render={(props) => <Index {...props} />}></Route>
						<Route path={url + '/list/:arr'} render={(props) => <List {...props} />}></Route>
						<Route path={url + '/my'} render={(props) => <My {...props} />}></Route>
						<Route path={url + '/more'} render={(props) => <More {...props} />}></Route>
					</Switch>
				</Content>
				<Footer>
					<NavLink to={url + '/index'} activeClassName='active'>
						<i className='icon iconfont icon-douzikongxin'></i>
						<span>首页</span>
					</NavLink>
					<NavLink to={url + '/list/[1,2,3]'} activeClassName='active'>
						<i className='icon iconfont icon-licai'></i>
						<span>理财产品</span>
					</NavLink>
					<NavLink to={url + '/my'} activeClassName='active'>
						<i className='icon iconfont icon-wode'></i>
						<span>我的</span>
					</NavLink>
					<NavLink to={url + '/more'} activeClassName='active'>
						<i className='icon iconfont icon-gengduo'></i>
						<span>更多</span>
					</NavLink>
				</Footer>
			</div>
		)
	}
}
export default Home