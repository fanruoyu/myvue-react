import React from 'react';
class Mark extends React.Component{
	render () {
		return (
			<div className='mark'>
				{this.props.children}
			</div>
		);
	}
}
export default Mark;