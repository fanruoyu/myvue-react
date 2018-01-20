import React from 'react'
import Produce1 from './produce1'
import Produce2 from './produce2'
class Nav extends React.Component{
	constructor () {
		super()
	}
	render () {
		return (
			<div className="navconts">
				{this.props.state.ind == 0 ? <Produce1 />: <Produce2 />}
			</div>
		)
	}
}
export default Nav