import React from 'react'

class Button extends React.Component{
	render () {
		let {text, color}  = this.props
		return (
			<button style={{'background': color}}>{text}</button>
		)
	}
}

export default Button