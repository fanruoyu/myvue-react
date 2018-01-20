import React from 'react'
class Header extends React.Component {
	constructor () {
		super()
		this.state = {
			bool: true
		}
		this.changeShow = this.changeShow.bind(this)
	}
	changeShow () {
		this.setState(state => {
			state.bool = !this.state.bool
			return state
		})
		this.props.isShow(this.state.bool)
	}
	render () {
		return (<h1 className="header">理财产品<i className="icon iconfont icon-daohang" onClick={this.changeShow}></i></h1>)
	}
}
export default Header