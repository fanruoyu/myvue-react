import React from 'react'
import PropTypes from 'prop-types'
import Content from './content'
class Message extends React.Component{
	getChildContext () {
		return {
			color: 'red',
			text: '确定',
			value: 'Hello'
		}
	}
	render () {
		let {list} = this.props
		return (
			<div>
				{
					list.map((item, index) => {
						return <Content key={index} text={item.text} color={item.color} value={item.value}></Content>
					})
				}
			</div>
		)
	}
}
Message.childContextTypes = {
	color: PropTypes.string,
	text: PropTypes.string,
	value: PropTypes.string
}
export default Message