import React from 'react';
class Buttonbox extends React.Component{
	constructor () {
		super();
	}
	render () {
		return (<div className='buttonBox'>{this.props.children}</div>);
	}
}
export default Buttonbox;