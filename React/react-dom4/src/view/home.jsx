import React from 'react';
import Dailog from '../components/dailog';
class Home extends React.Component{
	constructor () {
		super();
		this.controlShow = this.controlShow.bind(this);
	}
	controlShow () {
		this.refs.dailog.show();
	}
	render () {
		return (
			<div className='home'>
				<button onClick={this.controlShow}>点击事件</button>
				<Dailog ref='dailog'></Dailog>
			</div>
		);
	}
}
export default Home;