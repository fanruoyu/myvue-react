import React from 'react';
class Title extends React.Component{
	constructor () {
		super();
	}
	render () {
		return (
			<div className='title'>
				{this.props.children}
			</div>
		);
	}
}
export default Title;