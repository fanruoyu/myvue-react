import React from 'react'
import './dailog.css'
import Mark from './mark'
import Content from './content'
import Title from './title'
import Message from './message'
import Buttonbox from './buttonbox'
import Button from './button'
import {Link} from 'react-router-dom'
class Box extends React.Component{
	constructor () {
		super()
		this.state = {
			flag: false
		}
		this.show = this.show.bind(this)
		this.hide = this.hide.bind(this)
	}
	show () {
		this.setState(state => {
			state.flag = true
			return state
		})
	}
	hide () {
		this.setState(state=> {
			state.flag = false
			return state
		})
	}
	render () {
		let show = this.state.flag
		return (
			show && <Mark>
				<div className='contbody'>
					<span onClick={this.hide}>X</span>
					<Content>
						<Message>
							<p>
								亲，我们为您准备了60道体质测试题，请耐心如实大体，获取真实体质结果
							</p>
						</Message>
						<Buttonbox>
							<Link to='/thick'>
								<Button className='course'>开始测试</Button>
							</Link>
							
						</Buttonbox>
					</Content>
				</div>
			</Mark>
		)
	}
}
export default Box