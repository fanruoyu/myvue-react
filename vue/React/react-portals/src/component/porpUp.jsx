import React from 'react'
import ReactDOM from 'react-dom'
class PorpUp extends React.Component{
	constructor () {
		super()
		this.el = document.getElementById('info')
	}
	render () {
		return this.props.children !== '' && ReactDOM.createPortal(this.props.children,this.el) 
	}
}
export default PorpUp
