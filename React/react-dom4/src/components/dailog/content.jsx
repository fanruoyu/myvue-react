import React from 'react';
class Content extends React.Component{
	constructor () {
		super();
	}
	render () {
		return (<div className='content'>{this.props.children}</div>);
	}
}
export default Content;