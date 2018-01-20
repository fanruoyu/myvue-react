import React from 'react'
import {connect} from 'react-redux'
import mapStateToProps from './feel/state'
import mapDispatchToProps from './feel/dispatch'
import H1 from '../components/H1'
import Li from '../components/li'
class Feeling extends React.Component {
	constructor () {
		super()
		this.state = {
			data: [],
			list: ['您的皮肤一抓就红，并出现抓痕吗？','您平时痰多特别是咽喉部总感觉有痰堵塞吗？','您吃(喝)凉的东西会感到不舒服或者怕吃(喝)凉的东西吗?','您手脚发凉吗？','您胃脘部、背部或腰膝部怕冷吗？'],
		}
		this.submitFn = this.submitFn.bind(this)
		this.callBack = this.callBack.bind(this)
	}
	submitFn () {
		let { push } = this.props.history
		if (document.querySelectorAll('.feeling_maincont .active').length < 5) {
			window.confirm('您还有未选择的题目！')
		} else {
			push('/result')
		}
	}
	callBack (val) {
		let flag = false
		this.setState(state => {
			state.data.forEach(item => {
				if (val.index == item.index) {
					item.text = val.text  
					flag = true
				}
			})
			if (!flag) {
				state.data.push(val)
			}
			return state
		})
		this.props.updata_feel({
			type: 'updata_feel',
			data: this.state.data
		})
	}
	render () {
		return (
			<div className='router feeling'>
				<H1 go={this.props.history.go}>
					你的感觉？
				</H1>
				<div className="feeling_maincont">
					<div className="main">
						<div className="list">
							<ul>
								{
									this.state.list.map((item, index) => {
										return <Li key={index} callBack={this.callBack} id={index}>
											<h4>{item}</h4>
										</Li>
									})
								}
							</ul>
						</div>
						<button onClick={this.submitFn}>提交</button>
					</div>
				</div>
			</div>
		)
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(Feeling)