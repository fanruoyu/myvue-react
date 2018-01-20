import React from 'react';
class Button extends React.Component{
	constructor () {
		super();
		this.controlProps = this.controlProps.bind(this);
	}
	controlProps () {
		this.props.hide();
		if (this.props.delay) {
			this.props.delay();
		} else if (this.props.course){
			this.props.course();
		}
	}
	render () {
		return (<button className={this.props.className} onClick={this.controlProps}>{this.props.children}</button>);
	}
}
export default Button;