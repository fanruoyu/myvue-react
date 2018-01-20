import React from 'react'
import  {BrowserRouter, Link, Route, NavLink} from 'react-router-dom'
import Header from '../components/content/header'
import Nav from '../components/content/nav'
import NavCont from '../components/content/navcont'
import Mask from '../components/content/mask'
class List extends React.Component{
	constructor() {
		super();
		this.state = {
			ind: 0,
			flag: false
		}
		this.rendContent = this.rendContent.bind(this)
		this.isShow = this.isShow.bind(this)
	}
	rendContent(i) {
		this.setState(state => {
			state.ind = i
			return state
		})
	}
	isShow (bool) {
		this.setState(state => {
			state.flag = bool
			return state
		})
	}
	render () {
		return (
			<div className='router list'>
				<Header  isShow={this.isShow}/>
				<section>
					<Nav rendContent={this.rendContent}/>
					<NavCont state={this.state}/>
					{
						this.state.flag && <Mask/>
					}
				</section>
			</div>
		)
	}
}
export default List