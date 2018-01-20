import React from 'react'
import PropTypes from 'prop-types'
import Button from './button'
class Content extends React.Component{
	render () {
		let {text, color, value} = this.context
		return (
			<div>{value}:<Button text={text} color={color}></Button></div>
		)
	}
}
Content.contextTypes = {
	color: PropTypes.string,
	text: PropTypes.string,
	value: PropTypes.string
}
export default Content