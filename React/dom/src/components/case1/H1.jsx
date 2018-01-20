import React from 'react'

class H1 extends React.Component {
	constructor() {
		super()
		this.back = this.back.bind(this)
	}
	back () {
		let {go}  = this.props
		go (-1)
	}
	render () {
		return (
			<h1>
				<i className="icon iconfont icon-jiantou"   onClick={this.back} ></i>
				{this.props.children}
			</h1>
		)
	}
}
export default H1