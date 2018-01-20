import React from 'react'
import Potrtals from './porpUp'
class H1 extends React.Component {
	constructor() {
		super()
		this.state = {
			tip: ''
		}
		this.hoverFn = this.hoverFn.bind(this)
		this.leaveFn = this.leaveFn.bind(this)
	}
	hoverFn() {
		this.setState({
			tip: '惊喜出现！！！'
		})

	}
	leaveFn() {
		this.setState({
			tip: ''
		})
	}
	render() {
		return (
			<div>
				<h1 onMouseOver={this.hoverFn} onMouseOut={this.leaveFn}>划过此条信息，有惊喜</h1>
				<Potrtals>{this.state.tip}</Potrtals></div>
		)
	}
}
export default H1
