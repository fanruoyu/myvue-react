import React from 'react';
import './dailog.css';
import Mark from './mark';
import Content from './content';
import Title from './title';
import Message from './message';
import Buttonbox from './buttonbox';
import Button from './button';
class Box extends React.Component{
	constructor () {
		super();
		this.state = {
			flag: false
		};
		this.show = this.show.bind(this);
		this.hide = this.hide.bind(this);
	}
	show () {
		this.setState(state => {
			state.flag = true;
			return state;
		});
	}
	hide () {
		this.setState(state=> {
			state.flag = false;
			return state;
		});
	}
	course () {
		console.log('确定回调函数');
	}
	delay () {
		console.log('已取消');
	}
	render () {
		let show = this.state.flag;
		return (
			show && <Mark>
				<div className='contbody'>
					<Title type='h1'>我的<span onClick={this.hide}>X</span></Title>
					<Content>
						<Message>提示内容是</Message>
						<Buttonbox>
							<Button className='course' hide={this.hide} course={this.course}>确定</Button>
							<Button className='delay' hide={this.hide} delay={this.delay}>取消</Button>
						</Buttonbox>
					</Content>
				</div>
			</Mark>
		);
	}
}
export default Box;