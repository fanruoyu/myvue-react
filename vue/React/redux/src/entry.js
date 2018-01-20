import React from 'react'
import ReactDOM from 'react-dom'
import Message from './components/Message'
let list = [
	{
		color: 'skyblue',
		text: '确定',
		value: 'Hello Word'
	},
	{
		color: 'purple',
		text: '取消',
		value: 'Hello React'
	}
]
ReactDOM.render(
	<div>
		<Message list={list}/>
	</div>,
	document.getElementById('root')
)
