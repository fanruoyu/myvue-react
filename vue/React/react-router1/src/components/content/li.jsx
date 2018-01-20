import React from 'react'
class Li extends React.Component{
	constructor() {
		super()
		this.state = {
			flag: false
		}
		this.getIndex = this.getIndex.bind(this)
	}
	getIndex () {
		this.setState(state => {
			state.flag = !this.state.flag
			return state
		})
	}
	render () {
		return (
            <li onClick={this.getIndex}>
				{this.state.flag && <i className="icon iconfont icon-duigou"></i>}
				<span></span>
				{this.props.text}
			</li>
        )
	}
}
export default Li