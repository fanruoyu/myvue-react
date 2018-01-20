import React from 'react';
class Message extends React.Component{
	constructor () {
		super();
	}
	render () {
		return (<div className='message'>{this.props.children}</div>);
	}
}
export default Message;