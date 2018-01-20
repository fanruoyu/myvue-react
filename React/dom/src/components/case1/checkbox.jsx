import React from 'react'

class CheckBox extends React.Component {
	constructor() {
		super()
		this.state = {
			flag: false
		}
		this.checkAll = this.checkAll.bind(this)
	}
	checkAll () {
		this.setState(state => {
			state.flag = !this.state.flag
		})
	}
	render () {
		return (
			<p>
				<span  onClick={this.checkAll} className= {this.state.flag==true? 'active': ''}></span>
				<small>{ this.props.item}</small>
			</p>
		)
	}
}
export default CheckBox